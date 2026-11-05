import { Check, MoreVertical } from 'lucide-react'
import type { Goal } from '../../types'
import { GoalMenu } from './GoalMenu'

interface GoalItemProps {
  goal: Goal
  busy: boolean
  menuOpen: boolean
  onToggle: (goal: Goal) => void
  onMenuToggle: (goalId: string) => void
  onDelete: (goal: Goal) => void
}

export function GoalItem({ goal, busy, menuOpen, onToggle, onMenuToggle, onDelete }: GoalItemProps) {
  return (
    <div className={`goal-row ${goal.completed ? 'is-done' : ''}`} key={goal.id}>
      <button className="check-button" disabled={busy} onClick={() => onToggle(goal)} aria-label={goal.completed ? `Mark ${goal.text} incomplete` : `Complete ${goal.text}`}>
        {goal.completed ? <Check size={17} strokeWidth={3} /> : <span />}
      </button>
      <span className="goal-text">{goal.text}</span>
      <div className="goal-menu-wrap">
        <button className="more-button" disabled={busy} aria-label={`Options for ${goal.text}`} onClick={() => onMenuToggle(goal.id)}><MoreVertical size={19} /></button>
        {menuOpen && <GoalMenu onDelete={() => onDelete(goal)} />}
      </div>
    </div>
  )
}
