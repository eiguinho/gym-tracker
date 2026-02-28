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
      { 
        $match: { 
          user: userId, 
          status: 'completed', 
          date: { $gte: startOfCurrentMonth, $lte: today }
        } 
      },
      {
        $group: {
          _id: null,
          totalWorkouts: { $sum: 1 },
          totalMinutes: { $sum: "$durationMinutes" }
        }
      }
    ]);

    const totals = summary[0] || { totalWorkouts: 0, totalMinutes: 0 };

    const dailyData = await WorkoutLog.aggregate([
      { 
        $match: { 
          user: userId, 
          status: 'completed',
          date: { $gte: sevenDaysAgo, $lte: today }
        } 
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          minutes: { $sum: "$durationMinutes" }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json({
      summary: {
        activeHours: (totals.totalMinutes / 60).toFixed(1), 
        completedWorkouts: totals.totalWorkouts,
      },
      chartData: dailyData
    });

  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar estatísticas', error });
  }
};