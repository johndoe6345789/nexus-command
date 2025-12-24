# Utility Functions

Helper functions and utilities for NEXUS COMMAND.

## Game Utilities

### `calculateKD(kills: number, deaths: number): number`

Calculates Kill/Death ratio.

**Location:** `src/utils/calculateKD.ts`

**Parameters:**
- `kills` (number): Total kills
- `deaths` (number): Total deaths

**Returns:**
- `number`: K/D ratio (rounded to 2 decimals)

**Example:**

```typescript
import { calculateKD } from '@/utils'

const kd = calculateKD(100, 50) // 2.00
const kdNoDeaths = calculateKD(10, 0) // 10.00
```

**Implementation:**
```typescript
export function calculateKD(kills: number, deaths: number): number {
  if (deaths === 0) return kills
  return Number((kills / deaths).toFixed(2))
}
```

---

### `calculateWinRate(wins: number, losses: number): number`

Calculates win rate percentage.

**Location:** `src/utils/calculateWinRate.ts`

**Parameters:**
- `wins` (number): Total wins
- `losses` (number): Total losses

**Returns:**
- `number`: Win rate percentage (0-100, rounded to 1 decimal)

**Example:**

```typescript
import { calculateWinRate } from '@/utils'

const winRate = calculateWinRate(65, 35) // 65.0
const perfect = calculateWinRate(10, 0) // 100.0
const noGames = calculateWinRate(0, 0) // 0.0
```

**Implementation:**
```typescript
export function calculateWinRate(wins: number, losses: number): number {
  const total = wins + losses
  if (total === 0) return 0
  return Number(((wins / total) * 100).toFixed(1))
}
```

---

## Server Utilities

### `generateServers(): Server[]`

Generates mock multiplayer servers.

**Location:** `src/utils/generateServers.ts`

**Returns:**
- `Server[]`: Array of server objects

**Example:**

```typescript
import { generateServers } from '@/utils'

const servers = generateServers()
console.log(servers.length) // Variable count
```

**Features:**
- Random server count (10-20 servers)
- Varied player counts
- Realistic ping values
- Multiple game types
- Geographic regions
- Unique server names

---

### `filterServers(servers: Server[], searchTerm: string): Server[]`

Filters servers by search criteria.

**Location:** `src/utils/filterServers.ts`

**Parameters:**
- `servers` (Server[]): Server array to filter
- `searchTerm` (string): Search query

**Returns:**
- `Server[]`: Filtered servers

**Example:**

```typescript
import { filterServers } from '@/utils'

const filtered = filterServers(allServers, 'deathmatch')
const byRegion = filterServers(allServers, 'NA East')
```

**Search Fields:**
- Server name
- Map name
- Game type
- Region

---

## Console Utilities

### `handleConsoleCommand(command: string): string`

Processes developer console commands.

**Location:** `src/utils/handleConsoleCommand.ts`

**Parameters:**
- `command` (string): Command string

**Returns:**
- `string`: Command output

**Example:**

```typescript
import { handleConsoleCommand } from '@/utils'

const output = handleConsoleCommand('help')
const stats = handleConsoleCommand('stats')
const error = handleConsoleCommand('invalid') // "Error: Unknown command"
```

**Available Commands:**
- `help` - List commands
- `clear` - Clear console
- `stats` - Show player stats
- `fps` - Show frame rate
- `version` - Show version info
- More - see [Console API](../api/console.md)

---

## String Utilities

### `truncate(text: string, maxLength: number): string`

Truncates text to specified length.

```typescript
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength - 3) + '...'
}

// Usage
truncate('Very Long Server Name Here', 20) // "Very Long Server N..."
```

---

### `slugify(text: string): string`

Converts text to URL-friendly slug.

```typescript
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

// Usage
slugify('Blood Covenant Arena') // "blood-covenant-arena"
```

---

## Number Utilities

### `clamp(value: number, min: number, max: number): number`

Clamps value between min and max.

```typescript
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

// Usage
clamp(150, 0, 100) // 100
clamp(-10, 0, 100) // 0
clamp(50, 0, 100) // 50
```

---

### `lerp(start: number, end: number, t: number): number`

Linear interpolation between two values.

```typescript
export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t
}

// Usage
lerp(0, 100, 0.5) // 50
lerp(10, 20, 0.25) // 12.5
```

---

### `formatNumber(num: number): string`

Formats number with thousands separators.

```typescript
export function formatNumber(num: number): string {
  return num.toLocaleString()
}

// Usage
formatNumber(1234567) // "1,234,567"
```

---

### `formatTime(seconds: number): string`

Formats seconds as MM:SS or HH:MM:SS.

```typescript
export function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`
}

// Usage
formatTime(65) // "1:05"
formatTime(3665) // "1:01:05"
```

---

## Array Utilities

### `shuffle<T>(array: T[]): T[]`

Randomly shuffles array elements.

```typescript
export function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// Usage
shuffle([1, 2, 3, 4, 5]) // [3, 1, 5, 2, 4]
```

---

### `chunk<T>(array: T[], size: number): T[][]`

Splits array into chunks of specified size.

```typescript
export function chunk<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = []
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size))
  }
  return chunks
}

// Usage
chunk([1, 2, 3, 4, 5], 2) // [[1, 2], [3, 4], [5]]
```

---

### `unique<T>(array: T[]): T[]`

Returns array with unique values.

```typescript
export function unique<T>(array: T[]): T[] {
  return [...new Set(array)]
}

// Usage
unique([1, 2, 2, 3, 3, 3]) // [1, 2, 3]
```

---

## Date Utilities

### `formatDate(timestamp: number): string`

Formats Unix timestamp as readable date.

```typescript
export function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString()
}

// Usage
formatDate(Date.now()) // "1/15/2024"
```

---

### `timeAgo(timestamp: number): string`

Returns relative time string.

```typescript
export function timeAgo(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000)
  
  if (seconds < 60) return 'just now'
  
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days}d ago`
  
  const weeks = Math.floor(days / 7)
  if (weeks < 4) return `${weeks}w ago`
  
  return formatDate(timestamp)
}

// Usage
timeAgo(Date.now() - 1000 * 60 * 5) // "5m ago"
```

---

## Validation Utilities

### `isValidEmail(email: string): boolean`

Validates email address format.

```typescript
export function isValidEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

// Usage
isValidEmail('user@example.com') // true
isValidEmail('invalid') // false
```

---

### `isInRange(value: number, min: number, max: number): boolean`

Checks if value is within range.

```typescript
export function isInRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max
}

// Usage
isInRange(50, 0, 100) // true
isInRange(150, 0, 100) // false
```

---

## Storage Utilities

### `safeJSONParse<T>(json: string, fallback: T): T`

Safely parses JSON with fallback.

```typescript
export function safeJSONParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json)
  } catch {
    return fallback
  }
}

// Usage
const data = safeJSONParse(jsonString, { default: 'value' })
```

---

## Performance Utilities

### `debounce<T extends (...args: any[]) => any>(func: T, wait: number)`

Debounces function calls.

```typescript
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// Usage
const debouncedSearch = debounce((query: string) => {
  searchServers(query)
}, 300)
```

---

### `throttle<T extends (...args: any[]) => any>(func: T, limit: number)`

Throttles function calls.

```typescript
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

// Usage
const throttledScroll = throttle(() => {
  handleScroll()
}, 100)
```

---

## Best Practices

1. **Keep utilities pure** - No side effects
2. **Type parameters** - Use TypeScript generics
3. **Handle edge cases** - Validate inputs
4. **Document usage** - Provide examples
5. **Test thoroughly** - Unit test each utility
6. **Export from index** - Central export location
7. **Group by category** - Organize related functions
8. **Optimize performance** - Consider efficiency

## Utility Index

```typescript
// utils/index.ts
export { calculateKD } from './calculateKD'
export { calculateWinRate } from './calculateWinRate'
export { generateServers } from './generateServers'
export { filterServers } from './filterServers'
export { handleConsoleCommand } from './handleConsoleCommand'
```
