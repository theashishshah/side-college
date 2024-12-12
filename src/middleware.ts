import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export { default } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET_KEY,
  });

  const url = request.nextUrl;
  // console.log("Console log in middleware file", token)
  // console.log("am I getting url", url)
  // console.log("Middleware triggered");
  // console.log("Token:", token);
  // console.log("Request URL:", request.nextUrl);
  // console.log("Cookies:", request.cookies.getAll());


  if (
    token &&
    (url.pathname.startsWith("/signin") ||
      url.pathname.startsWith("/signup") ||
      url.pathname.startsWith("/verify") ||
      url.pathname === "/")
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!token && url.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }
  return NextResponse.next();
  // return NextResponse.redirect(new URL("/home", request.url));
}

// export const config = {
//   matcher: [
//     "/auth/signin",
//     "/auth/signup",
//     "/",
//     "/dashboard/:path*",
//     "/verify/:path*",
//   ],
// };

export const config = {
  matcher: ["/dashboard/:path*", "/signin", "/signup", "/", "/verify/:path*"],
};

