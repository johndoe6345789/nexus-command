import { describe, expect, it, vi, afterEach } from 'vitest'
import { handleNavigate } from '../handleNavigate'

const confirmMock = vi.fn()

vi.stubGlobal('confirm', confirmMock)

describe('handleNavigate', () => {
  afterEach(() => {
    confirmMock.mockReset()
    vi.clearAllMocks()
  })

  it('returns the requested screen when valid', () => {
    expect(handleNavigate('settings')).toBe('settings')
  })

  it('returns main for invalid screens and warns', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => undefined)

    expect(handleNavigate('unknown')).toBe('main')
    expect(warnSpy).toHaveBeenCalledWith('Invalid screen: unknown, defaulting to main')
  })

  it('returns main when exit is confirmed', () => {
    confirmMock.mockReturnValue(true)

    expect(handleNavigate('exit')).toBe('main')
  })

  it('returns null when exit is cancelled', () => {
    confirmMock.mockReturnValue(false)

    expect(handleNavigate('exit')).toBeNull()
  })
})
