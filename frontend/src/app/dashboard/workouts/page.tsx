'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { workoutService } from '@/services/workout-service'
import { Workout } from '@/types/workout'
import { WorkoutCard } from '@/components/workouts/workout-card'
import { PageHeader } from '@/components/ui/page-header'
import { EmptyState } from '@/components/ui/empty-state'

export default function WorkoutsPage() {
  const [workouts, setWorkouts] = useState<Workout[]>([])
  const [loading, setLoading] = useState(true)

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

  return (
    <div className="min-h-screen bg-gray-50 p-8 dark:bg-gray-950">
      <div className="mx-auto max-w-5xl">
        
        <PageHeader 
          title="Meus Treinos" 
          description="Gerencie e acompanhe suas rotinas de exercício"
          action={
            <Link 
              href="/dashboard/workouts/new" 
              className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition-colors shadow-sm"
            >
              + Novo Treino
            </Link>
          }
        />

        {loading ? (
          <div className="flex h-64 items-center justify-center">
             <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
          </div>
        ) : workouts.length === 0 ? (
          
          <EmptyState 
            title="Nenhum treino encontrado"
            description="Você ainda não criou nenhuma rotina de treinos. Comece agora!"
            action={
              <Link 
                href="/dashboard/workouts/new"
                className="text-indigo-600 hover:text-indigo-500 font-medium text-sm"
              >
                Criar primeiro treino &rarr;
              </Link>
            }
          />
          
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {workouts.map((workout) => (
              <WorkoutCard key={workout._id} workout={workout} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}