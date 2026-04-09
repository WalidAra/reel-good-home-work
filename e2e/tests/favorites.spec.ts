import { test, expect } from "@playwright/test"
import { LibraryPage } from "../pages/app.page"
import {
  mockGetFavorites,
  mockToggleFavorite,
  mockAccountStates,
  clearAllMocks,
} from "../mocks/tmdb"

const mockFavoriteMovie = {
  id: 550,
  media_type: "movie" as const,
  title: "Fight Club",
  poster_path: "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
  release_date: "1999-10-15",
  vote_average: 8.4,
}

const mockFavoriteTV = {
  id: 1396,
  media_type: "tv" as const,
  name: "Breaking Bad",
  poster_path: "/ggFHVNu6YYI5L9pCfOacjizRGt.jpg",
  first_air_date: "2008-01-20",
  vote_average: 8.9,
}

test.describe("Favorites", () => {
  test.describe("Unauthenticated", () => {
    test("redirects to home", async ({ page }) => {
      await page.goto("/liked-videos")
      await expect(page).toHaveURL("/")
    })
  })

  test.describe("Authenticated", () => {
    test.use({ storageState: "e2e/fixtures/.auth/session.json" })

    test("loads favorites without redirect", async ({ page }) => {
      await mockGetFavorites(page, [mockFavoriteMovie], [mockFavoriteTV])
      const libraryPage = new LibraryPage(page)
      await libraryPage.goto("/liked-videos")
      await libraryPage.waitForCards()
      await expect(libraryPage.mediaCards.first()).toBeVisible()
    })

    test("shows empty state when no favorites", async ({ page }) => {
      await mockGetFavorites(page, [], [])
      const libraryPage = new LibraryPage(page)
      await libraryPage.goto("/liked-videos")
      await libraryPage.waitForCards()
      await expect(libraryPage.emptyState).toBeVisible()
    })

    test("Movies tab shows favorite movies", async ({ page }) => {
      await mockGetFavorites(page, [mockFavoriteMovie], [mockFavoriteTV])
      const libraryPage = new LibraryPage(page)
      await libraryPage.goto("/liked-videos")
      await libraryPage.waitForCards()
      await libraryPage.filterMovies.click()
      await expect(libraryPage.mediaCards.first()).toBeVisible()
    })

    test("TV tab shows favorite TV shows", async ({ page }) => {
      await mockGetFavorites(page, [mockFavoriteMovie], [mockFavoriteTV])
      const libraryPage = new LibraryPage(page)
      await libraryPage.goto("/liked-videos")
      await libraryPage.waitForCards()
      await libraryPage.filterTV.click()
      await expect(libraryPage.mediaCards.first()).toBeVisible()
    })

    test("removing a favorite from library removes card", async ({ page }) => {
      await mockGetFavorites(page, [mockFavoriteMovie], [])
      await mockToggleFavorite(page, true)
      await mockAccountStates(page, {
        id: 550,
        favorite: false,
        watchlist: false,
        rated: false,
      })

      const libraryPage = new LibraryPage(page)
      await libraryPage.goto("/liked-videos")
      await libraryPage.waitForCards()

      const cardCountBefore = await libraryPage.mediaCards.count()
      await libraryPage.favoriteButton(0).click()
      await page.waitForTimeout(500)

      const cardCountAfter = await libraryPage.mediaCards.count()
      expect(cardCountAfter).toBe(cardCountBefore - 1)
    })
  })
})
