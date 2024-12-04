import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const supportedLocales = ["en", "fr"];
const defaultLocale = "en";

// Public routes
const publicRoutes = ["/authentication/login", "/authentication/register", "/"];

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("authToken")?.value;

  // Determine the locale
  const localeFromPath = req.nextUrl.pathname.split("/")[1];
  const localeFromCookie = req.cookies.get("NEXT_LOCALE")?.value;
  const localeFromHeader = req.headers.get("accept-language")?.split(",")[0];

  const locale = supportedLocales.includes(localeFromPath)
    ? localeFromPath
    : supportedLocales.includes(localeFromCookie)
    ? localeFromCookie
    : localeFromHeader || defaultLocale;

  const nextUrl = req.nextUrl.clone();

  // If the locale is missing from the URL, redirect to a localized path
  if (!supportedLocales.includes(localeFromPath)) {
    nextUrl.pathname = `/${locale}${req.nextUrl.pathname}`;
    const response = NextResponse.redirect(nextUrl);

    response.cookies.set("NEXT_LOCALE", locale, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    return response;
  }

  // Add locale to the headers for `next-intl`
  const response = NextResponse.next();
  response.headers.set("X-NEXT-INTL-LOCALE", locale);

  // Skip authentication checks for public routes
  const currentPath = req.nextUrl.pathname.replace(`/${locale}`, "");
  if (publicRoutes.includes(currentPath)) {
    return response;
  }

  // Authentication check for other routes
  if (!token) {
    nextUrl.pathname = `/${locale}/authentication/login`;
    return NextResponse.redirect(nextUrl);
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    await jwtVerify(token, secret);

    return response;
  } catch {
    nextUrl.pathname = `/${locale}/authentication/login`;
    return NextResponse.redirect(nextUrl);
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

//middlware og
// import { jwtVerify } from "jose";
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export async function middleware(req: NextRequest) {
//   const token = req.cookies.get("authToken")?.value;

//   if (!token) {
//     console.log("No auth token found. Redirecting to /authentication/login.");
//     return NextResponse.redirect(new URL("/authentication/login", req.url));
//   }

//   try {
//     // Verify the JWT token using jose
//     const secret = new TextEncoder().encode(process.env.JWT_SECRET);
//     const { payload } = await jwtVerify(token, secret);

//     console.log("Token successfully verified:", payload);

//     // Extract the role from the JWT payload
//     const role = payload.role;
//     console.log(role);

//     // Define role-based redirection paths
//     const roleToDashboardMap: Record<string, string> = {
//       admin: "/dashboard/admin",
//       student: "/dashboard/student",
//       merchant: "/dashboard/merchant",
//       trader: "/dashboard/trader",
//       citizen: "/dashboard/citizen",
//     };

//     // Check if the role exists and redirect to the respective dashboard
//     if (role && roleToDashboardMap[role]) {
//       const requestedPath = req.nextUrl.pathname;

//       // Redirect only if the user is not already in their respective dashboard
//       if (!requestedPath.startsWith(roleToDashboardMap[role])) {
//         console.log(`Redirecting ${role} to ${roleToDashboardMap[role]}`);
//         return NextResponse.redirect(
//           new URL(roleToDashboardMap[role], req.url)
//         );
//       }
//     } else {
//       // If the role is invalid or not mapped, redirect to login
//       console.log(
//         "Invalid or missing role. Redirecting to /authentication/login."
//       );
//       return NextResponse.redirect(new URL("/authentication/login", req.url));
//     }

//     // Allow access if the user is already in their respective dashboard
//     return NextResponse.next();
//   } catch (error) {
//     console.error("Token verification failed:", error);
//     return NextResponse.redirect(new URL("/authentication/login", req.url));
//   }
// }

// export const config = {
//   matcher: ["/dashboard/:path*"], // Apply middleware to dashboard and its subroutes
// };
