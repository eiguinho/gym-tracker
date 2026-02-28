'use client'

import { useState, useEffect } from 'react'
import { Modal } from '@/components/ui/modal'
import { workoutService } from '@/services/workout-service'
import { Exercise } from '@/types/workout'
import { Plus } from 'lucide-react'
import { ExerciseFormRow } from './exercise-form-row'
import { Input } from '@/components/ui/input'

interface CreateWorkoutModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void 
}

export function CreateWorkoutModal({ isOpen, onClose, onSuccess }: CreateWorkoutModalProps) {
  const [loading, setLoading] = useState(false)
  
  const [groupedExercises, setGroupedExercises] = useState<Record<string, Exercise[]>>({})
  
  const [title, setTitle] = useState('')
  const [workoutExercises, setWorkoutExercises] = useState([{ exercise: '', sets: 3, minReps: 8, maxReps: 12 }])

  useEffect(() => {
    if (isOpen) {
      workoutService.getExercises().then((exercises) => {
        const grouped = exercises.reduce((acc, exercise) => {
          const primaryMuscle = exercise.targetMuscles[0] || 'Outros'
          if (!acc[primaryMuscle]) acc[primaryMuscle] = []
          acc[primaryMuscle].push(exercise)
          return acc
        }, {} as Record<string, Exercise[]>)
        
        const sortedGroups = Object.keys(grouped).sort().reduce((acc, key) => {
          acc[key] = grouped[key]
          return acc
        }, {} as Record<string, Exercise[]>)

        setGroupedExercises(sortedGroups)
      }).catch(console.error)
    } else {
      setTitle('')
      setWorkoutExercises([{ exercise: '', sets: 3, minReps: 8, maxReps: 12 }])
    }
  }, [isOpen])

  const addExerciseRow = () => setWorkoutExercises([...workoutExercises, { exercise: '', sets: 3, minReps: 8, maxReps: 12 }])
  const removeExerciseRow = (idx: number) => setWorkoutExercises(workoutExercises.filter((_, i) => i !== idx))
  
  const handleExerciseChange = (index: number, field: string, value: string | number) => {
    const updated = [...workoutExercises]
    updated[index] = { ...updated[index], [field]: value }
    setWorkoutExercises(updated)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const validExercises = workoutExercises.filter(item => item.exercise !== '')
      
      if (new Set(validExercises.map(item => item.exercise)).size !== validExercises.length) {
        return alert('Remova os exercícios duplicados antes de salvar.')
      }
      
      if (validExercises.length === 0) {
        return alert('Adicione pelo menos um exercício ao treino.')
      }

      const formatted = validExercises.map(item => ({
        exercise: item.exercise, sets: item.sets, reps: `${item.minReps}-${item.maxReps}`
      }))

      await workoutService.create({ title, exercises: formatted })
      onSuccess()
    } catch (error) {
      alert('Erro ao criar treino. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Novo Treino">
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
                key={index} 
                index={index} 
                row={row} 
                groupedExercises={groupedExercises} 
                allSelectedExercises={workoutExercises.map(ex => ex.exercise)}
                onChange={handleExerciseChange} 
                onRemove={removeExerciseRow} 
                canRemove={workoutExercises.length > 1}
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
            {loading ? 'Salvando...' : 'Salvar Treino'}
          </button>
        </div>
      </form>
    </Modal>
  )
}