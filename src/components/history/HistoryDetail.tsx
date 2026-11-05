import { Check } from 'lucide-react'
import type { Goal } from '../../types'
import { formatDate } from '../../utils/dateUtils'
import { sortGoals } from '../../utils/goalUtils'

interface HistoryDetailProps {
  date: string
  goals: Goal[]
}

export function HistoryDetail({ date, goals }: HistoryDetailProps) {
  const orderedGoals = sortGoals(goals)
  const completed = goals.filter(goal => goal.completed).length
  return (
    <div className="history-detail">
      <div className="history-detail-head"><h2>{formatDate(date, { weekday: 'long', month: 'long', day: 'numeric' })}</h2><span>{completed} completed</span></div>
      {orderedGoals.map(goal => (
        <div className={`goal-row history-goal ${goal.completed ? 'is-done' : ''}`} key={goal.id}>
          <span className={`history-check ${goal.completed ? 'checked' : ''}`}>{goal.completed && <Check size={14} />}</span>
          <span className="goal-text">{goal.text}</span>
        </div>
      ))}
      {goals.length === 0 && <p className="muted">No goals were recorded for this day.</p>}
    </div>
  )
}
