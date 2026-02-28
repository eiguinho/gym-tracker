import mongoose, { Document, Schema } from 'mongoose';

export interface IExercise extends Document {
  name: string;
  targetMuscles: string[]; // Ex: ['Peito', 'Tríceps']
  equipment: string; // Ex: 'Barra', 'Halter', 'Máquina'
  difficulty: 'Iniciante' | 'Intermediário' | 'Avançado'; // Útil pra IA futura
  videoUrl?: string; // Futuro: Link pro vídeo ensinando
  gifUrl: { type: String },
}

const ExerciseSchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    targetMuscles: [{ type: String, required: true }],
    equipment: { type: String, required: true },
    difficulty: { type: String, default: 'Intermediário' },
    videoUrl: { type: String },
  },
  { timestamps: true },
);

export default mongoose.model<IExercise>('Exercise', ExerciseSchema);
