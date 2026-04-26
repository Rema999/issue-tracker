'use client'

import { useCallback } from 'react'
import { STATUS_OPTIONS, STATUS_LABELS, type Status } from '@/components/ui/StatusBadge'
import { PRIORITY_OPTIONS, PRIORITY_LABELS, type Priority } from '@/components/ui/PriorityBadge'

export interface FilterValues {
  statuses: Status[]
  priorities: Priority[]
  labelIds: string[]
}

interface Label {
  id: string
  name: string
  color: string
}

interface Props {
  filters: FilterValues
  labels: Label[]
  onChange: (next: FilterValues) => void
}

export function IssueFilters({ filters, labels, onChange }: Props) {
  const toggle = useCallback(
    <K extends keyof FilterValues>(key: K, value: string) => {
      const current = filters[key] as string[]
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value]
      onChange({ ...filters, [key]: next })
    },
    [filters, onChange],
  )

  const clearAll = () =>
    onChange({ statuses: [], priorities: [], labelIds: [] })

  const hasFilters =
    filters.statuses.length > 0 ||
    filters.priorities.length > 0 ||
    filters.labelIds.length > 0

  return (
    <div className="relative z-10 flex flex-wrap items-center gap-2 px-6 py-3 border-b border-slate-100">
      {/* Status filter */}
      <FilterDropdown
        label="Status"
        options={STATUS_OPTIONS.map((s) => ({ value: s, label: STATUS_LABELS[s] }))}
        selected={filters.statuses}
        onToggle={(v) => toggle('statuses', v)}
      />

      {/* Priority filter */}
      <FilterDropdown
        label="Priority"
        options={PRIORITY_OPTIONS.map((p) => ({ value: p, label: PRIORITY_LABELS[p] }))}
        selected={filters.priorities}
        onToggle={(v) => toggle('priorities', v)}
      />

      {/* Labels filter */}
      {labels.length > 0 && (
        <FilterDropdown
          label="Labels"
          options={labels.map((l) => ({ value: l.id, label: l.name, color: l.color }))}
          selected={filters.labelIds}
          onToggle={(v) => toggle('labelIds', v)}
        />
      )}

      {hasFilters && (
        <button
          onClick={clearAll}
          className="text-xs text-slate-500 hover:text-slate-800 transition-colors px-2 py-1 rounded hover:bg-slate-100"
        >
          Clear filters
        </button>
      )}
    </div>
  )
}

interface DropdownOption {
  value: string
  label: string
  color?: string
}

function FilterDropdown({
  label,
  options,
  selected,
  onToggle,
}: {
  label: string
  options: DropdownOption[]
  selected: string[]
  onToggle: (value: string) => void
}) {
  return (
    <details className="relative group">
      <summary
        className={`list-none cursor-pointer flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-medium
          transition-colors select-none
          ${selected.length > 0
            ? 'border-blue-300 bg-blue-50 text-blue-700'
            : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
          }`}
      >
        {label}
        {selected.length > 0 && (
          <span className="rounded-full bg-blue-600 text-white px-1.5 py-0 text-[10px] leading-4">
            {selected.length}
          </span>
        )}
        <span className="text-slate-400">▾</span>
      </summary>

      <div className="absolute top-full left-0 mt-1 z-50 w-44 rounded-lg border border-slate-200 bg-white shadow-lg py-1">
        {options.map((opt) => (
          <label
            key={opt.value}
            className="flex items-center gap-2.5 px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 cursor-pointer"
          >
            <input
              type="checkbox"
              className="rounded"
              checked={selected.includes(opt.value)}
              onChange={() => onToggle(opt.value)}
            />
            {opt.color && (
              <span
                className="h-2.5 w-2.5 rounded-full shrink-0"
                style={{ backgroundColor: opt.color }}
              />
            )}
            {opt.label}
          </label>
        ))}
      </div>
    </details>
  )
}
