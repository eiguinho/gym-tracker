'use client'

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip
} from 'recharts'
import { Dumbbell } from 'lucide-react'
import { ChartCard } from '@/components/ui/chart-card'
import { ChartTooltip } from '@/components/ui/chart-tooltip'

const muscleDistribution = [
  { name: 'Peito', value: 30, color: 'hsl(var(--chart-1))' },
  { name: 'Costas', value: 25, color: 'hsl(var(--chart-2))' },
  { name: 'Pernas', value: 20, color: 'hsl(var(--chart-3))' },
  { name: 'Ombros', value: 15, color: 'hsl(var(--chart-4))' },
  { name: 'Braços', value: 10, color: 'hsl(var(--chart-5))' },
]

export function MuscleChart() {
  return (
    <ChartCard
      title="Foco Muscular"
      description="Distribuição dos treinos no mês"
      icon={<Dumbbell className="h-4 w-4 text-accent" />}
      className="lg:col-span-3"
    >
      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={muscleDistribution}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {muscleDistribution.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
                cursor={{ fill: 'hsl(var(--primary) / 0.08)' }}
                content={<ChartTooltip unit="h"/>} 
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  )
}
