import { useEffect, useState } from 'react'
import type { User } from 'firebase/auth'
import type { Days, Goal } from '../types'
import { todayKey } from '../utils/dateUtils'
import {
  addGoalDocument, deleteGoalDocument, subscribeToGoals, updateGoalCompletion
} from '../services/goalService'

export function useGoals(user: User | null) {
  const [days, setDays] = useState<Days>({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [adding, setAdding] = useState(false)
  const [busyIds, setBusyIds] = useState<Set<string>>(() => new Set())

  useEffect(() => {
    setError('')
    setDays({})
    if (!user) {
      setLoading(false)
      return
    }

    setLoading(true)
    const unsubscribe = subscribeToGoals(
      user.uid,
      nextDays => {
        setDays(nextDays)
        setLoading(false)
      },
      err => {
        console.error('Firestore subscription failed:', err)
        setError('Could not load your goals. Check your Firestore rules and connection.')
        setLoading(false)
      }
    )
    return unsubscribe
  }, [user])

  const markBusy = (id: string, busy: boolean) => {
    setBusyIds(previous => {
      const next = new Set(previous)
      if (busy) next.add(id)
      else next.delete(id)
      return next
    })
  }

  const addGoal = async (value: string) => {
    const text = value.trim()
    if (!text || !user || adding) return false
    setAdding(true)
    setError('')
    try {
      await addGoalDocument(user.uid, text, todayKey())
      return true
    } catch (err) {
      console.error('Adding goal failed:', err)
      setError('Could not add this goal. Please check your connection and try again.')
      return false
    } finally {
      setAdding(false)
    }
  }

  const toggleGoal = async (goal: Goal) => {
    if (!user || busyIds.has(goal.id)) return
    markBusy(goal.id, true)
    setError('')
    try {
      await updateGoalCompletion(user.uid, goal)
    } catch (err) {
      console.error('Updating goal failed:', err)
      setError('Could not update this goal. Please try again.')
    } finally {
      markBusy(goal.id, false)
    }
  }

  const deleteGoal = async (goal: Goal) => {
    if (!user || busyIds.has(goal.id)) return
    markBusy(goal.id, true)
    setError('')
    try {
      await deleteGoalDocument(user.uid, goal.id)
    } catch (err) {
      console.error('Deleting goal failed:', err)
      setError('Could not delete this goal. Please try again.')
    } finally {
      markBusy(goal.id, false)
    }
  }

  return {
    days,
    loading,
    error,
    clearError: () => setError(''),
    adding,
    busyIds,
    addGoal,
    toggleGoal,
    deleteGoal
  }
}
