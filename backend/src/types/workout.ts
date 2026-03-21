import mongoose from 'mongoose';

export interface ExerciseInput {
  exercise: mongoose.Types.ObjectId | string;
  sets: number;
  reps: string;
  notes?: string;
}

export type IntensityLevel = 'Leve' | 'Moderado' | 'Intenso' | 'Insano';

export interface UpdateOrderInput {
  id: string;
  routineOrder: number;
}