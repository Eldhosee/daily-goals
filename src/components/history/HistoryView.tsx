import { CalendarDays, History } from 'lucide-react'
import type { Days } from '../../types'
import { HistoryDateList } from './HistoryDateList'
import { HistoryDetail } from './HistoryDetail'

interface HistoryViewProps {
  days: Days
  dates: string[]
  selectedDate: string
  onSelectDate: (date: string) => void
}

export function HistoryView({ days, dates, selectedDate, onSelectDate }: HistoryViewProps) {
  return (
    <main className="history-card">
      <div className="history-heading">
        <div><div className="date-label">YOUR JOURNEY</div><h1>Goal History</h1><p className="tagline"><span />Every completed step counts.</p></div>
        <History className="history-icon" size={34} />
      </div>
      {dates.length === 0 ? (
        <div className="empty-state history-empty"><CalendarDays size={28} /><strong>No history yet.</strong><span>Your daily goals will appear here.</span></div>
      ) : (
        <div className="history-layout">
          <HistoryDateList dates={dates} selectedDate={selectedDate} goalsByDate={days} onSelectDate={onSelectDate} />
          <HistoryDetail date={selectedDate} goals={days[selectedDate] ?? []} />
        </div>
      )}
    </main>
  )
}
