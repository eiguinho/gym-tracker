'use client'

import { createContext, ReactNode, useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/navigation'
import api from '@/lib/api'
import { authService } from '@/services/auth-service'
import { User } from '@/types/auth'

export const AuthContext = createContext({} as any) 

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

  const setSession = (token: string, userData: User) => {
    localStorage.setItem('@gymtracker:token', token)
    localStorage.setItem('@gymtracker:user', JSON.stringify(userData))
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    setUser(userData)
  }

  const updateUserSession = (newUserData: User) => {
    setUser(newUserData)
    localStorage.setItem('@gymtracker:user', JSON.stringify(newUserData))
  }

  async function signIn({ email, password }: any) {
    try {
      const data = await authService.login({ email, password })
      
      const userData = { 
        id: data._id, 
        name: data.name, 
        email: data.email, 
        avatarIcon: data.avatarIcon,
        level: data.level,
        focus: data.focus
      }

      setSession(data.token, userData)
      router.push('/dashboard') 

    } catch (error) {
      console.error('Erro ao logar', error)
      throw error
    }
  }

  async function verifyAndSignIn({ email, code }: { email: string, code: string }) {
    try {
      const data = await authService.verifyEmail({ email, code })
      
      const userData = { 
        id: data._id, 
        name: data.name, 
        email: data.email, 
        avatarIcon: data.avatarIcon,
        level: data.level,
        focus: data.focus
      }

      setSession(data.token, userData)
      router.push('/dashboard') 

    } catch (error) {
      console.error('Erro ao verificar email', error)
      throw error
    }
  }

  function signOut() {
    localStorage.removeItem('@gymtracker:token')
    localStorage.removeItem('@gymtracker:user')
    delete api.defaults.headers.common['Authorization']
    setUser(null)
    router.push('/')
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      updateUserSession,
      isAuthenticated: !!user, 
      signIn, 
      verifyAndSignIn, 
      signOut, 
      loading 
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)