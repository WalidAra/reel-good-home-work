# Scaling & Testing Strategy

This document outlines the testing strategy and scaling plan for ReelGood, designed to support growth from a small personal project to a platform serving thousands of users.

---

## Part 1: Testing Strategy

### Overview

ReelGood employs a three-tier testing pyramid:

1. **Unit Tests** — Fast, isolated tests for pure functions and state logic
2. **Integration Tests** — Test hook and component interactions with mocked APIs
3. **E2E Tests** — Full user journeys using Playwright

### Unit Tests (Vitest)

**What to test:**

- Utility functions (`normalizeMovie`, `normalizeTvShow`, `formatDate`)
- Zustand store actions (`authStore.setSession`, `authStore.logout`)
- Pure UI components (view layer of MediaCard)
- Error handling in `tmdbFetch`

**What NOT to test:**

- Implementation details of third-party libraries
- React Router behavior
- TanStack Query internals

**Tools:** Vitest + React Testing Library

**Example test cases:**

```typescript
// authStore.test.ts
import { authStore } from "./slice"

describe("authStore", () => {
  it("setSession stores session_id and account_id", () => {
    authStore.getState().setSession("session123", "account456")
    expect(authStore.getState().sessionId).toBe("session123")
    expect(authStore.getState().accountId).toBe("account456")
  })

  it("logout clears all state", () => {
    authStore.getState().setSession("session123", "account456")
    authStore.getState().logout()
    expect(authStore.getState().sessionId).toBe(null)
    expect(authStore.getState().accountId).toBe(null)
  })
})

// tmdbFetch.test.ts
import { tmdbFetch } from "../lib/tmdbFetch"

describe("tmdbFetch", () => {
  it("throws on non-ok response", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 401,
      json: () => Promise.resolve({ status_message: "Unauthorized" }),
    })

    await expect(tmdbFetch("/movie/1")).rejects.toThrow("Unauthorized")
  })

  it("injects session_id when provided", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ results: [] }),
    })

    authStore.getState().setSession("abc", "123")
    await tmdbFetch("/account")

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("session_id=abc"),
      expect.any(Object)
    )
  })
})
```

### Integration Tests (Vitest + MSW)

Use Mock Service Worker (MSW) to intercept TMDB API calls and test React Query hooks in isolation.

**What to test:**

- Hooks return correct data shape
- Query key invalidation triggers refetch
- Error states surface to UI
- Auth flow end-to-end

**Tools:** Vitest + React Testing Library + MSW

**Example test cases:**

```typescript
// useFavoriteMovies.test.tsx
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useFavoriteMovies } from '../../hooks/useFavoriteMovies'
import { server } from '../mocks/server'

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
})

const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)

test('useFavoriteMovies returns movies after load', async () => {
  const { result } = renderHook(() => useFavoriteMovies(), { wrapper })

  await waitFor(() => expect(result.current.isSuccess).toBe(true))
  expect(result.current.data).toHaveLength(2)
})

test('useFavoriteMovies handles error state', async () => {
  server.use(rest.get('/3/account/:accountId/favorite/movies', ...))
  const { result } = renderHook(() => useFavoriteMovies(), { wrapper })

  await waitFor(() => expect(result.current.isError).toBe(true))
})
```

**Container integration tests:**

- `FavoriteMoviesContainer` renders skeletons → loads cards → handles empty state
- `WatchLaterContainer` handles removal of items correctly
- Error boundaries catch failed API calls and display fallback UI

### E2E Tests (Playwright)

Cover full user journeys from unauthenticated state through all major flows.

**What to test:**

- Unauthenticated user sees auth prompts on protected routes
- Sign in flow: redirect → TMDB → callback → home
- Search → add to favorites → verify in /favorites
- Remove from watchlist → card disappears
- Sign out → redirected → library pages redirect to home

**Auth strategy:** Inject pre-generated `session_id` via Zustand store to bypass browser redirects in tests.

**API strategy:** Use MSW in E2E for speed and reliability; real TMDB calls only for auth integration verification.

**Run in CI:** GitHub Actions on every PR, testing Chromium + Mobile Chrome viewports.

```typescript
// auth.spec.ts
test("complete sign in flow", async ({ page }) => {
  await page.goto("/")
  await page.click("text=Sign In")
  await page.waitForURL(/themoviedb.org/)

  // In real tests, use pre-generated session via setup
  await page.goto("/auth/callback?request_token=test&approved=true")

  await expect(page).toHaveURL("/home")
  await expect(page.locator("text=Your Library")).toBeVisible()
})

// favorites.spec.ts
test("add movie to favorites", async ({ page }) => {
  await page.goto("/search")
  await page.fill("input[name=q]", "Inception")
  await page.waitForSelector("[data-testid=media-card]")

  await page.click("[data-testid=media-card] first button")
  await page.click("text=Add to Favorites")

  await page.goto("/favorites")
  await expect(page.locator("text=Inception")).toBeVisible()
})
```

### CI Pipeline

```yaml
name: CI

on: [pull_request]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck

  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm run test:unit

  integration-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm run test:integration

  e2e-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm run test:e2e
        env:
          TMDB_TEST_SESSION_ID: ${{ secrets.TMDB_TEST_SESSION_ID }}
          TMDB_TEST_ACCOUNT_ID: ${{ secrets.TMDB_TEST_ACCOUNT_ID }}
      - uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: playwright-report
          path: playwright-report/
```

### Coverage Targets

| Layer       | Target                     |
| ----------- | -------------------------- |
| Unit        | 80%+ for utils and store   |
| Integration | All hooks and containers   |
| E2E         | All critical user journeys |

---

## Part 2: Scaling Plan

### Current Architecture Limitations

- Session stored in-memory only — lost on refresh (by design for v1)
- All auth state in a single Zustand store
- No backend — fully client-side, TMDB is the only data source
- Single Vite bundle, no code splitting

### Phase 1: Performance (0 → 10k users)

**Caching with TanStack Query:**

Configure `staleTime` per endpoint based on data volatility:

| Endpoint            | staleTime | Rationale                              |
| ------------------- | --------- | -------------------------------------- |
| `/search/multi`     | 5 min     | Search results change infrequently     |
| Account states      | 30 sec    | User actions change these frequently   |
| Favorites/Watchlist | 2 min     | Changes on user action, but not urgent |
| Movie details       | 10 min    | Rarely changes                         |
| Trending            | 15 min    | Updates daily                          |

Use `queryClient.prefetchQuery` on link hover for likely navigations (e.g., hover on "Favorites" nav item prefetches favorites data).

**Code splitting:**

- Lazy load all page components with `React.lazy` + `Suspense`
- Split library pages (`/favorites`, `/watch-later`, `/watched`) into separate chunks
- Dynamic import `AuthDialog` — only needed when unauthenticated

```tsx
const FavoritesPage = lazy(() => import("./pages/FavoritesPage"))
const AuthDialog = lazy(() => import("./components/AuthDialog"))
```

**Image optimization:**

- Use TMDB's responsive image sizes: `w200` for cards, `w500` for detail views, `original` for fullscreen
- Use `loading="lazy"` on all poster images
- Show blur placeholder while images load

### Phase 2: Reliability (10k → 100k users)

**Introduce a BFF (Backend for Frontend):**

```
┌─────────┐     ┌─────────┐     ┌─────────┐
│ Client  │────▶│   BFF   │────▶│  TMDB   │
└─────────┘     └─────────┘     └─────────┘
                │         │
                ▼         ▼
            ┌───────┐ ┌───────┐
            │ Redis │ │  SQL  │
            │ Cache │ │  DB   │
            └───────┘ └───────┘
```

Benefits:

- Hides API key from client entirely
- Enables server-side rate limit handling
- Enables response caching at server layer (Redis)

**Tech stack for BFF:**

- Node.js + Hono or Fastify (lightweight, edge-compatible)
- Redis for TMDB response caching (TTL per endpoint)
- PostgreSQL for user custom data

**Add proper session management:**

- Store `session_id` in HttpOnly cookie (not in-memory)
- Session persists across refreshes
- Implement session refresh logic

**Add database layer for custom features:**

- Custom categories beyond favorites/watchlist/rated
- Personal notes on movies
- Watch history with timestamps

### Phase 3: Infrastructure (100k+ users)

**CDN + Edge deployment:**

- Deploy frontend to Vercel or Cloudflare Pages (global CDN)
- Deploy BFF to edge workers (Cloudflare Workers or Vercel Edge)
- Cache TMDB image proxy at CDN layer

**Database scaling:**

- Read replicas for library queries
- Connection pooling (PgBouncer)
- Index on `(user_id, media_type, media_id)` for account state lookups

**Rate limiting:**

- TMDB enforces ~40 requests per 10 seconds per IP
- At scale: route all TMDB calls through BFF, share one API key pool
- Implement request queuing + retry with exponential backoff
- Cache aggressively: popular search terms, trending lists, movie details

**Observability:**

- Error tracking: Sentry (frontend + BFF)
- Performance monitoring: Web Vitals (LCP, CLS, FID)
- API latency tracking per TMDB endpoint
- Alerting on error rate spikes

**Auth at scale:**

- Move from TMDB session_id to your own JWT issued by BFF
- TMDB session used server-side only
- Your JWT stored in HttpOnly cookie, short-lived (15 min) + refresh token
- Decouples your auth from TMDB's session system entirely

### Summary Table

| Scale    | Key Changes                                                         |
| -------- | ------------------------------------------------------------------- |
| 0–10k    | TanStack Query staleTime tuning, code splitting, image optimization |
| 10k–100k | BFF proxy, Redis cache, HttpOnly session, PostgreSQL                |
| 100k+    | Edge deployment, CDN, JWT auth, observability, rate limit pooling   |

---

## Future Considerations

- Add rate limiting indicators in UI when approaching TMDB limits
- Implement optimistic UI rollbacks on failed mutations
- Consider service worker for offline support on library pages
- Add user preference for default sort order and view (grid/list)
