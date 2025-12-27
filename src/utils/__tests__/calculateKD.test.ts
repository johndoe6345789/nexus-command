import { describe, it, expect } from 'vitest'
import { calculateKD } from '../calculateKD'

describe('calculateKD', () => {
  it('should calculate K/D ratio correctly for positive numbers', () => {
    expect(calculateKD(10, 5)).toBe('2.00')
  })

  it('should calculate K/D ratio with two decimal places', () => {
    expect(calculateKD(15, 7)).toBe('2.14')
  })

  it('should handle zero kills', () => {
    expect(calculateKD(0, 10)).toBe('0.00')
  })

  it('should handle division by zero (infinity)', () => {
    const result = calculateKD(10, 0)
    expect(result).toBe('Infinity')
  })

  it('should handle both zero kills and deaths', () => {
    const result = calculateKD(0, 0)
    expect(result).toBe('NaN')
  })

  it('should handle high numbers', () => {
    expect(calculateKD(1000, 333)).toBe('3.00')
  })

  it('should handle decimal results correctly', () => {
    expect(calculateKD(7, 3)).toBe('2.33')
  })

  it('should round to two decimal places', () => {
    expect(calculateKD(10, 3)).toBe('3.33')
  })
})
