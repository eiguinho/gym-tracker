'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { useAuth } from '@/providers/auth-provider'

const navItems = [
  { name: 'Home', href: '/dashboard' },
  { name: 'Meus Treinos', href: '/dashboard/treinos' },
  { name: 'Exercícios', href: '/dashboard/exercicios' },
]

export function DashboardHeader() {
  const pathname = usePathname()
  const { user } = useAuth()

  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        
        <div className="text-lg font-semibold text-foreground">
          GymTracker
        </div>

        <nav className="flex items-center gap-6">
          {navItems.map((item) => {
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive
                    ? 'text-primary'
                    : 'text-muted-foreground'
                }`}
              >
                {item.name}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-4">
          <h1>Olá, {user?.name} 👋</h1>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
