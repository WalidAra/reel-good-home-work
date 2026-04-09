import { type Page } from "@playwright/test"

export interface MockMediaItem {
  id: number
  media_type: "movie" | "tv"
  title?: string
  name?: string
  poster_path: string | null
  release_date?: string
  first_air_date?: string
  vote_average: number
}

export interface MockAccountStates {
  id: number
  favorite: boolean
  watchlist: boolean
  rated: { value: number } | false
}

export async function mockSearchResults(page: Page, results: MockMediaItem[]) {
  await page.route("**/search/multi**", (route) => {
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ results, total_pages: 1, page: 1 }),
    })
  })
}

export async function mockAccountStates(page: Page, state: MockAccountStates) {
  await page.route("**/account_states**", (route) => {
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(state),
    })
  })
}

export async function mockToggleFavorite(page: Page, success = true) {
  await page.route("**/favorite**", (route) => {
    route.fulfill({
      status: success ? 200 : 500,
      contentType: "application/json",
      body: JSON.stringify(
        success
          ? { success: true, status_code: 12 }
          : { success: false, status_code: 500 }
      ),
    })
  })
}

export async function mockToggleWatchlist(page: Page, success = true) {
  await page.route("**/watchlist**", (route) => {
    route.fulfill({
      status: success ? 200 : 500,
      contentType: "application/json",
      body: JSON.stringify(
        success
          ? { success: true, status_code: 12 }
          : { success: false, status_code: 500 }
      ),
    })
  })
}

export async function mockRateMedia(page: Page, success = true) {
  await page.route("**/rating**", (route) => {
    route.fulfill({
      status: success ? 200 : 500,
      contentType: "application/json",
      body: JSON.stringify(
        success
          ? { success: true, status_code: 1 }
          : { success: false, status_code: 500 }
      ),
    })
  })
}

export async function mockGetFavorites(
  page: Page,
  movies: MockMediaItem[],
  tvShows: MockMediaItem[] = []
) {
  await page.route("**/favorite/movies**", (route) => {
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ results: movies, total_pages: 1, page: 1 }),
    })
  })

  await page.route("**/favorite/tv**", (route) => {
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ results: tvShows, total_pages: 1, page: 1 }),
    })
  })
}

export async function mockGetWatchlist(
  page: Page,
  movies: MockMediaItem[],
  tvShows: MockMediaItem[] = []
) {
  await page.route("**/watchlist/movies**", (route) => {
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ results: movies, total_pages: 1, page: 1 }),
    })
  })

  await page.route("**/watchlist/tv**", (route) => {
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ results: tvShows, total_pages: 1, page: 1 }),
    })
  })
}

export async function mockGetRated(
  page: Page,
  movies: MockMediaItem[],
  tvShows: MockMediaItem[] = []
) {
  await page.route("**/rated/movies**", (route) => {
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ results: movies, total_pages: 1, page: 1 }),
    })
  })

  await page.route("**/rated/tv**", (route) => {
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ results: tvShows, total_pages: 1, page: 1 }),
    })
  })
}

export function clearAllMocks(page: Page) {
  page.unrouteAll()
}
