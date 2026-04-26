'use client'

import { useLazyLoadQuery, usePaginationFragment, useMutation } from 'react-relay'
import { useCallback, useEffect, useRef, useState, useTransition } from 'react'
import { IssueListItem } from './IssueListItem'
import { IssueFilters, type FilterValues } from './IssueFilters'
import { useToast } from '@/hooks/useToast'
import { supabase } from '@/lib/supabase'

// Pre-compiled Relay artifacts — imported directly for Turbopack compatibility.
// Fragment/query/mutation definitions live in graphql/ directory (relay-compiler source).
import IssueListQueryNode from '@/__generated__/IssueListQuery.graphql'
import IssueListQueryFragmentNode from '@/__generated__/IssueList_query.graphql'
import IssueListStatusMutationNode from '@/__generated__/IssueListStatusMutation.graphql'

import type { IssueListQuery as IssueListQueryType } from '@/__generated__/IssueListQuery.graphql'
import type {
  IssueList_query$key,
  IssueList_query$data,
} from '@/__generated__/IssueList_query.graphql'
import type { IssueListStatusMutation as IssueStatusMutationType } from '@/__generated__/IssueListStatusMutation.graphql'

type IssueEdgeNode = NonNullable<
  NonNullable<IssueList_query$data['issuesCollection']>['edges'][number]['node']
>

const PAGE_SIZE = 20

// ─── Inner list: consumes the paginated fragment ──────────────────────────────
function IssueListInner({
  queryRef,
  filters,
  onFilterChange,
  labels,
}: {
  queryRef: IssueList_query$key
  filters: FilterValues
  onFilterChange: (f: FilterValues) => void
  labels: { id: string; name: string; color: string }[]
}) {
  const { data, loadNext, isLoadingNext, hasNext, refetch } =
    usePaginationFragment(IssueListQueryFragmentNode, queryRef)

  const { addToast } = useToast()
  const [, startTransition] = useTransition()

  const [commitStatus] = useMutation<IssueStatusMutationType>(IssueListStatusMutationNode)

  const allIssues = data.issuesCollection?.edges ?? []

  const issues =
    filters.labelIds.length === 0
      ? allIssues
      : allIssues.filter(({ node }) => {
          const n = node as IssueEdgeNode
          return n.issue_labelsCollection?.edges.some((e) =>
            filters.labelIds.includes(e.node.label_id as string),
          )
        })

  // ── Realtime: Supabase → refetch the Relay connection ────────────────────────
  //
  // We keep refs to the latest refetch and filters so the subscription handler
  // (created once on mount) always calls with up-to-date values, avoiding the
  // stale-closure bug that affected the original per-filter-change subscription.
  const refetchRef = useRef(refetch)
  const filtersRef = useRef(filters)
  useEffect(() => { refetchRef.current = refetch })
  useEffect(() => { filtersRef.current = filters })

  useEffect(() => {
    const doRefetch = () => {
      const f = filtersRef.current
      startTransition(() => {
        refetchRef.current(
          {
            first: PAGE_SIZE,
            statusFilter: buildStringFilter(f.statuses),
            priorityFilter: buildStringFilter(f.priorities),
          },
          { fetchPolicy: 'network-only' },
        )
      })
    }

    // Subscribe to both `issues` (status/priority/title/assignee changes)
    // and `issue_labels` (label additions/removals) so any change is reflected.
    const channel = supabase
      .channel('issue-list-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'issues' }, doRefetch)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'issue_labels' }, doRefetch)
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  // Subscription is created once; latest refetch/filters are accessed via refs.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ── Optimistic status change with automatic rollback ──────────────────────────
  const handleStatusChange = useCallback(
    (id: string, newStatus: string) => {
      commitStatus({
        variables: { id, status: newStatus },
        onError() {
          addToast('Failed to update status — change reverted.', 'error')
        },
      })
    },
    [commitStatus, addToast],
  )

  return (
    <div className="min-h-[50vh]">
      <IssueFilters filters={filters} labels={labels} onChange={onFilterChange} />

      {issues.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-slate-400">
          <p className="text-sm">No issues match your filters.</p>
          <button
            onClick={() => onFilterChange({ statuses: [], priorities: [], labelIds: [] })}
            className="mt-2 text-xs underline hover:text-slate-600"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div>
          {issues.map(({ node }) => (
            <IssueListItem
              key={node.nodeId}
              issueRef={node}
              onStatusChange={(newStatus) =>
                handleStatusChange(node.id as string, newStatus)
              }
            />
          ))}
        </div>
      )}

      {hasNext && (
        <div className="flex justify-center py-4">
          <button
            onClick={() => loadNext(PAGE_SIZE)}
            disabled={isLoadingNext}
            className="text-sm text-blue-600 hover:text-blue-700 disabled:opacity-50 px-4 py-2 rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors"
          >
            {isLoadingNext ? 'Loading…' : 'Load more'}
          </button>
        </div>
      )}
    </div>
  )
}

// ─── Page-level component: runs the root query ────────────────────────────────
export function IssueListPage() {
  const [filters, setFilters] = useState<FilterValues>({
    statuses: [],
    priorities: [],
    labelIds: [],
  })
  const [, startTransition] = useTransition()

  const data = useLazyLoadQuery<IssueListQueryType>(
    IssueListQueryNode,
    {
      first: PAGE_SIZE,
      statusFilter: buildStringFilter(filters.statuses),
      priorityFilter: buildStringFilter(filters.priorities),
    },
    { fetchPolicy: 'store-and-network' },
  )

  const labels =
    data.labelsCollection?.edges.map((e) => ({
      id: e.node.id as string,
      name: e.node.name ?? '',
      color: e.node.color ?? '#94a3b8',
    })) ?? []

  return (
    <IssueListInner
      queryRef={data}
      filters={filters}
      onFilterChange={(next) => startTransition(() => setFilters(next))}
      labels={labels}
    />
  )
}

function buildStringFilter(values: string[]): { in: string[] } | undefined {
  return values.length > 0 ? { in: values } : undefined
}
