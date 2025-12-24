import { Card, CardContent, Typography, Stack, Box, Button, CircularProgress } from '@mui/material'
import { Play } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { DifficultySelector } from '../molecules/DifficultySelector'

interface Difficulty {
  id: string
  label: string
  color: string
}

interface MissionControlPanelProps {
  difficulties: Difficulty[]
  selectedDifficulty: string
  onSelectDifficulty: (id: string) => void
  selectedMap: string | null
  mapName?: string
  onStart: () => void
  loading: boolean
}

export function MissionControlPanel({
  difficulties,
  selectedDifficulty,
  onSelectDifficulty,
  selectedMap,
  mapName,
  onStart,
  loading,
}: MissionControlPanelProps) {
  const selectedDifficultyData = difficulties.find(d => d.id === selectedDifficulty)
  
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
    >
      <Card>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" sx={{ mb: 3 }}>
            Difficulty
          </Typography>
          <DifficultySelector
            difficulties={difficulties}
            selected={selectedDifficulty}
            onSelect={onSelectDifficulty}
          />

          <Box sx={{ pt: 3, mb: 4, mt: 4, borderTop: 1, borderColor: 'divider' }}>
            <Button
              variant="contained"
              size="large"
              fullWidth
              onClick={onStart}
              disabled={!selectedMap || loading}
              startIcon={loading ? <CircularProgress size={20} /> : <Play size={24} weight="fill" />}
              sx={{ height: '64px', fontSize: '1.25rem' }}
            >
              {loading ? 'Loading...' : 'Start Mission'}
            </Button>
          </Box>

          {selectedMap && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Stack spacing={1} sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>
                <Typography variant="body2">
                  <strong>Map:</strong> {mapName}
                </Typography>
                <Typography variant="body2">
                  <strong>Difficulty:</strong> {selectedDifficultyData?.label}
                </Typography>
                <Typography variant="body2">
                  <strong>AI Bots:</strong> Enabled
                </Typography>
              </Stack>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
