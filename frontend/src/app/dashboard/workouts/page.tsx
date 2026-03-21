'use client'

import { useEffect, useState } from 'react'
import { CreateWorkoutModal } from '@/components/workouts/create-workout-modal'
import { EditWorkoutModal } from '@/components/workouts/edit-workout-modal'
import { SuggestionsTab } from '@/components/workouts/suggestions-tab'
import { MyRoutineTab } from '@/components/workouts/my-routine-tab'
import { workoutService } from '@/services/workout-service'
import { Workout } from '@/types/workout'
import { PageHeader } from '@/components/ui/page-header'
import { toast } from 'sonner'
import { getErrorMessage } from '@/utils/error-handler'

export default function WorkoutsPage() {
  const [workouts, setWorkouts] = useState<Workout[]>([])
  const [loading, setLoading] = useState(true)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [editingWorkoutId, setEditingWorkoutId] = useState<string | null>(null)
  
  const [activeTab, setActiveTab] = useState<'mine' | 'coach'>('mine')

  const loadWorkouts = async () => {
    try {
      setLoading(true)
      const data = await workoutService.getAll()
      setWorkouts(data)
    } catch (error) {
      toast.error(getErrorMessage(error, 'Erro ao carregar treinos.'))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadWorkouts()
  }, [])

  const handleClonedSuccess = () => {
    setActiveTab('mine')
    loadWorkouts()
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8 dark:bg-gray-950">
      <div className="mx-auto max-w-6xl">
        <PageHeader 
          title="Gestão de Rotina" 
          description="Organize seus treinos semanais ou descubra novas rotinas recomendadas."
          action={
            <button 
              onClick={() => setIsCreateModalOpen(true)}
              className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition-colors shadow-sm"
            >
              + Novo Treino
            </button>
          }
        />

        <div className="mb-6 flex space-x-4 border-b border-gray-200 dark:border-gray-800">
          <button
            onClick={() => setActiveTab('mine')}
            className={`pb-4 text-sm font-medium transition-colors border-b-2 ${
              activeTab === 'mine'
                ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Minha Rotina ({workouts.length})
          </button>
          <button
            onClick={() => setActiveTab('coach')}
            className={`pb-4 text-sm font-medium transition-colors border-b-2 ${
              activeTab === 'coach'
                ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Sugestões
          </button>
        </div>

        {activeTab === 'coach' ? (
          <SuggestionsTab onClonedSuccess={handleClonedSuccess} />
        ) : (
          <MyRoutineTab 
            workouts={workouts}
            setWorkouts={setWorkouts}
            loading={loading}
            loadWorkouts={loadWorkouts}
            onCreateClick={() => setIsCreateModalOpen(true)}
            onEditClick={(id) => setEditingWorkoutId(id)}
            onSwitchToCoach={() => setActiveTab('coach')}
          />
        )}

        <CreateWorkoutModal 
          isOpen={isCreateModalOpen} 
          onClose={() => setIsCreateModalOpen(false)}
          onSuccess={() => {
            setIsCreateModalOpen(false)
            loadWorkouts()
          }}
        />
        <EditWorkoutModal 
          isOpen={!!editingWorkoutId}
          workoutId={editingWorkoutId}
          onClose={() => setEditingWorkoutId(null)}
          onSuccess={() => {
            setEditingWorkoutId(null)
            loadWorkouts()
          }}
        />
      </div>
    </div>
  )
}