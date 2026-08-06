import React, { useState } from "react";
import { Link, usePage, router } from "@inertiajs/react";

export default function Navbar() {
    const { auth } = usePage().props;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);

    const handleLogout = () => {
        router.post("/logout");
    };

    return (
        <header className="sticky top-0 z-50 bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex items-center gap-2"
                    >
                        <div className="w-10 h-10 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-lg">
                            W
                        </div>

                        <div>
                            <h1 className="text-xl font-bold text-gray-900">
                                SharpTechLearners
                            </h1>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-8">
                        <Link
                            href="/"
                            className="text-gray-700 hover:text-indigo-600 font-medium"
                        >
                            Home
                        </Link>

                        <Link
                            href="/marketplace"
                            className="text-gray-700 hover:text-indigo-600 font-medium"
                        >
                            Marketplace
                        </Link>

                        <Link
                            href="/projects"
                            className="text-gray-700 hover:text-indigo-600 font-medium"
                        >
                            Projects
                        </Link>

                        <Link
                            href="/freelancers"
                            className="text-gray-700 hover:text-indigo-600 font-medium"
                        >
                            Freelancers
                        </Link>

                        <Link
                            href="/categories"
                            className="text-gray-700 hover:text-indigo-600 font-medium"
                        >
                            Categories
                        </Link>
                    </nav>

                    {/* Search */}
                    <div className="hidden xl:flex flex-1 max-w-md mx-8">
                        <input
                            type="text"
                            placeholder="Search products, services..."
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    {/* Right Side */}
                    <div className="hidden lg:flex items-center gap-3">

                        {auth?.user ? (
                            <>
                                <Link
                                    href="/dashboard"
                                    className="px-4 py-2 text-gray-700 hover:text-indigo-600 font-medium"
                                >
                                    Dashboard
                                </Link>

                                <Link
                                    href="/messages"
                                    className="relative px-3 py-2"
                                >
                                    💬
                                </Link>

                                <Link
                                    href="/notifications"
                                    className="relative px-3 py-2"
                                >
                                    🔔
                                </Link>

                                <Link
                                    href="/products/create"
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                                >
                                    Sell Product
                                </Link>

                                <Link
                                    href="/projects/create"
                                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                                >
                                    Post Project
                                </Link>

                                <div className="relative">
                                    <button
                                        onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                                        className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center hover:ring-2 hover:ring-indigo-600"
                                    >
                                        {auth.user.avatar ? (
                                            <img
                                                src={auth.user.avatar}
                                                alt={auth.user.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <span className="font-semibold">
                                                {auth.user.name.charAt(0)}
                                            </span>
                                        )}
                                    </button>

                                    {profileMenuOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                                            <div className="px-4 py-3 border-b">
                                                <p className="font-semibold text-gray-900">
                                                    {auth.user.name}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    {auth.user.email}
                                                </p>
                                            </div>

                                            <Link
                                                href="/profile"
                                                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                            >
                                                My Profile
                                            </Link>

                                            <Link
                                                href="/dashboard"
                                                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                            >
                                                Dashboard
                                            </Link>

                                            <button
                                                onClick={handleLogout}
                                                className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="px-4 py-2 text-gray-700 hover:text-indigo-600"
                                >
                                    Login
                                </Link>

                                <Link
                                    href="/register"
                                    className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden"
                        onClick={() =>
                            setMobileMenuOpen(!mobileMenuOpen)
                        }
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="lg:hidden py-4 border-t">
                        <div className="space-y-3">

                            <Link
                                href="/"
                                className="block py-2"
                            >
                                Home
                            </Link>

                            <Link
                                href="/marketplace"
                                className="block py-2"
                            >
                                Marketplace
                            </Link>

                            <Link
                                href="/projects"
                                className="block py-2"
                            >
                                Projects
                            </Link>

                            <Link
                                href="/freelancers"
                                className="block py-2"
                            >
                                Freelancers
                            </Link>

                            <Link
                                href="/categories"
                                className="block py-2"
                            >
                                Categories
                            </Link>

                            <div className="pt-3 border-t">
                                {auth?.user ? (
                                    <>
                                        <Link
                                            href="/dashboard"
                                            className="block py-2"
                                        >
                                            Dashboard
                                        </Link>

                                        <Link
                                            href="/profile"
                                            className="block py-2"
                                        >
                                            My Profile
                                        </Link>

                                        <Link
                                            href="/products/create"
                                            className="block py-2"
                                        >
                                            Sell Product
                                        </Link>

                                        <Link
                                            href="/projects/create"
                                            className="block py-2"
                                        >
                                            Post Project
                                        </Link>

                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left py-2 text-red-600 font-medium hover:bg-red-50 px-0"
                                        >
                                            Logout
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            href="/login"
                                            className="block py-2"
                                        >
                                            Login
                                        </Link>

                                        <Link
                                            href="/register"
                                            className="block py-2"
                                        >
                                            Register
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}