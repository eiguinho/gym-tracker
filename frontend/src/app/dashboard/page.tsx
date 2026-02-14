'use client'

import { useAuth } from '@/providers/auth-provider'
import { PageHeader } from '@/components/ui/page-header'
import { StatsGrid } from '@/components/dashboard/stats'
import { ActivityChart } from '@/components/dashboard/activity-chart'
import { MuscleChart } from '@/components/dashboard/muscle-chart'
import Link from 'next/link'

export default function DashboardPage() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-background text-foreground pb-10">
      <main className="mx-auto max-w-7xl px-6 pt-8 space-y-8">
        
        <PageHeader 
          title="Visão Geral" 
          description={`Bem-vindo de volta, ${user?.name || 'Atleta'} 👋. Aqui está o resumo do seu progresso.`}
          action={
            <Link 
              href="/dashboard/workouts/new" 
              className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
            >
              Começar Treino
            </Link>
          }
        />

        <StatsGrid />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
          <ActivityChart />
          <MuscleChart />
        </div>
      </main>
    </div>
  )
}