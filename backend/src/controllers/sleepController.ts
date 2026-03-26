import { Request, Response } from 'express';
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

export const saveSleepLog = async (req: Request, res: Response): Promise<Response | void> => {
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

    return res.status(200).json(sleepLog);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao salvar o registro de sono', error });
  }
};

export const getSleepLogs = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const userId = req.user._id;
    const { startDate, endDate } = req.query;

    const query: Record<string, unknown> = { user: userId };
    
    if (startDate && endDate) {
      query.date = { 
        $gte: new Date(startDate as string), 
        $lte: new Date(endDate as string) 
      };
    }

    const logs = await SleepLog.find(query).sort({ date: 1 });
    return res.json(logs);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao buscar registros de sono', error });
  }
};

export const deleteSleepLog = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const deletedLog = await SleepLog.findOneAndDelete({ _id: id, user: userId });

    if (!deletedLog) {
      return res.status(404).json({ message: 'Registro de sono não encontrado' });
    }

    return res.status(200).json({ message: 'Registro de sono excluído com sucesso' });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao excluir registro de sono', error });
  }
};