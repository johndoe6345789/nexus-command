import { EmojiEvents, GpsFixed, MyLocation, Dangerous } from '@mui/icons-material'
import { motion } from 'framer-motion'
import { useKV } from '@/hooks/useKV'
import { useState } from 'react'
import { PageContainer } from './atoms/PageContainer'
import { BackButton } from './atoms/BackButton'
import { ContentCard } from './atoms/ContentCard'
import { PageHeader } from './atoms/PageHeader'
import { StatCard } from './atoms/StatCard'
import { MatchHistoryCard } from './molecules/MatchHistoryCard'
import { PullToRefresh } from './atoms/PullToRefresh'
import { MatchResult } from '@/types'
import { calculateKD, calculateWinRate } from '@/utils'
import { PlayerStatsProps } from './props'
import { Paper, Box } from '@mui/material'

export function PlayerStats({ onBack }: PlayerStatsProps) {
  const [playerName] = useKV<string>('player-name', 'Operator')
  const [refreshKey, setRefreshKey] = useState(0)

  const stats = {
    kills: 1247,
    deaths: 523,
    wins: 142,
    losses: 89,
    accuracy: 68,
    headshots: 412,
  }

  const kd = calculateKD(stats.kills, stats.deaths)
  const winRate = calculateWinRate(stats.wins, stats.losses)

  const recentMatches: MatchResult[] = [
    { map: 'Aegis Station', mode: 'TDM', result: 'Victory' as const, score: '25-8', date: '2h ago' },
    { map: 'Outpost Zero', mode: 'CTF', result: 'Victory' as const, score: '18-12', date: '5h ago' },
    { map: 'Nexus Core', mode: 'DOM', result: 'Defeat' as const, score: '12-15', date: '1d ago' },
    { map: 'Meridian City', mode: 'TDM', result: 'Victory' as const, score: '31-9', date: '1d ago' },
  ]

  const handleRefreshMatches = async () => {
    await new Promise(resolve => setTimeout(resolve, 800))
    setRefreshKey(prev => prev + 1)
  }

  return (
    <PageContainer>
      <BackButton onBack={onBack} />
      <ContentCard>
        <PageHeader
          title="Profile"
          subtitle={`${playerName} • Level 42 • Elite Rank`}
          icon={EmojiEvents}
          iconColor="oklch(0.70 0.18 35)"
          iconTitle="Player Achievements"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <StatCard
              icon={GpsFixed}
              iconColor="oklch(0.75 0.20 220)"
              label="K/D Ratio"
              value={kd}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <StatCard
              icon={EmojiEvents}
              iconColor="oklch(0.70 0.18 35)"
              label="Win Rate"
              value={`${winRate}%`}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <StatCard
              icon={MyLocation}
              iconColor="#4ade80"
              label="Accuracy"
              value={`${stats.accuracy}%`}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <StatCard
              icon={Dangerous}
              iconColor="#f87171"
              label="Headshots"
              value={stats.headshots}
            />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-2"
          >
            <Paper sx={{ p: 3 }}>
              <h3 className="text-lg font-bold mb-4 font-[family-name:var(--font-heading)]">Recent Matches</h3>
              <PullToRefresh onRefresh={handleRefreshMatches}>
                <Box sx={{ height: '400px', overflowY: 'auto', pr: 2 }}>
                  <div key={refreshKey} className="space-y-3">
                    {recentMatches.map((match, index) => (
                      <MatchHistoryCard key={index} {...match} />
                    ))}
                  </div>
                </Box>
              </PullToRefresh>
            </Paper>
          </motion.div>
        </div>
      </ContentCard>
    </PageContainer>
  )
}
