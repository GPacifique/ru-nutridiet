import React from "react";
import { Link } from "@inertiajs/react";

export default function Footer() {
    return (
        <footer className="bg-green-900 text-white mt-16">

            <div className="max-w-7xl mx-auto px-6 py-12">

                <div className="grid md:grid-cols-4 gap-10">

                    {/* Brand */}
                    <div>
                        <h2 className="text-2xl font-bold mb-4">
                            <ApplicationLogo className="block h-10 w-10 max-h-6 max-w-6 object-contain" />
                        </h2>

                        <p className="text-green-100 leading-relaxed">
                            A professional nutrition clinic helping individuals
                            achieve healthier lives through personalized diet
                            plans, nutrition counseling, and wellness support.
                        </p>
                    </div>


                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">
                            Quick Links
                        </h3>

                        <ul className="space-y-3 text-green-100">

                            <li>
                                <Link href="/" className="hover:text-white">
                                    Home
                                </Link>
                            </li>

                            <li>
                                <Link href="/about" className="hover:text-white">
                                    About Us
                                </Link>
                            </li>

                            <li>
                                <Link href="/services" className="hover:text-white">
                                    Services
                                </Link>
                            </li>

                            <li>
                                <Link href="/contact" className="hover:text-white">
                                    Contact
                                </Link>
                            </li>

                        </ul>
                    </div>


                    {/* Services */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">
                            Our Services
                        </h3>

                        <ul className="space-y-3 text-green-100">

                            <li>
                                Nutrition Consultation
                            </li>

                            <li>
                                Weight Management
                            </li>

                            <li>
                                Sports Nutrition
                            </li>

                            <li>
                                Personalized Meal Plans
                            </li>

                            <li>
                                Wellness Coaching
                            </li>

                        </ul>
                    </div>


                    {/* Contact */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">
                            Contact Us
                        </h3>

                        <ul className="space-y-3 text-green-100">

                            <li>
                                📍 Kigali, Rwanda
                            </li>

                            <li>
                                📞 +250 785 221 105
                            </li>

                            <li>
                                ✉ info@runutridiet.com
                            </li>

                            <li>
                                🕒 Mon - Sat: 8:00 AM - 6:00 PM
                            </li>

                        </ul>

                    </div>

                </div>


                {/* Bottom */}
                <div className="border-t border-green-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">

                    <p className="text-green-200 text-sm">
                        © {new Date().getFullYear()} RUNUTRIDIET-CPT.
                        All rights reserved.
                    </p>


                    <div className="flex gap-5 mt-4 md:mt-0 text-green-200">

                        <a href="#" className="hover:text-white">
                            Facebook
                        </a>

                        <a href="#" className="hover:text-white">
                            Instagram
                        </a>

                        <a href="#" className="hover:text-white">
                            WhatsApp
                        </a>

                    </div>

                </div>

            </div>

        </footer>
    );
}