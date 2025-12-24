import { Screen } from '@/types'

export function handleNavigate(screen: string): Screen | null {
  if (screen === 'exit') {
    if (confirm('Exit NEXUS COMMAND?')) {
      window.close()
    }
    return null
  }
  return screen as Screen
}
