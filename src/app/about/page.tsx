import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/placeholder-page";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return <PlaceholderPage title="About" message="Coming soon." />;
}
