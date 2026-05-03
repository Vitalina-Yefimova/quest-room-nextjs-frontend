# Quest Room — Next.js frontend

Next.js + TypeScript app for escape-room quests: catalog, quest detail, booking, profile, phone / email auth, favorites and orders, contacts with Google Maps. The App Router and **Server Actions** call the REST API on the server (the browser does not embed `API_BASE_URL`; only `NEXT_PUBLIC_*` values are exposed client-side).

**Source:** [github.com/Vitalina-Yefimova/quest-room-nextjs-frontend](https://github.com/Vitalina-Yefimova/quest-room-nextjs-frontend) · **Live demo:** [quest-room-nextjs-frontend.vercel.app](https://quest-room-nextjs-frontend.vercel.app/)

[![Next.js](https://img.shields.io/badge/Next.js-15-000000?logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

## Features

- Quest catalog and quest pages
- Auth, password reset, email verification (URLs built from `NEXT_PUBLIC_APP_URL`)
- Profile: favorites, orders, profile / password
- Contacts + map (`@vis.gl/react-google-maps`)

## Stack

Next.js 15 (App Router) · React 19 · TypeScript 5 · Tailwind CSS 4 · React Hook Form + Zod · Zustand · Server Actions + `fetch`

---

## Requirements

- Node.js 20+
- npm

## Setup

```bash
npm install
```

Copy [.env.example](.env.example) to **`.env.local`** (or `.env`). It matches the live stack: **`API_BASE_URL`** → [`https://quest-room-api-git-master-vitalina-yefimova.vercel.app`](https://quest-room-api-git-master-vitalina-yefimova.vercel.app), **`NEXT_PUBLIC_APP_URL`** → [`https://quest-room-nextjs-frontend.vercel.app`](https://quest-room-nextjs-frontend.vercel.app). Set **`NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`** if you use the contacts map. For a fully local run, change those two to your local API and app URLs.

## Environment variables

| Variable                          | Where it runs                       | Description                                                                                                                                                                                                                  |
| --------------------------------- | ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `API_BASE_URL`                    | Server (Server Actions)             | REST API base URL **without** a trailing `/`. Production: `https://quest-room-api-git-master-vitalina-yefimova.vercel.app`. Use `API_BASE_URL` (not `NEXT_PUBLIC_*`) so the API host is not shipped to the browser bundle.   |
| `NEXT_PUBLIC_APP_URL`             | Server (links in emails, redirects) | Public origin of **this** app, no trailing slash. Production: `https://quest-room-nextjs-frontend.vercel.app`.                                                                                                                |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | Client                              | Optional: Google Maps JavaScript API key for the contacts page.                                                                                                                                                              |

On **Vercel** → **Settings → Environment Variables**, set `API_BASE_URL`, `NEXT_PUBLIC_APP_URL`, and optionally `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` for **Production** (and Preview if you use preview deployments).

## Scripts

| Command         | Purpose                                          |
| --------------- | ------------------------------------------------ |
| `npm run dev`   | Development (Turbopack; port in [`package.json`](package.json)). |
| `npm run build` | Production build.                                |
| `npm run start` | Run the production server locally after `build`. |
| `npm run lint`  | ESLint.                                          |

You need at least `API_BASE_URL` and `NEXT_PUBLIC_APP_URL` for `build` / `start` (or use `.env.local`).

---

## Related repos

| Role                               | Repository                                                                                                                                                                                                                                      |
| ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **API (NestJS)**                   | [Vitalina-Yefimova/quest-room-api](https://github.com/Vitalina-Yefimova/quest-room-api) · Live: [quest-room-api-git-master-vitalina-yefimova.vercel.app](https://quest-room-api-git-master-vitalina-yefimova.vercel.app)                        |
| **React SPA (same product, Vite)** | [Vitalina-Yefimova/quest-room-react-frontend](https://github.com/Vitalina-Yefimova/quest-room-react-frontend) · Live: [quest-room-react-frontend-vitalina-yefimova.vercel.app](https://quest-room-react-frontend-vitalina-yefimova.vercel.app/) |

**`API_BASE_URL`** and **`NEXT_PUBLIC_APP_URL`** must match the API and the URL people use to open this app (the values in [`.env.example`](.env.example) for the current Vercel deploy) so email verification and password-reset links work.

If you use the shared Nest API, ensure its **`FRONTEND_URL`** includes this Next app’s origin when you rely on browser cookies / CORS with credentials (see the [API README](https://github.com/Vitalina-Yefimova/quest-room-api)). Server Actions call the API from the Next server, so typical data `fetch` calls do not hit browser CORS; email links and any future client-side API usage still need a consistent public URL and backend CORS policy.

---

## API integration

- Backend calls live in [`src/actions/`](src/actions/): quests, auth, user, orders, favorites.
- HTTP: Server Actions use `fetch` with `API_BASE_URL` from [`src/utils/config.ts`](src/utils/config.ts) (for example `${API_BASE_URL}/quests`).
- Session: JWT in an httpOnly cookie `access-token` — [`src/utils/auth.ts`](src/utils/auth.ts), [`src/utils/tokens.ts`](src/utils/tokens.ts).
- Quest images from S3: [`next.config.ts`](next.config.ts) `images.remotePatterns`.

The API should expose the same routes the actions use (e.g. `/quests`, `/auth/sign-in`, `/orders`, …).

## Project layout

- `src/app/` — App Router routes
- `src/components/` — UI
- `src/actions/` — Server actions and API integration
- `src/utils/` — Config, types, schemas

## License & `private`

[`package.json`](package.json) may set `"private": true` — not intended for `npm publish`. Treat as personal / portfolio unless you add a license file.
