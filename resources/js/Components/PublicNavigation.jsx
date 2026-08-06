import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import {
  FaChevronDown,
  FaHeart,
  FaPlus,
  FaUser,
} from "react-icons/fa";

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">

          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-blue-600">
            InzuNest
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">

            {/* Categories Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown("categories")}
                className="flex items-center gap-1 hover:text-blue-600"
              >
                Categories <FaChevronDown size={12} />
              </button>

              {openDropdown === "categories" && (
                <div className="absolute top-10 left-0 bg-white shadow-lg rounded-lg w-48 py-2">
                  <Link href="/rent-properties" className="block px-4 py-2 hover:bg-gray-100">
                    Houses for Rent
                  </Link>
                  <Link href="/sale-properties" className="block px-4 py-2 hover:bg-gray-100">
                    Houses for Sale
                  </Link>
                  <Link href="/apartments" className="block px-4 py-2 hover:bg-gray-100">
                    Apartments
                  </Link>
                  <Link href="/land" className="block px-4 py-2 hover:bg-gray-100">
                    Land
                  </Link>
                  <Link href="/car" className="block px-4 py-2 hover:bg-gray-100">
                    Car
                  </Link>
                </div>
              )}
            </div>

            {/* Support Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown("support")}
                className="flex items-center gap-1 hover:text-blue-600"
              >
                Support <FaChevronDown size={12} />
              </button>

              {openDropdown === "support" && (
                <div className="absolute top-10 left-0 bg-white shadow-lg rounded-lg w-48 py-2">
                  <Link href="/help-center" className="block px-4 py-2 hover:bg-gray-100">
                    Help Center
                  </Link>
                  <Link href="/contact" className="block px-4 py-2 hover:bg-gray-100">
                    Contact Us
                  </Link>
                  <Link href="/faq" className="block px-4 py-2 hover:bg-gray-100">
                    FAQs
                  </Link>
                </div>
              )}
            </div>

            {/* Legal Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown("legal")}
                className="flex items-center gap-1 hover:text-blue-600"
              >
                Legal <FaChevronDown size={12} />
              </button>

              {openDropdown === "legal" && (
                <div className="absolute top-10 left-0 bg-white shadow-lg rounded-lg w-48 py-2">
                  <Link href="/privacy-policy" className="block px-4 py-2 hover:bg-gray-100">
                    Privacy Policy
                  </Link>
                  <Link href="/terms" className="block px-4 py-2 hover:bg-gray-100">
                    Terms & Conditions
                  </Link>
                </div>
              )}
            </div>

            {/* Static Links */}
            <Link href="/how-it-works" className="hover:text-blue-600">
              How It Works
            </Link>

            <Link href="/about" className="hover:text-blue-600">
              About
            </Link>

            {/* Language Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown("language")}
                className="flex items-center gap-1 hover:text-blue-600"
              >
                🇺🇸 English <FaChevronDown size={12} />
              </button>

              {openDropdown === "language" && (
                <div className="absolute top-10 right-0 bg-white shadow-lg rounded-lg w-40 py-2">
                  <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                    🇺🇸 English
                  </button>
                  <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                    🇷🇼 Kinyarwanda
                  </button>
                  <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                    🇫🇷 French
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">

            <Link
              href="/favorites"
              className="flex items-center gap-2 hover:text-red-500"
            >
              <FaHeart />
              <span className="hidden md:block">Favorites</span>
            </Link>

            <Link
              href="/owner/properties/create"
              className="bg-blue-600 text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-blue-700"
            >
              <FaPlus />
              Create Listing
            </Link>

            <Link
              href="/login"
              className="flex items-center gap-2 border px-4 py-2 rounded-full hover:bg-gray-100"
            >
              <FaUser />
              Login
            </Link>

          </div>

        </div>
      </div>
    </nav>
  );
}