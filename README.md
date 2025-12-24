# 🎮 Arena Command - Game Menu System

A cyberpunk-styled game menu system for a Quake 3 Arena clone, built with React, TypeScript, and animated canvas backgrounds.

## ✨ Features

- 🎨 **Stunning Animated Background**: Canvas-based particle system with geometric shapes, scanlines, and dynamic gradients
- 🎮 **Complete Menu System**: Single player, multiplayer, stats, and settings screens
- 🎯 **Military/Cyberpunk Aesthetic**: Custom fonts (Orbitron, Rajdhani), glow effects, and OKLCH color system
- 🧪 **Comprehensive Test Suite**: 50+ Playwright tests ensuring quality and performance
- ⚡ **Smooth Animations**: Framer Motion transitions between screens
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile devices

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
│   │   ├── AnimatedBackground.tsx  # Canvas particle system
│   │   ├── MainMenu.tsx           # Main menu screen
│   │   ├── SinglePlayer.tsx       # Single player mode
│   │   ├── Multiplayer.tsx        # Multiplayer mode
│   │   ├── PlayerStats.tsx        # Stats screen
│   │   ├── Settings.tsx           # Settings screen
│   │   └── ui/                    # Shadcn components
│   ├── App.tsx                    # Main app component
│   └── index.css                  # Theme and styles
├── tests/
│   ├── background.spec.ts         # Background tests
│   ├── navigation.spec.ts         # Navigation tests
│   ├── styling.spec.ts           # Styling tests
│   ├── interactions.spec.ts      # Interaction tests
│   └── README.md                 # Test documentation
└── playwright.config.ts           # Test configuration
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
