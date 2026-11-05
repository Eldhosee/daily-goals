import { CalendarDays, Target, TrendingUp } from 'lucide-react'

interface SummaryCardsProps {
  todayCompleted: number
  todayTotal: number
  weekCompleted: number
  weekTotal: number
  weekPercentage: number
}

export function SummaryCards({ todayCompleted, todayTotal, weekCompleted, weekTotal, weekPercentage }: SummaryCardsProps) {
  return (
    <section className="summary-grid" aria-label="Progress summary">
      <div className="summary-card"><Target /><div><span>Today</span><strong>{todayCompleted} / {todayTotal}</strong></div></div>
      <div className="summary-card"><CalendarDays /><div><span>This Week</span><strong>{weekCompleted} / {weekTotal}</strong></div></div>
      <div className="summary-card"><TrendingUp /><div><span>Completion</span><strong>{weekPercentage}%</strong></div></div>
    </section>
  )
}
