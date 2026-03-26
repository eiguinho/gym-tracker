'use client'

import { useState, useEffect, useMemo } from 'react'
import { PageHeader } from '@/components/ui/page-header'
import { Spinner } from '@/components/ui/spinner'
import { ExerciseGroup } from '@/components/exercises/exercise-group'
import { exerciseService } from '@/services/exercise-service'
import { Exercise } from '@/types/exercise'

export default function ExercisesPage() {
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    async function fetchExercises() {
      try {
        const data = await exerciseService.getAll()
        setExercises(data)
      } catch (err) {
        console.error("Erro:", err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    fetchExercises()
  }, [])

  const groupedExercises = useMemo(() => {
    return exercises.reduce((acc, ex) => {
      const group = ex.targetMuscles[0] || 'Outros'
      if (!acc[group]) acc[group] = []
      acc[group].push(ex)
      return acc
    }, {} as Record<string, Exercise[]>)
  }, [exercises])

  const renderContent = () => {
    if (loading) return <div className="flex justify-center py-20"><Spinner /></div>
    
    if (error) return (
      <div className="text-center py-20 text-red-500">
        Erro ao carregar exercícios. Tente novamente mais tarde.
      </div>
    )

    if (exercises.length === 0) return (
      <div className="text-center py-20 text-muted-foreground bg-card rounded-lg border border-dashed border-border">
        <p>Nenhum exercício encontrado na biblioteca.</p>
      </div>
    )

    return (
      <div className="space-y-12">
        {Object.entries(groupedExercises).map(([muscleGroup, list]) => (
          <ExerciseGroup 
            key={muscleGroup} 
            title={muscleGroup} 
            exercises={list} 
          />
        ))}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground pb-10">
      <main className="mx-auto max-w-7xl px-6 pt-8 space-y-8">
        <PageHeader 
          title="Biblioteca de Exercícios" 
          description="Consulte a execução correta e detalhes de cada movimento."
        />
        {renderContent()}
      </main>
    </div>
  )
}