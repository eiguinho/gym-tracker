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
  const lastSevenDays = eachDayOfInterval({
    start: subDays(new Date(), 6),
    end: new Date(),
  })

  const chartData = lastSevenDays.map(day => {
    const dayData = data?.find(d => isSameDay(parseISO(d._id), day))
    
    return {
      day: format(day, 'EEE', { locale: ptBR }),
      hours: dayData ? Number((dayData.minutes / 60).toFixed(1)) : 0
    }
  })

  return (
    <ChartCard
      title="Atividade Semanal"
      description="Volume de treino nos últimos 7 dias"
      icon={<Activity className="h-4 w-4 text-primary" />}
      className="lg:col-span-4 flex flex-col"
    >
      <div className="min-h-[250px] sm:min-h-[300px] w-full mt-4 flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <XAxis 
              dataKey="day" 
              axisLine={false} 
              tickLine={false} 
              className="capitalize"
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
              tickFormatter={(value) => value.substring(0, 3)}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `${value}h`}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
            />
            <Tooltip 
              cursor={{ fill: 'hsl(var(--primary) / 0.08)' }}
              content={<ChartTooltip unit="h"/>} 
            />
            <Bar
              dataKey="hours"
              fill="hsl(var(--primary))"
              radius={[4, 4, 0, 0]}
              maxBarSize={40}
              animationDuration={1000}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  )
}