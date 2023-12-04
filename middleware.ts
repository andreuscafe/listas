import { NextResponse } from "next/server";
import { authMiddleware } from "@clerk/nextjs";

const publicRoutes = ["/", "/sign-in", "/sign-up", "/forgot-password"];

export default authMiddleware({
  publicRoutes,
  afterAuth: (auth, request, evt) => {
    console.log("middle auth userId", auth.userId);

    if (!auth.userId) {
      if (publicRoutes.includes(request.nextUrl.pathname)) {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(new URL("/sign-in", request.url));
      }
    } else {
      if (
        request.nextUrl.pathname.startsWith("/sign") ||
        request.nextUrl.pathname === "/"
      ) {
        return NextResponse.redirect(new URL("/app", request.url));
      }

      return NextResponse.next();
    }
  }
});

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/app", "/(api|trpc)(.*)"]
};
