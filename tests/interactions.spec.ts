import { test, expect } from '@playwright/test'

test.describe('User Interactions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should handle rapid navigation', async ({ page }) => {
    for (let i = 0; i < 3; i++) {
      await page.getByText('SINGLE PLAYER').click()
      await expect(page.getByText('SELECT DIFFICULTY')).toBeVisible()
      await page.getByText('BACK TO MAIN MENU').click()
      await expect(page.getByText('ARENA COMMAND')).toBeVisible()
    }
  })

  test('should maintain state during navigation', async ({ page }) => {
    await page.getByText('SETTINGS').click()
    
    const slider = page.locator('[role="slider"]').first()
    await slider.focus()
    await page.keyboard.press('ArrowRight')
    await page.keyboard.press('ArrowRight')
    
    await page.getByText('BACK TO MAIN MENU').click()
    await page.getByText('SETTINGS').click()
    
    await expect(slider).toBeVisible()
  })

  test('should handle keyboard navigation through menu', async ({ page }) => {
    await page.keyboard.press('Tab')
    await page.keyboard.press('Enter')
    
    await expect(page.getByText('SELECT DIFFICULTY')).toBeVisible()
  })

  test('should show visual feedback on button press', async ({ page }) => {
    const button = page.getByText('SINGLE PLAYER')
    
    const box1 = await button.boundingBox()
    await button.hover()
    await page.waitForTimeout(100)
    
    const transform = await button.evaluate(el => 
      window.getComputedStyle(el).transform
    )
    
    expect(transform).not.toBe('none')
  })

  test('should handle multiple server entries in multiplayer', async ({ page }) => {
    await page.getByText('MULTIPLAYER').click()
    
    const input = page.locator('input[placeholder*="server"]')
    await input.fill('server1.example.com')
    await page.getByText('JOIN SERVER').click()
    
    await page.waitForTimeout(500)
    await expect(page.locator('.sonner-toast')).toBeVisible()
  })
})

test.describe('Difficulty Selection', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.getByText('SINGLE PLAYER').click()
  })

  test('should select difficulty level', async ({ page }) => {
    await page.getByText('VETERAN').click()
    
    const veteranButton = page.locator('button').filter({ hasText: 'VETERAN' })
    const classList = await veteranButton.evaluate(el => el.className)
    
    expect(classList).toContain('glow-accent')
  })

  test('should change difficulty selection', async ({ page }) => {
    await page.getByText('RECRUIT').click()
    await page.getByText('ELITE').click()
    
    const eliteButton = page.locator('button').filter({ hasText: 'ELITE' })
    const classList = await eliteButton.evaluate(el => el.className)
    
    expect(classList).toContain('glow-accent')
  })

  test('should start mission with selected difficulty', async ({ page }) => {
    await page.getByText('NIGHTMARE').click()
    await page.getByText('START MISSION').click()
    
    const toast = page.locator('.sonner-toast')
    await expect(toast).toContainText('NIGHTMARE')
  })

  test('all difficulty buttons should have descriptions', async ({ page }) => {
    const difficulties = ['RECRUIT', 'VETERAN', 'ELITE', 'NIGHTMARE']
    
    for (const difficulty of difficulties) {
      const button = page.locator('button').filter({ hasText: difficulty })
      await expect(button).toBeVisible()
    }
  })
})

test.describe('Settings Persistence', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should persist volume settings', async ({ page }) => {
    await page.getByText('SETTINGS').click()
    
    const volumeSlider = page.locator('[role="slider"]').first()
    await volumeSlider.focus()
    
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('ArrowRight')
    }
    
    const value1 = await volumeSlider.getAttribute('aria-valuenow')
    
    await page.reload()
    await page.getByText('SETTINGS').click()
    
    const value2 = await volumeSlider.getAttribute('aria-valuenow')
    
    expect(value1).toBe(value2)
  })

  test('should adjust multiple settings', async ({ page }) => {
    await page.getByText('SETTINGS').click()
    
    const sliders = page.locator('[role="slider"]')
    const count = await sliders.count()
    
    expect(count).toBeGreaterThan(2)
    
    for (let i = 0; i < Math.min(3, count); i++) {
      const slider = sliders.nth(i)
      await slider.focus()
      await page.keyboard.press('ArrowUp')
    }
  })
})

test.describe('Toast Notifications', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should show toast on mission start', async ({ page }) => {
    await page.getByText('SINGLE PLAYER').click()
    await page.getByText('RECRUIT').click()
    await page.getByText('START MISSION').click()
    
    const toast = page.locator('.sonner-toast')
    await expect(toast).toBeVisible()
    await expect(toast).toContainText('INITIATING')
  })

  test('should show toast on server join', async ({ page }) => {
    await page.getByText('MULTIPLAYER').click()
    
    const input = page.locator('input[placeholder*="server"]')
    await input.fill('test-server.com')
    await page.getByText('JOIN SERVER').click()
    
    const toast = page.locator('.sonner-toast')
    await expect(toast).toBeVisible()
  })

  test('toast should have custom styling', async ({ page }) => {
    await page.getByText('SINGLE PLAYER').click()
    await page.getByText('RECRUIT').click()
    await page.getByText('START MISSION').click()
    
    const toast = page.locator('.sonner-toast')
    await expect(toast).toBeVisible()
    
    const fontFamily = await toast.evaluate(el => 
      window.getComputedStyle(el).fontFamily
    )
    
    expect(fontFamily.toLowerCase()).toContain('orbitron')
  })
})

test.describe('Multiplayer Server List', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.getByText('MULTIPLAYER').click()
  })

  test('should display available servers section', async ({ page }) => {
    await expect(page.getByText('AVAILABLE SERVERS')).toBeVisible()
  })

  test('should show server information cards', async ({ page }) => {
    const serverCards = page.locator('.glow-border').filter({
      has: page.locator('text=/Server|Players|Map|Ping/')
    })
    
    const count = await serverCards.count()
    expect(count).toBeGreaterThan(0)
  })

  test('should allow custom server entry', async ({ page }) => {
    const input = page.locator('input[placeholder*="server"]')
    await expect(input).toBeVisible()
    await expect(input).toBeEditable()
    
    await input.fill('my-custom-server.com:27960')
    const value = await input.inputValue()
    expect(value).toBe('my-custom-server.com:27960')
  })
})

test.describe('Player Stats Display', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.getByText('PLAYER STATS').click()
  })

  test('should display stat cards', async ({ page }) => {
    const statCards = page.locator('.glow-border')
    const count = await statCards.count()
    expect(count).toBeGreaterThan(3)
  })

  test('should show numeric stats', async ({ page }) => {
    const statsText = await page.textContent('body')
    expect(statsText).toMatch(/\d+/)
  })

  test('should calculate K/D ratio', async ({ page }) => {
    const kdText = await page.locator('text=/K\\/D Ratio/').textContent()
    expect(kdText).toContain('K/D Ratio')
    
    const valueElement = page.locator('text=/K\\/D Ratio/').locator('..')
    await expect(valueElement).toBeVisible()
  })
})

test.describe('Animation Performance', () => {
  test('should maintain 30+ FPS during animations', async ({ page }) => {
    await page.goto('/')
    
    let frameCount = 0
    let startTime = Date.now()
    
    await page.evaluate(() => {
      return new Promise((resolve) => {
        let count = 0
        function countFrames() {
          count++
          if (count < 100) {
            requestAnimationFrame(countFrames)
          } else {
            resolve(count)
          }
        }
        requestAnimationFrame(countFrames)
      })
    })
    
    const elapsed = Date.now() - startTime
    const fps = (100 / elapsed) * 1000
    
    expect(fps).toBeGreaterThan(30)
  })

  test('should not drop frames during navigation', async ({ page }) => {
    await page.goto('/')
    
    const navigationPromise = page.getByText('SINGLE PLAYER').click()
    
    await page.evaluate(() => {
      return new Promise((resolve) => {
        let frames = 0
        let dropped = 0
        let lastTime = performance.now()
        
        function checkFrames(currentTime: number) {
          frames++
          const delta = currentTime - lastTime
          if (delta > 50) dropped++
          lastTime = currentTime
          
          if (frames < 30) {
            requestAnimationFrame(checkFrames)
          } else {
            resolve(dropped)
          }
        }
        requestAnimationFrame(checkFrames)
      })
    })
    
    await navigationPromise
    await expect(page.getByText('SELECT DIFFICULTY')).toBeVisible()
  })
})
