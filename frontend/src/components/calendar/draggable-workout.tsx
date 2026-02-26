'use client'

import { useDraggable } from '@dnd-kit/core'
import { Workout } from '@/types/workout'
import { BaseCard } from '@/components/ui/base-card'
import { Dumbbell } from 'lucide-react'

interface DraggableWorkoutProps {
  workout: Workout
}

export function DraggableWorkout({ workout }: DraggableWorkoutProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `workout-${workout._id}`, 
    data: { 
      type: 'sidebar-workout',
      workout 
    }
  })

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    zIndex: isDragging ? 50 : 1,
    opacity: isDragging ? 0.8 : 1,
    cursor: isDragging ? 'grabbing' : 'grab'
  } : undefined

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <BaseCard className="p-4 hover:border-indigo-500 transition-colors shadow-sm bg-white dark:bg-gray-900">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg text-indigo-600 dark:text-indigo-400">
            <Dumbbell size={20} />
          </div>
          <div>
            <p className="font-medium text-gray-900 dark:text-white text-sm">{workout.title}</p>
            <p className="text-xs text-gray-500">{workout.intensityLevel}</p>
          </div>
        </div>
      </BaseCard>
    </div>
  )
}