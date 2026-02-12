import { ReactNode } from 'react'
import { BaseCard } from './base-card'
import { cn } from '@/lib/utils'

interface ChartCardProps {
  title: string
  description?: string
  icon?: ReactNode
  children: ReactNode
  className?: string
}

export function ChartCard({
  title,
  description,
  icon,
  children,
  className
}: ChartCardProps) {
  return (
    <BaseCard className={cn('p-6', className)}>
      <div className="mb-6">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          {icon}
          {title}
        </h3>

        {description && (
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </div>

      {children}
    </BaseCard>
  )
}
