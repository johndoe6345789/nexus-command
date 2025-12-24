import { useState, useEffect } from 'react'
import { Stack, Box, IconButton } from '@mui/material'
import { ArrowsClockwise } from '@phosphor-icons/react'
import { PageContainer } from './atoms/PageContainer'
import { BackButton } from './atoms/BackButton'
import { ContentCard } from './atoms/ContentCard'
import { PageHeader } from './atoms/PageHeader'
import { ServerList } from './organisms/ServerList'
import { ServerInfoPanel } from './organisms/ServerInfoPanel'
import { Server } from '@/types'
import { generateServers } from '@/utils'
import { MultiplayerProps } from './props'
import { handleServerRefresh, handleServerJoin } from '@/handlers'

export function Multiplayer({ onBack }: MultiplayerProps) {
  const [servers, setServers] = useState<Server[]>([])
  const [selectedServer, setSelectedServer] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    setServers(generateServers())
  }, [])

  const handleRefresh = () => {
    handleServerRefresh(setLoading, setServers)
  }

  const handleJoin = () => {
    handleServerJoin(selectedServer)
  }

  const selectedServerData = servers.find((s) => s.id === selectedServer)

  return (
    <PageContainer>
      <BackButton onBack={onBack} />
      <ContentCard>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 6 }}>
          <PageHeader title="Multiplayer" subtitle="Join active battles worldwide" />
          <IconButton
            size="large"
            onClick={handleRefresh}
            disabled={loading}
            sx={{
              border: 1,
              borderColor: 'divider',
              width: 56,
              height: 56,
            }}
          >
            <ArrowsClockwise
              size={28}
              weight="bold"
              className={loading ? 'animate-spin' : ''}
            />
          </IconButton>
        </Stack>

        <Stack direction={{ xs: 'column', lg: 'row' }} spacing={4}>
          <Box sx={{ flex: 2, minWidth: 0 }}>
            <ServerList
              servers={servers}
              selectedServer={selectedServer}
              onSelectServer={setSelectedServer}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          </Box>
          <Box sx={{ flex: 1, minWidth: 300 }}>
            <ServerInfoPanel
              server={selectedServerData}
              onJoin={handleJoin}
            />
          </Box>
        </Stack>
      </ContentCard>
    </PageContainer>
  )
}
