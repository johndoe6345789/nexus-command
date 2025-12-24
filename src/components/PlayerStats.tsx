import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowLeft, Target, Crosshair, Skull, Trophy } from '@phosphor-icons/react'
import { useKV } from '@github/spark/hooks'
import { useEffect, useState } from 'react'

interface PlayerStatsProps {
  onBack: () => void
}

interface StatCardProps {
  icon: React.ElementType
  label: string
  value: string | number
  color: string
  delay: number
}

function StatCard({ icon: Icon, label, value, color, delay }: StatCardProps) {
  const [displayValue, setDisplayValue] = useState(0)
  const numericValue = typeof value === 'number' ? value : parseInt(value) || 0

  useEffect(() => {
    const duration = 1000
    const steps = 60
    const increment = numericValue / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= numericValue) {
        setDisplayValue(numericValue)
        clearInterval(timer)
      } else {
        setDisplayValue(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [numericValue])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <Card className={`p-6 glow-border ${color} relative overflow-hidden`}>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <Icon size={28} weight="bold" className={color} />
            <h3 className="font-bold text-sm text-muted-foreground">{label}</h3>
          </div>
          <div className="text-4xl font-black tabular-nums">
            {typeof value === 'number' ? displayValue : value}
          </div>
        </div>
        <div className="absolute top-0 right-0 opacity-5">
          <Icon size={120} weight="bold" />
        </div>
      </Card>
    </motion.div>
  )
}

export function PlayerStats({ onBack }: PlayerStatsProps) {
  const [playerName] = useKV<string>('player-name', 'WARRIOR')
  const [stats] = useKV<{
    kills: number
    deaths: number
    matches: number
    wins: number
  }>('player-stats', {
    kills: 1847,
    deaths: 923,
    matches: 156,
    wins: 89,
  })

  const kd = stats ? (stats.kills / Math.max(stats.deaths, 1)).toFixed(2) : '0.00'
  const winRate = stats ? Math.round((stats.wins / Math.max(stats.matches, 1)) * 100) : 0

  const recentMatches = [
    { map: 'Reactor Core', mode: 'DM', score: 32, result: 'Victory', kd: 2.1 },
    { map: 'Void Station', mode: 'CTF', score: 18, result: 'Defeat', kd: 1.4 },
    { map: 'Steel Nexus', mode: 'DM', score: 28, result: 'Victory', kd: 1.8 },
    { map: 'Crimson Halls', mode: 'TDM', score: 24, result: 'Victory', kd: 2.3 },
    { map: 'Orbital Decay', mode: 'DM', score: 15, result: 'Defeat', kd: 0.9 },
  ]

  const weaponStats = [
    { name: 'RAILGUN', kills: 487, accuracy: 68 },
    { name: 'ROCKET LAUNCHER', kills: 423, accuracy: 54 },
    { name: 'LIGHTNING GUN', kills: 356, accuracy: 72 },
    { name: 'PLASMA GUN', kills: 298, accuracy: 61 },
    { name: 'SHOTGUN', kills: 283, accuracy: 45 },
  ]

  return (
    <div className="min-h-screen p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-black glow-text mb-2">PLAYER STATS</h1>
            <p className="text-muted-foreground font-body tracking-wider">
              CALLSIGN: {playerName}
            </p>
          </div>
          <Button
            onClick={onBack}
            variant="outline"
            className="glow-border"
          >
            <ArrowLeft size={20} weight="bold" className="mr-2" />
            BACK
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon={Crosshair}
            label="TOTAL KILLS"
            value={stats?.kills ?? 0}
            color="text-primary"
            delay={0.1}
          />
          <StatCard
            icon={Skull}
            label="TOTAL DEATHS"
            value={stats?.deaths ?? 0}
            color="text-destructive"
            delay={0.2}
          />
          <StatCard
            icon={Target}
            label="K/D RATIO"
            value={kd}
            color="text-accent"
            delay={0.3}
          />
          <StatCard
            icon={Trophy}
            label="WIN RATE"
            value={`${winRate}%`}
            color="text-primary"
            delay={0.4}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="p-6 glow-border">
              <h2 className="text-xl font-bold mb-4 text-primary">RECENT MATCHES</h2>
              <div className="space-y-3">
                {recentMatches.map((match, index) => (
                  <div
                    key={index}
                    className="p-3 bg-card/50 rounded glow-border"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="font-bold text-sm">{match.map}</div>
                        <div className="text-xs text-muted-foreground">{match.mode}</div>
                      </div>
                      <div
                        className={`text-xs font-bold px-2 py-1 rounded ${
                          match.result === 'Victory'
                            ? 'bg-primary/20 text-primary'
                            : 'bg-destructive/20 text-destructive'
                        }`}
                      >
                        {match.result}
                      </div>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Score: <span className="text-foreground font-bold">{match.score}</span></span>
                      <span className="text-muted-foreground">K/D: <span className="text-foreground font-bold">{match.kd}</span></span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="p-6 glow-border">
              <h2 className="text-xl font-bold mb-4 text-primary">WEAPON STATISTICS</h2>
              <div className="space-y-4">
                {weaponStats.map((weapon, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <span className="font-bold text-sm">{weapon.name}</span>
                      <span className="text-xs text-muted-foreground">{weapon.kills} kills</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-primary"
                          initial={{ width: 0 }}
                          animate={{ width: `${weapon.accuracy}%` }}
                          transition={{ delay: 0.7 + index * 0.1, duration: 0.8 }}
                        />
                      </div>
                      <span className="text-xs font-bold text-primary w-12 text-right tabular-nums">
                        {weapon.accuracy}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
