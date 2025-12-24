import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Play, Skull, Robot } from '@phosphor-icons/react'
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
            <div className="flex items-center gap-4 mb-4">
              <div className="w-1.5 h-16 bg-gradient-to-b from-primary via-accent to-primary rounded-full shadow-lg shadow-primary/50" />
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-black glow-text tracking-tight">SINGLE PLAYER</h1>
            </div>
            <p className="text-muted-foreground font-body tracking-[0.15em] text-sm sm:text-base flex items-center gap-3 ml-6">
              <Skull size={20} weight="bold" className="text-accent" />
              COMBAT SIMULATION • AI TRAINING MODE
            </p>
          </div>
          <Button
            onClick={onBack}
            variant="outline"
            className="glow-border w-full sm:w-auto h-14 px-10 font-black text-base hover:scale-[1.05] active:scale-95 hover:bg-primary/15 hover:border-primary hover:shadow-[0_0_30px_rgba(99,102,241,0.3)] transition-all duration-300 backdrop-blur-md"
          >
            <ArrowLeft size={22} weight="bold" className="mr-3" />
            RETURN
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-14"
        >
          <Card className="p-8 sm:p-12 glow-border w-full glass-effect hover:shadow-[0_0_35px_rgba(99,102,241,0.25)] transition-all duration-400">
            <h2 className="text-2xl sm:text-3xl font-black mb-10 text-primary tracking-wide flex items-center gap-4">
              <div className="p-3 bg-primary/20 rounded-md">
                <Skull size={32} weight="bold" />
              </div>
              <span>DIFFICULTY PROTOCOL</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
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
                      h-28 sm:h-32 font-black tracking-[0.1em] text-base sm:text-lg w-full
                      flex flex-col gap-4 relative overflow-hidden group
                      ${selectedDifficulty === diff.id ? 'glow-accent glass-effect border-accent shadow-[0_0_35px_rgba(245,166,35,0.35)]' : 'glow-border glass-effect hover:bg-card/80'}
                      ${selectedDifficulty === diff.id ? diff.color : 'text-muted-foreground'}
                      hover:scale-[1.05] active:scale-95 transition-all duration-300
                    `}
                  >
                    <span className="text-xl opacity-70">{diff.icon}</span>
                    <span>{diff.label}</span>
                    {selectedDifficulty === diff.id && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-accent/20 to-transparent pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </Button>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-10 pt-10 border-t border-border/50">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-primary mb-2 flex items-center gap-2">
                    <Robot size={20} weight="bold" />
                    BOT COUNT
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">Number of AI opponents in match</p>
                </div>
                <div className="flex items-center gap-4">
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-10 w-10 p-0 glow-border font-black text-lg hover:bg-accent/10 hover:border-accent hover:scale-110 active:scale-95 transition-all duration-200"
                    onClick={() => setBotCount(Math.max(1, botCount - 1))}
                  >
                    −
                  </Button>
                  <span className="text-3xl sm:text-4xl font-black text-accent w-16 text-center tabular-nums">
                    {botCount}
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-10 w-10 p-0 glow-border font-black text-lg hover:bg-accent/10 hover:border-accent hover:scale-110 active:scale-95 transition-all duration-200"
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
          className="mb-14"
        >
          <div className="flex items-center gap-4 mb-10">
            <div className="w-1.5 h-12 bg-gradient-to-b from-accent via-primary to-accent rounded-full shadow-lg shadow-accent/50" />
            <h2 className="text-2xl sm:text-3xl font-black text-primary tracking-wide">ARENA SELECTION</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-9">
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
                    p-7 sm:p-8 cursor-pointer transition-all duration-400 relative overflow-hidden group
                    ${selectedMap === map.id ? 'glow-accent glass-effect border-accent border-[3px] shadow-[0_0_40px_rgba(245,166,35,0.4)]' : 'glow-border glass-effect hover:bg-card/90 hover:border-primary/60 hover:shadow-[0_0_25px_rgba(99,102,241,0.25)]'}
                  `}
                  onClick={() => setSelectedMap(map.id)}
                >
                  <div className={`aspect-video bg-gradient-to-br ${map.gradient} mb-6 rounded-lg relative overflow-hidden border-2 ${selectedMap === map.id ? 'border-accent/60' : 'border-border/40'} transition-all duration-300 shadow-lg`}>
                    <div 
                      className="absolute inset-0 opacity-20" 
                      style={{
                        backgroundImage: `
                          repeating-linear-gradient(0deg, transparent, transparent 10px, oklch(0.68 0.28 245 / 0.2) 10px, oklch(0.68 0.28 245 / 0.2) 11px),
                          repeating-linear-gradient(90deg, transparent, transparent 10px, oklch(0.68 0.28 245 / 0.2) 10px, oklch(0.68 0.28 245 / 0.2) 11px)
                        `,
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-5xl sm:text-6xl font-black text-primary/20 group-hover:text-primary/50 transition-all duration-400">
                        {map.id.toUpperCase()}
                      </span>
                    </div>
                    {selectedMap === map.id && (
                      <>
                        <motion.div
                          className="absolute top-4 right-4 flex items-center gap-2 bg-accent/90 backdrop-blur-sm px-4 py-2 rounded-full"
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        >
                          <div className="w-2.5 h-2.5 bg-accent-foreground rounded-full animate-pulse" />
                          <span className="text-accent-foreground text-xs font-black tracking-wider">SELECTED</span>
                        </motion.div>
                        <motion.div
                          className="absolute inset-0 border-4 border-accent pointer-events-none"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: [0, 1, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                      </>
                    )}
                  </div>
                  <h3 className="font-black text-xl sm:text-2xl mb-5 tracking-[0.05em]">{map.name}</h3>
                  <div className="flex gap-4 flex-wrap">
                    <Badge variant="secondary" className="text-xs sm:text-sm font-bold px-4 py-1.5">{map.type}</Badge>
                    <Badge variant="outline" className="text-xs sm:text-sm font-bold px-4 py-1.5 border-primary/40">{map.size}</Badge>
                  </div>
                  
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-accent to-transparent shadow-[0_0_20px_rgba(245,166,35,0.8)]"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: selectedMap === map.id ? 1 : 0 }}
                    transition={{ duration: 0.4 }}
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
              w-full sm:w-auto px-20 sm:px-28 h-20 sm:h-24 text-2xl sm:text-3xl font-black tracking-[0.15em]
              ${!selectedMap || isLoading ? 'opacity-50 cursor-not-allowed' : 'glow-accent hover:scale-[1.06] active:scale-[0.97]'}
              transition-all duration-300 relative overflow-hidden group glass-effect border-[3px] border-accent shadow-[0_0_50px_rgba(245,166,35,0.5)]
            `}
            size="lg"
          >
            {!selectedMap && !isLoading && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/40 to-accent/0"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
              />
            )}
            <span className="relative z-10 flex items-center gap-5">
              <Play size={38} weight="fill" className={isLoading ? 'animate-pulse' : ''} />
              {isLoading ? 'INITIALIZING...' : 'ENGAGE'}
            </span>
            {!isLoading && selectedMap && (
              <motion.div
                className="absolute inset-0 bg-accent/20"
                animate={{
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            )}
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}
