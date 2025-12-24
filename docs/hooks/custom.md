# Hooks Reference

Custom React hooks for NEXUS COMMAND.

## Data Persistence Hooks

### `useKV<T>(key: string, defaultValue: T)`

Reactive persistent storage hook using Spark KV store.

**Import:**
```typescript
import { useKV } from '@github/spark/hooks'
```

**Parameters:**
- `key` (string): Unique storage key
- `defaultValue` (T): Default value if key doesn't exist

**Returns:**
Array tuple:
- `[0]` value (T): Current value
- `[1]` setValue (function): Update function
- `[2]` deleteValue (function): Delete function

**Example:**

```typescript
import { useKV } from '@github/spark/hooks'

function MyComponent() {
  const [count, setCount, deleteCount] = useKV('counter', 0)
  
  // ✅ CORRECT - Always use functional updates
  const increment = () => {
    setCount((current) => current + 1)
  }
  
  // ❌ WRONG - Can cause data loss
  const badIncrement = () => {
    setCount(count + 1) // Don't do this!
  }
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={deleteCount}>Reset</button>
    </div>
  )
}
```

**See also:** [Game State API](../api/game-state.md)

---

## UI Hooks

### `useIsMobile()`

Detects mobile viewport size.

**Location:** `src/hooks/use-mobile.ts`

**Import:**
```typescript
import { useIsMobile } from '@/hooks/use-mobile'
```

**Returns:**
- `boolean`: True if viewport width < 768px

**Example:**

```typescript
import { useIsMobile } from '@/hooks/use-mobile'

function ResponsiveComponent() {
  const isMobile = useIsMobile()
  
  return (
    <div>
      {isMobile ? (
        <MobileView />
      ) : (
        <DesktopView />
      )}
    </div>
  )
}
```

---

## Custom Game Hooks

### `usePlayerStats()`

Hook for managing player statistics.

**Example Implementation:**

```typescript
import { useKV } from '@github/spark/hooks'
import { SystemStats } from '@/types'

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

export function usePlayerStats() {
  const [stats, setStats] = useKV('player-stats', DEFAULT_STATS)
  
  const recordWin = (kills: number, deaths: number) => {
    setStats((current) => ({
      ...current,
      gamesPlayed: current.gamesPlayed + 1,
      wins: current.wins + 1,
      kills: current.kills + kills,
      deaths: current.deaths + deaths
    }))
  }
  
  const recordLoss = (kills: number, deaths: number) => {
    setStats((current) => ({
      ...current,
      gamesPlayed: current.gamesPlayed + 1,
      losses: current.losses + 1,
      kills: current.kills + kills,
      deaths: current.deaths + deaths
    }))
  }
  
  const resetStats = () => {
    setStats(DEFAULT_STATS)
  }
  
  return {
    stats,
    recordWin,
    recordLoss,
    resetStats
  }
}

// Usage
function StatsComponent() {
  const { stats, recordWin, resetStats } = usePlayerStats()
  
  return (
    <div>
      <p>Wins: {stats.wins}</p>
      <button onClick={() => recordWin(10, 5)}>Record Win</button>
      <button onClick={resetStats}>Reset</button>
    </div>
  )
}
```

---

### `useGameSettings()`

Hook for managing game settings.

**Example Implementation:**

```typescript
import { useKV } from '@github/spark/hooks'

interface GameSettings {
  masterVolume: number
  musicVolume: number
  sfxVolume: number
  voiceVolume: number
  sensitivity: number
  fov: number
  graphics: 'low' | 'medium' | 'high' | 'ultra'
  vsync: boolean
}

const DEFAULT_SETTINGS: GameSettings = {
  masterVolume: 80,
  musicVolume: 70,
  sfxVolume: 80,
  voiceVolume: 90,
  sensitivity: 5,
  fov: 90,
  graphics: 'high',
  vsync: true
}

export function useGameSettings() {
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
    setSettings(DEFAULT_SETTINGS)
  }
  
  return {
    settings,
    updateSetting,
    resetSettings
  }
}

// Usage
function SettingsComponent() {
  const { settings, updateSetting } = useGameSettings()
  
  return (
    <Slider
      value={[settings.masterVolume]}
      onValueChange={([value]) => updateSetting('masterVolume', value)}
      min={0}
      max={100}
    />
  )
}
```

---

### `useServerList()`

Hook for managing multiplayer server list.

**Example Implementation:**

```typescript
import { useState, useEffect } from 'react'
import { generateServers, filterServers } from '@/utils'
import { Server } from '@/types'

export function useServerList() {
  const [servers, setServers] = useState<Server[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    refreshServers()
  }, [])
  
  const refreshServers = () => {
    setLoading(true)
    const newServers = generateServers()
    setServers(newServers)
    setLoading(false)
  }
  
  const filteredServers = filterServers(servers, search)
  
  return {
    servers: filteredServers,
    search,
    setSearch,
    loading,
    refreshServers
  }
}

// Usage
function ServerBrowser() {
  const { servers, search, setSearch, refreshServers } = useServerList()
  
  return (
    <div>
      <input value={search} onChange={(e) => setSearch(e.target.value)} />
      <button onClick={refreshServers}>Refresh</button>
      {servers.map(server => (
        <div key={server.id}>{server.name}</div>
      ))}
    </div>
  )
}
```

---

### `useConsole()`

Hook for managing developer console.

**Example Implementation:**

```typescript
import { useState, useRef, useEffect } from 'react'
import { handleConsoleCommand } from '@/utils'

interface ConsoleEntry {
  type: 'command' | 'output' | 'error'
  text: string
  timestamp: number
}

export function useConsole() {
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<ConsoleEntry[]>([])
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const scrollRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [history])
  
  const executeCommand = (command: string) => {
    if (!command.trim()) return
    
    // Add command to history
    setHistory((current) => [
      ...current,
      { type: 'command', text: command, timestamp: Date.now() }
    ])
    
    setCommandHistory((current) => [...current, command])
    
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
    setHistoryIndex(-1)
  }
  
  const clearHistory = () => {
    setHistory([])
  }
  
  const navigateHistory = (direction: 'up' | 'down') => {
    if (direction === 'up') {
      if (commandHistory.length === 0) return
      const newIndex = Math.min(historyIndex + 1, commandHistory.length - 1)
      setHistoryIndex(newIndex)
      setInput(commandHistory[commandHistory.length - 1 - newIndex])
    } else {
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
  
  return {
    input,
    setInput,
    history,
    scrollRef,
    executeCommand,
    clearHistory,
    navigateHistory
  }
}

// Usage
function ConsoleComponent() {
  const { input, setInput, history, scrollRef, executeCommand, navigateHistory } = useConsole()
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand(input)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      navigateHistory('up')
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      navigateHistory('down')
    }
  }
  
  return (
    <div>
      <div ref={scrollRef} className="h-[400px] overflow-auto">
        {history.map((entry, i) => (
          <div key={i} className={entry.type}>
            {entry.type === 'command' && '> '}
            {entry.text}
          </div>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  )
}
```

---

### `useMatchHistory()`

Hook for tracking match history.

**Example Implementation:**

```typescript
import { useKV } from '@github/spark/hooks'
import { MatchResult } from '@/types'

const MAX_HISTORY_SIZE = 50

export function useMatchHistory() {
  const [matches, setMatches] = useKV<MatchResult[]>('match-history', [])
  
  const addMatch = (result: MatchResult) => {
    setMatches((current) => {
      const updated = [result, ...current]
      return updated.slice(0, MAX_HISTORY_SIZE)
    })
  }
  
  const clearHistory = () => {
    setMatches([])
  }
  
  const getRecentMatches = (count: number) => {
    return matches.slice(0, count)
  }
  
  return {
    matches,
    addMatch,
    clearHistory,
    getRecentMatches
  }
}
```

---

## React Hook Patterns

### Computed Values

```typescript
import { useMemo } from 'react'

function useComputedStats(stats: SystemStats) {
  const kd = useMemo(() => {
    return stats.kills / Math.max(stats.deaths, 1)
  }, [stats.kills, stats.deaths])
  
  const winRate = useMemo(() => {
    const total = stats.wins + stats.losses
    return total > 0 ? (stats.wins / total) * 100 : 0
  }, [stats.wins, stats.losses])
  
  return { kd, winRate }
}
```

### Async Operations

```typescript
import { useState, useEffect } from 'react'

function useAsyncData<T>(fetchFn: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  
  useEffect(() => {
    let cancelled = false
    
    const load = async () => {
      try {
        setLoading(true)
        const result = await fetchFn()
        if (!cancelled) {
          setData(result)
          setError(null)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err as Error)
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }
    
    load()
    
    return () => {
      cancelled = true
    }
  }, [])
  
  return { data, loading, error }
}
```

## Best Practices

1. **Use functional updates** - Always when updating based on current value
2. **Cleanup effects** - Return cleanup functions from useEffect
3. **Memoize expensive calculations** - Use useMemo for performance
4. **Debounce frequent updates** - Avoid excessive renders
5. **Type your hooks** - Use TypeScript for type safety
6. **Extract reusable logic** - Create custom hooks for shared behavior
7. **Handle loading states** - Show feedback during async operations
8. **Test hooks** - Use React Testing Library hooks utilities
