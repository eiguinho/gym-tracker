'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import { workoutService } from '@/services/workout-service'
import { sleepService } from '@/services/sleep-service'
import { Workout, WorkoutLog } from '@/types/workout'
import { SleepLog } from '@/types/sleep'
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns'
import { DragStartEvent, DragEndEvent } from '@dnd-kit/core'
import { getErrorMessage } from '@/utils/error-handler'
import { toast } from 'sonner'

export function useCalendarData() {
  const [dates, setDates] = useState({
    current: new Date(),
    selected: new Date(),
  })

  const [data, setData] = useState({
    workouts: [] as Workout[],
    logs: [] as WorkoutLog[],
    sleepLogs: [] as SleepLog[],
  })
  
  const [status, setStatus] = useState({
    loading: true,
    isUpdating: false,
  })

  const [activeId, setActiveId] = useState<string | null>(null)

  const { monthStart, monthEnd, calendarDays } = useMemo(() => {
    const start = startOfMonth(dates.current)
    const end = endOfMonth(start)
    const days = eachDayOfInterval({ start: startOfWeek(start), end: endOfWeek(end) })
    
    return { monthStart: start, monthEnd: end, calendarDays: days }
  }, [dates.current])

  const fetchLogs = useCallback(async () => {
    const newLogs = await workoutService.getCalendarLogs(monthStart, monthEnd)
    setData(prev => ({ ...prev, logs: newLogs }))
  }, [monthStart, monthEnd])

  const fetchSleep = useCallback(async () => {
    const newSleep = await sleepService.getLogs(monthStart, monthEnd)
    setData(prev => ({ ...prev, sleepLogs: newSleep }))
  }, [monthStart, monthEnd])

  useEffect(() => {
    async function loadAllData() {
      setStatus(prev => ({ ...prev, loading: true }))
      try {
        const [workoutsData, logsData, sleepData] = await Promise.all([
          workoutService.getAll(),
          workoutService.getCalendarLogs(monthStart, monthEnd),
          sleepService.getLogs(monthStart, monthEnd)
        ])
        setData({ workouts: workoutsData, logs: logsData, sleepLogs: sleepData })
      } catch (error) {
        toast.error(getErrorMessage(error, "Erro ao carregar os dados do calendário."))
      } finally {
        setStatus(prev => ({ ...prev, loading: false }))
      }
    }

    loadAllData()
  }, [monthStart, monthEnd])

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string)
  }

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event
    setActiveId(null)

    if (!over || !over.data.current || !active.data.current) return

    const targetDate = over.data.current.date
    const dragType = active.data.current.type

    setStatus(prev => ({ ...prev, isUpdating: true }))
    try {
      if (dragType === 'sidebar-workout') {
        await workoutService.scheduleWorkout(active.data.current.workout._id, targetDate)
      } else if (dragType === 'scheduled-log') {
        await workoutService.moveCalendarLog(active.data.current.log._id, targetDate)
      }
      
      await fetchLogs()
      setDates(prev => ({ ...prev, selected: targetDate }))
      toast.success('Treino reprogramado!')
    } catch (error) {
      toast.error(getErrorMessage(error, 'Erro ao processar requisição'))
    } finally {
      setStatus(prev => ({ ...prev, isUpdating: false }))
    }
  }

  const handleDeleteLog = async (logId: string) => {
    setStatus(prev => ({ ...prev, isUpdating: true }))
    try {
      await workoutService.deleteCalendarLog(logId)
      await fetchLogs()
      toast.success('Treino removido do calendário.')
    } catch (error) {
      toast.error(getErrorMessage(error, 'Erro ao remover o treino.'))
    } finally {
      setStatus(prev => ({ ...prev, isUpdating: false }))
    }
  }

  const handleDeleteSleep = async (sleepLogId: string) => {
    setStatus(prev => ({ ...prev, isUpdating: true }))
    try {
      await sleepService.delete(sleepLogId) 
      await fetchSleep()
      toast.success('Registro de sono removido.')
    } catch (error) {
      toast.error(getErrorMessage(error, 'Erro ao excluir registro de sono.'))
    } finally {
      setStatus(prev => ({ ...prev, isUpdating: false }))
    }
  }

  const handleScheduleWorkout = async (workoutId: string) => {
    setStatus(prev => ({ ...prev, isUpdating: true }))
    try {
      await workoutService.scheduleWorkout(workoutId, dates.selected)
      await fetchLogs()
      toast.success('Treino agendado com sucesso!')
    } catch (error) {
      toast.error(getErrorMessage(error, 'Erro ao agendar treino.'))
    } finally {
      setStatus(prev => ({ ...prev, isUpdating: false }))
    }
  }

  return {
    currentDate: dates.current, 
    setCurrentDate: (d: Date) => setDates(prev => ({ ...prev, current: d })), 
    selectedDate: dates.selected, 
    setSelectedDate: (d: Date) => setDates(prev => ({ ...prev, selected: d })),
    
    workouts: data.workouts, 
    logs: data.logs, 
    sleepLogs: data.sleepLogs, 
    
    loading: status.loading, 
    isUpdating: status.isUpdating, 
    
    monthStart, calendarDays, activeId,
    handleDragStart, handleDragEnd,
    handleDeleteLog, handleDeleteSleep, handleScheduleWorkout,
    fetchLogs, fetchSleep
  }
}