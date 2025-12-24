import { Grid, Box } from '@mui/material'
import { GlassCard } from '../molecules'
import { Text, Icon } from '../atoms'
import { Icon as PhosphorIcon, MapTrifold } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { Chip, Stack } from '@mui/material'

interface MapOption {
  id: string
  name: string
  terrain: string
  players: string
}

interface MapSelectorProps {
  maps: MapOption[]
  selectedMap: string | null
  onSelectMap: (mapId: string) => void
  icon?: PhosphorIcon
}

export function MapSelector({ maps, selectedMap, onSelectMap, icon = MapTrifold }: MapSelectorProps) {
  return (
    <Box>
      <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
        <Icon icon={icon} size={32} weight="bold" style={{ color: 'oklch(0.75 0.20 220)' }} />
        <Text variant="h4">Select Mission</Text>
      </Stack>
      <Grid container spacing={3}>
        {maps.map((map, index) => (
          <Grid size={{ xs: 12, sm: 6 }} key={map.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <GlassCard
                selected={selectedMap === map.id}
                onClick={() => onSelectMap(map.id)}
                sx={{ height: '100%' }}
              >
                <Box
                  sx={{
                    aspectRatio: '16/9',
                    background: 'linear-gradient(135deg, oklch(0.75 0.20 220 / 0.2), oklch(0.70 0.18 35 / 0.2))',
                    borderRadius: 2,
                    mb: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Icon icon={MapTrifold} size={64} weight="duotone" style={{ opacity: 0.6 }} />
                </Box>
                <Text variant="h5" sx={{ mb: 1 }}>
                  {map.name}
                </Text>
                <Stack direction="row" spacing={1}>
                  <Chip label={map.terrain} size="small" />
                  <Chip label={map.players} size="small" variant="outlined" />
                </Stack>
              </GlassCard>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
