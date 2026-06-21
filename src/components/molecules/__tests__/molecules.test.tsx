import { fireEvent, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { PlayArrow, VolumeUp } from '@mui/icons-material'
import { renderWithTheme } from '@/test/render'
import { ActionButton } from '../ActionButton'
import { DebugToggle } from '../DebugToggle'
import { DifficultySelector } from '../DifficultySelector'
import { GlassCard } from '../GlassCard'
import { IconLabel } from '../IconLabel'
import { MapCard } from '../MapCard'
import { MatchHistoryCard } from '../MatchHistoryCard'
import { PageHeader } from '../PageHeader'
import { ServerCard } from '../ServerCard'
import { VolumeControl } from '../VolumeControl'
import { VolumeSlider } from '../VolumeSlider'

describe('ActionButton', () => {
  it('renders an icon and handles clicks', () => {
    const onClick = vi.fn()
    renderWithTheme(<ActionButton icon={PlayArrow} onClick={onClick}>Start</ActionButton>)
    fireEvent.click(screen.getByRole('button', { name: /start/i }))
    expect(onClick).toHaveBeenCalledOnce()
  })
})

describe('DebugToggle', () => {
  it('reports checked state changes', () => {
    const onChange = vi.fn()
    renderWithTheme(<DebugToggle title="Debug" description="Details" checked={false} onChange={onChange} />)
    fireEvent.click(screen.getByRole('switch'))
    expect(onChange).toHaveBeenCalledWith(true)
  })
})

describe('DifficultySelector', () => {
  it('selects a difficulty', () => {
    const onSelect = vi.fn()
    renderWithTheme(<DifficultySelector difficulties={[{ id: 'easy', label: 'Easy', color: 'green' }]} selected="" onSelect={onSelect} />)
    fireEvent.click(screen.getByRole('button', { name: 'Easy' }))
    expect(onSelect).toHaveBeenCalledWith('easy')
  })
})

describe.each([
  ['GlassCard', <GlassCard key="glass-card">content</GlassCard>],
  ['PageHeader', <PageHeader key="page-header" title="content" subtitle="subtitle" />],
])('%s', (_name, component) => {
  it('renders content', () => {
    renderWithTheme(component)
    expect(screen.getByText('content')).toBeInTheDocument()
  })
})

describe('IconLabel', () => {
  it('renders label and chip value', () => {
    renderWithTheme(<IconLabel icon={VolumeUp} label="Volume" value="50%" showChip />)
    expect(screen.getByText('Volume')).toBeInTheDocument()
    expect(screen.getByText('50%')).toBeInTheDocument()
  })
})

describe('MapCard', () => {
  it('selects a map', () => {
    const onSelect = vi.fn()
    renderWithTheme(<MapCard id="map" name="Arena" terrain="Urban" players="8" selected={false} onSelect={onSelect} />)
    fireEvent.click(screen.getByText('Arena'))
    expect(onSelect).toHaveBeenCalledWith('map')
  })
})

describe('MatchHistoryCard', () => {
  it('renders match metadata', () => {
    renderWithTheme(<MatchHistoryCard map="Arena" mode="TDM" result="Victory" score="10-2" date="Today" />)
    expect(screen.getByText('Arena')).toBeInTheDocument()
    expect(screen.getByText('Victory')).toBeInTheDocument()
  })
})

describe('ServerCard', () => {
  it('selects a server', () => {
    const onSelect = vi.fn()
    renderWithTheme(<ServerCard id="s" name="Server" map="Arena" mode="TDM" region="US" players={2} maxPlayers={8} ping={20} selected={false} onSelect={onSelect} />)
    fireEvent.click(screen.getByText('Server'))
    expect(onSelect).toHaveBeenCalledWith('s')
  })
})

describe.each([
  ['VolumeControl', <VolumeControl key="volume-control" label="Volume" value={50} onChange={vi.fn()} />],
  ['VolumeSlider', <VolumeSlider key="volume-slider" icon={VolumeUp} label="Volume" value={50} onChange={vi.fn()} />],
])('%s', (_name, component) => {
  it('renders its value', () => {
    renderWithTheme(component)
    expect(screen.getByText('50%')).toBeInTheDocument()
  })
})
