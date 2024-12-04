"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const supportedLocales = ["en", "fr"]; // Define your supported locales
  const defaultLocale = "en"; // Define the default locale

  // Get the current locale from the pathname
  const currentLocale = supportedLocales.includes(pathname.split("/")[1])
    ? pathname.split("/")[1]
    : defaultLocale;

  const [selectedLocale, setSelectedLocale] = useState(currentLocale);

  useEffect(() => {
    // Update the selected locale when the path changes
    setSelectedLocale(currentLocale);
  }, [currentLocale]);

  const switchLanguage = (locale: string) => {
    if (locale === currentLocale) return; // Prevent unnecessary reloads

    // Preserve query parameters
    const params = new URLSearchParams(searchParams.toString());
    const newPathname = `/${locale}${pathname.slice(3)}`; // Replace the locale in the path

    router.push(`${newPathname}?${params.toString()}`);
  };

  return (
    <div className="absolute top-4 right-4 z-50">
      <div className="flex items-center space-x-2">
        {/* English Label */}
        <span className="text-sm font-medium text-gray-700">EN</span>
        {/* Switcher */}
        <div
          className="relative w-10 h-6 bg-gray-200 rounded-full cursor-pointer"
          onClick={() => switchLanguage(selectedLocale === "en" ? "fr" : "en")}
        >
          <div
            className={`absolute top-0.5 left-0.5 h-5 w-5 bg-black rounded-full transition-transform ${
              selectedLocale === "fr" ? "translate-x-4" : "translate-x-0"
            }`}
          ></div>
        </div>
        {/* French Label */}
        <span className="text-sm font-medium text-gray-700">FR</span>
      </div>
    </div>
  );
}

//problem
// "use client";

// import { usePathname, useRouter, useSearchParams } from "next/navigation";
// import { useTranslations } from "next-intl";
// import { useState, useEffect } from "react";

// export default function LanguageSwitcher() {
//   const t = useTranslations("common"); // Assuming translations exist in `common.json`
//   const router = useRouter();
//   const pathname = usePathname();
//   const searchParams = useSearchParams();
//   const currentLocale = pathname.split("/")[1]; // Get the current locale from the URL
//   const supportedLocales = ["en", "fr"]; // Define your supported locales

//   const [selectedLocale, setSelectedLocale] = useState(currentLocale);

//   useEffect(() => {
//     // Update the selected locale when the path changes
//     setSelectedLocale(currentLocale);
//   }, [currentLocale]);

//   const switchLanguage = (locale: string) => {
//     if (locale === currentLocale) return; // Prevent unnecessary reloads

//     // Preserve query parameters
//     const params = new URLSearchParams(searchParams.toString());
//     const newPathname = `/${locale}${pathname.slice(3)}`; // Replace locale in path (e.g., /en/... -> /fr/...)

//     router.push(`${newPathname}?${params.toString()}`);
//   };

//   return (
//     <div className="absolute top-4 right-4 z-50">
//       <div className="flex items-center space-x-2">
//         <span className="text-sm font-medium text-gray-700">EN</span>
//         <div
//           className="relative w-10 h-6 bg-gray-100 rounded-full cursor-pointer"
//           onClick={() => switchLanguage(selectedLocale === "en" ? "fr" : "en")}
//         >
//           <div
//             className={`absolute top-0.5 left-0.5 h-5 w-5 bg-black rounded-full transition-transform ${
//               selectedLocale === "fr" ? "translate-x-8" : "translate-x-0"
//             }`}
//           ></div>
//         </div>
//         <span className="text-sm font-medium text-gray-700">FR</span>
//       </div>
//     </div>
//   );
// }

//og
// "use client";

// import { usePathname, useRouter, useSearchParams } from "next/navigation";
// import { useTranslations } from "next-intl";

// export default function LanguageSwitcher() {
//   const t = useTranslations("common"); // Assuming translations exist in `common.json`
//   const router = useRouter();
//   const pathname = usePathname();
//   const searchParams = useSearchParams();
//   const currentLocale = pathname.split("/")[1]; // Get the current locale from the URL
//   const supportedLocales = ["en", "fr"]; // Define your supported locales

//   const switchLanguage = (locale: string) => {
//     // Preserve query parameters
//     const params = new URLSearchParams(searchParams.toString());
//     const newPathname = `/${locale}${pathname.slice(3)}`; // Replace locale in path (e.g., /en/... -> /fr/...)

//     router.push(`${newPathname}?${params.toString()}`);
//   };

//   return (
//     <div className="flex items-center space-x-4">
//       {supportedLocales.map((locale) => (
//         <button
//           key={locale}
//           onClick={() => switchLanguage(locale)}
//           className={`px-3 py-1 rounded ${
//             currentLocale === locale
//               ? "bg-blue-600 text-white"
//               : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//           }`}
//         >
//           {locale.toUpperCase()}
//         </button>
//       ))}
//     </div>
//   );
// }
