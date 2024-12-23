// without trans
import Image from "next/image";
import Header from "../components/Header";

import { HeroSection } from "@/components/home/hero-section";
import { FeaturedProducts } from "@/components/home/featured-products";
import { CategoriesGrid } from "@/components/home/categories-grid";
import { BrandShowcase } from "@/components/home/featured-brands";
import { Footer } from "@/components/home/footer";

export default function Home() {
  return (
    <div className="h-dvh">
      <Header />
      <main className="">
        {/* Hero Section */}
        {/* <section
          className="relative text-black py-16 px-4 md:py-24 bg-cover bg-center"
          style={{
            backgroundImage: "url('/banner.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="relative container mx-auto text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Discover the Best Deals on Top Products!
            </h1>
            <p className="text-lg md:text-xl mb-8">
              Shop the latest products at unbeatable prices.
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-4 mb-8">
              <button className="bg-white text-purple-600 py-3 px-6 rounded-lg font-bold hover:bg-gray-200">
                Shop Now
              </button>
              <button className="bg-indigo-700 text-white py-3 px-6 rounded-lg font-bold hover:bg-indigo-800">
                Explore Categories
              </button>
            </div>
            <input
              type="text"
              placeholder="Search products..."
              className="w-full md:w-2/3 py-3 px-4 rounded-lg text-gray-700"
            />
          </div>
        </section> */}
        <HeroSection />

        <FeaturedProducts />

        <CategoriesGrid />

        <BrandShowcase />

        {/* Categories Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">
              Shop by Category
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                "Electronics",
                "Fashion",
                "Home",
                "Beauty",
                "Sports",
                "Toys",
                "Fruits",
                "Designs",
              ].map((category, idx) => (
                <div
                  key={idx}
                  className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl text-center cursor-pointer"
                >
                  <Image
                    src={`/${category.toLowerCase()}.jpg`}
                    alt={category}
                    width={100}
                    height={100}
                    layout="responsive"
                    className="w-full h-40 object-cover rounded-md mb-4"
                  />
                  <h3 className="text-lg font-semibold">{category}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">
              Featured Products
            </h2>
            <div className="flex overflow-x-auto space-x-6">
              {[
                "Electronics",
                "Fashion",
                "Home",
                "Beauty",
                "Sports",
                "Toys",
                "Fruits",
                "Designs",
              ].map((product, idx) => (
                <div
                  key={idx}
                  className="min-w-[250px] bg-white p-4 rounded-lg shadow hover:shadow-xl"
                >
                  <Image
                    src={`/${product.toLowerCase()}.jpg`}
                    alt={product}
                    width={100}
                    height={100}
                    layout="responsive"
                    className="w-full h-40 object-cover rounded-md mb-4"
                  />
                  <h3 className="text-lg font-semibold mb-2">{product}</h3>
                  <p className="text-gray-600 mb-2">Price {500}</p>
                  <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}

// import Image from "next/image";
// import Header from "../components/Header";
// import { useTranslations } from "next-intl";

// export default function Home() {
//   const t = useTranslations("Home");

//   return (
//     <div className="h-dvh">
//       <Header />
//       <main className="">
//         {/* Hero Section */}
//         <section
//           className="relative text-black py-16 px-4 md:py-24 bg-cover bg-center"
//           style={{
//             backgroundImage: "url('/banner.jpg')",
//           }}
//         >
//           <div className="absolute inset-0 bg-black/30"></div>
//           <div className="relative container mx-auto text-center text-white">
//             <h1 className="text-4xl md:text-6xl font-bold mb-4">
//               {t("hero.title")}
//             </h1>
//             <p className="text-lg md:text-xl mb-8">{t("hero.subtitle")}</p>
//             <div className="flex flex-col md:flex-row justify-center gap-4 mb-8">
//               <button className="bg-white text-purple-600 py-3 px-6 rounded-lg font-bold hover:bg-gray-200">
//                 {t("hero.shopNow")}
//               </button>
//               <button className="bg-indigo-700 text-white py-3 px-6 rounded-lg font-bold hover:bg-indigo-800">
//                 {t("hero.exploreCategories")}
//               </button>
//             </div>
//             <input
//               type="text"
//               placeholder={t("hero.searchPlaceholder")}
//               className="w-full md:w-2/3 py-3 px-4 rounded-lg text-gray-700"
//             />
//           </div>
//         </section>

//         {/* Categories Section */}
//         <section className="py-16 bg-gray-50">
//           <div className="container mx-auto px-4">
//             <h2 className="text-3xl font-bold text-center mb-8">
//               {t("categories.title")}
//             </h2>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//               {t("categories.items", { returnObjects: true }).map(
//                 (category, idx) => (
//                   <div
//                     key={idx}
//                     className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl text-center cursor-pointer"
//                   >
//                     <Image
//                       src={`/${category.toLowerCase()}.jpg`}
//                       alt={category}
//                       width={100}
//                       height={100}
//                       layout="responsive"
//                       className="w-full h-40 object-cover rounded-md mb-4"
//                     />
//                     <h3 className="text-lg font-semibold">{category}</h3>
//                   </div>
//                 )
//               )}
//             </div>
//           </div>
//         </section>

//         {/* Featured Products Section */}
//         <section className="py-16 bg-gray-100">
//           <div className="container mx-auto px-4">
//             <h2 className="text-3xl font-bold text-center mb-8">
//               {t("featuredProducts.title")}
//             </h2>
//             <div className="flex overflow-x-auto space-x-6">
//               {t("categories.items", { returnObjects: true }).map(
//                 (product, idx) => (
//                   <div
//                     key={idx}
//                     className="min-w-[250px] bg-white p-4 rounded-lg shadow hover:shadow-xl"
//                   >
//                     <Image
//                       src={`/${product.toLowerCase()}.jpg`}
//                       alt={product}
//                       width={100}
//                       height={100}
//                       layout="responsive"
//                       className="w-full h-40 object-cover rounded-md mb-4"
//                     />
//                     <h3 className="text-lg font-semibold mb-2">{product}</h3>
//                     <p className="text-gray-600 mb-2">
//                       {t("featuredProducts.price")}: 500
//                     </p>
//                     <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
//                       {t("featuredProducts.addToCart")}
//                     </button>
//                   </div>
//                 )
//               )}
//             </div>
//           </div>
//         </section>

//         {/* Limited Time Offer Section */}
//         <section className="bg-yellow-400 text-white py-16">
//           <div className="container mx-auto text-center px-4">
//             <h2 className="text-4xl font-bold mb-4">
//               {t("limitedOffer.title")}
//             </h2>
//             <p className="text-lg mb-6">{t("limitedOffer.subtitle")}</p>
//             <div className="text-3xl font-bold">{t("limitedOffer.timer")}</div>
//             <button className="mt-6 bg-white text-yellow-600 py-3 px-6 rounded-lg font-bold hover:bg-gray-100">
//               {t("limitedOffer.shopNow")}
//             </button>
//           </div>
//         </section>

//         {/* Customer Reviews Section */}
//         <section className="py-16">
//           <div className="container mx-auto px-4">
//             <h2 className="text-3xl font-bold text-center mb-8">
//               {t("reviews.title")}
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               {t("reviews.items", { returnObjects: true }).map(
//                 (review, idx) => (
//                   <div
//                     key={idx}
//                     className="bg-white p-6 rounded-lg shadow hover:shadow-lg"
//                   >
//                     <p className="italic mb-4">{review}</p>
//                     <div className="flex items-center gap-2">
//                       <Image
//                         src={`/${review.toLowerCase()}.jpg`}
//                         alt={review}
//                         width={50}
//                         height={50}
//                         className="w-10 h-10 rounded-full"
//                       />
//                       <div>
//                         <h4 className="font-semibold">{review}</h4>
//                         <div className="text-yellow-500">★★★★★</div>
//                       </div>
//                     </div>
//                   </div>
//                 )
//               )}
//             </div>
//           </div>
//         </section>

//         {/* Newsletter Subscription Section */}
//         <section className="bg-blue-500 text-white py-16">
//           <div className="container mx-auto text-center px-4">
//             <h2 className="text-3xl font-bold mb-4">{t("newsletter.title")}</h2>
//             <div className="flex flex-col md:flex-row justify-center gap-4 mt-6">
//               <input
//                 type="email"
//                 placeholder={t("newsletter.placeholder")}
//                 className="w-full md:w-1/2 py-3 px-4 rounded-lg text-gray-700"
//               />
//               <button className="bg-yellow-400 text-gray-800 py-3 px-6 rounded-lg font-bold hover:bg-yellow-500">
//                 {t("newsletter.subscribe")}
//               </button>
//             </div>
//           </div>
//         </section>

//         {/* Footer */}
//         <footer className="bg-gray-900 text-white py-8">
//           <div className="container mx-auto text-center">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
//               {t("footer.sections", { returnObjects: true }).map(
//                 (section, idx) => (
//                   <div key={idx}>
//                     <h3 className="font-bold">{section.title}</h3>
//                     <ul>
//                       {section.items.map((item, itemIdx) => (
//                         <li key={itemIdx}>{item}</li>
//                       ))}
//                     </ul>
//                   </div>
//                 )
//               )}
//             </div>
//             <p>{t("footer.rightsReserved")}</p>
//           </div>
//         </footer>
//       </main>
//     </div>
//   );
// }

// import Image from "next/image";
// import Header from "../components/Header";
// import { useTranslations } from "next-intl";

// export default function Home() {
//   const t = useTranslations("hero");

//   return (
//     <div className="h-dvh">
//       <Header />
//       <main className="">
//         {/* Hero Section */}
//         <section
//           className="relative text-black py-16 px-4 md:py-24 bg-cover bg-center"
//           style={{
//             backgroundImage: "url('/banner.jpg')",
//           }}
//         >
//           <div className="absolute inset-0 bg-black/30"></div>
//           <div className="relative container mx-auto text-center text-white">
//             <h1 className="text-4xl md:text-6xl font-bold mb-4">
//               {t("title")}
//             </h1>
//             <p className="text-lg md:text-xl mb-8">{t("hero.subtitle")}</p>
//             <div className="flex flex-col md:flex-row justify-center gap-4 mb-8">
//               <button className="bg-white text-purple-600 py-3 px-6 rounded-lg font-bold hover:bg-gray-200">
//                 {t("shopNow")}
//               </button>
//               <button className="bg-indigo-700 text-white py-3 px-6 rounded-lg font-bold hover:bg-indigo-800">
//                 {t("exploreCategories")}
//               </button>
//             </div>
//             <input
//               type="text"
//               placeholder={t("searchPlaceholder")}
//               className="w-full md:w-2/3 py-3 px-4 rounded-lg text-gray-700"
//             />
//           </div>
//         </section>

//         {/* Categories Section */}
//         <section className="py-16 bg-gray-50">
//           <div className="container mx-auto px-4">
//             <h2 className="text-3xl font-bold text-center mb-8">
//               {t("categories.title")}
//             </h2>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//               {t("categories.items", { returnObjects: true }).map(
//                 (category, idx) => (
//                   <div
//                     key={idx}
//                     className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl text-center cursor-pointer"
//                   >
//                     <Image
//                       src={`/${category.toLowerCase()}.jpg`}
//                       alt={category}
//                       width={100}
//                       height={100}
//                       layout="responsive"
//                       className="w-full h-40 object-cover rounded-md mb-4"
//                     />
//                     <h3 className="text-lg font-semibold">{category}</h3>
//                   </div>
//                 )
//               )}
//             </div>
//           </div>
//         </section>

//         {/* Featured Products Section */}
//         <section className="py-16 bg-gray-100">
//           <div className="container mx-auto px-4">
//             <h2 className="text-3xl font-bold text-center mb-8">
//               {t("featuredProducts.title")}
//             </h2>
//             <div className="flex overflow-x-auto space-x-6">
//               {t("featuredProducts.items", { returnObjects: true }).map(
//                 (product, idx) => (
//                   <div
//                     key={idx}
//                     className="min-w-[250px] bg-white p-4 rounded-lg shadow hover:shadow-xl"
//                   >
//                     <Image
//                       src={`/${product.image}`}
//                       alt={product.name}
//                       width={100}
//                       height={100}
//                       layout="responsive"
//                       className="w-full h-40 object-cover rounded-md mb-4"
//                     />
//                     <h3 className="text-lg font-semibold mb-2">
//                       {product.name}
//                     </h3>
//                     <p className="text-gray-600 mb-2">{product.price}</p>
//                     <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
//                       {t("featuredProducts.addToCart")}
//                     </button>
//                   </div>
//                 )
//               )}
//             </div>
//           </div>
//         </section>

//         {/* Limited Time Offer Section */}
//         <section className="bg-yellow-400 text-white py-16">
//           <div className="container mx-auto text-center px-4">
//             <h2 className="text-4xl font-bold mb-4">
//               {t("limitedOffer.title")}
//             </h2>
//             <p className="text-lg mb-6">{t("limitedOffer.subtitle")}</p>
//             <div className="text-3xl font-bold">{t("limitedOffer.timer")}</div>
//             <button className="mt-6 bg-white text-yellow-600 py-3 px-6 rounded-lg font-bold hover:bg-gray-100">
//               {t("limitedOffer.shopNow")}
//             </button>
//           </div>
//         </section>

//         {/* Customer Reviews Section */}
//         <section className="py-16">
//           <div className="container mx-auto px-4">
//             <h2 className="text-3xl font-bold text-center mb-8">
//               {t("reviews.title")}
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               {t("reviews.items", { returnObjects: true }).map(
//                 (review, idx) => (
//                   <div
//                     key={idx}
//                     className="bg-white p-6 rounded-lg shadow hover:shadow-lg"
//                   >
//                     <p className="italic mb-4">"{review.text}"</p>
//                     <div className="flex items-center gap-2">
//                       <Image
//                         src={`/${review.image}`}
//                         alt={review.name}
//                         width={50}
//                         height={50}
//                         className="w-10 h-10 rounded-full"
//                       />
//                       <div>
//                         <h4 className="font-semibold">{review.name}</h4>
//                         <div className="text-yellow-500">★★★★★</div>
//                       </div>
//                     </div>
//                   </div>
//                 )
//               )}
//             </div>
//           </div>
//         </section>

//         {/* Newsletter Subscription Section */}
//         <section className="bg-blue-500 text-white py-16">
//           <div className="container mx-auto text-center px-4">
//             <h2 className="text-3xl font-bold mb-4">{t("newsletter.title")}</h2>
//             <div className="flex flex-col md:flex-row justify-center gap-4 mt-6">
//               <input
//                 type="email"
//                 placeholder={t("newsletter.placeholder")}
//                 className="w-full md:w-1/2 py-3 px-4 rounded-lg text-gray-700"
//               />
//               <button className="bg-yellow-400 text-gray-800 py-3 px-6 rounded-lg font-bold hover:bg-yellow-500">
//                 {t("newsletter.subscribe")}
//               </button>
//             </div>
//           </div>
//         </section>

//         {/* Footer */}
//         <footer className="bg-gray-900 text-white py-8">
//           <div className="container mx-auto text-center">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
//               {t("footer.sections", { returnObjects: true }).map(
//                 (section, idx) => (
//                   <div key={idx}>
//                     <h3 className="font-bold">{section.title}</h3>
//                     <ul>
//                       {section.items.map((item, itemIdx) => (
//                         <li key={itemIdx}>{item}</li>
//                       ))}
//                     </ul>
//                   </div>
//                 )
//               )}
//             </div>
//             <p>{t("footer.rightsReserved")}</p>
//           </div>
//         </footer>
//       </main>
//     </div>
//   );
// }

// import Image from "next/image";
// import Header from "../components/Header";

// import { NextIntlClientProvider } from "next-intl";
// import { getMessages } from "next-intl/server";
// import { useState } from "react";

// export default function Home() {
//   return (
//     <div className="h-dvh">
//       <Header />
//       {/* <Navbar /> */}
//       <main className="">
//         <section
//           className="relative text-black py-16 px-4 md:py-24 bg-cover bg-center"
//           style={{
//             backgroundImage: "url('/banner.jpg')",
//           }}
//         >
//           <div className="absolute inset-0 bg-black/30"></div>{" "}
//           {/* Overlay for better text visibility */}
//           <div className="relative container mx-auto text-center text-white">
//             <h1 className="text-4xl md:text-6xl font-bold mb-4">
//               Discover the Best Deals on Top Products!
//             </h1>
//             <p className="text-lg md:text-xl mb-8">
//               Shop the latest products at unbeatable prices.
//             </p>
//             <div className="flex flex-col md:flex-row justify-center gap-4 mb-8">
//               <button className="bg-white text-purple-600 py-3 px-6 rounded-lg font-bold hover:bg-gray-200">
//                 Shop Now
//               </button>
//               <button className="bg-indigo-700 text-white py-3 px-6 rounded-lg font-bold hover:bg-indigo-800">
//                 Explore Categories
//               </button>
//             </div>
//             <input
//               type="text"
//               placeholder="Search products..."
//               className="w-full md:w-2/3 py-3 px-4 rounded-lg text-gray-700"
//             />
//           </div>
//         </section>

//         {/* Categories Section */}
//         <section className="py-16 bg-gray-50">
//           <div className="container mx-auto px-4">
//             <h2 className="text-3xl font-bold text-center mb-8">
//               Shop by Category
//             </h2>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//               {[
//                 "Electronics",
//                 "Fashion",
//                 "Home",
//                 "Beauty",
//                 "Sports",
//                 "Toys",
//                 "Fruits",
//                 "Designs",
//               ].map((category, idx) => (
//                 <div
//                   key={idx}
//                   className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl text-center cursor-pointer"
//                 >
//                   <Image
//                     src={`/${category.toLowerCase()}.jpg`} // Placeholder image paths
//                     alt={category}
//                     width={100}
//                     height={100}
//                     layout="responsive"
//                     className="w-full h-40 object-cover rounded-md mb-4"
//                   />
//                   <h3 className="text-lg font-semibold">{category}</h3>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Featured Products Section */}
//         <section className="py-16 bg-gray-100">
//           <div className="container mx-auto px-4">
//             <h2 className="text-3xl font-bold text-center mb-8">
//               Featured Products
//             </h2>
//             <div className="flex overflow-x-auto space-x-6">
//               {[
//                 "Electronics",
//                 "Fashion",
//                 "Home",
//                 "Beauty",
//                 "Sports",
//                 "Toys",
//                 "Fruits",
//                 "Designs",
//               ].map((category, idx) => (
//                 <div
//                   key={idx}
//                   className="min-w-[250px] bg-white p-4 rounded-lg shadow hover:shadow-xl"
//                 >
//                   <Image
//                     src={`/${category.toLowerCase()}.jpg`} // Placeholder image paths
//                     alt={category}
//                     width={100}
//                     height={100}
//                     layout="responsive"
//                     className="w-full h-40 object-cover rounded-md mb-4"
//                   />
//                   <h3 className="text-lg font-semibold mb-2">Product Name</h3>
//                   <p className="text-gray-600 mb-2">$49.99</p>
//                   <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
//                     Add to Cart
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Limited Time Offer Section */}
//         <section className="bg-yellow-400 text-white py-16">
//           <div className="container mx-auto text-center px-4">
//             <h2 className="text-4xl font-bold mb-4">Limited Time Offer!</h2>
//             <p className="text-lg mb-6">Hurry up! Offer ends in:</p>
//             <div className="text-3xl font-bold">03:15:20</div>
//             <button className="mt-6 bg-white text-yellow-600 py-3 px-6 rounded-lg font-bold hover:bg-gray-100">
//               Shop Now
//             </button>
//           </div>
//         </section>

//         {/* Customer Reviews Section */}
//         <section className="py-16">
//           <div className="container mx-auto px-4">
//             <h2 className="text-3xl font-bold text-center mb-8">
//               What Our Customers Say
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               {["Alina", "Kum", "Jack"].map((per, idx) => (
//                 <div
//                   key={idx}
//                   className="bg-white p-6 rounded-lg shadow hover:shadow-lg"
//                 >
//                   <p className="italic mb-4">
//                     "Amazing product! Totally worth the price."
//                   </p>
//                   <div className="flex items-center gap-2">
//                     <Image
//                       src={`/${per.toLowerCase()}.jpg`} // Placeholder
//                       alt="Customer"
//                       width={50}
//                       height={50}
//                       className="w-10 h-10 rounded-full"
//                     />
//                     <div>
//                       <h4 className="font-semibold">John Doe</h4>
//                       <div className="text-yellow-500">★★★★★</div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Newsletter Subscription Section */}
//         <section className="bg-blue-500 text-white py-16">
//           <div className="container mx-auto text-center px-4">
//             <h2 className="text-3xl font-bold mb-4">
//               Stay Updated with Exclusive Deals
//             </h2>
//             <div className="flex flex-col md:flex-row justify-center gap-4 mt-6">
//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 className="w-full md:w-1/2 py-3 px-4 rounded-lg text-gray-700"
//               />
//               <button className="bg-yellow-400 text-gray-800 py-3 px-6 rounded-lg font-bold hover:bg-yellow-500">
//                 Subscribe Now
//               </button>
//             </div>
//           </div>
//         </section>

//         {/* Footer */}
//         <footer className="bg-gray-900 text-white py-8">
//           <div className="container mx-auto text-center">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
//               <div>
//                 <h3 className="font-bold">Quick Links</h3>
//                 <ul>
//                   <li>Home</li>
//                   <li>Shop</li>
//                   <li>Contact</li>
//                 </ul>
//               </div>
//               <div>
//                 <h3 className="font-bold">Customer Support</h3>
//                 <ul>
//                   <li>FAQs</li>
//                   <li>Returns</li>
//                 </ul>
//               </div>
//               <div>
//                 <h3 className="font-bold">Follow Us</h3>
//                 <div className="flex justify-center gap-4">
//                   <span>Facebook</span>
//                   <span>Instagram</span>
//                 </div>
//               </div>
//             </div>
//             <p>© 2024 Your Brand. All Rights Reserved.</p>
//           </div>
//         </footer>
//       </main>
//     </div>
//   );
// }
