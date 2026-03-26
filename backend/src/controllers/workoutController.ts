import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Workout from '../models/Workout';
import Exercise from '../models/Exercise';
import WorkoutLog from '../models/WorkoutLog';
import { ExerciseInput, IntensityLevel, UpdateOrderInput } from '../types/workout';
import { calculateIntensity } from '../utils/workoutUtils';

const hasDuplicateExercises = (exercises: ExerciseInput[]): boolean => {
  const exerciseIds = exercises.map((e) => e.exercise.toString());
  return exerciseIds.length !== new Set(exerciseIds).size;
};

export const getAvailableExercises = async (req: Request, res: Response): Promise<void | Response> => {
  try {
    const exercises = await Exercise.find({}).sort({ name: 1 });
    return res.json(exercises);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao buscar exercícios' });
  }
};

export const getWorkoutById = async (req: Request, res: Response): Promise<void | Response> => {
  try {
    const workout = await Workout.findById(req.params.id).populate(
      'exercises.exercise',
      'name targetMuscles equipment'
    );

    if (!workout) return res.status(404).json({ message: 'Treino não encontrado' });
    
    if (workout.user.toString() !== req.user!._id.toString()) {
      return res.status(401).json({ message: 'Não autorizado' });
    }

    return res.json(workout);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao buscar o treino' });
  }
};

export const createWorkout = async (req: Request, res: Response): Promise<void | Response> => {
  try {
    const { title, exercises }: { title: string; exercises: ExerciseInput[] } = req.body;

    if (!exercises || exercises.length === 0) {
      return res.status(400).json({ message: 'O treino precisa ter pelo menos um exercício.' });
    }

    if (hasDuplicateExercises(exercises)) {
      return res.status(400).json({ message: 'Você não pode adicionar o mesmo exercício duas vezes no treino.' });
    }

    const workout = await Workout.create({
      user: req.user!._id,
      title,
      exercises,
      intensityLevel: calculateIntensity(exercises.length),
      isActive: false,
      routineOrder: 0,
    });

    return res.status(201).json(workout);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao criar treino' });
  }
};

export const getMyWorkouts = async (req: Request, res: Response): Promise<void | Response> => {
  try {
    const workouts = await Workout.find({ user: req.user!._id })
      .populate('exercises.exercise', 'name targetMuscles')
      .sort({ isActive: -1, routineOrder: 1, createdAt: -1 }); 
      
    return res.json(workouts);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao buscar treinos' });
  }
};

export const deleteWorkout = async (req: Request, res: Response): Promise<void | Response> => {
  try {
    const workout = await Workout.findById(req.params.id);

    if (!workout) return res.status(404).json({ message: 'Treino não encontrado' });
    if (workout.user.toString() !== req.user!._id.toString()) return res.status(401).json({ message: 'Não autorizado' });

    await WorkoutLog.deleteMany({ workout: workout._id });
    await workout.deleteOne();
    
    return res.status(200).json({ message: 'Treino removido com sucesso' });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao remover treino' });
  }
};

export const updateWorkout = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { title, exercises }: { title: string; exercises: ExerciseInput[] } = req.body;
    const workout = await Workout.findById(req.params.id);

    if (!workout) return res.status(404).json({ message: 'Treino não encontrado' });
    if (workout.user.toString() !== req.user!._id.toString()) return res.status(401).json({ message: 'Não autorizado' });

    if (title) workout.title = title;
    
    if (exercises && exercises.length > 0) {
      if (hasDuplicateExercises(exercises)) {
        return res.status(400).json({ message: 'Você não pode adicionar o mesmo exercício duas vezes no treino.' });
      }
      workout.exercises = exercises as typeof workout.exercises;
      workout.intensityLevel = calculateIntensity(exercises.length);
    }

    const updatedWorkout = await workout.save();
    return res.json(updatedWorkout);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao atualizar o treino' });
  }
};

export const toggleWorkoutActive = async (req: Request, res: Response): Promise<void | Response> => {
  try {
    const { isActive }: { isActive: boolean } = req.body;
    const userId = req.user!._id;
    const workoutId = req.params.id;

    const workout = await Workout.findById(workoutId);
    if (!workout) return res.status(404).json({ message: 'Treino não encontrado' });

    if (isActive) {
      const activeCount = await Workout.countDocuments({ user: userId, isActive: true });
      
      if (activeCount >= 7) {
        return res.status(400).json({ message: 'Você já atingiu o limite de 7 treinos ativos (A-G).' });
      }

      workout.isActive = true;
      workout.routineOrder = activeCount;
    } 
    else {
      const oldOrder = workout.routineOrder;
      workout.isActive = false;
      workout.routineOrder = 0;

      await Workout.updateMany(
        { user: userId, isActive: true, routineOrder: { $gt: oldOrder } },
        { $inc: { routineOrder: -1 } }
      );
    }

    await workout.save();
    return res.json({ message: 'Rotina atualizada com sucesso', workout });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao processar rotina' });
  }
};

export const updateWorkoutOrders = async (req: Request, res: Response): Promise<void | Response> => {
  try {
    const { updates }: { updates: UpdateOrderInput[] } = req.body;

    if (!Array.isArray(updates) || updates.length === 0) {
      return res.status(400).json({ message: 'Nenhuma atualização enviada.' });
    }

    const bulkOps = updates.map((update) => ({
      updateOne: {
        filter: { 
          _id: new mongoose.Types.ObjectId(update.id),
          user: req.user!._id 
        },
        update: { $set: { routineOrder: update.routineOrder } }
      }
    }));

    await Workout.bulkWrite(bulkOps);

    return res.json({ message: 'Ordem da rotina atualizada com sucesso' });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao reordenar a rotina' });
  }
};