import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip API routes, static files
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Handle root redirect: / → default locale (or cookie preference)
  if (pathname === "/") {
    const cookieLocale =
      request.cookies.get("NEXT_LOCALE")?.value || routing.defaultLocale;
    return NextResponse.redirect(
      new URL(`/${cookieLocale}`, request.url)
    );
  }

  // For /en or /th paths: validate locale
  // If cookie doesn't match path, update cookie to match path
  const pathLocale = pathname.split("/")[1];
  if (pathLocale === "en" || pathLocale === "th") {
    const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
    if (cookieLocale && cookieLocale !== pathLocale) {
      // Cookie says different locale — update cookie to match URL
      const response = NextResponse.next();
      response.cookies.set("NEXT_LOCALE", pathLocale, {
        path: "/",
        maxAge: 60 * 60 * 24 * 365,
      });
      return response;
    }
    // No cookie or matches path — let intlMiddleware handle
    return intlMiddleware(request);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon|.*\\..*).*)"],
};
