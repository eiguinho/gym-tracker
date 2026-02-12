interface PayloadItem {
  name: string
  value: number
  color?: string
}

interface ChartTooltipProps {
  active?: boolean
  payload?: PayloadItem[]
  label?: string | number
  unit?: string
}

export function ChartTooltip({
  active,
  payload,
  label,
  unit
}: ChartTooltipProps) {
  if (!active || !payload || payload.length === 0) return null

  const item = payload[0]

  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2 shadow-md">
      {label && (
        <p className="text-xs text-muted-foreground mb-1">
          {label}
        </p>
      )}

      <div className="flex items-center gap-2">
        <div
          className="h-2 w-2 rounded-full"
          style={{ backgroundColor: item.color }}
        />
        <p className="text-sm font-medium text-foreground">
          {item.value}
          {unit}
        </p>
      </div>
    </div>
  )
}
