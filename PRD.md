# Planning Guide

A Quake 3 Arena-inspired menu system that captures the iconic sci-fi aesthetic and intense energy of the classic FPS, providing an immersive gateway to single-player and multiplayer game modes.

**Experience Qualities**:
1. **Powerful** - Heavy industrial sci-fi aesthetic with bold typography and commanding presence that makes players feel ready for combat
2. **Responsive** - Immediate visual and audio feedback for every interaction, creating a tactile, high-performance feel
3. **Atmospheric** - Layered visual effects, animated backgrounds, and carefully crafted ambient elements that build anticipation

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

## Edge Case Handling

- **No servers available**: Display "No servers found" message with refresh suggestion in multiplayer browser
- **Connection timeout**: Show error toast with "Connection failed" message and return to server browser
- **Invalid player name**: Validate player name input (3-16 characters) and show inline error
- **Missing map data**: Display placeholder thumbnails for maps that fail to load
- **Settings reset**: Provide "Restore Defaults" button that resets all settings to initial values

## Design Direction

The design should evoke the raw power and industrial sci-fi aesthetic of Quake 3 Arena - dark metallic surfaces, glowing energy accents, angular geometric shapes, and a sense of futuristic military technology. The interface should feel like a combat computer terminal from a space station, with scan lines, grid patterns, and pulsing energy effects that suggest advanced alien technology.

## Color Selection

A dark, militaristic palette with electric blue energy accents and warning oranges, evoking futuristic combat terminals and alien technology.

- **Primary Color**: Electric Blue (oklch(0.65 0.25 250)) - Represents energy, technology, and the iconic Q3A blue team. Used for primary actions and key UI elements
- **Secondary Colors**: 
  - Deep Space Gray (oklch(0.15 0.01 250)) - Main background, evoking the void of space and metal surfaces
  - Steel Blue (oklch(0.35 0.08 250)) - Secondary UI elements and borders
  - Cyber Teal (oklch(0.55 0.15 200)) - Accent for secondary actions
- **Accent Color**: Warning Orange (oklch(0.70 0.20 40)) - High-energy highlight for CTAs, hover states, and red team references. Creates urgency and combat readiness
- **Foreground/Background Pairings**: 
  - Primary Blue on Deep Space Gray: White text (oklch(0.98 0 0)) - Ratio 7.2:1 ✓
  - Warning Orange on Deep Space Gray: White text (oklch(0.98 0 0)) - Ratio 8.1:1 ✓
  - Steel Blue on Deep Space Gray: Light gray text (oklch(0.85 0.02 250)) - Ratio 5.8:1 ✓
  - Deep Space Gray backgrounds: Cyan text (oklch(0.75 0.15 200)) - Ratio 6.5:1 ✓

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

Animations should feel snappy and powerful, suggesting advanced computer systems with instant response times and energy-based effects. Buttons pulse with contained energy, menus slide in with mechanical precision, and transitions feature digital scan effects. Avoid slow, floaty animations - everything should feel razor-sharp and responsive, with occasional glitch effects and holographic flickers that add sci-fi authenticity without becoming distracting.

## Component Selection

- **Components**: 
  - Button (Shadcn) - Primary actions with heavy customization: glowing borders, energy pulse effects on hover, angular corners with --radius set to 2px
  - Card (Shadcn) - Server entries, map selection cards, stat displays with dark metallic backgrounds and blue borders
  - Tabs (Shadcn) - Settings navigation with glowing active tab indicators
  - Progress (Shadcn) - Loading bars with animated energy flow effect
  - Slider (Shadcn) - Volume and graphics settings with illuminated track
  - Badge (Shadcn) - Server status indicators (Low Ping, High Players, etc.)
  - Dialog (Shadcn) - Confirmation modals with scanline overlay effect
  - Scroll Area (Shadcn) - Server list and match history with custom styled scrollbar
  
- **Customizations**: 
  - AnimatedBackground component - Layered gradient mesh with moving particles and grid patterns
  - ServerListItem component - Custom card for server browser with live status indicators
  - MapCard component - Hoverable map thumbnail with glowing border and map name overlay
  - StatCard component - Numerical display with animated counting and icon
  - GlitchText component - Occasional digital glitch effect on title text
  
- **States**: 
  - Buttons: Default (blue glow border), Hover (intensified glow + orange accent), Active (compressed with bright flash), Disabled (desaturated with dim border)
  - Inputs: Default (steel border), Focus (bright blue glow with pulse animation), Error (red glow), Success (green glow)
  - Cards: Default (subtle border), Hover (elevated with blue glow), Selected (bright border + orange corner accents)
  
- **Icon Selection**: 
  - Phosphor Icons with bold weight for combat feel
  - Play (triangle-right) for start/join actions
  - Users for multiplayer
  - Robot for single player bots
  - Gear for settings
  - Target for stats/profile
  - List for server browser
  - Power for exit
  
- **Spacing**: 
  - Consistent 4px base unit system
  - Large gaps (gap-8/32px) between major sections
  - Medium gaps (gap-4/16px) between related items
  - Small gaps (gap-2/8px) within components
  - Generous padding (p-6/24px to p-8/32px) on cards and containers
  
- **Mobile**: 
  - Single column layout on mobile
  - Hamburger menu for navigation on small screens
  - Touch-friendly button sizes (minimum 44px height)
  - Server list becomes vertically stacked cards
  - Settings tabs become accordion on mobile
  - Reduce font sizes proportionally (H1: 32px, Body: 14px)
  - Hide decorative background effects on low-power devices
