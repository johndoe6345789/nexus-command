import { Stack, TextField } from '@mui/material'
import { motion } from 'framer-motion'
import { ServerCard } from '../molecules/ServerCard'

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
  const filteredServers = servers.filter(
    (server) =>
      server.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      server.map.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <TextField
          placeholder="Search servers or maps..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          fullWidth
          sx={{ mb: 3 }}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Stack spacing={2} sx={{ maxHeight: '600px', overflowY: 'auto', pr: 1 }}>
          {filteredServers.map((server, index) => (
            <ServerCard
              key={server.id}
              {...server}
              selected={selectedServer === server.id}
              onSelect={onSelectServer}
              delay={0.3 + index * 0.05}
            />
          ))}
        </Stack>
      </motion.div>
    </>
  )
}
