"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslations } from "next-intl";

export default function RegisterPage() {
  const t = useTranslations("register"); // Load translations for the 'register' namespace
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      console.log("Form Data:", data);
      const response = await fetch("/api/authentication/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success(t("registrationSuccess")); // Use translation key
      } else {
        const errorData = await response.json();
        toast.error(
          errorData.error || t("registrationFailed") // Use translation key
        );
      }
    } catch (error: any) {
      const errorMessage = error?.message || t("unexpectedError"); // Use translation key
      toast.error(errorMessage);
    }
  };

  return (
    <section className="bg-white">
      <div className="flex flex-col lg:flex-row lg:min-h-screen">
        {/* Left Section */}
        <section className="relative flex h-32 items-end bg-gray-900 lg:w-1/2 lg:h-full">
          <Image
            src="/sale.jpg"
            layout="responsive"
            width={100}
            height={100}
            alt={t("registerImageAlt")} // Use translation key
            objectFit="cover"
          />
        </section>

        {/* Right Section */}
        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:w-1/2 lg:px-16 lg:py-12">
          <div className="w-full max-w-xl">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              {t("createAccount")}
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t("name")}
                </label>
                <input
                  type="text"
                  id="name"
                  {...register("name", { required: t("nameRequired") })}
                  className="h-10 p-2 mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
                <p className="text-sm text-red-500 min-h-[20px] mt-1">
                  {errors.name?.message as string}
                </p>
              </div>

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
                  className="h-10 p-2 mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
                <p className="text-sm text-red-500 min-h-[20px] mt-1">
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
                  className="h-10 p-2 mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
                <p className="text-sm text-red-500 min-h-[20px] mt-1">
                  {errors.password?.message as string}
                </p>
              </div>

              {/* Role Dropdown */}
              <div>
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t("role")}
                </label>
                <select
                  id="role"
                  {...register("role", { required: t("roleRequired") })}
                  className="h-10 p-2 mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                >
                  <option value="">{t("selectRole")}</option>
                  <option value="student">{t("student")}</option>
                  <option value="citizen">{t("citizen")}</option>
                  <option value="trader">{t("trader")}</option>
                </select>
                <p className="text-sm text-red-500 min-h-[20px] mt-1">
                  {errors.role?.message as string}
                </p>
              </div>

              {/* Submit Button */}
              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500">
                  {t("registerButton")}
                </button>
                <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                  {t("alreadyHaveAccount")}{" "}
                  <Link
                    href="/authentication/login"
                    className="text-gray-700 underline"
                  >
                    {t("login")}
                  </Link>
                  .
                </p>
              </div>
            </form>
          </div>
        </main>
      </div>
      <ToastContainer />
    </section>
  );
}

// "use client";

// import { FileX } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import React from "react";
// import { useForm } from "react-hook-form";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useTranslations } from "next-intl";

// export default function RegisterPage() {
//   const t = useTranslations("register"); // Load translations for the 'register' namespace
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const onSubmit = async (data: any) => {
//     try {
//       console.log("Form Data:", data);
//       const response = await fetch("/api/authentication/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(data),
//       });

//       if (response.ok) {
//         toast.success(t("registrationSuccess")); // Use translation key
//       } else {
//         // Extract the 'error' property from the response
//         const errorData = await response.json();
//         toast.error(
//           errorData.error || t("registrationFailed") // Use translation key
//         );
//       }
//     } catch (error: any) {
//       // Handle unexpected errors
//       const errorMessage = error?.message || t("unexpectedError"); // Use translation key
//       toast.error(errorMessage);
//     }
//   };

//   return (
//     <section className="bg-white">
//       <div className="flex flex-col lg:flex-row lg:min-h-screen">
//         {/* Left Section */}
//         <section className="relative flex h-32 items-end bg-gray-900 lg:w-1/2 lg:h-full">
//           <Image
//             src="/sale.jpg"
//             layout="responsive"
//             width={100}
//             height={100}
//             alt={t("registerImageAlt")} // Use translation key
//             objectFit="cover"
//           />
//         </section>

//         {/* Right Section */}
//         <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:w-1/2 lg:px-16 lg:py-12">
//           <div className="w-full max-w-xl">
//             <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
//               {t("createAccount")}
//             </h1>
//             <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
//               {/* Name Field */}
//               <div>
//                 <label
//                   htmlFor="name"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   {t("name")}
//                 </label>
//                 <input
//                   type="text"
//                   id="name"
//                   {...register("name", { required: t("nameRequired") })}
//                   className="h-10 p-2 mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
//                 />
//                 <p className="text-sm text-red-500 min-h-[20px] mt-1">
//                   {errors.name?.message as string}
//                 </p>
//               </div>

//               {/* Email Field */}
//               <div>
//                 <label
//                   htmlFor="email"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   {t("email")}
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   {...register("email", {
//                     required: t("emailRequired"),
//                     pattern: {
//                       value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//                       message: t("emailInvalid"),
//                     },
//                   })}
//                   className="h-10 p-2 mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
//                 />
//                 <p className="text-sm text-red-500 min-h-[20px] mt-1">
//                   {errors.email?.message as string}
//                 </p>
//               </div>

//               {/* Password Field */}
//               <div>
//                 <label
//                   htmlFor="password"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   {t("password")}
//                 </label>
//                 <input
//                   type="password"
//                   id="password"
//                   {...register("password", {
//                     required: t("passwordRequired"),
//                     minLength: {
//                       value: 6,
//                       message: t("passwordMinLength"),
//                     },
//                   })}
//                   className="h-10 p-2 mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
//                 />
//                 <p className="text-sm text-red-500 min-h-[20px] mt-1">
//                   {errors.password?.message as string}
//                 </p>
//               </div>

//               {/* Role Dropdown */}
//               <div>
//                 <label
//                   htmlFor="role"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   {t("role")}
//                 </label>
//                 <select
//                   id="role"
//                   {...register("role", { required: t("roleRequired") })}
//                   className="h-10 p-2 mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
//                 >
//                   <option value="">{t("selectRole")}</option>
//                   <option value="student">{t("student")}</option>
//                   <option value="citizen">{t("citizen")}</option>
//                   <option value="trader">{t("trader")}</option>
//                 </select>
//                 <p className="text-sm text-red-500 min-h-[20px] mt-1">
//                   {errors.role?.message as string}
//                 </p>
//               </div>

//               {/* Submit Button */}
//               <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
//                 <button className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500">
//                   {t("registerButton")}
//                 </button>
//                 <p className="mt-4 text-sm text-gray-500 sm:mt-0">
//                   {t("alreadyAccount")}{" "}
//                   <Link
//                     href="/authentication/login"
//                     className="text-gray-700 underline"
//                   >
//                     {t("login")}
//                   </Link>
//                   .
//                 </p>
//               </div>
//             </form>
//           </div>
//         </main>
//       </div>
//       <ToastContainer />
//     </section>
//   );
// }

//og
// "use client";

// import { FileX } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import React from "react";
// import { useForm } from "react-hook-form";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function RegisterPage() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const onSubmit = async (data: any) => {
//     try {
//       console.log("Form Data:", data);
//       const response = await fetch("/api/authentication/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(data),
//       });

//       if (response.ok) {
//         toast.success("Registration successful!");
//       } else {
//         // Extract the 'error' property from the response
//         const errorData = await response.json();
//         toast.error(errorData.error || "Failed to register. Please try again.");
//       }
//     } catch (error: any) {
//       // Handle unexpected errors
//       const errorMessage =
//         error?.message || "An unexpected error occurred. Please try again.";
//       toast.error(errorMessage);
//     }
//   };

//   return (
//     <section className="bg-white">
//       <div className="flex flex-col lg:flex-row lg:min-h-screen">
//         {/* Left Section */}
//         <section className="relative flex h-32 items-end bg-gray-900 lg:w-1/2 lg:h-full">
//           <Image
//             src="/sale.jpg"
//             layout="responsive"
//             width={100}
//             height={100}
//             alt="registerimage"
//             objectFit="cover"
//           />
//         </section>

//         {/* Right Section */}
//         <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:w-1/2 lg:px-16 lg:py-12">
//           <div className="w-full max-w-xl">
//             <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
//               Create an Account
//             </h1>
//             <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
//               {/* Name Field */}
//               <div>
//                 <label
//                   htmlFor="name"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Name
//                 </label>
//                 <input
//                   type="text"
//                   id="name"
//                   {...register("name", { required: "Name is required" })}
//                   className="h-10 p-2 mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
//                 />
//                 <p className="text-sm text-red-500 min-h-[20px] mt-1">
//                   {errors.name?.message as string}
//                 </p>
//               </div>

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
//                   {...register("email", {
//                     required: "Email is required",
//                     pattern: {
//                       value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//                       message: "Invalid email format",
//                     },
//                   })}
//                   className="h-10 p-2 mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
//                 />
//                 <p className="text-sm text-red-500 min-h-[20px] mt-1">
//                   {errors.email?.message as string}
//                 </p>
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
//                   {...register("password", {
//                     required: "Password is required",
//                     minLength: {
//                       value: 6,
//                       message: "Password must be at least 6 characters",
//                     },
//                   })}
//                   className="h-10 p-2 mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
//                 />
//                 <p className="text-sm text-red-500 min-h-[20px] mt-1">
//                   {errors.password?.message as string}
//                 </p>
//               </div>

//               {/* Role Dropdown */}
//               <div>
//                 <label
//                   htmlFor="role"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Role
//                 </label>
//                 <select
//                   id="role"
//                   {...register("role", { required: "Role is required" })}
//                   className="h-10 p-2 mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
//                 >
//                   <option value="">Select a role</option>
//                   <option value="student">Student</option>
//                   <option value="citizen">Citizen</option>
//                   <option value="trader">Trader</option>
//                 </select>
//                 <p className="text-sm text-red-500 min-h-[20px] mt-1">
//                   {errors.role?.message as string}
//                 </p>
//               </div>

//               {/* Submit Button */}
//               {/* <div>
//                 <button
//                   type="submit"
//                   className="inline-block w-full rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
//                 >
//                   Register
//                 </button>
//               </div> */}
//               <div className="col-span-6">
//                 <label htmlFor="MarketingAccept" className="flex gap-4">
//                   <input
//                     type="checkbox"
//                     id="MarketingAccept"
//                     name="marketing_accept"
//                     className="size-5 rounded-md border-gray-200 bg-white shadow-sm"
//                   />

//                   <span className="text-sm text-gray-700">
//                     I want to receive emails about events, product updates and
//                     company announcements.
//                   </span>
//                 </label>
//               </div>

//               <div className="col-span-6">
//                 <p className="text-sm text-gray-500">
//                   By creating an account, you agree to our
//                   <a href="#" className="text-gray-700 underline">
//                     {" "}
//                     terms and conditions{" "}
//                   </a>
//                   and
//                   <a href="#" className="text-gray-700 underline">
//                     privacy policy
//                   </a>
//                   .
//                 </p>
//               </div>

//               <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
//                 <button className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500">
//                   Create an account
//                 </button>

//                 <p className="mt-4 text-sm text-gray-500 sm:mt-0">
//                   Already have an account?
//                   <Link
//                     href="/authentication/login"
//                     className="text-gray-700 underline"
//                   >
//                     Log in
//                   </Link>
//                   .
//                 </p>
//               </div>
//             </form>
//           </div>
//         </main>
//       </div>
//       <ToastContainer />
//     </section>
//   );
// }

// "use client";

// import { useState } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function RegisterPage() {
//   const [form, setForm] = useState({ name: "", email: "", password: "" });
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true); // Show loader when registration starts
//     try {
//       const res = await fetch("/api/authentication/register", {
//         method: "POST",
//         body: JSON.stringify(form),
//         headers: { "Content-Type": "application/json" },
//       });
//       const data = await res.json();

//       if (res.ok) {
//         toast.success(data.message || "Registration successful!");
//       } else {
//         toast.error(data.error || "Something went wrong.");
//       }
//     } catch (error) {
//       toast.error("An unexpected error occurred.");
//     } finally {
//       setIsLoading(false); // Hide loader after registration completes
//     }
//   };

//   return (
//     <>
//       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
//         <form
//           onSubmit={handleSubmit}
//           className="w-full max-w-md bg-white p-6 rounded-lg shadow-md"
//         >
//           <h1 className="text-2xl font-semibold text-center mb-6">Register</h1>
//           <div className="mb-4">
//             <label
//               htmlFor="Username"
//               className="block text-sm font-medium text-gray-700 mb-2"
//             >
//               Name
//             </label>
//             <input
//               type="text"
//               name="Username"
//               id="Username"
//               placeholder="Enter your name"
//               value={form.name}
//               onChange={(e) => setForm({ ...form, name: e.target.value })}
//               required
//               className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
//             />
//           </div>
//           <div className="mb-4">
//             <label
//               htmlFor="Email"
//               className="block text-sm font-medium text-gray-700 mb-2"
//             >
//               Email
//             </label>
//             <input
//               type="email"
//               id="Email"
//               name="Email"
//               placeholder="Enter your email"
//               value={form.email}
//               onChange={(e) => setForm({ ...form, email: e.target.value })}
//               required
//               className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
//             />
//           </div>
//           <div className="mb-4">
//             <label
//               htmlFor="Password"
//               className="block text-sm font-medium text-gray-700 mb-2"
//             >
//               Password
//             </label>
//             <input
//               type="password"
//               id="Password"
//               name="Password"
//               placeholder="Enter your password"
//               value={form.password}
//               onChange={(e) => setForm({ ...form, password: e.target.value })}
//               required
//               className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
//             />
//           </div>
//           <button
//             type="submit"
//             className={`w-full py-2 rounded-md text-white transition-colors ${
//               isLoading
//                 ? "bg-blue-400 cursor-not-allowed"
//                 : "bg-blue-600 hover:bg-blue-700"
//             }`}
//             disabled={isLoading}
//           >
//             {isLoading ? "Registering..." : "Register"}
//           </button>
//         </form>
//         {/* Toast Container */}
//         <ToastContainer />

//         {/* Loader Overlay */}
//         {isLoading && (
//           <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//             <div className="loader"></div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }
