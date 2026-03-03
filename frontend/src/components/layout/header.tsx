'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { useAuth } from '@/providers/auth-provider'
import { Menu, X, Home, Dumbbell, List } from 'lucide-react' 

const navItems = [
  { name: 'Home', href: '/dashboard', icon: Home },
  { name: 'Meus Treinos', href: '/dashboard/workouts', icon: Dumbbell },
  { name: 'Exercícios', href: '/dashboard/exercicios', icon: List },
]

export function DashboardHeader() {
  const pathname = usePathname()
  const { user } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const firstName = user?.name?.split(' ')[0] || ''

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        
        <div className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
          GymTracker
        </div>

        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {item.name}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-3">
          <h1 className="hidden sm:block text-sm font-medium text-muted-foreground">
            Olá, <span className="text-foreground">{firstName}</span> 👋
          </h1>
          <ThemeToggle />

          <button
            className="md:hidden p-2 -mr-2 text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background absolute w-full shadow-lg animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col p-4 space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400'
                      : 'text-muted-foreground hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-foreground'
                  }`}
                >
                  <item.icon size={20} className={isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-muted-foreground'} />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>
      )}
    </header>
  )
}