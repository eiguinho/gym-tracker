'use client'

import { Dumbbell, Target, Zap } from 'lucide-react'
import { Exercise } from '@/types/exercise'

interface ExerciseCardProps {
  exercise: Exercise;
}

export function ExerciseCard({ exercise }: ExerciseCardProps) {
  const difficultyColor = {
    'Iniciante': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    'Intermediário': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    'Avançado': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  }[exercise.difficulty] || 'bg-gray-100 text-gray-700';

  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md">
      {/* Imagem */}
      <div className="relative aspect-square w-full bg-white p-4 flex items-center justify-center border-b border-border">
        <img
          src={exercise.gifUrl}
          alt={`Execução do exercício ${exercise.name}`}
          loading="lazy" 
          decoding="async"
          // Adicionamos mix-blend-multiply para "remover" o fundo branco da imagem
          className="h-full w-full object-contain mix-blend-multiply rounded-md"
        />
      </div>

      {/* Detalhes */}
      <div className="flex flex-1 flex-col p-4 space-y-3">
        <h3 className="font-semibold leading-tight text-lg tracking-tight">
          {exercise.name}
        </h3>

        <div className="mt-auto space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Target size={16} className="text-primary" />
            <span className="truncate">{exercise.targetMuscles.join(', ')}</span>
          </div>
          <div className="flex items-center gap-2">
            <Dumbbell size={16} className="text-primary" />
            <span className="truncate">{exercise.equipment}</span>
          </div>
        </div>

        {/* Badge */}
        <div className="pt-2 flex items-center justify-between">
          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${difficultyColor}`}>
            <Zap size={12} className="mr-1" />
            {exercise.difficulty}
          </span>
        </div>
      </div>
    </div>
  );
}