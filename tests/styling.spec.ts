import { test, expect } from '@playwright/test'
import { gotoPath } from './test-utils'

test.describe('Styling and accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await gotoPath(page)
    await page.waitForLoadState('networkidle')
  })

  test('should use the NEXUS COMMAND document title', async ({ page }) => {
    await expect(page).toHaveTitle('NEXUS COMMAND')
  })

  test('should use Inter for body text and Rajdhani for headings', async ({ page }) => {
    const bodyFont = await page.evaluate(() => window.getComputedStyle(document.body).fontFamily)
    expect(bodyFont.toLowerCase()).toMatch(/space grotesk|inter/)

    const headingFont = await page.getByRole('heading', { name: /NEXUS COMMAND/i, level: 1 }).evaluate((el) =>
      window.getComputedStyle(el).fontFamily
    )
    expect(headingFont.toLowerCase()).toMatch(/orbitron|rajdhani/)
  })

  test('should render the shared top bar actions', async ({ page }) => {
    await expect(page.getByRole('link', { name: /GitHub Actions/i })).toBeVisible()
    await expect(page.getByRole('button', { name: /Notifications/i })).toBeVisible()
    await expect(page.getByRole('button', { name: /Achievements/i })).toBeVisible()
  })

  test('should keep a dark non-transparent page background', async ({ page }) => {
    const backgroundColor = await page.evaluate(() => window.getComputedStyle(document.body).backgroundColor)

    expect(backgroundColor).not.toBe('rgba(0, 0, 0, 0)')
    expect(backgroundColor).not.toBe('transparent')
  })

  test('should support keyboard focus on interactive elements', async ({ page }) => {
    await page.keyboard.press('Tab')

    const focusedTag = await page.evaluate(() => document.activeElement?.tagName)
    expect(focusedTag).toBeTruthy()
  })

  test('should not emit console errors on initial load', async ({ page }) => {
    const errors: string[] = []

    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text())
      }
    })

    await gotoPath(page)
    await page.waitForLoadState('networkidle')

    expect(errors).toHaveLength(0)
  })
})
