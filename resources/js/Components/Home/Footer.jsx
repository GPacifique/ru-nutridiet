import React from "react";
import { Link } from "@inertiajs/react";

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="bg-gray-950 text-gray-300">
            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

                    {/* Company */}
                    <div className="lg:col-span-2">
                        <Link
                            href="/"
                            className="flex items-center gap-3"
                        >
                            <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-xl">
                                W
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-white">
                                    SharpTechLearners
                                </h2>
                                <p className="text-sm text-gray-400">
                                    Digital Marketplace & Freelancing Platform
                                </p>
                            </div>
                        </Link>

                        <p className="mt-6 text-gray-400 leading-relaxed max-w-md">
                            SharpTechLearners connects creators, developers,
                            designers, businesses, and freelancers worldwide.
                            Buy and sell digital products, hire verified
                            experts, and grow your business from one platform.
                        </p>

                        {/* Social Links */}
                        <div className="flex gap-4 mt-6">

                            <a
                                href="#"
                                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-indigo-600 flex items-center justify-center transition"
                            >
                                🌐
                            </a>

                            <a
                                href="#"
                                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-indigo-600 flex items-center justify-center transition"
                            >
                                📘
                            </a>

                            <a
                                href="#"
                                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-indigo-600 flex items-center justify-center transition"
                            >
                                🐦
                            </a>

                            <a
                                href="#"
                                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-indigo-600 flex items-center justify-center transition"
                            >
                                📸
                            </a>

                            <a
                                href="#"
                                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-indigo-600 flex items-center justify-center transition"
                            >
                                💼
                            </a>

                        </div>
                    </div>

                    {/* Marketplace */}
                    <div>
                        <h3 className="text-white font-semibold text-lg mb-4">
                            Marketplace
                        </h3>

                        <ul className="space-y-3">
                            <li>
                                <Link href="/marketplace" className="hover:text-white">
                                    Browse Products
                                </Link>
                            </li>

                            <li>
                                <Link href="/categories" className="hover:text-white">
                                    Categories
                                </Link>
                            </li>

                            <li>
                                <Link href="/products/create" className="hover:text-white">
                                    Sell a Product
                                </Link>
                            </li>

                            <li>
                                <Link href="/top-sellers" className="hover:text-white">
                                    Top Sellers
                                </Link>
                            </li>

                            <li>
                                <Link href="/new-products" className="hover:text-white">
                                    New Products
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Freelancing */}
                    <div>
                        <h3 className="text-white font-semibold text-lg mb-4">
                            Freelancing
                        </h3>

                        <ul className="space-y-3">
                            <li>
                                <Link href="/freelancers" className="hover:text-white">
                                    Find Freelancers
                                </Link>
                            </li>

                            <li>
                                <Link href="/projects" className="hover:text-white">
                                    Browse Projects
                                </Link>
                            </li>

                            <li>
                                <Link href="/projects/create" className="hover:text-white">
                                    Post a Project
                                </Link>
                            </li>

                            <li>
                                <Link href="/become-freelancer" className="hover:text-white">
                                    Become a Freelancer
                                </Link>
                            </li>

                            <li>
                                <Link href="/verification" className="hover:text-white">
                                    Get Verified
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-white font-semibold text-lg mb-4">
                            Support
                        </h3>

                        <ul className="space-y-3">
                            <li>
                                <Link href="/help-center" className="hover:text-white">
                                    Help Center
                                </Link>
                            </li>

                            <li>
                                <Link href="/contact" className="hover:text-white">
                                    Contact Us
                                </Link>
                            </li>

                            <li>
                                <Link href="/faq" className="hover:text-white">
                                    FAQs
                                </Link>
                            </li>

                            <li>
                                <Link href="/privacy-policy" className="hover:text-white">
                                    Privacy Policy
                                </Link>
                            </li>

                            <li>
                                <Link href="/terms" className="hover:text-white">
                                    Terms & Conditions
                                </Link>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>

            {/* Newsletter */}
            <div className="border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

                    <div className="flex flex-col lg:flex-row items-center justify-between gap-6">

                        <div>
                            <h3 className="text-xl font-semibold text-white">
                                Subscribe to Our Newsletter
                            </h3>

                            <p className="text-gray-400 mt-1">
                                Get updates on new products, freelancers, and opportunities.
                            </p>
                        </div>

                        <form className="flex w-full lg:w-auto">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="px-4 py-3 rounded-l-xl bg-gray-900 border border-gray-700 text-white w-full lg:w-80 focus:outline-none focus:border-indigo-500"
                            />

                            <button
                                type="submit"
                                className="px-6 py-3 bg-indigo-600 text-white rounded-r-xl hover:bg-indigo-700"
                            >
                                Subscribe
                            </button>
                        </form>

                    </div>
                </div>
            </div>

            {/* Bottom Footer */}
            <div className="border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">

                        <p className="text-gray-500 text-sm">
                            © {year} SharptechLearners. All rights reserved.
                        </p>

                        <div className="flex flex-wrap justify-center gap-6 text-sm">
                            <Link href="/privacy-policy" className="hover:text-white">
                                Privacy
                            </Link>

                            <Link href="/terms" className="hover:text-white">
                                Terms
                            </Link>

                            <Link href="/cookies" className="hover:text-white">
                                Cookies
                            </Link>

                            <Link href="/security" className="hover:text-white">
                                Security
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </footer>
    );
}