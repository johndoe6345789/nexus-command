# Styling System

NEXUS COMMAND styling architecture using Tailwind CSS and custom theming.

## Theme Structure

### Color System

The theme uses CSS custom properties with oklch color format for consistent, vibrant colors.

**Location:** `src/index.css`

```css
:root {
  --background: oklch(0.12 0.02 250);
  --foreground: oklch(0.98 0.01 0);
  
  --card: oklch(0.15 0.025 250 / 0.5);
  --card-foreground: oklch(0.98 0.01 0);
  
  --popover: oklch(0.12 0.02 250 / 0.95);
  --popover-foreground: oklch(0.98 0.01 0);
  
  --primary: oklch(0.55 0.25 230);
  --primary-foreground: oklch(0.98 0.01 0);
  
  --secondary: oklch(0.55 0.12 270);
  --secondary-foreground: oklch(0.98 0.01 0);
  
  --muted: oklch(0.2 0.02 250);
  --muted-foreground: oklch(0.6 0.02 250);
  
  --accent: oklch(0.7 0.2 330);
  --accent-foreground: oklch(0.98 0.01 0);
  
  --destructive: oklch(0.55 0.25 25);
  --destructive-foreground: oklch(0.98 0.01 0);
  
  --border: oklch(0.55 0.12 230 / 0.25);
  --input: oklch(0.55 0.12 230 / 0.25);
  --ring: oklch(0.55 0.25 230);
  
  --radius: 0.5rem;
}
```

### Color Usage

#### Background Colors
```typescript
// Page background
<div className="bg-background">

// Card background
<div className="bg-card">

// Muted background for less prominent areas
<div className="bg-muted">
```

#### Text Colors
```typescript
// Primary text
<p className="text-foreground">

// Muted text for secondary information
<p className="text-muted-foreground">

// Accent text for emphasis
<span className="text-accent">
```

#### Action Colors
```typescript
// Primary actions
<Button className="bg-primary text-primary-foreground">

// Secondary actions
<Button className="bg-secondary text-secondary-foreground">

// Destructive actions
<Button className="bg-destructive text-destructive-foreground">

// Accent highlights
<div className="bg-accent text-accent-foreground">
```

### Typography System

**Fonts:**
- Heading: Orbitron (bold, futuristic)
- Body: Space Grotesk (readable, modern)

**Font Variables:**
```css
:root {
  --font-heading: 'Orbitron', system-ui, sans-serif;
  --font-body: 'Space Grotesk', system-ui, sans-serif;
}
```

**Usage:**
```typescript
// Headings
<h1 className="font-[var(--font-heading)] text-4xl font-bold">

// Body text
<p className="font-[var(--font-body)] text-base">
```

**Type Scale:**
```typescript
// Extra large (56px)
className="text-[56px] leading-tight"

// Large (48px)
className="text-5xl"

// Medium (32px)
className="text-3xl"

// Base (16px)
className="text-base"

// Small (14px)
className="text-sm"

// Extra small (12px)
className="text-xs"
```

### Border Radius System

```css
:root {
  --radius: 0.5rem; /* Base radius */
}

@theme {
  --radius-sm: calc(var(--radius) * 0.5);    /* 4px */
  --radius-md: var(--radius);                 /* 8px */
  --radius-lg: calc(var(--radius) * 1.5);    /* 12px */
  --radius-xl: calc(var(--radius) * 2);      /* 16px */
  --radius-2xl: calc(var(--radius) * 3);     /* 24px */
  --radius-full: 9999px;
}
```

**Usage:**
```typescript
<div className="rounded-sm">    // 4px
<div className="rounded-md">    // 8px
<div className="rounded-lg">    // 12px
<div className="rounded-xl">    // 16px
<div className="rounded-2xl">   // 24px
<div className="rounded-full">  // Fully rounded
```

## Animation System

### Framer Motion Variants

#### Page Transitions

```typescript
const pageVariants = {
  initial: { opacity: 0, scale: 0.98 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.98 }
}

const pageTransition = {
  duration: 0.3,
  ease: [0.22, 1, 0.36, 1]
}

<motion.div
  variants={pageVariants}
  initial="initial"
  animate="animate"
  exit="exit"
  transition={pageTransition}
>
```

#### Slide In

```typescript
const slideVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: { x: 0, opacity: 1 }
}

<motion.div
  variants={slideVariants}
  initial="hidden"
  animate="visible"
  transition={{ duration: 0.3 }}
>
```

#### Fade In

```typescript
const fadeVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
}

<motion.div
  variants={fadeVariants}
  initial="hidden"
  animate="visible"
  transition={{ duration: 0.2 }}
>
```

#### Scale In

```typescript
const scaleVariants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: { scale: 1, opacity: 1 }
}

<motion.div
  variants={scaleVariants}
  initial="hidden"
  animate="visible"
  transition={{ duration: 0.2, ease: "easeOut" }}
>
```

#### Stagger Children

```typescript
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
}

<motion.div variants={containerVariants} initial="hidden" animate="visible">
  {items.map(item => (
    <motion.div key={item.id} variants={itemVariants}>
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

### CSS Animations

#### Pulse Effect

```css
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
```

#### Glow Effect

```css
@keyframes glow {
  0%, 100% {
    box-shadow: 0 0 20px oklch(0.55 0.25 230 / 0.5);
  }
  50% {
    box-shadow: 0 0 40px oklch(0.55 0.25 230 / 0.8);
  }
}

.animate-glow {
  animation: glow 2s ease-in-out infinite;
}
```

## Layout Patterns

### Container

```typescript
<div className="container mx-auto px-4 max-w-7xl">
  {/* Content */}
</div>
```

### Flex Layouts

```typescript
// Horizontal
<div className="flex items-center gap-4">

// Vertical
<div className="flex flex-col gap-4">

// Centered
<div className="flex items-center justify-center min-h-screen">

// Space between
<div className="flex items-center justify-between">
```

### Grid Layouts

```typescript
// Responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

// Auto-fit grid
<div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
```

### Absolute Positioning

```typescript
// Full overlay
<div className="absolute inset-0">

// Bottom right
<div className="absolute bottom-4 right-4">

// Centered
<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
```

## Component Styling Patterns

### Card Component

```typescript
<div className="bg-card border border-border rounded-lg p-6 backdrop-blur-xl">
  <h3 className="text-xl font-bold mb-2">Title</h3>
  <p className="text-muted-foreground">Content</p>
</div>
```

### Button Styles

```typescript
// Primary
<button className="bg-primary text-primary-foreground px-6 py-3 rounded-md hover:opacity-90 transition-opacity">

// Secondary
<button className="bg-secondary text-secondary-foreground px-6 py-3 rounded-md hover:opacity-90">

// Outline
<button className="border-2 border-primary text-primary px-6 py-3 rounded-md hover:bg-primary hover:text-primary-foreground transition-colors">

// Ghost
<button className="text-foreground px-6 py-3 rounded-md hover:bg-muted transition-colors">
```

### Input Styles

```typescript
<input className="w-full bg-background border border-input text-foreground px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-ring" />
```

### Glass Effect

```typescript
<div className="bg-card/50 backdrop-blur-xl border border-border/50 rounded-lg">
```

## Responsive Design

### Breakpoints

```typescript
// Mobile first approach
<div className="text-sm md:text-base lg:text-lg xl:text-xl">

// Hidden on mobile
<div className="hidden md:block">

// Different layouts
<div className="flex-col md:flex-row">
```

### Mobile Optimizations

```typescript
// Touch-friendly spacing
<button className="p-4 min-h-[44px] min-w-[44px]">

// Mobile menu
<div className="fixed inset-x-0 bottom-0 md:relative">

// Stack on mobile
<div className="space-y-4 md:space-y-0 md:space-x-4 md:flex">
```

## Utility Classes

### Spacing

```typescript
// Padding
className="p-4"      // All sides
className="px-4"     // Horizontal
className="py-4"     // Vertical
className="pt-4"     // Top only

// Margin
className="m-4"      // All sides
className="mx-auto"  // Center horizontally
className="my-4"     // Vertical
```

### Effects

```typescript
// Shadow
className="shadow-sm shadow-md shadow-lg shadow-xl"

// Opacity
className="opacity-50 opacity-75 opacity-90"

// Blur
className="blur-sm backdrop-blur-xl"

// Transitions
className="transition-all duration-300 ease-in-out"
```

## Best Practices

1. **Use theme variables** - Always reference CSS custom properties
2. **Mobile first** - Design for mobile, enhance for desktop
3. **Consistent spacing** - Use Tailwind's spacing scale
4. **Semantic colors** - Use color names that indicate purpose
5. **Performance** - Minimize animations, use transforms
6. **Accessibility** - Ensure sufficient color contrast
7. **Composition** - Build complex styles from utility classes
8. **Reusable patterns** - Extract common styles to components

## Dark Mode Support

While NEXUS COMMAND uses a single dark theme, the system supports theme switching:

```typescript
// Add dark mode variant
className="bg-background dark:bg-background"

// Conditional classes
const isDark = true
className={isDark ? 'bg-background' : 'bg-white'}
```
