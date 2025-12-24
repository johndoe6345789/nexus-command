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
    <div className="relative w-full min-h-screen p-4 sm:p-6 md:p-8 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto w-full pb-16 sm:pb-20"
      >
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 mb-10 sm:mb-14"
        >
          <div className="w-full sm:w-auto">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black glow-text mb-3 tracking-tight">SINGLE PLAYER</h1>
            <p className="text-muted-foreground font-body tracking-widest text-sm sm:text-base flex items-center gap-2">
              <Skull size={18} weight="bold" className="text-accent" />
              TRAIN AGAINST AI OPPONENTS
            </p>
          </div>
          <Button
            onClick={onBack}
            variant="outline"
            className="glow-border w-full sm:w-auto h-12 px-8 font-bold hover:scale-105 transition-transform"
          >
            <ArrowLeft size={20} weight="bold" className="mr-2" />
            BACK
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-10"
        >
          <Card className="p-6 sm:p-10 glow-border w-full bg-card/50 backdrop-blur-md">
            <h2 className="text-2xl sm:text-3xl font-black mb-8 text-primary tracking-wide">DIFFICULTY SETTING</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
                      h-20 sm:h-24 font-black tracking-wider text-sm sm:text-base w-full
                      flex flex-col gap-2
                      ${selectedDifficulty === diff.id ? 'glow-accent bg-accent/20 border-accent' : 'glow-border bg-card/60'}
                      ${selectedDifficulty === diff.id ? diff.color : 'text-muted-foreground'}
                      hover:scale-105 transition-all duration-200
                    `}
                  >
                    <span className="text-base opacity-70">{diff.icon}</span>
                    <span>{diff.label}</span>
                  </Button>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-8 pt-8 border-t border-border/50">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-primary mb-2">BOT COUNT</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">Number of AI opponents in match</p>
                </div>
                <div className="flex items-center gap-4">
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-10 w-10 p-0 glow-border font-black text-lg"
                    onClick={() => setBotCount(Math.max(1, botCount - 1))}
                  >
                    −
                  </Button>
                  <span className="text-3xl sm:text-4xl font-black text-accent w-16 text-center tabular-nums">{botCount}</span>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-10 w-10 p-0 glow-border font-black text-lg"
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
          className="mb-10"
        >
          <h2 className="text-2xl sm:text-3xl font-black mb-8 text-primary tracking-wide flex items-center gap-4">
            <span className="w-2 h-10 bg-accent rounded"></span>
            MAP SELECTION
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7">
            {maps.map((map, index) => (
              <motion.div
                key={map.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.08 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
              >
                <Card
                  className={`
                    p-6 cursor-pointer transition-all duration-300 relative overflow-hidden group
                    ${selectedMap === map.id ? 'glow-accent bg-accent/10 border-accent border-2' : 'glow-border hover:bg-card/80 hover:border-primary/50'}
                  `}
                  onClick={() => setSelectedMap(map.id)}
                >
                  <div className={`aspect-video bg-gradient-to-br ${map.gradient} mb-5 rounded-md relative overflow-hidden border-2 border-border/50`}>
                    <div 
                      className="absolute inset-0 opacity-30" 
                      style={{
                        backgroundImage: `
                          repeating-linear-gradient(0deg, transparent, transparent 8px, oklch(0.65 0.25 250 / 0.15) 8px, oklch(0.65 0.25 250 / 0.15) 9px),
                          repeating-linear-gradient(90deg, transparent, transparent 8px, oklch(0.65 0.25 250 / 0.15) 8px, oklch(0.65 0.25 250 / 0.15) 9px)
                        `,
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-4xl sm:text-5xl font-black text-primary/20 group-hover:text-primary/40 transition-colors duration-300">
                        {map.id.toUpperCase()}
                      </span>
                    </div>
                    {selectedMap === map.id && (
                      <motion.div
                        className="absolute top-4 right-4 flex gap-1.5"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                      >
                        <div className="w-3 h-3 bg-accent rounded-full animate-pulse shadow-lg shadow-accent/50" />
                        <div className="w-3 h-3 bg-accent rounded-full animate-pulse shadow-lg shadow-accent/50" style={{ animationDelay: '0.2s' }} />
                      </motion.div>
                    )}
                  </div>
                  <h3 className="font-black text-xl sm:text-2xl mb-4 tracking-wide">{map.name}</h3>
                  <div className="flex gap-3 flex-wrap">
                    <Badge variant="secondary" className="text-xs sm:text-sm font-bold px-3 py-1.5">{map.type}</Badge>
                    <Badge variant="outline" className="text-xs sm:text-sm font-bold px-3 py-1.5 border-primary/30">{map.size}</Badge>
                  </div>
                  
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1.5 bg-accent shadow-lg shadow-accent/50"
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
              w-full sm:w-auto px-16 sm:px-20 h-16 sm:h-20 text-xl sm:text-2xl font-black tracking-wider
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
            <span className="relative z-10 flex items-center gap-4">
              <Play size={32} weight="fill" />
              {isLoading ? 'INITIALIZING...' : 'START MATCH'}
            </span>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}
