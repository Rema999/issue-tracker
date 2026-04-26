'use client'

import { useFragment, useMutation } from 'react-relay'
import { useEffect, useRef, useState } from 'react'
import { useToast } from '@/hooks/useToast'
import type { IssueDescription_issue$key } from '@/__generated__/IssueDescription_issue.graphql'
import type { IssueDescriptionMutation as MutationType } from '@/__generated__/IssueDescriptionMutation.graphql'
import IssueDescriptionIssueNode from '@/__generated__/IssueDescription_issue.graphql'
import IssueDescriptionMutationNode from '@/__generated__/IssueDescriptionMutation.graphql'

interface Props {
  issueRef: IssueDescription_issue$key
}

export function IssueDescription({ issueRef }: Props) {
  const issue = useFragment(IssueDescriptionIssueNode, issueRef)
  const { addToast } = useToast()
  const [editing, setEditing] = useState(false)
  const [localDescription, setLocalDescription] = useState(issue.description ?? '')
  const [draft, setDraft] = useState(issue.description ?? '')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const [commitUpdate] = useMutation<MutationType>(IssueDescriptionMutationNode)

  // Sync from Relay store when it updates externally (cross-tab Realtime refetch).
  // Guarded by `editing` so in-progress drafts are never overwritten.
  useEffect(() => {
    if (!editing) {
      setLocalDescription(issue.description ?? '')
      setDraft(issue.description ?? '')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [issue.description])

  useEffect(() => {
    if (editing && textareaRef.current) {
      textareaRef.current.focus()
      textareaRef.current.selectionStart = textareaRef.current.value.length
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [editing])

  const save = () => {
    const trimmed = draft.trim()
    if (trimmed === localDescription.trim()) {
      setEditing(false)
      return
    }
    const prev = localDescription
    setLocalDescription(trimmed)
    setEditing(false)
    commitUpdate({
      variables: { id: issue.id as string, description: trimmed },
      onError() {
        setLocalDescription(prev)
        setDraft(prev)
        addToast('Failed to save description.', 'error')
      },
    })
  }

  const cancel = () => {
    setDraft(localDescription)
    setEditing(false)
  }

  if (editing) {
    return (
      <div className="space-y-2">
        <textarea
          ref={textareaRef}
          value={draft}
          onChange={(e) => {
            setDraft(e.target.value)
            e.target.style.height = 'auto'
            e.target.style.height = `${e.target.scrollHeight}px`
          }}
          onKeyDown={(e) => {
            if (e.key === 'Escape') cancel()
            if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) save()
          }}
          placeholder="Add a description…"
          className="w-full min-h-[120px] resize-none rounded-lg border border-blue-400 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none shadow-sm"
          rows={4}
        />
        <div className="flex items-center gap-2">
          <button
            onClick={save}
            className="rounded-md bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 transition-colors"
          >
            Save
          </button>
          <button
            onClick={cancel}
            className="rounded-md px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 transition-colors"
          >
            Cancel
          </button>
          <span className="text-xs text-slate-400">⌘↵ to save · Esc to cancel</span>
        </div>
      </div>
    )
  }

  return (
    <div
      onClick={() => { setDraft(localDescription); setEditing(true) }}
      className={`min-h-[80px] cursor-text rounded-lg px-3 py-2.5 text-sm transition-colors
        ${localDescription ? 'text-slate-700 hover:bg-slate-50' : 'text-slate-400 italic hover:bg-slate-50'}`}
      title="Click to edit description"
    >
      {localDescription ? (
        <p className="whitespace-pre-wrap leading-relaxed">{localDescription}</p>
      ) : (
        'Add a description…'
      )}
    </div>
  )
}
