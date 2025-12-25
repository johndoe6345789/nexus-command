import { MenuItem } from '@/types'
import { PlayArrow, Group, BarChart, Settings, Code, ExitToApp } from '@mui/icons-material'

export const menuItems: MenuItem[] = [
  { id: 'singleplayer', label: 'Campaign', icon: PlayArrow, description: 'Single player missions' },
  { id: 'multiplayer', label: 'Multiplayer', icon: Group, description: 'Join online battles' },
  { id: 'stats', label: 'Profile', icon: BarChart, description: 'View your stats' },
  { id: 'settings', label: 'Settings', icon: Settings, description: 'Configure your game' },
  { id: 'developer', label: 'Developer', icon: Code, description: 'Developer tools' },
  { id: 'exit', label: 'Exit', icon: ExitToApp, description: 'Close application' },
]
