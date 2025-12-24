# Planning Guide

A premium AAA-quality game menu system inspired by modern shooters like Apex Legends, Call of Duty, and Halo Infinite - featuring clean layouts, generous spacing, sophisticated glass morphism, and cinematic animations.

**Experience Qualities**:
1. **Premium** - AAAA-quality visual polish with refined glass morphism effects, sophisticated animations with physics-based easing, and meticulous attention to spacing and hierarchy
2. **Clean** - Generous whitespace, clear visual hierarchy, and modern typography create a sophisticated, uncluttered experience that emphasizes content over decoration
3. **Cinematic** - Smooth transitions with subtle parallax effects, elegant particle systems, and polished micro-interactions that feel like a blockbuster game experience

**Complexity Level**: Light Application (multiple features with basic state)
This is a menu system with navigation between different screens (main menu, campaign, multiplayer, settings, stats) and basic state management for user preferences and selections.

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

The design evokes premium AAA game menus with clean layouts, sophisticated depth through glass morphism, and generous breathing room between elements. Think modern military shooters - dark, sleek backgrounds with glowing accents, smooth particle effects, and cinematic transitions. Every element has proper spacing, clear hierarchy, and refined polish that rivals top-tier game studios. The interface feels like a high-end combat command system with elegant simplicity.

## Color Selection

A refined, contemporary palette with cool blues and warm orange accents, creating sophisticated depth and premium feel.

- **Primary Color**: Refined Blue (oklch(0.75 0.20 220)) - Modern, clean blue for primary actions and key UI elements with subtle glow effects
- **Secondary Colors**: 
  - Deep Space Black (oklch(0.08 0.01 250)) - Rich, deep background with subtle blue tint
  - Steel Gray (oklch(0.18 0.04 250)) - Secondary UI surfaces with transparency
  - Muted Blue (oklch(0.15 0.02 250)) - Subdued backgrounds for cards
- **Accent Color**: Warm Orange (oklch(0.70 0.18 35)) - Sophisticated warm accent for emphasis and hover states
- **Foreground/Background Pairings**: 
  - Primary Blue on Deep Space: White text (oklch(0.98 0.01 0)) - Ratio 12:1 ✓
  - Accent Orange on Deep Space: White text (oklch(0.98 0.01 0)) - Ratio 11:1 ✓
  - Steel Gray on Deep Space: Light gray text (oklch(0.88 0.03 0)) - Ratio 8:1 ✓
  - All glass morphism surfaces exceed WCAG AAA standards

## Font Selection

Typography conveys premium quality through clean, modern letterforms with excellent readability.

- **Typographic Hierarchy**:
  - H1 (Game Title): Rajdhani Black/96px/tight tracking/-0.02em - Maximum impact
  - H2 (Section Headers): Rajdhani Bold/48px/tight tracking - Clear sections
  - H3 (Card Titles): Rajdhani Bold/24px/normal spacing - Content hierarchy
  - Body (Descriptions): Inter Medium/16px/normal spacing - Excellent readability
  - Labels (UI): Inter Semibold/14px/uppercase - UI elements
  - Stats (Numbers): Rajdhani Bold/32px/tabular - Precise data display

## Animations

Animations feel premium and cinematic with sophisticated physics-based easing (cubic-bezier(0.22, 1, 0.36, 1)), creating smooth, polished interactions. Buttons scale subtly (1.02x) with smooth transitions, cards lift elegantly with shadow depth changes, and screen transitions feel seamless. Particle systems move organically with realistic physics. All animations maintain 60fps performance and use hardware acceleration for buttery-smooth motion. Micro-interactions provide satisfying feedback without being distracting.

## Component Selection

- **Components**: 
  - Button (Shadcn) - Clean, modern design with subtle hover states (scale 1.02x), premium glass panel styling, and smooth color transitions
  - Card (Shadcn) - Glass morphism backgrounds (backdrop-filter: blur(40px)) with refined borders and elegant hover elevations
  - Tabs (Shadcn) - Clean tab navigation with smooth active indicators
  - Progress (Shadcn) - Elegant loading bars with smooth animations
  - Slider (Shadcn) - Modern sliders with refined styling
  - Badge (Shadcn) - Status indicators with clean, minimal design
  - Dialog (Shadcn) - Modal overlays with glass morphism
  - Input (Shadcn) - Clean input fields with focus states
  - Switch (Shadcn) - Toggle switches with smooth transitions
  
- **Customizations**: 
  - AnimatedBackground component - Layered gradients with 80 particles, hexagonal geometric shapes, and connection lines creating sophisticated depth
  - Glass panel utility - backdrop-filter blur(40px) with semi-transparent backgrounds
  - Refined glow effects - Subtle box-shadows that enhance without overwhelming
  - Smooth animations - All transitions use premium easing curves
  
- **States**: 
  - Buttons: Default (glass panel with subtle border), Hover (glow border + scale 1.02 + smooth transition), Active (slightly compressed), Disabled (reduced opacity), Focus (ring indicator)
  - Inputs: Default (clean border), Focus (blue glow with smooth animation), Error (red indication), Success (green indication)
  - Cards: Default (glass panel), Hover (elevated + blue glow + scale 1.01-1.02), Selected (glow border + blue tint)
  
- **Icon Selection**: 
  - Phosphor Icons with bold weight for clarity
  - Appropriate sizes (20px-32px) for hierarchy
  - Icons paired with text for clarity
  - Smooth color transitions on interaction
  
- **Spacing**: 
  - 8px base unit system for consistency
  - Generous gaps (32-48px) between major sections
  - Comfortable gaps (16-24px) between related items
  - Medium gaps (8-16px) within components
  - Ample padding (24-48px) on cards and containers
  - Never cramped or cluttered - premium breathing room throughout
  
- **Mobile**: 
  - Single column layouts with maintained spacing
  - Touch-friendly button sizes (minimum 44px height)
  - Stacked cards for server lists
  - Maintained glass effects and polish
  - Proportional font sizes
  - Optimized particle counts for performance
