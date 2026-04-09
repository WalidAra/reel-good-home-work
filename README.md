# ReelGood

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-5-FF4154?logo=react-query&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-5-764ABC?logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwind-css&logoColor=white)
![TMDB](https://img.shields.io/badge/TMDB_API-3-01B4E4?logoColor=white)

A personal movies and TV show tracker that helps you keep track of what you want to watch and what you've seen.

## Prerequisites

- Bun.js (recommended) or Node.js 18+
  - Bun version 1.0+ (install from https://bun.sh/)
- A TMDB account and API key — get one at https://www.themoviedb.org/settings/api

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/WalidAra/reel-good-home-work.git
cd reel-good-home-work
```

### 2. Install dependencies

```bash
bun install
```

### 3. Set up environment variables

Create a `.env` file in the root directory:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key_here
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
```

To get your API key:

1. Go to [themoviedb.org](https://www.themoviedb.org/)
2. Sign in to your account
3. Navigate to Settings → API
4. Create or copy your API key

### 4. Run the development server

```bash
bun run dev
```

The app will be available at http://localhost:5173

### 5. Build for production

```bash
bun run build
bun run preview
```

## Authentication

ReelGood uses TMDB's user authentication system. On your first visit:

1. Click "Sign In" or "Continue with TMDB"
2. You'll be redirected to themoviedb.org to approve access
3. After approving, you'll be automatically redirected back
4. Your session is stored in memory — signing out or refreshing the page will require re-authentication

## Running Tests

```bash
# Install Playwright browsers (first time only)
bunx --bun playwright install

# Set up test environment variables
cp .env.test.example .env.test
# Fill in TMDB_TEST_SESSION_ID and TMDB_TEST_ACCOUNT_ID

# Run all E2E tests
bun run test:e2e

# Run with UI mode
bun run test:e2e -- --ui

# Run specific suite
bun run test:e2e -- e2e/tests/search.spec.ts
```

## Project Structure

```
src/
├── api/              # Raw TMDB API fetch calls
├── components/       # Shared UI components (MediaCard, HOCs)
├── contexts/         # React contexts (AuthContext)
├── core/             # Feature modules organized by route
│   ├── auth/         # Authentication flow (login, callback)
│   └── home/         # Main app (pages, components, hooks)
├── hooks/            # Custom hooks (useAuth, useAccountMedia, useAccountStates)
├── lib/              # tmdbFetch wrapper and utilities
├── providers/        # AuthProvider, TanStackProvider
├── store/            # Zustand auth store
└── types/            # TypeScript types and interfaces

e2e/
├── fixtures/         # Auth setup and test fixtures
├── mocks/            # TMDB API route mocks
├── pages/            # Playwright Page Object Models
└── tests/            # Playwright test suites
```

## Environment Variables

| Variable             | Required | Description                                      |
| -------------------- | -------- | ------------------------------------------------ |
| `VITE_TMDB_API_KEY`  | Yes      | Your TMDB API read access token                  |
| `VITE_TMDB_BASE_URL` | Yes      | TMDB API base URL (https://api.themoviedb.org/3) |

## Available Scripts

| Command             | Description                  |
| ------------------- | ---------------------------- |
| `npm run dev`       | Start development server     |
| `npm run build`     | Build for production         |
| `npm run preview`   | Preview production build     |
| `npm run lint`      | Run ESLint                   |
| `npm run typecheck` | Run TypeScript type checking |
| `npm run test:e2e`  | Run Playwright E2E tests     |
