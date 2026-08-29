import Link from "next/link";
import { navLinks } from "@/lib/nav-links";
import { CONTAINER_WIDTH_CLASS } from "@/lib/layout";
import { NavLink } from "@/components/layout/nav-link";
import { HeaderControls } from "@/components/layout/header-controls";

export function Header() {
  return (
    <header className="border-border relative border-b">
      <div
        className={`${CONTAINER_WIDTH_CLASS} flex flex-col items-center gap-3 py-6`}
      >
        <Link href="/" className="font-display text-lg tracking-wide">
          Visual Cuisine
        </Link>

        <nav aria-label="Primary" className="hidden gap-8 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              label={link.label}
              className="text-muted hover:text-foreground text-sm tracking-wide uppercase underline-offset-4 transition-colors"
              activeClassName="!text-foreground underline"
            />
          ))}
        </nav>
      </div>

      <HeaderControls />
    </header>
  );
}
