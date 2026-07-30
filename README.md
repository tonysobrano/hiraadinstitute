# Hiraad Next.js + Sanity

This project is a fully coded Next.js App Router implementation of the Hiraad website design.

## Architecture

- Reusable UI components in `/components/site`
- Page-specific compositions in `/components/pages`
- Route files in `/app`
- Sanity CMS integration in `/lib/sanity`
- Sanity Studio schema source in `/sanity/schemaTypes`

## Routes

- `/`
- `/about`
- `/research`
- `/journals`
- `/journals/[slug]`
- `/news-events`
- `/events/[slug]`
- `/contact`
- `/news/[slug]`

Legacy `/publications`, `/events`, and `/news-media` URLs redirect to the current journal or news-and-events sections.

## CMS model

Sanity uses `pageContent` documents with:

- `slug` (page identifier)
- `textOverrides[]` with `nodeName` (key) and `value`
- `imageOverrides[]` with `nodeName` (key) and `url`

Example keys:

- `home.hero.title`
- `home.hero.image`
- `shared.cta.title`

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create env file:

```bash
cp .env.example .env.local
```

3. Run app:

```bash
npm run dev
```

4. Run standalone Studio:

```bash
cd studio
npm install
npm run dev
```

## Seed CMS documents

Creates one `pageContent` doc per page slug:

```bash
npm run sanity:seed
```

## Import the 3 homepage news posts into Sanity

This script scrapes the live homepage, resolves the 3 featured post slugs via the WordPress API, uploads featured images to Sanity assets, and upserts `news` documents:

```bash
npm run sanity:import-home-news
```

## Import Facebook events into Sanity

The event import uses the curated records in `content/hiraad-facebook-events.json` and the optimized event images in `public/images/events/facebook`:

```bash
npm run sanity:import-facebook-events
```

## Environment variables

- `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, and `NEXT_PUBLIC_SANITY_API_VERSION` configure the CMS.
- `SANITY_API_READ_TOKEN` is recommended when the production dataset is private.
- `SANITY_API_WRITE_TOKEN` is required only for seed and import scripts. Never expose it to client-side code.

The published Facebook event archive also has a local fallback, so event pages remain available if Sanity is temporarily unreachable.
