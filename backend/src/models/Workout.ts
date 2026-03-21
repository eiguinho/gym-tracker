import mongoose, { Document, Schema } from 'mongoose';

interface IWorkoutExercise {
  exercise: mongoose.Types.ObjectId;
  sets: number;
  reps: string;
  notes?: string;
}

export interface IWorkout extends Document {
  user: mongoose.Types.ObjectId;
  title: string;
  exercises: IWorkoutExercise[];
  intensityLevel: 'Leve' | 'Moderado' | 'Intenso' | 'Insano';
  isActive: boolean;
  routineOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const workoutExerciseSchema = new Schema<IWorkoutExercise>({
  exercise: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exercise',
    required: true,
  },
  sets: { type: Number, required: true },
  reps: { type: String, required: true },
  notes: { type: String },
});

const workoutSchema = new Schema<IWorkout>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: { type: String, required: true },
    exercises: [workoutExerciseSchema],
    intensityLevel: {
      type: String,
      enum: ['Leve', 'Moderado', 'Intenso', 'Insano'],
      default: 'Leve',
    },
    isActive: { type: Boolean, default: false },
    routineOrder: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export default mongoose.model<IWorkout>('Workout', workoutSchema);