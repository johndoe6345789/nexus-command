# Atomic Component Framework

A comprehensive atomic design system for the NEXUS COMMAND game menu interface, built with React, Material-UI, and Framer Motion.

## Architecture

The component framework follows **Atomic Design principles** by Brad Frost, organizing UI components into five distinct layers:

### 🔹 Atoms (Basic Building Blocks)
Smallest, indivisible components that serve as foundational UI elements.

- **Icon** - Wrapper for Phosphor icons with optional animation
- **Text** - Typography component with animation and gradient support
- **GlowBox** - Container with customizable glow effects
- **Divider** - Separation element with optional glow styling

**Location:** `/src/components/atoms/`

### 🔸 Molecules (Simple Component Groups)
Combinations of atoms that form simple, functional UI components.

- **ActionButton** - Enhanced button with icon support and animations
- **GlassCard** - Glass morphism card with hover and selection states
- **IconLabel** - Icon and text label combination with optional value display
- **VolumeSlider** - Styled slider with icon, label, and value chip
- **PageHeader** - Standardized page title and subtitle component

**Location:** `/src/components/molecules/`

### 🔶 Organisms (Complex UI Sections)
More complex components composed of molecules and atoms that form distinct sections of the interface.

- **MenuGrid** - Grid layout for main menu navigation items
- **MapSelector** - Interactive map selection grid with thumbnails
- **DifficultySelector** - Vertical button list for difficulty selection
- **TabbedPanel** - Tabbed interface with icon-labeled tabs
- **AudioControls** - Complete audio settings with multiple sliders

**Location:** `/src/components/organisms/`

### 🔷 Templates (Page Layouts)
Page-level layouts that define the structure of complete screens.

- **PageLayout** - Standard page layout with header and back button
- **MainMenuLayout** - Main menu page layout with logo and tagline
- **TwoColumnLayout** - Two-column page layout for detail views

**Location:** `/src/components/templates/`

### 🔵 Pages (Complete Views)
Full page implementations using templates and organisms. These are the existing screen components:

- **MainMenu** - Main navigation hub
- **SinglePlayer** - Campaign mission selection
- **Multiplayer** - Server browser
- **Settings** - Configuration panel
- **PlayerStats** - Statistics dashboard

**Location:** `/src/components/`

## Usage Examples

### Using Atomic Components

```tsx
import { Icon, Text, GlowBox } from '@/components/atoms'
import { ActionButton, GlassCard } from '@/components/molecules'
import { MenuGrid } from '@/components/organisms'
import { PageLayout } from '@/components/templates'
import { Play } from '@phosphor-icons/react'

// Atoms
<Icon icon={Play} size={24} weight="bold" animated />
<Text variant="h2" gradient animated>Title</Text>
<GlowBox glowIntensity="high">Content</GlowBox>

// Molecules
<ActionButton 
  icon={Play} 
  variant="contained"
  onClick={handleClick}
>
  Start Game
</ActionButton>

<GlassCard hoverable selected>
  <Text variant="h5">Map Name</Text>
</GlassCard>

// Organisms
<MenuGrid 
  items={menuItems} 
  onNavigate={handleNavigate} 
/>

// Templates
<PageLayout 
  title="Settings" 
  subtitle="Configure your experience"
  onBack={handleBack}
>
  <YourContent />
</PageLayout>
```

### Refactoring Existing Components

The existing page components can now be refactored to use the atomic framework:

**Before:**
```tsx
// Lots of inline JSX with Material-UI components
<Box sx={{ minHeight: '100vh', p: 4 }}>
  <Button onClick={onBack}>Back</Button>
  <Typography variant="h2">Title</Typography>
  // ... more code
</Box>
```

**After:**
```tsx
import { PageLayout } from '@/components/templates'
import { MenuGrid } from '@/components/organisms'

<PageLayout title="Title" onBack={onBack}>
  <MenuGrid items={items} onNavigate={onNavigate} />
</PageLayout>
```

## Benefits

### ✅ Consistency
- Standardized components ensure visual and behavioral consistency
- Shared styling reduces duplication
- Centralized theming and animations

### ✅ Reusability
- Components can be composed in multiple ways
- Reduced code duplication across pages
- Easy to create new pages from existing components

### ✅ Maintainability
- Changes to atomic components cascade to all consumers
- Clear separation of concerns
- Easier to test individual components

### ✅ Scalability
- Easy to add new components at any level
- Clear patterns for component creation
- Modular architecture supports growth

### ✅ Developer Experience
- Intuitive component hierarchy
- Self-documenting structure
- Faster development with pre-built components

## Component Props Philosophy

Each component level follows specific prop patterns:

- **Atoms**: Basic styling, content, and simple behavior props
- **Molecules**: Functional props + composition of atom props
- **Organisms**: Business logic props + composition of molecule props
- **Templates**: Layout props + slot-based content areas
- **Pages**: Data fetching/state management + template composition

## Styling Approach

All components use Material-UI's `sx` prop for styling with:
- CSS custom properties from the theme
- Consistent spacing using 8px grid
- Glass morphism effects for premium feel
- Animations via Framer Motion

## Animation Strategy

- **Atoms**: Simple micro-interactions (scale, fade)
- **Molecules**: Combined animations with timing
- **Organisms**: Staggered animations for lists
- **Templates**: Page transition animations
- **Pages**: Orchestrated multi-component animations

## Future Enhancements

Potential additions to the framework:

- **Atoms**: Badge, Spinner, Avatar, StatusDot
- **Molecules**: SearchBar, FilterChip, ProgressBar, Notification
- **Organisms**: ServerList, WeaponSelector, LeaderboardTable
- **Templates**: ModalLayout, SidebarLayout, DashboardLayout
- **Utilities**: Animation presets, Theme hooks, Layout helpers

## File Structure

```
src/components/
├── atoms/
│   ├── Icon.tsx
│   ├── Text.tsx
│   ├── GlowBox.tsx
│   ├── Divider.tsx
│   └── index.ts
├── molecules/
│   ├── ActionButton.tsx
│   ├── GlassCard.tsx
│   ├── IconLabel.tsx
│   ├── VolumeSlider.tsx
│   ├── PageHeader.tsx
│   └── index.ts
├── organisms/
│   ├── MenuGrid.tsx
│   ├── MapSelector.tsx
│   ├── DifficultySelector.tsx
│   ├── TabbedPanel.tsx
│   ├── AudioControls.tsx
│   └── index.ts
├── templates/
│   ├── PageLayout.tsx
│   ├── MainMenuLayout.tsx
│   ├── TwoColumnLayout.tsx
│   └── index.ts
├── ui/ (shadcn components)
├── AnimatedBackground.tsx
├── Logo.tsx
├── GlitchText.tsx
├── MainMenu.tsx
├── SinglePlayer.tsx
├── Multiplayer.tsx
├── Settings.tsx
├── PlayerStats.tsx
└── index.ts
```

## Migration Guide

To migrate existing components to use the atomic framework:

1. **Identify repeating patterns** in your component
2. **Extract them to appropriate atomic levels**
3. **Replace inline JSX with atomic components**
4. **Consolidate styling into component props**
5. **Test for visual and functional parity**

Example migration can be found by comparing the old and new versions of Settings.tsx and SinglePlayer.tsx.

## Best Practices

1. **Keep atoms simple** - Single responsibility principle
2. **Make molecules reusable** - Avoid business logic
3. **Organisms contain context** - Business logic belongs here
4. **Templates are layout-only** - No data fetching
5. **Pages orchestrate everything** - Connect data to templates

## Contributing

When adding new components:

1. Determine the appropriate atomic level
2. Follow existing naming conventions
3. Use TypeScript for all props
4. Include JSDoc comments for complex props
5. Export from the level's index.ts
6. Update this documentation

---

Built with ❤️ for NEXUS COMMAND
