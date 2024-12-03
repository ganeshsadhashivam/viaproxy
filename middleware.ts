import { jwtVerify } from "jose";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("authToken")?.value;

  if (!token) {
    console.log("No auth token found. Redirecting to /authentication/login.");
    return NextResponse.redirect(new URL("/authentication/login", req.url));
  }

  try {
    // Verify the JWT token using jose
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    console.log("Token successfully verified:", payload);

    // Extract the role from the JWT payload
    const role = payload.role;
    console.log(role);

    // Define role-based redirection paths
    const roleToDashboardMap: Record<string, string> = {
      admin: "/dashboard/admin",
      student: "/dashboard/student",
      merchant: "/dashboard/merchant",
      trader: "/dashboard/trader",
      citizen: "/dashboard/citizen",
    };

    // Check if the role exists and redirect to the respective dashboard
    if (role && roleToDashboardMap[role]) {
      const requestedPath = req.nextUrl.pathname;

      // Redirect only if the user is not already in their respective dashboard
      if (!requestedPath.startsWith(roleToDashboardMap[role])) {
        console.log(`Redirecting ${role} to ${roleToDashboardMap[role]}`);
        return NextResponse.redirect(
          new URL(roleToDashboardMap[role], req.url)
        );
      }
    } else {
      // If the role is invalid or not mapped, redirect to login
      console.log(
        "Invalid or missing role. Redirecting to /authentication/login."
      );
      return NextResponse.redirect(new URL("/authentication/login", req.url));
    }

    // Allow access if the user is already in their respective dashboard
    return NextResponse.next();
  } catch (error) {
    console.error("Token verification failed:", error);
    return NextResponse.redirect(new URL("/authentication/login", req.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*"], // Apply middleware to dashboard and its subroutes
};

// import { jwtVerify } from "jose";
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export async function middleware(req: NextRequest) {
//   const token = req.cookies.get("authToken")?.value;

//   if (!token) {
//     console.log("No auth token found. Redirecting to /login.");
//     return NextResponse.redirect(new URL("/", req.url));
//   }

//   try {
//     // Verify the JWT token using jose
//     const secret = new TextEncoder().encode(process.env.JWT_SECRET);
//     const { payload } = await jwtVerify(token, secret);

//     console.log("Token successfully verified:", payload);

//     // Allow access if the token is valid
//     return NextResponse.next();
//   } catch (error) {
//     console.error("Token verification failed:", error);
//     return NextResponse.redirect(new URL("/authentication/login", req.url));
//   }
// }

// export const config = {
//   matcher: ["/dashboard/:path*"], // Apply middleware to dashboard and its subroutes
// };
