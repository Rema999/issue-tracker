'use client'

import { useFragment, useMutation } from 'react-relay'
import { useEffect, useState } from 'react'
import { StatusBadge, STATUS_OPTIONS } from '@/components/ui/StatusBadge'
import { PriorityBadge, PRIORITY_OPTIONS, PRIORITY_LABELS } from '@/components/ui/PriorityBadge'
import { useToast } from '@/hooks/useToast'
import type { IssueHeader_issue$key } from '@/__generated__/IssueHeader_issue.graphql'
import type { IssueHeaderTitleMutation as TitleMutationType } from '@/__generated__/IssueHeaderTitleMutation.graphql'
import type { IssueHeaderPriorityMutation as PriorityMutationType } from '@/__generated__/IssueHeaderPriorityMutation.graphql'
import type { IssueHeaderStatusMutation as StatusMutationType } from '@/__generated__/IssueHeaderStatusMutation.graphql'
import IssueHeaderIssueNode from '@/__generated__/IssueHeader_issue.graphql'
import IssueHeaderTitleMutationNode from '@/__generated__/IssueHeaderTitleMutation.graphql'
import IssueHeaderPriorityMutationNode from '@/__generated__/IssueHeaderPriorityMutation.graphql'
import IssueHeaderStatusMutationNode from '@/__generated__/IssueHeaderStatusMutation.graphql'

interface Props {
  issueRef: IssueHeader_issue$key
}

export function IssueHeader({ issueRef }: Props) {
  const issue = useFragment(IssueHeaderIssueNode, issueRef)
  const { addToast } = useToast()

  const [editingTitle, setEditingTitle] = useState(false)
  const [localTitle, setLocalTitle] = useState(issue.title ?? '')
  const [titleDraft, setTitleDraft] = useState(issue.title ?? '')
  const [localStatus, setLocalStatus] = useState(issue.status ?? 'OPEN')
  const [localPriority, setLocalPriority] = useState<string | null>(issue.priority ?? null)
  const [showPriorityMenu, setShowPriorityMenu] = useState(false)
  const [showStatusMenu, setShowStatusMenu] = useState(false)

  // When the Relay store is updated externally (cross-tab Realtime refetch),
  // sync local state from the fresh fragment data.
  // Guards prevent overwriting values the user is actively editing.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { setLocalStatus(issue.status ?? 'OPEN') }, [issue.status])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { setLocalPriority(issue.priority ?? null) }, [issue.priority])
  useEffect(() => {
    if (!editingTitle) {
      setLocalTitle(issue.title ?? '')
      setTitleDraft(issue.title ?? '')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [issue.title])

  const [commitTitle] = useMutation<TitleMutationType>(IssueHeaderTitleMutationNode)
  const [commitPriority] = useMutation<PriorityMutationType>(IssueHeaderPriorityMutationNode)
  const [commitStatus] = useMutation<StatusMutationType>(IssueHeaderStatusMutationNode)

  const saveTitle = () => {
    const trimmed = titleDraft.trim()
    if (!trimmed || trimmed === localTitle) {
      setEditingTitle(false)
      setTitleDraft(localTitle)
      return
    }
    const prev = localTitle
    setLocalTitle(trimmed)
    setEditingTitle(false)
    commitTitle({
      variables: { id: issue.id as string, title: trimmed },
      onError() {
        setLocalTitle(prev)
        setTitleDraft(prev)
        addToast('Failed to update title.', 'error')
      },
    })
  }

  const handlePriorityChange = (priority: string) => {
    setShowPriorityMenu(false)
    const prev = localPriority
    setLocalPriority(priority)
    commitPriority({
      variables: { id: issue.id as string, priority },
      onError() {
        setLocalPriority(prev)
        addToast('Failed to update priority.', 'error')
      },
    })
  }

  const handleStatusChange = (status: string) => {
    setShowStatusMenu(false)
    const prev = localStatus
    setLocalStatus(status)
    commitStatus({
      variables: { id: issue.id as string, status },
      onError() {
        setLocalStatus(prev)
        addToast('Failed to update status.', 'error')
      },
    })
  }

  const createdAt = issue.created_at
    ? new Date(issue.created_at as string).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric',
      })
    : null

  return (
    <div className="space-y-3">
      {editingTitle ? (
        <input
          autoFocus
          value={titleDraft}
          onChange={(e) => setTitleDraft(e.target.value)}
          onBlur={saveTitle}
          onKeyDown={(e) => {
            if (e.key === 'Enter') saveTitle()
            if (e.key === 'Escape') { setEditingTitle(false); setTitleDraft(localTitle) }
          }}
          className="w-full text-2xl font-bold text-slate-900 border-b-2 border-blue-500 outline-none bg-transparent py-1"
        />
      ) : (
        <h1
          className="text-2xl font-bold text-slate-900 cursor-text hover:text-blue-700 transition-colors"
          onClick={() => { setTitleDraft(localTitle); setEditingTitle(true) }}
          title="Click to edit"
        >
          {localTitle}
        </h1>
      )}

      <div className="flex items-center gap-3 flex-wrap">
        {/* Status selector */}
        <div className="relative">
          <button onClick={() => setShowStatusMenu((v) => !v)}>
            <StatusBadge status={localStatus} />
          </button>
          {showStatusMenu && (
            <>
              <div className="fixed inset-0 z-20" onClick={() => setShowStatusMenu(false)} />
              <div className="absolute left-0 top-full mt-1 z-30 w-44 rounded-lg border border-slate-200 bg-white shadow-lg py-1">
                {STATUS_OPTIONS.map((s) => (
                  <button
                    key={s}
                    className="w-full text-left px-3 py-2 hover:bg-slate-50 flex items-center gap-2"
                    onClick={() => handleStatusChange(s)}
                  >
                    <StatusBadge status={s} size="sm" />
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Priority selector */}
        <div className="relative">
          <button
            onClick={() => setShowPriorityMenu((v) => !v)}
            className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <PriorityBadge priority={localPriority} />
            <span>{PRIORITY_LABELS[(localPriority ?? '') as keyof typeof PRIORITY_LABELS] ?? '–'}</span>
          </button>
          {showPriorityMenu && (
            <>
              <div className="fixed inset-0 z-20" onClick={() => setShowPriorityMenu(false)} />
              <div className="absolute left-0 top-full mt-1 z-30 w-40 rounded-lg border border-slate-200 bg-white shadow-lg py-1">
                {PRIORITY_OPTIONS.map((p) => (
                  <button
                    key={p}
                    className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    onClick={() => handlePriorityChange(p)}
                  >
                    <PriorityBadge priority={p} showLabel />
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {createdAt && (
          <span className="text-xs text-slate-400">Created {createdAt}</span>
        )}
      </div>
    </div>
  )
}
