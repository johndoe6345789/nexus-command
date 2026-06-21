export interface SettingsProps {
  onBack: () => void
  activeTab?: number
  onTabChange?: (tab: number) => void
}
