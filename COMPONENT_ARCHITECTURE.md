# Component Architecture

This project follows the **Atomic Design** methodology to create a scalable, maintainable component architecture.

## Structure Overview

```
src/components/
├── atoms/           # Basic building blocks
├── molecules/       # Simple combinations of atoms
├── organisms/       # Complex UI sections
├── templates/       # Page-level layouts
└── [pages]/        # Full page components
```

---

## Atoms

**Purpose:** The smallest, most fundamental UI components that can't be broken down further without losing their function.

### Available Atoms

- **BackButton** - Navigation button to return to previous screen
- **ContentCard** - Styled card with blur backdrop for content containers
- **Divider** - Visual separator element
- **GlowBox** - Container with glow effect
- **Icon** - Wrapper for Phosphor icons with animation support
- **PageContainer** - Max-width container for page content
- **PageHeader** - Title and subtitle section for pages
- **StatCard** - Card displaying a single statistic with icon
- **Text** - Typography component with gradient and animation support

### Example Usage

```tsx
import { BackButton, StatCard, Text } from '@/components/atoms'

<BackButton onBack={handleBack} />
<StatCard 
  icon={Trophy} 
  iconColor="#4ade80" 
  label="Win Rate" 
  value="67%" 
/>
<Text variant="h2" gradient animated>Welcome</Text>
```

---

## Molecules

**Purpose:** Simple combinations of atoms that function together as a cohesive unit.

### Available Molecules

- **ActionButton** - Button with icon and text
- **DebugToggle** - Toggle switch with title and description
- **DifficultySelector** - List of difficulty buttons
- **GlassCard** - Glassmorphism-style card
- **IconLabel** - Icon with accompanying text label
- **MapCard** - Selectable map card with preview and details
- **MatchHistoryCard** - Single match result card
- **ServerCard** - Server listing card with player count and ping
- **VolumeControl** - Slider with label and current value
- **VolumeSlider** - Basic volume slider component

### Example Usage

```tsx
import { MapCard, VolumeControl, DebugToggle } from '@/components/molecules'

<MapCard 
  id="aegis"
  name="Aegis Station"
  terrain="Space Station"
  players="8-16"
  selected={selectedMap === 'aegis'}
  onSelect={setSelectedMap}
/>

<VolumeControl 
  label="Master Volume"
  value={volume}
  onChange={setVolume}
/>

<DebugToggle
  title="God Mode"
  description="Become invincible to all damage"
  checked={godMode}
  onChange={setGodMode}
/>
```

---

## Organisms

**Purpose:** Complex UI sections composed of molecules and atoms that form distinct sections of an interface.

### Available Organisms

- **AudioControls** - Complete audio settings panel
- **ConsolePanel** - Developer console with output and input
- **DifficultySelector** (Organism) - Enhanced difficulty selection with visuals
- **MapSelectionGrid** - Grid of selectable maps
- **MapSelector** - Map selection interface
- **MenuGrid** - Main menu grid layout
- **MissionControlPanel** - Side panel for mission configuration
- **ServerInfoPanel** - Server details and join button
- **ServerList** - Filterable list of game servers
- **TabbedPanel** - Tabbed interface container

### Example Usage

```tsx
import { MapSelectionGrid, MissionControlPanel, ServerList } from '@/components/organisms'

<MapSelectionGrid
  maps={maps}
  selectedMap={selectedMap}
  onSelectMap={setSelectedMap}
/>

<MissionControlPanel
  difficulties={difficulties}
  selectedDifficulty={difficulty}
  onSelectDifficulty={setDifficulty}
  selectedMap={selectedMap}
  onStart={handleStart}
  loading={loading}
/>

<ServerList
  servers={servers}
  selectedServer={selectedServer}
  onSelectServer={setSelectedServer}
  searchQuery={searchQuery}
  onSearchChange={setSearchQuery}
/>
```

---

## Templates

**Purpose:** Page-level layouts that define structure and content placement.

### Available Templates

- **MainMenuLayout** - Layout for main menu screen
- **PageLayout** - Standard page layout with header and back button
- **TwoColumnLayout** - Two-column responsive layout

### Example Usage

```tsx
import { PageLayout, TwoColumnLayout } from '@/components/templates'

<PageLayout
  title="Campaign"
  subtitle="Select your battlefield"
  onBack={handleBack}
  maxWidth="1400px"
>
  <TwoColumnLayout
    leftColumn={<MapSelectionGrid {...mapProps} />}
    rightColumn={<MissionControlPanel {...controlProps} />}
    ratio={[2, 1]}
  />
</PageLayout>
```

---

## Pages (Refactored)

**Purpose:** Complete page components that use templates, organisms, molecules, and atoms.

### Refactored Pages

- **SinglePlayerRefactored** - Campaign/single-player mode selection
- **MultiplayerRefactored** - Online server browser
- **SettingsRefactored** - Game settings interface
- **PlayerStatsRefactored** - Player statistics and match history
- **DeveloperRefactored** - Developer tools and console

### Example Page Structure

```tsx
import { PageContainer, BackButton, ContentCard, PageHeader } from '@/components/atoms'
import { MapSelectionGrid, MissionControlPanel } from '@/components/organisms'

export function SinglePlayer({ onBack }: SinglePlayerProps) {
  return (
    <PageContainer>
      <BackButton onBack={onBack} />
      <ContentCard>
        <PageHeader title="Campaign" subtitle="Select your mission" />
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, lg: 8 }}>
            <MapSelectionGrid {...mapProps} />
          </Grid>
          <Grid size={{ xs: 12, lg: 4 }}>
            <MissionControlPanel {...controlProps} />
          </Grid>
        </Grid>
      </ContentCard>
    </PageContainer>
  )
}
```

---

## Benefits of This Architecture

### 1. **Reusability**
Components are designed to be used across multiple pages and contexts.

### 2. **Maintainability**
Changes to a component automatically propagate to all instances where it's used.

### 3. **Consistency**
Shared components ensure visual and behavioral consistency across the application.

### 4. **Testability**
Smaller, focused components are easier to test in isolation.

### 5. **Scalability**
New features can be built by composing existing components.

### 6. **Developer Experience**
Clear hierarchy makes it easy to find and understand components.

---

## Naming Conflicts Resolution

Some components exist at multiple levels (e.g., `PageHeader` in both atoms and molecules). When importing, use aliases:

```tsx
import { PageHeader } from '@/components/atoms'
import { MoleculePageHeader } from '@/components/molecules'
import { OrganismDifficultySelector } from '@/components/organisms'
```

Or import directly from the specific directory:

```tsx
import { PageHeader } from '@/components/atoms/PageHeader'
```

---

## Best Practices

### When to Create a New Atom
- Component has a single responsibility
- Cannot be meaningfully broken down further
- Reusable across many contexts
- Examples: Button, Icon, Text, Input

### When to Create a New Molecule
- Combines 2-3 atoms in a specific pattern
- Has a clear, single purpose
- Reusable in multiple organisms
- Examples: IconButton, LabeledInput, StatCard

### When to Create a New Organism
- Complex UI section with multiple molecules
- Represents a complete feature or section
- May have its own state logic
- Examples: NavigationBar, ServerBrowser, SettingsPanel

### When to Create a New Template
- Defines page-level layout structure
- Reusable across multiple pages
- Focuses on layout, not content
- Examples: TwoColumnLayout, DashboardLayout

---

## Component Communication Patterns

### Props Down, Events Up
```tsx
// Parent passes data down, receives callbacks up
<ServerCard
  {...serverData}
  selected={isSelected}
  onSelect={handleSelect}  // Event handler passed down
/>
```

### Composition
```tsx
// Components accept children for flexibility
<ContentCard>
  <CustomContent />
</ContentCard>
```

### Render Props (when needed)
```tsx
// For complex customization scenarios
<DataList
  items={items}
  renderItem={(item) => <CustomItem {...item} />}
/>
```

---

## Future Improvements

- [ ] Add Storybook for component documentation
- [ ] Create unit tests for all atoms and molecules
- [ ] Add accessibility (a11y) improvements
- [ ] Create component variants system
- [ ] Add theme switching support
- [ ] Document prop types with JSDoc comments
- [ ] Create component usage examples in docs
