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

const weeklyActivity = [
  { day: 'Seg', hours: 1.5 },
  { day: 'Ter', hours: 1.2 },
  { day: 'Qua', hours: 0 },
  { day: 'Qui', hours: 1.8 },
  { day: 'Sex', hours: 1.5 },
  { day: 'Sab', hours: 2.0 },
  { day: 'Dom', hours: 0 },
]

export function ActivityChart() {
  return (
    <ChartCard
      title="Atividade Semanal"
      description="Volume de treino nos últimos 7 dias"
      icon={<Activity className="h-4 w-4 text-primary" />}
      className="lg:col-span-4"
    >
      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={weeklyActivity}>
            <XAxis dataKey="day" axisLine={false} tickLine={false} />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `${value}h`}
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
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  )
}
