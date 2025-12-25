import { motion } from 'framer-motion'
import { TextField, Box, Stack } from '@mui/material'
import { ServerCard } from '../molecules/ServerCard'
import { Server } from '@/types'
import { filterServers } from '@/utils'
import { PullToRefresh } from '@/components/atoms/PullToRefresh'

interface ServerListProps {
  servers: Server[]
  selectedServer: string | null
  onSelectServer: (id: string) => void
  searchQuery: string
  onSearchChange: (query: string) => void
  onRefresh?: () => Promise<void> | void
}

export function ServerList({
  servers,
  selectedServer,
  onSelectServer,
  searchQuery,
  onSearchChange,
  onRefresh,
}: ServerListProps) {
  const filteredServers = filterServers(servers, searchQuery)

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <TextField
          fullWidth
          placeholder="Search servers or maps..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          sx={{ mb: 2 }}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <PullToRefresh onRefresh={onRefresh || (() => {})} enabled={!!onRefresh}>
          <Box sx={{ maxHeight: 600, overflowY: 'auto', pr: 2 }}>
            <Stack spacing={1.5}>
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
          </Box>
        </PullToRefresh>
      </motion.div>
    </>
  )
}
