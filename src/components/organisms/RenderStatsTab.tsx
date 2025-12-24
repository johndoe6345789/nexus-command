import { Card, CardContent, Stack, Typography, Chip } from '@mui/material'
import { Eye } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { SystemStats } from '@/types'

interface RenderStatsTabProps {
  systemStats: SystemStats
}

export function RenderStatsTab({ systemStats }: RenderStatsTabProps) {
  return (
    <motion.div
      key="render"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
    >
      <Card>
        <CardContent sx={{ p: 4 }}>
          <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 4 }}>
            <Eye size={32} weight="duotone" color="#4ade80" />
            <Typography variant="h4">Render Stats</Typography>
          </Stack>
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography color="text.secondary">Triangles</Typography>
              <Chip label={systemStats.triangles} color="primary" />
            </Stack>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography color="text.secondary">Active Shaders</Typography>
              <Chip label={systemStats.shaders} color="primary" />
            </Stack>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography color="text.secondary">Loaded Textures</Typography>
              <Chip label={systemStats.textures} color="primary" />
            </Stack>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography color="text.secondary">Session Uptime</Typography>
              <Chip label={systemStats.uptime} color="primary" />
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </motion.div>
  )
}
