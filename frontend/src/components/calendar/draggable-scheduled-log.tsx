'use client'

import { useDraggable } from '@dnd-kit/core'
import { WorkoutLog } from '@/types/workout'
import { X } from 'lucide-react'

interface DraggableScheduledLogProps {
  log: WorkoutLog
  onDelete: (logId: string) => void
}

export function DraggableScheduledLog({ log, onDelete }: DraggableScheduledLogProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `scheduled-log-${log._id}`,
    data: { 
      type: 'scheduled-log',
      log 
    }
  })

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    zIndex: isDragging ? 50 : 1,
    opacity: isDragging ? 0.8 : 1,
  } : undefined

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      {...listeners} 
      {...attributes}
      className={`
        group relative flex items-center justify-between text-xs p-1.5 rounded border truncate
        ${isDragging 
          ? 'bg-indigo-100 border-indigo-300 text-indigo-800 shadow-lg cursor-grabbing' 
          : 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400 border-indigo-100 dark:border-indigo-800/50 cursor-grab hover:bg-indigo-100 dark:hover:bg-indigo-900/40'}
      `}
    >
      <span className="truncate font-medium pr-5 pointer-events-none">
        {log.workout?.title}
      </span>
      
      <button 
        onPointerDown={(e) => {
          e.stopPropagation() 
          onDelete(log._id)
        }}
        className="absolute right-1 opacity-0 group-hover:opacity-100 p-0.5 text-indigo-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded transition-all bg-indigo-50 dark:bg-transparent z-10"
        title="Remover do calendário"
      >
        <X size={14} />
      </button>
    </div>
  )
}