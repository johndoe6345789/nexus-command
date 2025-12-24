# Game State API

The Game State API provides persistent storage for game data, player statistics, and user preferences using the Spark KV store.

## Overview

NEXUS COMMAND uses the Spark persistence layer to store game data across sessions. The primary interface is the `useKV` React hook for reactive state management.

## Core Hook

### `useKV<T>(key: string, defaultValue: T): [T, (value: T | ((current: T) => T)) => void, () => void]`

React hook for persistent, reactive key-value storage.

**Import:**
```typescript
import { useKV } from '@github/spark/hooks'
```

**Parameters:**
- `key` (string): Unique storage key
- `defaultValue` (T): Initial value if key doesn't exist

**Returns:**
Array tuple:
1. `value` (T): Current value
2. `setValue` (function): Update function (supports functional updates)
3. `deleteValue` (function): Delete function

**Critical: Always use functional updates to avoid data loss!**

```typescript
// ❌ WRONG - Can cause data loss due to stale closure
setValue([...value, newItem])

// ✅ CORRECT - Always gets current value
setValue((current) => [...current, newItem])
```

## Common Use Cases

### Player Statistics

```typescript
import { useKV } from '@github/spark/hooks'
import { SystemStats } from '@/types'

const defaultStats: SystemStats = {
  gamesPlayed: 0,
  wins: 0,
  losses: 0,
  kills: 0,
  deaths: 0,
  accuracy: 0,
  playtime: 0,
  favoriteWeapon: 'Rocket Launcher'
}

function PlayerStats() {
  const [stats, setStats] = useKV('player-stats', defaultStats)
  
  const recordWin = () => {
    setStats((current) => ({
      ...current,
      gamesPlayed: current.gamesPlayed + 1,
      wins: current.wins + 1
    }))
  }
  
  return (
    <div>
      <p>Wins: {stats.wins}</p>
      <p>Losses: {stats.losses}</p>
      <p>K/D Ratio: {(stats.kills / Math.max(stats.deaths, 1)).toFixed(2)}</p>
    </div>
  )
}
```

### Game Settings

```typescript
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

const defaultSettings: GameSettings = {
  masterVolume: 80,
  musicVolume: 70,
  sfxVolume: 80,
  voiceVolume: 90,
  sensitivity: 5,
  fov: 90,
  graphics: 'high',
  vsync: true
}

function Settings() {
  const [settings, setSettings] = useKV('game-settings', defaultSettings)
  
  const updateVolume = (type: keyof GameSettings, value: number) => {
    setStats((current) => ({
      ...current,
      [type]: value
    }))
  }
  
  return (
    <div>
      <Slider 
        value={settings.masterVolume}
        onValueChange={(value) => updateVolume('masterVolume', value)}
      />
    </div>
  )
}
```

### Match History

```typescript
import { useKV } from '@github/spark/hooks'
import { MatchResult } from '@/types'

function MatchHistory() {
  const [matches, setMatches] = useKV<MatchResult[]>('match-history', [])
  
  const addMatch = (result: MatchResult) => {
    setMatches((current) => {
      const updated = [result, ...current]
      // Keep only last 50 matches
      return updated.slice(0, 50)
    })
  }
  
  const clearHistory = () => {
    setMatches([])
  }
  
  return (
    <div>
      {matches.map(match => (
        <div key={match.id}>
          <p>{match.map} - {match.result}</p>
          <p>Score: {match.score}</p>
        </div>
      ))}
      <button onClick={clearHistory}>Clear History</button>
    </div>
  )
}
```

## Direct KV API

For non-React contexts, use the direct API:

```typescript
// Set value
await spark.kv.set('key', value)

// Get value
const value = await spark.kv.get<Type>('key')

// Get all keys
const keys = await spark.kv.keys()

// Delete value
await spark.kv.delete('key')
```

### Example: Async Operations

```typescript
async function loadPlayerProfile(playerId: string) {
  const profile = await spark.kv.get(`profile-${playerId}`)
  
  if (!profile) {
    // Create default profile
    const newProfile = createDefaultProfile(playerId)
    await spark.kv.set(`profile-${playerId}`, newProfile)
    return newProfile
  }
  
  return profile
}

async function saveGameProgress(data: GameProgress) {
  try {
    await spark.kv.set('game-progress', data)
    console.log('Progress saved')
  } catch (error) {
    console.error('Failed to save progress', error)
  }
}
```

## Data Migration

### Version Handling

```typescript
interface VersionedData<T> {
  version: number
  data: T
}

function useVersionedKV<T>(
  key: string,
  defaultValue: T,
  currentVersion: number,
  migrate: (data: any, fromVersion: number) => T
) {
  const [stored, setStored] = useKV<VersionedData<T>>(
    key,
    { version: currentVersion, data: defaultValue }
  )
  
  // Migrate if needed
  useEffect(() => {
    if (stored.version < currentVersion) {
      const migrated = migrate(stored.data, stored.version)
      setStored({
        version: currentVersion,
        data: migrated
      })
    }
  }, [stored.version])
  
  return [
    stored.data,
    (newData: T) => setStored({ version: currentVersion, data: newData })
  ]
}
```

## Storage Keys Convention

Use descriptive, namespaced keys:

```typescript
// Player data
'player-stats'
'player-profile'
'player-loadout'

// Game settings
'game-settings'
'graphics-settings'
'audio-settings'
'controls-settings'

// Game state
'match-history'
'current-mission'
'unlocked-items'
'achievements'

// UI preferences
'ui-theme'
'ui-layout'
'tutorial-completed'
```

## Best Practices

### 1. Always Use Functional Updates

```typescript
// ✅ CORRECT
setStats((current) => ({
  ...current,
  kills: current.kills + 1
}))

// ❌ WRONG - Stale closure
setStats({
  ...stats,
  kills: stats.kills + 1
})
```

### 2. Type Your Data

```typescript
interface PlayerStats {
  level: number
  xp: number
  rank: string
}

const [stats, setStats] = useKV<PlayerStats>('stats', defaultStats)
```

### 3. Handle Missing Data

```typescript
const [data, setData] = useKV('key', null)

if (!data) {
  return <Loading />
}
```

### 4. Implement Data Limits

```typescript
const addToHistory = (item: HistoryItem) => {
  setHistory((current) => {
    const updated = [item, ...current]
    return updated.slice(0, 100) // Keep last 100 items
  })
}
```

### 5. Clear Sensitive Data

```typescript
const logout = () => {
  deleteSessionData()
  deleteUserCache()
}
```

## Performance Considerations

### Debounce Frequent Updates

```typescript
import { debounce } from 'lodash'

const debouncedSave = debounce((value: number) => {
  setSettings((current) => ({
    ...current,
    sensitivity: value
  }))
}, 300)

<Slider onValueChange={debouncedSave} />
```

### Batch Updates

```typescript
// Instead of multiple updates
setStats(current => ({ ...current, kills: current.kills + 1 }))
setStats(current => ({ ...current, deaths: current.deaths + 1 }))
setStats(current => ({ ...current, score: current.score + 100 }))

// Batch into one
setStats(current => ({
  ...current,
  kills: current.kills + 1,
  deaths: current.deaths + 1,
  score: current.score + 100
}))
```

## Common Patterns

### Reset to Defaults

```typescript
const resetSettings = () => {
  setSettings(defaultSettings)
}
```

### Conditional Updates

```typescript
const tryUnlock = (itemId: string) => {
  setUnlocked((current) => {
    if (current.includes(itemId)) return current
    return [...current, itemId]
  })
}
```

### Computed Properties

```typescript
const stats = useKV('stats', defaultStats)[0]

const winRate = useMemo(() => {
  const total = stats.wins + stats.losses
  return total > 0 ? (stats.wins / total) * 100 : 0
}, [stats.wins, stats.losses])
```

## Error Recovery

```typescript
const safeUpdate = () => {
  try {
    setStats((current) => {
      // Validate before updating
      if (!isValidStats(current)) {
        console.error('Invalid stats detected')
        return defaultStats
      }
      return {
        ...current,
        newProperty: newValue
      }
    })
  } catch (error) {
    console.error('Failed to update stats', error)
    toast.error('Failed to save progress')
  }
}
```
