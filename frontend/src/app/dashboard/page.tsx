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
import { DashboardStats } from '@/types/dashboard'
import { InsightCard } from '@/components/ui/insight-card'

export default function DashboardPage() {
  const { user } = useAuth()
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchStats() {
      try {
        setError(null)
        const data = await workoutService.getDashboardStats()
        setStats(data)
      } catch (error) {
        console.error("Erro ao carregar dashboard:", error)
        setError("Não foi possível carregar seus dados no momento.")
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  const renderContent = () => {
    if (loading) return <div className="flex justify-center py-20"><Spinner /></div>
    if (error) return <div className="flex justify-center py-10 text-red-500 font-medium">{error}</div>
    if (!stats) return null;

    return (
      <div className="space-y-8">
        <StatsGrid summary={stats.summary} sleepData={stats.sleepData} />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
          <ActivityChart data={stats.chartData} />
          <MuscleChart data={stats.muscleData} />
        </div>

        {stats.insights && stats.insights.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground/80 ml-1">
              Análise de Performance
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {stats.insights.map((item, index) => (
                <InsightCard 
                  key={index}
                  type={item.type}
                  message={item.message}
                  icon={item.icon}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

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

        {renderContent()}

      </main>
    </div>
  )
}