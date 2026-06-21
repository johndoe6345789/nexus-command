import { notFound } from 'next/navigation'
import { isSettingsTab, SETTINGS_TABS } from '@/constants'
import { SettingsRoute } from '../SettingsRoute'

export function generateStaticParams() {
  return SETTINGS_TABS.map((tab) => ({ tab }))
}

export default async function SettingsTabPage({ params }: { params: Promise<{ tab: string }> }) {
  const { tab } = await params

  if (!isSettingsTab(tab)) {
    notFound()
  }

  return <SettingsRoute tab={tab} />
}
