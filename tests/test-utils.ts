import type { Page } from '@playwright/test'

const appBaseURL = process.env.PLAYWRIGHT_TEST_BASE_URL ?? 'http://127.0.0.1:34261'

export async function gotoPath(page: Page, path = '/') {
  await page.goto(new URL(path, appBaseURL).toString())
}
