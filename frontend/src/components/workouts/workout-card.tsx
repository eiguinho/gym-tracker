import { Workout } from '@/types/workout'
import { BaseCard } from '@/components/ui/base-card'
import { Badge } from '@/components/ui/badge'
import { Trash2, Edit2, ArrowUp, ArrowDown } from 'lucide-react'

interface WorkoutCardProps {
  workout: Workout
  onDelete: (id: string) => void
  onEdit: (id: string) => void
  onToggleActive: (id: string, isActive: boolean) => void
  onMoveUp?: (id: string) => void
  onMoveDown?: (id: string) => void
  isFirstActive?: boolean
  isLastActive?: boolean
  canActivate?: boolean
}

export function WorkoutCard({ 
  workout, onDelete, onEdit, onToggleActive, onMoveUp, onMoveDown, isFirstActive, isLastActive, canActivate 
}: WorkoutCardProps) {
  
  const intensityStyles: Record<string, string> = {
    Leve: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    Moderado: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    Intenso: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
    Insano: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  }

  const routineLetter = workout.isActive ? String.fromCharCode(65 + (workout.routineOrder || 0)) : null;

  return (
    <BaseCard className={`p-6 transition-all hover:shadow-md ${workout.isActive ? 'border-indigo-500 ring-1 ring-indigo-500 shadow-sm' : ''} hover:border-indigo-300 dark:hover:border-indigo-800 group relative`}>
      
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-3">
          {workout.isActive ? (
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 text-lg font-bold text-white shadow-sm">
              {routineLetter}
            </div>
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-400 font-medium">
              Off
            </div>
          )}
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              {workout.isActive ? 'Treino Ativo' : 'Na Biblioteca'}
            </span>
          </div>
        </div>

        <label className="relative inline-flex cursor-pointer items-center">
          <input 
            type="checkbox" 
            className="peer sr-only" 
            checked={workout.isActive}
            disabled={!workout.isActive && !canActivate}
            onChange={(e) => onToggleActive(workout._id, e.target.checked)}
          />
          <div 
            className={`peer h-6 w-11 rounded-full bg-gray-200 
            after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-['']
            peer-checked:bg-indigo-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4
            peer-focus:ring-indigo-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-indigo-800 
            ${!workout.isActive && !canActivate ? 'opacity-40 cursor-not-allowed' : ''}`}>
          </div>
        </label>
      </div>

      <div className="flex items-start justify-between">
        <div className="flex-1 truncate mr-2">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate">
            {workout.title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            {workout.exercises?.length || 0} exercícios
          </p>
        </div>
        
        <div className="flex flex-col items-end gap-2">
           <Badge className={intensityStyles[workout.intensityLevel] || 'bg-gray-100'}>
             {workout.intensityLevel}
           </Badge>
           <div className="flex items-center">
             <button onClick={(e) => { e.stopPropagation(); onEdit(workout._id); }} className="text-gray-400 hover:text-indigo-600 p-1.5 transition-colors" title="Editar treino">
               <Edit2 size={16} />
             </button>
             <button onClick={(e) => { e.stopPropagation(); onDelete(workout._id); }} className="text-gray-400 hover:text-red-600 p-1.5 transition-colors" title="Excluir treino">
               <Trash2 size={18} />
             </button>
           </div>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        {workout.exercises?.slice(0, 3).map((item, index) => (
          <div key={index} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
            <span className="mr-2 h-1.5 w-1.5 rounded-full bg-indigo-500 flex-shrink-0"></span>
            <span className="truncate">
              {item.exercise?.name || 'Exercício removido'} 
              <span className="ml-1 text-gray-400 text-xs">({item.sets}x {item.reps})</span>
            </span>
          </div>
        ))}
      </div>

      {workout.isActive && (
        <div className="mt-4 flex justify-between border-t border-gray-100 pt-3 dark:border-gray-800">
          <span className="text-xs text-gray-400">Ordem na Rotina</span>
          <div className="flex gap-1">
            <button 
              onClick={() => onMoveUp?.(workout._id)}
              disabled={isFirstActive}
              className="rounded bg-gray-100 p-1 text-gray-600 hover:bg-gray-200 disabled:opacity-30 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
            >
              <ArrowUp size={16} />
            </button>
            <button 
              onClick={() => onMoveDown?.(workout._id)}
              disabled={isLastActive}
              className="rounded bg-gray-100 p-1 text-gray-600 hover:bg-gray-200 disabled:opacity-30 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
            >
              <ArrowDown size={16} />
            </button>
          </div>
        </div>
      )}
    </BaseCard>
  )
}