# Planning Guide

A Quake 3 Arena-inspired menu system that captures the iconic sci-fi aesthetic and intense energy of the classic FPS, providing an immersive gateway to single-player and multiplayer game modes.

**Experience Qualities**:
1. **Premium** - AAAA-quality visual polish with refined animations, sophisticated glass morphism effects, and meticulously crafted details that project excellence and luxury
2. **Powerful** - Heavy industrial sci-fi aesthetic with bold typography and commanding presence that makes players feel ready for combat
3. **Responsive** - Buttery-smooth transitions with physics-based easing, immediate visual and audio feedback for every interaction, creating a tactile, high-performance feel

**Complexity Level**: Light Application (multiple features with basic state)
This is a menu system with navigation between different screens (main menu, server browser, settings, etc.) and basic state management for user preferences and selections. While it represents a complex game, the menu itself is focused on navigation and configuration.

## Essential Features

### Main Menu Navigation
- **Functionality**: Primary hub with options for Single Player, Multiplayer, Settings, and Exit
- **Purpose**: Central navigation point that establishes the game's visual identity and provides clear pathways to all features
- **Trigger**: App loads to main menu by default
- **Progression**: App loads → Main menu displays with animated logo → User hovers over options (glow effect) → User clicks option → Transition to selected screen
- **Success criteria**: All menu items are clearly visible, hoverable states are distinct, transitions are smooth

### Single Player Mode
- **Functionality**: Interface for starting bot matches with difficulty selection and map selection
- **Purpose**: Allows players to practice against AI opponents and experience the game solo
- **Trigger**: Click "Single Player" from main menu
- **Progression**: Main menu → Single Player screen → Select map from grid → Choose difficulty (Easy/Medium/Hard/Nightmare) → Click "Start Match" → Loading state with progress
- **Success criteria**: Map thumbnails are visible, difficulty changes are reflected, start button is disabled until valid selection

### Multiplayer Browser
- **Functionality**: Server browser showing available game servers with player counts, maps, and ping
- **Purpose**: Connect players to online matches with real-time server information
- **Trigger**: Click "Multiplayer" from main menu
- **Progression**: Main menu → Multiplayer screen → Server list populates → User filters/sorts servers → Selects server → Click "Join Server" → Connection loading state
- **Success criteria**: Server list is sortable by ping/players, refresh button updates list, connection states are clear

### Settings Panel
- **Functionality**: Configuration options for graphics, audio, controls, and player profile
- **Purpose**: Allow players to customize their experience and configure their player identity
- **Trigger**: Click "Settings" from main menu
- **Progression**: Main menu → Settings screen → User navigates tabs (Graphics/Audio/Controls/Profile) → Adjusts values → Changes auto-save → Click "Back" to return
- **Success criteria**: All settings persist using useKV, tabs switch smoothly, sliders and inputs work correctly

### Player Stats Dashboard
- **Functionality**: Display player statistics including kills, deaths, K/D ratio, favorite weapons, and match history
- **Purpose**: Track player progression and provide achievement motivation
- **Trigger**: Accessible from settings or main menu profile button
- **Progression**: Menu → Stats screen → View overall stats → Browse match history → View weapon statistics → Return to menu
- **Success criteria**: Stats are accurately calculated and displayed, charts render correctly, data persists

### Automated Testing Suite
- **Functionality**: Comprehensive Playwright end-to-end tests covering all UI interactions, animations, styling, and performance
- **Purpose**: Ensure background is not boring (black/white), verify all features work correctly, and maintain quality across updates
- **Trigger**: Run via `npm test` or automatically in CI/CD pipeline
- **Progression**: Tests start → Dev server launches → Browser automation runs → Canvas animations verified → Navigation flows tested → Performance metrics collected → Report generated
- **Success criteria**: 50+ tests pass including background color verification, particle animation checks, navigation flows, theme validation, and FPS performance metrics

## Edge Case Handling

- **No servers available**: Display "No servers found" message with refresh suggestion in multiplayer browser
- **Connection timeout**: Show error toast with "Connection failed" message and return to server browser
- **Invalid player name**: Validate player name input (3-16 characters) and show inline error
- **Missing map data**: Display placeholder thumbnails for maps that fail to load
- **Settings reset**: Provide "Restore Defaults" button that resets all settings to initial values

## Design Direction

The design should evoke the raw power and industrial sci-fi aesthetic of Quake 3 Arena elevated to AAAA premium quality - dark metallic surfaces with sophisticated glass morphism effects, intensified glowing energy accents, angular geometric shapes, and a sense of advanced futuristic military technology. The interface should feel like a premium combat computer terminal from a cutting-edge space station, with refined scan lines, elegant grid patterns, and pulsing energy effects that suggest advanced alien technology. Every element features meticulous attention to detail, smooth physics-based animations, and premium visual feedback that rivals the polish of top-tier AAA game studios.

## Color Selection

A refined, militaristic palette with vivid electric blue energy accents and rich warning oranges, evoking premium futuristic combat terminals and advanced alien technology.

- **Primary Color**: Enhanced Electric Blue (oklch(0.68 0.28 245)) - Represents high-energy technology and the iconic Q3A blue team. Used for primary actions and key UI elements with intensified glow effects
- **Secondary Colors**: 
  - Deep Space Indigo (oklch(0.12 0.02 250)) - Premium main background with richer depth
  - Steel Blue (oklch(0.32 0.10 250)) - Refined secondary UI elements and borders
  - Cyber Teal (oklch(0.58 0.16 200)) - Premium accent for secondary actions
- **Accent Color**: Rich Warning Orange (oklch(0.72 0.22 45)) - High-energy highlight for CTAs, hover states, and red team references with enhanced saturation
- **Foreground/Background Pairings**: 
  - Primary Blue on Deep Space Indigo: White text (oklch(0.98 0.01 250)) - Ratio 8.5:1 ✓
  - Warning Orange on Deep Space Indigo: White text (oklch(0.98 0.01 250)) - Ratio 9.2:1 ✓
  - Steel Blue on Deep Space Indigo: Light gray text (oklch(0.88 0.03 250)) - Ratio 7.1:1 ✓
  - Glass morphism surfaces: All text exceeds WCAG AAA standards

## Font Selection

Typography should convey military precision and futuristic technology through bold, geometric letterforms with technical characteristics.

- **Typographic Hierarchy**:
  - H1 (Game Title/Logo): Orbitron Bold/48px/tight letter spacing/uppercase - Maximum impact for title screens
  - H2 (Section Headers): Orbitron SemiBold/32px/normal spacing/uppercase - Clear section delineation
  - H3 (Menu Items): Orbitron Medium/24px/normal spacing - Primary navigation elements
  - Body (Descriptions): Rajdhani Medium/16px/relaxed spacing - Readable technical information
  - Labels (UI Elements): Rajdhani SemiBold/14px/wide spacing/uppercase - Small labels and tags
  - Stats/Numbers: Orbitron Regular/18px/tabular numbers - Precise numerical data

## Animations

Animations should feel premium and sophisticated with physics-based easing curves (cubic-bezier(0.22, 1, 0.36, 1)), suggesting AAA-quality game systems with silky-smooth response times and refined energy-based effects. Buttons pulse with sophisticated contained energy, menus slide with mechanical precision using spring physics, and transitions feature elegant digital scan effects. Everything should feel razor-sharp and luxurious with premium hover states that scale to 1.05-1.06x, refined shadow effects that intensify on interaction, and occasional subtle glitch effects that add sci-fi authenticity. All animations maintain 60fps performance and use hardware acceleration for buttery-smooth motion.

## Component Selection

- **Components**: 
  - Button (Shadcn) - Premium primary actions with AAAA-quality customization: intensified glowing borders with multi-layer shadows, sophisticated energy pulse effects on hover with spring physics, refined corners with --radius set to 4px, glass morphism effects with backdrop blur
  - Card (Shadcn) - Premium server entries, map selection cards, stat displays with sophisticated glass morphism backgrounds (backdrop-filter: blur(20px)) and vivid blue borders with layered glow effects
  - Tabs (Shadcn) - Settings navigation with sophisticated glowing active tab indicators and smooth transitions
  - Progress (Shadcn) - Loading bars with premium animated energy flow effect and gradient fills
  - Slider (Shadcn) - Volume and graphics settings with illuminated track and refined thumb design
  - Badge (Shadcn) - Server status indicators with premium styling and subtle animations
  - Dialog (Shadcn) - Confirmation modals with glass morphism and refined scanline overlay effect
  - Scroll Area (Shadcn) - Server list and match history with custom premium styled scrollbar
  
- **Customizations**: 
  - AnimatedBackground component - Enhanced layered gradient mesh with 150 moving particles, advanced geometric shapes, energy lines, and sophisticated grid patterns with multiple animation layers
  - GlassEffect utility - Sophisticated backdrop-filter blur(20px) with semi-transparent backgrounds for premium depth
  - Enhanced glow effects - Multi-layer box-shadows with 3-4 shadow layers for richer, more premium glow
  - Spring-based animations - Physics-driven motion using framer-motion springs for natural, premium feel
  
- **States**: 
  - Buttons: Default (enhanced blue glow border with multi-layer shadow), Hover (intensified glow + orange accent + scale 1.05 + spring animation), Active (compressed scale 0.97 with bright flash), Disabled (refined desaturated with dim border), Focus (premium ring with animated pulse)
  - Inputs: Default (refined steel border with subtle glow), Focus (bright blue glow with premium pulse animation and backdrop blur), Error (red glow with shake animation), Success (green glow with check animation)
  - Cards: Default (glass morphism with subtle border), Hover (elevated with enhanced blue glow and scale 1.02), Selected (bright border-[3px] + orange corner accents + animated pulse indicator)
  
- **Icon Selection**: 
  - Phosphor Icons with bold weight for premium combat feel
  - Larger sizes (28px-38px) for more impactful presence
  - Enhanced with background containers for better visual hierarchy
  - Smooth color transitions on hover with spring animations
  
- **Spacing**: 
  - Premium 4px base unit system with refined proportions
  - Generous gaps (gap-10/40px) between major sections for breathing room
  - Large gaps (gap-6/24px) between related items
  - Medium gaps (gap-4/16px) within components
  - Luxurious padding (p-8/32px to p-12/48px) on cards and containers for premium feel
  
- **Mobile**: 
  - Refined single column layout on mobile with maintained premium aesthetics
  - Enhanced touch-friendly button sizes (minimum 56px height for premium feel)
  - Server list becomes elegantly stacked cards with maintained glass effects
  - Settings tabs maintain premium styling with smooth transitions
  - Proportional font size reduction maintaining hierarchy (H1: 48px, Body: 16px)
  - Optimized particle count on mobile while maintaining visual richness
