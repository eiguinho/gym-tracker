import { Suspense } from 'react'
import { VerifyForm } from '@/components/auth/verify-form'

export default function VerifyPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 dark:bg-gray-950 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-4 rounded-xl bg-white p-8 shadow-lg dark:bg-gray-900">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Verificação
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Confira a sua caixa de entrada (e o spam).
          </p>
        </div>

        <Suspense fallback={<div className="text-center py-4 text-gray-500">Carregando...</div>}>
          <VerifyForm />
        </Suspense>
        
      </div>
    </div>
  )
}