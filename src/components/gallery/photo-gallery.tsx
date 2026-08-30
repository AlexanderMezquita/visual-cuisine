import Image from "next/image";
import { placeholderPhotos } from "@/lib/placeholder-photos";
import { RevealOnScroll } from "@/components/gallery/reveal-on-scroll";

export function PhotoGallery() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-3 md:gap-8">
      {placeholderPhotos.map((photo) => (
        <RevealOnScroll key={photo.src}>
          <div className="relative aspect-[2/3] overflow-hidden">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, (max-width: 1456px) 33vw, 440px"
            />
          </div>
        </RevealOnScroll>
      ))}
    </div>
  );
}
