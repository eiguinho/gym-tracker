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
  },
  getById: async (id: string): Promise<Workout> => {
    const response = await api.get(`/workouts/${id}`)
    return response.data
  },
  update: async (id: string, data: Partial<CreateWorkoutDTO>): Promise<Workout> => {
    const response = await api.put(`/workouts/${id}`, data)
    return response.data
  },
  // --- MÉTODOS DO CALENDÁRIO (WORKOUT LOGS) ---
  scheduleWorkout: async (workoutId: string, date: Date) => {
    const response = await api.post('/workout-logs', { workout: workoutId, date })
    return response.data
  },
  getCalendarLogs: async (startDate: Date, endDate: Date) => {
    const response = await api.get(`/workout-logs?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`)
    return response.data
  },
  updateLogStatus: async (logId: string, status: string, durationMinutes?: number) => {
    const response = await api.put(`/workout-logs/${logId}`, { status, durationMinutes })
    return response.data
  },
  deleteCalendarLog: async (logId: string) => {
    const response = await api.delete(`/workout-logs/${logId}`)
    return response.data
  },
  moveCalendarLog: async (logId: string, newDate: Date) => {
    const response = await api.put(`/workout-logs/${logId}`, { date: newDate })
    return response.data
  },
}