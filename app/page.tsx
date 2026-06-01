'use client'

import { useRouter } from 'next/navigation'
import { MainMenu } from '@/components/MainMenu'
import { getRouteForScreen } from '@/routes'

export default function Home() {
  const router = useRouter()

  const handleNavigate = (screen: string) => {
    if (screen === 'exit') {
      if (confirm('Exit NEXUS COMMAND?')) {
        router.push('/')
      }
      return
    }

    const route = getRouteForScreen(screen)
    if (!route) {
      console.warn(`Invalid screen: ${screen}, defaulting to main`)
      router.push('/')
      return
    }

    router.push(route)
  }

  return (
    <MainMenu onNavigate={handleNavigate} />
  )
}
