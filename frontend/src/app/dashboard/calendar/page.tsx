'use client'

import { useState, useEffect } from 'react'
import { PageHeader } from '@/components/ui/page-header'
import { Spinner } from '@/components/ui/spinner'
import { workoutService } from '@/services/workout-service'
import { sleepService } from '@/services/sleep-service'
import { Workout, WorkoutLog } from '@/types/workout'
import { SleepLog } from '@/types/sleep'
import { addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay } from 'date-fns'

import { DndContext, DragEndEvent, useSensor, useSensors, PointerSensor } from '@dnd-kit/core'
import { CheckInModal } from '@/components/calendar/check-in-modal'
import { SleepModal } from '@/components/calendar/sleep-modal'
import { WorkoutSidebar } from '@/components/calendar/workout-sidebar'
import { CalendarGrid } from '@/components/calendar/calendar-grid'
import { DaySummary } from '@/components/calendar/day-summary' 

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())

  const [workouts, setWorkouts] = useState<Workout[]>([])
  const [logs, setLogs] = useState<WorkoutLog[]>([])
  const [sleepLogs, setSleepLogs] = useState<SleepLog[]>([])
  
  const [loading, setLoading] = useState(true)
  const [isUpdating, setIsUpdating] = useState(false)
  
  const [selectedLogForCheckIn, setSelectedLogForCheckIn] = useState<WorkoutLog | null>(null)
  const [isSleepModalOpen, setIsSleepModalOpen] = useState(false)
  const [selectedDayForSleep, setSelectedDayForSleep] = useState<Date | null>(null)
  const [selectedSleepLog, setSelectedSleepLog] = useState<SleepLog | undefined>(undefined)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  )

  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(monthStart)
  const startDate = startOfWeek(monthStart)
  const endDate = endOfWeek(monthEnd)
  const calendarDays = eachDayOfInterval({ start: startDate, end: endDate })

  const loadData = async () => {
    setLoading(true)
    try {
      const [workoutsData, logsData, sleepData] = await Promise.all([
        workoutService.getAll(),
        workoutService.getCalendarLogs(monthStart, monthEnd),
        sleepService.getLogs(monthStart, monthEnd)
      ])
      setWorkouts(workoutsData)
      setLogs(logsData)
      setSleepLogs(sleepData)
    } catch (error) {
      console.error("Erro ao carregar dados", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadData() }, [currentDate])

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || !over.data.current || !active.data.current) return

    const targetDate = over.data.current.date
    const dragType = active.data.current.type

    setIsUpdating(true)
    try {
      if (dragType === 'sidebar-workout') {
        await workoutService.scheduleWorkout(active.data.current.workout._id, targetDate)
      } else if (dragType === 'scheduled-log') {
        await workoutService.moveCalendarLog(active.data.current.log._id, targetDate)
      }
      const logsData = await workoutService.getCalendarLogs(monthStart, monthEnd)
      setLogs(logsData)
      
      setSelectedDate(targetDate)
      
    } catch (error: any) {
      alert(error.response?.data?.message || 'Erro ao processar a ação.')
    } finally {
      setIsUpdating(false)
    }
  }

  const handleDeleteLog = async (logId: string) => {
    if (!confirm('Tem certeza que deseja remover este treino?')) return;
    setIsUpdating(true)
    try {
      await workoutService.deleteCalendarLog(logId)
      const logsData = await workoutService.getCalendarLogs(monthStart, monthEnd)
      setLogs(logsData)
    } catch (error) {
      alert('Erro ao remover o treino do calendário.')
    } finally {
      setIsUpdating(false)
    }
  }

  const handleOpenSleepModal = (day: Date, existingLog?: SleepLog) => {
    setSelectedDayForSleep(day)
    setSelectedSleepLog(existingLog)
    setIsSleepModalOpen(true)
  }

  const selectedDayLogs = logs.filter(log => isSameDay(new Date(log.date), selectedDate))
  const selectedDaySleepLog = sleepLogs.find(log => isSameDay(new Date(log.date), selectedDate))

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="min-h-screen bg-gray-50 p-8 dark:bg-gray-950">
        <div className="mx-auto max-w-7xl">
          
          <div className="flex justify-between items-center">
            <PageHeader 
              title="Calendário de Treinos e Sono" 
              description="Organize a sua rotina e acompanhe seu descanso diário."
            />
            {isUpdating && <Spinner />}
          </div>

          <div className="mt-8 flex flex-col gap-6 lg:flex-row">
            <WorkoutSidebar workouts={workouts} loading={loading} />
            
            <div className="flex-1 flex flex-col gap-6">
              <CalendarGrid 
                currentDate={currentDate}
                monthStart={monthStart}
                calendarDays={calendarDays}
                logs={logs}
                sleepLogs={sleepLogs}
                selectedDate={selectedDate} // NOVO
                onDayClick={(day) => setSelectedDate(day)} // NOVO
                onPrevMonth={() => setCurrentDate(subMonths(currentDate, 1))}
                onNextMonth={() => setCurrentDate(addMonths(currentDate, 1))}
                onDeleteLog={handleDeleteLog}
                onClickLog={(log) => setSelectedLogForCheckIn(log)}
                onClickSleep={handleOpenSleepModal}
              />

              <DaySummary 
                selectedDate={selectedDate}
                dayLogs={selectedDayLogs}
                daySleepLog={selectedDaySleepLog}
                allWorkouts={workouts}
              />
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

        <SleepModal 
          isOpen={isSleepModalOpen}
          day={selectedDayForSleep}
          existingLog={selectedSleepLog}
          onClose={() => setIsSleepModalOpen(false)}
          onSuccess={async () => {
            setIsSleepModalOpen(false)
            const sleepData = await sleepService.getLogs(monthStart, monthEnd)
            setSleepLogs(sleepData)
          }}
        />

      </div>
    </DndContext>
  )
}