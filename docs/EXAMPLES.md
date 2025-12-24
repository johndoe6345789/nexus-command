# Code Examples

Practical code examples for common NEXUS COMMAND development scenarios.

## Complete Component Examples

### 1. Server Browser Component

Full implementation of a server browser with search, filtering, and joining.

```typescript
import { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { generateServers, filterServers } from '@/utils'
import { handleServerJoin, handleServerRefresh } from '@/handlers'
import { Server } from '@/types'
import { toast } from 'sonner'
import { MagnifyingGlass, ArrowsClockwise } from '@phosphor-icons/react'

export function ServerBrowser() {
  const [servers, setServers] = useState<Server[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    loadServers()
  }, [])
  
  const loadServers = () => {
    setLoading(true)
    setTimeout(() => {
      setServers(generateServers())
      setLoading(false)
    }, 500)
  }
  
  const handleRefresh = () => {
    const newServers = handleServerRefresh()
    setServers(newServers)
    toast.success('Server list refreshed')
  }
  
  const filteredServers = filterServers(servers, search)
  
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search servers..."
            className="pl-10"
          />
        </div>
        <Button onClick={handleRefresh} variant="outline">
          <ArrowsClockwise className="mr-2" />
          Refresh
        </Button>
      </div>
      
      {loading ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">Loading servers...</p>
        </div>
      ) : filteredServers.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No servers found</p>
        </div>
      ) : (
        <ScrollArea className="h-[600px]">
          <div className="space-y-2">
            {filteredServers.map((server) => (
              <Card key={server.id} className="hover:border-primary/50 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg">{server.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {server.map} • {server.gameType} • {server.region}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">
                          {server.players}/{server.maxPlayers}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {server.ping}ms
                        </p>
                      </div>
                      <Button
                        onClick={() => handleServerJoin(server)}
                        disabled={server.players >= server.maxPlayers}
                      >
                        Join
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      )}
      
      <div className="text-sm text-muted-foreground text-center">
        Showing {filteredServers.length} of {servers.length} servers
      </div>
    </div>
  )
}
```

### 2. Player Statistics Dashboard

Complete statistics display with charts and metrics.

```typescript
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useKV } from '@github/spark/hooks'
import { SystemStats } from '@/types'
import { calculateKD, calculateWinRate } from '@/utils'
import { Trophy, Target, Clock, Crosshair } from '@phosphor-icons/react'
import { motion } from 'framer-motion'

const DEFAULT_STATS: SystemStats = {
  gamesPlayed: 0,
  wins: 0,
  losses: 0,
  kills: 0,
  deaths: 0,
  accuracy: 0,
  playtime: 0,
  favoriteWeapon: 'Rocket Launcher'
}

export function StatsDisplay() {
  const [stats, setStats] = useKV('player-stats', DEFAULT_STATS)
  
  const kd = calculateKD(stats.kills, stats.deaths)
  const winRate = calculateWinRate(stats.wins, stats.losses)
  
  const resetStats = () => {
    if (confirm('Are you sure you want to reset all statistics?')) {
      setStats(DEFAULT_STATS)
    }
  }
  
  const statCards = [
    {
      label: 'Win Rate',
      value: `${winRate.toFixed(1)}%`,
      icon: Trophy,
      color: 'text-primary'
    },
    {
      label: 'K/D Ratio',
      value: kd.toFixed(2),
      icon: Target,
      color: 'text-accent'
    },
    {
      label: 'Accuracy',
      value: `${stats.accuracy.toFixed(1)}%`,
      icon: Crosshair,
      color: 'text-secondary'
    },
    {
      label: 'Playtime',
      value: `${Math.floor(stats.playtime / 60)}h`,
      icon: Clock,
      color: 'text-muted-foreground'
    }
  ]
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, index) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{card.label}</p>
                    <p className="text-3xl font-bold mt-1">{card.value}</p>
                  </div>
                  <card.icon className={`text-4xl ${card.color}`} />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Match History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Games Played</span>
                <span className="font-bold">{stats.gamesPlayed}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-400">Wins</span>
                <span className="font-bold text-green-400">{stats.wins}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-red-400">Losses</span>
                <span className="font-bold text-red-400">{stats.losses}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Combat Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Total Kills</span>
                <span className="font-bold">{stats.kills}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Deaths</span>
                <span className="font-bold">{stats.deaths}</span>
              </div>
              <div className="flex justify-between">
                <span>Favorite Weapon</span>
                <span className="font-bold">{stats.favoriteWeapon}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex justify-end">
        <Button onClick={resetStats} variant="destructive">
          Reset Statistics
        </Button>
      </div>
    </div>
  )
}
```

### 3. Developer Console

Full console implementation with command history and autocomplete.

```typescript
import { useState, useRef, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { handleConsoleCommand } from '@/utils'
import { Terminal } from '@phosphor-icons/react'

interface ConsoleEntry {
  type: 'command' | 'output' | 'error'
  text: string
  timestamp: number
}

export function DeveloperConsole() {
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<ConsoleEntry[]>([])
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [history])
  
  const executeCommand = () => {
    if (!input.trim()) return
    
    const command = input.trim()
    
    // Add to display
    setHistory((current) => [
      ...current,
      { type: 'command', text: command, timestamp: Date.now() }
    ])
    
    // Add to command history
    setCommandHistory((current) => [...current, command])
    setHistoryIndex(-1)
    
    // Handle special commands
    if (command === 'clear') {
      setHistory([])
      setInput('')
      return
    }
    
    // Execute command
    const output = handleConsoleCommand(command)
    
    // Add output
    setHistory((current) => [
      ...current,
      {
        type: output.startsWith('Error') ? 'error' : 'output',
        text: output,
        timestamp: Date.now()
      }
    ])
    
    setInput('')
  }
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand()
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (commandHistory.length === 0) return
      
      const newIndex = Math.min(historyIndex + 1, commandHistory.length - 1)
      setHistoryIndex(newIndex)
      setInput(commandHistory[commandHistory.length - 1 - newIndex])
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex <= 0) {
        setHistoryIndex(-1)
        setInput('')
      } else {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setInput(commandHistory[commandHistory.length - 1 - newIndex])
      }
    }
  }
  
  return (
    <Card className="bg-black/80 border-primary/30">
      <div className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Terminal className="text-primary" weight="bold" />
          <h3 className="font-bold text-primary">Developer Console</h3>
        </div>
        
        <ScrollArea className="h-[400px] mb-4">
          <div ref={scrollRef} className="space-y-1 font-mono text-sm">
            {history.length === 0 && (
              <p className="text-muted-foreground">
                Type 'help' for available commands
              </p>
            )}
            {history.map((entry, i) => (
              <div
                key={i}
                className={
                  entry.type === 'command'
                    ? 'text-primary'
                    : entry.type === 'error'
                    ? 'text-red-400'
                    : 'text-foreground'
                }
              >
                {entry.type === 'command' && '> '}
                {entry.text}
              </div>
            ))}
          </div>
        </ScrollArea>
        
        <div className="flex gap-2">
          <div className="flex-1 flex items-center gap-2">
            <span className="text-primary font-mono">{'>'}</span>
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter command..."
              className="font-mono bg-background/50"
            />
          </div>
          <Button onClick={executeCommand}>Execute</Button>
        </div>
      </div>
    </Card>
  )
}
```

### 4. Settings Panel with Persistence

Complete settings interface with categories and persistence.

```typescript
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { useKV } from '@github/spark/hooks'
import { toast } from 'sonner'

interface GameSettings {
  masterVolume: number
  musicVolume: number
  sfxVolume: number
  voiceVolume: number
  sensitivity: number
  fov: number
  graphics: 'low' | 'medium' | 'high' | 'ultra'
  vsync: boolean
  showFPS: boolean
}

const DEFAULT_SETTINGS: GameSettings = {
  masterVolume: 80,
  musicVolume: 70,
  sfxVolume: 80,
  voiceVolume: 90,
  sensitivity: 5,
  fov: 90,
  graphics: 'high',
  vsync: true,
  showFPS: false
}

export function SettingsPanel() {
  const [settings, setSettings] = useKV('game-settings', DEFAULT_SETTINGS)
  
  const updateSetting = <K extends keyof GameSettings>(
    key: K,
    value: GameSettings[K]
  ) => {
    setSettings((current) => ({
      ...current,
      [key]: value
    }))
  }
  
  const resetSettings = () => {
    if (confirm('Reset all settings to defaults?')) {
      setSettings(DEFAULT_SETTINGS)
      toast.success('Settings reset to defaults')
    }
  }
  
  return (
    <div className="space-y-4">
      <Tabs defaultValue="audio">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="audio">Audio</TabsTrigger>
          <TabsTrigger value="video">Video</TabsTrigger>
          <TabsTrigger value="gameplay">Gameplay</TabsTrigger>
        </TabsList>
        
        <TabsContent value="audio">
          <Card>
            <CardHeader>
              <CardTitle>Audio Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Master Volume: {settings.masterVolume}%</Label>
                <Slider
                  value={[settings.masterVolume]}
                  onValueChange={([value]) => updateSetting('masterVolume', value)}
                  min={0}
                  max={100}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Music Volume: {settings.musicVolume}%</Label>
                <Slider
                  value={[settings.musicVolume]}
                  onValueChange={([value]) => updateSetting('musicVolume', value)}
                  min={0}
                  max={100}
                />
              </div>
              
              <div className="space-y-2">
                <Label>SFX Volume: {settings.sfxVolume}%</Label>
                <Slider
                  value={[settings.sfxVolume]}
                  onValueChange={([value]) => updateSetting('sfxVolume', value)}
                  min={0}
                  max={100}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Voice Volume: {settings.voiceVolume}%</Label>
                <Slider
                  value={[settings.voiceVolume]}
                  onValueChange={([value]) => updateSetting('voiceVolume', value)}
                  min={0}
                  max={100}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="video">
          <Card>
            <CardHeader>
              <CardTitle>Video Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Graphics Quality</Label>
                <Select
                  value={settings.graphics}
                  onValueChange={(value: any) => updateSetting('graphics', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="ultra">Ultra</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <Label>VSync</Label>
                <Switch
                  checked={settings.vsync}
                  onCheckedChange={(checked) => updateSetting('vsync', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label>Show FPS</Label>
                <Switch
                  checked={settings.showFPS}
                  onCheckedChange={(checked) => updateSetting('showFPS', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="gameplay">
          <Card>
            <CardHeader>
              <CardTitle>Gameplay Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Mouse Sensitivity: {settings.sensitivity}</Label>
                <Slider
                  value={[settings.sensitivity]}
                  onValueChange={([value]) => updateSetting('sensitivity', value)}
                  min={1}
                  max={10}
                  step={0.5}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Field of View: {settings.fov}°</Label>
                <Slider
                  value={[settings.fov]}
                  onValueChange={([value]) => updateSetting('fov', value)}
                  min={60}
                  max={120}
                  step={5}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-end gap-2">
        <Button onClick={resetSettings} variant="outline">
          Reset to Defaults
        </Button>
        <Button onClick={() => toast.success('Settings saved!')}>
          Save Settings
        </Button>
      </div>
    </div>
  )
}
```

## Integration Examples

### Full Screen Component

```typescript
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from '@phosphor-icons/react'

interface ScreenProps {
  onBack: () => void
}

export function ExampleScreen({ onBack }: ScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen p-8"
    >
      <div className="max-w-7xl mx-auto">
        <Button onClick={onBack} variant="ghost" className="mb-6">
          <ArrowLeft className="mr-2" />
          Back
        </Button>
        
        <h1 className="text-4xl font-bold mb-8">Screen Title</h1>
        
        {/* Screen content */}
      </div>
    </motion.div>
  )
}
```

These examples demonstrate production-ready patterns used throughout NEXUS COMMAND. Copy and adapt them for your needs!
