import { Play } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { DifficultySelector } from '../molecules/DifficultySelector'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

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
        <CardContent className="p-6 space-y-6">
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
              size="lg"
              onClick={onStart}
              disabled={!selectedMap || loading}
              className="w-full h-16 text-lg font-heading gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="h-6 w-6 animate-spin" />
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
        </CardContent>
      </Card>
    </motion.div>
  )
}
