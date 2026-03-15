import { Request, Response } from 'express';
import Exercise from '../models/Exercise';

export const getAllExercises = async (req: Request, res: Response) => {
  try {
    const exercises = await Exercise.find({}).lean(); // O .lean() traz os dados brutos do Mongo
    console.log("Primeiro exercício do banco:", exercises[0]); // Veja se no terminal do VS Code aparece o gifUrl
    res.json(exercises);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar exercícios' });
  }
};