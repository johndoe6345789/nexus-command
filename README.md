# 🎮 NEXUS COMMAND - Atomic Component Framework

[![CI](https://github.com/johndoe6345789/nexus-command/workflows/CI%20-%20Build%20and%20Lint/badge.svg)](https://github.com/johndoe6345789/nexus-command/actions/workflows/build.yml)
[![Playwright Tests](https://github.com/johndoe6345789/nexus-command/workflows/Playwright%20Tests/badge.svg)](https://github.com/johndoe6345789/nexus-command/actions/workflows/playwright.yml)
[![CodeQL](https://github.com/johndoe6345789/nexus-command/workflows/CodeQL%20Security%20Analysis/badge.svg)](https://github.com/johndoe6345789/nexus-command/actions/workflows/codeql.yml)
[![Docker](https://github.com/johndoe6345789/nexus-command/workflows/Build%20and%20Push%20to%20GHCR/badge.svg)](https://github.com/johndoe6345789/nexus-command/actions/workflows/docker-publish.yml)

A premium AAA-quality game menu system for a Quake 3 Arena clone, featuring a comprehensive atomic design system built with **Next.js**, React, TypeScript, Material-UI, and Framer Motion.

> **✨ Now powered by Next.js!** - Converted from Vite to Next.js with static export support.

## ✨ Key Features

- 🎨 **Atomic Design System**: Fully modular component framework with atoms, molecules, organisms, templates, and pages
- 🎮 **Complete Menu System**: Single player, multiplayer, stats, and settings screens
- 🌟 **Stunning Visuals**: Canvas-based particle system with geometric shapes and dynamic gradients
- 💎 **Premium UI**: Material-UI components with glass morphism, glow effects, and cinematic animations
- 🎯 **Futuristic Aesthetic**: Custom fonts (Rajdhani, Inter), sophisticated theming
- 🧪 **Comprehensive Test Suite**: 50+ Playwright tests ensuring quality and performance
- ⚡ **Smooth Animations**: Framer Motion with physics-based easing
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile devices
- 🔧 **Type-Safe**: Full TypeScript coverage with strict mode
- ♿ **Accessible**: WCAG AA compliant with proper ARIA labels
- 🚀 **Next.js**: Fast, modern React framework with static export capability

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
- `MainMenu` - Main navigation hub
- `SinglePlayer` - Campaign selection
- `Multiplayer` - Server browser
- `Settings` - Configuration panel
- `PlayerStats` - Statistics dashboard
- `Developer` - Developer tools and debugging console

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
- ✅ **Composable components** reduce code duplication
- ✅ **Faster development** with pre-built, reusable components
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
3. Explore the main screen components in `src/components/`
4. Study atomic components in `src/components/atoms` through `templates`
5. Check [PRD.md](PRD.md) for design system details

### Component Examples
- **Simple Page**: See `MainMenu.tsx`
- **Two-Column Layout**: See `SinglePlayer.tsx`
- **Tabbed Interface**: See `Settings.tsx` or `Developer.tsx`
- **Custom Organisms**: See `organisms/MapSelector.tsx`

## 🎨 Tech Stack

- **Framework**: Next.js 16 + React 19 + TypeScript
- **Styling**: Material-UI (MUI) v7
- **Animations**: Framer Motion + Canvas API
- **Icons**: Phosphor Icons + Material Icons
- **Testing**: Playwright
- **Build**: Next.js with static export

## 📁 Project Structure

```
├── app/                            # Next.js app directory
│   ├── layout.tsx                  # Root layout
│   └── page.tsx                    # Home page
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
│   │   │   ├── VolumeControl.tsx
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
│   │   ├── AnimatedBackground.tsx  # Canvas particle system
│   │   ├── Logo.tsx                # Animated logo
│   │   ├── GlitchText.tsx          # Glitch effect text
│   │   ├── MainMenu.tsx            # Main menu screen
│   │   ├── SinglePlayer.tsx        # Campaign screen
│   │   ├── Multiplayer.tsx         # Multiplayer screen
│   │   ├── PlayerStats.tsx         # Stats screen
│   │   ├── Settings.tsx            # Settings screen
│   │   ├── Developer.tsx           # Developer tools screen
│   │   └── index.ts                # Barrel exports
│   ├── theme/
│   │   └── mui-theme.ts            # Material-UI theme
│   ├── App.tsx                     # Main app component
│   └── main.css                    # Global styles
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

## 🔧 CI/CD Pipeline

This project uses a comprehensive CI/CD pipeline with multiple automated workflows:

### Continuous Integration (CI)

#### 🎭 Playwright Tests (`playwright.yml`)
- Runs on: Push to `main`/`dev`, PRs to `main`
- Executes: 50+ automated tests covering UI, UX, accessibility, and performance
- Artifacts: Test reports and screenshots on failure

#### 🏗️ Build & Lint (`build.yml`)
- Runs on: Push to `main`/`dev`, PRs to `main`
- Executes: ESLint checks and Next.js production build
- Artifacts: Build output for verification

#### 🔒 CodeQL Security (`codeql.yml`)
- Runs on: Push, PRs, and weekly schedule
- Executes: Static security analysis for vulnerabilities
- Reports: Security alerts in GitHub Security tab

#### 📦 Dependency Review (`dependency-review.yml`)
- Runs on: Pull requests to `main`
- Executes: Checks for known vulnerabilities in dependencies
- Blocks: PRs with moderate or higher severity issues

### Continuous Deployment (CD)

#### 🐳 Docker Build & GHCR (`docker-publish.yml`)
- Runs on: Push to `main`/`dev`, tags, PRs
- Builds: Multi-architecture Docker images (amd64, arm64)
- Publishes: Images to GitHub Container Registry (GHCR)
- Tags: Branch names, SemVer, SHA, and `latest`

**Pull the latest image:**
```bash
docker pull ghcr.io/johndoe6345789/nexus-command:latest
docker run -p 80:80 ghcr.io/johndoe6345789/nexus-command:latest
```

#### 🚀 Release Workflow (`release.yml`)
- Triggers on: Git tags matching `v*.*.*` pattern
- Creates: GitHub release with changelog
- Builds: Production artifacts and Docker images
- Publishes: Release assets and Docker images with version tags

**Create a release:**
```bash
git tag v1.0.0
git push origin v1.0.0
```

#### 🌐 Deployment (`deploy.yml`)
- Trigger: Manual workflow dispatch
- Environments: Staging and Production
- Features: Health checks, deployment status tracking
- Configurable: Docker image version selection

### Issue Bot Automation

#### 🤖 Auto-Create Issues (`auto-create-issues.yml`)
- Schedule: Daily at 9 AM UTC
- Creates: Maintenance, testing, and documentation tasks
- Limit: Maximum 5 open bot issues at a time
- Labels: `bot-created`, `needs-review`

#### 🔄 Issue to PR Conversion (`issue-to-pr.yml`)
- Triggers on: Issue labeled with `approved`
- Creates: Branch and PR automatically
- Links: PR to original issue with "Resolves #N"
- Labels: `bot-generated`, `needs-implementation`

#### ⚙️ Issue Lifecycle (`issue-lifecycle.yml`)
- Auto-labels: New bot issues
- Notifications: Approval instructions
- Stale handling: Warns after 7 days, closes after 14 days
- Cleanup: Keeps issue queue manageable

### Workflow Triggers Summary

| Workflow | Push | PR | Schedule | Manual | Tags |
|----------|------|----|---------:|--------|------|
| Playwright Tests | ✅ | ✅ | - | ✅ | - |
| Build & Lint | ✅ | ✅ | - | ✅ | - |
| CodeQL | ✅ | ✅ | Weekly | ✅ | - |
| Dependency Review | - | ✅ | - | - | - |
| Docker Publish | ✅ | ✅ | - | ✅ | ✅ |
| Release | - | - | - | ✅ | ✅ |
| Deploy | - | - | - | ✅ | - |
| Auto-Create Issues | - | - | Daily | ✅ | - |
| Issue to PR | Issue labeled | - | - | - | - |
| Issue Lifecycle | Issue events | - | - | - | - |

### Docker Deployment

The application is containerized using a multi-stage Dockerfile:

1. **Dependencies**: Installs npm packages
2. **Builder**: Builds Next.js static export
3. **Runner**: Serves with nginx

**Local Docker build:**
```bash
docker build -t nexus-command .
docker run -p 8080:80 nexus-command
```

**Using pre-built image:**
```bash
# Latest from main branch
docker pull ghcr.io/johndoe6345789/nexus-command:latest

# Specific version
docker pull ghcr.io/johndoe6345789/nexus-command:v1.0.0

# Run it
docker run -d -p 8080:80 ghcr.io/johndoe6345789/nexus-command:latest
```

Visit `http://localhost:8080` to see the application.

### Release Process

1. **Development**: Work on `dev` branch
2. **Testing**: All CI checks must pass
3. **Version**: Create a version tag: `git tag v1.0.0`
4. **Push**: `git push origin v1.0.0`
5. **Automatic**: Release workflow builds and publishes
6. **Deploy**: Use deploy workflow to push to environments

### Bot Issue Management

The bot creates issues automatically for maintenance tasks:

1. **Creation**: Bot creates issue with `[BOT]` prefix
2. **Review**: Maintainer reviews and adds `approved` label
3. **Conversion**: Automatically converts to PR
4. **Implementation**: Developer implements changes
5. **Merge**: PR is reviewed and merged

**Manual trigger:**
```bash
# Go to Actions > Auto-Create Issues > Run workflow
# Select task type: maintenance, documentation, testing, or refactoring
```

## 🔧 CI/CD

Tests run automatically on:
- Push to `main` or `dev` branches
- Pull requests to `main`

See `.github/workflows/` for all workflow configurations.

## 🧹 Just Exploring?

No problem! If you were just checking things out and don't need to keep this code:
- Simply delete your Spark
- Everything will be cleaned up — no traces left behind

## 📄 License

The Spark Template files and resources from GitHub are licensed under the terms of the MIT license, Copyright GitHub, Inc.
