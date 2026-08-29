import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/placeholder-page";

export const metadata: Metadata = {
  title: "Photo",
};

export default function PhotoPage() {
  return <PlaceholderPage title="Photo" message="Gallery coming soon." />;
}
