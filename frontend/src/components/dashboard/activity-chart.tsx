'use client'

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts'
import { Activity } from 'lucide-react'
import { ChartCard } from '@/components/ui/chart-card'
import { ChartTooltip } from '@/components/ui/chart-tooltip'
import { format, subDays, eachDayOfInterval, isSameDay, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface ActivityChartProps {
  data?: Array<{ _id: string; minutes: number }>
}

export function ActivityChart({ data }: ActivityChartProps) {
  // 1. Geramos os últimos 7 dias (de 6 dias atrás até hoje)
  const lastSevenDays = eachDayOfInterval({
    start: subDays(new Date(), 6),
    end: new Date(),
  })

  // 2. Mapeamos cada um desses 7 dias, procurando se existe dado no 'data' do banco
  const chartData = lastSevenDays.map(day => {
    // Procura no array que veio do backend se algum _id bate com o dia atual do loop
    const dayData = data?.find(d => isSameDay(parseISO(d._id), day))
    
    return {
      // Ex: "Seg", "Ter"...
      day: format(day, 'EEE', { locale: ptBR }),
      // Se achou dado, converte minutos para horas. Se não, é 0.
      hours: dayData ? Number((dayData.minutes / 60).toFixed(1)) : 0
    }
  })

  return (
    <ChartCard
      title="Atividade Semanal"
      description="Volume de treino nos últimos 7 dias"
      icon={<Activity className="h-4 w-4 text-primary" />}
      className="lg:col-span-4"
    >
      <div className="h-[250px] w-full">
        {/* Agora o gráfico nunca estará "vazio", ele mostrará as barras zeradas */}
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis 
              dataKey="day" 
              axisLine={false} 
              tickLine={false} 
              className="capitalize"
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `${value}h`}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            />
            <Tooltip 
              cursor={{ fill: 'hsl(var(--primary) / 0.08)' }}
              content={<ChartTooltip unit="h"/>} 
            />
            <Bar
              dataKey="hours"
              fill="hsl(var(--primary))"
              radius={[4, 4, 0, 0]}
              barSize={40}
              // Animação para ficar elegante ao carregar
              animationDuration={1000}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  )
}