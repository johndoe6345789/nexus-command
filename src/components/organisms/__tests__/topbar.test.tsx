import { fireEvent, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { renderWithTheme } from '@/test/render'
import { TopBar } from '../TopBar'

const useKV = vi.hoisted(() => vi.fn())

vi.mock('@/hooks/useKV', () => ({ useKV }))
vi.mock('@/hooks/use-pull-to-refresh', () => ({
  usePullToRefresh: () => ({
    isPulling: false,
    isRefreshing: false,
    pullDistance: 0,
    progress: 0,
    scrollableRef: { current: null },
  }),
}))

describe('TopBar', () => {
  beforeEach(() => {
    useKV.mockReset()
    useKV.mockImplementation((key: string) =>
      key === 'game-alerts'
        ? [
        [{ id: 'alert-1', type: 'info', title: 'Update', message: 'Ready', timestamp: 1, read: false }],
        vi.fn(),
      ]
        : [
        [{ id: 'achievement-1', name: 'First Blood', description: 'Win once', icon: 'star', rarity: 'common', unlockedAt: 1 }],
        vi.fn(),
      ],
    )
  })

  it('opens alerts and achievements from the header actions', () => {
    renderWithTheme(<TopBar />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('NEXUS')
    fireEvent.click(screen.getByRole('button', { name: 'Notifications' }))
    expect(screen.getByText('Update')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Close' }))
    fireEvent.click(screen.getByRole('button', { name: 'Achievements' }))
    expect(screen.getByRole('heading', { name: 'First Blood' })).toBeInTheDocument()
  })
})
