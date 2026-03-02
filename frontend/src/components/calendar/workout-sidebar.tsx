'use client'

import { Spinner } from '@/components/ui/spinner'
import { Workout } from '@/types/workout'
import { DraggableWorkout } from './draggable-workout'

interface WorkoutSidebarProps {
  workouts: Workout[]
  loading: boolean
}

export function WorkoutSidebar({ workouts, loading }: WorkoutSidebarProps) {
  return (
    <div className="w-full lg:w-80 flex-shrink-0 space-y-4">
      <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
        Meus Treinos
      </h3>
      {loading ? (
        <Spinner />
      ) : workouts.length === 0 ? (
        <p className="text-sm text-gray-500">Nenhum treino criado ainda.</p>
      ) : (
        <div className="space-y-3">
          {workouts.map((workout) => (
            <DraggableWorkout key={workout._id} workout={workout} />
          ))}
        </div>
      )}
    </div>
  )
}