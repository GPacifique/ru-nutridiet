import React, { useState } from "react";
import { Link, usePage } from "@inertiajs/react";

export default function NavBar() {

    const [open, setOpen] = useState(false);

    const { auth } = usePage().props;


    const links = [
        {
            name: "Home",
            href: "/",
        },
        {
            name: "About",
            href: "/about",
        },
        {
            name: "Services",
            href: "/services",
        },
        {
            name: "Programs",
            href: "/projects",
        },
        {
            name: "Testimonials",
            href: "/testimonials",
        },
        {
            name: "Contact",
            href: "/contact",
        },
    ];


    return (
        <nav className="bg-white shadow sticky top-0 z-50">

            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">


                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">

                    <div className="w-10 h-10 rounded-full bg-green-700 text-white flex items-center justify-center font-bold">
                        R
                    </div>


                    <div>
                        <h1 className="text-xl font-bold text-green-700">
                            RUNUTRIDIET
                        </h1>

                        <p className="text-xs text-gray-500">
                            Nutrition Clinic
                        </p>
                    </div>

                </Link>



                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-7">

                    {links.map((link, index) => (

                        <Link
                            key={index}
                            href={link.href}
                            className="text-gray-700 hover:text-green-700 transition"
                        >
                            {link.name}
                        </Link>

                    ))}


                    {auth?.user ? (

                        <Link
                            href="/dashboard"
                            className="bg-green-700 text-white px-5 py-2 rounded-lg hover:bg-green-800"
                        >
                            Dashboard
                        </Link>

                    ) : (

                        <Link
                            href="/login"
                            className="bg-green-700 text-white px-5 py-2 rounded-lg hover:bg-green-800"
                        >
                            Patient Portal
                        </Link>

                    )}

                </div>



                {/* Mobile Button */}
                <button
                    onClick={() => setOpen(!open)}
                    className="md:hidden text-green-700 text-2xl"
                >
                    ☰
                </button>


            </div>



            {/* Mobile Menu */}
            {open && (

                <div className="md:hidden px-6 pb-6 space-y-4 bg-white">

                    {links.map((link, index) => (

                        <Link
                            key={index}
                            href={link.href}
                            className="block text-gray-700 hover:text-green-700"
                            onClick={() => setOpen(false)}
                        >
                            {link.name}
                        </Link>

                    ))}


                    {auth?.user ? (

                        <Link
                            href="/dashboard"
                            className="block bg-green-700 text-white px-4 py-2 rounded-lg text-center"
                        >
                            Dashboard
                        </Link>

                    ) : (

                        <Link
                            href="/login"
                            className="block bg-green-700 text-white px-4 py-2 rounded-lg text-center"
                        >
                            Patient Portal
                        </Link>

                    )}

                </div>

            )}


        </nav>
    );
}