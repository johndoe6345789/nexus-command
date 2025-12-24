# NEXUS COMMAND API Documentation

Welcome to the NEXUS COMMAND API documentation. This documentation covers all APIs, components, utilities, and systems available in the game.

## Documentation Structure

- **[Core APIs](./api/)** - Core game APIs and systems
  - [Navigation API](./api/navigation.md) - Screen navigation and routing
  - [Server API](./api/server.md) - Multiplayer server management
  - [Game State API](./api/game-state.md) - Game state and persistence
  - [Console API](./api/console.md) - Developer console commands

- **[Components](./components/)** - React component documentation
  - [Atomic Components](./components/atomic.md) - Atoms, molecules, organisms
  - [Templates](./components/templates.md) - Page-level templates
  - [UI Components](./components/ui.md) - Shadcn UI component reference

- **[Types](./types/)** - TypeScript type definitions
  - [Core Types](./types/core.md) - Primary game types
  - [UI Types](./types/ui.md) - Component prop types

- **[Utilities](./utils/)** - Helper functions and utilities
  - [Game Utils](./utils/game.md) - Game calculation utilities
  - [Server Utils](./utils/server.md) - Server filtering and generation

- **[Hooks](./hooks/)** - React hooks
  - [Custom Hooks](./hooks/custom.md) - Game-specific hooks
  - [UI Hooks](./hooks/ui.md) - Interface hooks

- **[Styling](./styling/)** - Styling system documentation
  - [Theme System](./styling/theme.md) - Color and typography system
  - [Animation System](./styling/animations.md) - Framer Motion patterns

## Quick Start

```typescript
import { handleNavigate } from '@/handlers'
import { useKV } from '@github/spark/hooks'
import { Button } from '@/components/ui/button'

// Navigate between screens
const screen = handleNavigate('singleplayer')

// Persist game data
const [stats, setStats] = useKV('player-stats', defaultStats)

// Use UI components
<Button variant="default" onClick={handleAction}>
  Start Mission
</Button>
```

## Architecture Overview

NEXUS COMMAND follows an atomic design pattern with clear separation of concerns:

```
src/
├── components/        # React components (atomic structure)
│   ├── atoms/        # Basic building blocks
│   ├── molecules/    # Simple combinations
│   ├── organisms/    # Complex feature components
│   └── templates/    # Page-level layouts
├── handlers/         # Business logic handlers
├── utils/            # Pure utility functions
├── types/            # TypeScript definitions
├── hooks/            # React hooks
└── theme/            # Styling and theming
```

## Key Concepts

### Screen Navigation
The game uses a screen-based navigation system with transitions handled by Framer Motion.

### Data Persistence
Game data persists using the Spark KV store (`useKV` hook) for cross-session state.

### Atomic Design
Components follow atomic design principles for maximum reusability and maintainability.

## Support

For issues or questions:
- Review the relevant API documentation
- Check the [ARCHITECTURE.md](../ARCHITECTURE.md) for system design
- See [COMPONENT_ARCHITECTURE.md](../COMPONENT_ARCHITECTURE.md) for component patterns
