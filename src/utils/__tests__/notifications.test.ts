import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import {
  addAlert,
  unlockAchievement,
  updateAchievementProgress,
  incrementAchievementProgress,
  _clearStores,
  _addAchievementToStore,
  _getAchievementsStore,
  _getAlertsStore,
} from '../notifications'
import { Achievement } from '@/types'

describe('notifications', () => {
  let consoleLogSpy: any

  beforeEach(() => {
    // Clear stores before each test
    _clearStores()
    // Mock console.log only for this test suite
    consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
  })

  afterEach(() => {
    // Restore console.log after each test
    consoleLogSpy.mockRestore()
  })

  describe('addAlert', () => {
    it('should add an alert successfully', async () => {
      await expect(
        addAlert('info', 'Test Alert', 'This is a test message')
      ).resolves.toBeUndefined()
      
      const alerts = _getAlertsStore()
      expect(alerts).toHaveLength(1)
      expect(alerts[0]).toMatchObject({
        type: 'info',
        title: 'Test Alert',
        message: 'This is a test message',
        read: false,
      })
    })

    it('should handle different alert types', async () => {
      await expect(
        addAlert('warning', 'Warning', 'Warning message')
      ).resolves.toBeUndefined()
      
      await expect(
        addAlert('error', 'Error', 'Error message')
      ).resolves.toBeUndefined()
      
      await expect(
        addAlert('success', 'Success', 'Success message')
      ).resolves.toBeUndefined()
      
      const alerts = _getAlertsStore()
      expect(alerts).toHaveLength(3)
      expect(alerts[0].type).toBe('warning')
      expect(alerts[1].type).toBe('error')
      expect(alerts[2].type).toBe('success')
    })

    it('should add alert with action', async () => {
      const mockAction = {
        label: 'Click Me',
        onClick: vi.fn(),
      }
      
      await expect(
        addAlert('info', 'Action Alert', 'Alert with action', mockAction)
      ).resolves.toBeUndefined()
      
      const alerts = _getAlertsStore()
      expect(alerts[0].action).toBeDefined()
      expect(alerts[0].action?.label).toBe('Click Me')
    })

    it('should add alert without action', async () => {
      await expect(
        addAlert('info', 'No Action', 'Alert without action')
      ).resolves.toBeUndefined()
      
      const alerts = _getAlertsStore()
      expect(alerts[0].action).toBeUndefined()
    })

    it('should log the added alert', async () => {
      await addAlert('info', 'Test', 'Message')
      
      expect(console.log).toHaveBeenCalledWith(
        'Alert added:',
        expect.objectContaining({
          type: 'info',
          title: 'Test',
          message: 'Message',
          read: false,
        })
      )
    })
  })

  describe('unlockAchievement', () => {
    it('should handle unlocking achievement that does not exist', async () => {
      // Since the store is empty, this should not throw
      await expect(
        unlockAchievement('nonexistent-achievement')
      ).resolves.toBeUndefined()
      
      // No alerts should be added
      const alerts = _getAlertsStore()
      expect(alerts).toHaveLength(0)
    })

    it('should not throw when unlocking achievement', async () => {
      await expect(
        unlockAchievement('test-achievement')
      ).resolves.toBeUndefined()
    })
    
    it('should unlock achievement and add alert when achievement exists', async () => {
      const achievement: Achievement = {
        id: 'first-win',
        name: 'First Victory',
        description: 'Win your first match',
        icon: '🏆',
        rarity: 'common',
        progress: 0,
        maxProgress: 1,
      }
      
      _addAchievementToStore(achievement)
      
      await unlockAchievement('first-win')
      
      // Check that achievement was unlocked
      const achievements = _getAchievementsStore()
      expect(achievements[0].unlockedAt).toBeDefined()
      expect(achievements[0].unlockedAt).toBeGreaterThan(0)
      
      // Check that alert was added
      const alerts = _getAlertsStore()
      expect(alerts).toHaveLength(1)
      expect(alerts[0].type).toBe('achievement')
      expect(alerts[0].title).toBe('Achievement Unlocked!')
      expect(alerts[0].message).toContain('First Victory')
      expect(alerts[0].message).toContain('Win your first match')
    })
    
    it('should not unlock achievement if already unlocked', async () => {
      const achievement: Achievement = {
        id: 'already-unlocked',
        name: 'Already Done',
        description: 'This was already unlocked',
        icon: '✓',
        rarity: 'common',
        unlockedAt: Date.now() - 10000, // Already unlocked
      }
      
      _addAchievementToStore(achievement)
      
      await unlockAchievement('already-unlocked')
      
      // No new alert should be added since it's already unlocked
      const alerts = _getAlertsStore()
      expect(alerts).toHaveLength(0)
    })
  })

  describe('updateAchievementProgress', () => {
    it('should handle updating progress for non-existent achievement', async () => {
      await expect(
        updateAchievementProgress('nonexistent', 50)
      ).resolves.toBeUndefined()
    })

    it('should accept various progress values', async () => {
      await expect(
        updateAchievementProgress('test-achievement', 0)
      ).resolves.toBeUndefined()
      
      await expect(
        updateAchievementProgress('test-achievement', 50)
      ).resolves.toBeUndefined()
      
      await expect(
        updateAchievementProgress('test-achievement', 100)
      ).resolves.toBeUndefined()
    })
    
    it('should update achievement progress when achievement exists', async () => {
      const achievement: Achievement = {
        id: 'kill-10',
        name: 'Killer',
        description: 'Get 10 kills',
        icon: '💀',
        rarity: 'common',
        progress: 0,
        maxProgress: 10,
      }
      
      _addAchievementToStore(achievement)
      
      await updateAchievementProgress('kill-10', 5)
      
      const achievements = _getAchievementsStore()
      expect(achievements[0].progress).toBe(5)
    })
    
    it('should cap progress at maxProgress', async () => {
      const achievement: Achievement = {
        id: 'cap-test',
        name: 'Capped',
        description: 'Test capping',
        icon: '🔒',
        rarity: 'common',
        progress: 0,
        maxProgress: 10,
      }
      
      _addAchievementToStore(achievement)
      
      await updateAchievementProgress('cap-test', 15)
      
      const achievements = _getAchievementsStore()
      expect(achievements[0].progress).toBe(10) // Capped at maxProgress
    })
    
    it('should unlock achievement when progress reaches maxProgress', async () => {
      const achievement: Achievement = {
        id: 'auto-unlock',
        name: 'Auto Unlock',
        description: 'Unlocks automatically',
        icon: '🎉',
        rarity: 'rare',
        progress: 0,
        maxProgress: 10,
      }
      
      _addAchievementToStore(achievement)
      
      await updateAchievementProgress('auto-unlock', 10)
      
      const achievements = _getAchievementsStore()
      expect(achievements[0].progress).toBe(10)
      expect(achievements[0].unlockedAt).toBeDefined()
      
      // Check that alert was added for unlock
      const alerts = _getAlertsStore()
      expect(alerts).toHaveLength(1)
      expect(alerts[0].type).toBe('achievement')
    })
    
    it('should not unlock achievement if already unlocked even when reaching maxProgress', async () => {
      const achievement: Achievement = {
        id: 'already-done',
        name: 'Already Done',
        description: 'Already completed',
        icon: '✅',
        rarity: 'common',
        progress: 8,
        maxProgress: 10,
        unlockedAt: Date.now() - 5000, // Already unlocked
      }
      
      _addAchievementToStore(achievement)
      
      await updateAchievementProgress('already-done', 10)
      
      // No new alert should be added
      const alerts = _getAlertsStore()
      expect(alerts).toHaveLength(0)
    })
  })

  describe('incrementAchievementProgress', () => {
    it('should handle incrementing progress for non-existent achievement', async () => {
      await expect(
        incrementAchievementProgress('nonexistent')
      ).resolves.toBeUndefined()
    })

    it('should accept default increment amount', async () => {
      await expect(
        incrementAchievementProgress('test-achievement')
      ).resolves.toBeUndefined()
    })

    it('should accept custom increment amount', async () => {
      await expect(
        incrementAchievementProgress('test-achievement', 5)
      ).resolves.toBeUndefined()
      
      await expect(
        incrementAchievementProgress('test-achievement', 10)
      ).resolves.toBeUndefined()
    })
    
    it('should increment achievement progress by 1 by default', async () => {
      const achievement: Achievement = {
        id: 'inc-test',
        name: 'Incremental',
        description: 'Test increment',
        icon: '➕',
        rarity: 'common',
        progress: 5,
        maxProgress: 20,
      }
      
      _addAchievementToStore(achievement)
      
      await incrementAchievementProgress('inc-test')
      
      const achievements = _getAchievementsStore()
      expect(achievements[0].progress).toBe(6)
    })
    
    it('should increment achievement progress by custom amount', async () => {
      const achievement: Achievement = {
        id: 'custom-inc',
        name: 'Custom Inc',
        description: 'Test custom increment',
        icon: '🔢',
        rarity: 'common',
        progress: 3,
        maxProgress: 20,
      }
      
      _addAchievementToStore(achievement)
      
      await incrementAchievementProgress('custom-inc', 7)
      
      const achievements = _getAchievementsStore()
      expect(achievements[0].progress).toBe(10)
    })
    
    it('should handle undefined progress (start from 0)', async () => {
      const achievement: Achievement = {
        id: 'no-progress',
        name: 'No Progress',
        description: 'Progress undefined initially',
        icon: '🆕',
        rarity: 'common',
        maxProgress: 10,
      }
      
      _addAchievementToStore(achievement)
      
      await incrementAchievementProgress('no-progress', 3)
      
      const achievements = _getAchievementsStore()
      expect(achievements[0].progress).toBe(3)
    })
  })
})
