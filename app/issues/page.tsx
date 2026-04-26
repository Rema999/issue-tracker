import { Suspense } from 'react'
import { IssueListPage } from '@/components/issues/IssueList'
import { IssueListSkeleton } from '@/components/ui/Skeleton'

// Disable static generation — this page fetches live data from Supabase.
export const dynamic = 'force-dynamic'

export const metadata = { title: 'Issues — Issue Tracker' }

export default function Page() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 m-6 overflow-hidden shadow-sm">
      {/* Page header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
        <h1 className="text-base font-semibold text-slate-900">All Issues</h1>
        <span className="text-xs text-slate-400">
          Live updates via Supabase Realtime
        </span>
      </div>

      <Suspense fallback={<IssueListSkeleton />}>
        <IssueListPage />
      </Suspense>
    </div>
  )
}
