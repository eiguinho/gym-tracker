'use client'

import { WorkoutTemplate } from '@/types/workout'
import { Dumbbell, Target, Zap } from 'lucide-react'

interface TemplateCardProps {
  template: WorkoutTemplate;
  onClone: (id: string) => void;
  isCloning: boolean;
}

export function TemplateCard({ template, onClone, isCloning }: TemplateCardProps) {
  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-gray-200 bg-white text-left transition-all hover:shadow-lg dark:border-gray-800 dark:bg-gray-950">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 line-clamp-2">
            {template.title}
          </h3>
        </div>

        <div className="mt-3 flex flex-wrap gap-2 text-[11px] font-medium uppercase tracking-wider">
          <span className="inline-flex items-center gap-1 rounded-md bg-indigo-50 px-2 py-1 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400">
            <Zap size={12} /> {template.level}
          </span>
          <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-1 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
            <Target size={12} /> {template.focus}
          </span>
        </div>

        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
          {template.description}
        </p>

        <div className="mt-5 space-y-2">
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-500">
            DIVISÃO DE TREINOS ({template.workouts.length}):
          </p>
          <ul className="space-y-1.5">
            {template.workouts.map((w) => (
              <li key={w._id} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                <Dumbbell size={14} className="text-gray-400 dark:text-gray-600" />
                <span className="truncate">{w.title}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-100 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900/50">
        <button
          onClick={() => onClone(template._id)}
          disabled={isCloning}
          className="flex w-full items-center justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed dark:focus:ring-offset-gray-950"
        >
          {isCloning ? 'Copiando Rotina...' : 'Usar este Treino'}
        </button>
      </div>
    </div>
  )
}