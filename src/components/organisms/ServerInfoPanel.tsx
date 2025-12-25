import { Plug } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface Server {
  id: string
  name: string
  map: string
  mode: string
  region: string
  players: number
  maxPlayers: number
  ping: number
}

interface ServerInfoPanelProps {
  server: Server | undefined
  onJoin: () => void
}

export function ServerInfoPanel({ server, onJoin }: ServerInfoPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
    >
      <Card className="sticky top-8">
        <CardContent className="p-6 space-y-6">
          <h3 className="font-heading text-2xl font-bold text-foreground">
            Server Info
          </h3>
          {server ? (
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Name:</span>
                <span className="font-semibold text-foreground">{server.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Map:</span>
                <span className="font-semibold text-foreground">{server.map}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Mode:</span>
                <span className="font-semibold text-foreground">{server.mode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Region:</span>
                <span className="font-semibold text-foreground">{server.region}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Players:</span>
                <span className="font-semibold text-foreground">
                  {server.players}/{server.maxPlayers}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Ping:</span>
                <span className="font-semibold text-foreground">{server.ping}ms</span>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Select a server to view details
            </p>
          )}

          <div className="pt-4 border-t border-border">
            <Button
              size="lg"
              onClick={onJoin}
              disabled={!server}
              className="w-full h-16 text-lg font-heading gap-2"
            >
              <Plug size={24} weight="bold" />
              Join Server
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
