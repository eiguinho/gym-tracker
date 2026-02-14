import { Workout } from '@/types/workout'
import { BaseCard } from '@/components/ui/base-card'

interface WorkoutCardProps {
  workout: Workout
}

export function WorkoutCard({ workout }: WorkoutCardProps) {
  const getIntensityColor = (level: string) => {
    switch (level) {
      case 'Leve': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      case 'Moderado': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
      case 'Intenso': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300'
      case 'Insano': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <BaseCard className="p-6 transition-all hover:shadow-md cursor-pointer hover:border-indigo-200 dark:hover:border-indigo-900">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {workout.title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {workout.exercises.length} exercícios
          </p>
        </div>
        <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${getIntensityColor(workout.intensityLevel)}`}>
          {workout.intensityLevel}
        </span>
      </div>

      <div className="mt-4 space-y-2">
        {workout.exercises.slice(0, 3).map((item, index) => (
          <div key={index} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
            <span className="mr-2 h-1.5 w-1.5 rounded-full bg-indigo-500"></span>
            {item.exercise.name} <span className="ml-1 text-gray-400 text-xs">({item.sets}x {item.reps})</span>
          </div>
        ))}
        
        {workout.exercises.length > 3 && (
          <p className="text-xs text-gray-400 pt-1">
            + {workout.exercises.length - 3} outros exercícios...
          </p>
        )}
      </div>
    </BaseCard>
  )
}