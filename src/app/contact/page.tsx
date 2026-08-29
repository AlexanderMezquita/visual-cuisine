import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/placeholder-page";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return <PlaceholderPage title="Contact" message="Coming soon." />;
}
