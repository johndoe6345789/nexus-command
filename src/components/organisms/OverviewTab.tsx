import { Grid } from '@mui/material'
import { ShowChart, FlashOn, Storage, BugReport } from '@mui/icons-material'
import { motion } from 'framer-motion'
import { StatCard } from '../atoms/StatCard'
import { SystemStats } from '@/types'

interface OverviewTabProps {
  systemStats: SystemStats
}

export function OverviewTab({ systemStats }: OverviewTabProps) {
  return (
    <motion.div
      key="overview"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
    >
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard icon={ShowChart} iconColor="oklch(0.75 0.20 220)" label="FPS" value={systemStats.fps} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard icon={FlashOn} iconColor="#4ade80" label="Ping" value={`${systemStats.ping}ms`} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard icon={Storage} iconColor="#fbbf24" label="Memory" value={systemStats.memoryUsage} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard icon={BugReport} iconColor="#8b5cf6" label="Draw Calls" value={systemStats.drawCalls} />
        </Grid>
      </Grid>
    </motion.div>
  )
}
