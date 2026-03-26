'use client'

import { useState } from 'react'
import { useAuth } from '@/providers/auth-provider'
import { authService } from '@/services/auth-service'
import { Spinner } from '@/components/ui/spinner'
import { Trophy, Target } from 'lucide-react'
import { toast } from 'sonner'
import { usePathname } from 'next/navigation'
import { getErrorMessage } from '@/utils/error-handler'

const LEVEL_OPTIONS = [
  { id: 'iniciante', label: 'Iniciante', desc: 'Começando agora ou menos de 6 meses.' },
  { id: 'intermediario', label: 'Intermediário', desc: 'Treino constante há mais de 1 ano.' },
  { id: 'avancado', label: 'Avançado', desc: 'Mais de 3 anos, foco em alta performance.' }
]

const FOCUS_OPTIONS = [
  { id: 'hipertrofia_geral', label: 'Hipertrofia Geral (Corpo todo)' },
  { id: 'inferiores', label: 'Foco em Inferiores (Pernas e Glúteos)' },
  { id: 'superiores', label: 'Foco em Superiores (Peito, Costas, Braços)' },
  { id: 'emagrecimento', label: 'Emagrecimento / Definição' },
  { id: 'forca', label: 'Ganho de Força Bruta' }
]

export function OnboardingModal() {
  const pathname = usePathname()
  
  const { user, updateUserSession } = useAuth()
  
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    level: LEVEL_OPTIONS[0].id,
    focus: FOCUS_OPTIONS[0].id
  })

  if (!user || user.focus || !pathname.startsWith('/dashboard')) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const data = await authService.updateProfile(formData)
      const updatedUser = { ...user, ...data.user, ...formData }
      
      updateUserSession(updatedUser)
      toast.success('Perfil configurado com sucesso!')
    } catch (error) {
      toast.error(getErrorMessage(error, 'Ocorreu um erro ao salvar. Tente novamente.'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl dark:bg-gray-900 animate-in fade-in zoom-in-95 duration-200">
        <div className="bg-indigo-600 p-5 sm:p-6 text-center text-white shrink-0">
          <div className="mx-auto mb-3 sm:mb-4 flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-white/20">
            <Trophy className="h-6 w-6 sm:h-8 sm:w-8" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold">Bem-vindo ao GymTracker!</h2>
          <p className="mt-1 sm:mt-2 text-sm sm:text-base text-indigo-100">
            Para personalizarmos sua experiência, precisamos de duas informações rápidas.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-5 sm:space-y-6">
          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              Qual seu nível de experiência?
            </label>
            <div className="grid grid-cols-1 gap-2.5 sm:gap-3">
              {LEVEL_OPTIONS.map((opt) => (
                <label 
                  key={opt.id} 
                  className={`flex cursor-pointer flex-col rounded-lg border p-2.5 sm:p-3 transition-all ${
                    formData.level === opt.id ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20' : 'border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <input 
                      type="radio" 
                      name="level" 
                      value={opt.id} 
                      checked={formData.level === opt.id} 
                      onChange={(e) => setFormData(prev => ({ ...prev, level: e.target.value }))} 
                      className="text-indigo-600 focus:ring-indigo-600 h-4 w-4 shrink-0"
                    />
                    <span className="font-medium text-sm sm:text-base text-gray-900 dark:text-white">{opt.label}</span>
                  </div>
                  <span className="pl-6 text-[11px] sm:text-xs text-gray-500 dark:text-gray-400 mt-0.5">{opt.desc}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label htmlFor="focus-select" className="text-sm font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <Target size={16} className="text-indigo-500 shrink-0" /> Qual o seu foco principal?
            </label>
            <select
              id="focus-select"
              value={formData.focus}
              onChange={(e) => setFormData(prev => ({ ...prev, focus: e.target.value }))}
              className="flex h-11 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
            >
              {FOCUS_OPTIONS.map(opt => (
                <option key={opt.id} value={opt.id}>{opt.label}</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 rounded-lg bg-indigo-600 py-3 text-sm font-bold text-white shadow-md hover:bg-indigo-700 transition-colors disabled:opacity-50 mt-2"
          >
            {loading ? <Spinner /> : 'Começar Minha Jornada'}
          </button>
        </form>
      </div>
    </div>
  )
}