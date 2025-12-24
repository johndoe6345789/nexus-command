# API Documentation Index

Complete index of all NEXUS COMMAND APIs and documentation.

## 📚 Documentation Structure

### Core Documentation
- **[README](./README.md)** - Overview and getting started
- **[Quick Start Guide](./QUICK_START.md)** - Fast reference for common patterns
- **[Code Examples](./EXAMPLES.md)** - Complete component implementations

### API Documentation
- **[Navigation API](./api/navigation.md)** - Screen routing and transitions
- **[Server API](./api/server.md)** - Multiplayer server management
- **[Game State API](./api/game-state.md)** - Data persistence with KV store
- **[Console API](./api/console.md)** - Developer console and commands

### Component Documentation
- **[Atomic Components](./components/atomic.md)** - Component architecture and patterns

### Type Documentation
- **[Core Types](./types/core.md)** - TypeScript type definitions

### Utility Documentation
- **[Game Utilities](./utils/game.md)** - Helper functions and utilities

### Styling Documentation
- **[Theme System](./styling/theme.md)** - Colors, typography, and animations

### Hooks Documentation
- **[Custom Hooks](./hooks/custom.md)** - React hooks reference

## 🔍 Quick Lookup

### By Feature

**Navigation**
- [Navigation API](./api/navigation.md)
- [Screen Types](./types/core.md#screen)
- [handleNavigate](./api/navigation.md#handlenavigate)

**Data Persistence**
- [Game State API](./api/game-state.md)
- [useKV Hook](./hooks/custom.md#usekv)
- [Persistence Examples](./EXAMPLES.md)

**Multiplayer**
- [Server API](./api/server.md)
- [Server Types](./types/core.md#server)
- [generateServers](./utils/game.md#generateservers)
- [filterServers](./utils/game.md#filterservers)

**Statistics**
- [SystemStats Type](./types/core.md#systemstats)
- [calculateKD](./utils/game.md#calculatekd)
- [calculateWinRate](./utils/game.md#calculatewinrate)
- [Stats Example](./EXAMPLES.md#player-statistics-dashboard)

**UI Components**
- [Atomic Components](./components/atomic.md)
- [Shadcn UI Components](./components/atomic.md#shadcn-ui-components)

**Styling**
- [Theme System](./styling/theme.md)
- [Color System](./styling/theme.md#color-system)
- [Animation System](./styling/theme.md#animation-system)

**Developer Tools**
- [Console API](./api/console.md)
- [Console Commands](./api/console.md#available-commands)
- [Console Example](./EXAMPLES.md#developer-console)

### By API Function

| Function | Documentation | Description |
|----------|---------------|-------------|
| `handleNavigate` | [Navigation API](./api/navigation.md#handlenavigate) | Navigate between screens |
| `handleServerJoin` | [Server API](./api/server.md#handleserverjoin) | Join multiplayer server |
| `handleServerRefresh` | [Server API](./api/server.md#handleserverrefresh) | Refresh server list |
| `handleConsoleCommand` | [Console API](./api/console.md#handleconsolecommand) | Execute console command |
| `generateServers` | [Game Utils](./utils/game.md#generateservers) | Generate mock servers |
| `filterServers` | [Game Utils](./utils/game.md#filterservers) | Filter server list |
| `calculateKD` | [Game Utils](./utils/game.md#calculatekd) | Calculate K/D ratio |
| `calculateWinRate` | [Game Utils](./utils/game.md#calculatewinrate) | Calculate win rate |
| `useKV` | [Custom Hooks](./hooks/custom.md#usekv) | Persistent state hook |
| `useIsMobile` | [Custom Hooks](./hooks/custom.md#useismobile) | Mobile detection hook |

### By Type

| Type | Documentation | Description |
|------|---------------|-------------|
| `Screen` | [Core Types](./types/core.md#screen) | Navigation screen identifier |
| `Server` | [Core Types](./types/core.md#server) | Multiplayer server info |
| `Map` | [Core Types](./types/core.md#map) | Game map information |
| `Difficulty` | [Core Types](./types/core.md#difficulty) | Game difficulty level |
| `SystemStats` | [Core Types](./types/core.md#systemstats) | Player statistics |
| `MatchResult` | [Core Types](./types/core.md#matchresult) | Match result data |
| `MenuItem` | [Core Types](./types/core.md#menuitem) | Menu item configuration |

## 📖 Learning Path

### Beginners

1. Start with [Quick Start Guide](./QUICK_START.md)
2. Review [Code Examples](./EXAMPLES.md)
3. Explore [Navigation API](./api/navigation.md)
4. Learn [Game State API](./api/game-state.md)

### Intermediate

1. Study [Component Architecture](./components/atomic.md)
2. Master [Custom Hooks](./hooks/custom.md)
3. Understand [Theme System](./styling/theme.md)
4. Review [Type System](./types/core.md)

### Advanced

1. Deep dive into [Server API](./api/server.md)
2. Implement [Console Commands](./api/console.md)
3. Create custom utilities
4. Build complex components

## 🎯 Common Tasks

### Adding a New Screen

1. Define screen in [Screen type](./types/core.md#screen)
2. Add navigation handler in [Navigation API](./api/navigation.md)
3. Create component using [patterns](./EXAMPLES.md#full-screen-component)
4. Add to App.tsx routing

### Creating a Component

1. Choose [atomic level](./components/atomic.md)
2. Define TypeScript props
3. Use [UI components](./components/atomic.md#shadcn-ui-components)
4. Apply [theme styles](./styling/theme.md)
5. Add [animations](./styling/theme.md#animation-system)

### Persisting Data

1. Choose appropriate [useKV key](./api/game-state.md#storage-keys-convention)
2. Define TypeScript interface
3. Set default value
4. Use [functional updates](./api/game-state.md#best-practices)
5. Handle [edge cases](./api/game-state.md#error-recovery)

### Adding a Console Command

1. Review [available commands](./api/console.md#available-commands)
2. Implement in [handleConsoleCommand](./api/console.md#custom-command-registration)
3. Add help text
4. Test error handling

### Styling a Component

1. Use [color variables](./styling/theme.md#color-system)
2. Apply [typography](./styling/theme.md#typography-system)
3. Add [responsive design](./styling/theme.md#responsive-design)
4. Include [animations](./styling/theme.md#animation-system)

## 🔧 Development Workflow

### 1. Planning
- Review [PRD](../PRD.md) for requirements
- Check [Architecture](../ARCHITECTURE.md) for patterns
- Consult [Component Architecture](../COMPONENT_ARCHITECTURE.md)

### 2. Implementation
- Follow [Code Examples](./EXAMPLES.md)
- Use [Quick Reference](./QUICK_START.md)
- Apply [Best Practices](./api/game-state.md#best-practices)

### 3. Testing
- Test with real data
- Verify persistence
- Check responsive design
- Test error cases

### 4. Documentation
- Update relevant API docs
- Add code examples
- Document new types
- Update this index

## 🐛 Troubleshooting

### Data Loss Issues
- See [Game State API - Best Practices](./api/game-state.md#best-practices)
- Always use functional updates
- Never reference stale closures

### Navigation Not Working
- Check [Navigation API](./api/navigation.md)
- Verify Screen type
- Ensure handleNavigate is called correctly

### Styling Issues
- Review [Theme System](./styling/theme.md)
- Check CSS variable usage
- Verify Tailwind classes

### Component Not Rendering
- Check [Component Documentation](./components/atomic.md)
- Verify props interface
- Check TypeScript errors

## 📝 Contributing

When adding new features:

1. **Document APIs** - Add to relevant API doc
2. **Add Examples** - Include in EXAMPLES.md
3. **Update Types** - Document in types/core.md
4. **Update Index** - Add entries to this file
5. **Add Quick Reference** - Update QUICK_START.md

## 🔗 External Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Shadcn UI](https://ui.shadcn.com)
- [Phosphor Icons](https://phosphoricons.com)

## 📄 License

See [LICENSE](../LICENSE) for details.
