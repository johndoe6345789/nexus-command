import { Code } from '@phosphor-icons/react'
import { AnimatePresence } from 'framer-motion'
import { useKV } from '@github/spark/hooks'
import { useState } from 'react'
import { PageContainer } from './atoms/PageContainer'
import { BackButton } from './atoms/BackButton'
import { ContentCard } from './atoms/ContentCard'
import { PageHeader } from './atoms/PageHeader'
import { DeveloperTabs } from './organisms/DeveloperTabs'
import { OverviewTab } from './organisms/OverviewTab'
import { DebugOptionsTab } from './organisms/DebugOptionsTab'
import { CheatCodesTab } from './organisms/CheatCodesTab'
import { ConsoleTab } from './organisms/ConsoleTab'
import { RenderStatsTab } from './organisms/RenderStatsTab'
import { ProceduralGenTab } from './organisms/ProceduralGenTab'
import { SystemStats } from '@/types'
import { handleConsoleCommand } from '@/utils'
import { DeveloperProps } from './props'
import { INITIAL_CONSOLE_OUTPUT, CONSOLE_MAX_LINES } from '@/constants'

export function Developer({ onBack }: DeveloperProps) {
  const [activeTab, setActiveTab] = useState(0)
  const [debugMode, setDebugMode] = useKV<boolean>('debug-mode', false)
  const [showFPS, setShowFPS] = useKV<boolean>('show-fps', false)
  const [showHitboxes, setShowHitboxes] = useKV<boolean>('show-hitboxes', false)
  const [godMode, setGodMode] = useKV<boolean>('god-mode', false)
  const [unlimitedAmmo, setUnlimitedAmmo] = useKV<boolean>('unlimited-ammo', false)
  const [noclip, setNoclip] = useKV<boolean>('noclip', false)
  const [consoleInput, setConsoleInput] = useState('')
  const [consoleOutput, setConsoleOutput] = useState<string[]>(INITIAL_CONSOLE_OUTPUT)

  const systemStats: SystemStats = {
    fps: 144,
    ping: 23,
    memoryUsage: '2.4 GB',
    drawCalls: 1247,
    triangles: '1.2M',
    shaders: 47,
    textures: 189,
    uptime: '02:34:12',
  }

  const handleConsoleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!consoleInput.trim()) return

    const newOutput = [...consoleOutput, `> ${consoleInput}`]
    
    const command = consoleInput.toLowerCase().trim()
    if (command === 'clear') {
      setConsoleOutput(['> Console cleared'])
      setConsoleInput('')
      return
    }

    const commandOutput = handleConsoleCommand(consoleInput, systemStats)
    setConsoleOutput([...newOutput, ...commandOutput].slice(-CONSOLE_MAX_LINES))
    setConsoleInput('')
  }

  return (
    <PageContainer>
      <BackButton onBack={onBack} />
      <ContentCard>
        <PageHeader
          title="Developer Tools"
          subtitle="Advanced debugging and testing utilities"
          icon={Code}
        />

        <DeveloperTabs activeTab={activeTab} onTabChange={setActiveTab} />

        <AnimatePresence mode="wait">
          {activeTab === 0 && <OverviewTab systemStats={systemStats} />}

          {activeTab === 1 && (
            <DebugOptionsTab
              debugMode={debugMode ?? false}
              showFPS={showFPS ?? false}
              showHitboxes={showHitboxes ?? false}
              onDebugModeChange={setDebugMode}
              onShowFPSChange={setShowFPS}
              onShowHitboxesChange={setShowHitboxes}
            />
          )}

          {activeTab === 2 && (
            <CheatCodesTab
              godMode={godMode ?? false}
              unlimitedAmmo={unlimitedAmmo ?? false}
              noclip={noclip ?? false}
              onGodModeChange={setGodMode}
              onUnlimitedAmmoChange={setUnlimitedAmmo}
              onNoclipChange={setNoclip}
            />
          )}

          {activeTab === 3 && (
            <ConsoleTab
              output={consoleOutput}
              input={consoleInput}
              onInputChange={setConsoleInput}
              onSubmit={handleConsoleSubmit}
            />
          )}

          {activeTab === 4 && <RenderStatsTab systemStats={systemStats} />}

          {activeTab === 5 && <ProceduralGenTab />}
        </AnimatePresence>
      </ContentCard>
    </PageContainer>
  )
}
