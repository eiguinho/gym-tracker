'use client'

import { useState, useEffect } from 'react'
import { Modal } from '@/components/ui/modal'
import { Input } from '@/components/ui/input'
import { WorkoutLog } from '@/types/workout'
import { workoutService } from '@/services/workout-service'
import { CheckCircle, Clock, RotateCcw } from 'lucide-react'

interface CheckInModalProps {
  isOpen: boolean
  log: WorkoutLog | null
  onClose: () => void
  onSuccess: () => void
}

export function CheckInModal({ isOpen, log, onClose, onSuccess }: CheckInModalProps) {
  const [duration, setDuration] = useState<number | ''>('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isOpen && log) {
      setDuration(log.durationMinutes || 60)
    }
  }, [isOpen, log])

  if (!log) return null

  const isCompleted = log.status === 'completed'

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!duration || Number(duration) <= 0) return alert('Insira uma duração válida.')

    setLoading(true)
    try {
      await workoutService.updateLogStatus(log._id, 'completed', Number(duration))
      onSuccess()
    } catch (error) {
      alert('Erro ao salvar check-in.')
    } finally {
      setLoading(false)
    }
  }

  const handleUndo = async () => {
    setLoading(true)
    try {
      await workoutService.updateLogStatus(log._id, 'planned', 0)
      onSuccess()
    } catch (error) {
      alert('Erro ao desmarcar treino.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Check-in de Treino">
      <div className="mb-6 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-100 dark:border-gray-800">
        <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          {isCompleted ? <CheckCircle className="text-green-500" size={20} /> : <Clock className="text-indigo-500" size={20} />}
          {log.workout.title}
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          {isCompleted ? 'Treino já concluído! Quer ajustar o tempo?' : 'Mandou bem! Quanto tempo durou a sessão?'}
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Duração (em minutos)
          </label>
          <Input 
            type="number"
            min="1"
            max="300"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value) || '')}
            required
            placeholder="Ex: 45"
          />
        </div>

        <div className="flex justify-between items-center pt-6 border-t border-gray-100 dark:border-gray-800">
          {isCompleted ? (
            <button 
              type="button" 
              onClick={handleUndo} 
              disabled={loading}
              className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            >
              <RotateCcw size={16} /> Desmarcar
            </button>
          ) : (
            <div />
          )}

          <div className="flex gap-3">
            <button type="button" onClick={onClose} disabled={loading} className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors">
              Cancelar
            </button>
            <button type="submit" disabled={loading} className="flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition-colors">
              <CheckCircle size={16} />
              {isCompleted ? 'Atualizar Tempo' : 'Concluir Treino'}
            </button>
          </div>
        </div>
      </form>
    </Modal>
  )
}