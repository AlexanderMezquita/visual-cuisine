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
| Contact form    | React Hook Form + Zod → Next.js Route Handler → Resend                                       | Full control over UX and validation, no third-party form-widget branding                                                                                                                                                                     |
| Deployment      | [Vercel](https://vercel.com)                                                                 | First-class Next.js support, edge image optimization, preview URLs per PR, simple webhook-driven ISR revalidation from Sanity                                                                                                                |
| Testing         | Vitest + Testing Library _(planned, not yet added)_                                          | Will cover the gallery component and the form logic once introduced — most of the site is static markup, so the test surface is intentionally small                                                                                          |
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
```

## Environment Variables

See [`.env.example`](.env.example) for the full list with comments. Copy it
to `.env.local` and fill in real values:

| Variable             | Purpose                                                                                                                                                                            |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `RESEND_API_KEY`     | Resend API key used by the contact form's Route Handler to send email. Server-only, never exposed to the client.                                                                   |
| `CONTACT_TO_EMAIL`   | Address that receives contact-form submissions.                                                                                                                                    |
| `CONTACT_FROM_EMAIL` | Sender address. Defaults to Resend's sandbox sender (`onboarding@resend.dev`) until a real domain is verified — sandbox mode can only deliver to the account's own verified email. |

This section will grow with Sanity project/dataset IDs once Phase 4 is
revisited, and any deployment secrets once the project is connected to
Vercel.

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
- [x] **Phase 3 — Home landing section**: started as a hero on `/` with brand
      name, tagline, and a "View the Work" CTA into `/photo` (a placeholder
      gradient backdrop was tried and removed — swapped for a real photo once
      the CMS lands). Integrated the real Visual Cuisine logo: the white
      background was removed from the source artwork (true alpha
      transparency, not just a visual crop), the icon mark now sits in the
      header next to the wordmark and tagline (inverted to white via CSS in
      dark mode, since it's black line art), and it's the site's
      favicon/apple-icon (with its own opaque rounded-white backing, since a
      transparent favicon disappears against dark browser chrome). Later
      reworked into a leaner "Work" landing page: since the persistent header
      already carries the brand name/tagline on every route, `/` now opens
      straight into a brief intro paragraph and a featured-work grid (first 6
      placeholder photos, same treatment as the full `/photo` gallery,
      heading only `sr-only`), and the standalone hero heading moved to the
      top of `/photo` itself as that page's visible `<h1>` (the "View the
      Work" CTA was dropped entirely — redundant once the heading lives on
      the page it used to link to). `PhotoGallery` now takes a `photos` prop
      instead of hardcoding
      the full set, so both pages share one component instead of two copies
      of the grid markup, and the brand name/tagline strings live once in
      `src/lib/brand.ts` instead of being duplicated between the header and
      the `/photo` heading.
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
- [x] **Phase 8 — Contact page**: a form (name/email/message) on `/contact`
      using React Hook Form + Zod for client-side validation, submitting to a
      Route Handler (`src/app/api/contact/route.ts`) that re-validates
      server-side with the same schema and sends email via Resend, replying
      to the submitter's own address so responses go straight to them. Built
      with a placeholder `RESEND_API_KEY` per the same approach as the
      aborted Sanity attempt — the form validates and shows success/error
      states correctly end-to-end (verified: an invalid key produces a real
      401 from Resend's API, caught and surfaced as a friendly error, not a
      crash) and will start actually delivering email the moment a real key
      is set.
- [x] **Home page spacing/reveal fixes**: while the home page still had its
      own hero, its `flex-1` (fill remaining flex-column height) stopped
      working once the intro paragraph and featured gallery were added as
      sibling sections below it — swapped to an explicit `min-h-[80vh]`, then
      dialed back to `min-h-[55vh]` once that read as too much empty space,
      before the hero was removed from `/` altogether per the Phase 3 rework
      above. Separately, reduced the featured gallery's `RevealOnScroll`
      `rootMargin` from `-80px` to `-20px` so tiles reveal a bit sooner while
      scrolling — this part is still in effect on both `/` and `/photo`.
- [x] **Header mobile alignment**: on mobile/`sm` widths the header's
      logo/wordmark/tagline block is left-aligned (flush with the same edge
      as the page content below it) instead of centered; it stays centered
      from `md:` up. Scoped to the header only — the footer's mobile layout
      is unchanged and remains centered, since only the header's alignment
      was requested.
- [x] **Code review fixes**: the contact form's Zod schema validated the
      email field's format before trimming it (`z.email(...).trim()`), so a
      pasted address with leading/trailing whitespace failed validation even
      though it was otherwise valid — reordered to trim first, then check the
      format (`z.string().trim().pipe(z.email(...))`), matching how `name`
      and `message` already trim before validating. Also added upper-bound
      length checks (`name` 100, `email` 254, `message` 5000 chars) since
      only lower bounds existed before, and the Route Handler forwards
      whatever passes validation straight into an outbound Resend API call.
      The Route Handler's `request.json()` call is now wrapped in a
      try/catch, so a malformed request body returns the same friendly 400
      response as a failed-validation body instead of an unhandled 500.
- [ ] Phase 9 — SEO & performance polish
- [ ] Phase 10 — Deployment finalization
