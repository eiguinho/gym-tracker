'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/ui/page-header'
import { Spinner } from '@/components/ui/spinner'
import { WorkoutLog } from '@/types/workout'
import { SleepLog } from '@/types/sleep'
import { addMonths, subMonths, isSameDay } from 'date-fns'
import { DndContext, useSensor, useSensors, PointerSensor } from '@dnd-kit/core'

import { CheckInModal } from '@/components/calendar/check-in-modal'
import { SleepModal } from '@/components/calendar/sleep-modal'
import { WorkoutSidebar } from '@/components/calendar/workout-sidebar'
import { CalendarGrid } from '@/components/calendar/calendar-grid'
import { DaySummary } from '@/components/calendar/day-summary' 
import { ScheduleWorkoutModal } from '@/components/calendar/schedule-workout-modal'
import { useCalendarData } from '@/hooks/use-calendar-data'

export default function CalendarPage() {
  // Chamamos o Cérebro com apenas 1 linha
  const { 
    currentDate, setCurrentDate, selectedDate, setSelectedDate, 
    workouts, logs, sleepLogs, loading, isUpdating, monthStart, calendarDays, 
    handleDragEnd, handleDeleteLog, handleDeleteSleep, handleScheduleWorkout, 
    fetchLogs, fetchSleep 
  } = useCalendarData()

  const [selectedLogForCheckIn, setSelectedLogForCheckIn] = useState<WorkoutLog | null>(null)
  const [isSleepModalOpen, setIsSleepModalOpen] = useState(false)
  const [selectedDayForSleep, setSelectedDayForSleep] = useState<Date | null>(null)
  const [selectedSleepLog, setSelectedSleepLog] = useState<SleepLog | undefined>(undefined)
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false)

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }))

  const selectedDayLogs = logs.filter(log => isSameDay(new Date(log.date), selectedDate))
  const selectedDaySleepLog = sleepLogs.find(log => isSameDay(new Date(log.date), selectedDate))

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="min-h-screen bg-gray-50 p-8 dark:bg-gray-950">
        <div className="mx-auto max-w-7xl">
          
          <div className="flex justify-between items-center">
            <PageHeader title="Calendário de Treinos e Sono" description="Organize a sua rotina diária." />
            {isUpdating && <Spinner />}
          </div>

          <div className="mt-8 flex flex-col gap-6 lg:flex-row">
            <div className="hidden lg:block w-80 shrink-0">
              <WorkoutSidebar workouts={workouts} loading={loading} />
            </div>
            
            <div className="flex-1 flex flex-col gap-6">
              <CalendarGrid 
                currentDate={currentDate} monthStart={monthStart} calendarDays={calendarDays}
                logs={logs} sleepLogs={sleepLogs} selectedDate={selectedDate} 
                onDayClick={setSelectedDate} 
                onPrevMonth={() => setCurrentDate(subMonths(currentDate, 1))}
                onNextMonth={() => setCurrentDate(addMonths(currentDate, 1))}
                onDeleteLog={handleDeleteLog}
                onClickLog={setSelectedLogForCheckIn}
                onClickSleep={(day, existingLog) => {
                  setSelectedDayForSleep(day)
                  setSelectedSleepLog(existingLog)
                  setIsSleepModalOpen(true)
                }}
              />

              <DaySummary 
                selectedDate={selectedDate} dayLogs={selectedDayLogs} daySleepLog={selectedDaySleepLog} allWorkouts={workouts}
                onAddWorkoutClick={() => setIsScheduleModalOpen(true)}
                onDeleteWorkout={handleDeleteLog} onDeleteSleep={handleDeleteSleep}
              />
            </div>
          </div>
        </div>
        
        <CheckInModal 
          isOpen={!!selectedLogForCheckIn} log={selectedLogForCheckIn}
          onClose={() => setSelectedLogForCheckIn(null)}
          onSuccess={() => { setSelectedLogForCheckIn(null); fetchLogs(); }}
        />

        <SleepModal 
          isOpen={isSleepModalOpen} day={selectedDayForSleep} existingLog={selectedSleepLog}
          onClose={() => setIsSleepModalOpen(false)}
          onSuccess={() => { setIsSleepModalOpen(false); fetchSleep(); }}
        />

        <ScheduleWorkoutModal 
          isOpen={isScheduleModalOpen} onClose={() => setIsScheduleModalOpen(false)} workouts={workouts}
          onSelectWorkout={(id) => {
            handleScheduleWorkout(id);
            setIsScheduleModalOpen(false);
          }}
        />

      </div>
    </DndContext>
  )
}