export const SETTINGS_TABS = ['graphics', 'audio', 'controls', 'profile'] as const

export type SettingsTab = (typeof SETTINGS_TABS)[number]

export function isSettingsTab(tab: string): tab is SettingsTab {
  return SETTINGS_TABS.includes(tab as SettingsTab)
}

export function getSettingsTabRoute(tab: SettingsTab): string {
  return `/settings/${tab}`
}
