import { WIDE_CONTAINER_CLASS } from "@/lib/layout";
import { PhotoGallery } from "@/components/gallery/photo-gallery";
import { placeholderPhotos } from "@/lib/placeholder-photos";

const featuredPhotos = placeholderPhotos.slice(0, 6);

export default function Home() {
  return (
    <>
      <h1 className="sr-only">Work</h1>

      <section className="mx-auto max-w-2xl px-6 py-16 text-center">
        <p className="leading-relaxed">
          Visual Cuisine specializes in food and beverage photography for
          restaurants, cafés, and beverage brands — clean light, honest color,
          and images built to make a menu impossible to scroll past.
        </p>
      </section>

      <section className="pb-16">
        <div className={WIDE_CONTAINER_CLASS}>
          <PhotoGallery photos={featuredPhotos} />
        </div>
      </section>
    </>
  );
}
