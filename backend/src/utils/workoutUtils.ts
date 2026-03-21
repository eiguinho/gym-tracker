import { IntensityLevel } from '../types/workout';

export const calculateIntensity = (numExercises: number): IntensityLevel => {
  if (numExercises <= 3) return 'Leve';
  if (numExercises <= 5) return 'Moderado';
  if (numExercises <= 7) return 'Intenso';
  return 'Insano';
};