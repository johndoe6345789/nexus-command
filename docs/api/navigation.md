# Navigation API

The Navigation API handles screen transitions and routing within the NEXUS COMMAND game menu system.

## Overview

The navigation system is screen-based with animated transitions using Framer Motion. All navigation flows through a central handler to ensure consistent behavior.

## Core Function

### `handleNavigate(screen: string): Screen | null`

Central navigation handler that validates and processes navigation requests.

**Location:** `src/handlers/handleNavigate.ts`

**Parameters:**
- `screen` (string): The target screen identifier

**Returns:**
- `Screen | null`: Valid screen type or null if invalid

**Valid Screens:**
- `'main'` - Main menu
- `'singleplayer'` - Single player game setup
- `'multiplayer'` - Multiplayer server browser
- `'settings'` - Game settings
- `'stats'` - Player statistics
- `'developer'` - Developer console and tools

**Example:**

```typescript
import { handleNavigate } from '@/handlers'

const handleNavigation = (target: string) => {
  const screen = handleNavigate(target)
  if (screen) {
    setCurrentScreen(screen)
  }
}

// Navigate to multiplayer
handleNavigation('multiplayer')
```

## Screen Type

```typescript
type Screen = 
  | 'main'
  | 'singleplayer'
  | 'multiplayer'
  | 'settings'
  | 'stats'
  | 'developer'
```

## Navigation Flow

### From Main Menu

```
Main Menu
├── Single Player → singleplayer screen
├── Multiplayer → multiplayer screen
├── Settings → settings screen
├── Statistics → stats screen
└── Developer → developer screen
```

### Back Navigation

All sub-screens provide a back button that returns to the main menu:

```typescript
const handleBack = () => {
  setCurrentScreen('main')
}
```

## Integration with App Component

The App component manages the current screen state and renders the appropriate component:

```typescript
import { useState } from 'react'
import { handleNavigate } from '@/handlers'
import { Screen } from '@/types'

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('main')

  const handleNav = (screen: string) => {
    const newScreen = handleNavigate(screen)
    if (newScreen) {
      setCurrentScreen(newScreen)
    }
  }

  const handleBack = () => {
    setCurrentScreen('main')
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div key={currentScreen}>
        {currentScreen === 'main' && <MainMenu onNavigate={handleNav} />}
        {currentScreen === 'singleplayer' && <SinglePlayer onBack={handleBack} />}
        {/* ... other screens */}
      </motion.div>
    </AnimatePresence>
  )
}
```

## Transitions

Screen transitions use Framer Motion with the following configuration:

```typescript
<motion.div
  key={currentScreen}
  initial={{ opacity: 0, scale: 0.98 }}
  animate={{ opacity: 1, scale: 1 }}
  exit={{ opacity: 0, scale: 0.98 }}
  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
>
```

**Transition Properties:**
- Duration: 300ms
- Easing: Custom cubic-bezier (0.22, 1, 0.36, 1)
- Mode: "wait" - Current screen exits before next enters
- Effects: Opacity fade + subtle scale

## Best Practices

1. **Always validate navigation targets** through `handleNavigate`
2. **Provide clear back navigation** on all sub-screens
3. **Use the Screen type** for type safety
4. **Maintain transition consistency** across all navigation events
5. **Handle invalid screens gracefully** by checking for null returns

## Error Handling

```typescript
const handleNav = (screen: string) => {
  const newScreen = handleNavigate(screen)
  
  if (!newScreen) {
    console.error(`Invalid navigation target: ${screen}`)
    // Optionally show toast notification
    toast.error('Navigation failed')
    return
  }
  
  setCurrentScreen(newScreen)
}
```

## Future Enhancements

Potential navigation system improvements:

- Navigation history/breadcrumbs
- Deep linking support
- Route-based navigation
- Navigation guards/middleware
- Animated page transitions with direction awareness
