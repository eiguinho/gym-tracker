import { Workout } from '@/types/workout'
import { BaseCard } from '@/components/ui/base-card'
import { Badge } from '@/components/ui/badge'
import { Trash2, Edit2 } from 'lucide-react'

interface WorkoutCardProps {
  workout: Workout
  onDelete: (id: string) => void
  onEdit: (id: string) => void
}

export function WorkoutCard({ workout, onDelete, onEdit }: WorkoutCardProps) {
  const intensityStyles: Record<string, string> = {
    Leve: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    Moderado: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    Intenso: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
    Insano: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  }

  return (
    <BaseCard className="p-6 transition-all hover:shadow-md cursor-pointer hover:border-indigo-200 dark:hover:border-indigo-900 group">
      <div className="flex items-start justify-between">
        <div className="flex-1 truncate mr-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
            {workout.title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {workout.exercises.length} exercícios
          </p>
        </div>
        
        <div className="flex items-center gap-1">
           <Badge className={intensityStyles[workout.intensityLevel] || 'bg-gray-100'}>
             {workout.intensityLevel}
           </Badge>

           <button 
             onClick={(e) => {
               e.stopPropagation()
               onEdit(workout._id)
             }}
             className="text-gray-400 hover:text-indigo-600 transition-colors p-1.5 rounded-md hover:bg-indigo-50 dark:hover:bg-indigo-900/20 ml-2"
             title="Editar treino"
           >
             <Edit2 size={16} />
           </button>

           <button 
             onClick={(e) => {
               e.stopPropagation()
               onDelete(workout._id)
             }}
             className="text-gray-400 hover:text-red-600 transition-colors p-1.5 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20"
             title="Excluir treino"
           >
             <Trash2 size={18} />
           </button>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        {workout.exercises.slice(0, 3).map((item, index) => (
          <div key={index} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
            <span className="mr-2 h-1.5 w-1.5 rounded-full bg-indigo-500 flex-shrink-0"></span>
            <span className="truncate">
              {typeof item.exercise === 'object' ? item.exercise.name : 'Exercício'} 
              <span className="ml-1 text-gray-400 text-xs">({item.sets}x {item.reps})</span>
            </span>
          </div>
        ))}
        
        {workout.exercises.length > 3 && (
          <p className="text-xs text-gray-400 pt-1 italic">
            + {workout.exercises.length - 3} outros exercícios...
          </p>
        )}
      </div>
    </BaseCard>
  )
}