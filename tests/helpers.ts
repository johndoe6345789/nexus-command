import { Page, expect } from '@playwright/test'

export class MenuHelpers {
  constructor(private page: Page) {}

  async navigateToSinglePlayer() {
    await this.page.getByRole('button', { name: /Campaign/i }).click()
    await expect(this.page.getByRole('heading', { name: /Campaign/i })).toBeVisible()
  }

  async navigateToMultiplayer() {
    await this.page.getByRole('button', { name: /Multiplayer/i }).click()
    await expect(this.page.getByRole('heading', { name: /Multiplayer/i })).toBeVisible()
  }

  async navigateToSettings() {
    await this.page.getByRole('button', { name: /Settings/i }).click()
    await expect(this.page.getByRole('heading', { name: /Settings/i })).toBeVisible()
  }

  async navigateToStats() {
    await this.page.getByRole('button', { name: /Profile/i }).click()
    await expect(this.page.getByRole('heading', { name: /Profile/i })).toBeVisible()
  }

  async backToMainMenu() {
    await this.page.getByRole('button', { name: /Back to Menu/i }).click()
    await expect(this.page.getByRole('heading', { name: /NEXUS COMMAND/i }).first()).toBeVisible()
  }

  async selectDifficulty(difficulty: 'RECRUIT' | 'VETERAN' | 'ELITE' | 'NIGHTMARE') {
    await this.page.getByText(difficulty).click()
    
    const button = this.page.locator('button').filter({ hasText: difficulty })
    const classList = await button.evaluate(el => el.className)
    expect(classList).toContain('glow-accent')
  }

  async startMission() {
    await this.page.getByText('START MISSION').click()
    await expect(this.page.locator('.sonner-toast')).toBeVisible()
  }

  async joinServer(serverAddress: string) {
    const input = this.page.locator('input[placeholder*="server"]')
    await input.fill(serverAddress)
    await this.page.getByText('JOIN SERVER').click()
    await expect(this.page.locator('.sonner-toast')).toBeVisible()
  }
}

export class BackgroundHelpers {
  constructor(private page: Page) {}

  async verifyCanvasVisible() {
    const canvas = this.page.locator('canvas')
    await expect(canvas).toBeVisible()
  }

  async verifyAnimationsRunning() {
    const canvas = this.page.locator('canvas')
    await canvas.waitFor({ state: 'visible' })
    
    const initialState = await canvas.screenshot()
    await this.page.waitForTimeout(1000)
    const laterState = await canvas.screenshot()
    
    expect(initialState.equals(laterState)).toBe(false)
  }

  async verifyHasColor() {
    await this.page.waitForTimeout(500)
    
    const hasColor = await this.page.evaluate(() => {
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
  }

  async verifyRotatingElements() {
    const rotatingElements = this.page.locator('.absolute.border-2.border-primary\\/20')
    await expect(rotatingElements.first()).toBeVisible()
    
    const count = await rotatingElements.count()
    expect(count).toBe(5)
  }
}

export class ThemeHelpers {
  constructor(private page: Page) {}

  async verifyOklchColors() {
    const backgroundColor = await this.page.evaluate(() => {
      const root = document.documentElement
      return getComputedStyle(root).getPropertyValue('--background')
    })
    
    expect(backgroundColor).toContain('oklch')
  }

  async verifyCustomFonts() {
    const headingFont = await this.page.getByRole('heading', { name: /NEXUS COMMAND/i }).first().evaluate(el => 
      window.getComputedStyle(el).fontFamily
    )
    expect(headingFont.toLowerCase()).toContain('orbitron')
    
    const bodyFont = await this.page.evaluate(() => 
      window.getComputedStyle(document.body).fontFamily
    )
    // Body uses Inter font from Next.js
    expect(bodyFont.toLowerCase()).toMatch(/inter|rajdhani|space/i)
  }

  async verifyGlowEffects() {
    const glowElements = this.page.locator('.glow-border, .glow-text')
    const count = await glowElements.count()
    expect(count).toBeGreaterThan(0)
  }

  async verifyMinimalRadius() {
    const borderRadius = await this.page.evaluate(() => {
      const root = document.documentElement
      return getComputedStyle(root).getPropertyValue('--radius')
    })
    expect(borderRadius.trim()).toBe('2px')
  }
}

export async function waitForAnimation(page: Page, duration = 500) {
  await page.waitForTimeout(duration)
}

export async function takeScreenshotOnFailure(page: Page, testInfo: any) {
  if (testInfo.status !== testInfo.expectedStatus) {
    await page.screenshot({ 
      path: `test-results/failure-${testInfo.title.replace(/\s+/g, '-')}-${Date.now()}.png`,
      fullPage: true 
    })
  }
}

export async function measureFPS(page: Page, duration = 2000): Promise<number> {
  const fps = await page.evaluate((duration) => {
    return new Promise<number>((resolve) => {
      let frameCount = 0
      const startTime = performance.now()
      
      function countFrame() {
        frameCount++
        const elapsed = performance.now() - startTime
        
        if (elapsed < duration) {
          requestAnimationFrame(countFrame)
        } else {
          const fps = (frameCount / elapsed) * 1000
          resolve(fps)
        }
      }
      
      requestAnimationFrame(countFrame)
    })
  }, duration)
  
  return fps
}
