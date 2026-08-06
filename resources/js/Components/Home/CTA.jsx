import React from "react";
import { Link } from "@inertiajs/react";

export default function CTA() {
    return (
        <section className="py-20 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white/10 backdrop-blur-md rounded-3xl p-10 lg:p-16 border border-white/20">

                    <div className="text-center max-w-4xl mx-auto">

                        <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 text-white text-sm font-medium mb-6">
                            🚀 Join Thousands of Creators & Businesses
                        </span>

                        <h2 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
                            Turn Your Skills Into
                            <span className="block text-yellow-300">
                                Income & Opportunities
                            </span>
                        </h2>

                        <p className="mt-6 text-lg lg:text-xl text-indigo-100">
                            Sell digital products, showcase your expertise,
                            hire verified freelancers, and grow your business
                            on one powerful platform.
                        </p>

                        {/* CTA Buttons */}
                        <div className="mt-10 flex flex-wrap justify-center gap-4">

                            <Link
                                href="/register"
                                className="px-8 py-4 bg-yellow-400 text-gray-900 rounded-xl font-semibold hover:bg-yellow-300 transition"
                            >
                                Get Started Free
                            </Link>

                            <Link
                                href="/products/create"
                                className="px-8 py-4 bg-white text-indigo-700 rounded-xl font-semibold hover:bg-gray-100 transition"
                            >
                                Sell a Product
                            </Link>

                            <Link
                                href="/projects/create"
                                className="px-8 py-4 border border-white text-white rounded-xl font-semibold hover:bg-white/10 transition"
                            >
                                Post a Project
                            </Link>

                        </div>

                        {/* Features */}
                        <div className="mt-12 grid md:grid-cols-3 gap-6 text-left">

                            <div className="bg-white/10 rounded-2xl p-6">
                                <div className="text-3xl mb-4">💻</div>

                                <h3 className="text-xl font-semibold text-white mb-2">
                                    Sell Digital Products
                                </h3>

                                <p className="text-indigo-100">
                                    Upload source code, templates, graphics,
                                    eBooks, PDFs, courses, and more.
                                </p>
                            </div>

                            <div className="bg-white/10 rounded-2xl p-6">
                                <div className="text-3xl mb-4">🎯</div>

                                <h3 className="text-xl font-semibold text-white mb-2">
                                    Hire Verified Experts
                                </h3>

                                <p className="text-indigo-100">
                                    Find trusted freelancers and get your
                                    projects completed professionally.
                                </p>
                            </div>

                            <div className="bg-white/10 rounded-2xl p-6">
                                <div className="text-3xl mb-4">🔒</div>

                                <h3 className="text-xl font-semibold text-white mb-2">
                                    Secure Payments
                                </h3>

                                <p className="text-indigo-100">
                                    Protected transactions, escrow services,
                                    and safe digital downloads.
                                </p>
                            </div>

                        </div>

                        {/* Stats */}
                        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6">

                            <div>
                                <h3 className="text-3xl font-bold text-white">
                                    10K+
                                </h3>
                                <p className="text-indigo-100">
                                    Products
                                </p>
                            </div>

                            <div>
                                <h3 className="text-3xl font-bold text-white">
                                    5K+
                                </h3>
                                <p className="text-indigo-100">
                                    Freelancers
                                </p>
                            </div>

                            <div>
                                <h3 className="text-3xl font-bold text-white">
                                    50K+
                                </h3>
                                <p className="text-indigo-100">
                                    Orders
                                </p>
                            </div>

                            <div>
                                <h3 className="text-3xl font-bold text-white">
                                    120+
                                </h3>
                                <p className="text-indigo-100">
                                    Countries
                                </p>
                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
}