# Component Showcase

Visual examples and demonstrations of all atomic components in the NEXUS COMMAND framework.

## 🔹 Atoms

### Icon
Basic icon component with optional animations.

**Props:**
- `icon`: PhosphorIcon (required)
- `size`: number (default: 24)
- `weight`: 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone'
- `animated`: boolean (default: false)
- `style`: CSSProperties

**Examples:**
```tsx
// Basic icon
<Icon icon={Play} size={24} weight="bold" />

// Animated icon
<Icon icon={Play} size={32} weight="fill" animated />

// Styled icon
<Icon icon={Play} style={{ color: 'oklch(0.75 0.20 220)' }} />
```

### Text
Typography component with gradient and animation support.

**Props:**
- `variant`: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'caption'
- `gradient`: boolean (default: false)
- `animated`: boolean (default: false)
- `color`: string
- `align`: 'left' | 'center' | 'right'
- All Material-UI Typography props

**Examples:**
```tsx
// Heading with gradient
<Text variant="h2" gradient>NEXUS COMMAND</Text>

// Animated body text
<Text variant="body1" animated>Loading mission...</Text>

// Secondary text
<Text variant="body2" color="text.secondary">Configure your experience</Text>
```

### GlowBox
Container with customizable glow effects.

**Props:**
- `glowColor`: string (default: 'oklch(0.75 0.20 220)')
- `glowIntensity`: 'low' | 'medium' | 'high' (default: 'medium')
- All Material-UI Box props

**Examples:**
```tsx
// Medium glow (default)
<GlowBox>
  <Text variant="h4">Glowing Content</Text>
</GlowBox>

// High intensity glow
<GlowBox glowIntensity="high" glowColor="oklch(0.70 0.18 35)">
  <ActionButton>Important Action</ActionButton>
</GlowBox>
```

### Divider
Separation element with optional glow.

**Props:**
- `glow`: boolean (default: false)
- All Material-UI Divider props

**Examples:**
```tsx
// Standard divider
<Divider />

// Glowing divider
<Divider glow />
```

---

## 🔸 Molecules

### ActionButton
Enhanced button with icon support and animations.

**Props:**
- `icon`: PhosphorIcon
- `iconPosition`: 'start' | 'end' (default: 'start')
- `iconWeight`: Icon weight (default: 'bold')
- `animated`: boolean (default: true)
- All Material-UI Button props

**Examples:**
```tsx
// Primary button with icon
<ActionButton 
  variant="contained" 
  icon={Play}
  onClick={handleStart}
>
  Start Game
</ActionButton>

// Outlined button with end icon
<ActionButton 
  variant="outlined"
  icon={ArrowRight}
  iconPosition="end"
>
  Next
</ActionButton>

// No animation
<ActionButton animated={false} icon={Save}>
  Quick Save
</ActionButton>
```

### GlassCard
Glass morphism card with hover and selection states.

**Props:**
- `hoverable`: boolean (default: true)
- `animated`: boolean (default: true)
- `selected`: boolean (default: false)
- `onClick`: () => void
- All Material-UI Card props

**Examples:**
```tsx
// Hoverable card
<GlassCard>
  <Text variant="h5">Map Name</Text>
  <Text variant="body2">Description</Text>
</GlassCard>

// Selected card
<GlassCard selected onClick={handleSelect}>
  <Text variant="h5">Active Map</Text>
</GlassCard>

// Non-hoverable panel
<GlassCard hoverable={false}>
  <SettingsContent />
</GlassCard>
```

### IconLabel
Icon and text label combination.

**Props:**
- `icon`: PhosphorIcon (required)
- `iconSize`: number (default: 24)
- `iconWeight`: Icon weight (default: 'bold')
- `iconColor`: string (default: primary blue)
- `label`: string (required)
- `value`: string | number
- `showChip`: boolean (default: false)

**Examples:**
```tsx
// Label with text value
<IconLabel 
  icon={SpeakerHigh}
  label="Master Volume"
  value="80%"
/>

// Label with chip
<IconLabel 
  icon={GameController}
  label="Mouse Sensitivity"
  value="50"
  showChip
/>

// Just icon and label
<IconLabel 
  icon={Monitor}
  label="Graphics Quality"
/>
```

### VolumeSlider
Styled slider with icon, label, and value chip.

**Props:**
- `label`: string (required)
- `icon`: PhosphorIcon (required)
- `iconWeight`: Icon weight (default: 'bold')
- `value`: number (required)
- `onChange`: (value: number) => void (required)
- All Material-UI Slider props

**Examples:**
```tsx
// Basic volume slider
<VolumeSlider
  label="Master Volume"
  icon={SpeakerHigh}
  value={masterVolume}
  onChange={setMasterVolume}
/>

// Custom icon weight
<VolumeSlider
  label="Music Volume"
  icon={SpeakerHigh}
  iconWeight="duotone"
  value={musicVolume}
  onChange={setMusicVolume}
/>
```

### PageHeader
Standardized page title and subtitle.

**Props:**
- `title`: string (required)
- `subtitle`: string
- `animated`: boolean (default: true)
- All Material-UI Stack props

**Examples:**
```tsx
// Title only
<PageHeader title="Settings" />

// Title with subtitle
<PageHeader 
  title="Campaign"
  subtitle="Select your battlefield and difficulty"
/>

// No animation
<PageHeader 
  title="Statistics"
  subtitle="Your combat record"
  animated={false}
/>
```

---

## 🔶 Organisms

### MenuGrid
Grid layout for main menu navigation items.

**Props:**
- `items`: MenuItem[] (required)
  - `id`: string
  - `label`: string
  - `icon`: PhosphorIcon
  - `description`: string
- `onNavigate`: (id: string) => void (required)

**Examples:**
```tsx
const menuItems = [
  { 
    id: 'singleplayer', 
    label: 'Campaign', 
    icon: Play, 
    description: 'Single player missions' 
  },
  { 
    id: 'multiplayer', 
    label: 'Multiplayer', 
    icon: Users, 
    description: 'Join online battles' 
  },
]

<MenuGrid items={menuItems} onNavigate={handleNavigate} />
```

### MapSelector
Interactive map selection grid.

**Props:**
- `maps`: MapOption[] (required)
  - `id`: string
  - `name`: string
  - `terrain`: string
  - `players`: string
- `selectedMap`: string | null (required)
- `onSelectMap`: (mapId: string) => void (required)
- `icon`: PhosphorIcon (default: MapTrifold)

**Examples:**
```tsx
const maps = [
  { 
    id: 'aegis', 
    name: 'Aegis Station', 
    terrain: 'Space Station', 
    players: '8-16' 
  },
  { 
    id: 'nexus', 
    name: 'Nexus Core', 
    terrain: 'Industrial', 
    players: '12-24' 
  },
]

<MapSelector
  maps={maps}
  selectedMap={selectedMapId}
  onSelectMap={setSelectedMapId}
/>
```

### DifficultySelector
Vertical button list for difficulty selection.

**Props:**
- `difficulties`: DifficultyOption[] (required)
  - `id`: string
  - `label`: string
  - `color`: string
- `selectedDifficulty`: string (required)
- `onSelectDifficulty`: (id: string) => void (required)

**Examples:**
```tsx
const difficulties = [
  { id: 'recruit', label: 'Recruit', color: '#4ade80' },
  { id: 'veteran', label: 'Veteran', color: '#60a5fa' },
  { id: 'elite', label: 'Elite', color: '#fb923c' },
  { id: 'legendary', label: 'Legendary', color: '#f87171' },
]

<DifficultySelector
  difficulties={difficulties}
  selectedDifficulty={difficulty}
  onSelectDifficulty={setDifficulty}
/>
```

### TabbedPanel
Tabbed interface with icon-labeled tabs.

**Props:**
- `tabs`: TabConfig[] (required)
  - `label`: string
  - `icon`: PhosphorIcon
  - `content`: ReactNode
- `defaultTab`: number (default: 0)

**Examples:**
```tsx
const tabs = [
  {
    label: 'Graphics',
    icon: Monitor,
    content: <GraphicsSettings />
  },
  {
    label: 'Audio',
    icon: SpeakerHigh,
    content: <AudioSettings />
  },
]

<TabbedPanel tabs={tabs} defaultTab={0} />
```

### AudioControls
Complete audio settings with multiple sliders.

**Props:**
- `masterVolume`: number (required)
- `musicVolume`: number (required)
- `sfxVolume`: number (required)
- `onMasterVolumeChange`: (value: number) => void (required)
- `onMusicVolumeChange`: (value: number) => void (required)
- `onSfxVolumeChange`: (value: number) => void (required)

**Examples:**
```tsx
<AudioControls
  masterVolume={masterVolume}
  musicVolume={musicVolume}
  sfxVolume={sfxVolume}
  onMasterVolumeChange={setMasterVolume}
  onMusicVolumeChange={setMusicVolume}
  onSfxVolumeChange={setSfxVolume}
/>
```

---

## 🔷 Templates

### PageLayout
Standard page layout with header and back button.

**Props:**
- `title`: string (required)
- `subtitle`: string
- `onBack`: () => void
- `maxWidth`: string (default: '1200px')
- `children`: ReactNode (required)

**Examples:**
```tsx
// Simple page
<PageLayout title="Settings" onBack={handleBack}>
  <SettingsContent />
</PageLayout>

// With subtitle and custom width
<PageLayout 
  title="Statistics"
  subtitle="Your combat record"
  onBack={handleBack}
  maxWidth="1400px"
>
  <StatsContent />
</PageLayout>
```

### MainMenuLayout
Main menu page layout with logo and tagline.

**Props:**
- `tagline`: string (default: 'Next Generation Combat')
- `children`: ReactNode (required)
- `footer`: ReactNode

**Examples:**
```tsx
// Basic main menu
<MainMenuLayout>
  <MenuGrid items={items} onNavigate={handleNavigate} />
</MainMenuLayout>

// With custom tagline and footer
<MainMenuLayout 
  tagline="Elite Combat Operations"
  footer={<Text variant="body2">v2.0.1</Text>}
>
  <MenuGrid items={items} onNavigate={handleNavigate} />
</MainMenuLayout>
```

### TwoColumnLayout
Two-column page layout for detail views.

**Props:**
- `title`: string (required)
- `subtitle`: string
- `onBack`: () => void
- `leftColumn`: ReactNode (required)
- `rightColumn`: ReactNode (required)
- `leftColumnSize`: number (default: 8)
- `rightColumnSize`: number (default: 4)

**Examples:**
```tsx
// Standard 8-4 split
<TwoColumnLayout
  title="Campaign"
  subtitle="Select mission"
  onBack={handleBack}
  leftColumn={<MapSelector {...props} />}
  rightColumn={<DifficultyPanel {...props} />}
/>

// Custom 6-6 split
<TwoColumnLayout
  title="Server Browser"
  onBack={handleBack}
  leftColumn={<ServerList />}
  rightColumn={<ServerDetails />}
  leftColumnSize={6}
  rightColumnSize={6}
/>
```

---

## 🎨 Styling Patterns

### Glass Morphism
```tsx
sx={{
  background: 'rgba(18, 20, 31, 0.4)',
  backdropFilter: 'blur(40px) saturate(180%)',
  border: '1px solid rgba(74, 158, 255, 0.3)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
}}
```

### Glow Effect
```tsx
sx={{
  border: '1px solid oklch(0.75 0.20 220 / 0.5)',
  boxShadow: '0 0 20px oklch(0.75 0.20 220 / 0.3)',
  filter: 'drop-shadow(0 0 8px oklch(0.75 0.20 220 / 0.5))',
}}
```

### Gradient Background
```tsx
sx={{
  background: 'linear-gradient(135deg, oklch(0.75 0.20 220 / 0.1), oklch(0.70 0.18 35 / 0.1))',
}}
```

### Hover Scale
```tsx
sx={{
  transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
  '&:hover': {
    transform: 'scale(1.02)',
  },
}}
```

---

## 🎬 Animation Patterns

### Fade In
```tsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>
  <Content />
</motion.div>
```

### Slide In
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  <Content />
</motion.div>
```

### Staggered List
```tsx
{items.map((item, index) => (
  <motion.div
    key={item.id}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
  >
    <Item {...item} />
  </motion.div>
))}
```

### Hover Interaction
```tsx
<motion.div
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  transition={{ duration: 0.2 }}
>
  <Button />
</motion.div>
```

---

**Version:** 1.0  
**Last Updated:** Iteration 23  
**Component Count:** 24 atomic components + 5 pages
