'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { useAuth } from '@/providers/auth-provider'
import { 
  Menu, X, Home, Dumbbell, List, 
  LogOut, UserCircle, ChevronDown,
  User, Flame, Zap, HeartPulse, Trophy 
} from 'lucide-react' 

const navItems = [
  { name: 'Home', href: '/dashboard', icon: Home },
  { name: 'Meus Treinos', href: '/dashboard/workouts', icon: Dumbbell },
  { name: 'Exercícios', href: '/dashboard/exercises', icon: List },
]

const ICONS = {
  User,
  Dumbbell,
  Flame,
  Zap,
  HeartPulse,
  Trophy,
}

export function DashboardHeader() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, signOut } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  const firstName = user?.name?.split(' ')[0] || ''
  
  const UserIcon = ICONS[user?.avatarIcon as keyof typeof ICONS] || User

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

          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-1 p-1 rounded-full hover:bg-muted transition-colors border border-transparent hover:border-border"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                <UserIcon size={18} />
              </div>
              <ChevronDown size={14} className={`text-muted-foreground transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
            </button>

            {isProfileOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setIsProfileOpen(false)} />
                <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-xl border border-border bg-background p-1 shadow-xl animate-in fade-in zoom-in-95 duration-100 z-20">
                  <Link
                    href="/dashboard/profile"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                  >
                    <UserCircle size={16} /> Meu Perfil
                  </Link>
                  <div className="my-1 border-t border-border" />
                  <button
                    onClick={() => {
                      setIsProfileOpen(false)
                      signOut()
                    }}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    <LogOut size={16} /> Sair
                  </button>
                </div>
              </>
            )}
          </div>

          <button
            className="md:hidden p-2 -mr-2 text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
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
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
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