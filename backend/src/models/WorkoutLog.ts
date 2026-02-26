import mongoose, { Document, Schema } from 'mongoose';

export interface IWorkoutLog extends Document {
  user: mongoose.Types.ObjectId;
  workout: mongoose.Types.ObjectId;
  date: Date;
  status: 'planned' | 'completed' | 'skipped';
  durationMinutes?: number;
  createdAt: Date;
  updatedAt: Date;
}

const workoutLogSchema = new Schema<IWorkoutLog>(
  {
    user: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    workout: { 
      type: Schema.Types.ObjectId, 
      ref: 'Workout', 
      required: true 
    },
    date: { 
      type: Date, 
      required: true 
    },
    status: {
      type: String,
      enum: ['planned', 'completed', 'skipped'],
      default: 'planned',
    },
    durationMinutes: { 
      type: Number,
      min: 1
    },
  },
  { 
    timestamps: true
  }
);
workoutLogSchema.index({ user: 1, date: 1 });

export default mongoose.model<IWorkoutLog>('WorkoutLog', workoutLogSchema);