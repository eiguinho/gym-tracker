'use client'

import { Exercise } from '@/types/exercise'
import { ExerciseCard } from './exercise-card'

interface ExerciseGroupProps {
  title: string;
  exercises: Exercise[];
}

export function ExerciseGroup({ title, exercises }: ExerciseGroupProps) {
  if (exercises.length === 0) return null;

  return (
    <section className="space-y-4 pt-6">
      <div className="flex items-center gap-2 pb-2 border-b border-border">
        <h2 className="text-xl font-bold tracking-tight text-foreground uppercase">
          {title}
        </h2>
        <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-semibold text-muted-foreground">
          {exercises.length}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {exercises.map((exercise) => (
          <ExerciseCard key={exercise._id} exercise={exercise} />
        ))}
      </div>
    </section>
  );
}