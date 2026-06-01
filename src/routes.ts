export const screenRoutes = {
  singleplayer: '/campaign',
  multiplayer: '/multiplayer',
  settings: '/settings',
  stats: '/profile',
  developer: '/developer',
} as const

export function getRouteForScreen(screen: string): string | null {
  return screenRoutes[screen as keyof typeof screenRoutes] ?? null
}
