import { test, expect } from "@playwright/test"
import { LibraryPage } from "../pages/app.page"
import { mockGetRated, mockRateMedia, mockAccountStates } from "../mocks/tmdb"

const mockRatedMovie = {
  id: 550,
  media_type: "movie" as const,
  title: "Fight Club",
  poster_path: "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
  release_date: "1999-10-15",
  vote_average: 8.4,
}

const mockRatedTV = {
  id: 1396,
  media_type: "tv" as const,
  name: "Breaking Bad",
  poster_path: "/ggFHVNu6YYI5L9pCfOacjizRGt.jpg",
  first_air_date: "2008-01-20",
  vote_average: 8.9,
}

test.describe("Watched", () => {
  test.describe("Unauthenticated", () => {
    test("redirects to home", async ({ page }) => {
      await page.goto("/watched")
      await expect(page).toHaveURL("/")
    })
  })

  test.describe("Authenticated", () => {
    test.use({ storageState: "e2e/fixtures/.auth/session.json" })

    test("loads watched without redirect", async ({ page }) => {
      await mockGetRated(page, [mockRatedMovie], [mockRatedTV])
      const libraryPage = new LibraryPage(page)
      await libraryPage.goto("/watched")
      await libraryPage.waitForCards()
      await expect(libraryPage.mediaCards.first()).toBeVisible()
    })

    test("shows empty state when no rated items", async ({ page }) => {
      await mockGetRated(page, [], [])
      const libraryPage = new LibraryPage(page)
      await libraryPage.goto("/watched")
      await libraryPage.waitForCards()
      await expect(libraryPage.emptyState).toBeVisible()
    })

    test("Movies tab shows rated movies", async ({ page }) => {
      await mockGetRated(page, [mockRatedMovie], [mockRatedTV])
      const libraryPage = new LibraryPage(page)
      await libraryPage.goto("/watched")
      await libraryPage.waitForCards()
      await libraryPage.filterMovies.click()
      await expect(libraryPage.mediaCards.first()).toBeVisible()
    })

    test("TV tab shows rated TV shows", async ({ page }) => {
      await mockGetRated(page, [mockRatedMovie], [mockRatedTV])
      const libraryPage = new LibraryPage(page)
      await libraryPage.goto("/watched")
      await libraryPage.waitForCards()
      await libraryPage.filterTV.click()
      await expect(libraryPage.mediaCards.first()).toBeVisible()
    })

    test("removing rating from watched removes card", async ({ page }) => {
      await mockGetRated(page, [mockRatedMovie], [])
      await mockRateMedia(page, true)
      await mockAccountStates(page, {
        id: 550,
        favorite: false,
        watchlist: false,
        rated: false,
      })

      const libraryPage = new LibraryPage(page)
      await libraryPage.goto("/watched")
      await libraryPage.waitForCards()

      const cardCountBefore = await libraryPage.mediaCards.count()
      await libraryPage.watchedButton(0).click()
      await page.waitForTimeout(500)

      const cardCountAfter = await libraryPage.mediaCards.count()
      expect(cardCountAfter).toBe(cardCountBefore - 1)
    })
  })
})
