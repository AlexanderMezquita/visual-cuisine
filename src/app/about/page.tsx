import type { Metadata } from "next";
import { CONTAINER_WIDTH_CLASS } from "@/lib/layout";
import { AboutContent } from "@/components/about/about-content";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <div
      className={`${CONTAINER_WIDTH_CLASS} flex flex-1 flex-col justify-center py-16`}
    >
      <h1 className="sr-only">About</h1>
      <AboutContent />
    </div>
  );
}
