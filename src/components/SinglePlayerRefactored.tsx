import { useState } from 'react'
import { Grid } from '@mui/material'
import { PageContainer } from './atoms/PageContainer'
import { BackButton } from './atoms/BackButton'
import { ContentCard } from './atoms/ContentCard'
import { PageHeader } from './atoms/PageHeader'
import { MapSelectionGrid } from './organisms/MapSelectionGrid'
import { MissionControlPanel } from './organisms/MissionControlPanel'
import { Difficulty } from '@/types'
import { maps, difficulties } from '@/data'
import { SinglePlayerProps } from './props'
import { handleMissionStart } from '@/handlers'

export function SinglePlayer({ onBack }: SinglePlayerProps) {
  const [selectedMap, setSelectedMap] = useState<string | null>(null)
  const [difficulty, setDifficulty] = useState<Difficulty>('veteran')
  const [loading, setLoading] = useState(false)

  const handleStart = () => {
    handleMissionStart(selectedMap, setLoading)
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
