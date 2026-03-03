import api from '@/lib/api'

export const authService = {
  login: async (credentials: { email: string; password: string }) => {
    const response = await api.post('/auth/login', credentials)
    return response.data
  },

  register: async (data: { name: string; email: string; password: string; avatarIcon: string }) => {
    const response = await api.post('/auth/register', data)
    return response.data
  },

  verifyEmail: async (data: { email: string; code: string }) => {
    const response = await api.post('/auth/verify', data)
    return response.data
  }
}