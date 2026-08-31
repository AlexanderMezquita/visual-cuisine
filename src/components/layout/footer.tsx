import { InstagramIcon, PinterestIcon } from "@/components/icons";
import { RevealOnScroll } from "@/components/reveal-on-scroll";

const socialLinks = [
  { href: "#", label: "Instagram", Icon: InstagramIcon },
  { href: "#", label: "Pinterest", Icon: PinterestIcon },
];

export function Footer() {
  return (
    <footer className="border-border border-t">
      <RevealOnScroll className="mx-auto flex max-w-6xl flex-col-reverse items-center gap-4 px-6 py-8 text-sm sm:flex-row sm:justify-between">
        <p className="text-muted">
          © {new Date().getFullYear()} Visual Cuisine
        </p>
        <nav aria-label="Social" className="flex gap-5">
          {socialLinks.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="text-muted hover:text-foreground transition-colors"
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
        </nav>
      </RevealOnScroll>
    </footer>
  );
}
