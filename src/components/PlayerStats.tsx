import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Trophy, Crosshair, Target, Skull } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { useKV } from '@github/spark/hooks'

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
    longestKillStreak: 23,
    playtime: '127h 32m',
  }

  const kd = (stats.kills / stats.deaths).toFixed(2)
  const winRate = ((stats.wins / (stats.wins + stats.losses)) * 100).toFixed(1)

  const recentMatches = [
    { map: 'Aegis Station', mode: 'TDM', result: 'Victory', score: '25-8', date: '2h ago' },
    { map: 'Outpost Zero', mode: 'CTF', result: 'Victory', score: '18-12', date: '5h ago' },
    { map: 'Nexus Core', mode: 'DOM', result: 'Defeat', score: '12-15', date: '1d ago' },
    { map: 'Meridian City', mode: 'TDM', result: 'Victory', score: '31-9', date: '1d ago' },
  ]

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-12"
        >
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-6 hover:bg-secondary/50"
          >
            <ArrowLeft className="mr-2" size={20} weight="bold" />
            Back to Menu
          </Button>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-6xl font-black tracking-tight mb-4">Profile</h1>
              <p className="text-muted-foreground text-lg">
                {playerName} • Level 42 • Elite Rank
              </p>
            </div>
            <Trophy size={64} weight="duotone" className="text-accent" />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-6 glass-panel hover:glow-border transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-primary/20">
                  <Crosshair size={32} weight="bold" className="text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">K/D Ratio</p>
                  <p className="text-3xl font-black">{kd}</p>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6 glass-panel hover:glow-border transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-accent/20">
                  <Trophy size={32} weight="bold" className="text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Win Rate</p>
                  <p className="text-3xl font-black">{winRate}%</p>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-6 glass-panel hover:glow-border transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-green-500/20">
                  <Target size={32} weight="bold" className="text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Accuracy</p>
                  <p className="text-3xl font-black">{stats.accuracy}%</p>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-6 glass-panel hover:glow-border transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-red-500/20">
                  <Skull size={32} weight="bold" className="text-red-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Headshots</p>
                  <p className="text-3xl font-black">{stats.headshots}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="p-8 glass-panel">
              <h2 className="text-2xl font-bold mb-6">Combat Stats</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total Kills</span>
                  <span className="text-2xl font-bold">{stats.kills}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total Deaths</span>
                  <span className="text-2xl font-bold">{stats.deaths}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Victories</span>
                  <span className="text-2xl font-bold">{stats.wins}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Defeats</span>
                  <span className="text-2xl font-bold">{stats.losses}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Best Kill Streak</span>
                  <span className="text-2xl font-bold">{stats.longestKillStreak}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total Playtime</span>
                  <span className="text-2xl font-bold">{stats.playtime}</span>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="p-8 glass-panel">
              <h2 className="text-2xl font-bold mb-6">Recent Matches</h2>
              <div className="space-y-4">
                {recentMatches.map((match, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 hover:bg-secondary/70 transition-colors"
                  >
                    <div>
                      <div className="font-bold">{match.map}</div>
                      <div className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {match.mode}
                        </Badge>
                        <span>{match.date}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant={match.result === 'Victory' ? 'default' : 'destructive'}
                        className="mb-2"
                      >
                        {match.result}
                      </Badge>
                      <div className="text-sm text-muted-foreground">{match.score}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
