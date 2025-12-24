import { Card, CardContent, Stack, Grid } from '@mui/material'
import { Trophy } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { useKV } from '@github/spark/hooks'
import { Crosshair, Target, Skull } from '@phosphor-icons/react'
import { PageContainer } from './atoms/PageContainer'
import { BackButton } from './atoms/BackButton'
import { ContentCard } from './atoms/ContentCard'
import { PageHeader } from './atoms/PageHeader'
import { StatCard } from './atoms/StatCard'
import { MatchHistoryCard } from './molecules/MatchHistoryCard'

interface PlayerStatsProps {
  onBack: () => void
}

export function PlayerStats({ onBack }: PlayerStatsProps) {
  const [playerName] = useKV<string>('player-name', 'Operator')

  const stats = {
    kills: 1247,
    deaths: 523,
    wins: 142,
    losses: 89,
    accuracy: 68,
    headshots: 412,
  }

  const kd = (stats.kills / stats.deaths).toFixed(2)
  const winRate = ((stats.wins / (stats.wins + stats.losses)) * 100).toFixed(1)

  const recentMatches = [
    { map: 'Aegis Station', mode: 'TDM', result: 'Victory' as const, score: '25-8', date: '2h ago' },
    { map: 'Outpost Zero', mode: 'CTF', result: 'Victory' as const, score: '18-12', date: '5h ago' },
    { map: 'Nexus Core', mode: 'DOM', result: 'Defeat' as const, score: '12-15', date: '1d ago' },
    { map: 'Meridian City', mode: 'TDM', result: 'Victory' as const, score: '31-9', date: '1d ago' },
  ]

  return (
    <PageContainer>
      <BackButton onBack={onBack} />
      <ContentCard>
        <PageHeader
          title="Profile"
          subtitle={`${playerName} • Level 42 • Elite Rank`}
          icon={Trophy}
          iconColor="oklch(0.70 0.18 35)"
        />

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <StatCard
                icon={Crosshair}
                iconColor="oklch(0.75 0.20 220)"
                label="K/D Ratio"
                value={kd}
              />
            </motion.div>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <StatCard
                icon={Trophy}
                iconColor="oklch(0.70 0.18 35)"
                label="Win Rate"
                value={`${winRate}%`}
              />
            </motion.div>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <StatCard
                icon={Target}
                iconColor="#4ade80"
                label="Accuracy"
                value={`${stats.accuracy}%`}
              />
            </motion.div>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <StatCard
                icon={Skull}
                iconColor="#f87171"
                label="Headshots"
                value={stats.headshots}
              />
            </motion.div>
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, lg: 6 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card>
                <CardContent sx={{ p: 4 }}>
                  <Stack spacing={2}>
                    {recentMatches.map((match, index) => (
                      <MatchHistoryCard key={index} {...match} />
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>
      </ContentCard>
    </PageContainer>
  )
}
