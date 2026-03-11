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

const adminRoutes = ["/admin"];
const superAdminRoutes = ["/superadmin"];

// Define auth routes (users shouldn't see these if they are already logged in)
const authRoutes = ["/login", "/signup", "/forgot-password"];

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Since we configured Zustand to sync to cookies with the key 'auth-storage',
  // we can read that cookie here on the server.
  const authCookie = request.cookies.get("auth-storage")?.value;

  // We do a basic check. A more robust implementation would actually decode & verify the JWT here.
  // But checking for its existence is a great start.
  let hasAuthToken = false;
  let userRole: string | null = null;

  if (authCookie) {
    try {
      const parsed = JSON.parse(authCookie);
      if (parsed.state?.tokens?.access_token) {
        hasAuthToken = true;
      }
      if (parsed.state?.user?.role) {
        userRole = parsed.state.user.role.toLowerCase();
      }
    } catch {
      hasAuthToken = false;
    }
  }

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
  const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route));
  const isSuperAdminRoute = superAdminRoutes.some((route) =>
    pathname.startsWith(route),
  );

  // 0. Root path redirect for authenticated users
  if (pathname === "/" && hasAuthToken) {
    if (userRole === "superadmin") {
      return NextResponse.redirect(new URL("/superadmin", request.url));
    }
    if (userRole === "admin") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // 1. Unauthenticated users trying to access protected routes
  if (
    (isProtectedRoute || isAdminRoute || isSuperAdminRoute) &&
    !hasAuthToken
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 2. Authenticated users trying to access auth routes (login/signup)
  if (isAuthRoute && hasAuthToken) {
    // Redirect based on role
    if (userRole === "superadmin") {
      return NextResponse.redirect(new URL("/superadmin", request.url));
    }
    if (userRole === "admin") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // 3. Role-based protection for /admin
  if (isAdminRoute && userRole !== "admin" && userRole !== "superadmin") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // 4. Role-based protection for /superadmin
  if (isSuperAdminRoute && userRole !== "superadmin") {
    if (userRole === "admin") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
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
