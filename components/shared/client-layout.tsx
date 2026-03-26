"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { DiamondParticles } from "./diamond-particles";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <DiamondParticles />
      <Navbar />
      <div className="flex-1">{children}</div>
      <Footer />
    </>
  );
}
