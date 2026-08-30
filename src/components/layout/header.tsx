import Image from "next/image";
import Link from "next/link";
import { navLinks } from "@/lib/nav-links";
import { CONTAINER_WIDTH_CLASS } from "@/lib/layout";
import { BRAND_NAME, BRAND_TAGLINE } from "@/lib/brand";
import { NavLink } from "@/components/layout/nav-link";
import { HeaderControls } from "@/components/layout/header-controls";

export function Header() {
  return (
    <header className="border-border relative border-b">
      <div
        className={`${CONTAINER_WIDTH_CLASS} flex flex-col items-start gap-3 py-6 md:items-center`}
      >
        <Link href="/" className="flex flex-col items-center gap-1">
          <Image
            src="/logo-mark.png"
            alt=""
            width={72}
            height={72}
            priority
            className="brand-mark h-18 w-18"
          />
          <span className="font-display text-lg tracking-wide uppercase">
            {BRAND_NAME}
          </span>
          <span className="text-muted text-[10px] tracking-[0.2em] uppercase">
            {BRAND_TAGLINE}
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden gap-8 md:mt-4 md:flex">
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
