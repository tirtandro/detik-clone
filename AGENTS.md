<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

## Next.js 16 Breaking Changes (applied in this project)
- `middleware.ts` → `proxy.ts` (export `proxy()` function instead of `middleware()`)
- `params` and `searchParams` are Promises — must `await` them
- `cookies()` and `headers()` from `next/headers` must be awaited
- Turbopack is default build tool (no webpack unless `--webpack` flag)
- `next lint` removed, use eslint directly
<!-- END:nextjs-agent-rules -->

## Prisma 7 Breaking Changes (applied)
- `datasource.url` removed from `schema.prisma` — moved to `prisma.config.ts`
- PrismaClient requires `adapter` in constructor (use `@prisma/adapter-pg`)
- `prisma generate` reads config from `prisma.config.ts`
- Set `DATABASE_URL` env var before running `prisma generate`/`prisma migrate`

## Admin Dashboard
- Route group: `/admin` (separate from main site under `(main)`)
- Auth: NextAuth v5 (Credentials provider), JWT strategy
- Protects `/admin/*` via `proxy.ts` middleware
- Login: `/admin/login`
- Super admin seed: `admin@ideguru.id` / `admin123`
- Pages: Dashboard, Konten (CRUD + TipTap), Kanal, Tag, Media, Pengaturan, Pengguna, Newsletter, Analitik, Unduhan
- API routes: `/api/admin/konten`, `/api/admin/settings`, `/api/admin/upload`

## Required env vars (`.env`)
- `DATABASE_URL` — PostgreSQL connection string
- `AUTH_SECRET` — NextAuth secret (generate via `npx auth secret`)
- `R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET`, `R2_PUBLIC_URL` — Cloudflare R2
- `NEXT_PUBLIC_GA_ID` — Google Analytics (optional)
