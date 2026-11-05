import type { Goal, Progress } from '../types'

export const sortGoals = (items: Goal[]): Goal[] =>
  [...items].sort((a, b) => {
    if (a.completed !== b.completed) return Number(a.completed) - Number(b.completed)
    return a.completed ? a.createdAt - b.createdAt : b.createdAt - a.createdAt
  })

export const getProgress = (goals: Goal[]): Progress => {
  const completed = goals.filter(goal => goal.completed).length
  return {
    completed,
    total: goals.length,
    percentage: goals.length ? Math.round(completed / goals.length * 100) : 0
  }
}
