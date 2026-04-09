import { type Page, type Locator, expect } from "@playwright/test"

export class SearchPage {
  readonly page: Page
  readonly searchInput: Locator
  readonly filterAll: Locator
  readonly filterMovies: Locator
  readonly filterTV: Locator
  readonly mediaCards: Locator
  readonly skeletons: Locator
  readonly emptyState: Locator

  constructor(page: Page) {
    this.page = page

    this.searchInput = page.getByPlaceholder(/search/i)
    this.filterAll = page.getByRole("button", { name: /all/i })
    this.filterMovies = page.getByRole("button", { name: /movies/i })
    this.filterTV = page.getByRole("button", { name: /tv shows/i })
    this.mediaCards = page.locator("[data-testid='media-card']")
    this.skeletons = page.locator("[data-testid='media-card-skeleton']")
    this.emptyState = page.locator("[data-testid='empty-state']")
  }

  favoriteButton = (cardIndex = 0) =>
    this.mediaCards.nth(cardIndex).locator("[data-testid='btn-favorite']")
  watchLaterButton = (cardIndex = 0) =>
    this.mediaCards.nth(cardIndex).locator("[data-testid='btn-watchlist']")
  watchedButton = (cardIndex = 0) =>
    this.mediaCards.nth(cardIndex).locator("[data-testid='btn-watched']")

  async search(query: string) {
    await this.searchInput.fill(query)
    await this.page.waitForTimeout(500)
  }

  async waitForResults() {
    await this.skeletons.first().waitFor({ state: "hidden", timeout: 10000 })
    await this.mediaCards.first().waitFor({ timeout: 10000 })
  }

  async goto() {
    await this.page.goto("/search")
  }
}

export class LibraryPage {
  readonly page: Page
  readonly filterAll: Locator
  readonly filterMovies: Locator
  readonly filterTV: Locator
  readonly mediaCards: Locator
  readonly emptyState: Locator
  readonly skeletons: Locator

  constructor(page: Page) {
    this.page = page

    this.filterAll = page.getByRole("button", { name: /all/i })
    this.filterMovies = page.getByRole("button", { name: /movies/i })
    this.filterTV = page.getByRole("button", { name: /tv shows/i })
    this.mediaCards = page.locator("[data-testid='media-card']")
    this.emptyState = page.locator("[data-testid='empty-state']")
    this.skeletons = page.locator("[data-testid='media-card-skeleton']")
  }

  favoriteButton = (cardIndex = 0) =>
    this.mediaCards.nth(cardIndex).locator("[data-testid='btn-favorite']")
  watchLaterButton = (cardIndex = 0) =>
    this.mediaCards.nth(cardIndex).locator("[data-testid='btn-watchlist']")
  watchedButton = (cardIndex = 0) =>
    this.mediaCards.nth(cardIndex).locator("[data-testid='btn-watched']")

  async goto(path: "/liked-videos" | "/watch-later" | "/watched") {
    await this.page.goto(path)
    await this.page.waitForLoadState("networkidle")
    await this.skeletons
      .first()
      .waitFor({ state: "hidden", timeout: 10000 })
      .catch(() => {})
  }

  async waitForCards() {
    await this.mediaCards.first().waitFor({ timeout: 10000 })
  }
}

export class HomePage {
  readonly page: Page
  readonly signInButton: Locator
  readonly navMenu: Locator

  constructor(page: Page) {
    this.page = page

    this.signInButton = page.getByRole("button", { name: /sign in/i })
    this.navMenu = page.locator("nav")
  }

  async goto() {
    await this.page.goto("/")
  }

  async waitForLoad() {
    await this.page.waitForLoadState("networkidle")
  }
}

export class AuthDialog {
  readonly dialog: Locator
  readonly continueWithTMDButton: Locator

  constructor(page: Page) {
    this.dialog = page.locator("[role='dialog']")
    this.continueWithTMDButton = this.dialog.getByRole("button", {
      name: /tmdb/i,
    })
  }

  async isVisible() {
    return this.dialog.isVisible()
  }

  async close() {
    const closeButton = this.dialog.getByRole("button", { name: /close/i })
    if (await closeButton.isVisible()) {
      await closeButton.click()
    }
  }
}
