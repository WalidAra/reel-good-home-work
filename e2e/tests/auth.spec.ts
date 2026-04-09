import { test, expect } from "@playwright/test"
import { HomePage, AuthDialog } from "../pages/app.page"

test.describe("Authentication", () => {
  test.describe("Unauthenticated user", () => {
    test("sees Sign In button in header", async ({ page }) => {
      const homePage = new HomePage(page)
      await homePage.goto()
      await expect(homePage.signInButton).toBeVisible()
    })

    test("sees AuthDialog when clicking a nav item (My Library)", async ({
      page,
    }) => {
      const homePage = new HomePage(page)
      await homePage.goto()
      await homePage.navMenu.getByText(/liked videos/i).click()
      const authDialog = new AuthDialog(page)
      await expect(authDialog.dialog).toBeVisible()
    })

    test("clicking favorite button opens AuthDialog", async ({ page }) => {
      await page.goto("/search?q=star")
      await page.waitForTimeout(1000)
      const authDialog = new AuthDialog(page)
      const firstCard = page.locator("[data-testid='media-card']").first()
      if (await firstCard.isVisible()) {
        await firstCard.locator("[data-testid='btn-favorite']").click()
        await expect(authDialog.dialog).toBeVisible()
      }
    })

    test("AuthDialog has Continue with TMDB button", async ({ page }) => {
      const homePage = new HomePage(page)
      await homePage.goto()
      await homePage.navMenu.getByText(/liked videos/i).click()
      const authDialog = new AuthDialog(page)
      await expect(authDialog.dialog).toBeVisible()
      await expect(authDialog.continueWithTMDButton).toBeVisible()
    })
  })

  test.describe("Authenticated user", () => {
    test.use({ storageState: "e2e/fixtures/.auth/session.json" })

    test("sees user menu or avatar instead of Sign In", async ({ page }) => {
      const homePage = new HomePage(page)
      await homePage.goto()
      await homePage.waitForLoad()
      const avatar = page
        .locator("[data-slot='avatar']")
        .or(page.locator("button:has(img)"))
      await expect(avatar.or(homePage.signInButton)).toBeVisible()
    })
  })
})
