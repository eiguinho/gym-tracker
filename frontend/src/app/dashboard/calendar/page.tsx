'use client'

import { useState, useEffect } from 'react'
import { PageHeader } from '@/components/ui/page-header'
import { BaseCard } from '@/components/ui/base-card'
import { Spinner } from '@/components/ui/spinner'
import { workoutService } from '@/services/workout-service'
import { Workout, WorkoutLog } from '@/types/workout'
import { DraggableWorkout } from '@/components/calendar/draggable-workout'
import { DroppableDay } from '@/components/calendar/droppable-day'
import { 
  format, addMonths, subMonths, startOfMonth, endOfMonth, 
  startOfWeek, endOfWeek, isSameMonth, isSameDay, eachDayOfInterval 
} from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { DndContext, DragEndEvent, useSensor, useSensors, PointerSensor } from '@dnd-kit/core'
import { CheckInModal } from '@/components/calendar/check-in-modal'

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [workouts, setWorkouts] = useState<Workout[]>([])
  const [logs, setLogs] = useState<WorkoutLog[]>([])
  const [loading, setLoading] = useState(true)
  const [isUpdating, setIsUpdating] = useState(false)
  const [selectedLogForCheckIn, setSelectedLogForCheckIn] = useState<WorkoutLog | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, 
      },
    })
  )

  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(monthStart)
  const startDate = startOfWeek(monthStart)
  const endDate = endOfWeek(monthEnd)
  const calendarDays = eachDayOfInterval({ start: startDate, end: endDate })

  const loadData = async () => {
    setLoading(true)
    try {
      const [workoutsData, logsData] = await Promise.all([
        workoutService.getAll(),
        workoutService.getCalendarLogs(monthStart, monthEnd)
      ])
      setWorkouts(workoutsData)
      setLogs(logsData)
    } catch (error) {
      console.error("Erro ao carregar dados", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [currentDate])

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1))
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1))

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event
    
    if (over && over.data.current && active.data.current) {
      const targetDate = over.data.current.date
      const dragType = active.data.current.type

      setIsUpdating(true)
      try {
        if (dragType === 'sidebar-workout') {
          const workoutId = active.data.current.workout._id
          await workoutService.scheduleWorkout(workoutId, targetDate)
        } 
        else if (dragType === 'scheduled-log') {
          const logId = active.data.current.log._id
          await workoutService.moveCalendarLog(logId, targetDate)
        }

        const logsData = await workoutService.getCalendarLogs(monthStart, monthEnd)
        setLogs(logsData)
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || 'Erro ao processar a ação. Tente novamente.'
        alert(errorMessage)
      } finally {
        setIsUpdating(false)
      }
    }
  }

  const handleDeleteLog = async (logId: string) => {
    if (!confirm('Tem certeza que deseja remover este treino do calendário?')) return;
    
    setIsUpdating(true)
    try {
      await workoutService.deleteCalendarLog(logId)
      const logsData = await workoutService.getCalendarLogs(monthStart, monthEnd)
      setLogs(logsData)
    } catch (error) {
      console.error("Erro ao remover:", error)
      alert('Erro ao remover o treino do calendário.')
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="min-h-screen bg-gray-50 p-8 dark:bg-gray-950">
        <div className="mx-auto max-w-7xl">
          
          <div className="flex justify-between items-center">
            <PageHeader 
              title="Calendário de Treinos" 
              description="Organize a sua rotina arrastando os seus treinos para os dias do mês."
            />
            {isUpdating && <Spinner />}
          </div>

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
                    <DraggableWorkout key={workout._id} workout={workout} />
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

                <div className="grid grid-cols-7">
                  {calendarDays.map((day) => {
                    const isCurrentMonth = isSameMonth(day, monthStart)
                    const dayLogs = logs.filter(log => isSameDay(new Date(log.date), day))

                    return (
                      <DroppableDay 
                        key={day.toISOString()} 
                        day={day} 
                        isCurrentMonth={isCurrentMonth} 
                        dayLogs={dayLogs} 
                        onDeleteLog={handleDeleteLog}
                        onClickLog={(log) => setSelectedLogForCheckIn(log)}
                      />
                    )
                  })}
                </div>

              </BaseCard>
            </div>

          </div>
        </div>
        
        <CheckInModal 
          isOpen={!!selectedLogForCheckIn}
          log={selectedLogForCheckIn}
          onClose={() => setSelectedLogForCheckIn(null)}
          onSuccess={async () => {
            setSelectedLogForCheckIn(null)
            const logsData = await workoutService.getCalendarLogs(monthStart, monthEnd)
            setLogs(logsData)
          }}
        />
      </div>
    </DndContext>
  )
}