import { formatDate } from '../../utils/dateUtils'

interface HistoryDateListProps {
  dates: string[]
  selectedDate: string
  goalsByDate: Record<string, { completed: boolean }[]>
  onSelectDate: (date: string) => void
}

export function HistoryDateList({ dates, selectedDate, goalsByDate, onSelectDate }: HistoryDateListProps) {
  return (
    <div className="history-dates">
      {dates.map(date => {
        const goals = goalsByDate[date] ?? []
        const done = goals.filter(goal => goal.completed).length
        return (
          <button key={date} className={`history-date ${selectedDate === date ? 'selected' : ''}`} onClick={() => onSelectDate(date)}>
            <span><strong>{formatDate(date, { weekday: 'short', month: 'short', day: 'numeric' })}</strong><small>{goals.length} goals</small></span>
            <span className="history-count">{done}/{goals.length}</span>
          </button>
        )
      })}
    </div>
  )
}
