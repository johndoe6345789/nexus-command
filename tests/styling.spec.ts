import { test, expect } from '@playwright/test'

test.describe('Visual Styling', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should use Orbitron font for headings', async ({ page }) => {
    const heading = page.getByText('ARENA COMMAND').first()
    const fontFamily = await heading.evaluate(el => 
      window.getComputedStyle(el).fontFamily
    )
    
    expect(fontFamily.toLowerCase()).toContain('orbitron')
  })

  test('should use Rajdhani font for body text', async ({ page }) => {
    const bodyFont = await page.evaluate(() => 
      window.getComputedStyle(document.body).fontFamily
    )
    
    expect(bodyFont.toLowerCase()).toContain('rajdhani')
  })

  test('should have glow effects on primary elements', async ({ page }) => {
    const glowElements = page.locator('.glow-border, .glow-text')
    const count = await glowElements.count()
    
    expect(count).toBeGreaterThan(0)
  })

  test('should have proper color scheme', async ({ page }) => {
    const backgroundColor = await page.evaluate(() => {
      const root = document.documentElement
      return getComputedStyle(root).getPropertyValue('--background')
    })
    
    expect(backgroundColor).toContain('oklch')
  })

  test('buttons should have hover effects', async ({ page }) => {
    const button = page.getByText('SINGLE PLAYER')
    
    await button.hover()
    await page.waitForTimeout(200)
    
    const transform = await button.evaluate(el => 
      window.getComputedStyle(el).transform
    )
    
    expect(transform).not.toBe('none')
  })

  test('should have minimal border radius', async ({ page }) => {
    const borderRadius = await page.evaluate(() => {
      const root = document.documentElement
      return getComputedStyle(root).getPropertyValue('--radius')
    })
    
    expect(borderRadius.trim()).toBe('2px')
  })
})

test.describe('Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should have proper document title', async ({ page }) => {
    await expect(page).toHaveTitle('ARENA COMMAND')
  })

  test('all interactive elements should be keyboard accessible', async ({ page }) => {
    await page.keyboard.press('Tab')
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName)
    
    expect(focusedElement).toBe('BUTTON')
  })

  test('buttons should have visible focus states', async ({ page }) => {
    await page.keyboard.press('Tab')
    
    const focusedButton = page.locator('button:focus')
    await expect(focusedButton).toBeVisible()
  })

  test('main heading should exist', async ({ page }) => {
    const h1 = page.locator('h1, [role="heading"][aria-level="1"]')
    const count = await h1.count()
    
    expect(count).toBeGreaterThan(0)
  })
})

test.describe('Performance', () => {
  test('should load within reasonable time', async ({ page }) => {
    const startTime = Date.now()
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    const loadTime = Date.now() - startTime
    
    expect(loadTime).toBeLessThan(10000)
  })

  test('canvas animation should not block interactions', async ({ page }) => {
    await page.goto('/')
    
    const button = page.getByText('SINGLE PLAYER')
    const startTime = Date.now()
    await button.click()
    const clickTime = Date.now() - startTime
    
    expect(clickTime).toBeLessThan(1000)
  })

  test('should not have console errors', async ({ page }) => {
    const errors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text())
      }
    })
    
    await page.goto('/')
    await page.waitForTimeout(2000)
    
    expect(errors.length).toBe(0)
  })
})

test.describe('Canvas Rendering', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('canvas should have proper context', async ({ page }) => {
    const hasContext = await page.evaluate(() => {
      const canvas = document.querySelector('canvas') as HTMLCanvasElement
      if (!canvas) return false
      
      const ctx = canvas.getContext('2d')
      return ctx !== null
    })
    
    expect(hasContext).toBe(true)
  })

  test('particles should be rendered on canvas', async ({ page }) => {
    await page.waitForTimeout(1000)
    
    const hasParticles = await page.evaluate(() => {
      const canvas = document.querySelector('canvas') as HTMLCanvasElement
      if (!canvas) return false
      
      const ctx = canvas.getContext('2d')
      if (!ctx) return false
      
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const pixels = imageData.data
      
      let nonZeroPixels = 0
      for (let i = 0; i < pixels.length; i += 4) {
        const alpha = pixels[i + 3]
        if (alpha > 0) {
          nonZeroPixels++
        }
      }
      
      return nonZeroPixels > 1000
    })
    
    expect(hasParticles).toBe(true)
  })

  test('canvas should update continuously', async ({ page }) => {
    const samples = []
    
    for (let i = 0; i < 3; i++) {
      await page.waitForTimeout(300)
      
      const pixelData = await page.evaluate(() => {
        const canvas = document.querySelector('canvas') as HTMLCanvasElement
        if (!canvas) return 0
        
        const ctx = canvas.getContext('2d')
        if (!ctx) return 0
        
        const imageData = ctx.getImageData(100, 100, 1, 1)
        return imageData.data[0] + imageData.data[1] + imageData.data[2]
      })
      
      samples.push(pixelData)
    }
    
    const allSame = samples.every(val => val === samples[0])
    expect(allSame).toBe(false)
  })
})

test.describe('Theme and Colors', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should use primary color for key elements', async ({ page }) => {
    const primaryColor = await page.evaluate(() => {
      const root = document.documentElement
      return getComputedStyle(root).getPropertyValue('--primary')
    })
    
    expect(primaryColor).toContain('oklch')
    expect(primaryColor).toContain('250')
  })

  test('should use accent color appropriately', async ({ page }) => {
    const accentColor = await page.evaluate(() => {
      const root = document.documentElement
      return getComputedStyle(root).getPropertyValue('--accent')
    })
    
    expect(accentColor).toContain('oklch')
    expect(accentColor).toContain('40')
  })

  test('should have dark theme', async ({ page }) => {
    const bgColor = await page.evaluate(() => {
      const root = document.documentElement
      const bgValue = getComputedStyle(root).getPropertyValue('--background')
      return bgValue
    })
    
    expect(bgColor).toContain('0.15')
  })
})
