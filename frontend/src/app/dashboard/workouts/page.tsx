'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { CreateWorkoutModal } from '@/components/workouts/create-workout-modal'
import { workoutService } from '@/services/workout-service'
import { Workout } from '@/types/workout'
import { WorkoutCard } from '@/components/workouts/workout-card'
import { PageHeader } from '@/components/ui/page-header'
import { EmptyState } from '@/components/ui/empty-state'
import { Spinner } from '@/components/ui/spinner'

export default function WorkoutsPage() {
  const [workouts, setWorkouts] = useState<Workout[]>([])
  const [loading, setLoading] = useState(true)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  useEffect(() => {
    async function loadWorkouts() {
      try {
        const data = await workoutService.getAll()
        setWorkouts(data)
      } catch (error) {
        console.error('Erro ao carregar treinos', error)
      } finally {
        setLoading(false)
      }
    }

    loadWorkouts()
  }, [])

  async function handleDelete(id: string) {
    if (!confirm('Tem certeza que deseja excluir este treino?')) return

    try {
      await workoutService.delete(id)

      setWorkouts((prev) => prev.filter((workout) => workout._id !== id))
    } catch (error) {
      alert('Erro ao excluir treino')
      console.error(error)
    }
  }

  const fetchWorkouts = async () => {
    try {
      const data = await workoutService.getAll()
      setWorkouts(data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8 dark:bg-gray-950">
      <div className="mx-auto max-w-5xl">
        
        <PageHeader 
          title="Meus Treinos" 
          description="Gerencie e acompanhe suas rotinas de exercício"
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
            {workouts.map((workout) => (
              <WorkoutCard key={workout._id} workout={workout} onDelete={handleDelete}/>
            ))}
          </div>
        )}
        <CreateWorkoutModal 
          isOpen={isCreateModalOpen} 
          onClose={() => setIsCreateModalOpen(false)}
          onSuccess={() => {
            setIsCreateModalOpen(false)
            fetchWorkouts()
          }}
        />
      </div>
    </div>
  )
}