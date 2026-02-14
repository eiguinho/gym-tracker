'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/providers/auth-provider'
import { Input } from '@/components/ui/input'
import Link from 'next/link'

export function LoginForm() {
  const { signIn } = useAuth()
  const router = useRouter()
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await signIn({ email, password })
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Falha na autenticação. Verifique seus dados.'
      setError(msg)
      setLoading(false)
    }
  }

  return (
    <form className="mt-8 space-y-6" onSubmit={handleLogin}>
      <div className="space-y-4">
        <Input 
          label="E-mail"
          type="email"
          placeholder="exemplo@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        
        <Input 
          label="Senha"
          type="password"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      {error && (
        <div className="rounded-md bg-red-50 p-3 text-sm text-red-500 border border-red-200 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300 text-center">
          {error}
        </div>
      )}

      <div>
        <button
          type="submit"
          disabled={loading}
          className="group relative flex w-full justify-center rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed dark:focus:ring-offset-gray-900"
        >
          {loading ? 'Carregando...' : 'Entrar'}
        </button>
      </div>

      <div className="text-center text-sm">
        <p className="text-gray-500 dark:text-gray-400">
          Não tem uma conta?{' '}
          <Link href="/register" className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
            Cadastre-se gratuitamente
          </Link>
        </p>
      </div>
    </form>
  )
}