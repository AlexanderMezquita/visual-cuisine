import Image from "next/image";
import Link from "next/link";
import { UNDERLINE_LINK_CLASS } from "@/lib/layout";
import { placeholderPhotos } from "@/lib/placeholder-photos";

export function AboutContent() {
  return (
    <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
      {/* Text comes first in the DOM (not just visually) so mobile — the
          breakpoint this order was written for — has matching visual and
          reading order for screen readers. Desktop reorders visually via
          `md:order-*` only; CSS `order` never changes DOM/reading order,
          so the same trade-off just moves to desktop instead of mobile. */}
      <div className="order-1 max-w-md md:order-2">
        <p className="leading-relaxed">
          I&rsquo;m a photographer specializing in food and beverage imagery,
          working with restaurants, cafés, and beverage brands who want their
          menu to look as good as it tastes. I&rsquo;m drawn to natural light,
          honest textures, and the small details that make a dish feel real —
          steam rising off a bowl, condensation on a glass, the crumb of a good
          loaf.
        </p>
        <p className="mt-4 leading-relaxed">
          When I&rsquo;m not behind the camera, I&rsquo;m probably trying a new
          restaurant or reorganizing my spice cabinet for the third time this
          month.
        </p>
        <p className="mt-6 leading-relaxed">
          Want to work together?{" "}
          <Link href="/contact" className={UNDERLINE_LINK_CLASS}>
            Get in touch
          </Link>
          .
        </p>
      </div>

      <div className="relative order-2 aspect-[3/4] overflow-hidden md:order-1">
        <Image
          src={placeholderPhotos[0].src}
          alt="Portrait of the photographer behind Visual Cuisine"
          fill
          priority
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    </div>
  );
}
