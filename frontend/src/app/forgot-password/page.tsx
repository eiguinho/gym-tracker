'use client'

import { useState } from 'react'
import { authService } from '@/services/auth-service'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { useRouter } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'
import { getErrorMessage } from '@/utils/error-handler'

export default function ForgotPasswordPage() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    email: '',
    code: '',
    newPassword: ''
  })

  const [status, setStatus] = useState({
    step: 1,
    loading: false,
    error: ''
  })

  const handleRequestCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus(prev => ({ ...prev, loading: true, error: '' }))
    try {
      await authService.forgotPassword(formData.email)
      setStatus({ step: 2, loading: false, error: '' })
    } catch (error) {
      setStatus(prev => ({ 
        ...prev, 
        loading: false, 
        error: getErrorMessage(error, 'Erro ao enviar código.') 
      }))
    }
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus(prev => ({ ...prev, loading: true, error: '' }))
    try {
      await authService.resetPassword(formData)
      router.push('/')
    } catch (error) {
      setStatus(prev => ({ 
        ...prev, 
        loading: false, 
        error: getErrorMessage(error, 'Código inválido ou expirado.') 
      }))
    }
  }

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 dark:bg-gray-950 sm:px-6 lg:px-8 font-sans">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-lg dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
        
        <div className="text-center">
          <button 
            onClick={() => status.step === 2 ? setStatus(prev => ({ ...prev, step: 1 })) : router.push('/')}
            className="inline-flex items-center text-sm text-gray-500 hover:text-indigo-600 transition-colors mb-4 group"
          >
            <ChevronLeft size={16} className="mr-1 group-hover:-translate-x-1 transition-transform" />
            Voltar
          </button>
          
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            {status.step === 1 ? 'Recuperar Senha 🔑' : 'Nova Senha 🔒'}
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {status.step === 1 
              ? 'Informe seu e-mail para receber o código de 6 dígitos' 
              : 'Digite o código enviado e sua nova senha de acesso'}
          </p>
        </div>

        {status.error && (
          <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/30 dark:text-red-400 text-center border border-red-100 dark:border-red-800/50">
            {status.error}
          </div>
        )}

        <form onSubmit={status.step === 1 ? handleRequestCode : handleResetPassword} className="space-y-6">
          {status.step === 1 ? (
            <Input 
              label="E-mail" 
              type="email" 
              placeholder="seu@email.com"
              value={formData.email} 
              onChange={(e) => handleChange('email', e.target.value)} 
              required 
            />
          ) : (
            <>
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-center mb-2">
                  Código de Verificação
                </label>
                <input
                  type="text"
                  maxLength={6}
                  placeholder="000000"
                  value={formData.code}
                  onChange={(e) => handleChange('code', e.target.value.replace(/\D/g, ''))} 
                  className="block w-full rounded-lg border border-gray-300 px-3 py-3 text-center text-2xl tracking-[0.3em] text-gray-900 focus:ring-2 focus:ring-indigo-600 dark:bg-gray-800 dark:text-white dark:border-gray-700 font-mono"
                  required
                />
              </div>
              <Input 
                label="Nova Senha" 
                type="password" 
                placeholder="No mínimo 6 caracteres"
                value={formData.newPassword} 
                onChange={(e) => handleChange('newPassword', e.target.value)} 
                minLength={6} 
                required 
              />
            </>
          )}

          <button
            type="submit"
            disabled={status.loading}
            className="flex w-full justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:opacity-50 transition-colors"
          >
            {status.loading ? <Spinner /> : status.step === 1 ? 'Enviar Código' : 'Redefinir Senha'}
          </button>
        </form>
      </div>
    </div>
  )
}