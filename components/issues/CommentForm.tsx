'use client'

import { useMutation } from 'react-relay'
import { useState } from 'react'
import { useToast } from '@/hooks/useToast'
import type { CommentFormMutation as MutationType } from '@/__generated__/CommentFormMutation.graphql'
import CommentFormMutationNode from '@/__generated__/CommentFormMutation.graphql'

export interface LocalComment {
  nodeId: string
  body: string
  created_at: string | null
  users: { name: string | null; avatar_url: string | null } | null
}

interface Props {
  issueId: string
  onCommentPosted: (comment: LocalComment) => void
}

export function CommentForm({ issueId, onCommentPosted }: Props) {
  const [body, setBody] = useState('')
  const [commitMutation, isInFlight] = useMutation<MutationType>(CommentFormMutationNode)
  const { addToast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = body.trim()
    if (!trimmed) return

    commitMutation({
      variables: { issueId, body: trimmed },
      onCompleted(data) {
        const record = data.insertIntocommentsCollection?.records?.[0]
        if (record) {
          onCommentPosted({
            nodeId: record.nodeId,
            body: record.body ?? '',
            created_at: record.created_at ?? null,
            users: record.users
              ? { name: record.users.name ?? null, avatar_url: record.users.avatar_url ?? null }
              : null,
          })
        }
        setBody('')
        addToast('Comment posted.', 'success')
      },
      onError() {
        addToast('Failed to post comment. Please try again.', 'error')
      },
    })
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <div className="flex-1">
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
              handleSubmit(e as unknown as React.FormEvent)
            }
          }}
          placeholder="Leave a comment… (⌘↵ to submit)"
          rows={3}
          disabled={isInFlight}
          className="w-full resize-none rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none placeholder:text-slate-400
            focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-shadow disabled:opacity-60"
        />
        <div className="flex justify-end mt-2">
          <button
            type="submit"
            disabled={!body.trim() || isInFlight}
            className="rounded-md bg-blue-600 px-4 py-1.5 text-xs font-semibold text-white
              hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isInFlight ? 'Posting…' : 'Comment'}
          </button>
        </div>
      </div>
    </form>
  )
}
