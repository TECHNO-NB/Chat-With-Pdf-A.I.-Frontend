import { jwtDecode, JwtPayload } from "jwt-decode";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  let decodedAccessToken: JwtPayload | null = null;
  let decodedRefreshToken: JwtPayload | null = null;

  if(!decodedAccessToken && !decodedRefreshToken){
    console.log("No decoded")
  }

  try {
    if (accessToken) {
      decodedAccessToken = jwtDecode<JwtPayload>(accessToken);
    }
  } catch (error) {
    console.error("Invalid access token:", error);
  }

  try {
    if (refreshToken) {
      decodedRefreshToken = jwtDecode<JwtPayload>(refreshToken);
    }
  } catch (error) {
    console.error("Invalid refresh token:", error);
  }


  if (!accessToken && !refreshToken && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }
` `
  if (!accessToken && !refreshToken && request.nextUrl.pathname.startsWith("/doc")) {
    return NextResponse.rewrite(new URL("/auth", request.url));
  }
}
