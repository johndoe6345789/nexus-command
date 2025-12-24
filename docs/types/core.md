# Types Reference

Complete TypeScript type definitions for NEXUS COMMAND.

## Core Types

### Screen

Navigation screen identifier.

```typescript
type Screen = 
  | 'main'
  | 'singleplayer'
  | 'multiplayer'
  | 'settings'
  | 'stats'
  | 'developer'
```

**Usage:**
```typescript
import { Screen } from '@/types'

const [currentScreen, setCurrentScreen] = useState<Screen>('main')
```

---

### Server

Multiplayer server information.

```typescript
interface Server {
  id: string
  name: string
  map: string
  players: number
  maxPlayers: number
  ping: number
  gameType: string
  region: string
}
```

**Properties:**
- `id` - Unique identifier (UUID)
- `name` - Server display name
- `map` - Current map name
- `players` - Current player count
- `maxPlayers` - Maximum capacity
- `ping` - Latency in milliseconds
- `gameType` - Game mode type
- `region` - Geographic region

**Example:**
```typescript
const server: Server = {
  id: 'abc-123',
  name: 'Death Arena Official',
  map: 'dm_bloodcovenant',
  players: 12,
  maxPlayers: 16,
  ping: 45,
  gameType: 'Deathmatch',
  region: 'NA East'
}
```

---

### Map

Game map information.

```typescript
interface Map {
  id: string
  name: string
  image: string
  difficulty: number
}
```

**Properties:**
- `id` - Unique map identifier
- `name` - Display name
- `image` - Preview image path
- `difficulty` - Difficulty rating (1-5)

**Example:**
```typescript
const map: Map = {
  id: 'blood_covenant',
  name: 'Blood Covenant',
  image: '/maps/blood_covenant.jpg',
  difficulty: 3
}
```

---

### Difficulty

Game difficulty level.

```typescript
type Difficulty = 'easy' | 'normal' | 'hard' | 'nightmare'
```

**Usage:**
```typescript
const [difficulty, setDifficulty] = useState<Difficulty>('normal')
```

---

### DifficultyOption

Difficulty selection option with metadata.

```typescript
interface DifficultyOption {
  value: Difficulty
  label: string
  description: string
  color: string
}
```

**Properties:**
- `value` - Difficulty level
- `label` - Display name
- `description` - Difficulty description
- `color` - Theme color for UI

**Example:**
```typescript
const options: DifficultyOption[] = [
  {
    value: 'easy',
    label: 'Easy',
    description: 'Relaxed gameplay for beginners',
    color: 'green'
  },
  {
    value: 'normal',
    label: 'Normal',
    description: 'Balanced challenge',
    color: 'blue'
  }
]
```

---

### SystemStats

Player statistics and performance metrics.

```typescript
interface SystemStats {
  gamesPlayed: number
  wins: number
  losses: number
  kills: number
  deaths: number
  accuracy: number
  playtime: number
  favoriteWeapon: string
}
```

**Properties:**
- `gamesPlayed` - Total matches played
- `wins` - Total victories
- `losses` - Total defeats
- `kills` - Total eliminations
- `deaths` - Total deaths
- `accuracy` - Weapon accuracy percentage (0-100)
- `playtime` - Total playtime in minutes
- `favoriteWeapon` - Most used weapon name

**Computed Properties:**
```typescript
const kd = stats.kills / Math.max(stats.deaths, 1)
const winRate = (stats.wins / Math.max(stats.gamesPlayed, 1)) * 100
```

---

### MatchResult

Single match result data.

```typescript
interface MatchResult {
  id: string
  map: string
  gameType: string
  result: 'win' | 'loss'
  score: number
  kills: number
  deaths: number
  accuracy: number
  duration: number
  timestamp: number
}
```

**Properties:**
- `id` - Unique match identifier
- `map` - Map played
- `gameType` - Game mode
- `result` - Match outcome
- `score` - Final score
- `kills` - Eliminations in match
- `deaths` - Deaths in match
- `accuracy` - Accuracy percentage in match
- `duration` - Match duration in seconds
- `timestamp` - Unix timestamp

**Example:**
```typescript
const match: MatchResult = {
  id: 'match-123',
  map: 'Blood Covenant',
  gameType: 'Deathmatch',
  result: 'win',
  score: 25,
  kills: 25,
  deaths: 12,
  accuracy: 68.5,
  duration: 600,
  timestamp: Date.now()
}
```

---

### MenuItem

Main menu item configuration.

```typescript
interface MenuItem {
  id: string
  label: string
  description?: string
  icon?: string
  screen: Screen
  disabled?: boolean
}
```

**Properties:**
- `id` - Unique identifier
- `label` - Display text
- `description` - Optional description
- `icon` - Optional icon name
- `screen` - Target navigation screen
- `disabled` - Whether item is disabled

**Example:**
```typescript
const menuItems: MenuItem[] = [
  {
    id: 'singleplayer',
    label: 'Single Player',
    description: 'Fight against AI opponents',
    icon: 'user',
    screen: 'singleplayer'
  },
  {
    id: 'multiplayer',
    label: 'Multiplayer',
    description: 'Join online matches',
    icon: 'users',
    screen: 'multiplayer'
  }
]
```

## Utility Types

### KV Store Types

```typescript
type KVValue = string | number | boolean | object | null | undefined

interface KVStore<T> {
  keys: () => Promise<string[]>
  get: <T>(key: string) => Promise<T | undefined>
  set: <T>(key: string, value: T) => Promise<void>
  delete: (key: string) => Promise<void>
}
```

### User Types

```typescript
interface UserInfo {
  avatarUrl: string
  email: string
  id: string
  isOwner: boolean
  login: string
}
```

## Component Prop Types

### Navigation Props

```typescript
interface NavigationProps {
  onNavigate: (screen: string) => void
}

interface BackNavigationProps {
  onBack: () => void
}
```

### Server Browser Props

```typescript
interface ServerBrowserProps {
  servers: Server[]
  onRefresh: () => void
  onJoin: (server: Server) => void
  onSearch: (query: string) => void
}
```

### Statistics Display Props

```typescript
interface StatsDisplayProps {
  stats: SystemStats
  showDetails?: boolean
  onReset?: () => void
}
```

## Type Guards

### Server Type Guard

```typescript
function isServer(obj: any): obj is Server {
  return (
    typeof obj === 'object' &&
    typeof obj.id === 'string' &&
    typeof obj.name === 'string' &&
    typeof obj.map === 'string' &&
    typeof obj.players === 'number' &&
    typeof obj.maxPlayers === 'number' &&
    typeof obj.ping === 'number'
  )
}
```

### Screen Type Guard

```typescript
function isScreen(value: string): value is Screen {
  return [
    'main',
    'singleplayer',
    'multiplayer',
    'settings',
    'stats',
    'developer'
  ].includes(value)
}
```

## Type Utilities

### Partial Updates

```typescript
type PartialStats = Partial<SystemStats>

function updateStats(
  current: SystemStats,
  updates: PartialStats
): SystemStats {
  return { ...current, ...updates }
}
```

### Required Fields

```typescript
type RequiredServer = Required<Server>

type ServerWithoutId = Omit<Server, 'id'>

type ServerIdOnly = Pick<Server, 'id' | 'name'>
```

## Default Values

### Default Statistics

```typescript
export const DEFAULT_STATS: SystemStats = {
  gamesPlayed: 0,
  wins: 0,
  losses: 0,
  kills: 0,
  deaths: 0,
  accuracy: 0,
  playtime: 0,
  favoriteWeapon: 'Rocket Launcher'
}
```

### Default Settings

```typescript
export const DEFAULT_SETTINGS = {
  masterVolume: 80,
  musicVolume: 70,
  sfxVolume: 80,
  voiceVolume: 90,
  sensitivity: 5,
  fov: 90,
  graphics: 'high' as const,
  vsync: true
}
```

## Enums

While TypeScript union types are preferred, enums can be used:

```typescript
enum GameMode {
  Deathmatch = 'deathmatch',
  TeamDeathmatch = 'team_deathmatch',
  CaptureTheFlag = 'ctf',
  Domination = 'domination'
}

enum Region {
  NAEast = 'NA East',
  NAWest = 'NA West',
  EUWest = 'EU West',
  EUEast = 'EU East',
  Asia = 'Asia',
  Oceania = 'Oceania'
}
```

## Generic Types

### Response Wrapper

```typescript
interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}

type ServerResponse = ApiResponse<Server[]>
type StatsResponse = ApiResponse<SystemStats>
```

### Paginated Data

```typescript
interface PaginatedData<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
}

type ServerList = PaginatedData<Server>
type MatchHistory = PaginatedData<MatchResult>
```

## Best Practices

1. **Always export types** from `@/types/index.ts`
2. **Use interfaces for objects** that may be extended
3. **Use types for unions and intersections**
4. **Provide default values** for complex types
5. **Document complex types** with JSDoc comments
6. **Use strict null checks** for optional properties
7. **Avoid `any`** - use `unknown` or proper types
8. **Create type guards** for runtime validation

## Type Import/Export Pattern

```typescript
// types/Server.ts
export interface Server {
  id: string
  name: string
  // ... properties
}

// types/index.ts
export type { Server } from './Server'
export type { Map } from './Map'
export type { SystemStats } from './SystemStats'

// Usage in components
import { Server, Map, SystemStats } from '@/types'
```
