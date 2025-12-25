export type AlertType = 'info' | 'success' | 'warning' | 'error' | 'achievement'

export interface Alert {
  id: string
  type: AlertType
  title: string
  message: string
  timestamp: number
  read: boolean
  icon?: string
  action?: {
    label: string
    onClick: () => void
  }
}
