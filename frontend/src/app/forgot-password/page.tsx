'use client'

import { useState } from 'react'
import { authService } from '@/services/auth-service'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { useRouter } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'

export default function ForgotPasswordPage() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleRequestCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await authService.forgotPassword(email)
      setStep(2)
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao enviar código.')
    } finally { setLoading(false) }
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await authService.resetPassword({ email, code, newPassword })
      router.push('/')
    } catch (err: any) {
      setError(err.response?.data?.message || 'Código inválido ou expirado.')
    } finally { setLoading(false) }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 dark:bg-gray-950 sm:px-6 lg:px-8 font-sans">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-lg dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
        
        <div className="text-center">
          <button 
            onClick={() => step === 2 ? setStep(1) : router.push('/login')}
            className="inline-flex items-center text-sm text-gray-500 hover:text-indigo-600 transition-colors mb-4 group"
          >
            <ChevronLeft size={16} className="mr-1 group-hover:-translate-x-1 transition-transform" />
            Voltar
          </button>
          
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            {step === 1 ? 'Recuperar Senha 🔑' : 'Nova Senha 🔒'}
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {step === 1 
              ? 'Informe seu e-mail para receber o código de 6 dígitos' 
              : 'Digite o código enviado e sua nova senha de acesso'}
          </p>
        </div>

        {error && (
          <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/30 dark:text-red-400 text-center border border-red-100 dark:border-red-800/50">
            {error}
          </div>
        )}

        <form onSubmit={step === 1 ? handleRequestCode : handleResetPassword} className="space-y-6">
          {step === 1 ? (
            <Input 
              label="E-mail" 
              type="email" 
              placeholder="seu@email.com"
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
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
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))} 
                  className="block w-full rounded-lg border border-gray-300 px-3 py-3 text-center text-2xl tracking-[0.3em] text-gray-900 focus:ring-2 focus:ring-indigo-600 dark:bg-gray-800 dark:text-white dark:border-gray-700 font-mono"
                  required
                />
              </div>
              <Input 
                label="Nova Senha" 
                type="password" 
                placeholder="No mínimo 6 caracteres"
                value={newPassword} 
                onChange={(e) => setNewPassword(e.target.value)} 
                minLength={6} 
                required 
              />
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:opacity-50 transition-colors"
          >
            {loading ? <Spinner /> : step === 1 ? 'Enviar Código' : 'Redefinir Senha'}
          </button>
        </form>
      </div>
    </div>
  )
}