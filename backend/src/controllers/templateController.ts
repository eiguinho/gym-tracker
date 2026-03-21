import { Request, Response } from 'express';
import WorkoutTemplate from '../models/WorkoutTemplate';
import Workout from '../models/Workout';
import User from '../models/User';
import { calculateIntensity } from '../utils/workoutUtils';

export const getRecommendedTemplates = async (req: Request, res: Response): Promise<void | Response> => {
  try {
    const userId = req.user!._id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    const templates = await WorkoutTemplate.find({
      level: user.level,
      focus: user.focus,
    }).populate('workouts.exercises.exercise', 'name targetMuscles equipment gifUrl');

    if (templates.length === 0) {
      const allTemplates = await WorkoutTemplate.find()
        .populate('workouts.exercises.exercise', 'name targetMuscles equipment gifUrl');
      return res.json(allTemplates);
    }

    return res.json(templates);
  } catch (error) {
    console.error('Erro ao buscar templates:', error);
    return res.status(500).json({ message: 'Erro ao buscar sugestões.' });
  }
};

export const cloneTemplate = async (req: Request, res: Response): Promise<void | Response> => {
  try {
    const templateId = req.params.id;
    const userId = req.user!._id;

    const template = await WorkoutTemplate.findById(templateId);

    if (!template) {
      return res.status(404).json({ message: 'Programa de treino não encontrado.' });
    }

    const workoutsToCreate = template.workouts.map((tw) => {
      return {
        user: userId,
        title: `${template.title} - ${tw.title}`,
        exercises: tw.exercises.map(ex => ({
          exercise: ex.exercise,
          sets: ex.sets,
          reps: ex.reps,
          notes: ex.notes
        })),
        intensityLevel: calculateIntensity(tw.exercises.length),
        isActive: false,
        routineOrder: 0,
      };
    });

    const clonedWorkouts = await Workout.insertMany(workoutsToCreate);

    return res.status(201).json({
      message: 'Rotina copiada com sucesso! Vá em "Meus Treinos" para ativá-la.',
      workouts: clonedWorkouts,
    });
  } catch (error) {
    console.error('Erro ao clonar template:', error);
    return res.status(500).json({ message: 'Erro ao copiar a rotina de treino.' });
  }
};