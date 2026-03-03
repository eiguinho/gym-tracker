import api from '@/lib/api'
import { SleepLog } from '@/types/sleep'

export const sleepService = {
  saveLog: async (data: { date: Date; bedTime: string; wakeTime: string; qualityScore: number; notes?: string }): Promise<SleepLog> => {
    const response = await api.post('/sleep', data)
    return response.data
  },
  
  getLogs: async (startDate: Date, endDate: Date): Promise<SleepLog[]> => {
    const response = await api.get(`/sleep?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`)
    return response.data
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/sleep/${id}`)
  }
}