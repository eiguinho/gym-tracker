'use client'

import { DashboardHeader } from '@/components/layout/header'
import { OverviewHeader } from '@/components/dashboard/overview-header'
import { StatsGrid } from '@/components/dashboard/stats'
import { ActivityChart } from '@/components/dashboard/activity-chart'
import { MuscleChart } from '@/components/dashboard/muscle-chart'

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background text-foreground pb-10">
      <DashboardHeader />

      <main className="mx-auto max-w-7xl px-6 pt-8 space-y-6">
        <OverviewHeader />

        <StatsGrid />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
          <ActivityChart />
          <MuscleChart />
        </div>
      </main>
    </div>
  )
}