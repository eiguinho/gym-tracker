'use client'

import { useDraggable } from '@dnd-kit/core'
import { WorkoutLog } from '@/types/workout'
import { X, CheckCircle2 } from 'lucide-react'

interface DraggableScheduledLogProps {
  log: WorkoutLog
  onDelete: (logId: string) => void
  onClick: (log: WorkoutLog) => void
}

export function DraggableScheduledLog({ log, onDelete, onClick }: DraggableScheduledLogProps) {
  const isCompleted = log.status === 'completed'

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `scheduled-log-${log._id}`,
    data: { type: 'scheduled-log', log }
  })

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    zIndex: isDragging ? 50 : 1,
    opacity: isDragging ? 0.8 : 1,
  } : undefined

  const colorClasses = isCompleted
    ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800/50 hover:bg-green-100 dark:hover:bg-green-900/40'
    : 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400 border-indigo-100 dark:border-indigo-800/50 hover:bg-indigo-100 dark:hover:bg-indigo-900/40'

  const draggingClasses = 'bg-gray-100 border-gray-300 text-gray-800 shadow-lg cursor-grabbing'

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      {...listeners} 
      {...attributes}
      onClick={() => onClick(log)}
      className={`
        group relative flex items-center justify-between text-xs p-1.5 rounded border transition-colors
        ${isDragging ? draggingClasses : `${colorClasses} cursor-pointer`}
      `}
    >
      <div className="flex items-center gap-1.5 truncate pr-5">
        {isCompleted && <CheckCircle2 size={12} className="flex-shrink-0" />}
        <span className="truncate font-medium pointer-events-none">
          {log.workout?.title}
        </span>
      </div>
      
      <button 
        onPointerDown={(e) => {
          e.stopPropagation() 
          onDelete(log._id)
        }}
        className={`absolute right-1 opacity-0 group-hover:opacity-100 p-0.5 rounded transition-all z-10
          ${isCompleted 
            ? 'text-green-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 bg-green-50 dark:bg-transparent' 
            : 'text-indigo-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 bg-indigo-50 dark:bg-transparent'}
        `}
        title="Remover do calendário"
      >
        <X size={14} />
      </button>
    </div>
  )
}