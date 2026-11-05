interface ProgressPanelProps {
  completed: number
  total: number
  percentage: number
}

export function ProgressPanel({ completed, total, percentage }: ProgressPanelProps) {
  return (
    <section className="progress-panel" aria-label="Daily progress">
      <div className="progress-top">
        <div><strong>{completed} / {total}</strong><span> completed</span></div>
        <span className="percent-pill">{percentage}%</span>
      </div>
      <div className="progress-track"><div className="progress-fill" style={{ width: `${percentage}%` }} /></div>
    </section>
  )
}
