import { defineConfig, devices } from '@playwright/test'
import { existsSync } from 'node:fs'

const port = 34261
const baseURL = `http://127.0.0.1:${port}`
const chromiumExecutablePath = '/home/linuxuser/.cache/ms-playwright/chromium-1223/chrome-linux64/chrome'
const desktopDevice = devices['Desktop Chrome']
const mobileDevice = {
  viewport: { width: 412, height: 915 },
  screen: { width: 412, height: 915 },
  deviceScaleFactor: 2.625,
  isMobile: true,
  hasTouch: true,
  userAgent: 'Mozilla/5.0 (Linux; Android 14; Pixel 6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36',
}
const chromiumLaunchOptions = existsSync(chromiumExecutablePath)
  ? { executablePath: chromiumExecutablePath }
  : {}

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  
  use: {
    ...mobileDevice,
    baseURL,
    launchOptions: chromiumLaunchOptions,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'Mobile Chrome',
      use: {
        ...mobileDevice,
      },
    },
    {
      name: 'chromium',
      use: {
        ...desktopDevice,
      },
    },
  ],

  webServer: {
    command: `npm run build && python3 -m http.server ${port} --directory out --bind 127.0.0.1`,
    url: baseURL,
    reuseExistingServer: false,
    timeout: 180000,
  },
})
