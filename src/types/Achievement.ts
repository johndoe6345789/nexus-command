export type AchievementRarity = 'common' | 'rare' | 'epic' | 'legendary'

export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  rarity: AchievementRarity
  unlockedAt?: number
  progress?: number
  maxProgress?: number
  hidden?: boolean
  reward?: string
}
