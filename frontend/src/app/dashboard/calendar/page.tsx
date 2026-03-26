'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/ui/page-header'
import { Spinner } from '@/components/ui/spinner'
import { WorkoutLog } from '@/types/workout'
import { SleepLog } from '@/types/sleep'
import { addMonths, subMonths, isSameDay } from 'date-fns'
import { DndContext, useSensor, useSensors, PointerSensor, DragOverlay } from '@dnd-kit/core'

import { CheckInModal } from '@/components/calendar/check-in-modal'
import { SleepModal } from '@/components/calendar/sleep-modal'
import { WorkoutSidebar } from '@/components/calendar/workout-sidebar'
import { CalendarGrid } from '@/components/calendar/calendar-grid'
import { DaySummary } from '@/components/calendar/day-summary' 
import { ScheduleWorkoutModal } from '@/components/calendar/schedule-workout-modal'
import { AlertModal } from '@/components/ui/alert-modal'
import { useCalendarData } from '@/hooks/use-calendar-data'

export default function CalendarPage() {
  const { 
    currentDate, setCurrentDate, selectedDate, setSelectedDate, 
    workouts, logs, sleepLogs, loading, isUpdating, monthStart, calendarDays, 
    handleDragStart, handleDragEnd, activeId,
    handleDeleteLog, handleDeleteSleep, handleScheduleWorkout, 
    fetchLogs, fetchSleep 
  } = useCalendarData()

  const [selectedLogForCheckIn, setSelectedLogForCheckIn] = useState<WorkoutLog | null>(null)
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false)
  
  const [logToDelete, setLogToDelete] = useState<string | null>(null)

  const [sleepModal, setSleepModal] = useState<{
    isOpen: boolean;
    day: Date | null;
    log?: SleepLog;
    isAlreadyRegistered: boolean;
  }>({ isOpen: false, day: null, isAlreadyRegistered: false })

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }))

  const selectedDayLogs = logs.filter(log => isSameDay(new Date(log.date), selectedDate))
  const selectedDaySleepLog = sleepLogs.find(log => isSameDay(new Date(log.date), selectedDate))
  const activeWorkouts = workouts.filter(w => w.isActive)

  const activeWorkout = activeWorkouts.find(w => w._id === activeId) || 
                        logs.find(l => l._id === activeId)?.workout

  const handleOpenSleepModal = (day: Date, existingLog?: SleepLog) => {
    const yesterday = new Date(day)
    yesterday.setDate(yesterday.getDate() - 1)
    const hasMoonYesterday = sleepLogs.some(log => isSameDay(new Date(log.date), yesterday))

    setSleepModal({
      isOpen: true,
      day,
      log: existingLog,
      isAlreadyRegistered: hasMoonYesterday
    })
  }

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="min-h-screen bg-gray-50 p-8 dark:bg-gray-950">
        <div className="mx-auto max-w-7xl">
          
          <div className="flex justify-between items-center">
            <PageHeader title="Calendário de Treinos e Sono" description="Organize a sua rotina diária." />
            {isUpdating && <Spinner />}
          </div>

          <div className="mt-8 flex flex-col gap-6 lg:flex-row">
            <div className="hidden lg:block w-80 shrink-0">
              <WorkoutSidebar workouts={activeWorkouts} loading={loading} />
            </div>
            
            <div className="flex-1 flex flex-col gap-6">
              <CalendarGrid 
                currentDate={currentDate} 
                monthStart={monthStart} 
                calendarDays={calendarDays}
                logs={logs} 
                sleepLogs={sleepLogs} 
                selectedDate={selectedDate} 
                onDayClick={setSelectedDate} 
                onPrevMonth={() => setCurrentDate(subMonths(currentDate, 1))}
                onNextMonth={() => setCurrentDate(addMonths(currentDate, 1))}
                onDeleteLog={(id) => setLogToDelete(id)}
                onClickLog={setSelectedLogForCheckIn}
                onClickSleep={handleOpenSleepModal}
              />

              <DaySummary 
                selectedDate={selectedDate}
                dayLogs={selectedDayLogs}
                daySleepLog={selectedDaySleepLog}
                allWorkouts={activeWorkouts}
                onAddWorkoutClick={() => setIsScheduleModalOpen(true)}
                onDeleteWorkout={handleDeleteLog} 
                onDeleteSleep={handleDeleteSleep}
              />
            </div>
          </div>
        </div>
        
        <CheckInModal 
          isOpen={!!selectedLogForCheckIn} 
          log={selectedLogForCheckIn}
          onClose={() => setSelectedLogForCheckIn(null)}
          onSuccess={() => { setSelectedLogForCheckIn(null); fetchLogs(); }}
        />

        <SleepModal 
          isOpen={sleepModal.isOpen} 
          day={sleepModal.day} 
          existingLog={sleepModal.log}
          isNightAlreadyRegistered={sleepModal.isAlreadyRegistered}
          onClose={() => setSleepModal(prev => ({ ...prev, isOpen: false }))}
          onSuccess={() => { setSleepModal(prev => ({ ...prev, isOpen: false })); fetchSleep(); }}
        />

        <ScheduleWorkoutModal 
          isOpen={isScheduleModalOpen} 
          onClose={() => setIsScheduleModalOpen(false)}
          workouts={activeWorkouts}
          onSelectWorkout={(id) => {
            handleScheduleWorkout(id);
            setIsScheduleModalOpen(false);
          }}
        />

        <DragOverlay zIndex={1000}>
          {activeId && (
            <div className="w-64 cursor-grabbing scale-105 transition-transform">
              <div className="rounded-lg bg-indigo-600 p-3 text-white text-sm font-medium shadow-2xl border border-indigo-400">
                {typeof activeWorkout === 'object' ? activeWorkout.title : 'Arraste para um dia de treino!'}
              </div>
            </div>
          )}
        </DragOverlay>

        <AlertModal
          isOpen={!!logToDelete}
          onClose={() => setLogToDelete(null)}
          onConfirm={() => {
            if (logToDelete) {
              handleDeleteLog(logToDelete);
              setLogToDelete(null);
            }
          }}
          title="Remover Treino"
          description="Tem certeza que deseja remover este treino do calendário?"
          confirmText="Sim, remover"
        />

      </div>
    </DndContext>
  )
}