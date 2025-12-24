import { Card, CardContent, Stack, Typography } from '@mui/material'
import { Lightning } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { DebugToggle } from '../molecules/DebugToggle'

interface CheatCodesTabProps {
  godMode: boolean
  unlimitedAmmo: boolean
  noclip: boolean
  onGodModeChange: (value: boolean) => void
  onUnlimitedAmmoChange: (value: boolean) => void
  onNoclipChange: (value: boolean) => void
}

export function CheatCodesTab({
  godMode,
  unlimitedAmmo,
  noclip,
  onGodModeChange,
  onUnlimitedAmmoChange,
  onNoclipChange,
}: CheatCodesTabProps) {
  return (
    <motion.div
      key="cheats"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
    >
      <Card>
        <CardContent sx={{ p: 4 }}>
          <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 4 }}>
            <Lightning size={32} weight="duotone" color="#fbbf24" />
            <Typography variant="h4">Cheat Codes</Typography>
          </Stack>
          <Stack spacing={3}>
            <DebugToggle
              title="God Mode"
              description="Become invincible to all damage"
              checked={godMode}
              onChange={onGodModeChange}
            />
            <DebugToggle
              title="Unlimited Ammo"
              description="Never run out of ammunition"
              checked={unlimitedAmmo}
              onChange={onUnlimitedAmmoChange}
            />
            <DebugToggle
              title="No Clip"
              description="Fly through walls and terrain"
              checked={noclip}
              onChange={onNoclipChange}
            />
          </Stack>
        </CardContent>
      </Card>
    </motion.div>
  )
}
