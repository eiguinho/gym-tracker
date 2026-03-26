'use client'

import { SelectHTMLAttributes } from 'react'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  options: { value: string; label: string }[] | string[]
}

export function Select({ label, error, className = '', options, ...props }: SelectProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      
      <div className="relative">
        <select
          className={`
            block w-full rounded-lg border px-3 py-2.5 
            text-gray-900 bg-white
            focus:ring-2 focus:ring-inset focus:ring-indigo-600 
            dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:focus:ring-indigo-500
            ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'}
            ${className}
          `}
          {...props}
        >
          <option value="" disabled>Selecione uma opção</option>
          {options.map((opt, idx) => {
            const value = typeof opt === 'string' ? opt : opt.value;
            const text = typeof opt === 'string' ? opt : opt.label;
            return <option key={idx} value={value}>{text}</option>;
          })}
        </select>
      </div>

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  )
}