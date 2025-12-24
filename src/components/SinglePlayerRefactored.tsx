import { useState } from 'react'
import { TwoColumnLayout } from './templates'
import { MapSelector, DifficultySelector } from './organisms'
import { GlassCard, ActionButton } from './molecules'
import { Text } from './atoms'
import { Play } from '@phosphor-icons/react'
import { CircularProgress, Box, Stack } from '@mui/material'
import { motion } from 'framer-motion'
import { toast } from 'sonner'

interface SinglePlayerRefactoredProps {
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

export function SinglePlayerRefactored({ onBack }: SinglePlayerRefactoredProps) {
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

  const selectedMapData = maps.find(m => m.id === selectedMap)
  const selectedDifficultyData = difficulties.find(d => d.id === difficulty)

  return (
    <TwoColumnLayout
      title="Campaign"
      subtitle="Select your battlefield and difficulty"
      onBack={onBack}
      leftColumn={
        <MapSelector
          maps={maps}
          selectedMap={selectedMap}
          onSelectMap={setSelectedMap}
        />
      }
      rightColumn={
        <GlassCard hoverable={false}>
          <Stack spacing={4}>
            <DifficultySelector
              difficulties={difficulties}
              selectedDifficulty={difficulty}
              onSelectDifficulty={setDifficulty as (id: string) => void}
            />

            <Box sx={{ pt: 3, borderTop: 1, borderColor: 'divider' }}>
              <ActionButton
                variant="contained"
                size="large"
                fullWidth
                onClick={handleStart}
                disabled={!selectedMap || loading}
                icon={Play}
                iconWeight="fill"
                sx={{ height: '64px', fontSize: '1.25rem' }}
              >
                {loading ? <CircularProgress size={20} /> : 'Start Mission'}
              </ActionButton>
            </Box>

            {selectedMap && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Stack spacing={1} sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>
                  <Text variant="body2">
                    <strong>Map:</strong> {selectedMapData?.name}
                  </Text>
                  <Text variant="body2">
                    <strong>Difficulty:</strong> {selectedDifficultyData?.label}
                  </Text>
                  <Text variant="body2">
                    <strong>AI Bots:</strong> Enabled
                  </Text>
                </Stack>
              </motion.div>
            )}
          </Stack>
        </GlassCard>
      }
    />
  )
}
