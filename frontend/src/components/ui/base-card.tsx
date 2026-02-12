import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface BaseCardProps {
  children: ReactNode
  className?: string
}

export function BaseCard({ children, className }: BaseCardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-border bg-card shadow-sm',
        className
      )}
    >
      {children}
    </div>
  )
}
