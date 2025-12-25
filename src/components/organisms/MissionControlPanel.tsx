import { Play, CircleNotch } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { DifficultySelector } from '../molecules/DifficultySelector'
import { Paper, Button } from '@mui/material'

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
      <Paper sx={{ p: 3 }}>
        <div className="space-y-6">
          <h3 className="font-heading text-2xl font-bold text-foreground">
            Difficulty
          </h3>
          <DifficultySelector
            difficulties={difficulties}
            selected={selectedDifficulty}
            onSelect={onSelectDifficulty}
          />

          <div className="pt-4 border-t border-border">
            <Button
              size="large"
              onClick={onStart}
              disabled={!selectedMap || loading}
              fullWidth
              variant="contained"
              sx={{ height: '64px', fontSize: '1.125rem', fontFamily: 'var(--font-heading)', gap: 1 }}
            >
              {loading ? (
                <>
                  <CircleNotch size={24} className="animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  <Play size={24} weight="fill" />
                  Start Mission
                </>
              )}
            </Button>
          </div>

          {selectedMap && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-2 text-sm text-muted-foreground"
            >
              <div className="flex justify-between">
                <span>Map:</span>
                <span className="font-semibold text-foreground">{mapName}</span>
              </div>
              <div className="flex justify-between">
                <span>Difficulty:</span>
                <span className="font-semibold text-foreground">{selectedDifficultyData?.label}</span>
              </div>
              <div className="flex justify-between">
                <span>AI Bots:</span>
                <span className="font-semibold text-foreground">Enabled</span>
              </div>
            </motion.div>
          )}
        </div>
      </Paper>
    </motion.div>
  )
}
