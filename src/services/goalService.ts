import {
  addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, updateDoc,
  type Unsubscribe
} from 'firebase/firestore'
import { db } from '../firebase'
import type { Days, Goal } from '../types'
import { sortGoals } from '../utils/goalUtils'

export const subscribeToGoals = (
  userId: string,
  onGoals: (days: Days) => void,
  onError: (error: Error) => void
): Unsubscribe => {
  const goalsQuery = query(
    collection(db, 'users', userId, 'goals'),
    orderBy('date', 'desc')
  )

  return onSnapshot(goalsQuery, snapshot => {
    const days: Days = {}
    snapshot.forEach(goalDoc => {
      const data = goalDoc.data()
      const date = String(data.date ?? '')
      if (!date) return
      const goal: Goal = {
        id: goalDoc.id,
        text: String(data.text ?? ''),
        completed: Boolean(data.completed),
        createdAt: Number(data.createdAt ?? 0)
      }
      if (!days[date]) days[date] = []
      days[date].push(goal)
    })
    Object.keys(days).forEach(date => {
      days[date] = sortGoals(days[date])
    })
    onGoals(days)
  }, onError)
}

export const addGoalDocument = async (
  userId: string,
  text: string,
  date: string
): Promise<void> => {
  await addDoc(collection(db, 'users', userId, 'goals'), {
    text,
    date,
    completed: false,
    createdAt: Date.now()
  })
}

export const updateGoalCompletion = async (userId: string, goal: Goal): Promise<void> => {
  await updateDoc(doc(db, 'users', userId, 'goals', goal.id), {
    completed: !goal.completed
  })
}

export const deleteGoalDocument = async (userId: string, goalId: string): Promise<void> => {
  await deleteDoc(doc(db, 'users', userId, 'goals', goalId))
}
