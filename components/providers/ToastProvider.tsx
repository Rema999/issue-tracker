'use client'

import React, { createContext, useCallback, useState } from 'react'

export type ToastType = 'success' | 'error' | 'info'

export interface Toast {
  id: string
  message: string
  type: ToastType
}

export interface ToastContextValue {
  toasts: Toast[]
  addToast: (message: string, type?: ToastType) => void
  removeToast: (id: string) => void
}

export const ToastContext = createContext<ToastContextValue | null>(null)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = useCallback((message: string, type: ToastType = 'info') => {
    const id = crypto.randomUUID()
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 4000)
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </ToastContext.Provider>
  )
}

function ToastContainer({
  toasts,
  onDismiss,
}: {
  toasts: Toast[]
  onDismiss: (id: string) => void
}) {
  if (toasts.length === 0) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm shadow-lg
            text-white min-w-[260px] max-w-sm
            ${toast.type === 'success' ? 'bg-emerald-600' : ''}
            ${toast.type === 'error' ? 'bg-red-600' : ''}
            ${toast.type === 'info' ? 'bg-slate-700' : ''}
          `}
        >
          <span className="flex-1">{toast.message}</span>
          <button
            onClick={() => onDismiss(toast.id)}
            className="shrink-0 opacity-70 hover:opacity-100 transition-opacity"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  )
}
