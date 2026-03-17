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

  useEffect(() => {
    async function fetchExercises() {
      try {
        const data = await exerciseService.getAll()
        setExercises(data)
      } catch (error) {
        console.error("Erro ao carregar a biblioteca de exercícios:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchExercises()
  }, [])

  // Agrupa os exercícios usando o primeiro músculo como categoria (Ex: "Peito")
  const groupedExercises = useMemo(() => {
    const groups: Record<string, Exercise[]> = {};
    
    exercises.forEach((ex) => {
      const mainMuscle = ex.targetMuscles[0] || 'Outros';
      
      if (!groups[mainMuscle]) {
        groups[mainMuscle] = [];
      }
      groups[mainMuscle].push(ex);
    });

    return groups;
  }, [exercises]);

  return (
    <div className="min-h-screen bg-background text-foreground pb-10">
      <main className="mx-auto max-w-7xl px-6 pt-8 space-y-8">
        
        <PageHeader 
          title="Biblioteca de Exercícios" 
          description="Consulte a execução correta, equipamentos necessários e detalhes de cada movimento."
        />

        {loading ? (
          <div className="flex justify-center py-20">
            <Spinner />
          </div>
        ) : exercises.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground bg-card rounded-lg border border-border">
            <p>Nenhum exercício encontrado na biblioteca.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(groupedExercises).map(([muscleGroup, exercisesList]) => (
              <ExerciseGroup 
                key={muscleGroup} 
                title={muscleGroup} 
                exercises={exercisesList} 
              />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}