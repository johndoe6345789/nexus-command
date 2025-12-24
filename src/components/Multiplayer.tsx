import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, ArrowsClockwise, Play } from '@phosphor-icons/react'
import { useState } from 'react'
import { toast } from 'sonner'
import { ScrollArea } from '@/components/ui/scroll-area'

interface MultiplayerProps {
  onBack: () => void
}

interface Server {
  id: string
  name: string
  map: string
  mode: string
  players: number
  maxPlayers: number
  ping: number
}

const initialServers: Server[] = [
  { id: '1', name: 'ALPHA SQUADRON HQ', map: 'Reactor Core', mode: 'DM', players: 12, maxPlayers: 16, ping: 23 },
  { id: '2', name: 'EURO COMBAT ZONE', map: 'Void Station', mode: 'CTF', players: 8, maxPlayers: 12, ping: 45 },
  { id: '3', name: 'US WEST ARENA', map: 'Steel Nexus', mode: 'DM', players: 15, maxPlayers: 16, ping: 67 },
  { id: '4', name: 'TOKYO DEATHMATCH', map: 'Crimson Halls', mode: 'DM', players: 10, maxPlayers: 12, ping: 112 },
  { id: '5', name: 'AUSSIE WARRIORS', map: 'Orbital Decay', mode: 'TDM', players: 6, maxPlayers: 16, ping: 203 },
  { id: '6', name: 'BRAZIL CTF SERVER', map: 'Sector 7', mode: 'CTF', players: 4, maxPlayers: 12, ping: 156 },
  { id: '7', name: 'RUSSIAN FRONTLINE', map: 'Void Station', mode: 'DM', players: 14, maxPlayers: 16, ping: 89 },
  { id: '8', name: 'UK ELITE CORPS', map: 'Reactor Core', mode: 'TDM', players: 11, maxPlayers: 12, ping: 34 },
]

export function Multiplayer({ onBack }: MultiplayerProps) {
  const [servers, setServers] = useState<Server[]>(initialServers)
  const [selectedServer, setSelectedServer] = useState<string | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    toast.info('SCANNING FOR SERVERS...')
    
    setTimeout(() => {
      const randomizedServers = servers.map(s => ({
        ...s,
        players: Math.floor(Math.random() * s.maxPlayers),
        ping: s.ping + Math.floor(Math.random() * 20 - 10),
      }))
      setServers(randomizedServers)
      setIsRefreshing(false)
      toast.success('SERVER LIST UPDATED')
    }, 1500)
  }

  const handleJoinServer = () => {
    if (!selectedServer) {
      toast.error('SELECT A SERVER TO CONTINUE')
      return
    }

    setIsConnecting(true)
    const server = servers.find(s => s.id === selectedServer)
    toast.info(`CONNECTING TO ${server?.name}...`)
    
    setTimeout(() => {
      setIsConnecting(false)
      toast.success('CONNECTION ESTABLISHED')
    }, 2000)
  }

  const getPingColor = (ping: number) => {
    if (ping < 50) return 'text-green-400'
    if (ping < 100) return 'text-yellow-400'
    return 'text-destructive'
  }

  const getPlayerColor = (players: number, max: number) => {
    const ratio = players / max
    if (ratio > 0.8) return 'text-accent'
    if (ratio > 0.5) return 'text-primary'
    return 'text-muted-foreground'
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
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black glow-text mb-2">MULTIPLAYER</h1>
            <p className="text-muted-foreground font-body tracking-wider text-sm sm:text-base">JOIN ONLINE COMBAT</p>
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <Button
              onClick={handleRefresh}
              disabled={isRefreshing}
              variant="outline"
              className="glow-border flex-1 sm:flex-none"
            >
              <ArrowsClockwise 
                size={20} 
                weight="bold" 
                className={`mr-2 ${isRefreshing ? 'animate-spin' : ''}`}
              />
              <span className="hidden sm:inline">REFRESH</span>
            </Button>
            <Button
              onClick={onBack}
              variant="outline"
              className="glow-border flex-1 sm:flex-none"
            >
              <ArrowLeft size={20} weight="bold" className="mr-2" />
              BACK
            </Button>
          </div>
        </div>

        <Card className="p-3 sm:p-6 glow-border mb-6">
          <div className="hidden md:grid grid-cols-12 gap-4 text-xs sm:text-sm font-bold text-muted-foreground mb-3 px-4">
            <div className="col-span-4">SERVER NAME</div>
            <div className="col-span-2">MAP</div>
            <div className="col-span-1">MODE</div>
            <div className="col-span-2">PLAYERS</div>
            <div className="col-span-1">PING</div>
          </div>

          <ScrollArea className="h-[400px] sm:h-[500px] w-full">
            <div className="space-y-2 pr-2">
              {servers.map((server, index) => (
                <motion.div
                  key={server.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03 }}
                >
                  <Card
                    className={`
                      p-3 sm:p-4 cursor-pointer transition-all duration-200
                      ${selectedServer === server.id ? 'glow-accent' : 'glow-border hover:bg-card/80'}
                    `}
                    onClick={() => setSelectedServer(server.id)}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 items-center">
                      <div className="col-span-1 md:col-span-4 font-bold text-sm sm:text-base">{server.name}</div>
                      <div className="col-span-1 md:col-span-2 text-xs sm:text-sm text-muted-foreground">{server.map}</div>
                      <div className="col-span-1 md:col-span-1">
                        <Badge variant="secondary" className="text-xs">{server.mode}</Badge>
                      </div>
                      <div className={`col-span-1 md:col-span-2 font-bold text-sm sm:text-base ${getPlayerColor(server.players, server.maxPlayers)}`}>
                        {server.players}/{server.maxPlayers}
                      </div>
                      <div className={`col-span-1 md:col-span-1 font-bold tabular-nums text-sm sm:text-base ${getPingColor(server.ping)}`}>
                        {server.ping}
                      </div>
                      <div className="col-span-1 md:col-span-2 flex justify-end">
                        {selectedServer === server.id && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-3 h-3 bg-accent rounded-full animate-pulse"
                          />
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </ScrollArea>
        </Card>

        <div className="flex justify-center pb-8">
          <Button
            onClick={handleJoinServer}
            disabled={!selectedServer || isConnecting}
            className="w-full sm:w-auto px-8 sm:px-12 h-12 sm:h-14 text-base sm:text-lg font-bold glow-accent"
            size="lg"
          >
            <Play size={24} weight="bold" className="mr-2" />
            {isConnecting ? 'CONNECTING...' : 'JOIN SERVER'}
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
