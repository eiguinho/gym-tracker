import mongoose, { Document, Schema } from 'mongoose';

const workoutExerciseSchema = new Schema({
  exercise: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exercise', // Link com o catálogo
    required: true,
  },
  sets: { type: Number, required: true }, // Ex: 4 séries
  reps: { type: String, required: true }, // Ex: "12" ou "10-12"
  notes: { type: String }, // Ex: "Drop-set na última"
});

export interface IWorkout extends Document {
  user: mongoose.Schema.Types.ObjectId;
  title: string;
  exercises: any[];
  intensityLevel: string; // Calculado (Leve, Moderado, Insano)
}

const workoutSchema = new Schema(
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
  },
  { timestamps: true },
);

export default mongoose.model<IWorkout>('Workout', workoutSchema);
