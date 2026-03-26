'use client'

import { useState, useEffect } from 'react'
import { Modal } from '@/components/ui/modal'
import { Input } from '@/components/ui/input'
import { SleepLog } from '@/types/sleep'
import { sleepService } from '@/services/sleep-service'
import { Frown, BatteryLow, Meh, Smile, Zap, Moon, Save } from 'lucide-react'
import { toast } from 'sonner'
import { format } from 'date-fns'

interface SleepModalProps {
  isOpen: boolean
  day: Date | null
  existingLog: SleepLog | undefined
  isNightAlreadyRegistered?: boolean
  onClose: () => void
  onSuccess: () => void
}

const QUALITY_OPTIONS = [
  { value: 1, label: 'Péssimo', icon: Frown, color: 'text-red-500' },
  { value: 2, label: 'Cansado', icon: BatteryLow, color: 'text-orange-400' },
  { value: 3, label: 'Normal', icon: Meh, color: 'text-yellow-500' },
  { value: 4, label: 'Bem', icon: Smile, color: 'text-green-500' },
  { value: 5, label: 'Perfeito', icon: Zap, color: 'text-blue-500' },
]

export function SleepModal({ 
  isOpen, 
  day, 
  existingLog, 
  isNightAlreadyRegistered, 
  onClose, 
  onSuccess 
}: SleepModalProps) {
  const [bedTime, setBedTime] = useState('23:00')
  const [wakeTime, setWakeTime] = useState('07:00')
  const [qualityScore, setQualityScore] = useState(3)
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isOpen) {
      if (existingLog) {
        setBedTime(existingLog.bedTime)
        setWakeTime(existingLog.wakeTime)
        setQualityScore(existingLog.qualityScore)
        setNotes(existingLog.notes || '')
      } else {
        setBedTime('23:00')
        setWakeTime('07:00')
        setQualityScore(3)
        setNotes('')
      }
    }
  }, [isOpen, existingLog])

  if (!day) return null

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await sleepService.saveLog({
        date: day,
        bedTime,
        wakeTime,
        qualityScore,
        notes
      })
      onSuccess()
      toast.success(existingLog ? 'Registro atualizado!' : 'Dados de sono registrados!')
    } catch (error) {
      toast.error('Erro ao salvar registro de sono.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={existingLog ? "Editar Sono" : "Registro de Sono"}>
      <div className="mb-6 bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg border border-indigo-100 dark:border-indigo-800">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-indigo-900 dark:text-indigo-100 flex items-center gap-2">
              <Moon className="text-indigo-500 fill-current" size={20} />
              {format(day, "dd/MM/yyyy")}
            </h3>
            <p className="text-sm text-indigo-700 dark:text-indigo-300 mt-1">
              {isNightAlreadyRegistered 
                ? "Você já registrou o sono desta noite. Deseja alterar os dados?" 
                : "Como foi sua noite de sono? (Referente à noite anterior)"}
            </p>
          </div>
          {isNightAlreadyRegistered && (
            <span className="bg-yellow-100 text-yellow-800 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border border-yellow-200 animate-pulse">
              Já registrado
            </span>
          )}
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Hora de Deitar
            </label>
            <Input 
              type="time"
              value={bedTime}
              onChange={(e) => setBedTime(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Hora de Acordar
            </label>
            <Input 
              type="time"
              value={wakeTime}
              onChange={(e) => setWakeTime(e.target.value)}
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Qualidade do Sono
          </label>
          <div className="flex justify-between gap-2">
            {QUALITY_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setQualityScore(option.value)}
                className={`
                  flex-1 flex flex-col items-center p-3 rounded-xl border transition-all
                  ${qualityScore === option.value 
                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 dark:border-indigo-400 ring-1 ring-indigo-500' 
                    : 'border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                  }
                `}
              >
                <option.icon 
                  className={`mb-2 ${qualityScore === option.value ? option.color : 'text-gray-400'}`} 
                  size={24} 
                />
                <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                  {option.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-6 border-t border-gray-100 dark:border-gray-800">
          <button type="button" onClick={onClose} disabled={loading} className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors">
            Cancelar
          </button>
          <button type="submit" disabled={loading} className="flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition-colors">
            <Save size={16} />
            {existingLog ? "Atualizar Registro" : "Salvar Registro"}
          </button>
        </div>
      </form>
    </Modal>
  )
}