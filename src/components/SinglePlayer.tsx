import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Play } from '@phosphor-icons/react'
import { useState } from 'react'
import { toast } from 'sonner'

interface SinglePlayerProps {
  onBack: () => void
}

const maps = [
  { id: 'dm1', name: 'REACTOR CORE', type: 'Deathmatch', size: 'Medium' },
  { id: 'dm2', name: 'VOID STATION', type: 'Deathmatch', size: 'Large' },
  { id: 'dm3', name: 'STEEL NEXUS', type: 'Deathmatch', size: 'Small' },
  { id: 'ctf1', name: 'SECTOR 7', type: 'Capture the Flag', size: 'Large' },
  { id: 'dm4', name: 'CRIMSON HALLS', type: 'Deathmatch', size: 'Medium' },
  { id: 'dm5', name: 'ORBITAL DECAY', type: 'Deathmatch', size: 'Medium' },
]

const difficulties = [
  { id: 'easy', label: 'EASY', color: 'text-green-400' },
  { id: 'medium', label: 'MEDIUM', color: 'text-yellow-400' },
  { id: 'hard', label: 'HARD', color: 'text-orange-400' },
  { id: 'nightmare', label: 'NIGHTMARE', color: 'text-destructive' },
]

export function SinglePlayer({ onBack }: SinglePlayerProps) {
  const [selectedMap, setSelectedMap] = useState<string | null>(null)
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('medium')
  const [isLoading, setIsLoading] = useState(false)

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
        className="max-w-7xl mx-auto w-full"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8">
          <div className="w-full sm:w-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black glow-text mb-2">SINGLE PLAYER</h1>
            <p className="text-muted-foreground font-body tracking-wider text-sm sm:text-base">TRAIN AGAINST AI OPPONENTS</p>
          </div>
          <Button
            onClick={onBack}
            variant="outline"
            className="glow-border w-full sm:w-auto"
          >
            <ArrowLeft size={20} weight="bold" className="mr-2" />
            BACK
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Card className="p-4 sm:p-6 glow-border w-full">
            <h2 className="text-lg sm:text-xl font-bold mb-4 text-primary">SELECT DIFFICULTY</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
              {difficulties.map((diff) => (
                <Button
                  key={diff.id}
                  onClick={() => setSelectedDifficulty(diff.id)}
                  variant={selectedDifficulty === diff.id ? 'default' : 'outline'}
                  className={`
                    h-10 sm:h-12 font-bold tracking-wider text-xs sm:text-base
                    ${selectedDifficulty === diff.id ? 'glow-accent' : 'glow-border'}
                    ${diff.color}
                  `}
                >
                  {diff.label}
                </Button>
              ))}
            </div>
          </Card>
        </div>

        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-primary">SELECT MAP</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {maps.map((map, index) => (
              <motion.div
                key={map.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card
                  className={`
                    p-4 cursor-pointer transition-all duration-200 relative overflow-hidden
                    ${selectedMap === map.id ? 'glow-accent' : 'glow-border hover:bg-card/80'}
                  `}
                  onClick={() => setSelectedMap(map.id)}
                >
                  <div className="aspect-video bg-gradient-to-br from-secondary to-background mb-3 rounded flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-grid opacity-20" 
                      style={{
                        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 10px, oklch(0.65 0.25 250 / 0.2) 10px, oklch(0.65 0.25 250 / 0.2) 11px)',
                      }}
                    />
                    <span className="text-2xl sm:text-4xl font-black text-primary/30">{map.id.toUpperCase()}</span>
                  </div>
                  <h3 className="font-bold text-base sm:text-lg mb-2">{map.name}</h3>
                  <div className="flex gap-2 flex-wrap">
                    <Badge variant="secondary" className="text-xs">{map.type}</Badge>
                    <Badge variant="outline" className="text-xs">{map.size}</Badge>
                  </div>
                  {selectedMap === map.id && (
                    <motion.div
                      className="absolute top-2 right-2"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                    >
                      <div className="w-3 h-3 bg-accent rounded-full animate-pulse" />
                    </motion.div>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex justify-center pb-8">
          <Button
            onClick={handleStartMatch}
            disabled={!selectedMap || isLoading}
            className="w-full sm:w-auto px-8 sm:px-12 h-12 sm:h-14 text-base sm:text-lg font-bold glow-accent"
            size="lg"
          >
            <Play size={24} weight="bold" className="mr-2" />
            {isLoading ? 'LOADING...' : 'START MATCH'}
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
