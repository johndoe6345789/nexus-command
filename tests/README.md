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

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests in headed mode (see browser)
```bash
npm run test:headed
```

### Run tests with UI mode (interactive)
```bash
npm run test:ui
```

### Debug tests
```bash
npm run test:debug
```

### View test report
```bash
npm run test:report
```

### Run specific test file
```bash
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

Future expansion:
- [ ] Keyboard navigation paths
- [ ] Screen reader compatibility
- [ ] Performance metrics
- [ ] Cross-browser visual regression
- [ ] API mocking for multiplayer
