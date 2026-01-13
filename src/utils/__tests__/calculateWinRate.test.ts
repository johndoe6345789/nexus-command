import { describe, it, expect } from 'vitest'
import { calculateWinRate } from '../calculateWinRate'

describe('calculateWinRate', () => {
  it('should calculate win rate correctly for positive numbers', () => {
    expect(calculateWinRate(7, 3)).toBe('70.0')
  })

  it('should calculate win rate with one decimal place', () => {
    expect(calculateWinRate(2, 3)).toBe('40.0')
  })

  it('should handle zero wins', () => {
    expect(calculateWinRate(0, 10)).toBe('0.0')
  })

  it('should handle zero losses (100% win rate)', () => {
    expect(calculateWinRate(10, 0)).toBe('100.0')
  })

  it('should handle equal wins and losses', () => {
    expect(calculateWinRate(5, 5)).toBe('50.0')
  })

  it('should handle both zero wins and losses', () => {
    const result = calculateWinRate(0, 0)
    expect(result).toBe('NaN')
  })

  it('should handle high numbers', () => {
    expect(calculateWinRate(900, 100)).toBe('90.0')
  })

  it('should round to one decimal place', () => {
    expect(calculateWinRate(1, 3)).toBe('25.0')
  })

  it('should calculate percentage correctly', () => {
    expect(calculateWinRate(3, 7)).toBe('30.0')
  })
})
