interface GoalMenuProps {
  onDelete: () => void
}

export function GoalMenu({ onDelete }: GoalMenuProps) {
  return <div className="goal-menu"><button onClick={onDelete}>Delete goal</button></div>
}
