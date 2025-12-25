import { motion } from 'framer-motion'
import { ServerCard } from '../molecules/ServerCard'
import { Server } from '@/types'
import { filterServers } from '@/utils'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'

interface ServerListProps {
  servers: Server[]
  selectedServer: string | null
  onSelectServer: (id: string) => void
  searchQuery: string
  onSearchChange: (query: string) => void
}

export function ServerList({
  servers,
  selectedServer,
  onSelectServer,
  searchQuery,
  onSearchChange,
}: ServerListProps) {
  const filteredServers = filterServers(servers, searchQuery)

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Input
          placeholder="Search servers or maps..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="mb-4 h-12"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <ScrollArea className="h-[600px]">
          <div className="space-y-3 pr-4">
            {filteredServers.map((server, index) => (
              <ServerCard
                key={server.id}
                {...server}
                selected={selectedServer === server.id}
                onSelect={onSelectServer}
                delay={0.3 + index * 0.05}
              />
            ))}
          </div>
        </ScrollArea>
      </motion.div>
    </>
  )
}
