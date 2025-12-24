import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Play, Skull } from '@phosphor-icons/react'
import { useState } from 'react'
import { toast } from 'sonner'

interface SinglePlayerProps {
  onBack: () => void
}

const maps = [
  { id: 'dm1', name: 'REACTOR CORE', type: 'Deathmatch', size: 'Medium', gradient: 'from-orange-500/20 via-red-500/20 to-yellow-500/20' },
  { id: 'dm2', name: 'VOID STATION', type: 'Deathmatch', size: 'Large', gradient: 'from-purple-500/20 via-blue-500/20 to-indigo-500/20' },
  { id: 'dm3', name: 'STEEL NEXUS', type: 'Deathmatch', size: 'Small', gradient: 'from-slate-500/20 via-gray-500/20 to-zinc-500/20' },
  { id: 'ctf1', name: 'SECTOR 7', type: 'Capture the Flag', size: 'Large', gradient: 'from-green-500/20 via-emerald-500/20 to-teal-500/20' },
  { id: 'dm4', name: 'CRIMSON HALLS', type: 'Deathmatch', size: 'Medium', gradient: 'from-red-600/20 via-rose-600/20 to-pink-600/20' },
  { id: 'dm5', name: 'ORBITAL DECAY', type: 'Deathmatch', size: 'Medium', gradient: 'from-cyan-500/20 via-sky-500/20 to-blue-500/20' },
]

const difficulties = [
  { id: 'easy', label: 'EASY', color: 'text-green-400', icon: '◆' },
  { id: 'medium', label: 'MEDIUM', color: 'text-yellow-400', icon: '◆◆' },
  { id: 'hard', label: 'HARD', color: 'text-orange-400', icon: '◆◆◆' },
  { id: 'nightmare', label: 'NIGHTMARE', color: 'text-destructive', icon: '◆◆◆◆' },
]

export function SinglePlayer({ onBack }: SinglePlayerProps) {
  const [selectedMap, setSelectedMap] = useState<string | null>(null)
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('medium')
  const [isLoading, setIsLoading] = useState(false)
  const [botCount, setBotCount] = useState(8)

  const handleStartMatch = () => {
    if (!selectedMap) {
      toast.error('SELECT A MAP TO CONTINUE')
      return
    }

    setIsLoading(true)
    toast.success('INITIALIZING COMBAT SIMULATION')
    
    setTimeout(() => {
      setIsLoading(false)
      toast.info('MATCH LOADED - COMBAT READY')
    }, 2000)
  }

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
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black glow-text mb-2 tracking-tight">SINGLE PLAYER</h1>
            <p className="text-muted-foreground font-body tracking-widest text-sm sm:text-base flex items-center gap-2">
              <Skull size={16} weight="bold" className="text-accent" />
              TRAIN AGAINST AI OPPONENTS
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Card className="p-6 sm:p-8 glow-border w-full bg-card/40 backdrop-blur-sm">
            <h2 className="text-xl sm:text-2xl font-black mb-6 text-primary tracking-wide">DIFFICULTY SETTING</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              {difficulties.map((diff, index) => (
                <motion.div
                  key={diff.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                >
                  <Button
                    onClick={() => setSelectedDifficulty(diff.id)}
                    variant={selectedDifficulty === diff.id ? 'default' : 'outline'}
                    className={`
                      h-16 sm:h-20 font-black tracking-wider text-sm sm:text-base w-full
                      flex flex-col gap-1
                      ${selectedDifficulty === diff.id ? 'glow-accent bg-accent/20 border-accent' : 'glow-border bg-card/60'}
                      ${selectedDifficulty === diff.id ? diff.color : 'text-muted-foreground'}
                      hover:scale-105 transition-all duration-200
                    `}
                  >
                    <span className="text-xs opacity-70">{diff.icon}</span>
                    <span>{diff.label}</span>
                  </Button>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-6 pt-6 border-t border-border/50">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-primary mb-1">BOT COUNT</h3>
                  <p className="text-xs text-muted-foreground">Number of AI opponents</p>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8 w-8 p-0 glow-border"
                    onClick={() => setBotCount(Math.max(1, botCount - 1))}
                  >
                    −
                  </Button>
                  <span className="text-2xl font-black text-accent w-12 text-center tabular-nums">{botCount}</span>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8 w-8 p-0 glow-border"
                    onClick={() => setBotCount(Math.min(15, botCount + 1))}
                  >
                    +
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-2xl sm:text-3xl font-black mb-6 text-primary tracking-wide flex items-center gap-3">
            <span className="w-1 h-8 bg-accent"></span>
            MAP SELECTION
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {maps.map((map, index) => (
              <motion.div
                key={map.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.08 }}
                whileHover={{ y: -4 }}
              >
                <Card
                  className={`
                    p-5 cursor-pointer transition-all duration-300 relative overflow-hidden group
                    ${selectedMap === map.id ? 'glow-accent bg-accent/10 border-accent' : 'glow-border hover:bg-card/80 hover:border-primary/50'}
                  `}
                  onClick={() => setSelectedMap(map.id)}
                >
                  <div className={`aspect-video bg-gradient-to-br ${map.gradient} mb-4 rounded relative overflow-hidden border border-border/50`}>
                    <div 
                      className="absolute inset-0 opacity-30" 
                      style={{
                        backgroundImage: `
                          repeating-linear-gradient(0deg, transparent, transparent 8px, oklch(0.65 0.25 250 / 0.15) 8px, oklch(0.65 0.25 250 / 0.15) 9px),
                          repeating-linear-gradient(90deg, transparent, transparent 8px, oklch(0.65 0.25 250 / 0.15) 8px, oklch(0.65 0.25 250 / 0.15) 9px)
                        `,
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-4xl sm:text-5xl font-black text-primary/20 group-hover:text-primary/40 transition-colors">
                        {map.id.toUpperCase()}
                      </span>
                    </div>
                    {selectedMap === map.id && (
                      <motion.div
                        className="absolute top-3 right-3 flex gap-1"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                      >
                        <div className="w-3 h-3 bg-accent rounded-full animate-pulse shadow-lg shadow-accent/50" />
                        <div className="w-3 h-3 bg-accent rounded-full animate-pulse shadow-lg shadow-accent/50" style={{ animationDelay: '0.2s' }} />
                      </motion.div>
                    )}
                  </div>
                  <h3 className="font-black text-lg sm:text-xl mb-3 tracking-wide">{map.name}</h3>
                  <div className="flex gap-2 flex-wrap">
                    <Badge variant="secondary" className="text-xs font-bold px-2 py-1">{map.type}</Badge>
                    <Badge variant="outline" className="text-xs font-bold px-2 py-1 border-primary/30">{map.size}</Badge>
                  </div>
                  
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1 bg-accent"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: selectedMap === map.id ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex justify-center"
        >
          <Button
            onClick={handleStartMatch}
            disabled={!selectedMap || isLoading}
            className={`
              w-full sm:w-auto px-12 sm:px-16 h-14 sm:h-16 text-lg sm:text-xl font-black tracking-wider
              ${!selectedMap || isLoading ? 'opacity-50' : 'glow-accent hover:scale-105'}
              transition-all duration-200 relative overflow-hidden group
            `}
            size="lg"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/30 to-accent/0"
              animate={{ x: ['-100%', '200%'] }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            />
            <span className="relative z-10 flex items-center gap-3">
              <Play size={28} weight="fill" />
              {isLoading ? 'INITIALIZING...' : 'START MATCH'}
            </span>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}
