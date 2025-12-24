import { useState, useEffect } from 'react'
import { Stack, Box, IconButton } from '@mui/material'
import { ArrowsClockwise } from '@phosphor-icons/react'
import { toast } from 'sonner'
import { PageContainer } from './atoms/PageContainer'
import { BackButton } from './atoms/BackButton'
import { ContentCard } from './atoms/ContentCard'
import { PageHeader } from './atoms/PageHeader'
import { ServerList } from './organisms/ServerList'
import { ServerInfoPanel } from './organisms/ServerInfoPanel'

interface MultiplayerProps {
  onBack: () => void
}

interface Server {
  id: string
  name: string
  map: string
  players: number
  maxPlayers: number
  ping: number
  mode: string
  region: string
}

export function Multiplayer({ onBack }: MultiplayerProps) {
  const [servers, setServers] = useState<Server[]>([])
  const [selectedServer, setSelectedServer] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const generateServers = () => {
    const serverNames = [
      'Alpha Squad HQ',
      'Bravo Battalion',
      'Delta Force Arena',
      'Echo Combat Zone',
      'Foxtrot Stronghold',
      'Ghost Division',
    ]
    
    const maps = ['Aegis Station', 'Outpost Zero', 'Nexus Core', 'Meridian City']
    const modes = ['Team Deathmatch', 'Capture the Flag', 'Domination']
    const regions = ['US East', 'US West', 'EU', 'Asia']

    return serverNames.map((name, i) => ({
      id: `server-${i}`,
      name,
      map: maps[Math.floor(Math.random() * maps.length)],
      players: Math.floor(Math.random() * 20) + 5,
      maxPlayers: 24,
      ping: Math.floor(Math.random() * 80) + 20,
      mode: modes[Math.floor(Math.random() * modes.length)],
      region: regions[Math.floor(Math.random() * regions.length)],
    }))
  }

  useEffect(() => {
    setServers(generateServers())
  }, [])

  const handleRefresh = () => {
    setLoading(true)
    toast.info('Refreshing server list...')
    setTimeout(() => {
      setServers(generateServers())
      setLoading(false)
      toast.success('Servers updated')
    }, 1000)
  }

  const handleJoin = () => {
    if (!selectedServer) {
      toast.error('Select a server to join')
      return
    }
    toast.success('Connecting to server...')
    setTimeout(() => {
      toast.success('Connection established!')
    }, 1500)
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
