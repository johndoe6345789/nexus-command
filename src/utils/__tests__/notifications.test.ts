import { describe, it, expect, beforeEach, vi } from 'vitest'
import {
  addAlert,
  unlockAchievement,
  updateAchievementProgress,
  incrementAchievementProgress,
} from '../notifications'

// Mock console.log to avoid cluttering test output
vi.spyOn(console, 'log').mockImplementation(() => {})

describe('notifications', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('addAlert', () => {
    it('should add an alert successfully', async () => {
      await expect(
        addAlert('info', 'Test Alert', 'This is a test message')
      ).resolves.toBeUndefined()
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
    })

    it('should add alert with action', async () => {
      const mockAction = {
        label: 'Click Me',
        onClick: vi.fn(),
      }
      
      await expect(
        addAlert('info', 'Action Alert', 'Alert with action', mockAction)
      ).resolves.toBeUndefined()
    })

    it('should add alert without action', async () => {
      await expect(
        addAlert('info', 'No Action', 'Alert without action')
      ).resolves.toBeUndefined()
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
    })

    it('should not throw when unlocking achievement', async () => {
      await expect(
        unlockAchievement('test-achievement')
      ).resolves.toBeUndefined()
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
  })
})
