import mongoose, { Document, Schema } from 'mongoose';

export type TemplateLevel = 'Iniciante' | 'Intermediário' | 'Avançado';
export type TemplateFocus = 'Força' | 'Superiores' | 'Inferiores' | 'Full Body' | 'PPL';

interface ITemplateExercise {
  exercise: mongoose.Types.ObjectId;
  sets: number;
  reps: string;
  notes?: string;
}

interface ITemplateWorkout {
  title: string;
  exercises: ITemplateExercise[];
}

export interface IWorkoutTemplate extends Document {
  title: string;
  description: string;
  level: TemplateLevel;
  focus: TemplateFocus;
  workouts: ITemplateWorkout[];
  createdAt: Date;
  updatedAt: Date;
}

const templateExerciseSchema = new Schema<ITemplateExercise>({
  exercise: { type: mongoose.Schema.Types.ObjectId, ref: 'Exercise', required: true },
  sets: { type: Number, required: true },
  reps: { type: String, required: true },
  notes: { type: String },
});

const templateWorkoutSchema = new Schema<ITemplateWorkout>({
  title: { type: String, required: true },
  exercises: [templateExerciseSchema],
});

const workoutTemplateSchema = new Schema<IWorkoutTemplate>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    level: {
      type: String,
      enum: ['Iniciante', 'Intermediário', 'Avançado'],
      required: true,
    },
    focus: {
      type: String,
      enum: ['Força', 'Superiores', 'Inferiores', 'Full Body', 'PPL'],
      required: true,
    },
    workouts: [templateWorkoutSchema],
  },
  { timestamps: true }
);

export default mongoose.model<IWorkoutTemplate>('WorkoutTemplate', workoutTemplateSchema);