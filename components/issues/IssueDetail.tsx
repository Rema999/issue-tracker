'use client'

import { useLazyLoadQuery, useFragment } from 'react-relay'
import { Suspense, useEffect, useState, useTransition } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { IssueHeader } from './IssueHeader'
import { IssueDescription } from './IssueDescription'
import { IssueSidebar } from './IssueSidebar'
import { CommentThread } from './CommentThread'
import { IssueDetailSkeleton } from '@/components/ui/Skeleton'
import type { IssueDetailQuery as IssueDetailQueryType } from '@/__generated__/IssueDetailQuery.graphql'
import type { IssueDetailContent_issue$key } from '@/__generated__/IssueDetailContent_issue.graphql'
import type { CommentThread_query$key } from '@/__generated__/CommentThread_query.graphql'
import IssueDetailQueryNode from '@/__generated__/IssueDetailQuery.graphql'
import IssueDetailContentIssueNode from '@/__generated__/IssueDetailContent_issue.graphql'

interface Props {
  id: string
}

export function IssueDetailPage({ id }: Props) {
  return (
    <Suspense fallback={<IssueDetailSkeleton />}>
      <IssueDetailLoader id={id} />
    </Suspense>
  )
}

function IssueDetailLoader({ id }: Props) {
  const [fetchKey, setFetchKey] = useState(0)
  const [, startTransition] = useTransition()

  // Subscribe to changes on this specific issue so cross-tab edits are reflected
  // without a manual refresh. On any UPDATE, we increment fetchKey which causes
  // useLazyLoadQuery to re-fetch in the background (store-and-network keeps the
  // current data visible while the request is in flight).
  useEffect(() => {
    const channel = supabase
      .channel(`issue-detail-${id}`)
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'issues', filter: `id=eq.${id}` },
        () => { startTransition(() => setFetchKey((k) => k + 1)) },
      )
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [id])

  const data = useLazyLoadQuery<IssueDetailQueryType>(
    IssueDetailQueryNode,
    { id },
    { fetchPolicy: 'store-and-network', fetchKey },
  )

  const issueEdge = data.issuesCollection?.edges[0]

  if (!issueEdge) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-slate-400">
        <p className="text-lg font-medium text-slate-600">Issue not found</p>
        <Link href="/issues" className="mt-3 text-sm text-blue-600 hover:underline">
          ← Back to issues
        </Link>
      </div>
    )
  }

  return (
    <IssueDetailContent
      issueRef={issueEdge.node}
      // IssueDetailQuery spreads CommentThread_query at the root, so the root
      // query data object IS the fragment key for CommentThread_query.
      // The double cast is required because Relay's opaque key types are not
      // structurally compatible with the raw response type in TypeScript.
      queryRef={data as unknown as CommentThread_query$key}
      issueId={issueEdge.node.id as string}
    />
  )
}

function IssueDetailContent({
  issueRef,
  queryRef,
  issueId,
}: {
  issueRef: IssueDetailContent_issue$key
  queryRef: CommentThread_query$key
  issueId: string
}) {
  const issue = useFragment(IssueDetailContentIssueNode, issueRef)

  return (
    <div className="mx-auto max-w-5xl px-6 py-8">
      <Link
        href="/issues"
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 mb-6 transition-colors"
      >
        <span>←</span> All issues
      </Link>

      <div className="flex gap-10 items-start">
        <div className="flex-1 min-w-0 space-y-6">
          <IssueHeader issueRef={issue} />

          <div>
            <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
              Description
            </h2>
            <IssueDescription issueRef={issue} />
          </div>

          <div>
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
              Comments
            </h2>
            <CommentThread queryRef={queryRef} issueId={issueId} />
          </div>
        </div>

        <IssueSidebar issueRef={issue} />
      </div>
    </div>
  )
}
