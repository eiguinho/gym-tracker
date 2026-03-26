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
  },
  forgotPassword: async (email: string) => {
    const response = await api.post('/auth/forgot-password', { email })
    return response.data
  },
  resetPassword: async (data: { email: string; code: string; newPassword: string }) => {
    const response = await api.post('/auth/reset-password', data)
    return response.data
  },
  deleteAccount: async () => {
    const response = await api.delete('/auth/profile');
    return response.data;
  },
  updateProfile: async (data: { name?: string; avatarIcon?: string; level?: string; focus?: string; }) => {
    const response = await api.put('/auth/profile', data);
    return response.data;
  }
}