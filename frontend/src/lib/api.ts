import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
})

api.interceptors.request.use(
  (config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('@gymtracker:token') : null

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response && error.response.status === 401) {
       // futuramente forçar o logout do usuário
       // e limpar o localStorage
       if (typeof window !== 'undefined') {
         // localStorage.removeItem('@gymtracker:token');
         // window.location.href = '/login'; 
       }
    }
    return Promise.reject(error)
  }
)

export default api