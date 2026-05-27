# Bangalore PG Finder

Startup-style MVP for discovering PG accommodations across Bengaluru.

## Stack
- Next.js App Router + TypeScript
- Tailwind CSS + Framer Motion ready
- Local JSON mock data (120 listings)
- localStorage favorites + inquiry persistence
- SEO routes + sitemap

## Setup
```bash
cd bangalore-pg-finder
npm install
cp .env.example .env.local
npm run dev
```

## Environment
`NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key`

## Deploy on Vercel
1. Push repo to GitHub.
2. Import project in Vercel.
3. Set env variable.
4. Deploy.

## Scaling later
- Replace JSON with PostgreSQL/MongoDB.
- Add Next.js route handlers.
- Add auth with Clerk/Auth.js.
