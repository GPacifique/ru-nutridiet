import React from "react";
import { Link, usePage } from "@inertiajs/react";

export default function AuthenticatedNav() {
    const { auth } = usePage().props;

    return (
        <nav className="bg-white shadow px-6 py-3 flex justify-between items-center">

            {/* LEFT - LOGO */}
            <Link href="/" className="text-xl font-bold text-red-600">
                NewsRoom
            </Link>

            {/* CENTER - LINKS */}
            <div className="hidden md:flex gap-6 text-gray-700">

                <Link href="/" className="hover:text-red-600">
                    Home
                </Link>

                <Link href="/articles" className="hover:text-red-600">
                    Articles
                </Link>

                <Link href="/categories" className="hover:text-red-600">
                    Categories
                </Link>

                {auth?.user && (
                    <Link href="/dashboard" className="hover:text-red-600">
                        Dashboard
                    </Link>
                )}

                {auth?.user?.role === "admin" && (
                    <Link href="/admin" className="hover:text-red-600">
                        Admin
                    </Link>
                )}

                {auth?.user && (
                    <Link href="/manage/articles/create" className="hover:text-red-600">
                        Write Article
                    </Link>
                )}

            </div>

            {/* RIGHT - AUTH SECTION */}
            <div className="flex items-center gap-4">

                {auth?.user ? (
                    <>
                        {/* USER INFO */}
                        <span className="text-sm text-gray-600">
                            👤 {auth.user.name}
                        </span>

                        {/* LOGOUT */}
                        <Link
                            href="/logout"
                            method="post"
                            as="button"
                            className="bg-red-600 text-white px-3 py-1 rounded text-sm"
                        >
                            Logout
                        </Link>
                    </>
                ) : (
                    <>
                        <Link href="/login" className="text-sm">
                            Login
                        </Link>

                        <Link
                            href="/register"
                            className="bg-red-600 text-white px-3 py-1 rounded text-sm"
                        >
                            Register
                        </Link>
                    </>
                )}

            </div>
        </nav>
    );
}