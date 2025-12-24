import { Card, CardContent, Stack, Grid, Box, Tabs, Tab, Typography, Chip } from '@mui/material'
import { Code, ChartLine, Lightning, Database, Bug, Gear, Terminal, Eye } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { useKV } from '@github/spark/hooks'
import { useState } from 'react'
import { PageContainer } from './atoms/PageContainer'
import { BackButton } from './atoms/BackButton'
import { ContentCard } from './atoms/ContentCard'
import { PageHeader } from './atoms/PageHeader'
import { StatCard } from './atoms/StatCard'
import { DebugToggle } from './molecules/DebugToggle'
import { ConsolePanel } from './organisms/ConsolePanel'
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

        <Box sx={{ borderBottom: 1, borderColor: 'rgba(74, 158, 255, 0.2)', mb: 4 }}>
          <Tabs
            value={activeTab}
            onChange={(_, newValue) => setActiveTab(newValue)}
            sx={{
              '& .MuiTab-root': {
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 600,
                minHeight: '56px',
              },
            }}
          >
            <Tab label="Overview" />
            <Tab label="Debug Options" />
            <Tab label="Cheat Codes" />
            <Tab label="Console" />
            <Tab label="Render Stats" />
          </Tabs>
        </Box>

        {activeTab === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <StatCard icon={ChartLine} iconColor="oklch(0.75 0.20 220)" label="FPS" value={systemStats.fps} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <StatCard icon={Lightning} iconColor="#4ade80" label="Ping" value={`${systemStats.ping}ms`} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <StatCard icon={Database} iconColor="#fbbf24" label="Memory" value={systemStats.memoryUsage} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <StatCard icon={Bug} iconColor="#8b5cf6" label="Draw Calls" value={systemStats.drawCalls} />
              </Grid>
            </Grid>
          </motion.div>
        )}

        {activeTab === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Card>
              <CardContent sx={{ p: 4 }}>
                <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 4 }}>
                  <Gear size={32} weight="duotone" color="oklch(0.75 0.20 220)" />
                  <Typography variant="h4">Debug Options</Typography>
                </Stack>
                <Stack spacing={3}>
                  <DebugToggle
                    title="Debug Mode"
                    description="Enable verbose logging and debug overlays"
                    checked={debugMode ?? false}
                    onChange={setDebugMode}
                  />
                  <DebugToggle
                    title="Show FPS Counter"
                    description="Display real-time frame rate information"
                    checked={showFPS ?? false}
                    onChange={setShowFPS}
                  />
                  <DebugToggle
                    title="Show Hitboxes"
                    description="Render collision boundaries for all entities"
                    checked={showHitboxes ?? false}
                    onChange={setShowHitboxes}
                  />
                </Stack>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {activeTab === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Card>
              <CardContent sx={{ p: 4 }}>
                <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 4 }}>
                  <Lightning size={32} weight="duotone" color="#fbbf24" />
                  <Typography variant="h4">Cheat Codes</Typography>
                </Stack>
                <Stack spacing={3}>
                  <DebugToggle
                    title="God Mode"
                    description="Become invincible to all damage"
                    checked={godMode ?? false}
                    onChange={setGodMode}
                  />
                  <DebugToggle
                    title="Unlimited Ammo"
                    description="Never run out of ammunition"
                    checked={unlimitedAmmo ?? false}
                    onChange={setUnlimitedAmmo}
                  />
                  <DebugToggle
                    title="No Clip"
                    description="Fly through walls and terrain"
                    checked={noclip ?? false}
                    onChange={setNoclip}
                  />
                </Stack>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {activeTab === 3 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Card>
              <CardContent sx={{ p: 4 }}>
                <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 4 }}>
                  <Terminal size={32} weight="duotone" color="oklch(0.75 0.20 220)" />
                  <Typography variant="h4">Console</Typography>
                </Stack>
                <ConsolePanel
                  output={consoleOutput}
                  input={consoleInput}
                  onInputChange={setConsoleInput}
                  onSubmit={handleConsoleSubmit}
                />
              </CardContent>
            </Card>
          </motion.div>
        )}

        {activeTab === 4 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Card>
              <CardContent sx={{ p: 4 }}>
                <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 4 }}>
                  <Eye size={32} weight="duotone" color="#4ade80" />
                  <Typography variant="h4">Render Stats</Typography>
                </Stack>
                <Stack spacing={3}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography color="text.secondary">Triangles</Typography>
                    <Chip label={systemStats.triangles} color="primary" />
                  </Stack>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography color="text.secondary">Active Shaders</Typography>
                    <Chip label={systemStats.shaders} color="primary" />
                  </Stack>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography color="text.secondary">Loaded Textures</Typography>
                    <Chip label={systemStats.textures} color="primary" />
                  </Stack>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography color="text.secondary">Session Uptime</Typography>
                    <Chip label={systemStats.uptime} color="primary" />
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </ContentCard>
    </PageContainer>
  )
}
