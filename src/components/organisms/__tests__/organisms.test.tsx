import { fireEvent, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { Home } from '@mui/icons-material'
import { House, MapTrifold } from '@phosphor-icons/react'
import { renderWithTheme } from '@/test/render'
import { AudioControls } from '../AudioControls'
import { CheatCodesTab } from '../CheatCodesTab'
import { ConsolePanel } from '../ConsolePanel'
import { ConsoleTab } from '../ConsoleTab'
import { DebugOptionsTab } from '../DebugOptionsTab'
import { DeveloperTabs } from '../DeveloperTabs'
import { DifficultySelector } from '../DifficultySelector'
import { LoadingDemo } from '../LoadingDemo'
import { LoadingTab } from '../LoadingTab'
import { MapSelectionGrid } from '../MapSelectionGrid'
import { MapSelector } from '../MapSelector'
import { MenuGrid } from '../MenuGrid'
import { MissionControlPanel } from '../MissionControlPanel'
import { NotificationTester } from '../NotificationTester'
import { OverviewTab } from '../OverviewTab'
import { ProceduralGenPanel } from '../ProceduralGenPanel'
import { ProceduralGenTab } from '../ProceduralGenTab'
import { RenderStatsTab } from '../RenderStatsTab'
import { ServerInfoPanel } from '../ServerInfoPanel'
import { ServerList } from '../ServerList'
import { TabbedPanel } from '../TabbedPanel'

const notificationMocks = vi.hoisted(() => ({
  addAlert: vi.fn(),
  unlockAchievement: vi.fn(),
  incrementAchievementProgress: vi.fn(),
}))

vi.mock('@/utils/notifications', () => notificationMocks)
vi.mock('@/hooks/use-pull-to-refresh', () => ({
  usePullToRefresh: () => ({
    isPulling: false,
    isRefreshing: false,
    pullDistance: 0,
    progress: 0,
    scrollableRef: { current: null },
  }),
}))

const difficulties = [
  { id: 'recruit', label: 'Recruit', color: '#4ade80' },
  { id: 'elite', label: 'Elite', color: '#f87171' },
]
const maps = [
  { id: 'arena', name: 'Arena Prime', terrain: 'Urban', players: '2-8' },
  { id: 'forest', name: 'Forest Run', terrain: 'Forest', players: '4-12' },
]
const server = {
  id: 'alpha',
  name: 'Alpha Server',
  map: 'Arena Prime',
  mode: 'Control',
  region: 'US East',
  players: 4,
  maxPlayers: 12,
  ping: 32,
}
const stats = {
  fps: 60,
  ping: 25,
  memoryUsage: '512MB',
  drawCalls: 1200,
  triangles: '1.2M',
  shaders: 42,
  textures: 128,
  uptime: '2h 10m',
}

afterEach(() => {
  vi.clearAllMocks()
  vi.useRealTimers()
})

describe('organism input groups', () => {
  it('renders all audio controls', () => {
    renderWithTheme(
      <AudioControls
        masterVolume={80}
        musicVolume={60}
        sfxVolume={40}
        onMasterVolumeChange={vi.fn()}
        onMusicVolumeChange={vi.fn()}
        onSfxVolumeChange={vi.fn()}
      />,
    )
    for (const label of ['Master Volume', 'Music Volume', 'SFX Volume']) {
      expect(screen.getByText(label)).toBeInTheDocument()
    }
  })

  it.each([
    ['God Mode', 'Unlimited Ammo', 'No Clip'],
    ['Debug Mode', 'Show FPS Counter', 'Show Hitboxes'],
  ])('renders the expected toggle group', (...labels) => {
    const callbacks = [vi.fn(), vi.fn(), vi.fn()]
    const view =
      labels[0] === 'God Mode' ? (
        <CheatCodesTab
          godMode={false}
          unlimitedAmmo={false}
          noclip={false}
          onGodModeChange={callbacks[0]}
          onUnlimitedAmmoChange={callbacks[1]}
          onNoclipChange={callbacks[2]}
        />
      ) : (
        <DebugOptionsTab
          debugMode={false}
          showFPS={false}
          showHitboxes={false}
          onDebugModeChange={callbacks[0]}
          onShowFPSChange={callbacks[1]}
          onShowHitboxesChange={callbacks[2]}
        />
      )
    renderWithTheme(view)
    labels.forEach((label) => expect(screen.getByText(label)).toBeInTheDocument())
    fireEvent.click(screen.getAllByRole('switch')[1])
    expect(callbacks[1]).toHaveBeenCalledWith(true)
  })

  it.each([
    ['DifficultySelector', <DifficultySelector key="difficulty" difficulties={difficulties} selectedDifficulty="recruit" onSelectDifficulty={vi.fn()} />, 'Recruit'],
    ['MapSelectionGrid', <MapSelectionGrid key="map-grid" maps={maps} selectedMap="arena" onSelectMap={vi.fn()} />, 'Arena Prime'],
    ['MapSelector', <MapSelector key="map-selector" maps={maps} selectedMap="arena" onSelectMap={vi.fn()} />, 'Arena Prime'],
  ])('renders choices in %s', (_, component, expectedText) => {
    renderWithTheme(component)
    expect(screen.getByText(expectedText)).toBeInTheDocument()
  })
})

describe('organism interactions', () => {
  it('edits and submits console commands', () => {
    const onInputChange = vi.fn()
    const onSubmit = vi.fn((event) => event.preventDefault())
    renderWithTheme(<ConsolePanel output={['ready', '> status']} input="" onInputChange={onInputChange} onSubmit={onSubmit} />)
    fireEvent.change(screen.getByPlaceholderText('Enter command...'), { target: { value: 'status' } })
    fireEvent.submit(screen.getByPlaceholderText('Enter command...').closest('form')!)
    expect(screen.getByText('ready')).toBeInTheDocument()
    expect(onInputChange).toHaveBeenCalledWith('status')
    expect(onSubmit).toHaveBeenCalled()
  })

  it('renders the console tab composition', () => {
    renderWithTheme(<ConsoleTab output={['booted']} input="" onInputChange={vi.fn()} onSubmit={vi.fn()} />)
    expect(screen.getByRole('heading', { name: 'Console' })).toBeInTheDocument()
    expect(screen.getByText('booted')).toBeInTheDocument()
  })

  it('changes developer tabs', () => {
    const onTabChange = vi.fn()
    renderWithTheme(<DeveloperTabs activeTab={0} onTabChange={onTabChange} />)
    fireEvent.click(screen.getByRole('tab', { name: /Debug Options/ }))
    expect(onTabChange).toHaveBeenCalledWith(1)
  })

  it('navigates from a menu card', () => {
    const onNavigate = vi.fn()
    renderWithTheme(<MenuGrid items={[{ id: 'home', label: 'Home', icon: Home, description: 'Return home' }]} onNavigate={onNavigate} />)
    fireEvent.click(screen.getByText('Home'))
    expect(onNavigate).toHaveBeenCalledWith('home')
  })

  it('starts a configured mission', () => {
    const onStart = vi.fn()
    renderWithTheme(
      <MissionControlPanel
        difficulties={difficulties}
        selectedDifficulty="elite"
        onSelectDifficulty={vi.fn()}
        selectedMap="arena"
        mapName="Arena Prime"
        onStart={onStart}
        loading={false}
      />,
    )
    fireEvent.click(screen.getByRole('button', { name: /Start Mission/ }))
    expect(onStart).toHaveBeenCalled()
    expect(screen.getByText('Arena Prime')).toBeInTheDocument()
  })

  it.each([
    ['Info Alert', 'addAlert'],
    ['Unlock First Blood', 'unlockAchievement'],
    ['+5 Sharpshooter', 'incrementAchievementProgress'],
  ])('dispatches the %s notification action', (label, mockName) => {
    renderWithTheme(<NotificationTester />)
    fireEvent.click(screen.getByRole('button', { name: label }))
    expect(notificationMocks[mockName as keyof typeof notificationMocks]).toHaveBeenCalled()
  })

  it('filters servers and selects a result', () => {
    const onSearchChange = vi.fn()
    const onSelectServer = vi.fn()
    renderWithTheme(
      <ServerList
        servers={[server, { ...server, id: 'beta', name: 'Beta Server', map: 'Forest Run' }]}
        selectedServer={null}
        onSelectServer={onSelectServer}
        searchQuery="alpha"
        onSearchChange={onSearchChange}
      />,
    )
    expect(screen.getByText('Alpha Server')).toBeInTheDocument()
    expect(screen.queryByText('Beta Server')).not.toBeInTheDocument()
    fireEvent.change(screen.getByPlaceholderText('Search servers or maps...'), { target: { value: 'forest' } })
    expect(onSearchChange).toHaveBeenCalledWith('forest')
    fireEvent.click(screen.getByText('Alpha Server'))
    expect(onSelectServer).toHaveBeenCalledWith('alpha')
  })

  it('shows and joins a selected server', () => {
    const onJoin = vi.fn()
    const { rerender } = renderWithTheme(<ServerInfoPanel server={undefined} onJoin={onJoin} />)
    expect(screen.getByRole('button', { name: /Join Server/ })).toBeDisabled()
    rerender(<ServerInfoPanel server={server} onJoin={onJoin} />)
    fireEvent.click(screen.getByRole('button', { name: /Join Server/ }))
    expect(onJoin).toHaveBeenCalled()
  })

  it('changes tabbed panel content', () => {
    renderWithTheme(
      <TabbedPanel
        tabs={[
          { label: 'Home', icon: House, content: 'Home content' },
          { label: 'Maps', icon: MapTrifold, content: 'Map content' },
        ]}
      />,
    )
    fireEvent.click(screen.getByRole('tab', { name: /Maps/ }))
    expect(screen.getByText('Map content')).toBeVisible()
  })
})

describe('organism display panels', () => {
  it.each([
    ['OverviewTab', <OverviewTab key="overview" systemStats={stats} />, '60'],
    ['RenderStatsTab', <RenderStatsTab key="render" systemStats={stats} />, 'Render Stats'],
    ['LoadingDemo', <LoadingDemo key="demo" />, 'Loading Components Demo'],
    ['LoadingTab', <LoadingTab key="tab" />, 'Loading Components Demo'],
  ])('renders %s', (_, component, text) => {
    renderWithTheme(component)
    expect(screen.getByText(text)).toBeInTheDocument()
  })

  it.each([
    ['ProceduralGenPanel', <ProceduralGenPanel key="panel" isGenerating={false} generationProgress={0} onGenerationStart={vi.fn()} onGenerationProgress={vi.fn()} onGenerationEnd={vi.fn()} />],
    ['ProceduralGenTab', <ProceduralGenTab key="tab" isGenerating={false} generationProgress={0} onGenerationStart={vi.fn()} onGenerationProgress={vi.fn()} onGenerationEnd={vi.fn()} />],
  ])('renders %s', (_, component) => {
    renderWithTheme(component)
    expect(screen.getByText('Procedural Map Generation')).toBeInTheDocument()
  })
})
