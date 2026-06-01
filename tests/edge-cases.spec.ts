import { test, expect } from '@playwright/test'
import { gotoPath } from './test-utils'

test.describe('Route edge cases', () => {
  test('should handle rapid route hopping without losing the main menu', async ({ page }) => {
    const hops = [
      { button: /Campaign/i, path: /\/campaign\/?$/ },
      { button: /Multiplayer/i, path: /\/multiplayer\/?$/ },
      { button: /Settings/i, path: /\/settings\/?$/ },
    ]

    for (const hop of hops) {
      await gotoPath(page)
      await page.getByRole('button', { name: hop.button }).click()
      await expect(page).toHaveURL(hop.path)
    }

    await gotoPath(page)
    await expect(page.getByRole('button', { name: /Campaign/i })).toBeVisible()
  })

  test('should allow keyboard activation of a focused menu button', async ({ page }) => {
    await gotoPath(page)

    const campaignButton = page.getByRole('button', { name: /Campaign/i })
    await campaignButton.focus()
    await page.keyboard.press('Enter')

    await expect(page).toHaveURL(/\/campaign\/?$/)
    await expect(page.getByRole('heading', { name: /Campaign/i })).toBeVisible()
  })

  test('should ignore escape on the main menu without crashing', async ({ page }) => {
    await gotoPath(page)
    await page.keyboard.press('Escape')

    await expect(page).toHaveURL(/\/$/)
    await expect(page.getByRole('heading', { name: /NEXUS COMMAND/i }).first()).toBeVisible()
  })

  test('should keep a submenu visible after escape', async ({ page }) => {
    await gotoPath(page, '/campaign/')
    await page.keyboard.press('Escape')

    await expect(page).toHaveURL(/\/campaign\/?$/)
    await expect(page.getByRole('heading', { name: /Campaign/i })).toBeVisible()
  })

  test('should deep link into multiplayer and render the server panel', async ({ page }) => {
    await gotoPath(page, '/multiplayer/')
    await expect(page.getByRole('heading', { name: /Multiplayer/i })).toBeVisible()
    await expect(page.getByText('Server Info')).toBeVisible()
  })

  test('should render settings tabs after a deep link', async ({ page }) => {
    await gotoPath(page, '/settings/')

    await expect(page.getByRole('tab', { name: /Graphics/i })).toBeVisible()
    await expect(page.getByRole('tab', { name: /Audio/i })).toBeVisible()
    await expect(page.getByRole('tab', { name: /Controls/i })).toBeVisible()
    await expect(page.getByRole('tab', { name: /Profile/i })).toBeVisible()
  })
})
