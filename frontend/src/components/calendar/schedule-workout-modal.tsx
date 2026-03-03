'use client'

import { Modal } from '@/components/ui/modal'
import { Workout } from '@/types/workout'
import { Dumbbell, ChevronRight } from 'lucide-react'

interface ScheduleWorkoutModalProps {
  isOpen: boolean
  onClose: () => void
  workouts: Workout[]
  onSelectWorkout: (workoutId: string) => void
}

export function ScheduleWorkoutModal({ isOpen, onClose, workouts, onSelectWorkout }: ScheduleWorkoutModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Adicionar Treino">
      <div className="mb-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Qual treino você deseja agendar para este dia?
        </p>
      </div>

      <div className="max-h-[60vh] overflow-y-auto space-y-2 pr-1 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-800">
        {workouts.length === 0 ? (
          <p className="text-sm text-center py-4 text-gray-500">Nenhum treino criado ainda.</p>
        ) : (
          workouts.map((workout) => (
            <button
              key={workout._id}
              onClick={() => onSelectWorkout(workout._id)}
              className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-indigo-50 dark:bg-gray-800/50 dark:hover:bg-indigo-900/20 border border-gray-100 dark:border-gray-800 rounded-xl transition-colors group text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center flex-shrink-0">
                  <Dumbbell size={18} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {workout.title}
                  </h4>
                  <p className="text-xs text-gray-500 mt-0.5 capitalize">{workout.intensityLevel}</p>
                </div>
              </div>
              <ChevronRight size={18} className="text-gray-400 group-hover:text-indigo-500 transition-colors" />
            </button>
          ))
        )}
      </div>
    </Modal>
  )
}