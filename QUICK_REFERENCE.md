# Atomic Component Quick Reference

Quick reference guide for using the NEXUS COMMAND atomic component framework.

## 📦 Import Patterns

```tsx
// Import everything from the framework
import { 
  Icon, Text, GlowBox, Divider,
  ActionButton, GlassCard, IconLabel, VolumeSlider, PageHeader,
  MenuGrid, MapSelector, DifficultySelector, TabbedPanel, AudioControls,
  PageLayout, MainMenuLayout, TwoColumnLayout,
  AnimatedBackground, Logo, GlitchText
} from '@/components'

// Or import specific layers
import { Icon, Text } from '@/components/atoms'
import { ActionButton, GlassCard } from '@/components/molecules'
import { MenuGrid } from '@/components/organisms'
import { PageLayout } from '@/components/templates'
```

## 🔹 Atoms

### Icon
```tsx
import { Play } from '@phosphor-icons/react'
<Icon icon={Play} size={24} weight="bold" animated />
```

### Text
```tsx
<Text variant="h2" gradient animated>Title</Text>
<Text variant="body1" color="text.secondary">Description</Text>
```

### GlowBox
```tsx
<GlowBox glowColor="oklch(0.75 0.20 220)" glowIntensity="high">
  <YourContent />
</GlowBox>
```

### Divider
```tsx
<Divider glow />
```

## 🔸 Molecules

### ActionButton
```tsx
import { Play } from '@phosphor-icons/react'

<ActionButton 
  variant="contained"
  icon={Play}
  iconPosition="start"
  iconWeight="fill"
  onClick={handleClick}
  animated
>
  Start Game
</ActionButton>
```

### GlassCard
```tsx
<GlassCard 
  hoverable 
  selected={isSelected}
  onClick={handleClick}
  animated
>
  <YourContent />
</GlassCard>
```

### IconLabel
```tsx
import { SpeakerHigh } from '@phosphor-icons/react'

<IconLabel
  icon={SpeakerHigh}
  iconSize={28}
  iconWeight="bold"
  iconColor="#7EC4FF"
  label="Master Volume"
  value="80%"
  showChip
/>
```

### VolumeSlider
```tsx
import { SpeakerHigh } from '@phosphor-icons/react'

<VolumeSlider
  label="Master Volume"
  icon={SpeakerHigh}
  iconWeight="bold"
  value={volume}
  onChange={setVolume}
/>
```

### PageHeader
```tsx
<PageHeader 
  title="Settings" 
  subtitle="Configure your experience"
  animated 
/>
```

## 🔶 Organisms

### MenuGrid
```tsx
import { Play, Users, Gear } from '@phosphor-icons/react'

const items = [
  { id: 'play', label: 'Campaign', icon: Play, description: 'Single player' },
  { id: 'multi', label: 'Multiplayer', icon: Users, description: 'Online battles' },
  { id: 'settings', label: 'Settings', icon: Gear, description: 'Configure' },
]

<MenuGrid items={items} onNavigate={handleNavigate} />
```

### MapSelector
```tsx
const maps = [
  { id: 'aegis', name: 'Aegis Station', terrain: 'Space', players: '8-16' },
  { id: 'nexus', name: 'Nexus Core', terrain: 'Industrial', players: '12-24' },
]

<MapSelector 
  maps={maps}
  selectedMap={selectedMapId}
  onSelectMap={setSelectedMapId}
/>
```

### DifficultySelector
```tsx
const difficulties = [
  { id: 'easy', label: 'Easy', color: '#4ade80' },
  { id: 'hard', label: 'Hard', color: '#f87171' },
]

<DifficultySelector
  difficulties={difficulties}
  selectedDifficulty={difficulty}
  onSelectDifficulty={setDifficulty}
/>
```

### TabbedPanel
```tsx
import { Monitor, SpeakerHigh } from '@phosphor-icons/react'

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
```tsx
<AudioControls
  masterVolume={masterVol}
  musicVolume={musicVol}
  sfxVolume={sfxVol}
  onMasterVolumeChange={setMasterVol}
  onMusicVolumeChange={setMusicVol}
  onSfxVolumeChange={setSfxVol}
/>
```

## 🔷 Templates

### PageLayout
```tsx
<PageLayout 
  title="Settings"
  subtitle="Configure your experience"
  onBack={handleBack}
  maxWidth="1200px"
>
  <YourPageContent />
</PageLayout>
```

### MainMenuLayout
```tsx
<MainMenuLayout
  tagline="Next Generation Combat"
  footer={<FooterContent />}
>
  <MenuGrid items={items} onNavigate={handleNavigate} />
</MainMenuLayout>
```

### TwoColumnLayout
```tsx
<TwoColumnLayout
  title="Campaign"
  subtitle="Select mission"
  onBack={handleBack}
  leftColumn={<MapSelector {...props} />}
  rightColumn={<DifficultyPanel {...props} />}
  leftColumnSize={8}
  rightColumnSize={4}
/>
```

## 🎨 Styling Tips

### Using Theme Colors
```tsx
sx={{
  color: 'oklch(0.75 0.20 220)', // Primary blue
  background: 'oklch(0.08 0.01 250)', // Deep space black
  borderColor: 'oklch(0.70 0.18 35)', // Warm orange accent
}}
```

### Glass Morphism Effect
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
  boxShadow: '0 0 20px oklch(0.75 0.20 220 / 0.3)',
  filter: 'drop-shadow(0 0 8px oklch(0.75 0.20 220 / 0.5))',
}}
```

## 🎬 Animation Examples

### Framer Motion
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.1 }}
>
  <YourContent />
</motion.div>
```

### Staggered List Animation
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

## 🔧 Common Patterns

### Complete Page Example
```tsx
import { PageLayout } from '@/components/templates'
import { GlassCard, ActionButton } from '@/components/molecules'
import { Text } from '@/components/atoms'

export function MyPage({ onBack }) {
  return (
    <PageLayout title="My Page" onBack={onBack}>
      <GlassCard>
        <Text variant="h4">Section Title</Text>
        <ActionButton variant="contained" onClick={handleAction}>
          Action
        </ActionButton>
      </GlassCard>
    </PageLayout>
  )
}
```

### Settings Panel Pattern
```tsx
import { TabbedPanel } from '@/components/organisms'
import { Monitor, SpeakerHigh } from '@phosphor-icons/react'

const tabs = [
  { label: 'Graphics', icon: Monitor, content: <GraphicsTab /> },
  { label: 'Audio', icon: SpeakerHigh, content: <AudioTab /> },
]

<TabbedPanel tabs={tabs} />
```

### Selection Flow Pattern
```tsx
const [selected, setSelected] = useState(null)

<MapSelector 
  maps={maps}
  selectedMap={selected}
  onSelectMap={setSelected}
/>

<ActionButton
  disabled={!selected}
  onClick={() => handleConfirm(selected)}
>
  Confirm Selection
</ActionButton>
```

## 💡 Best Practices

1. **Always use atomic components** instead of raw Material-UI components
2. **Compose templates** for consistent page layouts
3. **Leverage organisms** for complex, reusable sections
4. **Keep business logic** in page components
5. **Use TypeScript props** for type safety
6. **Enable animations** for premium feel (most components have `animated` prop)
7. **Follow color scheme** with oklch values
8. **Apply glass morphism** for cards and panels
9. **Add glow effects** to interactive elements
10. **Maintain spacing** using 8px grid system

## 🚀 Performance Tips

- Set `animated={false}` on components inside frequently re-rendered lists
- Use `memo()` for expensive organisms
- Lazy load page components with `React.lazy()`
- Keep state as local as possible
- Use `useKV` for persistent data, `useState` for ephemeral UI state

## 📚 Further Reading

- [ATOMIC_FRAMEWORK.md](../ATOMIC_FRAMEWORK.md) - Complete framework documentation
- [PRD.md](../PRD.md) - Product requirements and design system
- Material-UI Documentation - For base component APIs
- Framer Motion Documentation - For animation APIs
- Phosphor Icons - For icon options

---

**Version:** 1.0  
**Last Updated:** Iteration 23  
**Framework Status:** Production Ready ✓
