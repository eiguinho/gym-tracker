'use client'

import { useState } from 'react'
import { useAuth } from '@/providers/auth-provider'
import { PageHeader } from '@/components/ui/page-header'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { BaseCard } from '@/components/ui/base-card'
import { toast } from 'sonner'
import api from '@/lib/api'
import { 
  User, Dumbbell, Flame, Zap, HeartPulse, Trophy, 
  Save, CheckCircle2 
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
  const { user, setUser } = useAuth()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  
  const [name, setName] = useState(user?.name || '')
  const [avatarIcon, setAvatarIcon] = useState(user?.avatarIcon || 'User')

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(false)

    try {
      const response = await api.put('/auth/profile', { name, avatarIcon })
      
      const updatedUser = response.data.user
      setUser(updatedUser)
      localStorage.setItem('@gymtracker:user', JSON.stringify(updatedUser))
      
      toast.success('Perfil atualizado!')
    } catch (error) {
      toast.error('Erro ao atualizar perfil')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-2xl">
        <PageHeader 
          title="Meu Perfil" 
          description="Gerencie suas informações pessoais e aparência" 
        />

        <BaseCard className="mt-8 p-6">
          <form onSubmit={handleSave} className="space-y-6">
            
            <div className="space-y-4">
              <label className="text-sm font-medium text-muted-foreground">Avatar de Perfil</label>
              <div className="flex flex-wrap justify-center gap-4 py-4">
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
                <label className="text-sm font-medium leading-none text-muted-foreground">E-mail (Não editável)</label>
                <div className="flex h-10 w-full rounded-md border border-input bg-muted px-3 py-2 text-sm text-muted-foreground opacity-70 cursor-not-allowed">
                  {user?.email}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-border pt-6">
              <p className={`text-sm transition-opacity ${success ? 'opacity-100 text-green-600' : 'opacity-0'}`}>
                ✅ Perfil atualizado com sucesso!
              </p>
              
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
      </div>
    </div>
  )
}