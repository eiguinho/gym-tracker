'use client'

import { useState } from 'react'
import { Workout, WorkoutLog } from '@/types/workout'
import { SleepLog } from '@/types/sleep'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Dumbbell, Moon, Info, Activity, X, Plus, CheckCircle2, Clock } from 'lucide-react'
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip } from 'recharts'
import { BaseCard } from '@/components/ui/base-card'
import { AlertModal } from '@/components/ui/alert-modal'

interface DaySummaryProps {
  selectedDate: Date
  dayLogs: WorkoutLog[]
  daySleepLog?: SleepLog
  allWorkouts: Workout[] 
  onAddWorkoutClick: () => void
  onDeleteWorkout: (id: string) => void
  onDeleteSleep: (id: string) => void
}

export function DaySummary({ selectedDate, dayLogs, daySleepLog, allWorkouts, onAddWorkoutClick, onDeleteWorkout, onDeleteSleep }: DaySummaryProps) {
  
  const [deleteTarget, setDeleteTarget] = useState<{ type: 'workout' | 'sleep', id: string } | null>(null)

  const handleConfirmDelete = () => {
    if (!deleteTarget) return

    if (deleteTarget.type === 'workout') {
      onDeleteWorkout(deleteTarget.id)
    } else if (deleteTarget.type === 'sleep') {
      onDeleteSleep(deleteTarget.id)
    }
    
    setDeleteTarget(null)
  }

  const calculateMuscleFocus = () => {
    const muscleVolume: Record<string, number> = {}

    dayLogs.forEach(log => {
      const workoutId = typeof log.workout === 'object' ? log.workout._id : log.workout;
      const fullWorkout = allWorkouts.find(w => w._id === workoutId);

      if (fullWorkout && fullWorkout.exercises) {
        fullWorkout.exercises.forEach((exItem) => {
          const exercise = exItem.exercise;
          if (exercise && exercise.targetMuscles) {
            exercise.targetMuscles.forEach((muscle) => {
              muscleVolume[muscle] = (muscleVolume[muscle] || 0) + (exItem.sets || 1);
            });
          }
        });
      }
    });

    const finalData = Object.entries(muscleVolume).map(([subject, volume]) => ({ 
      subject, 
      A: volume 
    }));

    if (finalData.length === 1) finalData.push({ subject: ' ', A: 0 }, { subject: '  ', A: 0 });
    else if (finalData.length === 2) finalData.push({ subject: ' ', A: 0 });
    
    return finalData;
  }

  const muscleData = calculateMuscleFocus()

  return (
    <>
      <BaseCard className="mt-6 p-6 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
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
                  <div key={log._id} className="group relative p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-700 pr-10">
                    <p className="font-medium text-gray-900 dark:text-white truncate">{log.workout?.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-gray-500">Status:</span> 
                      {log.status === 'completed' ? (
                        <span className="flex items-center gap-1 text-sm text-green-600 font-medium">
                          <CheckCircle2 size={16} /> Concluído
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-sm text-amber-500 font-medium">
                          <Clock size={16} /> Planejado
                        </span>
                      )}
                    </div>
                    
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        e.nativeEvent.stopImmediatePropagation();
                        setDeleteTarget({ type: 'workout', id: log._id });
                      }}
                      className="absolute top-1/2 -translate-y-1/2 right-2 p-1.5 text-red-500 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 rounded-md opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all z-10"
                      title="Excluir treino"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-3 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-lg text-gray-500 text-sm border border-gray-100 dark:border-gray-700 text-center">
                <p>Você ainda não preparou um treino para este dia.</p>
                <button 
                  onClick={onAddWorkoutClick}
                  className="mt-2 flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                >
                  <Plus size={16} /> Adicionar Treino
                </button>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-yellow-500 font-semibold">
              <Moon size={20} className="fill-current" />
              <h4>Qualidade do Sono</h4>
            </div>

            {daySleepLog ? (
              <div className="group relative p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-700 pr-10">
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
                
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    e.nativeEvent.stopImmediatePropagation();
                    setDeleteTarget({ type: 'sleep', id: daySleepLog._id! });
                  }}
                  className="absolute top-2 right-2 p-1.5 text-red-500 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 rounded-md opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all z-10"
                  title="Excluir registro de sono"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg text-gray-500 text-sm border border-gray-100 dark:border-gray-700">
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
                      formatter={(value: number | undefined) => {
                        if (value === undefined) return ["0 séries", "Volume"];
                        return [`${value.toLocaleString()} séries`, "Volume"];
                      }}
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

      <AlertModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
        title={deleteTarget?.type === 'workout' ? "Remover Treino" : "Remover Sono"}
        description={
          deleteTarget?.type === 'workout' 
            ? "Tem certeza que deseja remover este treino do calendário? Isso não apaga o treino da sua biblioteca." 
            : "Tem certeza que deseja apagar os dados de sono desta noite?"
        }
        confirmText="Sim, remover"
      />
    </>
  )
}