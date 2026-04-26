'use client'

import { useFragment, useMutation, useLazyLoadQuery } from 'react-relay'
import { useEffect, useState, useMemo } from 'react'
import { Avatar } from '@/components/ui/Avatar'
import { useToast } from '@/hooks/useToast'
import type { IssueSidebar_issue$key } from '@/__generated__/IssueSidebar_issue.graphql'
import type { IssueSidebarAssigneeMutation as AssigneeMutationType } from '@/__generated__/IssueSidebarAssigneeMutation.graphql'
import type { IssueSidebarAddLabelMutation as AddLabelMutationType } from '@/__generated__/IssueSidebarAddLabelMutation.graphql'
import type { IssueSidebarRemoveLabelMutation as RemoveLabelMutationType } from '@/__generated__/IssueSidebarRemoveLabelMutation.graphql'
import type { IssueSidebarUsersQuery as UsersQueryType } from '@/__generated__/IssueSidebarUsersQuery.graphql'
import type { IssueSidebarLabelsQuery as LabelsQueryType } from '@/__generated__/IssueSidebarLabelsQuery.graphql'
import IssueSidebarIssueNode from '@/__generated__/IssueSidebar_issue.graphql'
import IssueSidebarAssigneeMutationNode from '@/__generated__/IssueSidebarAssigneeMutation.graphql'
import IssueSidebarAddLabelMutationNode from '@/__generated__/IssueSidebarAddLabelMutation.graphql'
import IssueSidebarRemoveLabelMutationNode from '@/__generated__/IssueSidebarRemoveLabelMutation.graphql'
import IssueSidebarUsersQueryNode from '@/__generated__/IssueSidebarUsersQuery.graphql'
import IssueSidebarLabelsQueryNode from '@/__generated__/IssueSidebarLabelsQuery.graphql'

interface Props {
  issueRef: IssueSidebar_issue$key
}

export function IssueSidebar({ issueRef }: Props) {
  const issue = useFragment(IssueSidebarIssueNode, issueRef)
  const { addToast } = useToast()
  const [showAssigneeMenu, setShowAssigneeMenu] = useState(false)
  const [showLabelsMenu, setShowLabelsMenu] = useState(false)
  const [localAssigneeId, setLocalAssigneeId] = useState<string | null>(
    (issue.assignee_id ?? null) as string | null,
  )

  const usersData = useLazyLoadQuery<UsersQueryType>(IssueSidebarUsersQueryNode, {}, {
    fetchPolicy: 'store-and-network',
  })
  const labelsData = useLazyLoadQuery<LabelsQueryType>(IssueSidebarLabelsQueryNode, {}, {
    fetchPolicy: 'store-and-network',
  })

  const [commitAssignee] = useMutation<AssigneeMutationType>(IssueSidebarAssigneeMutationNode)
  const [commitAddLabel] = useMutation<AddLabelMutationType>(IssueSidebarAddLabelMutationNode)
  const [commitRemoveLabel] = useMutation<RemoveLabelMutationType>(IssueSidebarRemoveLabelMutationNode)

  const allUsers = usersData.usersCollection?.edges.map((e) => e.node) ?? []
  const allLabels = labelsData.labelsCollection?.edges.map((e) => e.node) ?? []
  const currentAssignee = allUsers.find((u) => u.id === localAssigneeId) ?? null

  // Local state drives the label UI immediately — no Relay store surgery needed.
  // Initialised once from the fragment; toggling updates it optimistically and
  // reverts on error.
  const [assignedLabelIds, setAssignedLabelIds] = useState(
    () => new Set<string>(
      issue.issue_labelsCollection?.edges.map((e) => e.node.label_id as string) ?? [],
    ),
  )

  const currentLabels = useMemo(
    () => allLabels.filter((l) => assignedLabelIds.has(l.id as string)),
    [allLabels, assignedLabelIds],
  )

  // Sync local state from Relay store when it updates externally (cross-tab Realtime refetch).
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { setLocalAssigneeId((issue.assignee_id ?? null) as string | null) }, [issue.assignee_id])

  const fragmentLabelKey = (issue.issue_labelsCollection?.edges ?? [])
    .map((e) => e.node.label_id as string).sort().join(',')
  useEffect(() => {
    setAssignedLabelIds(
      new Set(issue.issue_labelsCollection?.edges.map((e) => e.node.label_id as string) ?? []),
    )
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fragmentLabelKey])

  const handleAssigneeChange = (userId: string | null) => {
    setShowAssigneeMenu(false)
    const prev = localAssigneeId
    setLocalAssigneeId(userId)
    commitAssignee({
      variables: { id: issue.id as string, assigneeId: userId ?? undefined },
      onError() {
        setLocalAssigneeId(prev)
        addToast('Failed to update assignee.', 'error')
      },
    })
  }

  const handleLabelToggle = (labelId: string) => {
    if (assignedLabelIds.has(labelId)) {
      setAssignedLabelIds((prev) => {
        const next = new Set(prev)
        next.delete(labelId)
        return next
      })
      commitRemoveLabel({
        variables: { issueId: issue.id as string, labelId },
        onError() {
          setAssignedLabelIds((prev) => new Set([...prev, labelId]))
          addToast('Failed to remove label.', 'error')
        },
      })
    } else {
      setAssignedLabelIds((prev) => new Set([...prev, labelId]))
      commitAddLabel({
        variables: { issueId: issue.id as string, labelId },
        onError() {
          setAssignedLabelIds((prev) => {
            const next = new Set(prev)
            next.delete(labelId)
            return next
          })
          addToast('Failed to add label.', 'error')
        },
      })
    }
  }

  return (
    <aside className="w-56 shrink-0 space-y-5 text-sm">
      {/* Assignee */}
      <div>
        <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-slate-400">
          Assignee
        </p>
        <div className="relative">
          <button
            onClick={() => setShowAssigneeMenu((v) => !v)}
            className="flex items-center gap-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-md px-2 py-1.5 transition-colors w-full"
          >
            {currentAssignee ? (
              <>
                <Avatar name={currentAssignee.name} avatarUrl={currentAssignee.avatar_url} size="sm" />
                <span className="text-sm truncate">{currentAssignee.name}</span>
              </>
            ) : (
              <>
                <span className="h-5 w-5 rounded-full border border-dashed border-slate-300 flex items-center justify-center text-slate-400 text-xs">+</span>
                <span className="text-xs text-slate-400">No assignee</span>
              </>
            )}
          </button>

          {showAssigneeMenu && (
            <>
              <div className="fixed inset-0 z-20" onClick={() => setShowAssigneeMenu(false)} />
              <div className="absolute left-0 top-full mt-1 z-30 w-48 rounded-lg border border-slate-200 bg-white shadow-lg py-1">
                <button
                  className="w-full text-left px-3 py-2 text-xs text-slate-500 hover:bg-slate-50"
                  onClick={() => handleAssigneeChange(null)}
                >
                  Unassign
                </button>
                <div className="border-t border-slate-100 my-1" />
                {allUsers.map((user) => (
                  <button
                    key={user.id as string}
                    className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    onClick={() => handleAssigneeChange(user.id as string)}
                  >
                    <Avatar name={user.name} avatarUrl={user.avatar_url} size="sm" />
                    <span className="truncate">{user.name}</span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Labels */}
      <div>
        <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-slate-400">
          Labels
        </p>
        <div className="relative">
          <div className="flex flex-wrap gap-1 mb-1">
            {currentLabels.map((label) => (
              <span
                key={label.id as string}
                className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium"
                style={{
                  backgroundColor: `${label.color}18`,
                  borderColor: `${label.color}50`,
                  color: label.color ?? undefined,
                }}
              >
                {label.name}
              </span>
            ))}
          </div>

          <button
            onClick={() => setShowLabelsMenu((v) => !v)}
            className="text-xs text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded px-2 py-1 transition-colors"
          >
            {currentLabels.length === 0 ? 'Add labels…' : 'Edit labels…'}
          </button>

          {showLabelsMenu && (
            <>
              <div className="fixed inset-0 z-20" onClick={() => setShowLabelsMenu(false)} />
              <div className="absolute left-0 top-full mt-1 z-30 w-48 rounded-lg border border-slate-200 bg-white shadow-lg py-1">
                {allLabels.map((label) => {
                  const isSelected = assignedLabelIds.has(label.id as string)
                  return (
                    <button
                      key={label.id as string}
                      className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                      onClick={() => handleLabelToggle(label.id as string)}
                    >
                      <span
                        className={`h-2.5 w-2.5 rounded-full shrink-0 ${isSelected ? 'ring-2 ring-offset-1 ring-slate-400' : ''}`}
                        style={{ backgroundColor: label.color ?? '#94a3b8' }}
                      />
                      <span className="flex-1">{label.name}</span>
                      {isSelected && <span className="text-blue-600">✓</span>}
                    </button>
                  )
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </aside>
  )
}
