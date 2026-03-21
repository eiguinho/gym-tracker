'use client'

import { useEffect, useState } from 'react'
import { CreateWorkoutModal } from '@/components/workouts/create-workout-modal'
import { EditWorkoutModal } from '@/components/workouts/edit-workout-modal'
import { workoutService } from '@/services/workout-service'
import { Workout } from '@/types/workout'
import { WorkoutCard } from '@/components/workouts/workout-card'
import { PageHeader } from '@/components/ui/page-header'
import { EmptyState } from '@/components/ui/empty-state'
import { Spinner } from '@/components/ui/spinner'
import { toast } from 'sonner'
import { getErrorMessage } from '@/utils/error-handler'

export default function WorkoutsPage() {
  const [workouts, setWorkouts] = useState<Workout[]>([])
  const [loading, setLoading] = useState(true)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [editingWorkoutId, setEditingWorkoutId] = useState<string | null>(null)

  const loadWorkouts = async () => {
    try {
      const data = await workoutService.getAll()
      setWorkouts(data)
    } catch (error) {
      console.error('Erro ao carregar treinos', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadWorkouts()
  }, [])

  const sortedWorkouts = [...workouts].sort((a, b) => {
    if (a.isActive && b.isActive) return (a.routineOrder || 0) - (b.routineOrder || 0);
    if (a.isActive) return -1;
    if (b.isActive) return 1;
    return 0;
  });

  const activeWorkouts = sortedWorkouts.filter(w => w.isActive);

  async function handleDelete(id: string) {
    if (!confirm('Tem certeza que deseja excluir este treino?')) return
    try {
      await workoutService.delete(id)
      setWorkouts((prev) => prev.filter((workout) => workout._id !== id))
      toast.success('Treino excluído permanentemente!')
    } catch (error) {
      toast.error(getErrorMessage(error, 'Erro ao excluir treino.'))
    }
  }

  async function handleToggleActive(id: string, isActive: boolean) {
    try {
      await workoutService.toggleActive(id, isActive)
      toast.success(isActive ? 'Treino ativado na rotina!' : 'Treino removido da rotina.')
      loadWorkouts() 
    } catch (error) {
      toast.error(getErrorMessage(error, 'Erro ao alterar status.'))
    }
  }

  async function handleReorder(id: string, direction: 'up' | 'down') {
    const currentIndex = activeWorkouts.findIndex(w => w._id === id);
    if (currentIndex < 0) return;
    
    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (targetIndex < 0 || targetIndex >= activeWorkouts.length) return;

    const currentWorkout = activeWorkouts[currentIndex];
    const targetWorkout = activeWorkouts[targetIndex];

    try {
      setWorkouts(prev => prev.map(w => {
        if (w._id === currentWorkout._id) return { ...w, routineOrder: targetIndex }
        if (w._id === targetWorkout._id) return { ...w, routineOrder: currentIndex }
        return w
      }))

      await workoutService.updateOrders([
        { id: currentWorkout._id, routineOrder: targetIndex },
        { id: targetWorkout._id, routineOrder: currentIndex }
      ]);
    } catch (error) {
      toast.error(getErrorMessage(error, 'Erro ao reordenar rotina.'))
      loadWorkouts() 
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8 dark:bg-gray-950">
      <div className="mx-auto max-w-6xl">
        <PageHeader 
          title="Meus Treinos" 
          description="Ative e organize a sua rotina de treinos da semana (A, B, C...)"
          action={
            <button 
              onClick={() => setIsCreateModalOpen(true)}
              className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition-colors shadow-sm"
            >
              + Novo Treino
            </button>
          }
        />

        {loading ? (
          <Spinner />
        ) : workouts.length === 0 ? (
          <EmptyState 
            title="Nenhum treino encontrado"
            description="Você ainda não criou nenhuma rotina de treinos. Comece agora!"
            action={
              <button 
                onClick={() => setIsCreateModalOpen(true)}
                className="text-indigo-600 hover:text-indigo-500 font-medium text-sm"
              >
                Criar primeiro treino &rarr;
              </button>
            }
          />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sortedWorkouts.map((workout, index) => {
              const activeIndex = activeWorkouts.findIndex(w => w._id === workout._id);
              
              return (
                <WorkoutCard 
                  key={workout._id} 
                  workout={workout} 
                  onDelete={handleDelete}
                  onEdit={(id) => setEditingWorkoutId(id)}
                  onToggleActive={handleToggleActive}
                  onMoveUp={() => handleReorder(workout._id, 'up')}
                  onMoveDown={() => handleReorder(workout._id, 'down')}
                  isFirstActive={activeIndex === 0}
                  isLastActive={activeIndex === activeWorkouts.length - 1}
                  canActivate={activeWorkouts.length < 7}
                />
              )
            })}
          </div>
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