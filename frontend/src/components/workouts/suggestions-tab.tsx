'use client'

import { useEffect, useState } from 'react'
import { workoutService } from '@/services/workout-service'
import { WorkoutTemplate } from '@/types/workout'
import { TemplateCard } from './template-card'
import { Spinner } from '@/components/ui/spinner'
import { EmptyState } from '@/components/ui/empty-state'
import { toast } from 'sonner'
import { getErrorMessage } from '@/utils/error-handler'

interface SuggestionsTabProps {
  onClonedSuccess: () => void;
}

export function SuggestionsTab({ onClonedSuccess }: SuggestionsTabProps) {
  const [templates, setTemplates] = useState<WorkoutTemplate[]>([])
  const [loading, setLoading] = useState(true)
  const [cloningId, setCloningId] = useState<string | null>(null)

  useEffect(() => {
    async function loadTemplates() {
      try {
        const data = await workoutService.getTemplates()
        setTemplates(data)
      } catch (error) {
        toast.error(getErrorMessage(error, 'Erro ao carregar sugestões.'))
      } finally {
        setLoading(false)
      }
    }
    loadTemplates()
  }, [])

  async function handleClone(id: string) {
    setCloningId(id)
    try {
      const response = await workoutService.cloneTemplate(id)
      toast.success(response.message)
      onClonedSuccess()
    } catch (error) {
      toast.error(getErrorMessage(error, 'Erro ao copiar a rotina.'))
    } finally {
      setCloningId(null)
    }
  }

  if (loading) return <Spinner />

  if (templates.length === 0) {
    return (
      <EmptyState 
        title="Nenhuma sugestão no momento"
        description="Termine de configurar seu perfil para receber treinos."
      />
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {templates.map(template => (
        <TemplateCard 
          key={template._id} 
          template={template} 
          onClone={handleClone}
          isCloning={cloningId === template._id}
        />
      ))}
    </div>
  )
}