import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Target, Crosshair, Skull, Trophy, Sword, Lightning } from '@phosphor-icons/react'
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
  const numericValue = typeof value === 'number' ? value : parseInt(value.toString().replace(/[^0-9]/g, '')) || 0

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

  const formattedValue = typeof value === 'string' && value.includes('%') 
    ? `${displayValue}%` 
    : typeof value === 'string' && value.includes('.')
    ? (displayValue / 100).toFixed(2)
    : typeof value === 'number' 
    ? displayValue 
    : value

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, type: "spring", stiffness: 100 }}
      whileHover={{ y: -4, scale: 1.02 }}
    >
      <Card className={`p-5 sm:p-7 glow-border ${color} relative overflow-hidden group bg-card/40 backdrop-blur-sm hover:bg-card/60 transition-all duration-300`}>
        <div className="relative z-10">
          <div className="flex items-center gap-2 sm:gap-3 mb-3">
            <div className={`p-2 rounded ${color.replace('text-', 'bg-')}/20 border border-current`}>
              <Icon size={24} weight="bold" className={`${color}`} />
            </div>
            <h3 className="font-black text-xs sm:text-sm text-muted-foreground tracking-widest">{label}</h3>
          </div>
          <div className="text-3xl sm:text-5xl font-black tabular-nums tracking-tight">
            {formattedValue}
          </div>
        </div>
        <div className="absolute -bottom-2 -right-2 opacity-5 group-hover:opacity-10 transition-opacity">
          <Icon size={120} weight="bold" className="sm:w-[160px] sm:h-[160px]" />
        </div>
        <motion.div
          className={`absolute bottom-0 left-0 right-0 h-1 ${color.replace('text-', 'bg-')}`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: delay + 0.3, duration: 0.5 }}
        />
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
    <div className="relative w-full min-h-screen p-4 md:p-8 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto w-full pb-12"
      >
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 sm:mb-12"
        >
          <div className="w-full sm:w-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black glow-text mb-2 tracking-tight">PLAYER STATS</h1>
            <p className="text-muted-foreground font-body tracking-widest text-sm sm:text-base flex items-center gap-2">
              <Sword size={16} weight="bold" className="text-accent" />
              CALLSIGN: <span className="text-accent font-black">{playerName}</span>
            </p>
          </div>
          <Button
            onClick={onBack}
            variant="outline"
            className="glow-border w-full sm:w-auto h-11 px-6"
          >
            <ArrowLeft size={20} weight="bold" className="mr-2" />
            BACK
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
          <StatCard
            icon={Crosshair}
            label="TOTAL KILLS"
            value={stats?.kills ?? 0}
            color="text-primary"
            delay={0.2}
          />
          <StatCard
            icon={Skull}
            label="TOTAL DEATHS"
            value={stats?.deaths ?? 0}
            color="text-destructive"
            delay={0.3}
          />
          <StatCard
            icon={Target}
            label="K/D RATIO"
            value={kd}
            color="text-accent"
            delay={0.4}
          />
          <StatCard
            icon={Trophy}
            label="WIN RATE"
            value={`${winRate}%`}
            color="text-primary"
            delay={0.5}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="p-6 sm:p-8 glow-border bg-card/40 backdrop-blur-sm">
              <h2 className="text-xl sm:text-2xl font-black mb-6 text-primary tracking-wide flex items-center gap-3">
                <span className="w-1 h-8 bg-accent"></span>
                RECENT MATCHES
              </h2>
              <div className="space-y-3">
                {recentMatches.map((match, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.08 }}
                  >
                    <div className="p-4 bg-card/60 rounded-lg glow-border hover:bg-card/80 transition-all duration-200 group">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="font-black text-sm sm:text-base flex items-center gap-2">
                            <Lightning size={14} weight="fill" className="text-accent" />
                            {match.map}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            <Badge variant="outline" className="text-xs font-bold border-primary/30">{match.mode}</Badge>
                          </div>
                        </div>
                        <div
                          className={`text-xs font-black px-3 py-1.5 rounded-md ${
                            match.result === 'Victory'
                              ? 'bg-primary/20 text-primary border border-primary/40'
                              : 'bg-destructive/20 text-destructive border border-destructive/40'
                          }`}
                        >
                          {match.result.toUpperCase()}
                        </div>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">SCORE: <span className="text-foreground font-black ml-1">{match.score}</span></span>
                        <span className="text-muted-foreground">K/D: <span className="text-accent font-black ml-1">{match.kd}</span></span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="p-6 sm:p-8 glow-border bg-card/40 backdrop-blur-sm">
              <h2 className="text-xl sm:text-2xl font-black mb-6 text-primary tracking-wide flex items-center gap-3">
                <span className="w-1 h-8 bg-accent"></span>
                WEAPON STATISTICS
              </h2>
              <div className="space-y-5">
                {weaponStats.map((weapon, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.08 }}
                  >
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-black text-sm sm:text-base tracking-wide">{weapon.name}</span>
                        <span className="text-xs text-muted-foreground bg-background/50 px-2 py-1 rounded">
                          {weapon.kills} kills
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-2.5 bg-secondary/30 rounded-full overflow-hidden border border-border/30">
                          <motion.div
                            className="h-full bg-gradient-to-r from-primary to-accent"
                            initial={{ width: 0 }}
                            animate={{ width: `${weapon.accuracy}%` }}
                            transition={{ delay: 0.8 + index * 0.1, duration: 0.8, ease: "easeOut" }}
                          />
                        </div>
                        <span className="text-sm font-black text-accent w-14 text-right tabular-nums">
                          {weapon.accuracy}%
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
