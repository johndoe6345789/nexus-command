import { Alert, Achievement, AlertType } from '@/types'

// Stub storage for alerts and achievements (removed database dependency)
const alertsStore: Alert[] = []
const achievementsStore: Achievement[] = []

// Helper functions for testing
export function _clearStores(): void {
  alertsStore.length = 0
  achievementsStore.length = 0
}

export function _addAchievementToStore(achievement: Achievement): void {
  achievementsStore.push(achievement)
}

export function _getAchievementsStore(): Achievement[] {
  return achievementsStore
}

export function _getAlertsStore(): Alert[] {
  return alertsStore
}

export async function addAlert(
  type: AlertType,
  title: string,
  message: string,
  action?: { label: string; onClick: () => void }
): Promise<void> {
  const newAlert: Alert = {
    id: `alert-${Date.now()}-${Math.random()}`,
    type,
    title,
    message,
    timestamp: Date.now(),
    read: false,
    action,
  }

  alertsStore.push(newAlert)
  console.log('Alert added:', newAlert)
}

export async function unlockAchievement(achievementId: string): Promise<void> {
  const achievement = achievementsStore.find(a => a.id === achievementId)
  
  if (achievement && !achievement.unlockedAt) {
    achievement.unlockedAt = Date.now()
    
    await addAlert(
      'achievement',
      'Achievement Unlocked!',
      `${achievement.name}: ${achievement.description}`
    )
  }
}

export async function updateAchievementProgress(
  achievementId: string,
  progress: number
): Promise<void> {
  const achievement = achievementsStore.find(a => a.id === achievementId)
  
  if (achievement) {
    achievement.progress = Math.min(progress, achievement.maxProgress ?? 1)
    
    if (achievement.progress === achievement.maxProgress && !achievement.unlockedAt) {
      await unlockAchievement(achievementId)
    }
  }
}

export async function incrementAchievementProgress(
  achievementId: string,
  amount: number = 1
): Promise<void> {
  const achievement = achievementsStore.find(a => a.id === achievementId)
  
  if (achievement) {
    const newProgress = (achievement.progress ?? 0) + amount
    await updateAchievementProgress(achievementId, newProgress)
  }
}
