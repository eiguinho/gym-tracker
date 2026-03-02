'use client'

import { BaseCard } from '@/components/ui/base-card'
import { DroppableDay } from './droppable-day'
import { WorkoutLog } from '@/types/workout'
import { SleepLog } from '@/types/sleep'
import { format, isSameMonth, isSameDay } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface CalendarGridProps {
  currentDate: Date
  monthStart: Date
  calendarDays: Date[]
  logs: WorkoutLog[]
  sleepLogs: SleepLog[]
  onPrevMonth: () => void
  onNextMonth: () => void
  onDeleteLog: (logId: string) => void
  onClickLog: (log: WorkoutLog) => void
  onClickSleep: (day: Date, existingLog?: SleepLog) => void
}

export function CalendarGrid({
  currentDate, monthStart, calendarDays, logs, sleepLogs,
  onPrevMonth, onNextMonth, onDeleteLog, onClickLog, onClickSleep
}: CalendarGridProps) {
  return (
    <div className="flex-1">
      <BaseCard className="overflow-hidden bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
        
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 p-4">
          <h2 className="text-lg font-bold capitalize text-gray-900 dark:text-white">
            {format(currentDate, 'MMMM yyyy', { locale: ptBR })}
          </h2>
          <div className="flex gap-2">
            <button onClick={onPrevMonth} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-300">
              <ChevronLeft size={20} />
            </button>
            <button onClick={onNextMonth} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-300">
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
            const daySleepLog = sleepLogs.find(log => isSameDay(new Date(log.date), day))

            return (
              <DroppableDay 
                key={day.toISOString()} 
                day={day} 
                isCurrentMonth={isCurrentMonth} 
                dayLogs={dayLogs} 
                sleepLog={daySleepLog}
                onDeleteLog={onDeleteLog}
                onClickLog={onClickLog}
                onClickSleep={onClickSleep}
              />
            )
          })}
        </div>

      </BaseCard>
    </div>
  )
}