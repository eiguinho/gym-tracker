'use client'

import { useDroppable } from '@dnd-kit/core'
import { WorkoutLog } from '@/types/workout'
import { SleepLog } from '@/types/sleep'
import { format, isToday, startOfDay, isAfter } from 'date-fns'
import { Moon } from 'lucide-react'
import { DraggableScheduledLog } from './draggable-scheduled-log'

interface DroppableDayProps {
  day: Date
  isCurrentMonth: boolean
  dayLogs: WorkoutLog[]
  sleepLog?: SleepLog
  onDeleteLog: (logId: string) => void
  onClickLog: (log: WorkoutLog) => void
  onClickSleep: (day: Date, existingLog?: SleepLog) => void
}

export function DroppableDay({ day, isCurrentMonth, dayLogs, sleepLog, onDeleteLog, onClickLog, onClickSleep }: DroppableDayProps) {
  const isTodayDate = isToday(day)
  
  const isFutureDay = isAfter(startOfDay(day), startOfDay(new Date()))
  
  const { isOver, setNodeRef } = useDroppable({
    id: `day-${day.toISOString()}`,
    data: { date: day } 
  })

  return (
    <div 
      ref={setNodeRef}
      className={`
        border-r border-b border-gray-100 dark:border-gray-800/60 p-2 min-h-[120px] transition-all duration-200 relative group
        ${!isCurrentMonth ? 'bg-gray-50/50 dark:bg-gray-900/20 text-gray-400 dark:text-gray-600' : 'bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-300'}
        ${isOver ? 'bg-indigo-50/80 dark:bg-indigo-900/40 ring-2 ring-inset ring-indigo-500' : ''} 
      `}
    >
      <div className="flex justify-between items-start">
        <span className={`
          text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full
          ${isTodayDate ? 'bg-indigo-600 text-white' : ''}
        `}>
          {format(day, 'd')}
        </span>

        {!isFutureDay && (
          <button
            onClick={() => onClickSleep(day, sleepLog)}
            title={sleepLog ? "Editar sono" : "Registrar sono"}
            className={`
              p-1 rounded-md transition-colors 
              ${sleepLog 
                ? 'text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900/20'
                : 'text-gray-300 hover:text-gray-500 hover:bg-gray-100 dark:text-gray-700 dark:hover:text-gray-400 dark:hover:bg-gray-800 opacity-0 group-hover:opacity-100'
              }
            `}
          >
            <Moon size={16} className={sleepLog ? "fill-current" : ""} />
          </button>
        )}
      </div>
      
      <div className="mt-2 space-y-1">
        {dayLogs.map(log => (
          <DraggableScheduledLog 
            key={log._id} 
            log={log} 
            onDelete={onDeleteLog} 
            onClick={onClickLog}
          />
        ))}
      </div>
    </div>
  )
}