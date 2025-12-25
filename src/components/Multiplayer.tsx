import { useState, useEffect } from 'react'
import { Refresh } from '@mui/icons-material'
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
import { Button } from '@/components/ui/button'

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
        <div className="flex flex-row justify-between items-start mb-8">
          <PageHeader title="Multiplayer" subtitle="Join active battles worldwide" />
          <Button
            size="icon"
            variant="outline"
            onClick={handleRefresh}
            disabled={loading}
            className="h-14 w-14"
          >
            <Refresh
              sx={{ fontSize: 28 }}
              className={loading ? 'animate-spin' : ''}
            />
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8">
            <ServerList
              servers={servers}
              selectedServer={selectedServer}
              onSelectServer={setSelectedServer}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onRefresh={handleRefresh}
            />
          </div>
          <div className="lg:col-span-4">
            <ServerInfoPanel
              server={selectedServerData}
              onJoin={handleJoin}
            />
          </div>
        </div>
      </ContentCard>
    </PageContainer>
  )
}
