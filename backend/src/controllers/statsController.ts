import { Request, Response } from 'express';
import WorkoutLog from '../models/WorkoutLog';
import SleepLog from '../models/SleepLog';

interface PopulatedExercise {
  targetMuscles?: string[];
}

interface PopulatedExerciseItem {
  exercise?: PopulatedExercise;
  sets?: number;
}

interface PopulatedWorkout {
  exercises?: PopulatedExerciseItem[];
}

export const getDashboardStats = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const userId = req.user._id;
    const today = new Date();
    
    const startOfCurrentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 6);
    sevenDaysAgo.setUTCHours(0, 0, 0, 0);

    const summary = await WorkoutLog.aggregate([
      { $match: { user: userId, status: 'completed', date: { $gte: startOfCurrentMonth, $lte: today } } },
      { $group: { _id: null, totalWorkouts: { $sum: 1 }, totalMinutes: { $sum: "$durationMinutes" } } }
    ]);
    const totals = summary[0] || { totalWorkouts: 0, totalMinutes: 0 };

    const dailyData = await WorkoutLog.aggregate([
      { $match: { user: userId, status: 'completed', date: { $gte: sevenDaysAgo, $lte: today } } },
      { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } }, minutes: { $sum: "$durationMinutes" } } },
      { $sort: { _id: 1 } }
    ]);

    const completedLogs = await WorkoutLog.find({
      user: userId,
      status: 'completed',
      date: { $gte: sevenDaysAgo, $lte: today }
    }).populate({
      path: 'workout',
      populate: { path: 'exercises.exercise', model: 'Exercise' }
    });

    const muscleVolume: Record<string, number> = {};

    completedLogs.forEach(log => {
      const workout = log.workout as PopulatedWorkout;
      
      if (workout && workout.exercises) {
        workout.exercises.forEach((exItem) => {
          const exercise = exItem.exercise;
          if (exercise && exercise.targetMuscles) {
            exercise.targetMuscles.forEach((muscle: string) => {
              muscleVolume[muscle] = (muscleVolume[muscle] || 0) + (exItem.sets || 1);
            });
          }
        });
      }
    });

    const muscleData = Object.keys(muscleVolume).map(muscle => ({
      subject: muscle,
      A: muscleVolume[muscle],
    }));

    const sleepLogs = await SleepLog.find({
      user: userId,
      date: { $gte: sevenDaysAgo, $lte: today }
    });

    let sleepScore = 0;
    let avgHours = 0;
    let avgMinutes = 0;

    if (sleepLogs.length > 0) {
      const totalScore = sleepLogs.reduce((acc, log) => acc + log.qualityScore, 0);
      const totalMins = sleepLogs.reduce((acc, log) => acc + log.durationMinutes, 0);

      sleepScore = Math.round((totalScore / sleepLogs.length) * 20);
      
      const avgTotalMinutes = Math.round(totalMins / sleepLogs.length);
      avgHours = Math.floor(avgTotalMinutes / 60);
      avgMinutes = avgTotalMinutes % 60;
    }

    return res.json({
      summary: {
        activeHours: (totals.totalMinutes / 60).toFixed(1), 
        completedWorkouts: totals.totalWorkouts,
      },
      chartData: dailyData,
      muscleData: muscleData,
      sleepData: {
        hasLogs: sleepLogs.length > 0,
        score: sleepScore,
        averageText: `${avgHours}h ${avgMinutes}m`,
      }
    });

  } catch (error) {
    return res.status(500).json({ message: 'Erro ao buscar estatísticas', error });
  }
};