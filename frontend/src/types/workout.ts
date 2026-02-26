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

export interface CreateWorkoutDTO {
  title: string
  exercises: {
    exercise: string
    sets: number
    reps: string
  }[]
}

export interface WorkoutLog {
  _id: string;
  user: string;
  workout: {
    _id: string;
    title: string;
    intensityLevel: string;
  };
  date: string;
  status: 'planned' | 'completed' | 'skipped';
  durationMinutes?: number;
}