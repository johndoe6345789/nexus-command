import { describe, expect, it, vi, afterEach } from 'vitest'
import { handleServerRefresh } from '../handleServerRefresh'
import { generateServers } from '@/utils'
import type { Server } from '@/types'

vi.mock('@/utils', () => ({
  generateServers: vi.fn(),
}))

describe('handleServerRefresh', () => {
  afterEach(() => {
    vi.useRealTimers()
    vi.clearAllMocks()
  })

  it('sets loading state and refreshes servers', () => {
    vi.useFakeTimers()
    const onLoadingChange = vi.fn()
    const onServersChange = vi.fn()
    const servers: Server[] = [
      {
        id: '1',
        name: 'Alpha',
        map: 'Crimson Ridge',
        players: 8,
        maxPlayers: 24,
        ping: 42,
        mode: 'Conquest',
        region: 'NA',
      },
    ]

    vi.mocked(generateServers).mockReturnValue(servers)

    handleServerRefresh(onLoadingChange, onServersChange)

    expect(onLoadingChange).toHaveBeenCalledWith(true)
    expect(onServersChange).not.toHaveBeenCalled()

    vi.advanceTimersByTime(1000)

    expect(generateServers).toHaveBeenCalledTimes(1)
    expect(onServersChange).toHaveBeenCalledWith(servers)
    expect(onLoadingChange).toHaveBeenLastCalledWith(false)
  })
})
