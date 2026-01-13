import { describe, expect, it, vi, afterEach } from 'vitest'
import { handleMissionStart } from '../handleMissionStart'

describe('handleMissionStart', () => {
  afterEach(() => {
    vi.useRealTimers()
    vi.clearAllMocks()
  })

  it('does nothing when no map is selected', () => {
    const onLoadingChange = vi.fn()

    handleMissionStart(null, onLoadingChange)

    expect(onLoadingChange).not.toHaveBeenCalled()
  })

  it('toggles loading state when a map is selected', () => {
    vi.useFakeTimers()
    const onLoadingChange = vi.fn()

    handleMissionStart('alpha', onLoadingChange)

    expect(onLoadingChange).toHaveBeenCalledWith(true)

    vi.advanceTimersByTime(2000)

    expect(onLoadingChange).toHaveBeenLastCalledWith(false)
    expect(onLoadingChange).toHaveBeenCalledTimes(2)
  })
})
