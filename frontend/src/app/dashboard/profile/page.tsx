'use client'

import { useState } from 'react'
import { useAuth } from '@/providers/auth-provider'
import { PageHeader } from '@/components/ui/page-header'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Spinner } from '@/components/ui/spinner'
import { BaseCard } from '@/components/ui/base-card'
import { AlertModal } from '@/components/ui/alert-modal'
import { toast } from 'sonner'
import { authService } from '@/services/auth-service'
import { 
  User, Dumbbell, Flame, Zap, HeartPulse, Trophy, 
  Save, CheckCircle2, Trash2, AlertTriangle, Target
} from 'lucide-react'

const AVATARS = [
  { id: 'User', icon: User },
  { id: 'Dumbbell', icon: Dumbbell },
  { id: 'Flame', icon: Flame },
  { id: 'Zap', icon: Zap },
  { id: 'HeartPulse', icon: HeartPulse },
  { id: 'Trophy', icon: Trophy },
]

const LEVELS = ['Iniciante', 'Intermediário', 'Avançado']
const FOCUSES = ['Força', 'Superiores', 'Inferiores', 'Full Body', 'PPL']

export default function ProfilePage() {
  const { user, updateUserSession, signOut } = useAuth()
  
  const [loading, setLoading] = useState(false)
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    avatarIcon: user?.avatarIcon || 'User',
    level: user?.level || '',
    focus: user?.focus || ''
  })

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const data = await authService.updateProfile(formData)
      updateUserSession(data.user)
      toast.success('Perfil atualizado com sucesso!')
    } catch (error) {
      toast.error('Erro ao atualizar perfil')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteAccount = async () => {
    setDeleteLoading(true)
    try {
      await authService.deleteAccount()
      toast.success('Sua conta foi excluída.')
      signOut()
    } catch (error) {
      toast.error('Erro ao excluir conta.')
    } finally {
      setDeleteLoading(false)
      setIsAlertOpen(false)
    }
  }

  return (
    <div className="min-h-screen bg-background p-8 font-sans">
      <div className="mx-auto max-w-2xl">
        <PageHeader 
          title="Meu Perfil" 
          description="Gerencie suas informações e preferências de treino" 
        />

        <BaseCard className="mt-8 p-6">
          <form onSubmit={handleSave} className="space-y-8">
            <div className="space-y-4">
              <label className="text-sm font-medium text-muted-foreground">Avatar de Perfil</label>
              <div className="flex flex-wrap justify-center gap-4 py-2">
                {AVATARS.map(({ id, icon: Icon }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => handleChange('avatarIcon', id)}
                    className={`group relative flex h-16 w-16 items-center justify-center rounded-full transition-all ${
                      formData.avatarIcon === id
                        ? 'bg-indigo-600 text-white shadow-lg ring-4 ring-indigo-100 dark:ring-indigo-900/50 scale-110'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    <Icon size={30} fill={formData.avatarIcon === id ? 'currentColor' : 'none'} />
                    {formData.avatarIcon === id && (
                      <div className="absolute -right-1 -top-1 rounded-full bg-green-500 p-1 text-white shadow-sm">
                        <CheckCircle2 size={12} />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <Input 
                label="Nome" 
                value={formData.name} 
                onChange={(e) => handleChange('name', e.target.value)} 
                required 
              />
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none text-muted-foreground">E-mail</label>
                <div className="flex h-10 w-full rounded-md border border-input bg-muted px-3 py-2 text-sm text-muted-foreground opacity-70 cursor-not-allowed">
                  {user?.email}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <h4 className="text-sm font-semibold mb-4 flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                <Target size={18} />
                Preferências do Coach (Sugestões de Treino)
              </h4>
              <div className="grid gap-6 sm:grid-cols-2">
                <Select
                  label="Seu Nível"
                  value={formData.level}
                  onChange={(e) => handleChange('level', e.target.value)}
                  options={LEVELS}
                  required
                />
                
                <Select
                  label="Seu Foco Principal"
                  value={formData.focus}
                  onChange={(e) => handleChange('focus', e.target.value)}
                  options={FOCUSES}
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-end border-t border-border pt-6">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:opacity-50 transition-colors"
              >
                {loading ? <Spinner /> : <><Save size={18} /> Salvar Alterações</>}
              </button>
            </div>
          </form>
        </BaseCard>

        <BaseCard className="mt-8 border-red-200 p-6 dark:border-red-900/30 bg-red-50/50 dark:bg-red-900/10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-red-600 dark:text-red-500 flex items-center gap-2">
                <AlertTriangle size={20} /> Zona de Perigo
              </h3>
              <p className="text-sm text-red-700 dark:text-red-400 mt-1">
                Ao excluir sua conta, você perderá todo o progresso e dados salvos até agora.
              </p>
            </div>
            
            <button
              onClick={() => setIsAlertOpen(true)}
              className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 transition-colors shrink-0"
            >
              <Trash2 size={18} /> Excluir Conta
            </button>
          </div>
        </BaseCard>

        <AlertModal
          isOpen={isAlertOpen}
          onClose={() => setIsAlertOpen(false)}
          onConfirm={handleDeleteAccount}
          title="Você tem certeza absoluta?"
          description="Isso excluirá permanentemente sua conta, treinos e registros de sono. Esta ação não pode ser desfeita."
          confirmText="Sim, excluir minha conta"
          loading={deleteLoading}
        />

      </div>
    </div>
  )
}