"use client";

import { useEffect } from "react";
import Link from "next/link";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen bg-[#0B0B0D] pt-20">
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[10px] tracking-[0.35em] text-[#C6A878] uppercase mb-4">Unexpected Error</p>
          <h1 className="font-display text-5xl sm:text-6xl font-light text-[#F6F1E8] mb-4">Something Went Wrong</h1>
          <p className="text-[#8A8F98] font-light max-w-2xl mx-auto mb-8">
            Please retry this page, or continue with consultation support if the issue persists.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              type="button"
              onClick={reset}
              className="px-7 py-3 bg-[#C6A878] text-[#0B0B0D] text-[10px] tracking-[0.25em] uppercase hover:bg-[#D9C4A0] transition-colors"
            >
              Try Again
            </button>
            <Link
              href="/contact"
              className="px-7 py-3 border border-[#C6A878]/40 text-[#C6A878] text-[10px] tracking-[0.25em] uppercase hover:bg-[#C6A878]/10 transition-colors"
            >
              Contact Concierge
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
