import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { ArrowLeft, ArrowsClockwise, Plug, Users, WifiHigh } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'

interface MultiplayerProps {
  onBack: () => void
}

interface Server {
  id: string
  name: string
  map: string
  players: number
  maxPlayers: number
  ping: number
  mode: string
  region: string
}

export function Multiplayer({ onBack }: MultiplayerProps) {
  const [servers, setServers] = useState<Server[]>([])
  const [selectedServer, setSelectedServer] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const generateServers = () => {
    const serverNames = [
      'Alpha Squad HQ',
      'Bravo Battalion',
      'Delta Force Arena',
      'Echo Combat Zone',
      'Foxtrot Stronghold',
      'Ghost Division',
    ]
    
    const maps = ['Aegis Station', 'Outpost Zero', 'Nexus Core', 'Meridian City']
    const modes = ['Team Deathmatch', 'Capture the Flag', 'Domination']
    const regions = ['US East', 'US West', 'EU', 'Asia']

    return serverNames.map((name, i) => ({
      id: `server-${i}`,
      name,
      map: maps[Math.floor(Math.random() * maps.length)],
      players: Math.floor(Math.random() * 20) + 5,
      maxPlayers: 24,
      ping: Math.floor(Math.random() * 80) + 20,
      mode: modes[Math.floor(Math.random() * modes.length)],
      region: regions[Math.floor(Math.random() * regions.length)],
    }))
  }

  useEffect(() => {
    setServers(generateServers())
  }, [])

  const handleRefresh = () => {
    setLoading(true)
    toast.info('Refreshing server list...')
    setTimeout(() => {
      setServers(generateServers())
      setLoading(false)
      toast.success('Servers updated')
    }, 1000)
  }

  const handleJoin = () => {
    if (!selectedServer) {
      toast.error('Select a server to join')
      return
    }
    toast.success('Connecting to server...')
    setTimeout(() => {
      toast.success('Connection established!')
    }, 1500)
  }

  const filteredServers = servers.filter(
    (server) =>
      server.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      server.map.toLowerCase().includes(searchQuery.toLowerCase())
  )

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
              <h1 className="text-6xl font-black tracking-tight mb-4">Multiplayer</h1>
              <p className="text-muted-foreground text-lg">
                Join active battles worldwide
              </p>
            </div>
            <Button
              size="lg"
              variant="outline"
              onClick={handleRefresh}
              disabled={loading}
              className="h-14 px-8"
            >
              <ArrowsClockwise
                size={24}
                weight="bold"
                className={loading ? 'animate-spin' : ''}
              />
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Input
                placeholder="Search servers or maps..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-14 text-lg glass-panel"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-3 max-h-[600px] overflow-y-auto pr-2"
            >
              {filteredServers.map((server, index) => (
                <motion.div
                  key={server.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                >
                  <Card
                    className={`p-5 cursor-pointer transition-all duration-300 hover:scale-[1.01] ${
                      selectedServer === server.id
                        ? 'glow-border bg-primary/10'
                        : 'glass-panel hover:border-primary/50'
                    }`}
                    onClick={() => setSelectedServer(server.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold">{server.name}</h3>
                          <Badge
                            variant={server.ping < 50 ? 'default' : 'secondary'}
                            className="flex items-center gap-1"
                          >
                            <WifiHigh size={14} weight="bold" />
                            {server.ping}ms
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{server.map}</span>
                          <span>•</span>
                          <span>{server.mode}</span>
                          <span>•</span>
                          <Badge variant="outline" className="text-xs">
                            {server.region}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users size={20} weight="bold" />
                        <span className="text-lg font-bold">
                          {server.players}/{server.maxPlayers}
                        </span>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-panel p-6 rounded-xl space-y-6 sticky top-8"
            >
              <div>
                <h2 className="text-2xl font-bold mb-4">Server Info</h2>
                {selectedServer ? (
                  <div className="space-y-3 text-sm">
                    {(() => {
                      const server = servers.find((s) => s.id === selectedServer)
                      return server ? (
                        <>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Name:</span>
                            <span className="font-bold">{server.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Map:</span>
                            <span className="font-bold">{server.map}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Mode:</span>
                            <span className="font-bold">{server.mode}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Region:</span>
                            <span className="font-bold">{server.region}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Players:</span>
                            <span className="font-bold">
                              {server.players}/{server.maxPlayers}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Ping:</span>
                            <span className="font-bold">{server.ping}ms</span>
                          </div>
                        </>
                      ) : null
                    })()}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm">
                    Select a server to view details
                  </p>
                )}
              </div>

              <div className="pt-6 border-t border-border">
                <Button
                  size="lg"
                  className="w-full h-16 text-xl font-bold"
                  onClick={handleJoin}
                  disabled={!selectedServer}
                >
                  <Plug className="mr-2" size={24} weight="bold" />
                  Join Server
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
