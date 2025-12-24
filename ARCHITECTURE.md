# Project Structure Documentation

## Overview
This codebase has been organized into modular, maintainable files following best practices for TypeScript and SASS architecture.

## Directory Structure

```
src/
├── lib/
│   ├── canvas/                    # Canvas rendering utilities
│   │   ├── particle.ts            # Particle system logic
│   │   ├── hexagon.ts             # Hexagon rendering logic
│   │   ├── renderer.ts            # Main canvas renderer class
│   │   └── index.ts               # Barrel export
│   └── utils.ts                   # General utilities
├── styles/
│   ├── _variables.scss            # SASS variables (colors, fonts, etc.)
│   ├── _theme.scss                # CSS custom properties mapping
│   ├── _animations.scss           # Keyframe animations
│   ├── _utilities.scss            # Utility classes (glass-panel, glow-border)
│   ├── _base.scss                 # Base styles (resets, typography)
│   └── main.scss                  # Main SASS entry point
├── theme/
│   ├── components/                # MUI component style overrides
│   │   ├── button.ts              # Button styles
│   │   ├── card.ts                # Card & Paper styles
│   │   ├── input.ts               # TextField styles
│   │   ├── slider.ts              # Slider & Switch styles
│   │   ├── misc.ts                # Chip, AppBar, Dialog, etc.
│   │   └── index.ts               # Component barrel export
│   ├── palette.ts                 # Color palette definition
│   ├── typography.ts              # Typography configuration
│   └── mui-theme.ts               # Main MUI theme composition
└── components/
    └── AnimatedBackground.tsx     # Uses canvas renderer

```

## Architecture Patterns

### Canvas Rendering System
The canvas rendering code has been split into logical, single-responsibility modules:

- **particle.ts**: Manages particle entities with CRUD operations
- **hexagon.ts**: Manages hexagon entities with CRUD operations  
- **renderer.ts**: Orchestrates the animation loop and manages both particle and hexagon systems
- **index.ts**: Provides clean barrel exports

**Benefits:**
- Easy to test individual components
- Can swap particle systems without touching hexagon logic
- Clear separation of concerns
- Renderer can be easily extended with new shape systems

### SASS Structure
Following the 7-1 pattern (simplified), styles are organized by concern:

- **_variables.scss**: Single source of truth for design tokens
- **_theme.scss**: Maps SASS variables to CSS custom properties
- **_animations.scss**: All keyframe animations in one place
- **_utilities.scss**: Reusable utility classes
- **_base.scss**: Global base styles and resets
- **main.scss**: Imports all partials in correct order

**Benefits:**
- Variables can be reused across all SASS files
- Easy to locate specific styles
- Reduced duplication
- Clear import hierarchy

### MUI Theme Organization
Theme configuration is split by domain:

- **palette.ts**: All color definitions
- **typography.ts**: Font configuration and text hierarchy
- **components/**: Each component type in its own file
  - button.ts, card.ts, input.ts, slider.ts, misc.ts
- **mui-theme.ts**: Composes all theme pieces

**Benefits:**
- Easy to modify specific component styles
- Reduced file size for better navigation
- Clear ownership of styling concerns
- Can easily add/remove component overrides

## Usage Examples

### Using Canvas Renderer
```typescript
import { CanvasRenderer } from '@/lib/canvas'

const renderer = new CanvasRenderer(canvas, {
  particleCount: 100,
  hexagonCount: 10,
  connectionDistance: 200,
})

renderer.start()
```

### Using SASS Variables
```scss
@import './variables';

.my-component {
  background: $color-primary;
  font-family: $font-heading;
  border-radius: $radius;
}
```

### Extending MUI Theme
To add new component overrides:
1. Create a new file in `theme/components/` (e.g., `tooltip.ts`)
2. Export style overrides object
3. Import and spread in `theme/components/index.ts`

## Best Practices

### TypeScript Files
- One class/system per file
- Export interfaces alongside implementations
- Use barrel exports (index.ts) for clean imports
- Keep files under 300 lines

### SASS Files
- Prefix partials with underscore (e.g., `_variables.scss`)
- Import in order: variables → theme → base → utilities
- Use nesting sparingly (max 3 levels)
- Keep variables in `_variables.scss`, not inline

### Theme Files  
- Group related component styles together
- Use TypeScript for type safety
- Keep color/font definitions in dedicated files
- Document complex style overrides

## Migration Notes

The codebase has been refactored from:
- Monolithic `AnimatedBackground.tsx` → Modular canvas system
- Single `index.css` → Organized SASS architecture
- Large `mui-theme.ts` → Component-based theme modules

All functionality remains the same; only the organization has improved.
