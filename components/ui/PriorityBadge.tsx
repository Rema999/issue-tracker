export type Priority = 'HIGH' | 'MEDIUM' | 'LOW'

const PRIORITY_CONFIG: Record<
  Priority,
  { label: string; icon: string; className: string }
> = {
  HIGH: {
    label: 'High',
    icon: '🟠',
    className: 'text-orange-500',
  },
  MEDIUM: {
    label: 'Medium',
    icon: '🟡',
    className: 'text-yellow-500',
  },
  LOW: {
    label: 'Low',
    icon: '🔵',
    className: 'text-blue-400',
  },
}

const FALLBACK_CONFIG = { label: '–', icon: '⚪', className: 'text-slate-400' }

interface Props {
  priority: string | null | undefined
  showLabel?: boolean
}

export function PriorityBadge({ priority, showLabel = false }: Props) {
  const config =
    (priority ? PRIORITY_CONFIG[priority as Priority] : null) ?? FALLBACK_CONFIG

  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-medium ${config.className}`}
      title={config.label}
    >
      <span className="text-sm leading-none" aria-hidden>
        {config.icon}
      </span>
      {showLabel && <span>{config.label}</span>}
    </span>
  )
}

export const PRIORITY_OPTIONS: Priority[] = ['HIGH', 'MEDIUM', 'LOW']

export const PRIORITY_LABELS: Record<Priority, string> = Object.fromEntries(
  Object.entries(PRIORITY_CONFIG).map(([k, v]) => [k, v.label]),
) as Record<Priority, string>
