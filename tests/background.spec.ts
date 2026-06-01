import { test, expect } from '@playwright/test'
import { gotoPath } from './test-utils'

test.describe('Animated background', () => {
  test.beforeEach(async ({ page }) => {
    await gotoPath(page)
    await page.waitForLoadState('networkidle')
  })

  test('should render a fixed canvas for animations', async ({ page }) => {
    const canvas = page.locator('canvas')
    await expect(canvas).toBeVisible()

    const position = await canvas.evaluate((el) => window.getComputedStyle(el).position)
    expect(position).toBe('fixed')
  })

  test('should cover the viewport', async ({ page }) => {
    const canvas = page.locator('canvas')
    const viewport = page.viewportSize()
    expect(viewport).not.toBeNull()

    const rect = await canvas.evaluate((el) => {
      const { width, height } = el.getBoundingClientRect()
      return { width, height }
    })

    expect(rect.width).toBeGreaterThanOrEqual(viewport!.width)
    expect(rect.height).toBeGreaterThanOrEqual(viewport!.height)
  })

  test('should render multiple fixed overlay layers', async ({ page }) => {
    const overlayCount = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('body *')).filter((element) => {
        const style = window.getComputedStyle(element)
        return style.position === 'fixed' && style.pointerEvents === 'none'
      }).length
    })

    expect(overlayCount).toBeGreaterThanOrEqual(5)
  })

  test('should animate over time', async ({ page }) => {
    const canvas = page.locator('canvas')
    const before = await canvas.screenshot()

    await page.waitForTimeout(1000)

    const after = await canvas.screenshot()
    expect(before.equals(after)).toBe(false)
  })

  test('should stay visible and sized after resize', async ({ page }) => {
    const canvas = page.locator('canvas')

    await page.setViewportSize({ width: 1200, height: 800 })
    await expect(canvas).toBeVisible()

    await page.setViewportSize({ width: 800, height: 600 })
    await expect(canvas).toBeVisible()

    const rect = await canvas.evaluate((el) => {
      const { width, height } = el.getBoundingClientRect()
      return { width, height }
    })

    expect(rect.width).toBeGreaterThan(0)
    expect(rect.height).toBeGreaterThan(0)
  })
})
