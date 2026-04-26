'use client'

import { useFragment, usePaginationFragment } from 'react-relay'
import { useState } from 'react'
import { Avatar } from '@/components/ui/Avatar'
import { CommentForm, type LocalComment } from './CommentForm'
import type { CommentThread_query$key } from '@/__generated__/CommentThread_query.graphql'
import type { CommentThread_comment$key } from '@/__generated__/CommentThread_comment.graphql'
import CommentThreadQueryNode from '@/__generated__/CommentThread_query.graphql'
import CommentThreadCommentNode from '@/__generated__/CommentThread_comment.graphql'

const COMMENTS_PAGE_SIZE = 10

interface Props {
  queryRef: CommentThread_query$key
  issueId: string
}

export function CommentThread({ queryRef, issueId }: Props) {
  const { data, loadNext, isLoadingNext, hasNext } = usePaginationFragment(
    CommentThreadQueryNode,
    queryRef,
  )
  const [localComments, setLocalComments] = useState<LocalComment[]>([])

  const fetchedComments = data.commentsCollection?.edges ?? []
  const fetchedNodeIds = new Set(fetchedComments.map(({ node }) => node.nodeId))

  const handleCommentPosted = (comment: LocalComment) => {
    setLocalComments((prev) => [...prev, comment])
  }

  const isEmpty = fetchedComments.length === 0 && localComments.length === 0

  return (
    <div className="flex flex-col gap-4">
      {/* Fixed-height scrollable list — form stays visible below without sticky tricks */}
      <div className="max-h-[30vh] overflow-y-auto space-y-4 pr-1">
        {hasNext && (
          <div className="flex justify-center">
            <button
              onClick={() => loadNext(COMMENTS_PAGE_SIZE)}
              disabled={isLoadingNext}
              className="text-xs text-slate-500 hover:text-slate-800 disabled:opacity-50 transition-colors"
            >
              {isLoadingNext ? 'Loading…' : '↑ Load earlier comments'}
            </button>
          </div>
        )}

        {isEmpty && (
          <p className="text-sm text-slate-400 py-4">
            No comments yet. Be the first to comment.
          </p>
        )}

        {fetchedComments.map(({ node }) => (
          <CommentItem key={node.nodeId} commentRef={node} />
        ))}
        {localComments
          .filter((c) => !fetchedNodeIds.has(c.nodeId))
          .map((c) => (
            <LocalCommentItem key={c.nodeId} comment={c} />
          ))}
      </div>

      <CommentForm
        issueId={issueId}
        onCommentPosted={handleCommentPosted}
      />
    </div>
  )
}

function formatDate(raw: string | null | undefined): string | null {
  if (!raw) return null
  return new Date(raw).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

function CommentItem({ commentRef }: { commentRef: CommentThread_comment$key }) {
  const comment = useFragment(CommentThreadCommentNode, commentRef)
  return (
    <div className="flex gap-3">
      <Avatar name={comment.users?.name} avatarUrl={comment.users?.avatar_url} size="md" />
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-sm font-semibold text-slate-800">
            {comment.users?.name ?? 'Unknown'}
          </span>
          {comment.created_at && (
            <span className="text-xs text-slate-400">{formatDate(comment.created_at as string)}</span>
          )}
        </div>
        <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed rounded-lg bg-slate-50 px-3 py-2.5">
          {comment.body}
        </p>
      </div>
    </div>
  )
}

function LocalCommentItem({ comment }: { comment: LocalComment }) {
  return (
    <div className="flex gap-3">
      <Avatar name={comment.users?.name} avatarUrl={comment.users?.avatar_url} size="md" />
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-sm font-semibold text-slate-800">
            {comment.users?.name ?? 'Unknown'}
          </span>
          {comment.created_at && (
            <span className="text-xs text-slate-400">{formatDate(comment.created_at)}</span>
          )}
        </div>
        <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed rounded-lg bg-slate-50 px-3 py-2.5">
          {comment.body}
        </p>
      </div>
    </div>
  )
}
