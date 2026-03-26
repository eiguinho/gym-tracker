'use client'

import { useState } from 'react'
import { Workout } from '@/types/workout'
import { WorkoutCard } from '@/components/workouts/workout-card'
import { EmptyState } from '@/components/ui/empty-state'
import { Spinner } from '@/components/ui/spinner'
import { AlertModal } from '@/components/ui/alert-modal'
import { workoutService } from '@/services/workout-service'
import { toast } from 'sonner'
import { getErrorMessage } from '@/utils/error-handler'

interface MyRoutineTabProps {
  workouts: Workout[];
  setWorkouts: React.Dispatch<React.SetStateAction<Workout[]>>;
  loading: boolean;
  loadWorkouts: () => Promise<void>;
  onCreateClick: () => void;
  onEditClick: (id: string) => void;
  onSwitchToCoach: () => void;
}

export function MyRoutineTab({ 
  workouts, setWorkouts, loading, loadWorkouts, onCreateClick, onEditClick, onSwitchToCoach 
}: MyRoutineTabProps) {
  
  const [workoutToDelete, setWorkoutToDelete] = useState<string | null>(null)
  const [deleteLoading, setDeleteLoading] = useState(false)

  const sortedWorkouts = [...workouts].sort((a, b) => {
    if (a.isActive && b.isActive) return (a.routineOrder || 0) - (b.routineOrder || 0);
    if (a.isActive) return -1;
    if (b.isActive) return 1;
    return 0;
  });

  const activeWorkouts = sortedWorkouts.filter(w => w.isActive);

  async function confirmDelete() {
    if (!workoutToDelete) return
    setDeleteLoading(true)
    try {
      await workoutService.delete(workoutToDelete)
      setWorkouts((prev) => prev.filter((workout) => workout._id !== workoutToDelete))
      toast.success('Treino excluído permanentemente!')
    } catch (error) {
      toast.error(getErrorMessage(error, 'Erro ao excluir treino.'))
    } finally {
      setDeleteLoading(false)
      setWorkoutToDelete(null)
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

  if (loading) return <Spinner />

  if (workouts.length === 0) {
    return (
      <EmptyState 
        title="Nenhum treino encontrado"
        description="Você ainda não criou nenhuma rotina. Comece do zero ou pegue uma sugestão do Coach!"
        action={
          <div className="flex gap-4 mt-4">
            <button onClick={onCreateClick} className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
              Criar do zero &rarr;
            </button>
            <button onClick={onSwitchToCoach} className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
              Ver sugestões &rarr;
            </button>
          </div>
        }
      />
    )
  }

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sortedWorkouts.map((workout) => {
          const activeIndex = activeWorkouts.findIndex(w => w._id === workout._id);
          return (
            <WorkoutCard 
              key={workout._id} 
              workout={workout} 
              activeIndex={activeIndex}
              onDelete={(id) => setWorkoutToDelete(id)}
              onEdit={onEditClick}
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

      <AlertModal 
        isOpen={!!workoutToDelete}
        onClose={() => setWorkoutToDelete(null)}
        onConfirm={confirmDelete}
        title="Excluir Rotina"
        description="Você tem certeza? Isso apagará o treino da sua biblioteca."
        confirmText="Sim, excluir"
        loading={deleteLoading}
      />
    </>
  )
}