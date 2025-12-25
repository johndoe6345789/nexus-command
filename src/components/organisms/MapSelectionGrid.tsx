import { MapTrifold } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { MapCard } from '../molecules/MapCard'

interface Map {
  id: string
  name: string
  terrain: string
  players: string
}

interface MapSelectionGridProps {
  maps: Map[]
  selectedMap: string | null
  onSelectMap: (id: string) => void
}

export function MapSelectionGrid({ maps, selectedMap, onSelectMap }: MapSelectionGridProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <div className="flex items-center gap-3 mb-4">
        <MapTrifold size={32} weight="bold" color="oklch(0.75 0.20 220)" />
        <h3 className="font-heading text-2xl font-bold text-foreground">Select Mission</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {maps.map((map, index) => (
          <MapCard
            key={map.id}
            id={map.id}
            name={map.name}
            terrain={map.terrain}
            players={map.players}
            selected={selectedMap === map.id}
            onSelect={onSelectMap}
            delay={0.2 + index * 0.1}
          />
        ))}
      </div>
    </motion.div>
  )
}
