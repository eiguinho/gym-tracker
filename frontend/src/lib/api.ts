import axios from 'axios'
import { toast } from 'sonner'

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
})

let isRedirecting = false;

api.interceptors.request.use(
  (config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('@gymtracker:token') : null
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      if (typeof window !== 'undefined' && !isRedirecting) {
        isRedirecting = true;

        localStorage.removeItem('@gymtracker:token');
        localStorage.removeItem('@gymtracker:user');
        
        toast.error('Sua sessão expirou. Por favor, faça login novamente.');
      }
    }
    return Promise.reject(error)
  }
)

export default api