"use client";

import { useForm } from "react-hook-form";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { setUserRole } from "@/store/slices/authSlice";
import { useDispatch } from "react-redux";
import { useTranslations } from "next-intl";

export default function LoginPage() {
  const t = useTranslations("login");
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: any) => {
    try {
      const res = await fetch("/api/authentication/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      const responseData = await res.json();
      console.log(responseData);
      if (res.ok) {
        dispatch(setUserRole(responseData.user.role));
        toast.success(t("loginButton") + " " + t("successful"));
        router.push("/dashboard");
      } else {
        toast.error(responseData.error || t("invalidCredentials"));
      }
    } catch (error) {
      toast.error(t("unexpectedError"));
    }
  };

  return (
    <section className="bg-white">
      <div className="flex flex-col lg:flex-row lg:min-h-screen">
        {/* Left Section */}
        <section className="relative flex h-32 items-end bg-gray-900 lg:w-1/2 lg:h-full">
          <Image
            src="/login.jpg"
            layout="responsive"
            width={100}
            height={100}
            alt="login"
          />
        </section>

        {/* Right Section */}
        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:w-1/2 lg:px-16 lg:py-12">
          <div className="w-full max-w-xl">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              {t("welcomeBack")}
            </h1>
            <p className="mt-2 text-sm text-gray-600">{t("logInToContinue")}</p>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-8 space-y-6"
              noValidate
            >
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t("email")}
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email", {
                    required: t("emailRequired"),
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: t("invalidEmailFormat"),
                    },
                  })}
                  className={`h-10 p-2 mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm ${
                    errors.email ? "border-red-500" : ""
                  }`}
                />
                <p className="text-sm text-red-500 mt-1">
                  {errors.email?.message as string}
                </p>
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t("password")}
                </label>
                <input
                  type="password"
                  id="password"
                  {...register("password", {
                    required: t("passwordRequired"),
                    minLength: {
                      value: 6,
                      message: t("passwordMinLength"),
                    },
                  })}
                  className={`h-10 p-2 mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm ${
                    errors.password ? "border-red-500" : ""
                  }`}
                />
                <p className="text-sm text-red-500 mt-1">
                  {errors.password?.message as string}
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className={`w-full py-2 rounded-md text-white transition-colors ${
                  errors.email || errors.password
                    ? "bg-red-400"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {t("loginButton")}
              </button>

              {/* Links */}
              <div className="flex justify-between mt-4 text-sm">
                <Link
                  href="/authentication/forgotpassword"
                  className="text-blue-500 hover:underline"
                >
                  {t("forgotPassword")}
                </Link>
                <Link
                  href="/authentication/register"
                  className="text-blue-500 hover:underline"
                >
                  {t("registerPrompt")}
                </Link>
              </div>
            </form>
          </div>
        </main>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </section>
  );
}

//before translation code
// "use client";

// import { useForm } from "react-hook-form";
// import Link from "next/link";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import { setUserRole } from "@/store/slices/authSlice";
// import { Dispatch } from "@reduxjs/toolkit";
// import { useDispatch } from "react-redux";
// import { useTranslations } from "next-intl";

// export default function LoginPage() {
//   const t = useTranslations("login");
//   const dispatch = useDispatch();
//   const router = useRouter();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   });

//   const onSubmit = async (data: any) => {
//     try {
//       const res = await fetch("/api/authentication/login", {
//         method: "POST",
//         body: JSON.stringify(data),
//         headers: { "Content-Type": "application/json" },
//       });
//       const responseData = await res.json();
//       console.log(responseData.user.role);
//       if (res.ok) {
//         dispatch(setUserRole(responseData.user.role));
//         toast.success("Login successful!");
//         router.push("/dashboard");
//       } else {
//         toast.error(responseData.error || "Invalid credentials.");
//       }
//     } catch (error) {
//       toast.error("An unexpected error occurred.");
//     }
//   };

//   return (
//     <section className="bg-white">
//       <div className="flex flex-col lg:flex-row lg:min-h-screen">
//         {/* Left Section */}
//         <section className="relative flex h-32 items-end bg-gray-900 lg:w-1/2 lg:h-full">
//           <Image
//             src="/login.jpg"
//             layout="responsive"
//             width={100}
//             height={100}
//             alt="login"
//           />
//         </section>

//         {/* Right Section */}
//         <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:w-1/2 lg:px-16 lg:py-12">
//           <div className="w-full max-w-xl">
//             <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
//               {t("Welcome Back")}
//             </h1>
//             <p className="mt-2 text-sm text-gray-600">
//               {t("Please log in to your account to continue.")}
//             </p>
//             <form
//               onSubmit={handleSubmit(onSubmit)}
//               className="mt-8 space-y-6"
//               noValidate
//             >
//               {/* Email Field */}
//               <div>
//                 <label
//                   htmlFor="email"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   {t("Email")}
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   {...register("email", {
//                     required: "Email is required",
//                     pattern: {
//                       value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//                       message: "Invalid email format",
//                     },
//                   })}
//                   className={`h-10 p-2 mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm ${
//                     errors.email ? "border-red-500" : ""
//                   }`}
//                 />
//                 <p className="text-sm text-red-500 mt-1">
//                   {errors.email?.message as string}
//                 </p>
//               </div>

//               {/* Password Field */}
//               <div>
//                 <label
//                   htmlFor="password"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   {t("Password")}
//                 </label>
//                 <input
//                   type="password"
//                   id="password"
//                   {...register("password", {
//                     required: "Password is required",
//                     minLength: {
//                       value: 6,
//                       message: "Password must be at least 6 characters",
//                     },
//                   })}
//                   className={`h-10 p-2 mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm ${
//                     errors.password ? "border-red-500" : ""
//                   }`}
//                 />
//                 <p className="text-sm text-red-500 mt-1">
//                   {errors.password?.message as string}
//                 </p>
//               </div>

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 className={`w-full py-2 rounded-md text-white transition-colors ${
//                   errors.email || errors.password
//                     ? "bg-red-400"
//                     : "bg-blue-600 hover:bg-blue-700"
//                 }`}
//               >
//                 {t(" Login")}
//               </button>

//               {/* Links */}
//               <div className="flex justify-between mt-4 text-sm">
//                 <Link
//                   href="/authentication/forgotpassword"
//                   className="text-blue-500 hover:underline"
//                 >
//                   {t(" Forgot Password?")}
//                 </Link>
//                 <Link
//                   href="/authentication/register"
//                   className="text-blue-500 hover:underline"
//                 >
//                   {t("  New User? Register Here")}
//                 </Link>
//               </div>
//             </form>
//           </div>
//         </main>
//       </div>
//       <ToastContainer position="top-right" autoClose={3000} />
//     </section>
//   );
// }

// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useRouter } from "next/navigation";
// import Image from "next/image";

// export default function LoginPage() {
//   const router = useRouter();
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [isLoading, setIsLoading] = useState(false);

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     try {
//       const res = await fetch("/api/authentication/login", {
//         method: "POST",
//         body: JSON.stringify(form),
//         headers: { "Content-Type": "application/json" },
//       });
//       const data = await res.json();
//       if (res.ok) {
//         toast.success("Login successful!");
//         router.push("/dashboard");
//       } else {
//         toast.error(data.error || "Invalid credentials.");
//       }
//     } catch (error) {
//       toast.error("An unexpected error occurred.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <section className="bg-white">
//       <div className="flex flex-col lg:flex-row lg:min-h-screen">
//         {/* Left Section */}
//         <section className="relative flex h-32 items-end bg-gray-900 lg:w-1/2 lg:h-full">
//           <Image
//             src="/login.jpg"
//             layout="responsive"
//             width={100}
//             height={100}
//             alt="login"
//           />
//         </section>

//         {/* Right Section */}
//         <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:w-1/2 lg:px-16 lg:py-12">
//           <div className="w-full max-w-xl">
//             <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
//               Welcome Back
//             </h1>
//             <p className="mt-2 text-sm text-gray-600">
//               Please log in to your account to continue.
//             </p>
//             <form onSubmit={handleLogin} className="mt-8 space-y-6">
//               {/* Email Field */}
//               <div>
//                 <label
//                   htmlFor="email"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   value={form.email}
//                   onChange={(e) => setForm({ ...form, email: e.target.value })}
//                   required
//                   className="h-10 p-2 mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
//                 />
//               </div>

//               {/* Password Field */}
//               <div>
//                 <label
//                   htmlFor="password"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Password
//                 </label>
//                 <input
//                   type="password"
//                   id="password"
//                   value={form.password}
//                   onChange={(e) =>
//                     setForm({ ...form, password: e.target.value })
//                   }
//                   required
//                   className="h-10 p-2 mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
//                 />
//               </div>

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 className={`w-full py-2 rounded-md text-white transition-colors ${
//                   isLoading
//                     ? "bg-blue-400 cursor-not-allowed"
//                     : "bg-blue-600 hover:bg-blue-700"
//                 }`}
//                 disabled={isLoading}
//               >
//                 {isLoading ? "Logging in..." : "Login"}
//               </button>

//               {/* Links */}
//               <div className="flex justify-between mt-4 text-sm">
//                 <Link
//                   href="/authentication/forgotpassword"
//                   className="text-blue-500 hover:underline"
//                 >
//                   Forgot Password?
//                 </Link>
//                 <Link
//                   href="/authentication/register"
//                   className="text-blue-500 hover:underline"
//                 >
//                   New User? Register Here
//                 </Link>
//               </div>
//             </form>
//           </div>
//         </main>
//       </div>
//       <ToastContainer position="top-right" autoClose={3000} />
//     </section>
//   );
// }

// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useRouter } from "next/navigation";

// export default function LoginPage() {
//   const router = useRouter();
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [isLoading, setIsLoading] = useState(false);

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     try {
//       const res = await fetch("/api/authentication/login", {
//         method: "POST",
//         body: JSON.stringify(form),
//         headers: { "Content-Type": "application/json" },
//       });
//       const data = await res.json();
//       if (res.ok) {
//         toast.success("Login successful!");
//         router.push("/dashboard");
//       } else {
//         toast.error(data.error || "Invalid credentials.");
//       }
//     } catch (error) {
//       toast.error("An unexpected error occurred.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (

//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
//       <form
//         onSubmit={handleLogin}
//         className="w-full max-w-md bg-white p-6 rounded-lg shadow-md"
//       >
//         <h1 className="text-2xl font-semibold text-center mb-6">Login</h1>
//         <div className="mb-4">
//           <label
//             htmlFor="Email"
//             className="block text-sm font-medium text-gray-700 mb-2"
//           >
//             Email
//           </label>
//           <input
//             type="email"
//             id="Email"
//             name="Email"
//             placeholder="Enter your email"
//             value={form.email}
//             onChange={(e) => setForm({ ...form, email: e.target.value })}
//             required
//             className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
//           />
//         </div>
//         <div className="mb-4">
//           <label
//             htmlFor="Password"
//             className="block text-sm font-medium text-gray-700 mb-2"
//           >
//             Password
//           </label>
//           <input
//             type="password"
//             id="Password"
//             name="Password"
//             placeholder="Enter your password"
//             value={form.password}
//             onChange={(e) => setForm({ ...form, password: e.target.value })}
//             required
//             className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
//           />
//         </div>
//         <button
//           type="submit"
//           className={`w-full py-2 rounded-md text-white transition-colors ${
//             isLoading
//               ? "bg-blue-400 cursor-not-allowed"
//               : "bg-blue-600 hover:bg-blue-700"
//           }`}
//           disabled={isLoading}
//         >
//           {isLoading ? "Logging in..." : "Login"}
//         </button>
//         <div className="flex justify-between mt-4 text-sm">
//           <Link
//             href="/authentication/forgotpassword"
//             className="text-blue-500 hover:underline"
//           >
//             Forgot Password?
//           </Link>
//           <Link
//             href="/authentication/register"
//             className="text-blue-500 hover:underline"
//           >
//             New User? Register Here
//           </Link>
//         </div>
//       </form>
//       <ToastContainer position="top-right" autoClose={3000} />
//     </div>
//   );
// }
