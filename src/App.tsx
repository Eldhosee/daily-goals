import { useEffect, useMemo, useState } from 'react'
import { Footer } from './components/common/Footer'
import { Header } from './components/common/Header'
import { HistoryView } from './components/history/HistoryView'
import { LoginPage } from './components/auth/LoginPage'
import { AddGoalForm } from './components/goals/AddGoalForm'
import { GoalList } from './components/goals/GoalList'
import { ProgressPanel } from './components/goals/ProgressPanel'
import { SummaryCards } from './components/dashboard/SummaryCards'
import { useAuth } from './hooks/useAuth'
import { useGoals } from './hooks/useGoals'
import { useTheme } from './hooks/useTheme'
import { formatDate, getWeekKeys, todayKey } from './utils/dateUtils'
import { getProgress, sortGoals } from './utils/goalUtils'
import type { Page } from './types/index'

function App() {
  const { user, loading: authLoading, error: authError, login, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const {
    days, loading: dataLoading, error: goalsError, clearError, adding,
    addGoal, toggleGoal, deleteGoal, busyIds
  } = useGoals(user)
  const [page, setPage] = useState<Page>('today')
  const [selectedDate, setSelectedDate] = useState(todayKey())
  const [menuFor, setMenuFor] = useState<string | null>(null)

  const today = todayKey()
  const goals = sortGoals(days[today] ?? [])
  const todayProgress = getProgress(goals)
  const dates = useMemo(
    () => Object.keys(days).filter(date => (days[date] ?? []).length).sort((a, b) => b.localeCompare(a)),
    [days]
  )

  useEffect(() => {
    setSelectedDate(today)
  }, [today])

  useEffect(() => {
    if (page === 'history' && !days[selectedDate]?.length && dates.length) {
      setSelectedDate(dates[0])
    }
  }, [page, dates, selectedDate, days])

  const weekGoals = getWeekKeys().flatMap(date => days[date] ?? [])
  const weekProgress = getProgress(weekGoals)
  const error = authError || goalsError

  if (authLoading) {
    return <div className={`app ${theme}`}><div className="auth-loading">Loading your account…</div></div>
  }

  if (!user) {
    return (
      <LoginPage
        theme={theme}
        error={authError || goalsError}
        onToggleTheme={toggleTheme}
        onLogin={login}
      />
    )
  }

  return (
    <div className={`app ${theme}`}>
      <div className="page-shell">
        <Header
          user={user}
          page={page}
          theme={theme}
          onPageChange={setPage}
          onToggleTheme={toggleTheme}
          onLogout={logout}
        />
        {error && <div className="error-banner" role="alert">{error}</div>}
        {dataLoading && <div className="sync-note">Syncing your goals…</div>}

        {page === 'today' ? (
          <>
            <main className="main-card">
              <div className="hero">
                <div className="date-label">{formatDate(today).toUpperCase()}</div>
                <h1>Today’s Goals</h1>
                <p className="tagline"><span />A little progress every day.</p>
                <img className="hero-mountains" src="/mountains.svg" alt="" />
              </div>
              <ProgressPanel completed={todayProgress.completed} total={todayProgress.total} percentage={todayProgress.percentage} />
              <GoalList
                goals={goals}
                busyIds={busyIds}
                menuFor={menuFor}
                onMenuChange={setMenuFor}
                onToggle={toggleGoal}
                onDelete={goal => {
                  setMenuFor(null)
                  clearError()
                  void deleteGoal(goal)
                }}
              />
              <AddGoalForm adding={adding} onAdd={addGoal} />
            </main>
            <SummaryCards
              todayCompleted={todayProgress.completed}
              todayTotal={todayProgress.total}
              weekCompleted={weekProgress.completed}
              weekTotal={weekProgress.total}
              weekPercentage={weekProgress.percentage}
            />
          </>
        ) : (
          <HistoryView
            days={days}
            dates={dates}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
          />
        )}

        <Footer />
        {menuFor && <button className="menu-dismiss" aria-label="Close menu" onClick={() => setMenuFor(null)} />}
      </div>
    </div>
  )
}

export default App
