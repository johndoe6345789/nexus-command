import { test, expect } from '@playwright/test'

test.describe('Animated Background', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should render canvas element for animations', async ({ page }) => {
    const canvas = page.locator('canvas')
    await expect(canvas).toBeVisible()
  })

  test('should have non-transparent background', async ({ page }) => {
    const canvas = page.locator('canvas')
    await expect(canvas).toBeVisible()
    
    const backgroundColor = await page.evaluate(() => {
      const body = document.querySelector('body')
      return window.getComputedStyle(body!).backgroundColor
    })
    
    expect(backgroundColor).not.toBe('rgba(0, 0, 0, 0)')
    expect(backgroundColor).not.toBe('transparent')
  })

  test('should have canvas with correct dimensions', async ({ page }) => {
    const canvas = page.locator('canvas')
    
    const dimensions = await canvas.evaluate((el) => ({
      width: (el as HTMLCanvasElement).width,
      height: (el as HTMLCanvasElement).height,
    }))
    
    expect(dimensions.width).toBeGreaterThan(0)
    expect(dimensions.height).toBeGreaterThan(0)
  })

  test('should have animated rotating elements', async ({ page }) => {
    const rotatingElements = page.locator('.absolute.border-2.border-primary\\/20')
    await expect(rotatingElements.first()).toBeVisible()
    
    const count = await rotatingElements.count()
    expect(count).toBe(5)
  })

  test('should have gradient overlays', async ({ page }) => {
    const gradients = page.locator('.bg-gradient-to-br, .bg-gradient-to-b, .bg-gradient-to-t')
    const count = await gradients.count()
    expect(count).toBeGreaterThan(0)
  })

  test('should have grid pattern background', async ({ page }) => {
    const gridPattern = page.locator('div').filter({
      has: page.locator('[style*="repeating-linear-gradient"]')
    })
    
    const count = await gridPattern.count()
    expect(count).toBeGreaterThan(0)
  })

  test('canvas should animate over time', async ({ page }) => {
    const canvas = page.locator('canvas')
    await canvas.waitFor({ state: 'visible' })
    
    const initialState = await canvas.screenshot()
    
    await page.waitForTimeout(1000)
    
    const laterState = await canvas.screenshot()
    
    expect(initialState.equals(laterState)).toBe(false)
  })

  test('should maintain background on window resize', async ({ page }) => {
    const canvas = page.locator('canvas')
    await expect(canvas).toBeVisible()
    
    await page.setViewportSize({ width: 1200, height: 800 })
    await expect(canvas).toBeVisible()
    
    await page.setViewportSize({ width: 800, height: 600 })
    await expect(canvas).toBeVisible()
  })

  test('background should not be plain white or black', async ({ page }) => {
    await page.waitForTimeout(500)
    
    const screenshot = await page.screenshot()
    const hasColor = await page.evaluate(() => {
      const canvas = document.querySelector('canvas') as HTMLCanvasElement
      if (!canvas) return false
      
      const ctx = canvas.getContext('2d')
      if (!ctx) return false
      
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const pixels = imageData.data
      
      let colorfulPixels = 0
      for (let i = 0; i < pixels.length; i += 4) {
        const r = pixels[i]
        const g = pixels[i + 1]
        const b = pixels[i + 2]
        
        if (!(r === g && g === b)) {
          colorfulPixels++
        }
      }
      
      return colorfulPixels > 100
    })
    
    expect(hasColor).toBe(true)
  })
})
