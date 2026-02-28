import { Response } from 'express';
import WorkoutLog from '../models/WorkoutLog';

export const getDashboardStats = async (req: any, res: Response): Promise<any> => {
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
      const workout = log.workout as any;
      if (workout && workout.exercises) {
        workout.exercises.forEach((exItem: any) => {
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

    res.json({
      summary: {
        activeHours: (totals.totalMinutes / 60).toFixed(1), 
        completedWorkouts: totals.totalWorkouts,
      },
      chartData: dailyData,
      muscleData: muscleData
    });

  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar estatísticas', error });
  }
};