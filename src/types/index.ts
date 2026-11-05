export interface Goal {
  id: string
  text: string
  completed: boolean
  createdAt: number
}

export type Theme = 'light' | 'dark'
export type Days = Record<string, Goal[]>
export type Page = 'today' | 'history'

export interface Progress {
  completed: number
  total: number
  percentage: number
}
