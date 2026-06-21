'use client'

import { useRouter } from 'next/navigation'
import { Settings } from '@/components/Settings'
import { getSettingsTabRoute, SETTINGS_TABS, SettingsTab } from '@/constants'

interface SettingsRouteProps {
  tab?: SettingsTab
}

export function SettingsRoute({ tab = 'graphics' }: SettingsRouteProps) {
  const router = useRouter()
  const activeTab = SETTINGS_TABS.indexOf(tab)

  return (
    <Settings
      activeTab={activeTab}
      onBack={() => router.push('/')}
      onTabChange={(nextTab) => router.push(getSettingsTabRoute(SETTINGS_TABS[nextTab]))}
    />
  )
}
