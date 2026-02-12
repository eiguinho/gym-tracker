import { Flame } from 'lucide-react'

export function OverviewHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Visão Geral
        </h1>
        <p className="text-muted-foreground mt-1">
          Acompanhe sua evolução e mantenha o foco nos objetivos.
        </p>
      </div>

      <div className="flex items-center gap-2 rounded-lg bg-card border border-border p-2 shadow-sm">
        <div className="bg-primary/10 p-2 rounded-md text-primary">
          <Flame size={20} />
        </div>
        <div className="pr-2">
          <p className="text-xs text-muted-foreground font-medium uppercase">
            Sequência
          </p>
          <p className="text-sm font-bold">
            12 Dias seguidos 🔥
          </p>
        </div>
      </div>
    </div>
  )
}
