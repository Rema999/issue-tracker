function SkeletonBox({ className = '' }: { className?: string }) {
  return (
    <div className={`animate-pulse rounded bg-slate-200 ${className}`} />
  )
}

export function IssueListSkeleton() {
  return (
    <div className="space-y-0 divide-y divide-slate-100">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 px-6 py-3.5">
          <SkeletonBox className="h-4 w-4 shrink-0" />
          <SkeletonBox className="h-4 w-4 shrink-0" />
          <SkeletonBox className="h-4 flex-1 max-w-md" />
          <SkeletonBox className="h-5 w-20 rounded-full" />
          <SkeletonBox className="h-5 w-5 rounded-full shrink-0 ml-auto" />
          <SkeletonBox className="h-4 w-20 shrink-0" />
        </div>
      ))}
    </div>
  )
}

export function IssueDetailSkeleton() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-8 flex gap-8">
      <div className="flex-1 space-y-6">
        <SkeletonBox className="h-8 w-3/4" />
        <SkeletonBox className="h-4 w-full" />
        <SkeletonBox className="h-4 w-5/6" />
        <SkeletonBox className="h-4 w-4/6" />
        <div className="mt-8 space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex gap-3">
              <SkeletonBox className="h-8 w-8 rounded-full shrink-0" />
              <div className="flex-1 space-y-2">
                <SkeletonBox className="h-4 w-1/4" />
                <SkeletonBox className="h-4 w-full" />
                <SkeletonBox className="h-4 w-3/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <aside className="w-56 shrink-0 space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i}>
            <SkeletonBox className="h-3 w-16 mb-2" />
            <SkeletonBox className="h-5 w-24" />
          </div>
        ))}
      </aside>
    </div>
  )
}
