// Shared by the header's centered content and its absolutely-positioned
// controls overlay, so both always line up with the footer's own container.
// `w-full` is deliberate, not decorative: without it, a flex-item wrapper
// around a CSS Grid of `fill` next/image tiles can fail to stretch to its
// max-width (observed and root-caused twice already in this codebase), so
// every consumer gets the fix for free instead of re-discovering it.
export const CONTAINER_WIDTH_CLASS = "mx-auto w-full max-w-6xl px-6";

// Wider than CONTAINER_WIDTH_CLASS, deliberately — used by content (like the
// gallery) that should read bigger than the header/footer's text column.
export const WIDE_CONTAINER_CLASS = "mx-auto w-full max-w-[88rem] px-3 sm:px-6";

// Shared underline-link treatment (hero CTA, About CTA, ...). Callers add
// their own placement/sizing classes (margin, text size, tracking) on top.
export const UNDERLINE_LINK_CLASS =
  "border-foreground/40 hover:border-foreground border-b transition-colors";
