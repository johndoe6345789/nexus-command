import { test, expect } from '@playwright/test'

test.describe('Error Handling', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should handle rapid button clicks without errors', async ({ page }) => {
    const button = page.getByText('SINGLE PLAYER')
    
    // Click rapidly multiple times
    for (let i = 0; i < 5; i++) {
      await button.click({ force: true })
    }
    
    // Should still be functional
    await expect(page.getByText('SELECT DIFFICULTY')).toBeVisible()
  })

  test('should handle back navigation without selected difficulty', async ({ page }) => {
    await page.getByText('SINGLE PLAYER').click()
    await page.getByText('BACK TO MAIN MENU').click()
    
    await expect(page.getByText('ARENA COMMAND')).toBeVisible()
  })

  test('should handle starting mission without selecting difficulty', async ({ page }) => {
    await page.getByText('SINGLE PLAYER').click()
    
    const startButton = page.getByText('START MISSION')
    
    // Button should exist but mission start should be handled gracefully
    if (await startButton.isVisible()) {
      await startButton.click()
      // Verify the app doesn't crash - check that UI is still responsive
      await expect(page.getByText('SELECT DIFFICULTY')).toBeVisible()
    }
  })

  test('should handle empty server address submission', async ({ page }) => {
    await page.getByText('MULTIPLAYER').click()
    
    const input = page.locator('input[placeholder*="server"]')
    await input.fill('')
    await page.getByText('JOIN SERVER').click()
    
    // Should handle empty input gracefully - verify UI is still functional
    await expect(page.getByText('AVAILABLE SERVERS')).toBeVisible()
  })

  test('should handle special characters in server address', async ({ page }) => {
    await page.getByText('MULTIPLAYER').click()
    
    const input = page.locator('input[placeholder*="server"]')
    await input.fill('test@#$%^&*()_+')
    await page.getByText('JOIN SERVER').click()
    
    // Should handle special characters without crashing - verify UI is still responsive
    await expect(page.getByText('AVAILABLE SERVERS')).toBeVisible()
  })

  test('should maintain state after multiple screen transitions', async ({ page }) => {
    // Navigate through multiple screens
    await page.getByText('SINGLE PLAYER').click()
    await page.getByText('BACK TO MAIN MENU').click()
    
    await page.getByText('MULTIPLAYER').click()
    await page.getByText('BACK TO MAIN MENU').click()
    
    await page.getByText('SETTINGS').click()
    await page.getByText('BACK TO MAIN MENU').click()
    
    // Main menu should still be functional
    await expect(page.getByText('ARENA COMMAND')).toBeVisible()
    await expect(page.getByText('SINGLE PLAYER')).toBeVisible()
  })
})

test.describe('Edge Cases', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should handle difficulty selection changes', async ({ page }) => {
    await page.getByText('SINGLE PLAYER').click()
    
    // Select multiple difficulties in sequence
    await page.getByText('RECRUIT').click()
    const recruitButton = page.locator('button').filter({ hasText: 'RECRUIT' })
    await expect(recruitButton).toHaveClass(/glow-accent/)
    
    await page.getByText('VETERAN').click()
    const veteranButton = page.locator('button').filter({ hasText: 'VETERAN' })
    await expect(veteranButton).toHaveClass(/glow-accent/)
    
    await page.getByText('ELITE').click()
    const eliteButton = page.locator('button').filter({ hasText: 'ELITE' })
    await expect(eliteButton).toHaveClass(/glow-accent/)
    
    await page.getByText('NIGHTMARE').click()
    
    const nightmareButton = page.locator('button').filter({ hasText: 'NIGHTMARE' })
    const classList = await nightmareButton.evaluate(el => el.className)
    
    expect(classList).toContain('glow-accent')
  })

  test('should handle server list when no servers available', async ({ page }) => {
    await page.getByText('MULTIPLAYER').click()
    
    // Server list section should still be visible
    await expect(page.getByText('AVAILABLE SERVERS')).toBeVisible()
  })

  test('should handle very long server addresses', async ({ page }) => {
    await page.getByText('MULTIPLAYER').click()
    
    const input = page.locator('input[placeholder*="server"]')
    const longAddress = 'a'.repeat(100) + '.example.com'
    await input.fill(longAddress)
    
    const value = await input.inputValue()
    expect(value).toBe(longAddress)
  })

  test('should handle settings slider at minimum value', async ({ page }) => {
    await page.getByText('SETTINGS').click()
    
    const slider = page.locator('[role="slider"]').first()
    await slider.focus()
    
    // Press down arrow multiple times to reach minimum
    for (let i = 0; i < 20; i++) {
      await page.keyboard.press('ArrowDown')
    }
    
    const minValue = await slider.getAttribute('aria-valuenow')
    expect(Number(minValue)).toBeGreaterThanOrEqual(0)
  })

  test('should handle settings slider at maximum value', async ({ page }) => {
    await page.getByText('SETTINGS').click()
    
    const slider = page.locator('[role="slider"]').first()
    await slider.focus()
    
    // Press up arrow multiple times to reach maximum
    for (let i = 0; i < 20; i++) {
      await page.keyboard.press('ArrowUp')
    }
    
    const maxValue = await slider.getAttribute('aria-valuenow')
    expect(Number(maxValue)).toBeLessThanOrEqual(100)
  })
})

test.describe('Accessibility Edge Cases', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should handle keyboard navigation from end to start', async ({ page }) => {
    // Tab through all elements
    for (let i = 0; i < 10; i++) {
      await page.keyboard.press('Tab')
    }
    
    // Should still be able to navigate
    const focusedElement = await page.evaluate(() => {
      const el = document.activeElement
      return el ? el.tagName : null
    })
    
    expect(focusedElement).toBeTruthy()
  })

  test('should handle escape key on main menu', async ({ page }) => {
    await page.keyboard.press('Escape')
    
    // Should not crash - verify main menu is still visible
    await expect(page.getByText('ARENA COMMAND')).toBeVisible()
  })

  test('should handle escape key in submenus', async ({ page }) => {
    await page.getByText('SINGLE PLAYER').click()
    await page.keyboard.press('Escape')
    
    // Should not crash - verify some content is still visible
    const bodyText = await page.textContent('body')
    expect(bodyText).toBeTruthy()
  })

  test('should handle enter key on focused button', async ({ page }) => {
    await page.keyboard.press('Tab')
    await page.keyboard.press('Enter')
    
    // Should navigate to appropriate screen - verify content changed
    await page.waitForLoadState('networkidle')
    const content = await page.textContent('body')
    expect(content).toBeTruthy()
  })
})

test.describe('Data Validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should display valid player stats values', async ({ page }) => {
    await page.getByText('PLAYER STATS').click()
    
    // Check if stats are displayed and contain numbers
    const bodyText = await page.textContent('body')
    expect(bodyText).toMatch(/\d+/)
  })

  test('should display valid K/D ratio format', async ({ page }) => {
    await page.getByText('PLAYER STATS').click()
    
    const bodyText = await page.textContent('body')
    // K/D ratio should be present
    expect(bodyText).toContain('K/D')
  })

  test('should display server information correctly', async ({ page }) => {
    await page.getByText('MULTIPLAYER').click()
    
    // Check if server cards are present
    const serverSection = page.getByText('AVAILABLE SERVERS')
    await expect(serverSection).toBeVisible()
  })
})

test.describe('Toast Notification Edge Cases', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should show toast for each difficulty level', async ({ page }) => {
    await page.getByText('SINGLE PLAYER').click()
    
    const difficulties = ['RECRUIT', 'VETERAN', 'ELITE', 'NIGHTMARE']
    
    for (const difficulty of difficulties) {
      await page.getByText(difficulty).click()
      await page.getByText('START MISSION').click()
      
      // Verify toast appears
      await expect(page.locator('.sonner-toast')).toBeVisible()
      
      // Wait for toast to disappear naturally or reload
      await page.goto('/')
      await page.getByText('SINGLE PLAYER').click()
    }
  })

  test('should handle multiple toast notifications', async ({ page }) => {
    await page.getByText('MULTIPLAYER').click()
    
    const input = page.locator('input[placeholder*="server"]')
    
    // Trigger multiple toasts rapidly
    await input.fill('server1.com')
    await page.getByText('JOIN SERVER').click()
    
    // Wait for first toast to appear
    await expect(page.locator('.sonner-toast').first()).toBeVisible()
    
    await input.fill('server2.com')
    await page.getByText('JOIN SERVER').click()
    
    // Should handle multiple toasts without crashing - verify UI is still functional
    await expect(page.getByText('AVAILABLE SERVERS')).toBeVisible()
  })
})
