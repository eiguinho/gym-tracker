'use client'

import { createContext, ReactNode, useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/navigation'
import api from '@/lib/api'
import { User, AuthContextData } from '@/types/auth'

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('@gymtracker:token')
    const savedUser = localStorage.getItem('@gymtracker:user')

    if (token && savedUser) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      setUser(JSON.parse(savedUser))
    }
    
    setLoading(false)
  }, [])

  async function signIn({ email, password }: any) {
    try {
      const response = await api.post('/auth/login', {
        email,
        password,
      })

      const { token, name, _id } = response.data

      localStorage.setItem('@gymtracker:token', token)
      const userData = { id: _id, name, email } 
      localStorage.setItem('@gymtracker:user', JSON.stringify(userData))

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`

      setUser(userData)

      router.push('/dashboard') 

    } catch (error) {
      console.error('Erro ao logar', error)
      throw error
    }
  }

  function signOut() {
    localStorage.removeItem('@gymtracker:token')
    localStorage.removeItem('@gymtracker:user')
    setUser(null)
    router.push('/')
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, signIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)