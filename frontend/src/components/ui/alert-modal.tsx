'use client'

import { Modal } from './modal'
import { AlertTriangle } from 'lucide-react'
import { Spinner } from './spinner'

interface AlertModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  description: string
  confirmText?: string
  cancelText?: string
  loading?: boolean
}

export function AlertModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  description, 
  confirmText = "Confirmar", 
  cancelText = "Cancelar",
  loading = false
}: AlertModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Atenção">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-full text-red-600 dark:text-red-500">
          <AlertTriangle size={32} />
        </div>
        
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            {title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            {description}
          </p>
        </div>
      </div>

      <div className="flex gap-3 justify-center mt-8">
        <button 
          onClick={onClose} 
          disabled={loading}
          className="rounded-lg px-6 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
        >
          {cancelText}
        </button>
        <button 
          onClick={onConfirm}
          disabled={loading}
          className="flex items-center gap-2 rounded-lg bg-red-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-red-700 transition-colors disabled:opacity-50"
        >
          {loading ? <Spinner /> : confirmText}
        </button>
      </div>
    </Modal>
  )
}