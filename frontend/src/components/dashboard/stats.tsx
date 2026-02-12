import { CalendarDays, Activity, Moon } from 'lucide-react'
import { StatCard } from '@/components/ui/stat-card'

export function StatsGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-3">

      <StatCard
        title="Treinos no Mês"
        value="18"
        subtitle="/ 30 dias"
        icon={<CalendarDays size={24} />}
        footer={
          <span className="text-primary">
            +12% que mês passado
          </span>
        }
      />

      <StatCard
        title="Horas Ativas"
        value={
          <>
            24h <span className="text-base">30m</span>
          </>
        }
        icon={<Activity size={24} />}
        footer="Média de 1h 20m por sessão"
      />

      <StatCard
        title="Qualidade do Sono"
        value="85%"
        icon={<Moon size={24} />}
        footer={<span className="text-primary">Ótima recuperação</span>}
      />
    </div>
  )
}
