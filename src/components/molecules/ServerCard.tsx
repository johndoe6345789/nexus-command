import { Users, WifiHigh } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'

interface ServerCardProps {
  id: string
  name: string
  map: string
  mode: string
  region: string
  players: number
  maxPlayers: number
  ping: number
  selected: boolean
  onSelect: (id: string) => void
  delay?: number
}

export function ServerCard({
  id,
  name,
  map,
  mode,
  region,
  players,
  maxPlayers,
  ping,
  selected,
  onSelect,
  delay = 0,
}: ServerCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
    >
      <Card
        className={cn(
          'cursor-pointer transition-all duration-300 hover:shadow-lg',
          selected 
            ? 'border-2 border-primary bg-gradient-to-br from-[oklch(0.75_0.20_220/0.05)] to-[oklch(0.70_0.18_35/0.05)]' 
            : 'border-border hover:border-primary/50'
        )}
        onClick={() => onSelect(id)}
      >
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <h6 className="font-heading text-base font-bold text-foreground truncate">
                  {name}
                </h6>
                <Badge 
                  variant={ping < 50 ? 'default' : 'secondary'}
                  className="flex items-center gap-1 flex-shrink-0"
                >
                  <WifiHigh size={14} weight="bold" />
                  {ping}ms
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
                <span>{map}</span>
                <span>•</span>
                <span>{mode}</span>
                <span>•</span>
                <Badge variant="outline" className="text-xs">
                  {region}
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground ml-4 flex-shrink-0">
              <Users size={24} weight="bold" />
              <span className="font-heading text-lg font-bold text-foreground">
                {players}/{maxPlayers}
              </span>
            </div>
          </div>
          <Progress 
            value={(players / maxPlayers) * 100} 
            className="mt-3 h-2"
          />
        </CardContent>
      </Card>
    </motion.div>
  )
}
