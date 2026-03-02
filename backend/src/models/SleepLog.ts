import mongoose, { Document, Schema } from 'mongoose';

export interface ISleepLog extends Document {
  user: mongoose.Types.ObjectId;
  date: Date;
  bedTime: string;
  wakeTime: string;
  durationMinutes: number;
  qualityScore: number;
  notes?: string;
}

const SleepLogSchema: Schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true },
    bedTime: { type: String, required: true },
    wakeTime: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    qualityScore: { type: Number, required: true, min: 1, max: 5 },
    notes: { type: String },
  },
  { timestamps: true },
);

SleepLogSchema.index({ user: 1, date: 1 }, { unique: true });

export default mongoose.model<ISleepLog>('SleepLog', SleepLogSchema);