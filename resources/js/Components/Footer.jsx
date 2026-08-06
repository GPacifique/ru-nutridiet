import React from "react";
import { Link } from "@inertiajs/react";
import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaLinkedinIn,
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaEnvelope,
} from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 mt-16">
            <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">

                {/* Brand */}
                <div>
                    <h2 className="text-3xl font-bold text-white">
                        InzuNest
                    </h2>
                    <p className="mt-4 text-sm leading-relaxed">
                        Find your dream property with ease. InzuNest connects
                        buyers, sellers, renters, and agents through a modern
                        digital real estate experience.
                    </p>

                    {/* Social Icons */}
                    <div className="flex gap-3 mt-5">
                        <a
                            href="#"
                            className="bg-gray-800 p-2 rounded-full hover:bg-blue-500 transition"
                        >
                            <FaFacebookF />
                        </a>
                        <a
                            href="#"
                            className="bg-gray-800 p-2 rounded-full hover:bg-blue-500 transition"
                        >
                            <FaTwitter />
                        </a>
                        <a
                            href="#"
                            className="bg-gray-800 p-2 rounded-full hover:bg-blue-500 transition"
                        >
                            <FaInstagram />
                        </a>
                        <a
                            href="#"
                            className="bg-gray-800 p-2 rounded-full hover:bg-blue-500 transition"
                        >
                            <FaLinkedinIn />
                        </a>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-white font-semibold mb-4 text-lg">
                        Quick Links
                    </h3>
                    <ul className="space-y-3 text-sm">
                        <li>
                            <Link href="/" className="hover:text-blue-400">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link href="/properties" className="hover:text-blue-400">
                                Properties
                            </Link>
                        </li>
                        <li>
                            <Link href="/agents" className="hover:text-blue-400">
                                Agents
                            </Link>
                        </li>
                        <li>
                            <Link href="/contact" className="hover:text-blue-400">
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Services */}
                <div>
                    <h3 className="text-white font-semibold mb-4 text-lg">
                        Services
                    </h3>
                    <ul className="space-y-3 text-sm">
                        <li>Buy Property</li>
                        <li>Rent Property</li>
                        <li>Sell Property</li>
                        <li>Property Listing</li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="text-white font-semibold mb-4 text-lg">
                        Contact Us
                    </h3>

                    <div className="space-y-3 text-sm">
                        <p className="flex items-center gap-2">
                            <FaEnvelope className="text-blue-400" />
                            support@inzunest.com
                        </p>

                        <p className="flex items-center gap-2">
                            <FaPhoneAlt className="text-blue-400" />
                            +250 787 457 398
                        </p>

                        <p className="flex items-center gap-2">
                            <FaMapMarkerAlt className="text-blue-400" />
                            Kigali, Rwanda
                        </p>
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center text-sm">
                    <p>
                        © {new Date().getFullYear()} InzuNest. All rights reserved.
                    </p>

                    <div className="flex gap-4 mt-3 md:mt-0">
                        <Link href="/privacy" className="hover:text-blue-400">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="hover:text-blue-400">
                            Terms
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}