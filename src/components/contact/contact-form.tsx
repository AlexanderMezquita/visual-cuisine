"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UNDERLINE_LINK_CLASS } from "@/lib/layout";
import { contactSchema, type ContactFormValues } from "@/lib/contact-schema";

type Status = "idle" | "submitting" | "success" | "error";

const fieldClass =
  "border-border focus:border-foreground mt-2 w-full border-b bg-transparent py-2 outline-none transition-colors";
const labelClass = "text-muted text-xs tracking-wide uppercase";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  async function onSubmit(values: ContactFormValues) {
    setStatus("submitting");
    setErrorMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data: { error?: string } = await response.json();

      if (!response.ok) {
        setErrorMessage(
          data.error ?? "Something went wrong. Please try again.",
        );
        setStatus("error");
        return;
      }

      setStatus("success");
      reset();
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p className="leading-relaxed">
        Thanks for reaching out — I&rsquo;ll get back to you soon.
      </p>
    );
  }

  return (
    <form
      onSubmit={(event) => void handleSubmit(onSubmit)(event)}
      noValidate
      className="flex flex-col gap-6"
    >
      <div>
        <label htmlFor="name" className={labelClass}>
          Name
        </label>
        <input
          id="name"
          type="text"
          autoComplete="name"
          className={fieldClass}
          {...register("name")}
        />
        {errors.name && (
          <p className="text-error mt-1 text-sm">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          className={fieldClass}
          {...register("email")}
        />
        {errors.email && (
          <p className="text-error mt-1 text-sm">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          className={`${fieldClass} resize-none`}
          {...register("message")}
        />
        {errors.message && (
          <p className="text-error mt-1 text-sm">{errors.message.message}</p>
        )}
      </div>

      {status === "error" && errorMessage && (
        <p className="text-error text-sm">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className={`${UNDERLINE_LINK_CLASS} self-start pb-1 text-sm tracking-wide uppercase disabled:opacity-50`}
      >
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
