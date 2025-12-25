import { Screen } from '@/types'

const VALID_SCREENS: ReadonlySet<string> = new Set([
  'main',
  'singleplayer', 
  'multiplayer',
  'settings',
  'stats',
  'developer',
  'exit'
])

function isValidScreen(screen: string): screen is Screen {
  return VALID_SCREENS.has(screen)
}

export function handleNavigate(screen: string): Screen | null {
  if (screen === 'exit') {
    if (confirm('Exit NEXUS COMMAND?')) {
      // Instead of window.close() which doesn't work reliably,
      // return null to signal the app should handle exit
      // (e.g., navigate to main menu or show goodbye screen)
      return 'main'
    }
    return null
  }
  
  if (!isValidScreen(screen)) {
    console.warn(`Invalid screen: ${screen}, defaulting to main`)
    return 'main'
  }
  
  return screen
}
