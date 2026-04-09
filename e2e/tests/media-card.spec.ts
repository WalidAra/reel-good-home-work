import { test, expect } from "@playwright/test"
import { SearchPage } from "../pages/app.page"
import {
  mockSearchResults,
  mockAccountStates,
  mockToggleFavorite,
  mockToggleWatchlist,
  mockRateMedia,
} from "../mocks/tmdb"

const mockMovie = {
  id: 550,
  media_type: "movie" as const,
  title: "Fight Club",
  poster_path: "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
  release_date: "1999-10-15",
  vote_average: 8.4,
}

test.describe("Media Card Actions", () => {
  test.describe("Unauthenticated user", () => {
    test("all buttons open AuthDialog", async ({ page }) => {
      await mockSearchResults(page, [mockMovie])
      await mockAccountStates(page, {
        id: 550,
        favorite: false,
        watchlist: false,
        rated: false,
      })

      const searchPage = new SearchPage(page)
      await searchPage.goto()
      await searchPage.search("fight")
      await searchPage.waitForResults()

      await searchPage.favoriteButton(0).click()
      await expect(page.locator("[role='dialog']")).toBeVisible()

      await page
        .locator("[role='dialog']")
        .getByRole("button", { name: /close/i })
        .click()
      await page.waitForTimeout(300)

      await searchPage.watchLaterButton(0).click()
      await expect(page.locator("[role='dialog']")).toBeVisible()

      await page
        .locator("[role='dialog']")
        .getByRole("button", { name: /close/i })
        .click()
      await page.waitForTimeout(300)

      await searchPage.watchedButton(0).click()
      await expect(page.locator("[role='dialog']")).toBeVisible()
    })
  })

  test.describe("Authenticated user", () => {
    test.use({ storageState: "e2e/fixtures/.auth/session.json" })

    test("Favorite button toggles filled/outlined state optimistically", async ({
      page,
    }) => {
      await mockSearchResults(page, [mockMovie])
      await mockAccountStates(page, {
        id: 550,
        favorite: false,
        watchlist: false,
        rated: false,
      })
      await mockToggleFavorite(page, true)

      const searchPage = new SearchPage(page)
      await searchPage.goto()
      await searchPage.search("fight")
      await searchPage.waitForResults()

      const favoriteBtn = searchPage.favoriteButton(0)
      await favoriteBtn.click()

      const buttonClasses = await favoriteBtn.getAttribute("class")
      expect(buttonClasses).toContain("text-yellow-500")
    })

    test("Watchlist button toggles filled/outlined state optimistically", async ({
      page,
    }) => {
      await mockSearchResults(page, [mockMovie])
      await mockAccountStates(page, {
        id: 550,
        favorite: false,
        watchlist: false,
        rated: false,
      })
      await mockToggleWatchlist(page, true)

      const searchPage = new SearchPage(page)
      await searchPage.goto()
      await searchPage.search("fight")
      await searchPage.waitForResults()

      const watchlistBtn = searchPage.watchLaterButton(0)
      await watchlistBtn.click()

      const buttonClasses = await watchlistBtn.getAttribute("class")
      expect(buttonClasses).toContain("text-yellow-500")
    })

    test("Watched button toggles filled/outlined state optimistically", async ({
      page,
    }) => {
      await mockSearchResults(page, [mockMovie])
      await mockAccountStates(page, {
        id: 550,
        favorite: false,
        watchlist: false,
        rated: false,
      })
      await mockRateMedia(page, true)

      const searchPage = new SearchPage(page)
      await searchPage.goto()
      await searchPage.search("fight")
      await searchPage.waitForResults()

      const watchedBtn = searchPage.watchedButton(0)
      await watchedBtn.click()

      const buttonClasses = await watchedBtn.getAttribute("class")
      expect(buttonClasses).toContain("text-yellow-500")
    })

    test("Buttons show spinner while mutation is pending", async ({ page }) => {
      await mockSearchResults(page, [mockMovie])
      await mockAccountStates(page, {
        id: 550,
        favorite: false,
        watchlist: false,
        rated: false,
      })

      let requestCount = 0
      await page.route("**/favorite", (route) => {
        requestCount++
        if (requestCount === 1) {
          setTimeout(() => route.continue(), 1000)
        } else {
          route.continue()
        }
      })

      const searchPage = new SearchPage(page)
      await searchPage.goto()
      await searchPage.search("fight")
      await searchPage.waitForResults()

      await searchPage.favoriteButton(0).click()

      const spinner = searchPage.favoriteButton(0).locator("svg.animate-spin")
      await expect(spinner).toBeVisible()
    })

    test("On mutation error, button reverts to previous state", async ({
      page,
    }) => {
      await mockSearchResults(page, [mockMovie])
      await mockAccountStates(page, {
        id: 550,
        favorite: false,
        watchlist: false,
        rated: false,
      })
      await mockToggleFavorite(page, false)

      const searchPage = new SearchPage(page)
      await searchPage.goto()
      await searchPage.search("fight")
      await searchPage.waitForResults()

      const favoriteBtn = searchPage.favoriteButton(0)
      const buttonClassesBefore = await favoriteBtn.getAttribute("class")

      await favoriteBtn.click()
      await page.waitForTimeout(600)

      const buttonClassesAfter = await favoriteBtn.getAttribute("class")
      expect(buttonClassesBefore).toEqual(buttonClassesAfter)
    })
  })
})
