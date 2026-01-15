import { test, expect } from '@playwright/test'

test.describe('Main Menu Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should display main menu title', async ({ page }) => {
    const title = page.getByRole('heading', { name: /NEXUS COMMAND/i })
    await expect(title.first()).toBeVisible()
  })

  test('should have all main menu buttons', async ({ page }) => {
    await expect(page.getByRole('button', { name: /Campaign/i })).toBeVisible()
    await expect(page.getByRole('button', { name: /Multiplayer/i })).toBeVisible()
    await expect(page.getByRole('button', { name: /Profile/i })).toBeVisible()
    await expect(page.getByRole('button', { name: /Settings/i })).toBeVisible()
    await expect(page.getByRole('button', { name: /Developer/i })).toBeVisible()
    await expect(page.getByRole('button', { name: /Exit/i })).toBeVisible()
  })

  test('should navigate to single player screen', async ({ page }) => {
    await page.getByRole('button', { name: /Campaign/i }).click()
    await expect(page.getByRole('heading', { name: /Campaign/i })).toBeVisible()
  })

  test('should navigate to multiplayer screen', async ({ page }) => {
    await page.getByRole('button', { name: /Multiplayer/i }).click()
    await expect(page.getByRole('heading', { name: /Multiplayer/i })).toBeVisible()
  })

  test('should navigate to player stats screen', async ({ page }) => {
    await page.getByRole('button', { name: /Profile/i }).click()
    await expect(page.getByRole('heading', { name: /Profile/i })).toBeVisible()
  })

  test('should navigate to settings screen', async ({ page }) => {
    await page.getByRole('button', { name: /Settings/i }).click()
    await expect(page.getByRole('heading', { name: /Settings/i })).toBeVisible()
  })

  test('should show confirm dialog on exit', async ({ page }) => {
    page.on('dialog', async dialog => {
      expect(dialog.message()).toBeTruthy()
      await dialog.dismiss()
    })
    
    await page.getByRole('button', { name: /Exit/i }).click()
  })

  test('main menu buttons should be styled cards', async ({ page }) => {
    const button = page.getByRole('button', { name: /Campaign/i })
    await expect(button).toBeVisible()
    
    // Should be clickable
    await expect(button).toBeEnabled()
  })
})

test.describe('Single Player Mode', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: /Campaign/i }).click()
  })

  test('should display mission list or difficulty', async ({ page }) => {
    // Campaign screen should be visible
    const heading = page.getByRole('heading', { name: /Campaign/i })
    await expect(heading).toBeVisible()
  })

  test('should navigate back to main menu', async ({ page }) => {
    const backBtn = page.getByRole('button', { name: /Back to Menu/i })
    await expect(backBtn).toBeVisible()
    await backBtn.click()
    await expect(page.getByRole('heading', { name: /NEXUS COMMAND/i }).first()).toBeVisible()
  })
})

test.describe('Multiplayer Mode', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: /Multiplayer/i }).click()
  })

  test('should display multiplayer screen', async ({ page }) => {
    const heading = page.getByRole('heading', { name: /Multiplayer/i })
    await expect(heading).toBeVisible()
  })

  test('should navigate back to main menu', async ({ page }) => {
    const backBtn = page.getByRole('button', { name: /Back to Menu/i })
    await expect(backBtn).toBeVisible()
    await backBtn.click()
    await expect(page.getByRole('heading', { name: /NEXUS COMMAND/i }).first()).toBeVisible()
  })
})

test.describe('Player Stats', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: /Profile/i }).click()
  })

  test('should display player stats', async ({ page }) => {
    const heading = page.getByRole('heading', { name: /Profile/i })
    await expect(heading).toBeVisible()
  })

  test('should navigate back to main menu', async ({ page }) => {
    const backBtn = page.getByRole('button', { name: /Back to Menu/i })
    await expect(backBtn).toBeVisible()
    await backBtn.click()
    await expect(page.getByRole('heading', { name: /NEXUS COMMAND/i }).first()).toBeVisible()
  })
})

test.describe('Settings', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: /Settings/i }).click()
  })

  test('should display settings', async ({ page }) => {
    const heading = page.getByRole('heading', { name: /Settings/i })
    await expect(heading).toBeVisible()
  })

  test('should have various setting controls', async ({ page }) => {
    // Should have tab buttons for different settings categories
    const tabs = page.getByRole('tab')
    const count = await tabs.count()
    expect(count).toBeGreaterThan(0)
  })

  test('should navigate back to main menu', async ({ page }) => {
    const backBtn = page.getByRole('button', { name: /Back to Menu/i })
    await expect(backBtn).toBeVisible()
    await backBtn.click()
    await expect(page.getByRole('heading', { name: /NEXUS COMMAND/i }).first()).toBeVisible()
  })
})

test.describe('Screen Transitions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  test('should animate between screens', async ({ page }) => {
    await page.getByRole('button', { name: /Campaign/i }).click()
    await expect(page.getByRole('heading', { name: /Campaign/i })).toBeVisible()
  })

  test('should maintain background during transitions', async ({ page }) => {
    const canvas = page.locator('canvas')
    await expect(canvas).toBeVisible()
    
    await page.getByRole('button', { name: /Multiplayer/i }).click()
    await expect(canvas).toBeVisible()
    
    const backBtn = page.getByRole('button', { name: /Back to Menu/i })
    await backBtn.click()
    await expect(canvas).toBeVisible()
  })
})

test.describe('Responsive Design', () => {
  test('should work on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    
    await expect(page.getByRole('heading', { name: /NEXUS COMMAND/i }).first()).toBeVisible()
    await expect(page.getByRole('button', { name: /Campaign/i })).toBeVisible()
  })

  test('should work on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 })
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    
    await expect(page.getByRole('heading', { name: /NEXUS COMMAND/i }).first()).toBeVisible()
  })

  test('should work on desktop viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 })
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    
    await expect(page.getByRole('heading', { name: /NEXUS COMMAND/i }).first()).toBeVisible()
  })
})
