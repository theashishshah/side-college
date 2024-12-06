import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export { default } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  // if you've token then where you can go, if no then where you can go

  if (
    token &&
    (url.pathname.startsWith("/auth/signin") ||
      url.pathname.startsWith("/auth/signup") ||
      url.pathname.startsWith("/verify") ||
      url.pathname.startsWith("/"))
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if(!token && url.pathname.startsWith('/dashboard')){
    return NextResponse.redirect(new URL('/singin', request.url))
  }

  return NextResponse.redirect(new URL("/papa", request.url));
}

export const config = {
  matcher: [
    "/auth/signin",
    "/auth/signup",
    "/",
    "/dashboard/:path*",
    "/verify/:path*",
  ],
};
