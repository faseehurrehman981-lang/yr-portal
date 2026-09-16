import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Extract token from cookies
  const token = request.cookies.get("auth_token")?.value;
  const path = request.nextUrl.pathname;

  // Protect /dashboard and its sub-routes
  if (path.startsWith("/dashboard")) {
    if (!token) {
      // Redirect unauthenticated users to login page
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Protect driver dashboard routes
  if (path.startsWith("/driver/dashboard") || path.startsWith("/driver/earnings")) {
    if (!token) {
      // Redirect unauthenticated drivers to driver login page
      return NextResponse.redirect(new URL("/driver/login", request.url));
    }
  }
  
  // If user is on the root path `/`, you might want to redirect them to login if not authenticated
  // Or let them see the landing page. The user requested: "first user should see the login page"
  if (path === "/") {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    } else {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/",
    "/dashboard/:path*",
    "/driver/dashboard/:path*",
    "/driver/earnings/:path*"
  ],
};
