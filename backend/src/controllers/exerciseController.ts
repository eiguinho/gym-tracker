import { Request, Response } from 'express';
import Exercise from '../models/Exercise';

export const getAllExercises = async (req: Request, res: Response) => {
  try {
    const exercises = await Exercise.find({}).lean();
    res.json(exercises);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar exercícios' });
  }
};