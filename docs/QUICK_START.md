# Quick Reference

Fast lookup guide for common NEXUS COMMAND patterns and APIs.

## Common Imports

```typescript
// Navigation
import { handleNavigate } from '@/handlers'
import { Screen } from '@/types'

// Data persistence
import { useKV } from '@github/spark/hooks'

// UI components
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'

// Icons
import { Play, Users, Settings } from '@phosphor-icons/react'

// Animation
import { motion } from 'framer-motion'

// Notifications
import { toast } from 'sonner'

// Utilities
import { cn } from '@/lib/utils'
```

## Navigation

```typescript
// Navigate to screen
const screen = handleNavigate('multiplayer')
setCurrentScreen(screen)

// Back to main menu
setCurrentScreen('main')
```

## Data Persistence

```typescript
// Create persistent state
const [stats, setStats] = useKV('player-stats', defaultStats)

// Update (ALWAYS use functional updates)
setStats((current) => ({
  ...current,
  kills: current.kills + 1
}))

// Delete
const [data, setData, deleteData] = useKV('key', defaultValue)
deleteData()
```

## Server Operations

```typescript
// Generate servers
const servers = generateServers()

// Filter servers
const filtered = filterServers(servers, 'deathmatch')

// Join server
handleServerJoin(server)

// Refresh list
const newServers = handleServerRefresh()
```

## Console Commands

```typescript
// Execute command
const output = handleConsoleCommand('stats')

// Available commands
'help', 'clear', 'stats', 'fps', 'version'
```

## Styling

```typescript
// Colors
className="bg-background text-foreground"
className="bg-primary text-primary-foreground"
className="bg-card border-border"

// Layout
className="flex items-center gap-4"
className="grid grid-cols-3 gap-4"

// Responsive
className="text-sm md:text-base lg:text-lg"
className="hidden md:block"

// Effects
className="hover:opacity-90 transition-opacity"
className="backdrop-blur-xl bg-card/50"
```

## Animations

```typescript
// Page transition
<motion.div
  initial={{ opacity: 0, scale: 0.98 }}
  animate={{ opacity: 1, scale: 1 }}
  exit={{ opacity: 0, scale: 0.98 }}
  transition={{ duration: 0.3 }}
>

// Fade in
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.2 }}
>
```

## Notifications

```typescript
// Success
toast.success('Mission completed!')

// Error
toast.error('Connection failed')

// Info
toast.info('Server refreshed')

// Warning
toast.warning('High ping detected')
```

## Common Patterns

### Component with Navigation

```typescript
interface Props {
  onBack: () => void
}

function MyScreen({ onBack }: Props) {
  return (
    <div>
      <Button onClick={onBack}>Back</Button>
      {/* Content */}
    </div>
  )
}
```

### Component with Persistence

```typescript
function MyComponent() {
  const [data, setData] = useKV('my-data', defaultValue)
  
  const update = () => {
    setData((current) => ({ ...current, field: newValue }))
  }
  
  return <div>{data.field}</div>
}
```

### Form Input

```typescript
<div className="space-y-2">
  <Label htmlFor="input">Label</Label>
  <Input
    id="input"
    value={value}
    onChange={(e) => setValue(e.target.value)}
    placeholder="Enter value..."
  />
</div>
```

### Server List Item

```typescript
<Card>
  <CardHeader>
    <CardTitle>{server.name}</CardTitle>
  </CardHeader>
  <CardContent>
    <p>{server.map} - {server.gameType}</p>
    <p>{server.players}/{server.maxPlayers} - {server.ping}ms</p>
    <Button onClick={() => handleServerJoin(server)}>Join</Button>
  </CardContent>
</Card>
```

### Statistics Display

```typescript
const kd = calculateKD(stats.kills, stats.deaths)
const winRate = calculateWinRate(stats.wins, stats.losses)

<div>
  <p>K/D: {kd}</p>
  <p>Win Rate: {winRate}%</p>
  <p>Games: {stats.gamesPlayed}</p>
</div>
```

### Settings Slider

```typescript
<div className="space-y-2">
  <Label>Master Volume: {volume}%</Label>
  <Slider
    value={[volume]}
    onValueChange={([value]) => {
      setSettings((current) => ({
        ...current,
        masterVolume: value
      }))
    }}
    min={0}
    max={100}
    step={1}
  />
</div>
```

## Type Definitions

```typescript
// Screen navigation
type Screen = 'main' | 'singleplayer' | 'multiplayer' | 'settings' | 'stats' | 'developer'

// Server info
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

// Player stats
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

## Utility Functions

```typescript
// Calculate K/D ratio
const kd = calculateKD(kills, deaths)

// Calculate win rate
const winRate = calculateWinRate(wins, losses)

// Filter servers
const filtered = filterServers(servers, searchTerm)

// Generate servers
const servers = generateServers()

// Handle console command
const output = handleConsoleCommand(command)
```

## Component Props

```typescript
// With navigation
interface WithNav {
  onBack: () => void
}

// With navigation handler
interface WithNavHandler {
  onNavigate: (screen: string) => void
}

// Generic action
interface WithAction<T> {
  onAction: (item: T) => void
}
```

## Best Practices Checklist

- ✅ Use functional updates with `useKV`
- ✅ Type all props and state
- ✅ Handle loading states
- ✅ Provide user feedback (toasts)
- ✅ Validate user input
- ✅ Use semantic color classes
- ✅ Implement responsive design
- ✅ Add keyboard navigation
- ✅ Handle errors gracefully
- ✅ Test components

## Common Mistakes to Avoid

```typescript
// ❌ WRONG - Stale closure
setValue([...value, newItem])

// ✅ CORRECT - Functional update
setValue((current) => [...current, newItem])

// ❌ WRONG - Direct mutation
stats.kills++

// ✅ CORRECT - Immutable update
setStats((current) => ({ ...current, kills: current.kills + 1 }))

// ❌ WRONG - Missing dependency
useEffect(() => {
  doSomething(data)
}, [])

// ✅ CORRECT - Include dependencies
useEffect(() => {
  doSomething(data)
}, [data])
```

## File Structure

```
src/
├── components/         # React components
│   ├── atoms/         # Basic components
│   ├── molecules/     # Simple combinations
│   ├── organisms/     # Complex features
│   └── ui/           # Shadcn components
├── handlers/          # Business logic
├── utils/             # Helper functions
├── types/             # TypeScript types
├── hooks/             # Custom hooks
├── theme/             # Styling
├── App.tsx           # Root component
└── index.css         # Theme variables
```

## Environment

```typescript
// Spark globals
spark.llm(prompt)                    // LLM API
spark.kv.set(key, value)            // Direct KV
spark.user()                         // User info

// React hooks
useKV(key, defaultValue)            // Persistent state
useState(initialValue)               // Local state
useEffect(effect, deps)              // Side effects
useMemo(factory, deps)               // Memoization
```

## Testing Patterns

```typescript
import { render, screen, fireEvent } from '@testing-library/react'

test('component renders', () => {
  render(<Component />)
  expect(screen.getByText('Text')).toBeInTheDocument()
})

test('handles interaction', () => {
  const handler = jest.fn()
  render(<Component onClick={handler} />)
  
  fireEvent.click(screen.getByRole('button'))
  expect(handler).toHaveBeenCalled()
})
```

## Performance Tips

```typescript
// Memoize expensive calculations
const value = useMemo(() => expensiveCalc(data), [data])

// Memoize callbacks
const callback = useCallback(() => {
  doSomething(value)
}, [value])

// Debounce frequent updates
const debouncedUpdate = debounce(update, 300)

// Virtualize long lists
<ScrollArea className="h-[400px]">
  {items.map(item => <Item key={item.id} {...item} />)}
</ScrollArea>
```

## Debugging

```typescript
// Console logging
console.log('Debug:', data)
console.error('Error:', error)

// React DevTools
// Component name for debugging
MyComponent.displayName = 'MyComponent'

// Performance profiling
// Use React DevTools Profiler

// Network inspection
// Use browser DevTools Network tab
```
