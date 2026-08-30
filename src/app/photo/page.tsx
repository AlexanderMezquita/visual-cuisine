import type { Metadata } from "next";
import { WIDE_CONTAINER_CLASS } from "@/lib/layout";
import { BRAND_NAME, BRAND_TAGLINE } from "@/lib/brand";
import { PhotoGallery } from "@/components/gallery/photo-gallery";
import { placeholderPhotos } from "@/lib/placeholder-photos";

export const metadata: Metadata = {
  title: "Photo",
};

export default function PhotoPage() {
  return (
    <div className={`${WIDE_CONTAINER_CLASS} py-10`}>
      <div className="mb-10 text-center">
        <p className="text-muted text-xs tracking-[0.3em] uppercase">
          {BRAND_NAME}
        </p>
        <h1 className="font-display mt-4 text-4xl tracking-tight sm:text-6xl">
          {BRAND_TAGLINE}
        </h1>
      </div>
      <PhotoGallery photos={placeholderPhotos} />
    </div>
  );
}
