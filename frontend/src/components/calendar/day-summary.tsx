'use client'

import { Workout, WorkoutLog } from '@/types/workout'
import { SleepLog } from '@/types/sleep'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Dumbbell, Moon, Info, Activity } from 'lucide-react'
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip } from 'recharts'
import { BaseCard } from '@/components/ui/base-card'

interface DaySummaryProps {
  selectedDate: Date
  dayLogs: WorkoutLog[]
  daySleepLog?: SleepLog
  allWorkouts: Workout[] 
}

export function DaySummary({ selectedDate, dayLogs, daySleepLog, allWorkouts }: DaySummaryProps) {
  
  const calculateMuscleFocus = () => {
    const muscleVolume: Record<string, number> = {}
    
    dayLogs.forEach(log => {
      const workoutId = typeof log.workout === 'object' ? (log.workout as any)._id : log.workout;
      const fullWorkout = allWorkouts.find(w => w._id === workoutId) as any

      if (fullWorkout && fullWorkout.exercises) {
        fullWorkout.exercises.forEach((exItem: any) => {
          const exercise = exItem.exercise
          if (exercise && exercise.targetMuscles) {
            exercise.targetMuscles.forEach((muscle: string) => {
              muscleVolume[muscle] = (muscleVolume[muscle] || 0) + (exItem.sets || 1)
            })
          }
        })
      }
    })

    let finalData = Object.keys(muscleVolume).map(muscle => ({
      subject: muscle,
      A: muscleVolume[muscle],
    }))

    if (finalData.length > 0) {
      if (finalData.length === 1) {
        finalData.push({ subject: ' ', A: 0 }, { subject: '  ', A: 0 })
      } else if (finalData.length === 2) {
        finalData.push({ subject: ' ', A: 0 })
      }
    }

    return finalData
  }

  const muscleData = calculateMuscleFocus()

  return (
    <BaseCard className="mt-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="mb-6 border-b border-gray-100 dark:border-gray-800 pb-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white capitalize">
          Resumo do dia {format(selectedDate, "dd 'de' MMMM", { locale: ptBR })}
        </h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold">
            <Dumbbell size={20} />
            <h4>Treino de Hoje</h4>
          </div>
          
          {dayLogs.length > 0 ? (
            <div className="space-y-3">
              {dayLogs.map(log => (
                <div key={log._id} className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-700">
                  <p className="font-medium text-gray-900 dark:text-white">{log.workout?.title}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Status: {log.status === 'completed' ? '✅ Concluído' : '⏳ Planejado'}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg text-gray-500 text-sm">
              <Info size={18} className="text-gray-400 mt-0.5" />
              <p>Você ainda não preparou um treino para este dia.</p>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2 text-yellow-500 font-semibold">
            <Moon size={20} className="fill-current" />
            <h4>Qualidade do Sono</h4>
          </div>

          {daySleepLog ? (
            <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-700">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">Duração</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {Math.floor(daySleepLog.durationMinutes / 60)}h {daySleepLog.durationMinutes % 60}m
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">Qualidade</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {daySleepLog.qualityScore} / 5
                </span>
              </div>
              {daySleepLog.notes && (
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 italic">
                  "{daySleepLog.notes}"
                </p>
              )}
            </div>
          ) : (
            <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg text-gray-500 text-sm">
              <Info size={18} className="text-gray-400 mt-0.5" />
              <p>Nenhum registro de sono para esta noite.</p>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2 text-primary font-semibold">
            <Activity size={20} />
            <h4>Foco Muscular</h4>
          </div>

          {muscleData.length > 0 ? (
            <div className="h-[200px] w-full bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-700 p-2">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="60%" data={muscleData}>
                  <PolarGrid stroke="hsl(var(--muted-foreground) / 0.3)" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: 'hsl(var(--foreground))', fontSize: 10 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 'auto']} tick={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', backgroundColor: '#1f2937', color: '#fff' }}
                    itemStyle={{ color: '#818cf8' }}
                    formatter={(value: any) => [`${value} Séries`, 'Volume']}
                  />
                  <Radar name="Volume" dataKey="A" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.4} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="flex items-center justify-center h-[200px] bg-gray-50 dark:bg-gray-800/50 rounded-lg text-gray-400 text-sm border border-gray-100 dark:border-gray-700">
              Sem dados musculares
            </div>
          )}
        </div>

      </div>
    </BaseCard>
  )
}