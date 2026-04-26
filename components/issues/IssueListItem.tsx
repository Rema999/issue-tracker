'use client'

import { useFragment } from 'react-relay'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Avatar } from '@/components/ui/Avatar'
import { StatusBadge, STATUS_OPTIONS } from '@/components/ui/StatusBadge'
import { PriorityBadge } from '@/components/ui/PriorityBadge'
import type { IssueListItem_issue$key } from '@/__generated__/IssueListItem_issue.graphql'
import IssueListItemIssueNode from '@/__generated__/IssueListItem_issue.graphql'

interface Props {
  issueRef: IssueListItem_issue$key
  onStatusChange?: (newStatus: string) => void
}

export function IssueListItem({ issueRef, onStatusChange }: Props) {
  const issue = useFragment(IssueListItemIssueNode, issueRef)
  const [showStatusMenu, setShowStatusMenu] = useState(false)
  const [localStatus, setLocalStatus] = useState(issue.status ?? 'OPEN')

  // Keep local status in sync when the Relay store is updated externally
  // (e.g. after a Realtime-triggered refetch from another tab).
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { setLocalStatus(issue.status ?? 'OPEN') }, [issue.status])

  const labels =
    issue.issue_labelsCollection?.edges
      .map((e) => e.node.labels)
      .filter(Boolean) ?? []

  const createdAt = issue.created_at
    ? new Date(issue.created_at as string).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      })
    : null

  return (
    <div className="group flex items-center gap-3 px-6 py-3 hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0">
      {/* Priority */}
      <PriorityBadge priority={issue.priority} />

      {/* Title link */}
      <Link
        href={`/issues/${issue.id}`}
        className="flex-1 min-w-0 text-sm font-medium text-slate-800 hover:text-blue-600 truncate transition-colors"
      >
        {issue.title}
      </Link>

      {/* Labels */}
      <div className="hidden sm:flex items-center gap-1.5 shrink-0">
        {labels.map((label) =>
          label ? (
            <span
              key={label.id as string}
              className="inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium border"
              style={{
                backgroundColor: `${label.color}18`,
                borderColor: `${label.color}50`,
                color: label.color ?? undefined,
              }}
            >
              {label.name}
            </span>
          ) : null,
        )}
      </div>

      {/* Status badge with quick-change popover */}
      <div className="relative shrink-0">
        <button
          onClick={(e) => {
            e.preventDefault()
            if (onStatusChange) setShowStatusMenu((v) => !v)
          }}
          className={onStatusChange ? 'cursor-pointer' : 'cursor-default'}
          title={onStatusChange ? 'Change status' : undefined}
        >
          <StatusBadge status={localStatus} size="sm" />
        </button>

        {showStatusMenu && onStatusChange && (
          <>
            <div
              className="fixed inset-0 z-20"
              onClick={() => setShowStatusMenu(false)}
            />
            <div className="absolute right-0 top-full mt-1 z-30 w-40 rounded-lg border border-slate-200 bg-white shadow-lg py-1">
              {STATUS_OPTIONS.map((s) => (
                <button
                  key={s}
                  className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                  onClick={() => {
                    setLocalStatus(s)
                    setShowStatusMenu(false)
                    onStatusChange(s)
                  }}
                >
                  <StatusBadge status={s} size="sm" />
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Assignee */}
      <div className="shrink-0">
        {issue.users ? (
          <Avatar
            name={issue.users.name}
            avatarUrl={issue.users.avatar_url}
            size="sm"
          />
        ) : (
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-dashed border-slate-300 text-slate-300">
            <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0 2c-5.33 0-8 2.67-8 4v1h16v-1c0-1.33-2.67-4-8-4z" />
            </svg>
          </span>
        )}
      </div>

      {/* Date */}
      {createdAt && (
        <span className="hidden md:block shrink-0 text-xs text-slate-400 w-16 text-right">
          {createdAt}
        </span>
      )}
    </div>
  )
}
