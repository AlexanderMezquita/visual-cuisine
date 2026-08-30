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

| Layer           | Choice                                                                                       | Why                                                                                                                                                                                                                                          |
| --------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Framework       | [Next.js 16](https://nextjs.org) (App Router, TypeScript, strict mode)                       | Server Components by default keep client JS near-zero for a mostly-static site; built-in image optimization; file-based Metadata API for SEO; on-demand ISR lets CMS edits go live without a full redeploy                                   |
| Styling         | [Tailwind CSS v4](https://tailwindcss.com)                                                   | Utility-first, tiny production CSS footprint, fast iteration on a visual-first design                                                                                                                                                        |
| CMS             | [Sanity](https://www.sanity.io) _(added in the CMS phase)_                                   | Best-in-class image pipeline (CDN, format negotiation, hotspot/crop, blur placeholders), generous free tier, structured schema instead of a folder of files, an editable Studio so the photographer can manage content without touching code |
| CMS integration | `next-sanity` + GROQ _(added in the CMS phase)_                                              | Official client, typed, designed for the App Router                                                                                                                                                                                          |
| Images          | Sanity CDN URLs → `next/image` _(added in the gallery phase)_                                | Automatic AVIF/WebP negotiation, responsive `sizes`, blur-up placeholders, lazy loading below the fold                                                                                                                                       |
| Gallery layout  | Plain CSS grid (Tailwind), fixed 3/2/1 columns                                               | Tried `react-photo-album`'s masonry mode first, but a uniform, evenly-spaced grid read cleaner for this brief and didn't need an extra dependency to get there                                                                               |
| Lightbox        | `yet-another-react-lightbox` _(added in the lightbox phase)_                                 | Small, accessible (keyboard nav, focus trap)                                                                                                                                                                                                 |
| Fonts           | `next/font` (self-hosted)                                                                    | Zero layout shift, no external font requests                                                                                                                                                                                                 |
| Contact form    | React Hook Form + Zod → Next.js Route Handler → Resend _(added in the contact phase)_        | Full control over UX and validation, no third-party form-widget branding                                                                                                                                                                     |
| Deployment      | [Vercel](https://vercel.com)                                                                 | First-class Next.js support, edge image optimization, preview URLs per PR, simple webhook-driven ISR revalidation from Sanity                                                                                                                |
| Testing         | Vitest + Testing Library _(added alongside the contact form)_                                | Covers the gallery component and the form logic — most of the site is static markup, so the test surface is intentionally small                                                                                                              |
| Tooling         | ESLint (flat config) + Prettier (with `prettier-plugin-tailwindcss`), TypeScript strict mode | Standard hygiene, consistent formatting including automatic Tailwind class sorting                                                                                                                                                           |

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
- [x] **Phase 2 — Design tokens & global shell**: warm neutral color palette
      (light/dark) as CSS theme tokens, Fraunces display font, header with
      centered wordmark/nav and an active-link underline, a mobile menu with
      an animated open/close transition, a manual light/dark theme toggle
      (`useSyncExternalStore`, persisted, no flash on load), and placeholder
      `/photo`, `/about`, `/contact` routes.
- [x] **Phase 3 — Home landing section**: hero on `/` with brand name,
      tagline, and a "View the Work" CTA into `/photo` (a placeholder gradient
      backdrop was tried and removed — swapped for a real photo once the CMS
      lands). Integrated the real Visual Cuisine logo: the white background
      was removed from the source artwork (true alpha transparency, not just
      a visual crop), the icon mark now sits in the header next to the
      wordmark and tagline (inverted to white via CSS in dark mode, since
      it's black line art), and it's the site's favicon/apple-icon (with its
      own opaque rounded-white backing, since a transparent favicon disappears
      against dark browser chrome).
- [ ] Phase 4 — Sanity CMS setup (schema, Studio, seed content). Attempted
      and rolled back once already — packages installed, schema/client
      scaffolded, then fully reverted (uninstalled, files removed) to revisit
      with a clearer plan before creating a real Sanity project.
- [x] **Phase 5 — Gallery page**: `/photo` renders a fixed grid (2 columns
      mobile, 3 desktop) of local placeholder images, wider than the
      header/footer content column for visual impact — swapped for real
      photography via Sanity once Phase 4 lands. Deliberately _not_ a masonry
      layout: tried `react-photo-album`'s masonry mode first, but a strict,
      evenly-spaced grid (uniform `aspect-[2/3]` portrait tiles, generous
      gaps) read
      cleaner, so the dependency was removed in favor of a plain CSS grid.
      Each tile fades/slides in via `IntersectionObserver` as it scrolls into
      view rather than all being visible on load.
- [x] **Page transitions**: route changes fade the page content in via a
      `key={pathname}`-remount + CSS animation (no router/animation library —
      React's newer `<ViewTransition>` was considered, but isn't actually
      exported by the installed React 19.2.8 yet despite the framework's own
      docs describing it as available).
- [ ] Phase 6 — Lightbox interaction
- [x] **Phase 7 — About section**: a compact, centered section on `/about`
      (portrait + a short first-person bio ending in a "Get in touch" link to
      `/contact`), modeled after the structure of a reference photographer's
      about page — not a big hero, just image + text vertically centered
      between the header and footer. Placeholder bio copy and portrait until
      the real ones are ready. Found the same "flex-item wrapper around a
      grid of `fill` images doesn't reliably stretch" bug a third time, so
      fixed it at the source this time: `CONTAINER_WIDTH_CLASS` now includes
      `w-full` itself, instead of remembering to add it per page. On mobile,
      the bio text now precedes the portrait in both DOM order and CSS
      `order` (not just visually — an initial version reordered visually
      only, which would have mismatched screen-reader reading order at
      exactly the breakpoint it targeted); desktop reorders visually via
      `md:order-*` instead. The portrait also reuses the shared
      `placeholderPhotos` data instead of a hardcoded path, has `priority`
      as the page's likely LCP element, and its CTA shares a
      `UNDERLINE_LINK_CLASS` constant with the home hero instead of
      duplicating the class string.
- [x] **Theme default**: the site now always defaults to light regardless of
      OS `prefers-color-scheme` — dark only applies once a visitor explicitly
      picks it via the toggle. Removed the media-query-based auto-dark CSS
      and the toggle's `matchMedia` fallback so the visual default and the
      toggle's own logic can't disagree.
- [ ] Phase 8 — Contact page (form + email delivery)
- [ ] Phase 9 — SEO & performance polish
- [ ] Phase 10 — Deployment finalization
