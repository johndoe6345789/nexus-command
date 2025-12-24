import { test, expect } from '@playwright/test'

test.describe('Main Menu Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should display main menu title', async ({ page }) => {
    const title = page.getByText('ARENA COMMAND')
    await expect(title).toBeVisible()
  })

  test('should have all main menu buttons', async ({ page }) => {
    await expect(page.getByText('SINGLE PLAYER')).toBeVisible()
    await expect(page.getByText('MULTIPLAYER')).toBeVisible()
    await expect(page.getByText('PLAYER STATS')).toBeVisible()
    await expect(page.getByText('SETTINGS')).toBeVisible()
    await expect(page.getByText('EXIT')).toBeVisible()
  })

  test('should navigate to single player screen', async ({ page }) => {
    await page.getByText('SINGLE PLAYER').click()
    await expect(page.getByText('SELECT DIFFICULTY')).toBeVisible()
  })

  test('should navigate to multiplayer screen', async ({ page }) => {
    await page.getByText('MULTIPLAYER').click()
    await expect(page.getByText('JOIN SERVER')).toBeVisible()
  })

  test('should navigate to player stats screen', async ({ page }) => {
    await page.getByText('PLAYER STATS').click()
    await expect(page.getByText('COMBAT STATISTICS')).toBeVisible()
  })

  test('should navigate to settings screen', async ({ page }) => {
    await page.getByText('SETTINGS').click()
    await expect(page.getByText('GAME SETTINGS')).toBeVisible()
  })

  test('should show confirm dialog on exit', async ({ page }) => {
    page.on('dialog', async dialog => {
      expect(dialog.message()).toContain('EXIT ARENA COMMAND SYSTEM')
      await dialog.dismiss()
    })
    
    await page.getByText('EXIT').click()
  })

  test('main menu buttons should have glow effects', async ({ page }) => {
    const buttons = page.locator('button').filter({ hasText: 'SINGLE PLAYER' })
    const classList = await buttons.first().evaluate(el => el.className)
    
    expect(classList).toContain('glow-border')
  })
})

test.describe('Single Player Mode', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.getByText('SINGLE PLAYER').click()
  })

  test('should display difficulty levels', async ({ page }) => {
    await expect(page.getByText('RECRUIT')).toBeVisible()
    await expect(page.getByText('VETERAN')).toBeVisible()
    await expect(page.getByText('ELITE')).toBeVisible()
    await expect(page.getByText('NIGHTMARE')).toBeVisible()
  })

  test('should show difficulty descriptions', async ({ page }) => {
    await expect(page.getByText('Basic training mode')).toBeVisible()
    await expect(page.getByText('Standard combat difficulty')).toBeVisible()
    await expect(page.getByText('Advanced warfare challenge')).toBeVisible()
    await expect(page.getByText('Maximum difficulty setting')).toBeVisible()
  })

  test('should navigate back to main menu', async ({ page }) => {
    await page.getByText('BACK TO MAIN MENU').click()
    await expect(page.getByText('ARENA COMMAND')).toBeVisible()
  })

  test('should show toast when starting game', async ({ page }) => {
    await page.getByText('RECRUIT').click()
    await page.getByText('START MISSION').click()
    
    await expect(page.locator('.sonner-toast')).toBeVisible()
  })
})

test.describe('Multiplayer Mode', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.getByText('MULTIPLAYER').click()
  })

  test('should display server input field', async ({ page }) => {
    const input = page.locator('input[placeholder*="server"]')
    await expect(input).toBeVisible()
  })

  test('should have join server button', async ({ page }) => {
    await expect(page.getByText('JOIN SERVER')).toBeVisible()
  })

  test('should navigate back to main menu', async ({ page }) => {
    await page.getByText('BACK TO MAIN MENU').click()
    await expect(page.getByText('ARENA COMMAND')).toBeVisible()
  })

  test('should show available servers section', async ({ page }) => {
    await expect(page.getByText('AVAILABLE SERVERS')).toBeVisible()
  })
})

test.describe('Player Stats', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.getByText('PLAYER STATS').click()
  })

  test('should display combat statistics', async ({ page }) => {
    await expect(page.getByText('COMBAT STATISTICS')).toBeVisible()
  })

  test('should show various stat categories', async ({ page }) => {
    await expect(page.getByText('Total Kills')).toBeVisible()
    await expect(page.getByText('Total Deaths')).toBeVisible()
    await expect(page.getByText('K/D Ratio')).toBeVisible()
  })

  test('should navigate back to main menu', async ({ page }) => {
    await page.getByText('BACK TO MAIN MENU').click()
    await expect(page.getByText('ARENA COMMAND')).toBeVisible()
  })
})

test.describe('Settings', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.getByText('SETTINGS').click()
  })

  test('should display game settings', async ({ page }) => {
    await expect(page.getByText('GAME SETTINGS')).toBeVisible()
  })

  test('should have various setting controls', async ({ page }) => {
    const sliders = page.locator('[role="slider"]')
    const count = await sliders.count()
    expect(count).toBeGreaterThan(0)
  })

  test('should navigate back to main menu', async ({ page }) => {
    await page.getByText('BACK TO MAIN MENU').click()
    await expect(page.getByText('ARENA COMMAND')).toBeVisible()
  })
})

test.describe('Screen Transitions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should animate between screens', async ({ page }) => {
    await page.getByText('SINGLE PLAYER').click()
    await page.waitForTimeout(400)
    await expect(page.getByText('SELECT DIFFICULTY')).toBeVisible()
  })

  test('should maintain background during transitions', async ({ page }) => {
    const canvas = page.locator('canvas')
    await expect(canvas).toBeVisible()
    
    await page.getByText('MULTIPLAYER').click()
    await expect(canvas).toBeVisible()
    
    await page.getByText('BACK TO MAIN MENU').click()
    await expect(canvas).toBeVisible()
  })
})

test.describe('Responsive Design', () => {
  test('should work on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
    
    await expect(page.getByText('ARENA COMMAND')).toBeVisible()
    await expect(page.getByText('SINGLE PLAYER')).toBeVisible()
  })

  test('should work on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 })
    await page.goto('/')
    
    await expect(page.getByText('ARENA COMMAND')).toBeVisible()
  })

  test('should work on desktop viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 })
    await page.goto('/')
    
    await expect(page.getByText('ARENA COMMAND')).toBeVisible()
  })
})
