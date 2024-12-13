"use client";

import React, { useEffect, useState } from "react";
import {
  Button,
  Input,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
} from "@nextui-org/react";
import { AcmeLogo } from "@/app/AcmeLogo"; // Ensure the correct path for your logo
import { useRouter } from "next/navigation";
import { parseCookies, destroyCookie } from "nookies";
import { jwtDecode } from "jwt-decode"; // Correct import for jwt-decode
import { FaSearch, FaShoppingCart } from "react-icons/fa"; // Import icons

export default function Header() {
  const [user, setUser] = useState<{ name: string | null }>({ name: null });
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const router = useRouter();

  // Decode JWT token and extract username
  useEffect(() => {
    const cookies = parseCookies();
    const authToken = cookies.authToken; // Retrieve the auth token from cookies

    if (authToken) {
      try {
        const decodedToken: { username: string } = jwtDecode(authToken); // Decode the token
        setUser({ name: decodedToken.username }); // Set the username from the token
      } catch (error) {
        console.error("Failed to decode token:", error);
        setUser({ name: null });
      }
    } else {
      setUser({ name: null }); // Handle case where token is missing
    }
  }, []);

  // Handle logout
  const handleLogout = () => {
    destroyCookie(null, "authToken", { path: "/" }); // Remove auth token
    setUser({ name: null });
    router.push("/authentication/login"); // Redirect to login
  };

  // Handle search form submission
  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (searchQuery.trim() !== "") {
      router.push(`/search?query=${encodeURIComponent(searchQuery)}`); // Redirect to search results page
    }
  };

  return (
    <Navbar className="bg-gradient-to-r from-[#1ed3c4] via-[#00d762] to-[#1ed3c4]">
      {/* Logo and Brand */}
      <NavbarBrand style={{ color: "white" }}>
        <AcmeLogo />
        <p className="text-lg font-bold" style={{ color: "white" }}>
          ViaProxy
        </p>
      </NavbarBrand>

      {/* Center Links */}
      <NavbarContent className="hidden sm:flex gap-8" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#" className="header-link">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="#" className="header-link">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#" className="header-link">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>

      {/* Search Bar */}
      <NavbarContent justify="center" className="search-bar-container">
        <form onSubmit={handleSearch} className="search-form flex items-center">
          <Input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            fullWidth
            className="search-input"
          />
          <button type="submit" className="search-button ml-2">
            <FaSearch />
          </button>
        </form>
      </NavbarContent>

      {/* Right Content */}
      <NavbarContent justify="end" className="gap-4">
        {/* Shopping Cart Icon */}
        <NavbarItem>
          <Link href="/cart" className="cart-icon">
            <FaShoppingCart />
          </Link>
        </NavbarItem>

        {/* User Auth Links */}
        {user.name ? (
          <>
            <NavbarItem>
              <p className="mr-4 text-gray-700">Hi, {user.name}!</p>
            </NavbarItem>
            <NavbarItem>
              <Button
                color="warning"
                onClick={handleLogout}
                variant="flat"
                className="logout-button"
              >
                Logout
              </Button>
            </NavbarItem>
          </>
        ) : (
          <>
            <NavbarItem>
              <Link href="./login">
                <Button className="login-button" variant="flat">
                  Login
                </Button>
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link href="./register">
                <Button className="register-button" variant="flat">
                  Register
                </Button>
              </Link>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </Navbar>
  );
}
