'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { authService } from '@/services/auth-service'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { User, Dumbbell, Flame, Zap, HeartPulse, Trophy } from 'lucide-react'
import { toast } from 'sonner'

const AVATARS = [
  { id: 'User', icon: User },
  { id: 'Dumbbell', icon: Dumbbell },
  { id: 'Flame', icon: Flame },
  { id: 'Zap', icon: Zap },
  { id: 'HeartPulse', icon: HeartPulse },
  { id: 'Trophy', icon: Trophy },
]

export function RegisterForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    avatarIcon: 'User',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await authService.register(formData)
      toast.success('Conta criada! Verifique o código no seu e-mail.')
      router.push(`/verify?email=${encodeURIComponent(formData.email)}`)
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Erro ao criar conta. Tente novamente.'
      toast.error(msg)
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 mt-6">

      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
          Escolha seu Avatar
        </label>
        <div className="flex justify-center gap-3">
          {AVATARS.map(({ id, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setFormData({ ...formData, avatarIcon: id })}
              className={`p-3 rounded-full transition-all ${
                formData.avatarIcon === id
                  ? 'bg-indigo-600 text-white shadow-md scale-110 ring-2 ring-indigo-200 dark:ring-indigo-900'
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
              }`}
            >
              <Icon size={24} />
            </button>
          ))}
        </div>
      </div>

      <Input
        label="Nome Completo"
        placeholder="João da Silva"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />

      <Input
        label="E-mail"
        type="email"
        placeholder="seu@email.com"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />

      <Input
        label="Senha"
        type="password"
        placeholder="••••••••"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        required
        minLength={6}
      />

      <button
        type="submit"
        disabled={loading}
        className="flex w-full justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 transition-colors"
      >
        {loading ? <Spinner /> : 'Criar Conta'}
      </button>

      <p className="text-center text-sm text-gray-600 dark:text-gray-400">
        Já tem uma conta?{' '}
        <button
          type="button"
          onClick={() => router.push('/login')}
          className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
        >
          Faça login
        </button>
      </p>
    </form>
  )
}