import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import Link from "next/link";

export function Footer() {
  const categories = ["Electronics", "Fashion", "Home & Living", "Beauty"];
  const about = ["About Us", "Careers", "Press", "Blog"];
  const help = ["FAQs", "Contact Us", "Shipping", "Returns"];
  const legal = ["Terms", "Privacy", "Cookies"];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold text-white">Categories</h3>
            <ul className="mt-4 space-y-2">
              {categories.map((item) => (
                <li key={item}>
                  <Link href="#" className="hover:text-white">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-lg font-semibold text-white">About</h3>
            <ul className="mt-4 space-y-2">
              {about.map((item) => (
                <li key={item}>
                  <Link href="#" className="hover:text-white">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-lg font-semibold text-white">Help</h3>
            <ul className="mt-4 space-y-2">
              {help.map((item) => (
                <li key={item}>
                  <Link href="#" className="hover:text-white">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-white">Stay Updated</h3>
            <p className="mt-4 text-sm">
              Subscribe to our newsletter for the latest updates and offers.
            </p>
            <form className="mt-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-lg bg-gray-800 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button className="mt-2 w-full rounded-lg bg-purple-600 px-4 py-2 font-semibold text-white hover:bg-purple-700">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-8">
          <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
            <div className="flex space-x-6">
              <Link href="#" className="hover:text-white">
                <Facebook className="h-6 w-6" />
              </Link>
              <Link href="#" className="hover:text-white">
                <Twitter className="h-6 w-6" />
              </Link>
              <Link href="#" className="hover:text-white">
                <Instagram className="h-6 w-6" />
              </Link>
              <Link href="#" className="hover:text-white">
                <Youtube className="h-6 w-6" />
              </Link>
            </div>
            <p className="text-sm">© 2024 ViaProxy. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
