import Link from "next/link";

export default function Home() {
  return (
    <section className="flex flex-1 flex-col items-center justify-center px-6 text-center">
      <p className="text-muted text-xs tracking-[0.3em] uppercase">
        Visual Cuisine
      </p>
      <h1 className="font-display mt-4 text-4xl tracking-tight sm:text-6xl">
        Food &amp; Beverage Photography
      </h1>
      <Link
        href="/photo"
        className="border-foreground/40 hover:border-foreground mt-8 border-b pb-1 text-sm tracking-wide uppercase transition-colors"
      >
        View the Work
      </Link>
    </section>
  );
}
