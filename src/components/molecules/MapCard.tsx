import { MapTrifold } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface MapCardProps {
  id: string
  name: string
  terrain: string
  players: string
  selected: boolean
  onSelect: (id: string) => void
  delay?: number
}

export function MapCard({ id, name, terrain, players, selected, onSelect, delay = 0 }: MapCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
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
          <div className="aspect-video bg-gradient-to-br from-[oklch(0.75_0.20_220/0.2)] to-[oklch(0.70_0.18_35/0.2)] rounded-lg mb-3 flex items-center justify-center">
            <MapTrifold size={64} weight="duotone" className="opacity-60" />
          </div>
          <h5 className="font-heading text-lg font-bold mb-2 text-foreground">
            {name}
          </h5>
          <div className="flex gap-2">
            <Badge variant="secondary">{terrain}</Badge>
            <Badge variant="outline">{players}</Badge>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
