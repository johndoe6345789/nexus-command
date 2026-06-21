import { fireEvent, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { renderWithTheme } from '@/test/render'
import { AnimatedBackground } from '../AnimatedBackground'
import { Developer } from '../Developer'
import { GlitchText } from '../GlitchText'
import { Logo } from '../Logo'
import { MainMenu } from '../MainMenu'
import { Multiplayer } from '../Multiplayer'
import { PlayerStats } from '../PlayerStats'
import { Settings } from '../Settings'
import { SinglePlayer } from '../SinglePlayer'

const rendererMocks = vi.hoisted(() => ({
  start: vi.fn(),
  destroy: vi.fn(),
  handleResize: vi.fn(),
}))

vi.mock('@/lib/canvas/renderer', () => ({
  CanvasRenderer: class {
    start = rendererMocks.start
    destroy = rendererMocks.destroy
    handleResize = rendererMocks.handleResize
  },
}))
vi.mock('@/hooks/use-pull-to-refresh', () => ({
  usePullToRefresh: () => ({
    isPulling: false,
    isRefreshing: false,
    pullDistance: 0,
    progress: 0,
    scrollableRef: { current: null },
  }),
}))

afterEach(() => {
  window.localStorage.clear()
  vi.clearAllMocks()
})

describe('top-level visual components', () => {
  it('starts and destroys the animated canvas renderer', () => {
    const { container, unmount } = renderWithTheme(<AnimatedBackground />)
    expect(container.querySelector('canvas')).toBeInTheDocument()
    expect(rendererMocks.start).toHaveBeenCalled()
    unmount()
    expect(rendererMocks.destroy).toHaveBeenCalled()
  })

  it('renders glitch text content', () => {
    renderWithTheme(<GlitchText className="status">ONLINE</GlitchText>)
    expect(screen.getByText('ONLINE')).toBeInTheDocument()
  })

  it.each([
    [true, true],
    [false, false],
  ])('renders logo text when showText is %s', (showText, expectedVisible) => {
    renderWithTheme(<Logo showText={showText} animate={false} />)
    expect(Boolean(screen.queryByText('NEXUS'))).toBe(expectedVisible)
  })

  it('routes main-menu actions through onNavigate', () => {
    const onNavigate = vi.fn()
    renderWithTheme(<MainMenu onNavigate={onNavigate} />)
    fireEvent.click(screen.getByText('Campaign'))
    expect(onNavigate).toHaveBeenCalledWith('singleplayer')
  })
})

describe('top-level screens', () => {
  it.each([
    ['Developer Tools', <Developer key="developer" onBack={vi.fn()} />],
    ['Multiplayer', <Multiplayer key="multiplayer" onBack={vi.fn()} />],
    ['Profile', <PlayerStats key="stats" onBack={vi.fn()} />],
    ['Settings', <Settings key="settings" onBack={vi.fn()} />],
    ['Campaign', <SinglePlayer key="campaign" onBack={vi.fn()} />],
  ])('renders the %s screen', (heading, component) => {
    renderWithTheme(component)
    expect(screen.getByRole('heading', { name: heading })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Back/ })).toBeInTheDocument()
  })

  it('switches settings tabs', () => {
    renderWithTheme(<Settings onBack={vi.fn()} />)
    fireEvent.click(screen.getByRole('tab', { name: /Audio/ }))
    expect(screen.getByRole('heading', { name: 'Master Volume' })).toBeInTheDocument()
  })

  it('reports controlled settings tab changes', () => {
    const onTabChange = vi.fn()
    renderWithTheme(<Settings onBack={vi.fn()} activeTab={0} onTabChange={onTabChange} />)
    fireEvent.click(screen.getByRole('tab', { name: /Profile/ }))
    expect(onTabChange).toHaveBeenCalledWith(3)
  })

  it('selects a campaign map before starting a mission', () => {
    renderWithTheme(<SinglePlayer onBack={vi.fn()} />)
    expect(screen.getByRole('button', { name: /Start Mission/ })).toBeDisabled()
    fireEvent.click(screen.getByText('Aegis Station').closest('.MuiCard-root')!)
    expect(screen.getByRole('button', { name: /Start Mission/ })).toBeEnabled()
  })
})
