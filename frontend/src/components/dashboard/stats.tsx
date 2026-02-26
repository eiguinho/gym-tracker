'use client'

import { CalendarDays, Activity, Moon } from 'lucide-react'
import { StatCard } from '@/components/ui/stat-card'

interface StatsGridProps {
  summary?: {
    activeHours: string;
    completedWorkouts: number;
  }
}

export function StatsGrid({ summary }: StatsGridProps) {
  const avgSession = summary && summary.completedWorkouts > 0 
    ? (Number(summary.activeHours) / summary.completedWorkouts).toFixed(1)
    : "0";

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <StatCard
        title="Treinos no Mês"
        value={summary?.completedWorkouts?.toString() || "0"}
        subtitle="/ 30 dias"
        icon={<CalendarDays size={24} />}
        footer={
          <span className="text-primary">
            Dados dos últimos 7 dias
          </span>
        }
      />

      <StatCard
        title="Horas Ativas"
        value={
          <>
            {summary?.activeHours || "0.0"}<span className="text-base">h</span>
          </>
        }
        icon={<Activity size={24} />}
        footer={`Média de ${avgSession}h por sessão`}
      />

      <StatCard
        title="Qualidade do Sono"
        value="--"
        icon={<Moon size={24} />}
        footer={<span className="text-muted-foreground">Aguardando registro</span>}
      />
    </div>
  )
}