import { Grid, Stack, Typography } from '@mui/material'
import { MapTrifold } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { MapCard } from '../molecules/MapCard'

interface Map {
  id: string
  name: string
  terrain: string
  players: string
}

interface MapSelectionGridProps {
  maps: Map[]
  selectedMap: string | null
  onSelectMap: (id: string) => void
}

export function MapSelectionGrid({ maps, selectedMap, onSelectMap }: MapSelectionGridProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
        <MapTrifold size={32} weight="bold" color="oklch(0.75 0.20 220)" />
        <Typography variant="h4">Select Mission</Typography>
      </Stack>
      <Grid container spacing={3}>
        {maps.map((map, index) => (
          <Grid size={{ xs: 12, sm: 6 }} key={map.id}>
            <MapCard
              id={map.id}
              name={map.name}
              terrain={map.terrain}
              players={map.players}
              selected={selectedMap === map.id}
              onSelect={onSelectMap}
              delay={0.2 + index * 0.1}
            />
          </Grid>
        ))}
      </Grid>
    </motion.div>
  )
}
