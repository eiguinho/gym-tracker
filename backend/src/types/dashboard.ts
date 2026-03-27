export interface Feedback {
  type: 'success' | 'warning' | 'info';
  message: string;
  icon: string;
}

export interface WorkoutLogForFeedback {
  date: Date;
  status: string;
}

export interface SleepData {
  score: number;
  averageText: string;
  hasLogs: boolean;
}

export interface PopulatedExercise {
  targetMuscles?: string[];
}

export interface PopulatedExerciseItem {
  exercise?: PopulatedExercise;
  sets?: number;
}

export interface PopulatedWorkout {
  exercises?: PopulatedExerciseItem[];
}

export interface SleepDataSummary {
  score: number;
  averageText: string;
  hasLogs: boolean;
}