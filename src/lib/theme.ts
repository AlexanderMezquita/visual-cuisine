// Plain (non-"use client") module so both the Server Component root layout
// (the anti-flash inline script) and the client-side theme toggle can import
// the same key. Importing a constant from a "use client" module into a
// Server Component resolves to `undefined` there — the client boundary only
// preserves component references, not arbitrary exported values — so this
// constant previously had to live outside theme-toggle.tsx to be usable from
// layout.tsx at all.
export const THEME_STORAGE_KEY = "theme";
