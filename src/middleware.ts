// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { TOKEN } from "../constants";

export function middleware(req: NextRequest) {
  const token = req.cookies.get(TOKEN);

  if (req.nextUrl.pathname.startsWith("/admin")) {
    // If no token, redirect to login
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // Allow request to continue
  return NextResponse.next();
}

// Define the routes where the middleware should apply
export const config = {
  matcher: ["/admin/:path*"], // Add the protected routes here
};
