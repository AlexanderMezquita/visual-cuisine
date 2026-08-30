"use client";

import { useState } from "react";
import { navLinks } from "@/lib/nav-links";
import { CONTAINER_WIDTH_CLASS } from "@/lib/layout";
import { NavLink } from "@/components/layout/nav-link";
import { ThemeToggle } from "@/components/theme-toggle";
import { MenuToggleIcon } from "@/components/icons";

export function HeaderControls() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className={`${CONTAINER_WIDTH_CLASS} pointer-events-none absolute inset-0 flex items-center`}
      >
        <div className="pointer-events-auto ml-auto flex items-center gap-4">
          <ThemeToggle />

          <button
            type="button"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
            className="md:hidden"
          >
            <MenuToggleIcon open={open} />
          </button>
        </div>
      </div>

      {/* z-50: this is the only stacking-order dependency in the app right
          now (nothing else sets a z-index), so it just needs to beat page
          content's default auto stacking. Revisit if a future overlay
          (e.g. the Phase 6 lightbox) introduces its own z-index scale. */}
      <nav
        aria-label="Mobile"
        aria-hidden={!open}
        inert={!open}
        className={`bg-background border-border absolute inset-x-0 top-full z-50 overflow-hidden border-b transition-[max-height,opacity] duration-300 ease-in-out md:hidden ${
          open ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col items-center gap-1 px-6 py-6 text-center">
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              label={link.label}
              onClick={() => setOpen(false)}
              className="py-2 text-sm tracking-wide uppercase underline-offset-4"
              activeClassName="!text-foreground underline"
            />
          ))}
        </div>
      </nav>
    </>
  );
}
