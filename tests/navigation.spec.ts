import { test, expect } from '@playwright/test'
import { gotoPath } from './test-utils'

const routes = [
  { button: /Campaign/i, heading: /Campaign/i, href: '/campaign/', path: /\/campaign\/?$/ },
  { button: /Multiplayer/i, heading: /Multiplayer/i, href: '/multiplayer/', path: /\/multiplayer\/?$/ },
  { button: /Profile/i, heading: /Profile/i, href: '/profile/', path: /\/profile\/?$/ },
  { button: /Settings/i, heading: /Settings/i, href: '/settings/', path: /\/settings\/?$/ },
  { button: /Developer/i, heading: /Developer Tools/i, href: '/developer/', path: /\/developer\/?$/ },
] as const

test.describe('App Router navigation', () => {
  test.beforeEach(async ({ page }) => {
    await gotoPath(page)
    await page.waitForLoadState('networkidle')
  })

  test('should display all main menu buttons', async ({ page }) => {
    for (const route of routes) {
      await expect(page.getByRole('button', { name: route.button })).toBeVisible()
    }

    await expect(page.getByRole('button', { name: /Exit/i })).toBeVisible()
  })

  for (const route of routes) {
    test(`should navigate to ${route.path}`, async ({ page }) => {
      await page.getByRole('button', { name: route.button }).click()

      await expect(page).toHaveURL(route.path)
      await expect(page.getByRole('heading', { name: route.heading })).toBeVisible()
    })

    test(`should deep link directly to ${route.path}`, async ({ page }) => {
      await gotoPath(page, route.href)
      await page.waitForLoadState('networkidle')

      await expect(page).toHaveURL(route.path)
      await expect(page.getByRole('heading', { name: route.heading })).toBeVisible()
      await expect(page.getByRole('banner')).toBeVisible()
    })
  }

  test('should navigate back to the main menu from a subpage', async ({ page }) => {
    await gotoPath(page, '/campaign/')
    await page.getByRole('button', { name: /Back to Menu/i }).click({ force: true })

    await expect(page).toHaveURL(/\/$/)
    await expect(page.getByRole('heading', { name: /NEXUS COMMAND/i }).first()).toBeVisible()
  })

  test('should keep the animated background during route changes', async ({ page }) => {
    const canvas = page.locator('canvas')
    await expect(canvas).toBeVisible()

    await page.getByRole('button', { name: /Multiplayer/i }).click()
    await expect(page).toHaveURL(/\/multiplayer\/?$/)
    await expect(canvas).toBeVisible()

    await page.getByRole('button', { name: /Back to Menu/i }).click({ force: true })
    await expect(page).toHaveURL(/\/$/)
    await expect(canvas).toBeVisible()
  })

  test('should show confirm dialog on exit without leaving home when dismissed', async ({ page }) => {
    let seenDialog = false

    page.on('dialog', async dialog => {
      seenDialog = true
      expect(dialog.message()).toContain('Exit NEXUS COMMAND?')
      await dialog.dismiss()
    })

    await page.getByRole('button', { name: /Exit/i }).click()

    expect(seenDialog).toBe(true)
    await expect(page).toHaveURL(/\/$/)
    await expect(page.getByRole('heading', { name: /NEXUS COMMAND/i }).first()).toBeVisible()
  })
})
