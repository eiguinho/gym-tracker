'use client'

import { useDroppable } from '@dnd-kit/core'
import { WorkoutLog } from '@/types/workout'
import { format, isToday } from 'date-fns'
import { X } from 'lucide-react'

interface DroppableDayProps {
  day: Date
  isCurrentMonth: boolean
  dayLogs: WorkoutLog[]
  onDeleteLog: (logId: string) => void
}

export function DroppableDay({ day, isCurrentMonth, dayLogs, onDeleteLog }: DroppableDayProps) {
  const isTodayDate = isToday(day)
  
  const { isOver, setNodeRef } = useDroppable({
    id: `day-${day.toISOString()}`,
    data: { date: day } 
  })

  return (
    <div 
      ref={setNodeRef}
      className={`
        border-r border-b border-gray-100 dark:border-gray-800/60 p-2 min-h-[120px] transition-all duration-200
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
      </div>
      
      <div className="mt-2 space-y-1">
        {dayLogs.map(log => (
          <div 
            key={log._id} 
            className="group relative flex items-center justify-between text-xs p-1.5 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400 rounded border border-indigo-100 dark:border-indigo-800/50 overflow-hidden"
          >
            <span className="truncate font-medium pr-5">{log.workout?.title}</span>
            
            <button 
              onClick={(e) => {
                e.stopPropagation()
                onDeleteLog(log._id)
              }}
              className="absolute right-1 opacity-0 group-hover:opacity-100 p-0.5 text-indigo-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded transition-all bg-indigo-50 dark:bg-transparent"
              title="Remover do calendário"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}