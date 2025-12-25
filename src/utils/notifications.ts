import { Alert, Achievement, AlertType } from '@/types'

export async function addAlert(
  type: AlertType,
  title: string,
  message: string,
  action?: { label: string; onClick: () => void }
): Promise<void> {
  const alerts = await window.spark.kv.get<Alert[]>('game-alerts') ?? []
  
  const newAlert: Alert = {
    id: `alert-${Date.now()}-${Math.random()}`,
    type,
    title,
    message,
    timestamp: Date.now(),
    read: false,
    action,
  }

  await window.spark.kv.set('game-alerts', [...alerts, newAlert])
}

export async function unlockAchievement(achievementId: string): Promise<void> {
  const achievements = await window.spark.kv.get<Achievement[]>('game-achievements') ?? []
  
  const updated = achievements.map(achievement =>
    achievement.id === achievementId && !achievement.unlockedAt
      ? { ...achievement, unlockedAt: Date.now() }
      : achievement
  )

  const unlockedAchievement = updated.find(a => a.id === achievementId)
  
  if (unlockedAchievement?.unlockedAt) {
    await window.spark.kv.set('game-achievements', updated)
    
    await addAlert(
      'achievement',
      'Achievement Unlocked!',
      `${unlockedAchievement.name}: ${unlockedAchievement.description}`
    )
  }
}

export async function updateAchievementProgress(
  achievementId: string,
  progress: number
): Promise<void> {
  const achievements = await window.spark.kv.get<Achievement[]>('game-achievements') ?? []
  
  const updated = achievements.map(achievement =>
    achievement.id === achievementId
      ? { ...achievement, progress: Math.min(progress, achievement.maxProgress ?? 1) }
      : achievement
  )

  await window.spark.kv.set('game-achievements', updated)
  
  const achievement = updated.find(a => a.id === achievementId)
  if (achievement && achievement.progress === achievement.maxProgress && !achievement.unlockedAt) {
    await unlockAchievement(achievementId)
  }
}

export async function incrementAchievementProgress(
  achievementId: string,
  amount: number = 1
): Promise<void> {
  const achievements = await window.spark.kv.get<Achievement[]>('game-achievements') ?? []
  const achievement = achievements.find(a => a.id === achievementId)
  
  if (achievement) {
    const newProgress = (achievement.progress ?? 0) + amount
    await updateAchievementProgress(achievementId, newProgress)
  }
}
