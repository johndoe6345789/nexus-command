import { test, expect } from '@playwright/test'
import { gotoPath } from './test-utils'

test.describe('Route interactions', () => {
  test('should persist the profile name setting after reload', async ({ page }) => {
    await gotoPath(page, '/settings/')

    await page.getByRole('tab', { name: /Profile/i }).click()

    const nameField = page.getByPlaceholder('Enter your name')
    await nameField.fill('Route Tester')

    await page.reload()
    await page.waitForLoadState('networkidle')

    await expect(page).toHaveURL(/\/settings\/?$/)
    await page.getByRole('tab', { name: /Profile/i }).click()
    await expect(page.getByPlaceholder('Enter your name')).toHaveValue('Route Tester')
  })

  test('should enable campaign start after choosing a mission', async ({ page }) => {
    await gotoPath(page, '/campaign/')

    const startButton = page.getByRole('button', { name: /Start Mission/i })
    await expect(startButton).toBeDisabled()

    await page.getByText('Aegis Station').click()
    await page.getByRole('button', { name: /Legendary/i }).click()

    await expect(startButton).toBeEnabled()
    await expect(page.getByText('Map:')).toBeVisible()
    await expect(page.locator('span').filter({ hasText: /^Aegis Station$/ }).last()).toBeVisible()
    await expect(page.locator('span').filter({ hasText: /^Legendary$/ }).last()).toBeVisible()
  })

  test('should switch developer tabs', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    await gotoPath(page, '/developer/')

    await page.getByRole('tab', { name: /Console/i }).click()
    await expect(page.getByPlaceholder('Enter command...')).toBeVisible()

    await page.getByRole('tab', { name: /Overview/i }).click()
    await expect(page.getByRole('tab', { name: /Overview/i })).toHaveAttribute('aria-selected', 'true')
  })

  test('should show profile stats and recent matches on the profile route', async ({ page }) => {
    await gotoPath(page, '/profile/')

    await expect(page.getByRole('heading', { name: /Profile/i })).toBeVisible()
    await expect(page.getByText(/Recent Matches/i)).toBeVisible()

    const bodyText = await page.textContent('body')
    expect(bodyText).toMatch(/\d+/)
    expect(bodyText).toContain('K/D Ratio')
  })
})
