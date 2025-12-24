import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, ArrowsClockwise, Play, Globe, Users } from '@phosphor-icons/react'
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

  const getPingBars = (ping: number) => {
    if (ping < 50) return 4
    if (ping < 100) return 3
    if (ping < 150) return 2
    return 1
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
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-black glow-text tracking-tight">MULTIPLAYER</h1>
            </div>
            <p className="text-muted-foreground font-body tracking-[0.15em] text-sm sm:text-base flex items-center gap-3 ml-6">
              <Globe size={20} weight="bold" className="text-accent" />
              ONLINE NETWORK • {servers.length} ACTIVE NODES
            </p>
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <Button
              onClick={handleRefresh}
              disabled={isRefreshing}
              variant="outline"
              className="glow-border flex-1 sm:flex-none h-14 px-8 sm:px-10 font-black text-base hover:scale-[1.05] active:scale-95 hover:bg-primary/15 hover:border-primary hover:shadow-[0_0_30px_rgba(99,102,241,0.3)] transition-all duration-300 backdrop-blur-md"
            >
              <ArrowsClockwise 
                size={22} 
                weight="bold" 
                className={`mr-3 ${isRefreshing ? 'animate-spin' : ''}`}
              />
              <span className="hidden sm:inline">SCAN</span>
            </Button>
            <Button
              onClick={onBack}
              variant="outline"
              className="glow-border flex-1 sm:flex-none h-14 px-8 sm:px-10 font-black text-base hover:scale-[1.05] active:scale-95 hover:bg-primary/15 hover:border-primary hover:shadow-[0_0_30px_rgba(99,102,241,0.3)] transition-all duration-300 backdrop-blur-md"
            >
              <ArrowLeft size={22} weight="bold" className="mr-3" />
              RETURN
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6 sm:p-10 glow-border mb-14 glass-effect hover:shadow-[0_0_35px_rgba(99,102,241,0.25)] transition-all duration-400">
            <div className="hidden lg:grid grid-cols-12 gap-4 text-xs font-black text-muted-foreground/70 mb-8 px-6 pb-6 border-b border-border/50">
              <div className="col-span-4">SERVER NAME</div>
              <div className="col-span-2">MAP</div>
              <div className="col-span-2">MODE</div>
              <div className="col-span-2">PLAYERS</div>
              <div className="col-span-2 text-right">CONNECTION</div>
            </div>

            <ScrollArea className="h-[500px] sm:h-[600px] w-full">
              <div className="space-y-5 pr-6">
                {servers.map((server, index) => (
                  <motion.div
                    key={server.id}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                    whileHover={{ x: 6, scale: 1.01, transition: { duration: 0.2 } }}
                  >
                    <Card
                      className={`
                        p-6 sm:p-7 cursor-pointer transition-all duration-400 relative overflow-hidden group
                        ${selectedServer === server.id 
                          ? 'glow-accent glass-effect border-accent border-[3px] shadow-[0_0_40px_rgba(245,166,35,0.4)]' 
                          : 'glow-border glass-effect hover:bg-card/90 hover:border-primary/60 hover:shadow-[0_0_25px_rgba(99,102,241,0.25)]'}
                      `}
                      onClick={() => setSelectedServer(server.id)}
                    >
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-5 items-center">
                        <div className="col-span-1 lg:col-span-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full ${selectedServer === server.id ? 'bg-accent' : 'bg-primary'} animate-pulse shadow-lg ${selectedServer === server.id ? 'shadow-accent/50' : 'shadow-primary/50'}`} />
                            <div>
                              <div className="font-black text-base sm:text-lg tracking-wide">{server.name}</div>
                              <div className="text-xs text-muted-foreground lg:hidden mt-1">{server.map} • {server.mode}</div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="col-span-1 lg:col-span-2 text-sm text-muted-foreground hidden lg:block font-bold">
                          {server.map}
                        </div>
                        
                        <div className="col-span-1 lg:col-span-2 hidden lg:block">
                          <Badge variant="secondary" className="text-xs font-black px-3 py-1.5">
                            {server.mode}
                          </Badge>
                        </div>
                        
                        <div className="col-span-1 lg:col-span-2">
                          <div className="flex items-center gap-3">
                            <Users size={20} weight="bold" className={getPlayerColor(server.players, server.maxPlayers)} />
                            <span className={`font-black text-lg tabular-nums ${getPlayerColor(server.players, server.maxPlayers)}`}>
                              {server.players}/{server.maxPlayers}
                            </span>
                          </div>
                          <div className="h-2 bg-secondary/30 rounded-full overflow-hidden mt-3">
                            <motion.div
                              className={`h-full ${getPlayerColor(server.players, server.maxPlayers).replace('text-', 'bg-')}`}
                              initial={{ width: 0 }}
                              animate={{ width: `${(server.players / server.maxPlayers) * 100}%` }}
                              transition={{ delay: 0.5 + index * 0.05, duration: 0.5 }}
                            />
                          </div>
                        </div>
                        
                        <div className="col-span-1 lg:col-span-2 flex lg:justify-end items-center gap-4">
                          <div className="flex gap-1">
                            {[...Array(4)].map((_, i) => (
                              <div
                                key={i}
                                className={`w-1.5 ${i < getPingBars(server.ping) ? getPingColor(server.ping).replace('text-', 'bg-') : 'bg-muted'} rounded-sm`}
                                style={{ height: `${(i + 1) * 5}px` }}
                              />
                            ))}
                          </div>
                          <span className={`font-black tabular-nums text-base ${getPingColor(server.ping)}`}>
                            {server.ping}ms
                          </span>
                        </div>
                      </div>
                      
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent shadow-lg shadow-accent/50"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: selectedServer === server.id ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                      />

                      {selectedServer === server.id && (
                        <motion.div
                          className="absolute top-4 right-4"
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        >
                          <div className="w-3 h-3 bg-accent rounded-full shadow-lg shadow-accent/50" />
                        </motion.div>
                      )}
                    </Card>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center"
        >
          <Button
            onClick={handleJoinServer}
            disabled={!selectedServer || isConnecting}
            className={`
              w-full sm:w-auto px-20 sm:px-28 h-20 sm:h-24 text-2xl sm:text-3xl font-black tracking-[0.15em]
              ${!selectedServer || isConnecting ? 'opacity-50 cursor-not-allowed' : 'glow-accent hover:scale-[1.06] active:scale-[0.97]'}
              transition-all duration-300 relative overflow-hidden glass-effect border-[3px] border-accent shadow-[0_0_50px_rgba(245,166,35,0.5)]
            `}
            size="lg"
          >
            {!selectedServer && !isConnecting && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/40 to-accent/0"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
              />
            )}
            <span className="relative z-10 flex items-center gap-5">
              <Play size={38} weight="fill" className={isConnecting ? 'animate-pulse' : ''} />
              {isConnecting ? 'CONNECTING...' : 'CONNECT'}
            </span>
            {!isConnecting && selectedServer && (
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
