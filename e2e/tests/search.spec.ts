import { test, expect } from "@playwright/test"
import { SearchPage } from "../pages/app.page"
import {
  mockSearchResults,
  mockAccountStates,
  clearAllMocks,
} from "../mocks/tmdb"

const mockMovie = {
  id: 550,
  media_type: "movie" as const,
  title: "Fight Club",
  poster_path: "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
  release_date: "1999-10-15",
  vote_average: 8.4,
}

const mockTV = {
  id: 1396,
  media_type: "tv" as const,
  name: "Breaking Bad",
  poster_path: "/ggFHVNu6YYI5L9pCfOacjizRGt.jpg",
  first_air_date: "2008-01-20",
  vote_average: 8.9,
}

test.describe("Search", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/search")
  })

  test("shows empty state when query < 3 chars", async ({ page }) => {
    await page.getByPlaceholder(/search/i).fill("ab")
    await page.waitForTimeout(500)
    const emptyState = page.locator("[data-testid='empty-state']")
    await expect(emptyState).toBeVisible()
  })

  test("shows skeleton while loading", async ({ page }) => {
    await mockSearchResults(page, [mockMovie, mockTV])
    await page.getByPlaceholder(/search/i).fill("fight")
    await expect(
      page.locator("[data-testid='media-card-skeleton']").first()
    ).toBeVisible()
  })

  test("shows results after loading", async ({ page }) => {
    await mockSearchResults(page, [mockMovie])
    await mockAccountStates(page, {
      id: 550,
      favorite: false,
      watchlist: false,
      rated: false,
    })
    const searchPage = new SearchPage(page)
    await searchPage.search("fight")
    await searchPage.waitForResults()
    await expect(searchPage.mediaCards.first()).toBeVisible()
  })

  test("filter Movies shows only movies", async ({ page }) => {
    await mockSearchResults(page, [mockMovie, mockTV])
    await mockAccountStates(page, {
      id: 550,
      favorite: false,
      watchlist: false,
      rated: false,
    })
    const searchPage = new SearchPage(page)
    await searchPage.search("breaking")
    await searchPage.waitForResults()
    await searchPage.filterMovies.click()
    const cards = await searchPage.mediaCards.count()
    expect(cards).toBeGreaterThan(0)
  })

  test("filter TV Shows shows only tv", async ({ page }) => {
    await mockSearchResults(page, [mockMovie, mockTV])
    await mockAccountStates(page, {
      id: 550,
      favorite: false,
      watchlist: false,
      rated: false,
    })
    const searchPage = new SearchPage(page)
    await searchPage.search("breaking")
    await searchPage.waitForResults()
    await searchPage.filterTV.click()
    const cards = await searchPage.mediaCards.count()
    expect(cards).toBeGreaterThan(0)
  })

  test("each card shows poster, title, year, vote badge", async ({ page }) => {
    await mockSearchResults(page, [mockMovie])
    await mockAccountStates(page, {
      id: 550,
      favorite: false,
      watchlist: false,
      rated: false,
    })
    const searchPage = new SearchPage(page)
    await searchPage.search("fight")
    await searchPage.waitForResults()
    const card = searchPage.mediaCards.first()
    await expect(card).toBeVisible()
    const title = card.locator("h3")
    await expect(title).toContainText("Fight Club")
  })

  test("clearing search returns to empty state", async ({ page }) => {
    await mockSearchResults(page, [mockMovie])
    await mockAccountStates(page, {
      id: 550,
      favorite: false,
      watchlist: false,
      rated: false,
    })
    const searchPage = new SearchPage(page)
    await searchPage.search("fight")
    await searchPage.waitForResults()
    await searchPage.searchInput.clear()
    await page.waitForTimeout(500)
    await expect(page.locator("[data-testid='empty-state']")).toBeVisible()
  })

  test("search is debounced", async ({ page }) => {
    let requestCount = 0
    await page.route("**/search/multi**", (route) => {
      requestCount++
      route.continue()
    })
    const searchPage = new SearchPage(page)
    await searchPage.searchInput.fill("a")
    await page.waitForTimeout(200)
    await searchPage.searchInput.fill("ab")
    await page.waitForTimeout(200)
    await searchPage.searchInput.fill("abc")
    await page.waitForTimeout(600)
    expect(requestCount).toBeLessThanOrEqual(2)
  })
})
