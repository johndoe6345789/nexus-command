import { fireEvent, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { PlayArrow } from '@mui/icons-material'
import { renderWithTheme } from '@/test/render'
import { AchievementBadge } from '../AchievementBadge'
import { AchievementCard } from '../AchievementCard'
import { AlertItem } from '../AlertItem'
import { BackButton } from '../BackButton'
import { ContentCard } from '../ContentCard'
import { Divider } from '../Divider'
import { GenerationProgressPopup } from '../GenerationProgressPopup'
import { GlowBox } from '../GlowBox'
import { Icon } from '../Icon'
import { PageContainer } from '../PageContainer'
import { PageHeader } from '../PageHeader'
import { ProgressBar } from '../ProgressBar'
import { PullToRefresh } from '../PullToRefresh'
import { Spinner } from '../Spinner'
import { StatCard } from '../StatCard'
import { Text } from '../Text'

vi.mock('@/hooks/use-pull-to-refresh', () => ({
  usePullToRefresh: () => ({
    isPulling: false,
    isRefreshing: false,
    pullDistance: 0,
    progress: 0,
    scrollableRef: { current: null },
  }),
}))

describe.each([
  ['common', 'Common'],
  ['rare', 'Rare'],
  ['epic', 'Epic'],
  ['legendary', 'Legendary'],
] as const)('AchievementBadge rarity %s', (rarity, label) => {
  it('renders the matching label', () => {
    renderWithTheme(<AchievementBadge rarity={rarity} />)
    expect(screen.getByText(label)).toBeInTheDocument()
  })
})

describe('AchievementCard', () => {
  it('renders locked hidden progress', () => {
    renderWithTheme(<AchievementCard achievement={{ id: 'a', name: 'Secret', description: 'Hidden', icon: 'fire', rarity: 'rare', hidden: true, progress: 2, maxProgress: 5 }} />)
    expect(screen.getByText('???')).toBeInTheDocument()
    expect(screen.getByText('Hidden achievement')).toBeInTheDocument()
    expect(screen.getByText('2/5')).toBeInTheDocument()
  })

  it('renders unlocked rewards', () => {
    renderWithTheme(<AchievementCard achievement={{ id: 'a', name: 'Winner', description: 'Done', icon: 'medal', rarity: 'epic', reward: 'Skin', unlockedAt: 1 }} />)
    expect(screen.getByRole('heading', { name: 'Winner' })).toBeInTheDocument()
    expect(screen.getByText('Reward: Skin')).toBeInTheDocument()
  })
})

describe('AlertItem', () => {
  it('marks unread alerts and dismisses independently', () => {
    const onRead = vi.fn()
    const onDismiss = vi.fn()
    renderWithTheme(<AlertItem alert={{ id: '1', title: 'Alert', message: 'Message', type: 'info', timestamp: 1, read: false }} onRead={onRead} onDismiss={onDismiss} />)
    fireEvent.click(screen.getByText('Message'))
    expect(onRead).toHaveBeenCalledWith('1')
    fireEvent.click(screen.getByRole('button'))
    expect(onDismiss).toHaveBeenCalledWith('1')
  })
})

describe.each([
  ['ContentCard', <ContentCard key="content-card">content</ContentCard>],
  ['GlowBox', <GlowBox key="glow-box">content</GlowBox>],
  ['PageContainer', <PageContainer key="page-container">content</PageContainer>],
  ['PullToRefresh', <PullToRefresh key="pull-to-refresh" onRefresh={vi.fn()}>content</PullToRefresh>],
])('%s', (_name, component) => {
  it('renders its children', () => {
    renderWithTheme(component)
    expect(screen.getByText('content')).toBeInTheDocument()
  })
})

describe('BackButton', () => {
  it('calls onBack', () => {
    const onBack = vi.fn()
    renderWithTheme(<BackButton onBack={onBack} />)
    fireEvent.click(screen.getByRole('button', { name: /back to menu/i }))
    expect(onBack).toHaveBeenCalledOnce()
  })
})

describe('Divider', () => {
  it('renders a separator', () => {
    renderWithTheme(<Divider glow />)
    expect(screen.getByRole('separator')).toBeInTheDocument()
  })
})

describe('GenerationProgressPopup', () => {
  it('shows active generation metadata', () => {
    renderWithTheme(<GenerationProgressPopup isVisible progress={25} label="Generating map" type="arena" seed="42" />)
    expect(screen.getByText('Generating map')).toBeInTheDocument()
    expect(screen.getByText('arena')).toBeInTheDocument()
    expect(screen.getByText(/42/)).toBeInTheDocument()
  })
})

describe('Icon', () => {
  it('renders static and animated phosphor icons', () => {
    const FakeIcon = (props: { size?: number }) => <span data-testid="icon">{props.size}</span>
    const { rerender } = renderWithTheme(<Icon icon={FakeIcon} size={12} />)
    expect(screen.getByTestId('icon')).toHaveTextContent('12')
    rerender(<Icon icon={FakeIcon} size={16} animated />)
    expect(screen.getByTestId('icon')).toHaveTextContent('16')
  })
})

describe('PageHeader', () => {
  it('renders title, subtitle, and optional icon', () => {
    renderWithTheme(<PageHeader title="Title" subtitle="Subtitle" icon={PlayArrow} />)
    expect(screen.getByRole('heading', { name: 'Title' })).toBeInTheDocument()
    expect(screen.getByText('Subtitle')).toBeInTheDocument()
    expect(screen.getByTitle('Title')).toBeInTheDocument()
  })
})

describe('ProgressBar', () => {
  it('renders rounded percentage and label', () => {
    renderWithTheme(<ProgressBar value={42.4} label="Loading" />)
    expect(screen.getByText('Loading')).toBeInTheDocument()
    expect(screen.getByText('42%')).toBeInTheDocument()
  })
})

describe.each(['ring', 'dots', 'pulse', 'orbit', 'bars'] as const)('Spinner variant %s', (variant) => {
  it('renders its label', () => {
    renderWithTheme(<Spinner variant={variant} label="Working" />)
    expect(screen.getByText('Working')).toBeInTheDocument()
  })
})

describe('StatCard', () => {
  it('renders label and value', () => {
    renderWithTheme(<StatCard icon={PlayArrow} iconColor="red" label="Score" value={12} />)
    expect(screen.getByText('Score', { selector: 'p' })).toBeInTheDocument()
    expect(screen.getByText('12')).toBeInTheDocument()
  })
})

describe('Text', () => {
  it('renders animated gradient text', () => {
    renderWithTheme(<Text animated gradient>Copy</Text>)
    expect(screen.getByText('Copy')).toBeInTheDocument()
  })
})
