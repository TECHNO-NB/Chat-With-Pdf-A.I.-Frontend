import { jwtDecode, JwtPayload } from "jwt-decode";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  let decodedAccessToken: JwtPayload | null = null;
  let decodedRefreshToken: JwtPayload | null = null;

  // Decode access token
  try {
    if (accessToken) {
      decodedAccessToken = jwtDecode<JwtPayload>(accessToken);
    }
  } catch (error) {
    console.error("Invalid access token:", error);
  }

  // Decode refresh token
  try {
    if (refreshToken) {
      decodedRefreshToken = jwtDecode<JwtPayload>(refreshToken);
    }
  } catch (error) {
    console.error("Invalid refresh token:", error);
  }

  const pathname = request.nextUrl.pathname;

  // 🚫 Redirect unauthenticated users trying to access protected routes
  if (!decodedAccessToken && !decodedRefreshToken && pathname.startsWith("/dashboard")) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth";
    return NextResponse.redirect(url);
  }

  // ✅ Redirect authenticated users away from login page
  if ((decodedAccessToken || decodedRefreshToken) && pathname === "/auth") {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  // ✅ Allow the request to proceed
  return NextResponse.next();
}

// 🛡️ Define routes to apply middleware
export const config = {
  matcher: ["/dashboard/:path*", "/auth"],
};
