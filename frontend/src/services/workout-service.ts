import api from '@/lib/api'
import { Workout } from '@/types/workout'

export const workoutService = {
  getAll: async (): Promise<Workout[]> => {
    const response = await api.get('/workouts')
    return response.data
  },
  delete: async (id: string) => {
    await api.delete(`/workouts/${id}`)
  }
}