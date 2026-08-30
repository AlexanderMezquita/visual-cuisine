import type { Metadata } from "next";
import { CONTAINER_WIDTH_CLASS } from "@/lib/layout";
import { ContactForm } from "@/components/contact/contact-form";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <div
      className={`${CONTAINER_WIDTH_CLASS} flex flex-1 flex-col justify-center py-16`}
    >
      <h1 className="sr-only">Contact</h1>
      <div className="mx-auto w-full max-w-md">
        <p className="mb-8 leading-relaxed">
          Have a project in mind? Send a few details below and I&rsquo;ll get
          back to you soon.
        </p>
        <ContactForm />
      </div>
    </div>
  );
}
