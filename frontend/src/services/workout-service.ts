import api from '@/lib/api'
import { Workout, Exercise, CreateWorkoutDTO } from '@/types/workout'

export const workoutService = {
  getAll: async (): Promise<Workout[]> => {
    const response = await api.get('/workouts')
    return response.data
  },
  delete: async (id: string) => {
    await api.delete(`/workouts/${id}`)
  },
  getExercises: async (): Promise<Exercise[]> => {
    const response = await api.get('/workouts/exercises')
    return response.data
  },
  create: async (data: CreateWorkoutDTO): Promise<Workout> => {
    const response = await api.post('/workouts', data)
    return response.data
  }
}