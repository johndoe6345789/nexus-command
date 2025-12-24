import { Card, CardContent, Box, Typography, Stack, Chip } from '@mui/material'
import { MapTrifold } from '@phosphor-icons/react'
import { motion } from 'framer-motion'

interface MapCardProps {
  id: string
  name: string
  terrain: string
  players: string
  selected: boolean
  onSelect: (id: string) => void
  delay?: number
}

export function MapCard({ id, name, terrain, players, selected, onSelect, delay = 0 }: MapCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <Card
        sx={{
          cursor: 'pointer',
          border: selected ? '2px solid' : '1px solid',
          borderColor: selected ? 'primary.main' : 'divider',
          bgcolor: 'background.paper',
          backgroundImage: selected
            ? 'linear-gradient(135deg, oklch(0.75 0.20 220 / 0.05), oklch(0.70 0.18 35 / 0.05))'
            : 'none',
          transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
        onClick={() => onSelect(id)}
      >
        <CardContent>
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
            <MapTrifold size={64} weight="duotone" style={{ opacity: 0.6 }} />
          </Box>
          <Typography variant="h5" sx={{ mb: 1 }}>
            {name}
          </Typography>
          <Stack direction="row" spacing={1}>
            <Chip label={terrain} size="small" />
            <Chip label={players} size="small" variant="outlined" />
          </Stack>
        </CardContent>
      </Card>
    </motion.div>
  )
}
