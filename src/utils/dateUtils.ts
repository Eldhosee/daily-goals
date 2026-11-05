export const todayKey = (): string => {
  const date = new Date()
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

export const formatDate = (
  key: string,
  options: Intl.DateTimeFormatOptions = {
    weekday: 'long', month: 'short', day: 'numeric', year: 'numeric'
  }
): string => new Date(`${key}T12:00:00`).toLocaleDateString(undefined, options)

export const getWeekKeys = (date = new Date()): string[] => {
  const weekStart = new Date(date)
  weekStart.setDate(weekStart.getDate() - ((weekStart.getDay() + 6) % 7))
  return Array.from({ length: 7 }, (_, index) => {
    const day = new Date(weekStart)
    day.setDate(weekStart.getDate() + index)
    return `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, '0')}-${String(day.getDate()).padStart(2, '0')}`
  })
}
