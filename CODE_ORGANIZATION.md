# NEXUS COMMAND - Code Organization

This project follows a **one function/interface per file** architecture for maximum modularity and maintainability.

## Directory Structure

```
src/
├── components/          # React components organized by atomic design
│   ├── atoms/          # Basic building blocks (Button, Text, etc.)
│   ├── molecules/      # Simple combinations of atoms
│   ├── organisms/      # Complex UI sections
│   ├── templates/      # Page layouts
│   └── props/          # Component prop interfaces (one per file)
├── constants/          # Static configuration values
├── data/              # Static data collections
├── handlers/          # Event handler functions (one per file)
├── hooks/             # Custom React hooks
├── lib/               # Third-party library utilities
│   └── canvas/        # Canvas rendering utilities
├── theme/             # MUI theme configuration
├── types/             # TypeScript type definitions (one per file)
└── utils/             # Pure utility functions (one per file)
```

## File Organization Principles

### 1. One Function Per File
Each utility function lives in its own file:
```typescript
// utils/calculateKD.ts
export function calculateKD(kills: number, deaths: number): string {
  return (kills / deaths).toFixed(2)
}
```

### 2. One Interface Per File
Each type/interface has its own file:
```typescript
// types/Server.ts
export interface Server {
  id: string
  name: string
  // ...
}
```

### 3. One Handler Per File
Each event handler function is isolated:
```typescript
// handlers/handleMissionStart.ts
export function handleMissionStart(...) {
  // handler logic
}
```

### 4. One Component Per File
Each React component is in its own file with props interfaces extracted.

## Key Directories

### `/constants`
Immutable configuration values:
- `app.ts` - App metadata (name, version, tagline)
- `console.ts` - Console initial state
- `limits.ts` - Numeric constraints

### `/data`
Static data collections:
- `maps.ts` - Game map definitions
- `difficulties.ts` - Difficulty level options
- `menuItems.ts` - Main menu configuration

### `/handlers`
Event handler functions:
- `handleMissionStart.ts` - Single player mission initialization
- `handleServerRefresh.ts` - Multiplayer server list refresh
- `handleServerJoin.ts` - Server connection logic
- `handleNavigate.ts` - Navigation between screens

### `/types`
TypeScript type definitions:
- `Screen.ts` - Screen navigation type
- `Difficulty.ts` - Difficulty level type
- `Map.ts` - Map data structure
- `Server.ts` - Server data structure
- `MatchResult.ts` - Match history structure
- `SystemStats.ts` - Performance statistics
- `MenuItem.ts` - Menu item structure

### `/utils`
Pure utility functions:
- `calculateKD.ts` - K/D ratio calculation
- `calculateWinRate.ts` - Win rate percentage
- `filterServers.ts` - Server list filtering
- `generateServers.ts` - Mock server generation
- `handleConsoleCommand.ts` - Console command processor

### `/components/props`
Component prop interfaces:
- `SinglePlayerProps.ts`
- `MultiplayerProps.ts`
- `SettingsProps.ts`
- `PlayerStatsProps.ts`
- `DeveloperProps.ts`
- `MainMenuRefactoredProps.ts`

## Import Patterns

All directories have `index.ts` files for clean imports:

```typescript
// Instead of:
import { calculateKD } from '@/utils/calculateKD'
import { calculateWinRate } from '@/utils/calculateWinRate'

// Use:
import { calculateKD, calculateWinRate } from '@/utils'
```

## Benefits of This Architecture

1. **Easy Testing** - Each function can be unit tested in isolation
2. **Clear Dependencies** - Import statements show exactly what's used
3. **No Circular Dependencies** - One-way dependency flow
4. **Simple Refactoring** - Moving/renaming is straightforward
5. **Better Tree Shaking** - Bundlers can optimize unused code
6. **Team Collaboration** - Fewer merge conflicts
7. **Clear Responsibility** - Each file has one clear purpose

## Adding New Code

### Adding a New Type
1. Create `src/types/MyType.ts`
2. Export the type: `export interface MyType { ... }`
3. Add to `src/types/index.ts`: `export type { MyType } from './MyType'`

### Adding a New Utility
1. Create `src/utils/myFunction.ts`
2. Export the function: `export function myFunction(...) { ... }`
3. Add to `src/utils/index.ts`: `export { myFunction } from './myFunction'`

### Adding a New Handler
1. Create `src/handlers/handleMyAction.ts`
2. Export the handler: `export function handleMyAction(...) { ... }`
3. Add to `src/handlers/index.ts`: `export { handleMyAction } from './handleMyAction'`

### Adding a New Constant
1. Create or add to appropriate file in `src/constants/`
2. Export the constant: `export const MY_CONSTANT = ...`
3. Add to `src/constants/index.ts` if needed

## Component Structure

Components follow atomic design principles:

- **Atoms** - Basic UI elements (buttons, inputs, text)
- **Molecules** - Simple composites (cards, controls)
- **Organisms** - Complex sections (lists, panels, grids)
- **Templates** - Page layouts and structure

Each component imports only what it needs from shared directories.
