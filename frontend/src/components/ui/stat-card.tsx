import { ReactNode } from 'react'
import { BaseCard } from './base-card'
import { cn } from '@/lib/utils'

interface StatCardProps {
  title: string
  value: ReactNode
  subtitle?: ReactNode
  icon?: ReactNode
  footer?: ReactNode
  className?: string
}

export function StatCard({
  title,
  value,
  subtitle,
  icon,
  footer,
  className
}: StatCardProps) {
  return (
    <BaseCard
      className={cn(
        'p-6 transition-all hover:shadow-md',
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            {title}
          </p>

          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-4xl font-bold tracking-tight">
              {value}
            </span>

            {subtitle && (
              <span className="text-sm text-muted-foreground">
                {subtitle}
              </span>
            )}
          </div>
        </div>

        {icon && (
          <div className="rounded-full bg-primary/10 p-3 text-primary">
            {icon}
          </div>
        )}
      </div>

      {footer && (
        <div className="mt-4 text-xs font-medium">
          {footer}
        </div>
      )}
    </BaseCard>
  )
}
