export type Status = 'OPEN' | 'IN_PROGRESS' | 'TODO'

const STATUS_CONFIG: Record<
  Status,
  { label: string; icon: string; className: string }
> = {
  OPEN: {
    label: 'Open',
    icon: '○',
    className: 'text-slate-500 bg-slate-100',
  },
  TODO: {
    label: 'Todo',
    icon: '◎',
    className: 'text-blue-600 bg-blue-50',
  },
  IN_PROGRESS: {
    label: 'In Progress',
    icon: '◑',
    className: 'text-amber-600 bg-amber-50',
  },
}

interface Props {
  status: string
  size?: 'sm' | 'md'
}

export function StatusBadge({ status, size = 'md' }: Props) {
  const config = STATUS_CONFIG[status as Status] ?? {
    label: status,
    icon: '○',
    className: 'text-slate-400 bg-slate-100',
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-medium
        ${config.className}
        ${size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs'}
      `}
    >
      <span aria-hidden>{config.icon}</span>
      {config.label}
    </span>
  )
}

export const STATUS_OPTIONS: Status[] = ['OPEN', 'TODO', 'IN_PROGRESS']

export const STATUS_LABELS: Record<Status, string> = Object.fromEntries(
  Object.entries(STATUS_CONFIG).map(([k, v]) => [k, v.label]),
) as Record<Status, string>
