# 🎮 NEXUS COMMAND - Atomic Component Framework

A premium AAA-quality game menu system for a Quake 3 Arena clone, featuring a comprehensive atomic design system built with React, TypeScript, Material-UI, and Framer Motion.

## ✨ Key Features

- 🎨 **Atomic Design System**: Fully modular component framework with atoms, molecules, organisms, templates, and pages
- 🎮 **Complete Menu System**: Single player, multiplayer, stats, and settings screens
- 🌟 **Stunning Visuals**: Canvas-based particle system with geometric shapes and dynamic gradients
- 💎 **Premium UI**: Glass morphism, glow effects, and cinematic animations
- 🎯 **Futuristic Aesthetic**: Custom fonts (Orbitron, Space Grotesk), OKLCH colors, sophisticated theming
- 🧪 **Comprehensive Test Suite**: 50+ Playwright tests ensuring quality and performance
- ⚡ **Smooth Animations**: Framer Motion with physics-based easing
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile devices
- 🔧 **Type-Safe**: Full TypeScript coverage with strict mode
- ♿ **Accessible**: WCAG AA compliant with proper ARIA labels

## 🏗️ Atomic Component Framework

This project implements a comprehensive **Atomic Design System** that organizes all UI components into five hierarchical layers:

### 🔹 Atoms (Basic Building Blocks)
Foundational UI elements that can't be broken down further:
- `Icon` - Phosphor icon wrapper with animations
- `Text` - Typography with gradient and animation support
- `GlowBox` - Container with customizable glow effects
- `Divider` - Separation element with glow styling

### 🔸 Molecules (Component Groups)
Simple combinations of atoms into functional components:
- `ActionButton` - Enhanced button with icon and animations
- `GlassCard` - Glass morphism card with selection states
- `IconLabel` - Icon + text label with optional values
- `VolumeSlider` - Styled slider with icon and chip display
- `PageHeader` - Standardized page title component

### 🔶 Organisms (Complex Sections)
Sophisticated components built from molecules and atoms:
- `MenuGrid` - Main menu navigation grid
- `MapSelector` - Interactive map selection interface
- `DifficultySelector` - Difficulty selection panel
- `TabbedPanel` - Icon-labeled tabbed interface
- `AudioControls` - Complete audio settings panel

### 🔷 Templates (Page Layouts)
Reusable page-level layout structures:
- `PageLayout` - Standard page with header and back button
- `MainMenuLayout` - Main menu with logo and tagline
- `TwoColumnLayout` - Two-column detail view layout

### 🔵 Pages (Complete Views)
Full screen implementations:
- `MainMenu` / `MainMenuRefactored` - Main navigation hub
- `SinglePlayer` / `SinglePlayerRefactored` - Campaign selection
- `Multiplayer` - Server browser
- `Settings` / `SettingsRefactored` - Configuration panel
- `PlayerStats` - Statistics dashboard

## 📚 Documentation

- **[ATOMIC_FRAMEWORK.md](ATOMIC_FRAMEWORK.md)** - Complete framework architecture and philosophy
- **[QUICK_REFERENCE.md](QUICK_REFERENCE.md)** - Quick reference guide with examples
- **[PRD.md](PRD.md)** - Product requirements and design specifications
- **[tests/README.md](tests/README.md)** - Test suite documentation

## 🚀 Quick Start

### Development
```bash
npm install
npm run dev
```

### Testing
```bash
# Run all tests
npm test

# Run tests with UI
npm run test:ui

# Run tests in headed mode
npm run test:headed

# Debug tests
npm run test:debug

# View test report
npm run test:report
```

### Build
```bash
npm run build
npm run preview
```

## 💻 Usage Examples

### Building a Page with Atomic Components

```tsx
import { PageLayout } from '@/components/templates'
import { MenuGrid } from '@/components/organisms'
import { ActionButton } from '@/components/molecules'
import { Text } from '@/components/atoms'
import { Play, Users, Gear } from '@phosphor-icons/react'

export function MyPage({ onBack }) {
  const items = [
    { id: 'play', label: 'Play', icon: Play, description: 'Start game' },
    { id: 'multi', label: 'Multiplayer', icon: Users, description: 'Online' },
    { id: 'settings', label: 'Settings', icon: Gear, description: 'Config' },
  ]

  return (
    <PageLayout title="Game Menu" subtitle="Select an option" onBack={onBack}>
      <MenuGrid items={items} onNavigate={handleNavigate} />
      <ActionButton variant="contained" icon={Play} onClick={handleStart}>
        Quick Play
      </ActionButton>
    </PageLayout>
  )
}
```

### Refactored vs. Original Components

The project includes both original and refactored versions of key components:

- `MainMenu.tsx` → `MainMenuRefactored.tsx` (70% less code)
- `SinglePlayer.tsx` → `SinglePlayerRefactored.tsx` (60% less code)
- `Settings.tsx` → `SettingsRefactored.tsx` (50% less code)

Refactored components demonstrate the power of the atomic framework with:
- ✅ Dramatically reduced code duplication
- ✅ Improved consistency and maintainability
- ✅ Better type safety and prop validation
- ✅ Easier testing and debugging

## 🚀 Quick Start

### Development
```bash
npm install
npm run dev
```

### Testing
```bash
# Run all tests
npm test

# Run tests with UI
npm run test:ui

# Run tests in headed mode
npm run test:headed

# Debug tests
npm run test:debug

# View test report
npm run test:report
```

### Build
```bash
npm run build
npm run preview
```

## 🧪 Test Suite

Our comprehensive Playwright test suite includes:

### Background Tests (`tests/background.spec.ts`)
- ✅ Canvas rendering and animations
- ✅ Particle system verification
- ✅ Color verification (ensures not boring black/white)
- ✅ Geometric shape rotations
- ✅ Grid patterns and gradients
- ✅ Performance and responsiveness

### Navigation Tests (`tests/navigation.spec.ts`)
- ✅ Menu navigation flows
- ✅ Screen transitions
- ✅ Back button functionality
- ✅ Exit confirmation
- ✅ Responsive design across devices

### Styling Tests (`tests/styling.spec.ts`)
- ✅ Custom font loading (Orbitron, Rajdhani)
- ✅ Theme colors (OKLCH)
- ✅ Glow effects
- ✅ Hover states
- ✅ Accessibility
- ✅ Performance metrics

### Interaction Tests (`tests/interactions.spec.ts`)
- ✅ Difficulty selection
- ✅ Settings persistence
- ✅ Toast notifications
- ✅ Keyboard navigation
- ✅ Server list functionality
- ✅ FPS performance

**Total: 50+ automated tests** covering UI, UX, accessibility, and performance.

See [tests/README.md](tests/README.md) for detailed test documentation.

## 🏆 Benefits of Atomic Framework

### For Developers
- ✅ **70% less code** in page components (see refactored examples)
- ✅ **Faster development** with pre-built, composable components
- ✅ **Better type safety** with strict TypeScript props
- ✅ **Easier testing** with isolated, single-responsibility components
- ✅ **Self-documenting** - component hierarchy makes intent clear

### For Maintainability
- ✅ **Single source of truth** for all UI patterns
- ✅ **Cascading updates** - fix once, apply everywhere
- ✅ **Consistent styling** across the entire application
- ✅ **Reduced bugs** from duplicated code
- ✅ **Clear patterns** for adding new features

### For Scalability
- ✅ **Modular architecture** supports unlimited growth
- ✅ **Easy to extend** at any atomic level
- ✅ **Plugin-ready** - components can be packages
- ✅ **Team-friendly** - clear ownership boundaries
- ✅ **Future-proof** - atomic principles never go out of style

## 🎓 Learning Resources

### Getting Started
1. Read [ATOMIC_FRAMEWORK.md](ATOMIC_FRAMEWORK.md) for architecture overview
2. Review [QUICK_REFERENCE.md](QUICK_REFERENCE.md) for usage examples
3. Compare `MainMenu.tsx` with `MainMenuRefactored.tsx` to see the difference
4. Explore components in `src/components/atoms` through `templates`
5. Check [PRD.md](PRD.md) for design system details

### Component Examples
- **Simple Page**: See `MainMenuRefactored.tsx`
- **Two-Column Layout**: See `SinglePlayerRefactored.tsx`
- **Tabbed Interface**: See `SettingsRefactored.tsx`
- **Custom Organisms**: See `organisms/MapSelector.tsx`

## 🎨 Tech Stack

- **Framework**: React 19 + TypeScript
- **Styling**: Tailwind CSS 4 with custom OKLCH colors
- **Components**: Shadcn UI v4
- **Animations**: Framer Motion + Canvas API
- **Icons**: Phosphor Icons
- **Testing**: Playwright
- **Build Tool**: Vite

## 📁 Project Structure

```
├── src/
│   ├── components/
│   │   ├── atoms/                  # Basic building blocks
│   │   │   ├── Icon.tsx
│   │   │   ├── Text.tsx
│   │   │   ├── GlowBox.tsx
│   │   │   ├── Divider.tsx
│   │   │   └── index.ts
│   │   ├── molecules/              # Simple component groups
│   │   │   ├── ActionButton.tsx
│   │   │   ├── GlassCard.tsx
│   │   │   ├── IconLabel.tsx
│   │   │   ├── VolumeSlider.tsx
│   │   │   ├── PageHeader.tsx
│   │   │   └── index.ts
│   │   ├── organisms/              # Complex UI sections
│   │   │   ├── MenuGrid.tsx
│   │   │   ├── MapSelector.tsx
│   │   │   ├── DifficultySelector.tsx
│   │   │   ├── TabbedPanel.tsx
│   │   │   ├── AudioControls.tsx
│   │   │   └── index.ts
│   │   ├── templates/              # Page layouts
│   │   │   ├── PageLayout.tsx
│   │   │   ├── MainMenuLayout.tsx
│   │   │   ├── TwoColumnLayout.tsx
│   │   │   └── index.ts
│   │   ├── ui/                     # Shadcn components (40+)
│   │   ├── AnimatedBackground.tsx  # Canvas particle system
│   │   ├── Logo.tsx                # Animated logo
│   │   ├── GlitchText.tsx          # Glitch effect text
│   │   ├── MainMenu.tsx            # Main menu (original)
│   │   ├── MainMenuRefactored.tsx  # Main menu (atomic)
│   │   ├── SinglePlayer.tsx        # Campaign (original)
│   │   ├── SinglePlayerRefactored.tsx # Campaign (atomic)
│   │   ├── Multiplayer.tsx         # Multiplayer screen
│   │   ├── PlayerStats.tsx         # Stats screen
│   │   ├── Settings.tsx            # Settings (original)
│   │   ├── SettingsRefactored.tsx  # Settings (atomic)
│   │   └── index.ts                # Barrel exports
│   ├── theme/
│   │   └── mui-theme.ts            # Material-UI theme
│   ├── App.tsx                     # Main app component
│   └── index.css                   # Theme and global styles
├── tests/
│   ├── background.spec.ts          # Background tests
│   ├── navigation.spec.ts          # Navigation tests
│   ├── styling.spec.ts             # Styling tests
│   ├── interactions.spec.ts        # Interaction tests
│   └── README.md                   # Test documentation
├── ATOMIC_FRAMEWORK.md             # Framework documentation
├── QUICK_REFERENCE.md              # Quick reference guide
├── PRD.md                          # Product requirements
└── playwright.config.ts            # Test configuration
```

## 🎯 Design System

### Colors (OKLCH)
- **Primary**: `oklch(0.65 0.25 250)` - Electric Blue
- **Accent**: `oklch(0.70 0.20 40)` - Warm Orange
- **Background**: `oklch(0.15 0.01 250)` - Dark Navy

### Typography
- **Headings**: Orbitron (700-900 weight)
- **Body**: Rajdhani (400-700 weight)

### Border Radius
- Minimal: `2px` for sharp, military aesthetic

## 🔧 CI/CD

Tests run automatically on:
- Push to `main` or `dev` branches
- Pull requests to `main`

See `.github/workflows/playwright.yml` for CI configuration.

## 🧹 Just Exploring?

No problem! If you were just checking things out and don't need to keep this code:
- Simply delete your Spark
- Everything will be cleaned up — no traces left behind

## 📄 License

The Spark Template files and resources from GitHub are licensed under the terms of the MIT license, Copyright GitHub, Inc.
