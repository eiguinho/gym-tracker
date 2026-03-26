'use client'

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts'
import { Target } from 'lucide-react'
import { ChartCard } from '@/components/ui/chart-card'
import { MuscleDataPoint } from '@/types/dashboard'

interface MuscleChartProps {
  data?: MuscleDataPoint[]
}

export function MuscleChart({ data }: MuscleChartProps) {
  const sortedData = data?.sort((a, b) => b.A - a.A) || []

  return (
    <ChartCard
      title="Foco Muscular"
      description="Volume (séries) dos últimos 7 dias"
      icon={<Target className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />}
      className="lg:col-span-3 flex flex-col"
    >
      <div className="min-h-[300px] w-full flex items-center justify-center">
        {sortedData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={sortedData}>
              <PolarGrid stroke="hsl(var(--muted-foreground) / 0.3)" />
              <PolarAngleAxis 
                dataKey="subject" 
                tick={{ fill: 'hsl(var(--foreground))', fontSize: 11 }} 
              />
              <PolarRadiusAxis angle={30} domain={[0, 'auto']} tick={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ 
                  borderRadius: '8px', 
                  border: 'none', 
                  backgroundColor: '#1f2937', 
                  color: '#fff' 
                }}
                itemStyle={{ color: '#818cf8' }}
                formatter={(value) => {
                  const displayValue = value ? String(value) : '0';
                  return [displayValue + ' Séries', 'Volume'];
                }}
              />
              <Radar
                name="Volume"
                dataKey="A"
                stroke="#4f46e5"
                fill="#4f46e5"
                fillOpacity={0.4}
              />
            </RadarChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-center text-muted-foreground text-sm italic px-4">
            Faça check-in em seus treinos para descobrir seu foco muscular.
          </div>
        )}
      </div>
    </ChartCard>
  )
}