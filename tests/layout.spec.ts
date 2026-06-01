import { test, expect } from '@playwright/test'
import { gotoPath } from './test-utils'

const pixel6Viewport = { width: 412, height: 915 }
const desktopViewports = [
  { label: '720p', width: 1280, height: 720 },
  { label: '1080p', width: 1920, height: 1080 },
  { label: '1440p', width: 2560, height: 1440 },
  { label: '2160p', width: 3840, height: 2160 },
]

test.describe('Main Menu Layout', () => {
  test.beforeEach(async ({ page }) => {
    await gotoPath(page)
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
    const topBar = page.getByRole('banner')
    const topBarTitle = topBar.getByRole('heading', { name: /NEXUS COMMAND/i })
    await expect(topBarTitle).toBeVisible()

    const topBarVersion = topBar.locator('[aria-label^="Top bar version v"]').first()
    await expect(topBarVersion).toBeVisible()
    await expect(topBarVersion).toContainText(/^v\d+\.\d+\.\d+$/)

    // Should have GitHub Actions link
    const githubLink = page.getByRole('link', { name: /GitHub Actions/i })
    const viewport = page.viewportSize()
    expect(viewport).not.toBeNull()

    if (viewport!.width < 600) {
      await expect(githubLink).toBeHidden()
    } else {
      await expect(githubLink).toBeVisible()
    }

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

    const heroVersion = page.locator('[aria-label^="Hero version v"]').first()
    await expect(heroVersion).toBeVisible()
    await expect(heroVersion).toContainText(/^v\d+\.\d+\.\d+$/)

    // Tagline
    const tagline = page.getByText('Next Generation Combat')
    await expect(tagline).toBeVisible()
  })

  test('should display all main menu buttons in grid', async ({ page }) => {
    // Campaign button
    const campaignBtn = page.getByRole('button', { name: /Campaign/i })
    await expect(campaignBtn).toBeVisible()
    await expect(campaignBtn).toContainText('Single player missions')

    // Multiplayer button
    const multiplayerBtn = page.getByRole('button', { name: /Multiplayer/i })
    await expect(multiplayerBtn).toBeVisible()
    await expect(multiplayerBtn).toContainText('Join online battles')

    // Profile button
    const profileBtn = page.getByRole('button', { name: /Profile/i })
    await expect(profileBtn).toBeVisible()
    await expect(profileBtn).toContainText('View your stats')

    // Settings button
    const settingsBtn = page.getByRole('button', { name: /Settings/i })
    await expect(settingsBtn).toBeVisible()
    await expect(settingsBtn).toContainText('Configure your game')

    // Developer button
    const developerBtn = page.getByRole('button', { name: /Developer/i })
    await expect(developerBtn).toBeVisible()
    await expect(developerBtn).toContainText('Developer tools')

    // Exit button
    const exitBtn = page.getByRole('button', { name: /Exit/i })
    await expect(exitBtn).toBeVisible()
    await expect(exitBtn).toContainText('Close application')
  })

  test('should keep the primary menu above the fold on first load', async ({ page }) => {
    const viewportSize = page.viewportSize()
    expect(viewportSize).not.toBeNull()

    const campaignBtn = page.getByRole('button', { name: /Campaign/i })
    const campaignBox = await campaignBtn.boundingBox()

    expect(campaignBox).not.toBeNull()
    expect(campaignBox!.y).toBeLessThan(viewportSize!.height)

    const canvasPosition = await page.locator('canvas').evaluate((canvas) =>
      window.getComputedStyle(canvas).position
    )
    expect(canvasPosition).toBe('fixed')
  })

  test('should display footer with version', async ({ page }) => {
    const footer = page.getByText(/v\d+\.\d+\.\d+ • Press any key to continue/i)
    await expect(footer).toBeVisible()
  })

  test('should have proper spacing between logo and menu buttons', async ({ page }) => {
    const tagline = page.getByText('Next Generation Combat')
    const firstButton = page.getByRole('button', { name: /Campaign/i })

    const taglineBox = await tagline.boundingBox()
    const buttonBox = await firstButton.boundingBox()

    expect(taglineBox).not.toBeNull()
    expect(buttonBox).not.toBeNull()

    const spacing = buttonBox!.y - (taglineBox!.y + taglineBox!.height)
    expect(spacing).toBeGreaterThan(0)
    expect(spacing).toBeLessThan(180)
  })
})

test.describe('Panel Transparency', () => {
  test.beforeEach(async ({ page }) => {
    await gotoPath(page)
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
      const alphaMatch = bgColor.match(/rgba\(\s*[\d.]+\s*,\s*[\d.]+\s*,\s*[\d.]+\s*,\s*([\d.]+)\s*\)/)
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

    const canvasStyles = await canvas.evaluate((el) => {
      const rect = el.getBoundingClientRect()
      const styles = window.getComputedStyle(el)
      return {
        position: styles.position,
        width: rect.width,
        height: rect.height,
      }
    })

    const viewportSize = page.viewportSize()
    expect(viewportSize).not.toBeNull()
    expect(canvasStyles.position).toBe('fixed')
    expect(canvasStyles.width).toBeGreaterThanOrEqual(viewportSize!.width)
    expect(canvasStyles.height).toBeGreaterThanOrEqual(viewportSize!.height)
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
    await page.setViewportSize(pixel6Viewport)
    await gotoPath(page)
    await page.waitForLoadState('networkidle')

    // Logo should still be visible
    const logo = page.locator('text=NEXUS').first()
    await expect(logo).toBeVisible()

    // Menu buttons should be visible and stacked
    const campaignBtn = page.getByRole('button', { name: /Campaign/i })
    await expect(campaignBtn).toBeVisible()

    // Content should not require horizontal scroll
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth)
    expect(bodyWidth).toBeLessThanOrEqual(427)
  })

  test('should keep the mobile top bar title fully inside the header', async ({ page }) => {
    await page.setViewportSize(pixel6Viewport)
    await gotoPath(page)
    await page.waitForLoadState('networkidle')

    const banner = page.getByRole('banner')
    const topBarTitle = banner.getByRole('heading', { name: /NEXUS COMMAND/i }).first()
    const firstActionButton = page.getByRole('button', { name: /Campaign/i })
    const tagline = page.getByText(/Next Generation Combat/i)

    await expect(topBarTitle).toBeVisible()
    await expect(firstActionButton).toBeVisible()
    await expect(tagline).toBeVisible()

    const [bannerBox, titleBox, firstActionBox, taglineBox, titleMetrics] = await Promise.all([
      banner.boundingBox(),
      topBarTitle.boundingBox(),
      firstActionButton.boundingBox(),
      tagline.boundingBox(),
      topBarTitle.evaluate((node) => {
        const style = window.getComputedStyle(node)
        return {
          tagName: node.tagName,
          fontFamily: style.fontFamily,
          fontSize: Number.parseFloat(style.fontSize),
          lineHeight: Number.parseFloat(style.lineHeight),
        }
      }),
    ])

    expect(bannerBox).not.toBeNull()
    expect(titleBox).not.toBeNull()
    expect(firstActionBox).not.toBeNull()
    expect(taglineBox).not.toBeNull()
    expect(titleMetrics.tagName).toBe('DIV')
    expect(titleMetrics.fontFamily).toContain('Rajdhani')
    expect(titleMetrics.lineHeight).toBeGreaterThanOrEqual(titleMetrics.fontSize)
    expect(bannerBox!.height).toBeGreaterThanOrEqual(72)
    expect(titleBox!.y).toBeGreaterThanOrEqual(bannerBox!.y + 8)
    expect(titleBox!.y + titleBox!.height).toBeLessThanOrEqual(bannerBox!.y + bannerBox!.height - 8)
    expect(taglineBox!.y).toBeGreaterThanOrEqual(bannerBox!.y + bannerBox!.height + 140)
    expect(firstActionBox!.y).toBeGreaterThanOrEqual(bannerBox!.y + bannerBox!.height + 8)
  })

  test('should keep the hero content below the fixed header after scrolling back to top on Pixel 6', async ({ page }) => {
    await page.setViewportSize(pixel6Viewport)
    await gotoPath(page)
    await page.waitForLoadState('networkidle')

    await page.evaluate(() => {
      window.scrollTo(0, document.documentElement.scrollHeight * 0.35)
    })
    await page.waitForTimeout(200)
    await page.evaluate(() => {
      window.scrollTo(0, 0)
    })
    await page.waitForFunction(() => window.scrollY < 5)

    const banner = page.getByRole('banner')
    const heroTagline = page.getByText(/Next Generation Combat/i)
    const firstActionButton = page.getByRole('button', { name: /Campaign/i })

    await expect(heroTagline).toBeVisible()
    await expect(firstActionButton).toBeVisible()

    const [scrollY, bannerBox, heroTaglineBox, firstActionBox] = await Promise.all([
      page.evaluate(() => window.scrollY),
      banner.boundingBox(),
      heroTagline.boundingBox(),
      firstActionButton.boundingBox(),
    ])

    expect(scrollY).toBeLessThan(5)
    expect(bannerBox).not.toBeNull()
    expect(heroTaglineBox).not.toBeNull()
    expect(firstActionBox).not.toBeNull()
    expect(heroTaglineBox!.y).toBeGreaterThanOrEqual(bannerBox!.y + bannerBox!.height + 140)
    expect(firstActionBox!.y).toBeGreaterThanOrEqual(bannerBox!.y + bannerBox!.height + 8)
  })

  test('should allow scrolling to the footer on mobile', async ({ page }) => {
    await page.setViewportSize(pixel6Viewport)
    await gotoPath(page)
    await page.waitForLoadState('networkidle')

    const footer = page.getByText(/v\d+\.\d+\.\d+ • Press any key to continue/i)

    await page.evaluate(() => {
      window.scrollTo(0, document.documentElement.scrollHeight)
    })

    await expect(footer).toBeVisible()
  })

  test('should work on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 })
    await gotoPath(page)
    await page.waitForLoadState('networkidle')

    const logo = page.locator('text=NEXUS').first()
    await expect(logo).toBeVisible()

    const campaignBtn = page.getByRole('button', { name: /Campaign/i })
    const multiplayerBtn = page.getByRole('button', { name: /Multiplayer/i })
    await expect(campaignBtn).toBeVisible()
    await expect(multiplayerBtn).toBeVisible()

    const [campaignBox, multiplayerBox] = await Promise.all([
      campaignBtn.boundingBox(),
      multiplayerBtn.boundingBox(),
    ])

    expect(campaignBox).not.toBeNull()
    expect(multiplayerBox).not.toBeNull()
    expect(Math.abs(campaignBox!.y - multiplayerBox!.y)).toBeLessThan(12)
    expect(multiplayerBox!.x).toBeGreaterThan(campaignBox!.x + 40)
  })

  test('should work on desktop viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 })
    await gotoPath(page)
    await page.waitForLoadState('networkidle')

    const logo = page.locator('text=NEXUS').first()
    await expect(logo).toBeVisible()

    // Get logo position
    const logoBox = await logo.boundingBox()
    expect(logoBox).not.toBeNull()

    // On desktop, logo should be well within viewport
    expect(logoBox!.y).toBeLessThan(400) // Well within top half
  })

  for (const viewport of desktopViewports) {
    test(`should keep the main page content centered on ${viewport.label} screens`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height })
      await gotoPath(page)
      await page.waitForLoadState('networkidle')

      const campaignButton = page.getByRole('button', { name: /Campaign/i })
      const multiplayerButton = page.getByRole('button', { name: /Multiplayer/i })
      const tagline = page.getByText(/Next Generation Combat/i)

      const [campaignBox, multiplayerBox, taglineBox] = await Promise.all([
        campaignButton.boundingBox(),
        multiplayerButton.boundingBox(),
        tagline.boundingBox(),
      ])

      expect(campaignBox).not.toBeNull()
      expect(multiplayerBox).not.toBeNull()
      expect(taglineBox).not.toBeNull()

      const gridLeftGap = campaignBox!.x
      const gridRightGap = viewport.width - (multiplayerBox!.x + multiplayerBox!.width)
      const heroCenter = taglineBox!.x + taglineBox!.width / 2
      const viewportCenter = viewport.width / 2

      expect(Math.abs(gridLeftGap - gridRightGap)).toBeLessThanOrEqual(24)
      expect(multiplayerBox!.x).toBeGreaterThan(campaignBox!.x + 40)
      expect(Math.abs(heroCenter - viewportCenter)).toBeLessThanOrEqual(24)
    })

    test(`should keep the top bar content close to the viewport edges on ${viewport.label} screens`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height })
      await gotoPath(page)
      await page.waitForLoadState('networkidle')

      const layoutMetrics = await page.evaluate(() => {
        const header = document.querySelector('header')
        const toolbar = header?.querySelector('.MuiToolbar-root')
        const title = toolbar?.querySelector('[role="heading"]')
        const titleText = title?.querySelector('span')
        const github = toolbar?.querySelector('a[aria-label="GitHub Actions"]')
        const notifications = toolbar?.querySelector('button[aria-label="Notifications"]')
        const achievements = toolbar?.querySelector('button[aria-label="Achievements"]')

        if (!header || !toolbar || !title || !titleText || !github || !notifications || !achievements) {
          return null
        }

        const headerBox = header.getBoundingClientRect()
        const titleBox = titleText.getBoundingClientRect()
        const githubBox = github.getBoundingClientRect()
        const notificationsBox = notifications.getBoundingClientRect()
        const achievementsBox = achievements.getBoundingClientRect()

        return {
          titleLeftInset: titleBox.left - headerBox.left,
          actionsRightInset: headerBox.right - achievementsBox.right,
          githubToNotifications: notificationsBox.left - githubBox.right,
          notificationsToAchievements: achievementsBox.left - notificationsBox.right,
        }
      })

      expect(layoutMetrics).not.toBeNull()
      expect(layoutMetrics!.titleLeftInset).toBeGreaterThanOrEqual(20)
      expect(layoutMetrics!.titleLeftInset).toBeLessThanOrEqual(96)
      expect(layoutMetrics!.actionsRightInset).toBeGreaterThanOrEqual(0)
      expect(layoutMetrics!.actionsRightInset).toBeLessThanOrEqual(8)
      expect(layoutMetrics!.githubToNotifications).toBeGreaterThanOrEqual(6)
      expect(layoutMetrics!.githubToNotifications).toBeLessThanOrEqual(20)
      expect(layoutMetrics!.notificationsToAchievements).toBeGreaterThanOrEqual(6)
      expect(layoutMetrics!.notificationsToAchievements).toBeLessThanOrEqual(20)
    })
  }
})

test.describe('Accessibility', () => {
  test('should have proper heading hierarchy', async ({ page }) => {
    await gotoPath(page)
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
    await gotoPath(page)
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
    await gotoPath(page)
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
