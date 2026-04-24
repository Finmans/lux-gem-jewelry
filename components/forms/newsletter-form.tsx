"use client";

import { useState } from "react";

type FormState = { type: "idle" | "success" | "error"; message: string };

const initialState: FormState = { type: "idle", message: "" };

export function NewsletterForm({ sourcePage = "/" }: { sourcePage?: string }) {
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [state, setState] = useState<FormState>(initialState);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setState(initialState);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, website, sourcePage }),
      });

      const payload = (await response.json()) as { ok: boolean; message?: string };

      if (!response.ok || !payload.ok) {
        setState({ type: "error", message: payload.message ?? "Unable to subscribe right now" });
        return;
      }

      setEmail("");
      setWebsite("");
      setState({ type: "success", message: "Subscribed. Thank you." });
    } catch {
      setState({ type: "error", message: "Network error. Please try again." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="w-full" noValidate aria-label="Newsletter subscription">
      <div className="flex gap-0 max-w-sm">
        <div className="flex-1">
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Your email address"
            required
            autoComplete="email"
            aria-describedby="newsletter-hint"
            className="w-full bg-[#111115] border border-[#2A2A30] border-r-0 px-4 py-3 text-sm text-[#F6F1E8] placeholder:text-[#8A8F98]/50 focus:outline-none focus:border-[#C6A878]/50 transition-colors"
          />
        </div>
        <button
          type="submit"
          disabled={submitting}
          aria-label={submitting ? "Subscribing..." : "Subscribe to newsletter"}
          className="bg-[#C6A878] text-[#0B0B0D] px-6 py-3 text-[10px] tracking-[0.25em] uppercase font-medium hover:bg-[#D9C4A0] transition-colors whitespace-nowrap disabled:opacity-70"
        >
          {submitting ? "Submitting" : "Subscribe"}
        </button>
      </div>
      <p id="newsletter-hint" className="sr-only">
        Enter your email to subscribe to our newsletter
      </p>
      <input
        type="text"
        value={website}
        onChange={(event) => setWebsite(event.target.value)}
        autoComplete="off"
        tabIndex={-1}
        aria-hidden="true"
        className="hidden"
      />
      <div role="status" aria-live="polite" aria-atomic="true">
        {state.type !== "idle" ? (
          <p className={`mt-2 text-xs ${state.type === "success" ? "text-[#C6A878]" : "text-[#d98f8f]"}`}>
            {state.message}
          </p>
        ) : null}
      </div>
    </form>
  );
}
