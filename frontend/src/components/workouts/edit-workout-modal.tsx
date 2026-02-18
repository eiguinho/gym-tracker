'use client'

import { useState, useEffect } from 'react'
import { Modal } from '@/components/ui/modal'
import { workoutService } from '@/services/workout-service'
import { Exercise } from '@/types/workout'
import { Plus } from 'lucide-react'
import { ExerciseFormRow } from './exercise-form-row'
import { Input } from '@/components/ui/input'

interface EditWorkoutModalProps {
  isOpen: boolean
  workoutId: string | null
  onClose: () => void
  onSuccess: () => void 
}

export function EditWorkoutModal({ isOpen, workoutId, onClose, onSuccess }: EditWorkoutModalProps) {
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(false) // Estado para o loading inicial dos dados
  const [availableExercises, setAvailableExercises] = useState<Exercise[]>([])
  
  const [title, setTitle] = useState('')
  const [workoutExercises, setWorkoutExercises] = useState([{ exercise: '', sets: 3, minReps: 8, maxReps: 12 }])

  useEffect(() => {
    async function loadData() {
      if (!isOpen || !workoutId) return;
      
      setFetching(true)
      try {
        const [exercisesData, workoutData] = await Promise.all([
          workoutService.getExercises(),
          workoutService.getById(workoutId)
        ])
        
        setAvailableExercises(exercisesData)
        setTitle(workoutData.title)

        const formattedExercises = workoutData.exercises.map(item => {
          const [min, max] = item.reps.split('-')
          return {
            exercise: typeof item.exercise === 'object' ? item.exercise._id : item.exercise,
            sets: item.sets,
            minReps: Number(min) || 8,
            maxReps: Number(max) || 12
          }
        })

        setWorkoutExercises(formattedExercises)
      } catch (error) {
        console.error('Erro ao carregar dados do treino', error)
        alert('Erro ao carregar os detalhes do treino.')
        onClose()
      } finally {
        setFetching(false)
      }
    }

    if (isOpen) {
      loadData()
    } else {
      setTitle('')
      setWorkoutExercises([{ exercise: '', sets: 3, minReps: 8, maxReps: 12 }])
    }
  }, [isOpen, workoutId, onClose])

  const addExerciseRow = () => setWorkoutExercises([...workoutExercises, { exercise: '', sets: 3, minReps: 8, maxReps: 12 }])
  const removeExerciseRow = (idx: number) => setWorkoutExercises(workoutExercises.filter((_, i) => i !== idx))
  
  const handleExerciseChange = (index: number, field: string, value: string | number) => {
    const updated = [...workoutExercises]
    updated[index] = { ...updated[index], [field]: value }
    setWorkoutExercises(updated)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!workoutId) return

    setLoading(true)
    try {
      const validExercises = workoutExercises.filter(item => item.exercise !== '')
      
      if (new Set(validExercises.map(item => item.exercise)).size !== validExercises.length) {
        return alert('Remova os exercícios duplicados antes de salvar.')
      }
      
      if (validExercises.length === 0) {
        return alert('Adicione pelo menos um exercício ao treino.')
      }

      const formattedForAPI = validExercises.map(item => ({
        exercise: item.exercise, 
        sets: item.sets, 
        reps: `${item.minReps}-${item.maxReps}`
      }))

      await workoutService.update(workoutId, { title, exercises: formattedForAPI })
      onSuccess()
    } catch (error) {
      alert('Erro ao atualizar treino. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Editar Treino">
      {fetching ? (
        <div className="flex justify-center py-8">
          <p className="text-gray-500">Carregando dados do treino...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input 
            label="Nome da Rotina"
            placeholder="Ex: Treino A - Peito e Tríceps" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            maxLength={50} 
            required 
          />

          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Exercícios
            </label>

            <div className="space-y-3">
              {workoutExercises.map((row, index) => (
                <ExerciseFormRow 
                  key={index} index={index} row={row} availableExercises={availableExercises} 
                  allSelectedExercises={workoutExercises.map(ex => ex.exercise)}
                  onChange={handleExerciseChange} onRemove={removeExerciseRow} canRemove={workoutExercises.length > 1}
                />
              ))}
            </div>

            <button type="button" onClick={addExerciseRow} className="flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors">
              <Plus size={16} /> Adicionar outro exercício
            </button>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-gray-100 dark:border-gray-800">
            <button type="button" onClick={onClose} disabled={loading} className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors disabled:opacity-50">
              Cancelar
            </button>
            <button type="submit" disabled={loading} className="rounded-lg bg-indigo-600 px-6 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition-colors disabled:opacity-50">
              {loading ? 'Salvando...' : 'Salvar Alterações'}
            </button>
          </div>
        </form>
      )}
    </Modal>
  )
}