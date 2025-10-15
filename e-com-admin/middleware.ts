import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value; // or any auth cookie/token


  const publicRoutes = ["/", "/login", "/register"];

  const isPublic = publicRoutes.some((path) => req.nextUrl.pathname.startsWith(path));

  if (!token && !isPublic) {
    // Redirect to login if not authenticated
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (token && req.nextUrl.pathname === "/login") {
    // Redirect logged-in users away from login
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"], // apply to all routes except _next assets and API
};
