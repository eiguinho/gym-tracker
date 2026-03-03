'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/providers/auth-provider'
import { Spinner } from '@/components/ui/spinner'

export function VerifyForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get('email') || ''
  
  const { verifyAndSignIn } = useAuth()

  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!email) {
      router.push('/login')
    }
  }, [email, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await verifyAndSignIn({ email, code })
      
    } catch (err: any) {
      setError(err.response?.data?.message || 'Código inválido. Verifique e tente novamente.')
      setLoading(false)
    }
  }

  if (!email) return null

  return (
    <form onSubmit={handleSubmit} className="space-y-6 mt-6">
      <div className="rounded-lg bg-indigo-50 p-3 text-sm text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300 text-center border border-indigo-100 dark:border-indigo-800/50">
        Código enviado para: <br />
        <span className="font-semibold">{email}</span>
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/30 dark:text-red-400 text-center">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-center mb-2">
          Código de 6 dígitos
        </label>
        <input
          type="text"
          maxLength={6}
          placeholder="000000"
          value={code}
          onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))} 
          className="block w-full rounded-lg border border-gray-300 px-3 py-4 text-center text-3xl tracking-[0.5em] text-gray-900 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:focus:ring-indigo-500 font-mono transition-all"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading || code.length !== 6}
        className="flex w-full justify-center rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 transition-colors"
      >
        {loading ? <Spinner /> : 'Validar e Entrar'}
      </button>
    </form>
  )
}