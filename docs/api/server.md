# Server API

The Server API manages multiplayer server functionality including server browsing, filtering, and connection.

## Overview

The server system handles multiplayer game server discovery, filtering, and joining. Servers are generated dynamically and can be filtered by various criteria.

## Types

### Server

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
- `id` - Unique server identifier
- `name` - Display name of the server
- `map` - Current map being played
- `players` - Current player count
- `maxPlayers` - Maximum player capacity
- `ping` - Latency in milliseconds
- `gameType` - Game mode (e.g., "Deathmatch", "Team Deathmatch")
- `region` - Geographic region (e.g., "NA East", "EU West")

## Core Functions

### `generateServers(): Server[]`

Generates a list of mock multiplayer servers for the server browser.

**Location:** `src/utils/generateServers.ts`

**Returns:**
- `Server[]`: Array of generated server objects

**Example:**

```typescript
import { generateServers } from '@/utils'

const servers = generateServers()
console.log(servers.length) // Variable count of servers
```

### `filterServers(servers: Server[], searchTerm: string): Server[]`

Filters servers based on search criteria.

**Location:** `src/utils/filterServers.ts`

**Parameters:**
- `servers` (Server[]): Array of servers to filter
- `searchTerm` (string): Search query

**Returns:**
- `Server[]`: Filtered server list

**Search Fields:**
- Server name (case-insensitive)
- Map name (case-insensitive)
- Game type (case-insensitive)
- Region (case-insensitive)

**Example:**

```typescript
import { filterServers, generateServers } from '@/utils'

const servers = generateServers()
const filtered = filterServers(servers, 'deathmatch')
// Returns only servers with 'deathmatch' in any searchable field
```

### `handleServerRefresh(): Server[]`

Refreshes the server list by generating new servers.

**Location:** `src/handlers/handleServerRefresh.ts`

**Returns:**
- `Server[]`: New array of servers

**Example:**

```typescript
import { handleServerRefresh } from '@/handlers'
import { toast } from 'sonner'

const refreshServers = () => {
  const newServers = handleServerRefresh()
  setServers(newServers)
  toast.success('Server list refreshed')
}
```

### `handleServerJoin(server: Server): void`

Handles joining a multiplayer server.

**Location:** `src/handlers/handleServerJoin.ts`

**Parameters:**
- `server` (Server): Server object to join

**Side Effects:**
- Shows toast notification with server details
- Logs join attempt to console

**Example:**

```typescript
import { handleServerJoin } from '@/handlers'

const joinServer = (server: Server) => {
  handleServerJoin(server)
  // Toast notification automatically shown
}
```

## Usage in Components

### Basic Server Browser

```typescript
import { useState, useEffect } from 'react'
import { generateServers, filterServers } from '@/utils'
import { handleServerJoin, handleServerRefresh } from '@/handlers'
import { Server } from '@/types'

function ServerBrowser() {
  const [servers, setServers] = useState<Server[]>([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    setServers(generateServers())
  }, [])

  const filteredServers = filterServers(servers, search)

  const handleRefresh = () => {
    setServers(handleServerRefresh())
  }

  const handleJoin = (server: Server) => {
    handleServerJoin(server)
  }

  return (
    <div>
      <input 
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search servers..."
      />
      <button onClick={handleRefresh}>Refresh</button>
      
      {filteredServers.map(server => (
        <div key={server.id}>
          <h3>{server.name}</h3>
          <p>{server.map} - {server.gameType}</p>
          <p>{server.players}/{server.maxPlayers} - {server.ping}ms</p>
          <button onClick={() => handleJoin(server)}>Join</button>
        </div>
      ))}
    </div>
  )
}
```

## Server Generation Details

The `generateServers` function creates realistic mock servers with:

- **Varied player counts**: Random distribution across capacity
- **Realistic ping values**: 10-200ms range
- **Multiple game types**: Deathmatch, Team Deathmatch, Capture the Flag, etc.
- **Geographic regions**: NA East/West, EU West/East, Asia, etc.
- **Diverse map names**: Various fictional arena/map names
- **Unique server names**: Community-style server names

## Filtering Behavior

The filter system performs case-insensitive partial matching:

```typescript
// Matches any of these fields containing the search term
server.name.toLowerCase().includes(search.toLowerCase()) ||
server.map.toLowerCase().includes(search.toLowerCase()) ||
server.gameType.toLowerCase().includes(search.toLowerCase()) ||
server.region.toLowerCase().includes(search.toLowerCase())
```

## Best Practices

1. **Always filter on the client** for instant feedback
2. **Show loading states** during refresh operations
3. **Display empty states** when no servers match
4. **Provide clear server info** (name, map, players, ping)
5. **Sort servers** by ping or player count for better UX
6. **Cache server list** to avoid unnecessary regeneration

## Advanced Filtering Example

```typescript
const [filters, setFilters] = useState({
  gameType: 'all',
  region: 'all',
  notFull: false,
  lowPing: false
})

const advancedFilter = (servers: Server[]) => {
  let filtered = filterServers(servers, search)
  
  if (filters.gameType !== 'all') {
    filtered = filtered.filter(s => s.gameType === filters.gameType)
  }
  
  if (filters.region !== 'all') {
    filtered = filtered.filter(s => s.region === filters.region)
  }
  
  if (filters.notFull) {
    filtered = filtered.filter(s => s.players < s.maxPlayers)
  }
  
  if (filters.lowPing) {
    filtered = filtered.filter(s => s.ping < 80)
  }
  
  return filtered
}
```

## Error Handling

```typescript
const handleJoinSafely = (server: Server) => {
  try {
    if (server.players >= server.maxPlayers) {
      toast.error('Server is full')
      return
    }
    
    if (server.ping > 200) {
      toast.warning('High ping detected. Connection may be unstable.')
    }
    
    handleServerJoin(server)
  } catch (error) {
    toast.error('Failed to join server')
    console.error(error)
  }
}
```

## Future Enhancements

- Real server API integration
- Favorite servers persistence
- Server history tracking
- Advanced sorting options
- Server detail modals
- Player list preview
- Server rules display
