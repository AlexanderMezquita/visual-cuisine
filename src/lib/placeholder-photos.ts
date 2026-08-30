export type GalleryPhoto = {
  src: string;
  alt: string;
};

// Local placeholder gradients standing in for real photography until the
// Sanity-backed gallery is wired up. Same shape as the future CMS data so
// swapping the source later doesn't require touching the gallery component.
export const placeholderPhotos: GalleryPhoto[] = [
  { src: "/photos/placeholder-01.jpg", alt: "Placeholder photography tile 1" },
  { src: "/photos/placeholder-02.jpg", alt: "Placeholder photography tile 2" },
  { src: "/photos/placeholder-03.jpg", alt: "Placeholder photography tile 3" },
  { src: "/photos/placeholder-04.jpg", alt: "Placeholder photography tile 4" },
  { src: "/photos/placeholder-05.jpg", alt: "Placeholder photography tile 5" },
  { src: "/photos/placeholder-06.jpg", alt: "Placeholder photography tile 6" },
  { src: "/photos/placeholder-07.jpg", alt: "Placeholder photography tile 7" },
  { src: "/photos/placeholder-08.jpg", alt: "Placeholder photography tile 8" },
  { src: "/photos/placeholder-09.jpg", alt: "Placeholder photography tile 9" },
  {
    src: "/photos/placeholder-10.jpg",
    alt: "Placeholder photography tile 10",
  },
  {
    src: "/photos/placeholder-11.jpg",
    alt: "Placeholder photography tile 11",
  },
  {
    src: "/photos/placeholder-12.jpg",
    alt: "Placeholder photography tile 12",
  },
];
