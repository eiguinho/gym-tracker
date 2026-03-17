import api from '@/lib/api'
import { Exercise } from '@/types/exercise'

export const exerciseService = {
  getAll: async (): Promise<Exercise[]> => {
    const response = await api.get('/exercises?hasGif=true')
    return response.data
  }
}