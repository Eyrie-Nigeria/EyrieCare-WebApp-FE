import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define which routes to protect
const protectedRoutes = [
  "/dashboard",
  "/overview",
  "/profile",
  "/saved",
  "/cases",
  "/specialties",
];

// Define auth routes (users shouldn't see these if they are already logged in)
const authRoutes = ["/login", "/signup", "/forgot-password"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Since we configured Zustand to sync to cookies with the key 'auth-storage',
  // we can read that cookie here on the server.
  const authCookie = request.cookies.get("auth-storage")?.value;

  // We do a basic check. A more robust implementation would actually decode & verify the JWT here.
  // But checking for its existence is a great start.
  let hasAuthToken = false;
  if (authCookie) {
    try {
      const parsed = JSON.parse(authCookie);
      if (parsed.state?.tokens?.access_token) {
        hasAuthToken = true;
      }
    } catch {
      hasAuthToken = false;
    }
  }

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  if (isProtectedRoute && !hasAuthToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAuthRoute && hasAuthToken) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
