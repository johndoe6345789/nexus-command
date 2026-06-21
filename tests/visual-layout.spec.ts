import { test, expect } from '@playwright/test'
import { gotoPath } from './test-utils'

const viewports = [
  { label: 'mobile', width: 412, height: 915 },
  { label: 'desktop', width: 1920, height: 1080 },
]

test.describe('Main menu visual layout', () => {
  for (const viewport of viewports) {
    test(`should match the locked ${viewport.label} layout`, async ({ page }, testInfo) => {
      test.skip(testInfo.project.name !== 'chromium', 'Maintain one deterministic screenshot baseline.')

      await page.setViewportSize({ width: viewport.width, height: viewport.height })
      await gotoPath(page)
      await page.waitForLoadState('networkidle')
      await page.addStyleTag({
        content: `
          canvas,
          [aria-label^="Top bar version"],
          [aria-label^="Hero version"],
          [data-testid="version-footer"] {
            visibility: hidden !important;
          }
        `,
      })

      await expect(page).toHaveScreenshot(`main-menu-${viewport.label}.png`, {
        animations: 'disabled',
        maxDiffPixelRatio: 0.01,
      })
    })
  }
})
