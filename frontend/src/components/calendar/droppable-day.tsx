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
  isSelected: boolean
  onDeleteLog: (logId: string) => void
  onClickLog: (log: WorkoutLog) => void
  onClickSleep: (day: Date, existingLog?: SleepLog) => void
  onDayClick: (day: Date) => void
}

export function DroppableDay({ day, isCurrentMonth, dayLogs, sleepLog, isSelected, onDeleteLog, onClickLog, onClickSleep, onDayClick }: DroppableDayProps) {
  const isTodayDate = isToday(day)
  const isFutureDay = isAfter(startOfDay(day), startOfDay(new Date()))
  
  const { isOver, setNodeRef } = useDroppable({
    id: `day-${day.toISOString()}`,
    data: { date: day } 
  })

  return (
    <div 
      ref={setNodeRef}
      onClick={() => onDayClick(day)}
      className={`
        border-r border-b border-gray-100 dark:border-gray-800/60 p-1 sm:p-2 min-h-[60px] sm:min-h-[120px] transition-all duration-200 relative group cursor-pointer
        ${!isCurrentMonth ? 'bg-gray-50/50 dark:bg-gray-900/20 text-gray-400 dark:text-gray-600' : 'bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-300'}
        ${isOver ? 'bg-indigo-50/80 dark:bg-indigo-900/40 ring-2 ring-inset ring-indigo-500' : ''} 
        /* NOVO: Se estiver selecionado, ganha uma borda azul grossa e um fundo azul clarinho */
        ${isSelected ? 'ring-2 ring-inset ring-indigo-500 bg-indigo-50/30 dark:bg-indigo-900/10' : 'hover:bg-gray-50 dark:hover:bg-gray-800/40'}
      `}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-0.5 sm:gap-1">
        <span className={`
          text-[10px] sm:text-sm font-medium w-4 h-4 sm:w-7 sm:h-7 flex items-center justify-center rounded-full
          ${isTodayDate ? 'bg-indigo-600 text-white' : ''}
        `}>
          {format(day, 'd')}
        </span>

        {!isFutureDay && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              onClickSleep(day, sleepLog);
            }}
            className={`
              p-0.5 sm:p-1 rounded-md transition-all duration-200
              ${sleepLog 
                ? 'text-yellow-500 hover:text-gray-600 dark:hover:text-gray-300'
                : 'text-gray-400 opacity-40 sm:opacity-0 sm:group-hover:opacity-100 hover:text-gray-600 dark:hover:text-gray-300'
              }
              cursor-pointer
            `}
            title={sleepLog ? "Ver/Editar registro de sono" : "Registrar sono"}
          >
            <Moon 
              className={`w-3 h-3 sm:w-4 sm:h-4 transition-all
                ${sleepLog ? "fill-current" : "group-hover:text-gray-600"} 
                /* Se houver log, no hover da célula o ícone perde o preenchimento para indicar ação */
                ${sleepLog ? "group-hover:fill-none" : ""}
              `} 
            />
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