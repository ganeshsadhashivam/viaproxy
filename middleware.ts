import { jwtVerify } from "jose";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("authToken")?.value;

  if (!token) {
    console.log("No auth token found. Redirecting to /login.");
    return NextResponse.redirect(new URL("/", req.url));
  }

  try {
    // Verify the JWT token using jose
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    console.log("Token successfully verified:", payload);

    // Allow access if the token is valid
    return NextResponse.next();
  } catch (error) {
    console.error("Token verification failed:", error);
    return NextResponse.redirect(new URL("/authentication/login", req.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*"], // Apply middleware to dashboard and its subroutes
};
