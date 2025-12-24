import { Card, CardContent, Stack, Box, Typography, Chip, LinearProgress } from '@mui/material'
import { Users, WifiHigh } from '@phosphor-icons/react'
import { motion } from 'framer-motion'

interface ServerCardProps {
  id: string
  name: string
  map: string
  mode: string
  region: string
  players: number
  maxPlayers: number
  ping: number
  selected: boolean
  onSelect: (id: string) => void
  delay?: number
}

export function ServerCard({
  id,
  name,
  map,
  mode,
  region,
  players,
  maxPlayers,
  ping,
  selected,
  onSelect,
  delay = 0,
}: ServerCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
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
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box sx={{ flex: 1 }}>
              <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 1 }}>
                <Typography variant="h6">{name}</Typography>
                <Chip
                  icon={<WifiHigh size={14} weight="bold" />}
                  label={`${ping}ms`}
                  size="small"
                  color={ping < 50 ? 'primary' : 'default'}
                />
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
                <Typography variant="body2">{map}</Typography>
                <Typography variant="body2">•</Typography>
                <Typography variant="body2">{mode}</Typography>
                <Typography variant="body2">•</Typography>
                <Chip label={region} size="small" variant="outlined" />
              </Stack>
            </Box>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ color: 'text.secondary' }}>
              <Users size={24} weight="bold" />
              <Typography variant="h6">
                {players}/{maxPlayers}
              </Typography>
            </Stack>
          </Stack>
          <LinearProgress
            variant="determinate"
            value={(players / maxPlayers) * 100}
            sx={{ mt: 2, height: 6, borderRadius: 1 }}
          />
        </CardContent>
      </Card>
    </motion.div>
  )
}
