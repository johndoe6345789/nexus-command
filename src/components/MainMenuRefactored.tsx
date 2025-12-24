import { MainMenuLayout } from './templates'
import { MenuGrid } from './organisms'
import { Text } from './atoms'
import { Play, Users, Gear, ChartBar, SignOut } from '@phosphor-icons/react'

interface MainMenuRefactoredProps {
  onNavigate: (screen: string) => void
}

export function MainMenuRefactored({ onNavigate }: MainMenuRefactoredProps) {
  const menuItems = [
    { id: 'singleplayer', label: 'Campaign', icon: Play, description: 'Single player missions' },
    { id: 'multiplayer', label: 'Multiplayer', icon: Users, description: 'Join online battles' },
    { id: 'stats', label: 'Profile', icon: ChartBar, description: 'View your stats' },
    { id: 'settings', label: 'Settings', icon: Gear, description: 'Configure your game' },
    { id: 'exit', label: 'Exit', icon: SignOut, description: 'Close application' },
  ]

  return (
    <MainMenuLayout
      tagline="Next Generation Combat"
      footer={
        <Text
          variant="body2"
          align="center"
          color="text.secondary"
          sx={{ mt: 10 }}
        >
          v2.0.1 • Press any key to continue
        </Text>
      }
    >
      <MenuGrid items={menuItems} onNavigate={onNavigate} />
    </MainMenuLayout>
  )
}
