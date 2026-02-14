import { LoginForm } from '@/components/auth/login-form'

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 dark:bg-gray-950 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-lg dark:bg-gray-900">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Gym Tracker 💪
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Entre para gerenciar seus treinos e evolução
          </p>
        </div>

        {/* Componente de Login Isolado */}
        <LoginForm />
        
      </div>
    </div>
  )
}