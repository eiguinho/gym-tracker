import { Lightbulb, TrendingUp, AlertTriangle, Moon, Target, Flame, Bed, LucideIcon } from 'lucide-react'
import { BaseCard } from './base-card'
import { cn } from '@/lib/utils'

interface InsightCardProps {
  type: 'success' | 'warning' | 'info'
  message: string
  icon: string
  className?: string
}

const iconMap: Record<string, LucideIcon> = {
  fire: Flame,
  calendar: TrendingUp,
  alert: AlertTriangle,
  target: Target,
  moon: Moon,
  bed: Bed,
  'trending-up': TrendingUp,
}

export function InsightCard({ type, message, icon, className }: InsightCardProps) {
  const Icon = iconMap[icon] || Lightbulb

  const variants = {
    success: "text-green-600 dark:text-green-400 bg-green-500/10",
    warning: "text-amber-600 dark:text-amber-400 bg-amber-500/10",
    info: "text-indigo-600 dark:text-indigo-400 bg-indigo-500/10",
  }

  return (
    <BaseCard className={cn('p-4 flex items-start gap-3 transition-all hover:shadow-md', className)}>
      <div className={cn('shrink-0 p-2 rounded-lg', variants[type])}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1 pt-1">
        <p className="text-sm font-medium leading-snug text-foreground/90">
          {message}
        </p>
      </div>
    </BaseCard>
  )
}