'use client'

import { useState } from 'react'
import { useAuth } from '@/providers/auth-provider'
import { PageHeader } from '@/components/ui/page-header'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { BaseCard } from '@/components/ui/base-card'
import { toast } from 'sonner'
import { authService } from '@/services/auth-service'
import { 
  User, Dumbbell, Flame, Zap, HeartPulse, Trophy, 
  Save, CheckCircle2, Trash2, AlertTriangle 
} from 'lucide-react'

const AVATARS = [
  { id: 'User', icon: User },
  { id: 'Dumbbell', icon: Dumbbell },
  { id: 'Flame', icon: Flame },
  { id: 'Zap', icon: Zap },
  { id: 'HeartPulse', icon: HeartPulse },
  { id: 'Trophy', icon: Trophy },
]

export default function ProfilePage() {
  const { user, setUser, signOut } = useAuth()
  const [loading, setLoading] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)
  
  const [name, setName] = useState(user?.name || '')
  const [avatarIcon, setAvatarIcon] = useState(user?.avatarIcon || 'User')

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const data = await authService.updateProfile({ name, avatarIcon })
      setUser(data.user)
      localStorage.setItem('@gymtracker:user', JSON.stringify(data.user))
      toast.success('Perfil atualizado!')
    } catch (error) {
      toast.error('Erro ao atualizar perfil')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "VOCÊ TEM CERTEZA? Isso excluirá permanentemente sua conta, treinos e registros de sono. Esta ação não pode ser desfeita."
    )

    if (!confirmed) return

    setDeleteLoading(true)
    try {
      await authService.deleteAccount()
      toast.success('Sua conta foi excluída.')
      signOut()
    } catch (error) {
      toast.error('Erro ao excluir conta.')
    } finally {
      setDeleteLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background p-8 font-sans">
      <div className="mx-auto max-w-2xl">
        <PageHeader 
          title="Meu Perfil" 
          description="Gerencie suas informações pessoais e aparência" 
        />

        <BaseCard className="mt-8 p-6">
          <form onSubmit={handleSave} className="space-y-6">
            <div className="space-y-4">
              <label className="text-sm font-medium text-muted-foreground">Avatar de Perfil</label>
              <div className="flex flex-wrap justify-center gap-4 py-2">
                {AVATARS.map(({ id, icon: Icon }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setAvatarIcon(id)}
                    className={`group relative flex h-16 w-16 items-center justify-center rounded-full transition-all ${
                      avatarIcon === id
                        ? 'bg-indigo-600 text-white shadow-lg ring-4 ring-indigo-100 dark:ring-indigo-900/50 scale-110'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    <Icon size={30} />
                    {avatarIcon === id && (
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
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
              />
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none text-muted-foreground">E-mail</label>
                <div className="flex h-10 w-full rounded-md border border-input bg-muted px-3 py-2 text-sm text-muted-foreground opacity-70 cursor-not-allowed">
                  {user?.email}
                </div>
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
              onClick={handleDeleteAccount}
              disabled={deleteLoading}
              className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 transition-colors disabled:opacity-50 shrink-0"
            >
              {deleteLoading ? <Spinner /> : <><Trash2 size={18} /> Excluir Conta</>}
            </button>
          </div>
        </BaseCard>
      </div>
    </div>
  )
}