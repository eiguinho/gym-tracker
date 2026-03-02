import { Response } from 'express';
import SleepLog from '../models/SleepLog';

const calculateSleepDuration = (bedTime: string, wakeTime: string): number => {
  const [bedHour, bedMin] = bedTime.split(':').map(Number);
  const [wakeHour, wakeMin] = wakeTime.split(':').map(Number);

  let bedTotalMinutes = bedHour * 60 + bedMin;
  let wakeTotalMinutes = wakeHour * 60 + wakeMin;

  if (wakeTotalMinutes <= bedTotalMinutes) {
    wakeTotalMinutes += 24 * 60;
  }

  return wakeTotalMinutes - bedTotalMinutes;
};

export const saveSleepLog = async (req: any, res: Response): Promise<any> => {
  try {
    const { date, bedTime, wakeTime, qualityScore, notes } = req.body;
    const userId = req.user._id;

    const logDate = new Date(date);
    logDate.setUTCHours(0, 0, 0, 0);

    const durationMinutes = calculateSleepDuration(bedTime, wakeTime);

    const sleepLog = await SleepLog.findOneAndUpdate(
      { user: userId, date: logDate },
      { bedTime, wakeTime, durationMinutes, qualityScore, notes },
      { new: true, upsert: true }
    );

    res.status(200).json(sleepLog);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao salvar o registro de sono', error });
  }
};

export const getSleepLogs = async (req: any, res: Response): Promise<any> => {
  try {
    const userId = req.user._id;
    const { startDate, endDate } = req.query;

    const query: any = { user: userId };
    if (startDate && endDate) {
      query.date = { $gte: new Date(startDate as string), $lte: new Date(endDate as string) };
    }

    const logs = await SleepLog.find(query).sort({ date: 1 });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar registros de sono', error });
  }
};