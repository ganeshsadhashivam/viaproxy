import { jwtVerify } from "jose";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const supportedLocales = ["en", "fr"];
const defaultLocale = "en";

// Define public routes
const publicRoutes = [
  "/",
  "/authentication/login",
  "/authentication/register",
  "/authentication/forgetpassword",
  "/authentication/resetpassword",
  "/authentication/verify",
];

// Define role-based dashboard paths
const roleRedirects: Record<string, string> = {
  admin: "/dashboard/admin",
  student: "/dashboard/student",
  merchant: "/dashboard/merchant",
  trader: "/dashboard/trader",
  citizen: "/dashboard/citizen",
};

// Helper function to check if a route is public
const isPublicRoute = (path: string, locale: string) => {
  const currentPath = path.replace(`/${locale}`, "") || "/";
  return publicRoutes.includes(currentPath);
};

// Helper function to check if the route is within a user's dashboard
const isDashboardRoute = (path: string, role: string) => {
  console.log("Checking dashboard route for path:", path, "and role:", role);
  return path.startsWith(`/dashboard/${role}`);
};

export async function middleware(req: NextRequest) {
  console.log("Middleware triggered. Processing request:", req.nextUrl.href);

  const pathname = req.nextUrl.pathname;
  console.log("Request pathname:", pathname);

  // Skip static assets and API routes
  if (
    /\.(jpg|jpeg|png|gif|webp|svg|css|js|ico|woff|woff2|ttf|eot)$/.test(
      pathname
    ) ||
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/")
  ) {
    console.log("Skipping static asset or API route:", pathname);
    return NextResponse.next();
  }

  const token = req.cookies.get("authToken")?.value;
  console.log("Auth token retrieved:", token ? "Token found" : "No token");

  const localeFromPath = pathname.split("/")[1];
  console.log("Locale extracted from path:", localeFromPath || "None");

  const localeFromCookie = req.cookies.get("NEXT_LOCALE")?.value;
  console.log("Locale extracted from cookie:", localeFromCookie || "None");

  const localeFromHeader = req.headers
    .get("accept-language")
    ?.split(",")[0]
    ?.split("-")[0];
  console.log("Locale extracted from header:", localeFromHeader || "None");

  // Determine the locale to use
  const local = supportedLocales.includes(localeFromPath)
    ? localeFromPath
    : supportedLocales.includes(localeFromCookie ? localeFromCookie : "")
    ? localeFromCookie
    : supportedLocales.includes(localeFromHeader ? localeFromHeader : "")
    ? localeFromHeader
    : defaultLocale;
  const locale = local ? local : "";
  console.log("Final locale determined:", locale);

  const nextUrl = req.nextUrl.clone();

  // Redirect root "/" to "/{locale}"
  if (pathname === "/") {
    console.log("Root path detected. Redirecting to:", `/${locale}`);
    nextUrl.pathname = `/${locale}`;
    return NextResponse.redirect(nextUrl);
  }

  // Redirect if locale is missing
  if (!supportedLocales.includes(localeFromPath)) {
    console.log(
      "Locale missing in path. Redirecting to:",
      `/${locale}${pathname}`
    );
    nextUrl.pathname = `/${locale}${pathname}`;
    const response = NextResponse.redirect(nextUrl);

    // Ensure the locale value is always a string
    response.cookies.set("NEXT_LOCALE", locale || defaultLocale, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });
    console.log("Locale cookie set to:", locale || defaultLocale);
    return response;
  }

  // if (!supportedLocales.includes(localeFromPath)) {
  //   console.log(
  //     "Locale missing in path. Redirecting to:",
  //     `/${locale}${pathname}`
  //   );
  //   nextUrl.pathname = `/${locale}${pathname}`;
  //   const response = NextResponse.redirect(nextUrl);
  //   response.cookies.set("NEXT_LOCALE", locale, {
  //     httpOnly: false,
  //     secure: process.env.NODE_ENV === "production",
  //     path: "/",
  //   });
  //   console.log("Locale cookie set to:", locale);
  //   return response;
  // }

  // Add locale to headers for `next-intl`
  const response = NextResponse.next();
  response.headers.set("X-NEXT-INTL-LOCALE", locale ? locale : "");
  console.log("Locale header added:", locale);

  // Check if the route is public
  if (isPublicRoute(pathname, locale)) {
    console.log("Public route detected. Allowing access:", pathname);
    return response;
  }

  // Redirect to login if no token
  if (!token) {
    console.log(
      "No token found. Redirecting to login:",
      `/${locale}/authentication/login`
    );
    nextUrl.pathname = `/${locale}/authentication/login`;
    return NextResponse.redirect(nextUrl);
  }

  // Verify token and handle role-based redirection
  try {
    console.log("Verifying auth token...");
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    console.log("Token verified successfully. Payload:", payload);

    const userRole = payload.role;
    console.log("User role extracted from token:", userRole);

    // Skip middleware for valid dashboard routes
    if (isDashboardRoute(pathname, userRole as string)) {
      console.log(
        "User navigating within their dashboard. Allowing access:",
        pathname
      );
      return response;
    }

    // Restrict access to other dashboards based on role
    if (roleRedirects[userRole as string]) {
      const allowedPath = `${roleRedirects[userRole as string]}`;
      const rolePath = `/${locale}${allowedPath}`;
      if (!pathname.startsWith(rolePath)) {
        console.log(
          `Unauthorized access attempt by ${userRole}. Redirecting to their dashboard:`,
          rolePath
        );
        nextUrl.pathname = rolePath;
        return NextResponse.redirect(nextUrl);
      }
    }

    return response;
  } catch (error) {
    console.error(
      "Token verification failed. Redirecting to login. Error:",
      error
    );
    nextUrl.pathname = `/${locale}/authentication/login`;
    return NextResponse.redirect(nextUrl);
  }
}

export const config = {
  matcher: [
    // Match all routes except those explicitly excluded
    "/((?!_next/static|_next/image|favicon.ico|api/|dashboard/:path*).*)",
    // Explicitly include the dashboard base routes for authentication handling
    "/dashboard",
  ],
};

// import { jwtVerify } from "jose";
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// const supportedLocales = ["en", "fr"];
// const defaultLocale = "en";

// // Define public routes
// const publicRoutes = [
//   "/",
//   "/authentication/login",
//   "/authentication/register",
//   "/authentication/forgetpassword",
//   "/authentication/resetpassword",
//   "/authentication/verify",
// ];

// // Define role-based dashboard paths
// const roleRedirects: Record<string, string> = {
//   admin: "/dashboard/admin",
//   student: "/dashboard/student",
//   merchant: "/dashboard/merchant",
//   trader: "/dashboard/trader",
//   citizen: "/dashboard/citizen",
// };

// // Helper function to check if a route is public
// const isPublicRoute = (path: string, locale: string) => {
//   const currentPath = path.replace(`/${locale}`, "") || "/";
//   return publicRoutes.includes(currentPath);
// };

// export async function middleware(req: NextRequest) {
//   console.log("Middleware started. Incoming request:", req.nextUrl.href);

//   const pathname = req.nextUrl.pathname;
//   console.log("Request pathname before root check:", pathname);

//   // Skip static assets and API routes
//   if (
//     /\.(jpg|jpeg|png|gif|webp|svg|css|js|ico|woff|woff2|ttf|eot)$/.test(
//       pathname
//     ) ||
//     pathname.startsWith("/api/") ||
//     pathname.startsWith("/_next/")
//   ) {
//     console.log("Static asset or API route accessed:", pathname);
//     return NextResponse.next();
//   }

//   const token = req.cookies.get("authToken")?.value;
//   console.log("Auth token:", token || "No token found");

//   const localeFromPath = pathname.split("/")[1];
//   console.log("Locale from path:", localeFromPath || "No locale in path");

//   const localeFromCookie = req.cookies.get("NEXT_LOCALE")?.value;
//   console.log("Locale from cookie:", localeFromCookie || "No locale in cookie");

//   const localeFromHeader = req.headers
//     .get("accept-language")
//     ?.split(",")[0]
//     ?.split("-")[0];
//   console.log("Locale from header:", localeFromHeader || "No locale in header");

//   // Determine the locale to use
//   const locale = supportedLocales.includes(localeFromPath)
//     ? localeFromPath
//     : supportedLocales.includes(localeFromCookie)
//     ? localeFromCookie
//     : supportedLocales.includes(localeFromHeader)
//     ? localeFromHeader
//     : defaultLocale;

//   console.log("Determined locale:", locale);

//   const nextUrl = req.nextUrl.clone();

//   // Redirect root "/" to "/{locale}"
//   if (pathname === "/") {
//     console.log("Root path detected. Redirecting to:", `/${locale}`);
//     nextUrl.pathname = `/${locale}`;
//     return NextResponse.redirect(nextUrl);
//   }

//   // Redirect if locale is missing
//   if (!supportedLocales.includes(localeFromPath)) {
//     console.log(
//       "Locale missing from path. Redirecting to:",
//       `/${locale}${pathname}`
//     );
//     nextUrl.pathname = `/${locale}${pathname}`;
//     const response = NextResponse.redirect(nextUrl);
//     response.cookies.set("NEXT_LOCALE", locale, {
//       httpOnly: false,
//       secure: process.env.NODE_ENV === "production",
//       path: "/",
//     });
//     console.log("Locale cookie set:", locale);
//     return response;
//   }

//   // Add locale to headers for `next-intl`
//   const response = NextResponse.next();
//   response.headers.set("X-NEXT-INTL-LOCALE", locale);
//   console.log("Locale added to headers:", locale);

//   // Check if the route is public
//   if (isPublicRoute(pathname, locale)) {
//     console.log("Public route accessed:", pathname);
//     return response;
//   }

//   // Redirect to login if no token
//   if (!token) {
//     console.log(
//       "No auth token found. Redirecting to login:",
//       `/${locale}/authentication/login`
//     );
//     nextUrl.pathname = `/${locale}/authentication/login`;
//     return NextResponse.redirect(nextUrl);
//   }

//   // Verify token and handle role-based redirection
//   try {
//     console.log("Verifying auth token...");
//     const secret = new TextEncoder().encode(process.env.JWT_SECRET);
//     const { payload } = await jwtVerify(token, secret);
//     console.log("Auth token verified successfully. Payload:", payload);

//     const userRole = payload.role;
//     console.log("User role detected:", userRole);

//     // Allow navigation within the user's dashboard
//     const dashboardPath = `/dashboard/${userRole}`;
//     if (pathname.startsWith(dashboardPath)) {
//       console.log(`Access allowed to dashboard path: ${pathname}`);
//       return response;
//     }

//     // Redirect unauthorized access to the user's dashboard
//     if (roleRedirects[userRole]) {
//       const allowedPath = `${roleRedirects[userRole]}`;
//       const rolePath = `/${locale}${allowedPath}`;
//       if (!pathname.startsWith(rolePath)) {
//         console.log(
//           `Unauthorized access attempt by ${userRole}. Redirecting to their dashboard:`,
//           rolePath
//         );
//         nextUrl.pathname = rolePath;
//         return NextResponse.redirect(nextUrl);
//       }
//     }

//     return response;
//   } catch (error) {
//     console.error("Auth token verification failed:", error);
//     nextUrl.pathname = `/${locale}/authentication/login`;
//     return NextResponse.redirect(nextUrl);
//   }
// }

// export const config = {
//   matcher: [
//     "/((?!_next/static|_next/image|favicon.ico|api/).*)",
//     "/dashboard/:path*",
//   ], // Exclude static assets and API routes
// };

// //middleware triggred for all routes
// import { jwtVerify } from "jose";
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// const supportedLocales = ["en", "fr"];
// const defaultLocale = "en";

// // Define public routes
// const publicRoutes = [
//   "/",
//   "/authentication/login",
//   "/authentication/register",
//   "/authentication/forgetpassword",
//   "/authentication/resetpassword",
//   "/authentication/verify",
// ];

// // Define role-based dashboard paths
// const roleRedirects: Record<string, string> = {
//   admin: "/dashboard/admin",
//   student: "/dashboard/student",
//   merchant: "/dashboard/merchant",
//   trader: "/dashboard/trader",
//   citizen: "/dashboard/citizen",
// };

// // Helper function to check if a route is public
// const isPublicRoute = (path: string, locale: string) => {
//   const currentPath = path.replace(`/${locale}`, "") || "/";
//   return publicRoutes.includes(currentPath);
// };

// export async function middleware(req: NextRequest) {
//   console.log("Middleware started. Incoming request:", req.nextUrl.href);

//   const pathname = req.nextUrl.pathname;
//   console.log("Request pathname before root check:", pathname);

//   // Skip static assets and API routes
//   if (
//     /\.(jpg|jpeg|png|gif|webp|svg|css|js|ico|woff|woff2|ttf|eot)$/.test(
//       pathname
//     ) ||
//     pathname.startsWith("/api/")
//   ) {
//     console.log("Static asset or API route accessed:", pathname);
//     return NextResponse.next();
//   }

//   const token = req.cookies.get("authToken")?.value;
//   console.log("Auth token:", token || "No token found");

//   const localeFromPath = pathname.split("/")[1];
//   console.log("Locale from path:", localeFromPath || "No locale in path");

//   const localeFromCookie = req.cookies.get("NEXT_LOCALE")?.value;
//   console.log("Locale from cookie:", localeFromCookie || "No locale in cookie");

//   const localeFromHeader = req.headers
//     .get("accept-language")
//     ?.split(",")[0]
//     ?.split("-")[0];
//   console.log("Locale from header:", localeFromHeader || "No locale in header");

//   // Determine the locale to use
//   const locale = supportedLocales.includes(localeFromPath)
//     ? localeFromPath
//     : supportedLocales.includes(localeFromCookie)
//     ? localeFromCookie
//     : supportedLocales.includes(localeFromHeader)
//     ? localeFromHeader
//     : defaultLocale;

//   console.log("Determined locale:", locale);

//   const nextUrl = req.nextUrl.clone();

//   // Redirect root "/" to "/{locale}"
//   if (pathname === "/") {
//     console.log("Root path detected. Redirecting to:", `/${locale}`);
//     nextUrl.pathname = `/${locale}`;
//     return NextResponse.redirect(nextUrl);
//   }

//   // Redirect if locale is missing
//   if (!supportedLocales.includes(localeFromPath)) {
//     console.log(
//       "Locale missing from path. Redirecting to:",
//       `/${locale}${pathname}`
//     );
//     nextUrl.pathname = `/${locale}${pathname}`;
//     const response = NextResponse.redirect(nextUrl);
//     response.cookies.set("NEXT_LOCALE", locale, {
//       httpOnly: false,
//       secure: process.env.NODE_ENV === "production",
//       path: "/",
//     });
//     console.log("Locale cookie set:", locale);
//     return response;
//   }

//   // Add locale to headers for `next-intl`
//   const response = NextResponse.next();
//   response.headers.set("X-NEXT-INTL-LOCALE", locale);
//   console.log("Locale added to headers:", locale);

//   // Check if the route is public
//   if (isPublicRoute(pathname, locale)) {
//     console.log("Public route accessed:", pathname);
//     return response;
//   }

//   // Redirect to login if no token
//   if (!token) {
//     console.log(
//       "No auth token found. Redirecting to login:",
//       `/${locale}/authentication/login`
//     );
//     nextUrl.pathname = `/${locale}/authentication/login`;
//     return NextResponse.redirect(nextUrl);
//   }

//   // Verify token and handle role-based redirection
//   try {
//     console.log("Verifying auth token...");
//     const secret = new TextEncoder().encode(process.env.JWT_SECRET);
//     const { payload } = await jwtVerify(token, secret);
//     console.log("Auth token verified successfully. Payload:", payload);

//     const userRole = payload.role;
//     console.log("User role detected:", userRole);

//     // Restrict access to other dashboards based on role
//     if (roleRedirects[userRole]) {
//       const allowedPath = `${roleRedirects[userRole]}`;
//       const rolePath = `/${locale}${allowedPath}`;

//       if (!pathname.startsWith(rolePath)) {
//         console.log(
//           `Unauthorized access attempt by ${userRole}. Redirecting to their dashboard:`,
//           rolePath
//         );
//         nextUrl.pathname = rolePath;
//         return NextResponse.redirect(nextUrl);
//       }
//     }

//     return response;
//   } catch (error) {
//     console.error("Auth token verification failed:", error);
//     nextUrl.pathname = `/${locale}/authentication/login`;
//     return NextResponse.redirect(nextUrl);
//   }
// }

// export const config = {
//   matcher: [
//     "/((?!_next/static|_next/image|favicon.ico|api/).*)",
//     "/dashboard/:path*",
//   ], // Exclude static assets and API routes
// };

//perfectly working
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { jwtVerify } from "jose";

// const supportedLocales = ["en", "fr"];
// const defaultLocale = "en";

// // Define public routes
// const publicRoutes = [
//   "/",
//   "/authentication/login",
//   "/authentication/register",
//   "/authentication/forgetpassword",
//   "/authentication/resetpassword",
//   "/authentication/verify",
// ];

// // Define role-based dashboard paths
// const roleRedirects: Record<string, string> = {
//   admin: "/dashboard/admin",
//   user: "/dashboard/user",
//   student: "/dashboard/student",
// };

// // Helper function to check if a route is public
// const isPublicRoute = (path: string, locale: string) => {
//   const currentPath = path.replace(`/${locale}`, "") || "/";
//   return publicRoutes.includes(currentPath);
// };

// export async function middleware(req: NextRequest) {
//   console.log("Middleware started. Incoming request:", req.nextUrl.href);

//   const pathname = req.nextUrl.pathname;
//   console.log("Request pathname before root check:", pathname);

//   // Skip static assets and API routes
//   if (
//     /\.(jpg|jpeg|png|gif|webp|svg|css|js|ico|woff|woff2|ttf|eot)$/.test(
//       pathname
//     ) ||
//     pathname.startsWith("/api/")
//   ) {
//     console.log("Static asset or API route accessed:", pathname);
//     return NextResponse.next();
//   }

//   const token = req.cookies.get("authToken")?.value;
//   console.log("Auth token:", token || "No token found");

//   const localeFromPath = pathname.split("/")[1];
//   console.log("Locale from path:", localeFromPath || "No locale in path");

//   const localeFromCookie = req.cookies.get("NEXT_LOCALE")?.value;
//   console.log("Locale from cookie:", localeFromCookie || "No locale in cookie");

//   const localeFromHeader = req.headers
//     .get("accept-language")
//     ?.split(",")[0]
//     ?.split("-")[0];
//   console.log("Locale from header:", localeFromHeader || "No locale in header");

//   // Determine the locale to use
//   const locale = supportedLocales.includes(localeFromPath)
//     ? localeFromPath
//     : supportedLocales.includes(localeFromCookie)
//     ? localeFromCookie
//     : supportedLocales.includes(localeFromHeader)
//     ? localeFromHeader
//     : defaultLocale;

//   console.log("Determined locale:", locale);

//   const nextUrl = req.nextUrl.clone();

//   // Redirect root "/" to "/{locale}"
//   if (pathname === "/") {
//     console.log("Root path detected. Redirecting to:", `/${locale}`);
//     nextUrl.pathname = `/${locale}`;
//     return NextResponse.redirect(nextUrl);
//   }

//   // Redirect if locale is missing
//   if (!supportedLocales.includes(localeFromPath)) {
//     console.log(
//       "Locale missing from path. Redirecting to:",
//       `/${locale}${pathname}`
//     );
//     nextUrl.pathname = `/${locale}${pathname}`;
//     const response = NextResponse.redirect(nextUrl);
//     response.cookies.set("NEXT_LOCALE", locale, {
//       httpOnly: false,
//       secure: process.env.NODE_ENV === "production",
//       path: "/",
//     });
//     console.log("Locale cookie set:", locale);
//     return response;
//   }

//   // Add locale to headers for `next-intl`
//   const response = NextResponse.next();
//   response.headers.set("X-NEXT-INTL-LOCALE", locale);
//   console.log("Locale added to headers:", locale);

//   // Check if the route is public
//   if (isPublicRoute(pathname, locale)) {
//     console.log("Public route accessed:", pathname);
//     return response;
//   }

//   // Redirect to login if no token
//   if (!token) {
//     console.log(
//       "No auth token found. Redirecting to login:",
//       `/${locale}/authentication/login`
//     );
//     nextUrl.pathname = `/${locale}/authentication/login`;
//     return NextResponse.redirect(nextUrl);
//   }

//   // Verify token and handle role-based redirection
//   try {
//     console.log("Verifying auth token...");
//     const secret = new TextEncoder().encode(process.env.JWT_SECRET);
//     const { payload } = await jwtVerify(token, secret);
//     console.log("Auth token verified successfully. Payload:", payload);

//     const userRole = payload.role;
//     console.log("User role detected:", userRole);

//     // Restrict access to other dashboards based on role
//     if (roleRedirects[userRole]) {
//       const allowedPath = `${roleRedirects[userRole]}`;
//       const rolePath = `/${locale}${allowedPath}`;

//       if (!pathname.startsWith(rolePath)) {
//         console.log(
//           `Unauthorized access attempt by ${userRole}. Redirecting to their dashboard:`,
//           rolePath
//         );
//         nextUrl.pathname = rolePath;
//         return NextResponse.redirect(nextUrl);
//       }
//     }

//     return response;
//   } catch (error) {
//     console.error("Auth token verification failed:", error);
//     nextUrl.pathname = `/${locale}/authentication/login`;
//     return NextResponse.redirect(nextUrl);
//   }
// }

// export const config = {
//   matcher: [
//     "/((?!_next/static|_next/image|favicon.ico|api/).*)",

//   ], // Exclude API routes from middleware
// };

// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { jwtVerify } from "jose";

// const supportedLocales = ["en", "fr"];
// const defaultLocale = "en";

// // Define public routes
// const publicRoutes = [
//   "/",
//   "/authentication/login",
//   "/authentication/register",
//   "/authentication/forgetpassword",
//   "/authentication/resetpassword",
//   "/authentication/verify",
// ];

// // Define role-based dashboard paths
// const roleRedirects: Record<string, string> = {
//   admin: "/dashboard/admin",
//   user: "/dashboard/user",
//   student: "/dashboard/student",
// };

// // Helper function to check if a route is public
// const isPublicRoute = (path: string, locale: string) => {
//   const currentPath = path.replace(`/${locale}`, "") || "/";
//   return publicRoutes.includes(currentPath);
// };

// export async function middleware(req: NextRequest) {
//   console.log("Middleware started. Incoming request:", req.nextUrl.href);

//   const pathname = req.nextUrl.pathname;
//   console.log("Request pathname before root check:", pathname);

//   // Skip static assets and API routes
//   if (
//     /\.(jpg|jpeg|png|gif|webp|svg|css|js|ico|woff|woff2|ttf|eot)$/.test(
//       pathname
//     ) ||
//     pathname.startsWith("/api/")
//   ) {
//     console.log("Static asset or API route accessed:", pathname);
//     return NextResponse.next();
//   }

//   const token = req.cookies.get("authToken")?.value;
//   console.log("Auth token:", token || "No token found");

//   const localeFromPath = pathname.split("/")[1];
//   console.log("Locale from path:", localeFromPath || "No locale in path");

//   const localeFromCookie = req.cookies.get("NEXT_LOCALE")?.value;
//   console.log("Locale from cookie:", localeFromCookie || "No locale in cookie");

//   const localeFromHeader = req.headers
//     .get("accept-language")
//     ?.split(",")[0]
//     ?.split("-")[0];
//   console.log("Locale from header:", localeFromHeader || "No locale in header");

//   // Determine the locale to use
//   const locale = supportedLocales.includes(localeFromPath)
//     ? localeFromPath
//     : supportedLocales.includes(localeFromCookie)
//     ? localeFromCookie
//     : supportedLocales.includes(localeFromHeader)
//     ? localeFromHeader
//     : defaultLocale;

//   console.log("Determined locale:", locale);

//   const nextUrl = req.nextUrl.clone();

//   // Redirect root "/" to "/{locale}"
//   if (pathname === "/") {
//     console.log("Root path detected. Redirecting to:", `/${locale}`);
//     nextUrl.pathname = `/${locale}`;
//     return NextResponse.redirect(nextUrl);
//   }

//   // Redirect if locale is missing
//   if (!supportedLocales.includes(localeFromPath)) {
//     console.log(
//       "Locale missing from path. Redirecting to:",
//       `/${locale}${pathname}`
//     );
//     nextUrl.pathname = `/${locale}${pathname}`;
//     const response = NextResponse.redirect(nextUrl);
//     response.cookies.set("NEXT_LOCALE", locale, {
//       httpOnly: false,
//       secure: process.env.NODE_ENV === "production",
//       path: "/",
//     });
//     console.log("Locale cookie set:", locale);
//     return response;
//   }

//   // Add locale to headers for `next-intl`
//   const response = NextResponse.next();
//   response.headers.set("X-NEXT-INTL-LOCALE", locale);
//   console.log("Locale added to headers:", locale);

//   // Check if the route is public
//   if (isPublicRoute(pathname, locale)) {
//     console.log("Public route accessed:", pathname);
//     return response;
//   }

//   // Redirect to login if no token
//   if (!token) {
//     console.log(
//       "No auth token found. Redirecting to login:",
//       `/${locale}/authentication/login`
//     );
//     nextUrl.pathname = `/${locale}/authentication/login`;
//     return NextResponse.redirect(nextUrl);
//   }

//   // Verify token and handle role-based redirection
//   try {
//     console.log("Verifying auth token...");
//     const secret = new TextEncoder().encode(process.env.JWT_SECRET);
//     const { payload } = await jwtVerify(token, secret);
//     console.log("Auth token verified successfully. Payload:", payload);

//     const userRole = payload.role;
//     console.log("User role detected:", userRole);

//     // Restrict access to other dashboards based on role
//     if (roleRedirects[userRole]) {
//       const allowedPath = `${roleRedirects[userRole]}`;
//       const rolePath = `/${locale}${allowedPath}`;

//       if (!pathname.startsWith(rolePath)) {
//         console.log(
//           `Unauthorized access attempt by ${userRole}. Redirecting to their dashboard:`,
//           rolePath
//         );
//         nextUrl.pathname = rolePath;
//         return NextResponse.redirect(nextUrl);
//       }
//     }

//     return response;
//   } catch (error) {
//     console.error("Auth token verification failed:", error);
//     nextUrl.pathname = `/${locale}/authentication/login`;
//     return NextResponse.redirect(nextUrl);
//   }
// }

// export const config = {
//   matcher: ["/((?!_next/static|_next/image|favicon.ico|api/).*)"], // Exclude API routes from middleware
// };

//this works for api also
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { jwtVerify } from "jose";

// const supportedLocales = ["en", "fr"];
// const defaultLocale = "en";

// // Define public routes
// const publicRoutes = [
//   "/",
//   "/authentication/login",
//   "/authentication/register",
//   "/authentication/forgetpassword",
//   "/authentication/resetpassword",
//   "/authentication/verify",
// ];

// // Define role-based dashboard paths
// const roleRedirects: Record<string, string> = {
//   admin: "/dashboard/admin",
//   user: "/dashboard/user",
//   student: "/dashboard/student",
// };

// // Helper function to check if a route is public
// const isPublicRoute = (path: string, locale: string) => {
//   const currentPath = path.replace(`/${locale}`, "") || "/";
//   return publicRoutes.includes(currentPath);
// };

// export async function middleware(req: NextRequest) {
//   console.log("Middleware started. Incoming request:", req.nextUrl.href);

//   const pathname = req.nextUrl.pathname;
//   console.log("Request pathname before root check:", pathname);

//   // Skip static assets
//   if (
//     /\.(jpg|jpeg|png|gif|webp|svg|css|js|ico|woff|woff2|ttf|eot)$/.test(
//       pathname
//     )
//   ) {
//     console.log("Static asset accessed:", pathname);
//     return NextResponse.next();
//   }

//   // Skip API routes
//   if (pathname.startsWith("/api/")) {
//     console.log("API route accessed:", pathname);
//     return NextResponse.next();
//   }

//   const token = req.cookies.get("authToken")?.value;
//   console.log("Auth token:", token || "No token found");

//   const localeFromPath = pathname.split("/")[1];
//   console.log("Locale from path:", localeFromPath || "No locale in path");

//   const localeFromCookie = req.cookies.get("NEXT_LOCALE")?.value;
//   console.log("Locale from cookie:", localeFromCookie || "No locale in cookie");

//   const localeFromHeader = req.headers
//     .get("accept-language")
//     ?.split(",")[0]
//     ?.split("-")[0];
//   console.log("Locale from header:", localeFromHeader || "No locale in header");

//   // Determine the locale to use
//   const locale = supportedLocales.includes(localeFromPath)
//     ? localeFromPath
//     : supportedLocales.includes(localeFromCookie)
//     ? localeFromCookie
//     : supportedLocales.includes(localeFromHeader)
//     ? localeFromHeader
//     : defaultLocale;

//   console.log("Determined locale:", locale);

//   const nextUrl = req.nextUrl.clone();

//   // Redirect root "/" to "/{locale}"
//   if (pathname === "/") {
//     console.log("Root path detected. Redirecting to:", `/${locale}`);
//     nextUrl.pathname = `/${locale}`;
//     return NextResponse.redirect(nextUrl);
//   }

//   // Redirect if locale is missing
//   if (!supportedLocales.includes(localeFromPath)) {
//     console.log(
//       "Locale missing from path. Redirecting to:",
//       `/${locale}${pathname}`
//     );
//     nextUrl.pathname = `/${locale}${pathname}`;
//     const response = NextResponse.redirect(nextUrl);
//     response.cookies.set("NEXT_LOCALE", locale, {
//       httpOnly: false,
//       secure: process.env.NODE_ENV === "production",
//       path: "/",
//     });
//     console.log("Locale cookie set:", locale);
//     return response;
//   }

//   // Add locale to headers for `next-intl`
//   const response = NextResponse.next();
//   response.headers.set("X-NEXT-INTL-LOCALE", locale);
//   console.log("Locale added to headers:", locale);

//   // Check if the route is public
//   if (isPublicRoute(pathname, locale)) {
//     console.log("Public route accessed:", pathname);
//     return response;
//   }

//   // Redirect to login if no token
//   if (!token) {
//     console.log(
//       "No auth token found. Redirecting to login:",
//       `/${locale}/authentication/login`
//     );
//     nextUrl.pathname = `/${locale}/authentication/login`;
//     return NextResponse.redirect(nextUrl);
//   }

//   // Verify token and handle role-based redirection
//   try {
//     console.log("Verifying auth token...");
//     const secret = new TextEncoder().encode(process.env.JWT_SECRET);
//     const { payload } = await jwtVerify(token, secret);
//     console.log("Auth token verified successfully. Payload:", payload);

//     const userRole = payload.role;
//     console.log("User role detected:", userRole);

//     // Check if the role has a specific redirect path
//     if (roleRedirects[userRole]) {
//       const rolePath = `/${locale}${roleRedirects[userRole]}`;
//       if (!pathname.startsWith(rolePath)) {
//         console.log(`Redirecting ${userRole} to role-based path:`, rolePath);
//         nextUrl.pathname = rolePath;
//         return NextResponse.redirect(nextUrl);
//       }
//     }

//     return response;
//   } catch (error) {
//     console.error("Auth token verification failed:", error);
//     nextUrl.pathname = `/${locale}/authentication/login`;
//     return NextResponse.redirect(nextUrl);
//   }
// }

// export const config = {
//   matcher: ["/((?!_next/static|_next/image|favicon.ico|api/).*)"], // Exclude API routes from middleware
// };

//working
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { jwtVerify } from "jose";

// const supportedLocales = ["en", "fr"];
// const defaultLocale = "en";

// // Define public routes
// const publicRoutes = ["/", "/authentication/login", "/authentication/register"];

// // Helper function to check if a route is public
// const isPublicRoute = (path: string, locale: string) => {
//   const currentPath = path.replace(`/${locale}`, "") || "/";
//   return publicRoutes.includes(currentPath);
// };

// export async function middleware(req: NextRequest) {
//   console.log("Middleware started. Incoming request:", req.nextUrl.href);

//   const pathname = req.nextUrl.pathname;
//   console.log("Request pathname before root check:", pathname);

//   // Skip static assets
//   if (/\.(jpg|jpeg|png|gif|webp|svg|css|js|ico)$/.test(pathname)) {
//     console.log("Static asset accessed:", pathname);
//     return NextResponse.next();
//   }

//   const token = req.cookies.get("authToken")?.value;
//   console.log("Auth token:", token || "No token found");

//   const localeFromPath = pathname.split("/")[1];
//   console.log("Locale from path:", localeFromPath || "No locale in path");

//   const localeFromCookie = req.cookies.get("NEXT_LOCALE")?.value;
//   console.log("Locale from cookie:", localeFromCookie || "No locale in cookie");

//   const localeFromHeader = req.headers
//     .get("accept-language")
//     ?.split(",")[0]
//     ?.split("-")[0];
//   console.log("Locale from header:", localeFromHeader || "No locale in header");

//   // Determine the locale to use
//   const locale = supportedLocales.includes(localeFromPath)
//     ? localeFromPath
//     : supportedLocales.includes(localeFromCookie)
//     ? localeFromCookie
//     : supportedLocales.includes(localeFromHeader)
//     ? localeFromHeader
//     : defaultLocale;

//   console.log("Determined locale:", locale);

//   const nextUrl = req.nextUrl.clone();

//   // Redirect root "/" to "/{locale}"
//   if (pathname === "/") {
//     console.log("Root path detected. Redirecting to:", `/${locale}`);
//     nextUrl.pathname = `/${locale}`;
//     return NextResponse.redirect(nextUrl);
//   }

//   // Redirect if locale is missing
//   if (!supportedLocales.includes(localeFromPath)) {
//     console.log(
//       "Locale missing from path. Redirecting to:",
//       `/${locale}${pathname}`
//     );
//     nextUrl.pathname = `/${locale}${pathname}`;
//     const response = NextResponse.redirect(nextUrl);
//     response.cookies.set("NEXT_LOCALE", locale, {
//       httpOnly: false,
//       secure: process.env.NODE_ENV === "production",
//       path: "/",
//     });
//     console.log("Locale cookie set:", locale);
//     return response;
//   }

//   // Add locale to headers for `next-intl`
//   const response = NextResponse.next();
//   response.headers.set("X-NEXT-INTL-LOCALE", locale);
//   console.log("Locale added to headers:", locale);

//   // Check if the route is public
//   if (isPublicRoute(pathname, locale)) {
//     console.log("Public route accessed:", pathname);
//     return response;
//   }

//   // Redirect to login if no token
//   if (!token) {
//     console.log(
//       "No auth token found. Redirecting to login:",
//       `/${locale}/authentication/login`
//     );
//     nextUrl.pathname = `/${locale}/authentication/login`;
//     return NextResponse.redirect(nextUrl);
//   }

//   // Verify token
//   try {
//     console.log("Verifying auth token...");
//     const secret = new TextEncoder().encode(process.env.JWT_SECRET);
//     await jwtVerify(token, secret);
//     console.log("Auth token verified successfully");
//     return response;
//   } catch (error) {
//     console.error("Auth token verification failed:", error);
//     nextUrl.pathname = `/${locale}/authentication/login`;
//     return NextResponse.redirect(nextUrl);
//   }
// }

// export const config = {
//   matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
// };

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
