import { Request, Response } from 'express';
import WorkoutLog from '../models/WorkoutLog';

export const createWorkoutLog = async (req: any, res: Response): Promise<any> => {
  try {
    const { workout, date } = req.body;

    if (!workout || !date) {
      return res.status(400).json({ message: 'Treino e data são obrigatórios.' });
    }

    const targetDate = new Date(date);
    const startOfDay = new Date(targetDate.setUTCHours(0, 0, 0, 0));
    const endOfDay = new Date(targetDate.setUTCHours(23, 59, 59, 999));

    const existingLog = await WorkoutLog.findOne({
      user: req.user._id,
      date: { $gte: startOfDay, $lte: endOfDay }
    });

    if (existingLog) {
      return res.status(400).json({ 
        message: 'Você já tem um treino agendado para este dia. Remova-o antes de adicionar outro.' 
      });
    }

    const log = await WorkoutLog.create({
      user: req.user._id,
      workout,
      date,
      status: 'planned'
    });

    res.status(201).json(log);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao agendar treino', error });
  }
};

export const getWorkoutLogs = async (req: any, res: Response): Promise<any> => {
  try {
    const { startDate, endDate } = req.query;

    const query: any = { user: req.user._id };

    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate as string),
        $lte: new Date(endDate as string)
      };
    }

    const logs = await WorkoutLog.find(query).populate('workout', 'title intensityLevel');

    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar agenda de treinos', error });
  }
};

export const updateWorkoutLog = async (req: any, res: Response): Promise<any> => {
  try {
    const { status, durationMinutes, date } = req.body;
    const log = await WorkoutLog.findById(req.params.id);

    if (!log) return res.status(404).json({ message: 'Registro não encontrado' });
    if (log.user.toString() !== req.user._id.toString()) return res.status(401).json({ message: 'Não autorizado' });

    if (status) log.status = status;
    if (durationMinutes) log.durationMinutes = durationMinutes;
    if (date) log.date = date;

    const updatedLog = await log.save();
    res.json(updatedLog);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar o registro', error });
  }
};

export const deleteWorkoutLog = async (req: any, res: Response): Promise<any> => {
  try {
    const log = await WorkoutLog.findById(req.params.id);

    if (!log) return res.status(404).json({ message: 'Registro não encontrado' });
    if (log.user.toString() !== req.user._id.toString()) return res.status(401).json({ message: 'Não autorizado' });

    await log.deleteOne();
    res.status(200).json({ message: 'Treino removido do calendário' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao remover treino', error });
  }
};