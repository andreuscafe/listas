import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/"]
  // afterAuth: (auth, request, evt) => {
  //   console.log(auth);
  //   if (request.nextUrl.pathname != "/app") {
  //     return NextResponse.redirect(new URL("/app", request.url));
  //   }
  // }
});

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/app", "/(api|trpc)(.*)"]
};
