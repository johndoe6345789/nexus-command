import { useState } from 'react'
import { Grid } from '@mui/material'
import { toast } from 'sonner'
import { PageContainer } from './atoms/PageContainer'
import { BackButton } from './atoms/BackButton'
import { ContentCard } from './atoms/ContentCard'
import { PageHeader } from './atoms/PageHeader'
import { MapSelectionGrid } from './organisms/MapSelectionGrid'
import { MissionControlPanel } from './organisms/MissionControlPanel'

interface SinglePlayerProps {
  onBack: () => void
}

type Difficulty = 'recruit' | 'veteran' | 'elite' | 'legendary'

const maps = [
  { id: 'aegis', name: 'Aegis Station', terrain: 'Space Station', players: '8-16' },
  { id: 'outpost', name: 'Outpost Zero', terrain: 'Arctic Base', players: '4-12' },
  { id: 'nexus', name: 'Nexus Core', terrain: 'Industrial', players: '12-24' },
  { id: 'meridian', name: 'Meridian City', terrain: 'Urban', players: '16-32' },
]

const difficulties = [
  { id: 'recruit' as Difficulty, label: 'Recruit', color: '#4ade80' },
  { id: 'veteran' as Difficulty, label: 'Veteran', color: '#60a5fa' },
  { id: 'elite' as Difficulty, label: 'Elite', color: '#fb923c' },
  { id: 'legendary' as Difficulty, label: 'Legendary', color: '#f87171' },
]

export function SinglePlayer({ onBack }: SinglePlayerProps) {
  const [selectedMap, setSelectedMap] = useState<string | null>(null)
  const [difficulty, setDifficulty] = useState<Difficulty>('veteran')
  const [loading, setLoading] = useState(false)

  const handleStart = () => {
    if (!selectedMap) {
      toast.error('Select a map to continue')
      return
    }
    setLoading(true)
    toast.success('Initializing combat simulation...')
    setTimeout(() => {
      setLoading(false)
      toast.success('Mission started!')
    }, 2000)
  }

  return (
    <PageContainer>
      <BackButton onBack={onBack} />
      <ContentCard>
        <PageHeader title="Campaign" subtitle="Select your battlefield and difficulty" />
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, lg: 8 }}>
            <MapSelectionGrid
              maps={maps}
              selectedMap={selectedMap}
              onSelectMap={setSelectedMap}
            />
          </Grid>
          <Grid size={{ xs: 12, lg: 4 }}>
            <MissionControlPanel
              difficulties={difficulties}
              selectedDifficulty={difficulty}
              onSelectDifficulty={(id) => setDifficulty(id as Difficulty)}
              selectedMap={selectedMap}
              mapName={maps.find(m => m.id === selectedMap)?.name}
              onStart={handleStart}
              loading={loading}
            />
          </Grid>
        </Grid>
      </ContentCard>
    </PageContainer>
  )
}
