import React, { useState } from "react";
import { Link, usePage, router } from "@inertiajs/react";
import NavLink from "@/Components/NavLink";

export default function Navbar() {
    const { auth } = usePage().props;
    const { url } = usePage(); // ✅ FIX HERE

    const user = auth?.user;
    const [open, setOpen] = useState(false);

    const logout = () => {
        router.post("/logout");
    };

    return (
        <nav className="bg-white shadow px-6 py-4 flex items-center justify-between">

            {/* Logo */}
            <div className="text-xl font-bold text-blue-600">
                InzuNest
            </div>

            {/* Links */}
            <div className="hidden md:flex gap-2">
                <NavLink href="/" active={url === "/"}>
                    Home
                </NavLink>

                <NavLink
                    href="/owner/properties"
                    active={url.startsWith("/owner/properties")}
                >
                    Properties
                </NavLink>

                <NavLink href="/contact" active={url === "/contact"}>
                    Contact
                </NavLink>
            </div>

            {/* Right Side */}
            <div className="relative">
                {user ? (
                    <>
                        <button
                            onClick={() => setOpen(!open)}
                            className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg"
                        >
                            {user.name}
                            <span>▼</span>
                        </button>

                        {open && (
                            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border z-50">

                                <Link
                                    href="/dashboard"
                                    className="block px-4 py-2 hover:bg-gray-100"
                                >
                                    Dashboard
                                </Link>

                                <Link
                                    href="/profile"
                                    className="block px-4 py-2 hover:bg-gray-100"
                                >
                                    Profile
                                </Link>

                                <button
                                    onClick={logout}
                                    className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-600"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="flex gap-3">
                        <Link href="/login" className="px-4 py-2 text-blue-600">
                            Login
                        </Link>

                        <Link
                            href="/register"
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                        >
                            Register
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
}