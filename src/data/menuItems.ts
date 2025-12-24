import { MenuItem } from '@/types'
import { Play, Users, Gear, ChartBar, Code, SignOut } from '@phosphor-icons/react'

export const menuItems: MenuItem[] = [
  { id: 'singleplayer', label: 'Campaign', icon: Play, description: 'Single player missions' },
  { id: 'multiplayer', label: 'Multiplayer', icon: Users, description: 'Join online battles' },
  { id: 'stats', label: 'Profile', icon: ChartBar, description: 'View your stats' },
  { id: 'settings', label: 'Settings', icon: Gear, description: 'Configure your game' },
  { id: 'developer', label: 'Developer', icon: Code, description: 'Developer tools' },
  { id: 'exit', label: 'Exit', icon: SignOut, description: 'Close application' },
]
