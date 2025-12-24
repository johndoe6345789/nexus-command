# Components Directory

## Overview

This directory contains all React components for the NEXUS COMMAND game menu system, organized using atomic design principles.

## Structure

```
components/
├── atoms/              # Basic building blocks
├── molecules/          # Simple component combinations
├── organisms/          # Complex component sections
├── templates/          # Page-level layouts
├── props/              # TypeScript prop interfaces
├── ui/                 # shadcn/ui component library
└── [Screen Components] # Main screen components
```

## ⚠️ Note on *Refactored.tsx Files

The following files are **empty placeholders** containing only `export {}` and should be **ignored**:
- `DeveloperRefactored.tsx`
- `MainMenuRefactored.tsx`
- `MultiplayerRefactored.tsx`
- `PlayerStatsRefactored.tsx`
- `SettingsRefactored.tsx`
- `SinglePlayerRefactored.tsx`

These files are NOT used anywhere in the codebase and can be safely deleted. They are artifacts from a previous refactoring process.

## Main Screen Components

These are the top-level components that represent each screen in the application:

- **MainMenu.tsx** - Main menu with navigation grid
- **SinglePlayer.tsx** - Campaign mode and map selection
- **Multiplayer.tsx** - Online multiplayer server browser
- **Settings.tsx** - Game configuration and preferences
- **PlayerStats.tsx** - Player statistics and match history
- **Developer.tsx** - Developer tools and debugging console

## Shared Components

- **AnimatedBackground.tsx** - Animated particle background
- **GlitchText.tsx** - Text with glitch animation effect
- **Logo.tsx** - Application logo with animations

## Atomic Design Hierarchy

### Atoms (10 components)
Basic, indivisible UI elements:
- BackButton, ContentCard, Divider, GlowBox, Icon
- PageContainer, PageHeader, StatCard, Text

### Molecules (12 components)
Simple combinations of atoms:
- ActionButton, DebugToggle, DifficultySelector, GlassCard
- IconLabel, MapCard, MatchHistoryCard, PageHeader
- ServerCard, VolumeControl, VolumeSlider

### Organisms (19 components)
Complex UI sections combining molecules and atoms:
- AudioControls, CheatCodesTab, ConsolePanel, ConsoleTab
- DebugOptionsTab, DeveloperTabs, DifficultySelector
- MapSelectionGrid, MapSelector, MenuGrid
- MissionControlPanel, OverviewTab, ProceduralGenPanel
- ProceduralGenTab, RenderStatsTab, ServerInfoPanel
- ServerList, TabbedPanel

### Templates (3 components)
Page-level layout structures:
- MainMenuLayout, PageLayout, TwoColumnLayout

## Usage

Import components from their respective locations:

```typescript
// Main screen components
import { MainMenu } from './components/MainMenu'
import { Developer } from './components/Developer'

// Atomic components via index
import { PageContainer, BackButton } from './components/atoms'
import { VolumeControl } from './components/molecules'
import { MenuGrid } from './components/organisms'
import { MainMenuLayout } from './components/templates'

// UI components (shadcn)
import { Button } from './components/ui/button'
import { Card } from './components/ui/card'
```

## Props

All component props are typed and located in `./props/`:

```typescript
import { MainMenuProps, DeveloperProps } from './components/props'
```

## Notes

- All components use Material-UI (MUI) with custom theming
- Animations are powered by framer-motion
- Icons come from @phosphor-icons/react
- Components follow the atomic design pattern for maintainability
