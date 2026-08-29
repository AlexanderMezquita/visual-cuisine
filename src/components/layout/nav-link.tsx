"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavLink({
  href,
  label,
  className,
  activeClassName,
  onClick,
}: {
  href: string;
  label: string;
  className?: string;
  activeClassName?: string;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
      className={`${className ?? ""} ${isActive ? (activeClassName ?? "") : ""}`.trim()}
    >
      {label}
    </Link>
  );
}
