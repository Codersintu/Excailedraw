import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req: any) {
  const token = await getToken({ req });

  const isAuth = !!token;

  const { pathname } = req.nextUrl;

  // pages that need login
  const protectedRoutes =
    pathname.startsWith("/canvas") ||
    pathname.startsWith("/createRoom");

  if (protectedRoutes && !isAuth) {
    // redirect to NextAuth default login
    return NextResponse.redirect(
      new URL("/api/auth/signin", req.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/canvas/:path*", "/create-room"]
};