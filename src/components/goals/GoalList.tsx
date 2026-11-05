import type { Goal } from '../../types'
import { GoalItem } from './GoalItem'
import { Target } from 'lucide-react'

interface GoalListProps {
  goals: Goal[]
  busyIds: Set<string>
  menuFor: string | null
  onMenuChange: (id: string | null) => void
  onToggle: (goal: Goal) => void
  onDelete: (goal: Goal) => void
}

export function GoalList({ goals, busyIds, menuFor, onMenuChange, onToggle, onDelete }: GoalListProps) {
  return (
    <section className="goal-list" aria-label="Today's goals">
      {goals.length === 0 ? (
        <div className="empty-state"><Target size={27} /><strong>A fresh page awaits.</strong><span>Add one small goal to get started.</span></div>
      ) : goals.map(goal => (
        <GoalItem
          key={goal.id}
          goal={goal}
          busy={busyIds.has(goal.id)}
          menuOpen={menuFor === goal.id}
          onToggle={onToggle}
          onMenuToggle={id => onMenuChange(menuFor === id ? null : id)}
          onDelete={onDelete}
        />
      ))}
    </section>
  )
}
