export interface SleepLog {
  _id: string;
  user: string;
  date: string | Date;
  bedTime: string;
  wakeTime: string;
  durationMinutes: number;
  qualityScore: number;
  notes?: string;
}