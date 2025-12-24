# Component Documentation

NEXUS COMMAND component reference following atomic design principles.

## Architecture Overview

Components are organized into atomic design levels:

```
components/
├── atoms/          # Basic building blocks
├── molecules/      # Simple combinations
├── organisms/      # Complex features
├── templates/      # Page layouts
└── ui/            # Shadcn UI library
```

## Atomic Components

### Atoms

Basic, indivisible UI elements that serve as foundational building blocks.

#### Logo

Game logo component with optional animation.

**Location:** `src/components/Logo.tsx`

```typescript
interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  animated?: boolean
  className?: string
}

<Logo size="lg" animated />
```

#### GlitchText

Text with cyberpunk glitch effect animation.

**Location:** `src/components/GlitchText.tsx`

```typescript
interface GlitchTextProps {
  text: string
  className?: string
  intensity?: 'low' | 'medium' | 'high'
}

<GlitchText text="NEXUS COMMAND" intensity="high" />
```

### Molecules

Simple combinations of atoms serving a specific purpose.

Examples would include:
- Server list items
- Stat display cards
- Menu buttons with icons
- Input fields with labels

### Organisms

Complex, self-contained components combining molecules and atoms.

#### MainMenu

Primary navigation menu for the game.

**Location:** `src/components/MainMenuRefactored.tsx`

```typescript
interface MainMenuProps {
  onNavigate: (screen: string) => void
}

<MainMenu onNavigate={handleNavigate} />
```

**Features:**
- Animated logo
- Navigation buttons
- Background effects
- Responsive layout

#### SinglePlayer

Single player game setup screen.

**Location:** `src/components/SinglePlayerRefactored.tsx`

```typescript
interface SinglePlayerProps {
  onBack: () => void
}

<SinglePlayer onBack={handleBack} />
```

**Features:**
- Map selection
- Difficulty settings
- Bot configuration
- Mission briefing

#### Multiplayer

Multiplayer server browser.

**Location:** `src/components/MultiplayerRefactored.tsx`

```typescript
interface MultiplayerProps {
  onBack: () => void
}

<Multiplayer onBack={handleBack} />
```

**Features:**
- Server list with filtering
- Search functionality
- Server refresh
- Quick join buttons

#### PlayerStats

Player statistics dashboard.

**Location:** `src/components/PlayerStatsRefactored.tsx`

```typescript
interface PlayerStatsProps {
  onBack: () => void
}

<PlayerStats onBack={handleBack} />
```

**Features:**
- Statistics overview
- Win/loss charts
- Performance metrics
- Match history

#### Settings

Game settings configuration.

**Location:** `src/components/SettingsRefactored.tsx`

```typescript
interface SettingsProps {
  onBack: () => void
}

<Settings onBack={handleBack} />
```

**Features:**
- Audio controls
- Graphics settings
- Input configuration
- Accessibility options

#### Developer

Developer tools and console.

**Location:** `src/components/DeveloperRefactored.tsx`

```typescript
interface DeveloperProps {
  onBack: () => void
}

<Developer onBack={handleBack} />
```

**Features:**
- Command console
- System information
- Debug tools
- Performance monitoring

#### AnimatedBackground

Dynamic WebGL background renderer.

**Location:** `src/components/AnimatedBackground.tsx`

```typescript
<AnimatedBackground />
```

**Features:**
- WebGL particle effects
- Responsive canvas
- Performance optimized
- Ambient animation

## Shadcn UI Components

Pre-built UI components from Shadcn v4. See individual component files in `src/components/ui/` for implementation details.

### Commonly Used Components

#### Button

```typescript
import { Button } from '@/components/ui/button'

<Button variant="default" size="lg" onClick={handleClick}>
  Start Mission
</Button>
```

**Variants:** `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`

**Sizes:** `default`, `sm`, `lg`, `icon`

#### Card

```typescript
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

<Card>
  <CardHeader>
    <CardTitle>Server Information</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Players: 12/16</p>
  </CardContent>
</Card>
```

#### Input

```typescript
import { Input } from '@/components/ui/input'

<Input
  id="server-search"
  placeholder="Search servers..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>
```

#### Slider

```typescript
import { Slider } from '@/components/ui/slider'

<Slider
  value={[volume]}
  onValueChange={([value]) => setVolume(value)}
  min={0}
  max={100}
  step={1}
/>
```

#### Select

```typescript
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'

<Select value={difficulty} onValueChange={setDifficulty}>
  <SelectTrigger>
    <SelectValue placeholder="Select difficulty" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="easy">Easy</SelectItem>
    <SelectItem value="normal">Normal</SelectItem>
    <SelectItem value="hard">Hard</SelectItem>
  </SelectContent>
</Select>
```

#### Tabs

```typescript
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

<Tabs value={activeTab} onValueChange={setActiveTab}>
  <TabsList>
    <TabsTrigger value="console">Console</TabsTrigger>
    <TabsTrigger value="logs">Logs</TabsTrigger>
  </TabsList>
  <TabsContent value="console">
    <ConsolePanel />
  </TabsContent>
  <TabsContent value="logs">
    <LogsPanel />
  </TabsContent>
</Tabs>
```

#### Dialog

```typescript
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogTrigger asChild>
    <Button>Open Settings</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Settings</DialogTitle>
    </DialogHeader>
    <SettingsForm />
  </DialogContent>
</Dialog>
```

#### ScrollArea

```typescript
import { ScrollArea } from '@/components/ui/scroll-area'

<ScrollArea className="h-[400px]">
  <div className="p-4">
    {/* Long content */}
  </div>
</ScrollArea>
```

## Component Patterns

### With Navigation

```typescript
interface ComponentWithNav {
  onBack: () => void
}

function Screen({ onBack }: ComponentWithNav) {
  return (
    <div>
      <Button onClick={onBack}>Back</Button>
      {/* Screen content */}
    </div>
  )
}
```

### With Data Persistence

```typescript
import { useKV } from '@github/spark/hooks'

function PersistentComponent() {
  const [data, setData] = useKV('component-data', defaultData)
  
  return (
    <div>
      {/* Component using persistent data */}
    </div>
  )
}
```

### With Animation

```typescript
import { motion } from 'framer-motion'

function AnimatedComponent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {/* Content */}
    </motion.div>
  )
}
```

### With Icons

```typescript
import { Play, Users, Settings } from '@phosphor-icons/react'

function IconButton() {
  return (
    <Button>
      <Play className="mr-2" />
      Start Game
    </Button>
  )
}
```

## Best Practices

1. **Keep components focused** - Single responsibility
2. **Use prop types** - Always define TypeScript interfaces
3. **Prefer composition** - Combine smaller components
4. **Extract reusable logic** - Custom hooks for shared behavior
5. **Optimize renders** - Use memo, useMemo, useCallback wisely
6. **Handle loading states** - Show feedback during async operations
7. **Provide error boundaries** - Graceful error handling
8. **Test components** - Unit and integration tests

## Component Creation Guide

### Creating an Atom

```typescript
// components/atoms/MyAtom.tsx
interface MyAtomProps {
  value: string
  onChange?: (value: string) => void
}

export function MyAtom({ value, onChange }: MyAtomProps) {
  return (
    <div className="my-atom">
      {value}
    </div>
  )
}
```

### Creating a Molecule

```typescript
// components/molecules/MyMolecule.tsx
import { MyAtom } from '../atoms/MyAtom'
import { Button } from '../ui/button'

interface MyMoleculeProps {
  items: string[]
  onAction: () => void
}

export function MyMolecule({ items, onAction }: MyMoleculeProps) {
  return (
    <div className="my-molecule">
      {items.map(item => (
        <MyAtom key={item} value={item} />
      ))}
      <Button onClick={onAction}>Action</Button>
    </div>
  )
}
```

### Creating an Organism

```typescript
// components/organisms/MyOrganism.tsx
import { useState } from 'react'
import { MyMolecule } from '../molecules/MyMolecule'
import { useKV } from '@github/spark/hooks'

interface MyOrganismProps {
  onComplete: () => void
}

export function MyOrganism({ onComplete }: MyOrganismProps) {
  const [data, setData] = useKV('organism-data', [])
  const [loading, setLoading] = useState(false)

  const handleAction = async () => {
    setLoading(true)
    // Complex logic
    setLoading(false)
    onComplete()
  }

  return (
    <div className="my-organism">
      <MyMolecule items={data} onAction={handleAction} />
    </div>
  )
}
```

## Component Index

Export all components from a central index:

```typescript
// components/index.ts
export { MainMenu } from './MainMenuRefactored'
export { SinglePlayer } from './SinglePlayerRefactored'
export { Multiplayer } from './MultiplayerRefactored'
export { Settings } from './SettingsRefactored'
export { PlayerStats } from './PlayerStatsRefactored'
export { Developer } from './DeveloperRefactored'
export { AnimatedBackground } from './AnimatedBackground'
export { Logo } from './Logo'
export { GlitchText } from './GlitchText'
```

## Testing Components

```typescript
import { render, screen, fireEvent } from '@testing-library/react'
import { MyComponent } from './MyComponent'

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />)
    expect(screen.getByText('Expected Text')).toBeInTheDocument()
  })

  it('handles user interaction', () => {
    const handleClick = jest.fn()
    render(<MyComponent onClick={handleClick} />)
    
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalled()
  })
})
```
