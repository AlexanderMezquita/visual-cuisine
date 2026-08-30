import type { Metadata } from "next";
import { WIDE_CONTAINER_CLASS } from "@/lib/layout";
import { PhotoGallery } from "@/components/gallery/photo-gallery";

export const metadata: Metadata = {
  title: "Photo",
};

export default function PhotoPage() {
  return (
    <div className={`${WIDE_CONTAINER_CLASS} py-10`}>
      <h1 className="sr-only">Photo</h1>
      <PhotoGallery />
    </div>
  );
}
