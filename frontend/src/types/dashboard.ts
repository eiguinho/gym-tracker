export interface DashboardSummary {
  activeHours: string;
  completedWorkouts: number;
}

export interface SleepData {
  hasLogs: boolean;
  score: number;
  averageText: string;
}

export interface ActivityDataPoint {
  _id: string;
  minutes: number;
}

export interface MuscleDataPoint {
  subject: string;
  A: number;
}

export interface DashboardStats {
  summary: DashboardSummary;
  sleepData: SleepData;
  chartData: ActivityDataPoint[];
  muscleData: MuscleDataPoint[];
}