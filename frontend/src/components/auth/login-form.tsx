'use client'

import { useState } from 'react'
import { useAuth } from '@/providers/auth-provider'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import Link from 'next/link'
import { toast } from 'sonner'
import { getErrorMessage } from '@/utils/error-handler'

export function LoginForm() {
  const { signIn } = useAuth()
  
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    try {
      await signIn(formData)
      toast.success('Login realizado com sucesso! Bem-vindo.')
    } catch (error) {
      toast.error(getErrorMessage(error, 'Falha na autenticação. Verifique seus dados.'))
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
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          required
        />
        
        <Input 
          label="Senha"
          type="password"
          placeholder="********"
          value={formData.password}
          onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
          required
        />
      </div>

      <div>
        <button
          type="submit"
          disabled={loading}
          className="group relative flex w-full justify-center rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed dark:focus:ring-offset-gray-900"
        >
          {loading ? <Spinner /> : 'Entrar'}
        </button>
      </div>

      <div className="text-center text-sm space-y-2">
        <p className="text-gray-500 dark:text-gray-400">
          Não tem uma conta?{' '}
          <Link href="/register" className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
            Cadastre-se gratuitamente
          </Link>
        </p>
        <p className="text-gray-500 dark:text-gray-400">
          Esqueceu sua senha?{' '}
          <Link href="/forgot-password" className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
            Recuperar senha
          </Link>
        </p>
      </div>
    </form>
  )
}