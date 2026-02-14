export interface Exercise {
  _id: string
  name: string
  targetMuscles: string[]
  equipment: string
}

export interface WorkoutExercise {
  exercise: Exercise
  sets: number
  reps: string
  notes?: string
}

export interface Workout {
  _id: string
  title: string
  exercises: WorkoutExercise[]
  intensityLevel: 'Leve' | 'Moderado' | 'Intenso' | 'Insano'
  createdAt: string
}