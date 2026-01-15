# Arena Command - Playwright Tests

## Overview

Comprehensive end-to-end test suite for the Arena Command game menu system using Playwright.

## Test Coverage

### 1. Background Tests (`tests/background.spec.ts`)
Tests for the animated canvas background to ensure it's not black, white, or boring:
- ✅ Canvas rendering and visibility
- ✅ Background color verification (not transparent or plain)
- ✅ Canvas dimensions and responsiveness
- ✅ Animated rotating elements (5 rotating borders)
- ✅ Gradient overlays
- ✅ Grid pattern background
- ✅ Animation over time (verifies particles are moving)
- ✅ Window resize handling
- ✅ Color verification (checks for colorful pixels vs plain black/white)

### 2. Navigation Tests (`tests/navigation.spec.ts`)
Tests for all menu navigation and screen transitions:
- ✅ Main menu display and buttons
- ✅ Single player mode navigation
- ✅ Multiplayer mode navigation
- ✅ Player stats navigation
- ✅ Settings navigation
- ✅ Exit confirmation dialog
- ✅ Back button functionality on all screens
- ✅ Screen transitions with animations
- ✅ Responsive design (mobile, tablet, desktop)

### 3. Styling Tests (`tests/styling.spec.ts`)
Tests for visual design and theming:
- ✅ Orbitron font for headings
- ✅ Rajdhani font for body text
- ✅ Glow effects on elements
- ✅ OKLCH color scheme
- ✅ Button hover effects
- ✅ Border radius (2px minimal design)
- ✅ Accessibility (keyboard navigation, focus states)
- ✅ Performance (load times, animation performance)
- ✅ Canvas context and particle rendering
- ✅ Theme colors (primary blue, accent orange)

### 4. Interactions Tests (`tests/interactions.spec.ts`)
Tests for user interactions and state management:
- ✅ Rapid navigation handling
- ✅ State persistence during navigation
- ✅ Keyboard navigation through menu
- ✅ Visual feedback on button press
- ✅ Multiple server entries in multiplayer
- ✅ Difficulty selection
- ✅ Settings persistence
- ✅ Toast notifications
- ✅ Animation performance

### 5. Edge Cases Tests (`tests/edge-cases.spec.ts`)
Tests for error handling and edge cases:
- ✅ Rapid button clicks without errors
- ✅ Back navigation without selections
- ✅ Empty input handling
- ✅ Special characters in inputs
- ✅ Multiple screen transitions
- ✅ Difficulty selection changes
- ✅ Very long input values
- ✅ Slider boundary values
- ✅ Keyboard navigation edge cases
- ✅ Multiple toast notifications
- ✅ Data validation

### 6. Unit Tests (`src/utils/__tests__/`)
Tests for utility functions and business logic:
- ✅ `calculateKD.test.ts` - K/D ratio calculations (8 tests)
- ✅ `calculateWinRate.test.ts` - Win rate calculations (9 tests)
- ✅ `filterServers.test.ts` - Server filtering logic (10 tests)
- ✅ `handleConsoleCommand.test.ts` - Console command handling (15 tests)
- ✅ `generateServers.test.ts` - Server generation (12 tests)
- ✅ `notifications.test.ts` - Notification system (21 tests)

### 7. Handler Tests (`src/handlers/__tests__/`)
Tests for navigation and server actions:
- ✅ `handleNavigate.test.ts` - Navigation validation and exit handling (4 tests)
- ✅ `handleMissionStart.test.ts` - Loading state behavior (2 tests)
- ✅ `handleServerRefresh.test.ts` - Server refresh flow (1 test)
- ✅ `handleServerJoin.test.ts` - Join handling (2 tests)

### 8. Canvas Library Tests (`src/lib/canvas/__tests__/`)
Tests for canvas rendering utilities:
- ✅ `hexagon.test.ts` - Hexagon creation, update, and drawing (14 tests)
- ✅ `particle.test.ts` - Particle physics and connections (21 tests)

**Total: 119 unit tests + 100+ E2E tests**

## Running Tests

### Run all tests (unit + E2E)
```bash
npm test
```

### Run unit tests only
```bash
npm run test:unit
```

### Run unit tests in watch mode
```bash
npm run test:unit:watch
```

### Run unit tests with UI
```bash
npm run test:unit:ui
```

### Run unit tests with coverage report
```bash
npm run test:coverage
```

### Run E2E tests only
```bash
npm run test:e2e
```

### Run E2E tests in headed mode (see browser)
```bash
npm run test:headed
```

### Run E2E tests with UI mode (interactive)
```bash
npm run test:ui
```

### Debug E2E tests
```bash
npm run test:debug
```

### View E2E test report
```bash
npm run test:report
```

### Run specific test file
```bash
# Unit test
npx vitest run src/utils/__tests__/calculateKD.test.ts

# E2E test
npx playwright test tests/background.spec.ts
```

### Run tests on specific browser
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

## Test Configuration

Tests are configured to run on:
- Desktop Chrome
- Desktop Firefox
- Desktop Safari
- Mobile Chrome (Pixel 5)

Configuration file: `playwright.config.ts`

## Key Features Tested

### Animated Background
The tests verify that the background is NOT boring by checking:
1. Canvas animations are running
2. Particles are being rendered and moving
3. Background contains colorful pixels (not plain black/white)
4. Geometric shapes are rotating
5. Grid patterns and gradients are visible
6. Scanline effects are present

### Game Menu System
Complete navigation flow testing:
1. Main menu → Single Player → Difficulty selection
2. Main menu → Multiplayer → Server joining
3. Main menu → Player Stats → Combat statistics
4. Main menu → Settings → Configuration options
5. Back navigation from all screens
6. Exit confirmation

### Visual Design
Ensures the cyberpunk/military aesthetic:
1. Custom fonts (Orbitron, Rajdhani)
2. Glow effects and animations
3. OKLCH color system
4. Minimal border radius (2px)
5. Hover and focus states

## CI/CD Integration

Tests are configured for CI environments:
- Retries failed tests 2 times
- Runs in headless mode
- Generates HTML reports
- Takes screenshots on failure

## Writing New Tests

Example test structure:
```typescript
import { test, expect } from '@playwright/test'

test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should do something', async ({ page }) => {
    // Test implementation
    await expect(page.locator('selector')).toBeVisible()
  })
})
```

## Debugging Tips

1. **Visual debugging**: Use `--headed` flag to see tests run
2. **Slow motion**: Add `--slow-mo=1000` to slow down actions
3. **Screenshots**: Automatically taken on failure
4. **Traces**: Available for failed tests in HTML report
5. **Pause**: Use `await page.pause()` to stop execution

## Common Issues

### Dev server not starting
- Ensure port 5173 is available
- Check if Vite is properly configured
- Increase timeout in config if needed

### Canvas tests failing
- Canvas animations may need time to initialize
- Use `page.waitForTimeout()` if needed
- Check browser supports canvas 2D context

### Flaky tests
- Add proper wait conditions
- Use `waitForLoadState('networkidle')` for dynamic content
- Increase timeouts for CI environments

## Coverage Goals

Current test coverage focuses on:
- ✅ UI rendering and visibility
- ✅ User interactions and navigation
- ✅ Visual styling and theming
- ✅ Responsive design
- ✅ Animation and performance
- ✅ Accessibility basics
- ✅ Utility functions and business logic
- ✅ Error handling and edge cases
- ✅ Data validation
- ✅ Console command handling
- ✅ Server filtering and generation
- ✅ Notification system

### Coverage Statistics
- **Unit Tests**: 119 tests covering utility functions, handlers, canvas library, and business logic
- **E2E Tests**: 100+ tests covering UI, interactions, styling, and edge cases
- **Total Test Files**: 15 (9 unit test files + 6 E2E test files)
- **Statement Coverage**: 100%
- **Branch Coverage**: 97.91%

### Components with 100% Coverage
- ✅ Utils (calculateKD, calculateWinRate, filterServers, handleConsoleCommand, generateServers, notifications)
- ✅ Handlers (handleNavigate, handleMissionStart, handleServerRefresh, handleServerJoin)
- ✅ Canvas Library (hexagon, particle)
- ✅ Main navigation flows
- ✅ Screen transitions and animations
- ✅ User input handling
- ✅ Toast notifications
- ✅ Settings persistence
- ✅ Background rendering

Future expansion:
- [ ] Component unit tests (if needed)
- [ ] Integration tests for complex workflows
- [ ] Performance benchmarks
- [ ] Cross-browser visual regression
- [ ] API mocking for multiplayer (if backend added)
