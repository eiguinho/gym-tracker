import { Request, Response } from 'express';
import Workout from '../models/Workout';
import Exercise from '../models/Exercise';

const calculateIntensity = (numExercises: number): string => {
  if (numExercises <= 3) return 'Leve';
  if (numExercises <= 5) return 'Moderado';
  if (numExercises <= 7) return 'Intenso';
  return 'Insano (Cuidado!)';
};

export const getAvailableExercises = async (req: Request, res: Response) => {
  try {
    const exercises = await Exercise.find({}).sort({ name: 1 });
    res.json(exercises);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar exercícios' });
  }
};

export const createWorkout = async (req: any, res: Response): Promise<any> => {
  try {
    const { title, exercises } = req.body;

    if (!exercises || exercises.length === 0) {
      return res
        .status(400)
        .json({ message: 'O treino precisa ter pelo menos um exercício.' });
    }

    const exerciseIds = exercises.map((e: any) => e.exercise);
    const uniqueIds = new Set(exerciseIds);
    if (exerciseIds.length !== uniqueIds.size) {
      return res
        .status(400)
        .json({
          message:
            'Você não pode adicionar o mesmo exercício duas vezes no treino.',
        });
    }

    const intensity = calculateIntensity(exercises.length);

    const workout = await Workout.create({
      user: req.user._id,
      title,
      exercises,
      intensityLevel: intensity,
    });

    res.status(201).json(workout);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar treino', error });
  }
};

export const getMyWorkouts = async (req: any, res: Response) => {
  try {
    const workouts = await Workout.find({ user: req.user._id }).populate(
      'exercises.exercise',
      'name targetMuscles',
    );

    res.json(workouts);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar treinos' });
  }
};

export const deleteWorkout = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const workout = await Workout.findById(id)

    if (!workout) {
      return res.status(404).json({ message: 'Treino não encontrado' })
    }

    if (workout.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Não autorizado' })
    }

    await workout.deleteOne()

    res.status(200).json({ message: 'Treino removido com sucesso' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Erro ao remover treino' })
  }
}