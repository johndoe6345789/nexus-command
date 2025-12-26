import { describe, it, expect } from 'vitest'
import { handleConsoleCommand } from '../handleConsoleCommand'

describe('handleConsoleCommand', () => {
  const mockSystemStats = {
    fps: 60,
    memoryUsage: '45 MB',
  }

  describe('help command', () => {
    it('should return help message for help command', () => {
      const result = handleConsoleCommand('help', mockSystemStats)
      expect(result).toContain('Available commands:')
      expect(result).toContain('  help - Show this help message')
      expect(result).toContain('  clear - Clear console output')
      expect(result).toContain('  stats - Show detailed system statistics')
    })

    it('should handle help command with uppercase', () => {
      const result = handleConsoleCommand('HELP', mockSystemStats)
      expect(result).toContain('Available commands:')
    })

    it('should handle help command with extra spaces', () => {
      const result = handleConsoleCommand('  help  ', mockSystemStats)
      expect(result).toContain('Available commands:')
    })
  })

  describe('clear command', () => {
    it('should return clear message for clear command', () => {
      const result = handleConsoleCommand('clear', mockSystemStats)
      expect(result).toEqual(['> Console cleared'])
    })

    it('should handle clear command with uppercase', () => {
      const result = handleConsoleCommand('CLEAR', mockSystemStats)
      expect(result).toEqual(['> Console cleared'])
    })

    it('should handle clear command with extra spaces', () => {
      const result = handleConsoleCommand('  clear  ', mockSystemStats)
      expect(result).toEqual(['> Console cleared'])
    })
  })

  describe('stats command', () => {
    it('should return system stats for stats command', () => {
      const result = handleConsoleCommand('stats', mockSystemStats)
      expect(result).toContain('System Statistics:')
      expect(result).toContain('  FPS: 60')
      expect(result).toContain('  Memory: 45 MB')
    })

    it('should handle stats command with uppercase', () => {
      const result = handleConsoleCommand('STATS', mockSystemStats)
      expect(result).toContain('System Statistics:')
    })

    it('should display different system stats values', () => {
      const customStats = { fps: 120, memoryUsage: '100 MB' }
      const result = handleConsoleCommand('stats', customStats)
      expect(result).toContain('  FPS: 120')
      expect(result).toContain('  Memory: 100 MB')
    })
  })

  describe('unknown command', () => {
    it('should return unknown command message for invalid command', () => {
      const result = handleConsoleCommand('invalid', mockSystemStats)
      expect(result).toEqual(['Unknown command: "invalid"'])
    })

    it('should preserve original command casing in error message', () => {
      const result = handleConsoleCommand('InvalidCommand', mockSystemStats)
      expect(result).toEqual(['Unknown command: "InvalidCommand"'])
    })

    it('should handle empty command', () => {
      const result = handleConsoleCommand('', mockSystemStats)
      expect(result).toEqual(['Unknown command: ""'])
    })

    it('should handle command with special characters', () => {
      const result = handleConsoleCommand('test@#$', mockSystemStats)
      expect(result).toEqual(['Unknown command: "test@#$"'])
    })
  })

  describe('edge cases', () => {
    it('should handle mixed case commands', () => {
      const result = handleConsoleCommand('HeLp', mockSystemStats)
      expect(result).toContain('Available commands:')
    })

    it('should trim whitespace from commands', () => {
      const result = handleConsoleCommand('   stats   ', mockSystemStats)
      expect(result).toContain('System Statistics:')
    })
  })
})
