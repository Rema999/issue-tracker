interface Props {
  name: string | null | undefined
  avatarUrl?: string | null
  size?: 'sm' | 'md' | 'lg'
}

const SIZE_CLASS = {
  sm: 'h-5 w-5 text-xs',
  md: 'h-7 w-7 text-xs',
  lg: 'h-9 w-9 text-sm',
}

export function Avatar({ name, avatarUrl, size = 'md' }: Props) {
  const initials = name
    ? name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : '?'

  return (
    <span
      className={`relative inline-flex shrink-0 items-center justify-center rounded-full
        bg-slate-200 font-semibold text-slate-600 select-none overflow-hidden
        ${SIZE_CLASS[size]}`}
      title={name ?? undefined}
    >
      {avatarUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={avatarUrl} alt={name ?? ''} className="h-full w-full object-cover" />
      ) : (
        initials
      )}
    </span>
  )
}
