import { useState, useEffect } from 'react'
import { Refresh } from '@mui/icons-material'
import { IconButton, Box, Stack } from '@mui/material'
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

  const handleRefresh = async () => {
    await handleServerRefresh(setLoading, setServers)
  }

  const handleJoin = () => {
    handleServerJoin(selectedServer)
  }

  const selectedServerData = servers.find((s) => s.id === selectedServer)

  return (
    <PageContainer>
      <BackButton onBack={onBack} />
      <ContentCard>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4 }}>
          <PageHeader title="Multiplayer" subtitle="Join active battles worldwide" />
          <IconButton
            onClick={handleRefresh}
            disabled={loading}
            size="large"
            sx={{ width: 56, height: 56 }}
          >
            <Refresh
              sx={{ fontSize: 28 }}
              className={loading ? 'animate-spin' : ''}
            />
          </IconButton>
        </Box>

        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' }, 
          gap: 3 
        }}>
          <ServerList
            servers={servers}
            selectedServer={selectedServer}
            onSelectServer={setSelectedServer}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onRefresh={handleRefresh}
          />
          <ServerInfoPanel
            server={selectedServerData}
            onJoin={handleJoin}
          />
        </Box>
      </ContentCard>
    </PageContainer>
  )
}
