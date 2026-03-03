'use client'

import { useState, useEffect } from 'react'
import { workoutService } from '@/services/workout-service'
import { sleepService } from '@/services/sleep-service'
import { Workout, WorkoutLog } from '@/types/workout'
import { SleepLog } from '@/types/sleep'
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns'
import { DragStartEvent, DragEndEvent } from '@dnd-kit/core'
import { toast } from 'sonner'

export function useCalendarData() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())

  const [workouts, setWorkouts] = useState<Workout[]>([])
  const [logs, setLogs] = useState<WorkoutLog[]>([])
  const [sleepLogs, setSleepLogs] = useState<SleepLog[]>([])
  
  const [loading, setLoading] = useState(true)
  const [isUpdating, setIsUpdating] = useState(false)
  const [activeId, setActiveId] = useState<string | null>(null)

  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(monthStart)
  const calendarDays = eachDayOfInterval({ 
    start: startOfWeek(monthStart), 
    end: endOfWeek(monthEnd) 
  })

  const fetchLogs = async () => setLogs(await workoutService.getCalendarLogs(monthStart, monthEnd))
  const fetchSleep = async () => setSleepLogs(await sleepService.getLogs(monthStart, monthEnd))

  const loadData = async () => {
    setLoading(true)
    try {
      const [workoutsData, logsData, sleepData] = await Promise.all([
        workoutService.getAll(),
        workoutService.getCalendarLogs(monthStart, monthEnd),
        sleepService.getLogs(monthStart, monthEnd)
      ])
      setWorkouts(workoutsData)
      setLogs(logsData)
      setSleepLogs(sleepData)
    } catch (error) {
      console.error("Erro ao carregar dados", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadData() }, [currentDate])

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string)
  }

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event
    setActiveId(null)

    if (!over || !over.data.current || !active.data.current) return

    const targetDate = over.data.current.date
    const dragType = active.data.current.type

    setIsUpdating(true)
    try {
      if (dragType === 'sidebar-workout') {
        await workoutService.scheduleWorkout(active.data.current.workout._id, targetDate)
      } else if (dragType === 'scheduled-log') {
        await workoutService.moveCalendarLog(active.data.current.log._id, targetDate)
      }
      await fetchLogs()
      setSelectedDate(targetDate)
      toast.success('Treino reprogramado!')
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Erro ao processar requisição')
    } finally {
      setIsUpdating(false)
    }
  }

  const handleDeleteLog = async (logId: string) => {
    if (!confirm('Tem certeza que deseja remover este treino?')) return;
    setIsUpdating(true)
    try {
      await workoutService.deleteCalendarLog(logId)
      await fetchLogs()
      toast.success('Treino removido do calendário.')
    } catch (error) {
      toast.error('Erro ao remover o treino.')
    } finally {
      setIsUpdating(false)
    }
  }

  const handleDeleteSleep = async (sleepLogId: string) => {
    if (!confirm('Tem certeza que deseja apagar o registro de sono?')) return;
    setIsUpdating(true)
    try {
      await sleepService.delete(sleepLogId) 
      await fetchSleep()
      toast.success('Registro de sono removido.')
    } catch (error) {
      toast.error('Erro ao excluir registro de sono.')
    } finally {
      setIsUpdating(false)
    }
  }

  const handleScheduleWorkout = async (workoutId: string) => {
    setIsUpdating(true)
    try {
      await workoutService.scheduleWorkout(workoutId, selectedDate)
      await fetchLogs()
      toast.success('Treino agendado com sucesso!')
    } catch (error: any) {
      toast.error('Erro ao agendar treino.')
    } finally {
      setIsUpdating(false)
    }
  }

  return {
    currentDate, setCurrentDate, selectedDate, setSelectedDate,
    workouts, logs, sleepLogs, loading, isUpdating, monthStart, calendarDays,
    handleDragStart, handleDragEnd, activeId,
    handleDeleteLog, handleDeleteSleep, handleScheduleWorkout,
    fetchLogs, fetchSleep
  }
}