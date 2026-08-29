# Visual Cuisine

**Food & Beverage Photography** — a portfolio site built to showcase food and
beverage photography with a fast, image-first browsing experience.

> **Status**: 🚧 In active development. This README is expanded as each build
> phase lands — see [Project Status](#project-status) for where things stand.

## Overview

Visual Cuisine is a photography portfolio site modeled on the visual language
of high-end photographer portfolios (full-bleed masonry galleries, minimal
chrome, no captions competing with the imagery). The brief was to build
something that is:

- **Fast** — image-heavy sites live or die on perceived performance
- **Content-manageable** — the photographer can add/reorder photos without a
  developer or a redeploy
- **Professional** — clean architecture, sensible conventions, and
  documentation that reads as a case study, not just a setup guide

## Tech Stack & Rationale

| Layer | Choice | Why |
|---|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router, TypeScript, strict mode) | Server Components by default keep client JS near-zero for a mostly-static site; built-in image optimization; file-based Metadata API for SEO; on-demand ISR lets CMS edits go live without a full redeploy |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) | Utility-first, tiny production CSS footprint, fast iteration on a visual-first design |
| CMS | [Sanity](https://www.sanity.io) *(added in the CMS phase)* | Best-in-class image pipeline (CDN, format negotiation, hotspot/crop, blur placeholders), generous free tier, structured schema instead of a folder of files, an editable Studio so the photographer can manage content without touching code |
| CMS integration | `next-sanity` + GROQ *(added in the CMS phase)* | Official client, typed, designed for the App Router |
| Images | Sanity CDN URLs → `next/image` *(added in the gallery phase)* | Automatic AVIF/WebP negotiation, responsive `sizes`, blur-up placeholders, lazy loading below the fold |
| Gallery layout | `react-photo-album` *(added in the gallery phase)* | Purpose-built masonry/justified gallery layouts, responsive, minimal JS |
| Lightbox | `yet-another-react-lightbox` *(added in the lightbox phase)* | Small, accessible (keyboard nav, focus trap), integrates directly with react-photo-album |
| Fonts | `next/font` (self-hosted) | Zero layout shift, no external font requests |
| Contact form | React Hook Form + Zod → Next.js Route Handler → Resend *(added in the contact phase)* | Full control over UX and validation, no third-party form-widget branding |
| Deployment | [Vercel](https://vercel.com) | First-class Next.js support, edge image optimization, preview URLs per PR, simple webhook-driven ISR revalidation from Sanity |
| Testing | Vitest + Testing Library *(added alongside the contact form)* | Covers the gallery component and the form logic — most of the site is static markup, so the test surface is intentionally small |
| Tooling | ESLint (flat config) + Prettier (with `prettier-plugin-tailwindcss`), TypeScript strict mode | Standard hygiene, consistent formatting including automatic Tailwind class sorting |

### Performance approach

- Static generation wherever possible, with on-demand [ISR](https://nextjs.org/docs/app/guides/incremental-static-regeneration) revalidation triggered by a Sanity webhook — publishing a new photo updates the live site without a manual redeploy.
- Client-side JavaScript is opt-in per component (`"use client"` only where interactivity is required: the gallery/lightbox and the contact form) — everything else renders as a Server Component.
- Images are served through `next/image` with responsive `sizes`, modern formats, and blur-up placeholders sourced from Sanity's LQIP data.
- Target: Lighthouse 90+ across Performance, Accessibility, Best Practices, and SEO.

## Project Structure

```
src/
  app/              # Next.js App Router routes, layouts, metadata
  components/       # Shared UI components (added as phases land)
  lib/              # Utilities, CMS client, data fetching (added as phases land)
```

Next.js 16 generates `AGENTS.md` in the project root — it points AI coding
assistants at the version-matched docs bundled in `node_modules/next/dist/docs/`,
since this major version has breaking changes from most models' training data
(async `params`/`searchParams`, Turbopack-by-default, new `next/image` config
defaults, etc.). Leave it in place; `next dev` regenerates it automatically.

## Getting Started

Requires **Node.js 20.9+** (Next.js 16 minimum) and npm.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other scripts:

```bash
npm run build          # production build (Turbopack)
npm run start           # run the production build
npm run lint             # ESLint
npx tsc --noEmit         # type-check
npm run format           # Prettier — write
npm run format:check     # Prettier — check only
npm run test:run          # Vitest (added alongside the contact form)
```

## Environment Variables

_None yet — this section will list Sanity project/dataset IDs, the Resend API
key, and any deployment secrets once those phases land._

## Content Model

_To be documented once the Sanity schema is built (see Project Status)._

## Deployment

Hosted on Vercel. _Deployment details (project link, ISR webhook wiring) will
be documented here once the project is connected._

## Project Status

Being built in small, independently reviewable phases:

- [x] **Phase 1 — Project scaffolding**: Next.js 16 (TS, Tailwind v4, App
      Router, ESLint flat config), Prettier with Tailwind class sorting, base
      metadata, this README.
- [ ] Phase 2 — Design tokens & global shell (header/nav, footer, layout)
- [ ] Phase 3 — Home landing section (hero)
- [ ] Phase 4 — Sanity CMS setup (schema, Studio, seed content)
- [ ] Phase 5 — Gallery page (masonry grid)
- [ ] Phase 6 — Lightbox interaction
- [ ] Phase 7 — About section/page
- [ ] Phase 8 — Contact page (form + email delivery)
- [ ] Phase 9 — SEO & performance polish
- [ ] Phase 10 — Deployment finalization
