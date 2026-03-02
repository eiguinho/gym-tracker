'use client'

import { useState, useEffect } from 'react'
import { Modal } from '@/components/ui/modal'
import { Input } from '@/components/ui/input'
import { SleepLog } from '@/types/sleep'
import { sleepService } from '@/services/sleep-service'
import { Moon, Save } from 'lucide-react'
import { format } from 'date-fns'

interface SleepModalProps {
  isOpen: boolean
  day: Date | null
  existingLog: SleepLog | undefined
  onClose: () => void
  onSuccess: () => void
}

const QUALITY_OPTIONS = [
  { value: 1, label: 'Péssimo', emoji: '😫' },
  { value: 2, label: 'Cansado', emoji: '🥱' },
  { value: 3, label: 'Normal', emoji: '😐' },
  { value: 4, label: 'Bem', emoji: '😌' },
  { value: 5, label: 'Revigorado', emoji: '🤩' },
]

export function SleepModal({ isOpen, day, existingLog, onClose, onSuccess }: SleepModalProps) {
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
    } catch (error) {
      alert('Erro ao salvar registro de sono.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Registro de Sono">
      <div className="mb-6 bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg border border-indigo-100 dark:border-indigo-800">
        <h3 className="font-semibold text-indigo-900 dark:text-indigo-100 flex items-center gap-2">
          <Moon className="text-indigo-500 fill-current" size={20} />
          {format(day, "dd/MM/yyyy")}
        </h3>
        <p className="text-sm text-indigo-700 dark:text-indigo-300 mt-1">
          Como foi a sua noite de sono?
        </p>
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
                <span className="text-2xl mb-1">{option.emoji}</span>
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
            Salvar Registro
          </button>
        </div>
      </form>
    </Modal>
  )
}