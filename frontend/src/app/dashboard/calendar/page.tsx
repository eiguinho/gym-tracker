'use client'

import { useState, useEffect } from 'react'
import { PageHeader } from '@/components/ui/page-header'
import { BaseCard } from '@/components/ui/base-card'
import { Spinner } from '@/components/ui/spinner'
import { workoutService } from '@/services/workout-service'
import { Workout, WorkoutLog } from '@/types/workout'
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  isSameMonth, 
  isSameDay, 
  eachDayOfInterval,
  isToday
} from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ChevronLeft, ChevronRight, Dumbbell } from 'lucide-react'

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [workouts, setWorkouts] = useState<Workout[]>([])
  const [logs, setLogs] = useState<WorkoutLog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      setLoading(true)
      try {
        const monthStart = startOfMonth(currentDate)
        const monthEnd = endOfMonth(currentDate)
        
        const [workoutsData, logsData] = await Promise.all([
          workoutService.getAll(),
          workoutService.getCalendarLogs(monthStart, monthEnd)
        ])
        
        setWorkouts(workoutsData)
        setLogs(logsData)
      } catch (error) {
        console.error("Erro ao carregar dados do calendário", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [currentDate])

  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(monthStart)
  const startDate = startOfWeek(monthStart)
  const endDate = endOfWeek(monthEnd)
  const calendarDays = eachDayOfInterval({ start: startDate, end: endDate })

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1))
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1))

  return (
    <div className="min-h-screen bg-gray-50 p-8 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl">
        <PageHeader 
          title="Calendário de Treinos" 
          description="Organize sua rotina arrastando seus treinos para os dias do mês."
        />

        <div className="mt-8 flex flex-col gap-6 lg:flex-row">
          
          <div className="w-full lg:w-80 flex-shrink-0 space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
              Meus Treinos
            </h3>
            {loading ? (
              <Spinner />
            ) : workouts.length === 0 ? (
              <p className="text-sm text-gray-500">Nenhum treino criado ainda.</p>
            ) : (
              <div className="space-y-3">
                {workouts.map((workout) => (
                  <BaseCard 
                    key={workout._id} 
                    className="p-4 cursor-grab active:cursor-grabbing hover:border-indigo-500 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg text-indigo-600 dark:text-indigo-400">
                        <Dumbbell size={20} />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white text-sm">{workout.title}</p>
                        <p className="text-xs text-gray-500">{workout.intensityLevel}</p>
                      </div>
                    </div>
                  </BaseCard>
                ))}
              </div>
            )}
          </div>

          <div className="flex-1">
            <BaseCard className="overflow-hidden bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
              
              <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 p-4">
                <h2 className="text-lg font-bold capitalize text-gray-900 dark:text-white">
                  {format(currentDate, 'MMMM yyyy', { locale: ptBR })}
                </h2>
                <div className="flex gap-2">
                  <button onClick={prevMonth} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-300">
                    <ChevronLeft size={20} />
                  </button>
                  <button onClick={nextMonth} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-300">
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-7 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
                {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => (
                  <div key={day} className="py-2 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 auto-rows-[120px]">
                {calendarDays.map((day, idx) => {
                  const isCurrentMonth = isSameMonth(day, monthStart)
                  const isTodayDate = isToday(day)
                  
                  const dayLogs = logs.filter(log => isSameDay(new Date(log.date), day))

                  return (
                    <div 
                      key={day.toString()} 
                      className={`
                        border-r border-b border-gray-100 dark:border-gray-800/60 p-2 transition-colors
                        ${!isCurrentMonth ? 'bg-gray-50/50 dark:bg-gray-900/20 text-gray-400 dark:text-gray-600' : 'bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-300'}
                        ${(idx + 1) % 7 === 0 ? 'border-r-0' : ''}
                      `}
                    >
                      <div className="flex justify-between items-start">
                        <span className={`
                          text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full
                          ${isTodayDate ? 'bg-indigo-600 text-white' : ''}
                        `}>
                          {format(day, 'd')}
                        </span>
                      </div>
                      
                      <div className="mt-2 space-y-1">
                        {dayLogs.map(log => (
                          <div key={log._id} className="text-xs p-1.5 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400 rounded border border-indigo-100 dark:border-indigo-800/50 truncate">
                            {log.workout?.title}
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>

            </BaseCard>
          </div>

        </div>
      </div>
    </div>
  )
}