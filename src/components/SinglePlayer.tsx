import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Play, MapTrifold } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'

interface SinglePlayerProps {
  onBack: () => void
}

type Difficulty = 'recruit' | 'veteran' | 'elite' | 'legendary'

const maps = [
  { id: 'aegis', name: 'Aegis Station', terrain: 'Space Station', players: '8-16' },
  { id: 'outpost', name: 'Outpost Zero', terrain: 'Arctic Base', players: '4-12' },
  { id: 'nexus', name: 'Nexus Core', terrain: 'Industrial', players: '12-24' },
  { id: 'meridian', name: 'Meridian City', terrain: 'Urban', players: '16-32' },
]

const difficulties = [
  { id: 'recruit' as Difficulty, label: 'Recruit', color: 'text-green-400' },
  { id: 'veteran' as Difficulty, label: 'Veteran', color: 'text-blue-400' },
  { id: 'elite' as Difficulty, label: 'Elite', color: 'text-orange-400' },
  { id: 'legendary' as Difficulty, label: 'Legendary', color: 'text-red-400' },
]

export function SinglePlayer({ onBack }: SinglePlayerProps) {
  const [selectedMap, setSelectedMap] = useState<string | null>(null)
  const [difficulty, setDifficulty] = useState<Difficulty>('veteran')
  const [loading, setLoading] = useState(false)

  const handleStart = () => {
    if (!selectedMap) {
      toast.error('Select a map to continue')
      return
    }
    setLoading(true)
    toast.success('Initializing combat simulation...')
    setTimeout(() => {
      setLoading(false)
      toast.success('Mission started!')
    }, 2000)
  }

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

          <h1 className="text-6xl font-black tracking-tight mb-4">Campaign</h1>
          <p className="text-muted-foreground text-lg">
            Select your battlefield and difficulty
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <MapTrifold size={28} weight="bold" className="text-primary" />
                Select Mission
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {maps.map((map, index) => (
                  <motion.div
                    key={map.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                  >
                    <Card
                      className={`p-6 cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
                        selectedMap === map.id
                          ? 'glow-border bg-primary/10'
                          : 'glass-panel hover:border-primary/50'
                      }`}
                      onClick={() => setSelectedMap(map.id)}
                    >
                      <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg mb-4 flex items-center justify-center">
                        <MapTrifold size={48} weight="duotone" className="text-primary/60" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">{map.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Badge variant="secondary">{map.terrain}</Badge>
                        <Badge variant="outline">{map.players}</Badge>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-panel p-6 rounded-xl space-y-6"
            >
              <div>
                <h2 className="text-2xl font-bold mb-4">Difficulty</h2>
                <div className="space-y-3">
                  {difficulties.map((diff) => (
                    <Button
                      key={diff.id}
                      variant={difficulty === diff.id ? 'default' : 'outline'}
                      className="w-full justify-start text-lg h-14"
                      onClick={() => setDifficulty(diff.id)}
                    >
                      <span className={difficulty === diff.id ? '' : diff.color}>
                        {diff.label}
                      </span>
                    </Button>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-border">
                <Button
                  size="lg"
                  className="w-full h-16 text-xl font-bold"
                  onClick={handleStart}
                  disabled={!selectedMap || loading}
                >
                  {loading ? (
                    'Loading...'
                  ) : (
                    <>
                      <Play className="mr-2" size={24} weight="fill" />
                      Start Mission
                    </>
                  )}
                </Button>
              </div>

              {selectedMap && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-muted-foreground space-y-2"
                >
                  <p><strong>Map:</strong> {maps.find(m => m.id === selectedMap)?.name}</p>
                  <p><strong>Difficulty:</strong> {difficulties.find(d => d.id === difficulty)?.label}</p>
                  <p><strong>AI Bots:</strong> Enabled</p>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
