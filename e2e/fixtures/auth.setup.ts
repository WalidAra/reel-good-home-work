import { test as setup, expect } from "@playwright/test"
import { loadEnv } from "vite"

setup("authenticate", async ({ page }) => {
  const env = await loadEnv("test")
  const sessionId = env.VITE_TMDB_TEST_SESSION_ID || env.TMDB_TEST_SESSION_ID
  const accountId = env.VITE_TMDB_TEST_ACCOUNT_ID || env.TMDB_TEST_ACCOUNT_ID

  if (!sessionId || !accountId) {
    console.warn(
      "Skipping auth setup: TMDB_TEST_SESSION_ID or TMDB_TEST_ACCOUNT_ID not set in .env.test"
    )
    return
  }

  await page.goto("/")

  await page.evaluate(
    ({ sessionId, accountId }) => {
      if (window.__authStore) {
        window.__authStore.getState().setSession(sessionId)
        window.__authStore.getState().setAccountId(Number(accountId))
        window.__authStore.getState().setIsReady(true)
      }
    },
    { sessionId, accountId }
  )

  await page.context().storageState({ path: "e2e/fixtures/.auth/session.json" })
})

setup("check app loads", async ({ page }) => {
  await page.goto("/")
  await expect(page.locator("body")).toBeVisible()
})
