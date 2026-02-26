'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/providers/auth-provider'
import { PageHeader } from '@/components/ui/page-header'
import { StatsGrid } from '@/components/dashboard/stats'
import { ActivityChart } from '@/components/dashboard/activity-chart'
import { MuscleChart } from '@/components/dashboard/muscle-chart'
import { Spinner } from '@/components/ui/spinner'
import { workoutService } from '@/services/workout-service'
import Link from 'next/link'

export default function DashboardPage() {
  const { user } = useAuth()
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        const data = await workoutService.getDashboardStats()
        setStats(data)
      } catch (error) {
        console.error("Erro ao carregar dashboard:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground pb-10">
      <main className="mx-auto max-w-7xl px-6 pt-8 space-y-8">
        
        <PageHeader 
          title="Visão Geral" 
          description={`Bem-vindo de volta, ${user?.name || 'Atleta'} 👋. Aqui está o resumo do seu progresso.`}
          action={
            <Link 
              href="/dashboard/workouts" 
              className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
            >
              Meus Treinos
            </Link>
          }
        />

        {loading ? (
          <div className="flex justify-center py-20"><Spinner /></div>
        ) : (
          <>
            <StatsGrid summary={stats?.summary} />

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
              <ActivityChart data={stats?.chartData} />
              
              <MuscleChart />
            </div>
          </>
        )}
      </main>
    </div>
  )
}