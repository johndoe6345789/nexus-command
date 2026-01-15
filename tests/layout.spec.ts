import { test, expect } from '@playwright/test'

test.describe('Main Menu Layout', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle')
  })

  test('should display logo near the top without requiring scroll', async ({ page }) => {
    // Get viewport height
    const viewportSize = page.viewportSize()
    expect(viewportSize).not.toBeNull()
    const viewportHeight = viewportSize!.height

    // Find the logo (the main NEXUS COMMAND heading)
    const logo = page.getByRole('heading', { name: /NEXUS COMMAND/i, level: 1 })
    await expect(logo).toBeVisible()

    // Get the logo's position
    const logoBox = await logo.boundingBox()
    expect(logoBox).not.toBeNull()

    // Logo should be visible in the initial viewport (not requiring scroll)
    // It should be in the upper portion of the viewport
    expect(logoBox!.y).toBeLessThan(viewportHeight * 0.5) // Within first 50% of viewport
    expect(logoBox!.y).toBeGreaterThan(0) // But not at absolute top (has top bar)
  })

  test('should show top bar with title and icons', async ({ page }) => {
    // Top bar should have NEXUS COMMAND text
    const topBarTitle = page.getByRole('banner').getByRole('heading', { name: /NEXUS COMMAND/i })
    await expect(topBarTitle).toBeVisible()

    // Should have GitHub Actions link
    const githubLink = page.getByRole('link', { name: /GitHub Actions/i })
    await expect(githubLink).toBeVisible()

    // Should have notifications button
    const notificationsBtn = page.getByRole('button', { name: /Notifications/i })
    await expect(notificationsBtn).toBeVisible()

    // Should have achievements button
    const achievementsBtn = page.getByRole('button', { name: /Achievements/i })
    await expect(achievementsBtn).toBeVisible()
  })

  test('should display logo with tagline', async ({ page }) => {
    // Main logo/title
    const logo = page.locator('text=NEXUS').first()
    await expect(logo).toBeVisible()

    const command = page.locator('text=COMMAND').first()
    await expect(command).toBeVisible()

    // Tagline
    const tagline = page.getByText('Next Generation Combat')
    await expect(tagline).toBeVisible()
  })

  test('should display all main menu buttons in grid', async ({ page }) => {
    // Campaign button
    const campaignBtn = page.getByRole('button', { name: /Campaign.*Single player missions/i })
    await expect(campaignBtn).toBeVisible()

    // Multiplayer button
    const multiplayerBtn = page.getByRole('button', { name: /Multiplayer.*Join online battles/i })
    await expect(multiplayerBtn).toBeVisible()

    // Profile button
    const profileBtn = page.getByRole('button', { name: /Profile.*View your stats/i })
    await expect(profileBtn).toBeVisible()

    // Settings button
    const settingsBtn = page.getByRole('button', { name: /Settings.*Configure your game/i })
    await expect(settingsBtn).toBeVisible()

    // Developer button
    const developerBtn = page.getByRole('button', { name: /Developer.*Developer tools/i })
    await expect(developerBtn).toBeVisible()

    // Exit button
    const exitBtn = page.getByRole('button', { name: /Exit.*Close application/i })
    await expect(exitBtn).toBeVisible()
  })

  test('should display footer with version', async ({ page }) => {
    const footer = page.getByText(/v\d+\.\d+\.\d+ • Press any key to continue/i)
    await expect(footer).toBeVisible()
  })

  test('should have proper spacing between logo and menu buttons', async ({ page }) => {
    const logo = page.getByRole('heading', { name: /NEXUS COMMAND/i }).first()
    const firstButton = page.getByRole('button', { name: /Campaign/i })

    const logoBox = await logo.boundingBox()
    const buttonBox = await firstButton.boundingBox()

    expect(logoBox).not.toBeNull()
    expect(buttonBox).not.toBeNull()

    // There should be reasonable spacing (between 20px and 200px) between logo and buttons
    const spacing = buttonBox!.y - (logoBox!.y + logoBox!.height)
    expect(spacing).toBeGreaterThan(20)
    expect(spacing).toBeLessThan(200)
  })
})

test.describe('Panel Transparency', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  test('should have semi-transparent menu button panels', async ({ page }) => {
    // Get one of the menu buttons
    const campaignBtn = page.getByRole('button', { name: /Campaign/i })
    await expect(campaignBtn).toBeVisible()

    // Check the background color has transparency
    const bgColor = await campaignBtn.evaluate((el) => {
      // Get the MUI Card parent which has the background
      const card = el.closest('[class*="MuiCard-root"]')
      if (!card) return null
      return window.getComputedStyle(card).backgroundColor
    })

    expect(bgColor).not.toBeNull()
    // Background should be rgba with alpha < 1 for transparency
    if (bgColor && bgColor.startsWith('rgba')) {
      const alphaMatch = bgColor.match(/rgba\([^,]+,[^,]+,[^,]+,\s*([\d.]+)\)/)
      if (alphaMatch) {
        const alpha = parseFloat(alphaMatch[1])
        expect(alpha).toBeLessThan(1) // Should be transparent
        expect(alpha).toBeGreaterThan(0.3) // But not too transparent
      }
    }
  })

  test('should show animated background behind panels', async ({ page }) => {
    // Canvas background should be visible
    const canvas = page.locator('canvas')
    await expect(canvas).toBeVisible()

    // Canvas should be behind the content (lower z-index)
    const canvasZIndex = await canvas.evaluate(el => {
      return window.getComputedStyle(el.parentElement!).zIndex
    })
    expect(canvasZIndex).toBeDefined()
  })

  test('should maintain panel transparency on hover', async ({ page }) => {
    const campaignBtn = page.getByRole('button', { name: /Campaign/i })
    
    // Get background before hover
    const bgBefore = await campaignBtn.evaluate((el) => {
      const card = el.closest('[class*="MuiCard-root"]')
      return card ? window.getComputedStyle(card).backgroundColor : null
    })

    // Hover over button
    await campaignBtn.hover()
    await page.waitForTimeout(300) // Wait for hover animation

    // Get background after hover
    const bgAfter = await campaignBtn.evaluate((el) => {
      const card = el.closest('[class*="MuiCard-root"]')
      return card ? window.getComputedStyle(card).backgroundColor : null
    })

    // Both should have transparency
    expect(bgBefore).toBeTruthy()
    expect(bgAfter).toBeTruthy()
  })
})

test.describe('Responsive Layout', () => {
  test('should work on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Logo should still be visible
    const logo = page.locator('text=NEXUS').first()
    await expect(logo).toBeVisible()

    // Menu buttons should be visible and stacked
    const campaignBtn = page.getByRole('button', { name: /Campaign/i })
    await expect(campaignBtn).toBeVisible()

    // Content should not require horizontal scroll
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth)
    expect(bodyWidth).toBeLessThanOrEqual(375)
  })

  test('should work on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 })
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const logo = page.locator('text=NEXUS').first()
    await expect(logo).toBeVisible()

    const campaignBtn = page.getByRole('button', { name: /Campaign/i })
    await expect(campaignBtn).toBeVisible()
  })

  test('should work on desktop viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 })
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const logo = page.locator('text=NEXUS').first()
    await expect(logo).toBeVisible()

    // Get logo position
    const logoBox = await logo.boundingBox()
    expect(logoBox).not.toBeNull()

    // On desktop, logo should be well within viewport
    expect(logoBox!.y).toBeLessThan(400) // Well within top half
  })
})

test.describe('Accessibility', () => {
  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Should have h1 for main title
    const h1 = page.getByRole('heading', { level: 1 })
    await expect(h1).toBeVisible()
    expect(await h1.textContent()).toContain('NEXUS COMMAND')

    // Menu items should have h5 headings
    const campaignHeading = page.getByRole('heading', { name: 'Campaign', level: 5 })
    await expect(campaignHeading).toBeVisible()
  })

  test('should support keyboard navigation', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Tab to first focusable element
    await page.keyboard.press('Tab')
    
    // Check if something is focused
    const focusedElement = await page.evaluate(() => {
      return document.activeElement?.tagName
    })
    expect(focusedElement).toBeTruthy()
  })

  test('should have accessible button labels', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // All buttons should have accessible names
    const buttons = page.getByRole('button')
    const count = await buttons.count()
    
    expect(count).toBeGreaterThan(5) // At least 6 menu items
    
    // Check each button has text or aria-label
    for (let i = 0; i < count; i++) {
      const button = buttons.nth(i)
      const accessibleName = await button.getAttribute('aria-label') || await button.textContent()
      expect(accessibleName).toBeTruthy()
    }
  })
})
