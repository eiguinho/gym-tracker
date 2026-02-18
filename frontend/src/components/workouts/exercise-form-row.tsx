import { Exercise } from '@/types/workout'
import { Trash2 } from 'lucide-react'
import { Input } from '@/components/ui/input'

interface ExerciseFormRowProps {
  index: number
  row: { exercise: string; sets: number; minReps: number | string; maxReps: number | string }
  availableExercises: Exercise[]
  allSelectedExercises: string[]
  onChange: (index: number, field: string, value: string | number) => void
  onRemove: (index: number) => void
  canRemove: boolean
}

export function ExerciseFormRow({ index, row, availableExercises, allSelectedExercises, onChange, onRemove, canRemove }: ExerciseFormRowProps) {
  return (
    <div className="flex items-end gap-3 rounded-xl border border-gray-200 bg-gray-50/50 p-3 dark:border-gray-800 dark:bg-gray-900/50">
      
      <div className="flex-1">
        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Selecione o Exercício
        </label>
        <select 
          value={row.exercise}
          onChange={(e) => onChange(index, 'exercise', e.target.value)}
          className="block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:focus:ring-indigo-500"
          required
        >
          <option value="">Selecione...</option>
          {availableExercises.map((ex) => (
            <option 
              key={ex._id} 
              value={ex._id} 
              disabled={allSelectedExercises.includes(ex._id) && row.exercise !== ex._id}
            >
              {ex.name}
            </option>
          ))}
        </select>
      </div>

      <div className="w-24">
        <Input 
          label="Séries"
          type="number" 
          min="1" 
          max="10" 
          value={row.sets} 
          onChange={(e) => onChange(index, 'sets', Number(e.target.value))} 
          required 
        />
      </div>

      <div className="w-40">
        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Reps (Min-Máx)
        </label>
        <div className="flex items-center gap-2">
          <Input 
            type="number" 
            min="1" 
            max="40" 
            placeholder="8" 
            className="text-center px-1" 
            value={row.minReps} 
            onChange={(e) => onChange(index, 'minReps', e.target.value)} 
            required 
          />
          <span className="text-gray-400 font-medium mb-1">-</span>
          <Input 
            type="number" 
            min="1" 
            max="40" 
            placeholder="12" 
            className="text-center px-1" 
            value={row.maxReps} 
            onChange={(e) => onChange(index, 'maxReps', e.target.value)} 
            required 
          />
        </div>
      </div>

      {canRemove && (
        <button 
          type="button" 
          onClick={() => onRemove(index)} 
          className="mb-1.5 p-2.5 text-gray-400 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors dark:hover:bg-red-900/20" 
          title="Remover linha"
        >
          <Trash2 size={20} />
        </button>
      )}
    </div>
  )
}