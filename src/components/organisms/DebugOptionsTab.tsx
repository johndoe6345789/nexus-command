import { Card, CardContent, Stack, Typography } from '@mui/material'
import { Gear } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { DebugToggle } from '../molecules/DebugToggle'

interface DebugOptionsTabProps {
  debugMode: boolean
  showFPS: boolean
  showHitboxes: boolean
  onDebugModeChange: (value: boolean) => void
  onShowFPSChange: (value: boolean) => void
  onShowHitboxesChange: (value: boolean) => void
}

export function DebugOptionsTab({
  debugMode,
  showFPS,
  showHitboxes,
  onDebugModeChange,
  onShowFPSChange,
  onShowHitboxesChange,
}: DebugOptionsTabProps) {
  return (
    <motion.div
      key="debug"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
    >
      <Card>
        <CardContent sx={{ p: 4 }}>
          <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 4 }}>
            <Gear size={32} weight="duotone" color="oklch(0.75 0.20 220)" />
            <Typography variant="h4">Debug Options</Typography>
          </Stack>
          <Stack spacing={3}>
            <DebugToggle
              title="Debug Mode"
              description="Enable advanced debugging features"
              checked={debugMode}
              onChange={onDebugModeChange}
            />
            <DebugToggle
              title="Show FPS Counter"
              description="Display real-time frame rate information"
              checked={showFPS}
              onChange={onShowFPSChange}
            />
            <DebugToggle
              title="Show Hitboxes"
              description="Render collision boundaries for all entities"
              checked={showHitboxes}
              onChange={onShowHitboxesChange}
            />
          </Stack>
        </CardContent>
      </Card>
    </motion.div>
  )
}
