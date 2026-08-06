import React from "react";
import { Link } from "@inertiajs/react";

export default function About() {
    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold">
                        About SharpTechLearners
                    </span>

                    <h2 className="mt-4 text-4xl font-bold text-gray-900">
                        One Platform for Digital Products & Freelance Services
                    </h2>

                    <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-600">
                        SharpTechLearners connects creators, developers, designers,
                        businesses, and freelancers from around the world.
                        Buy and sell digital products, hire verified experts,
                        and grow your business with confidence.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* Left Content */}
                    <div>
                        <h3 className="text-3xl font-bold text-gray-900 mb-6">
                            Empowering Digital Creators & Professionals
                        </h3>

                        <p className="text-gray-600 mb-6 leading-relaxed">
                            Whether you're selling source code, templates,
                            eBooks, graphics, courses, or offering professional
                            freelance services, SharpTechLearners provides the tools
                            you need to succeed.
                        </p>

                        <p className="text-gray-600 mb-8 leading-relaxed">
                            Our platform combines a powerful digital marketplace
                            with a secure freelancing ecosystem, making it easy
                            to buy, sell, collaborate, and get paid.
                        </p>

                        <div className="grid sm:grid-cols-2 gap-6 mb-8">

                            <div className="bg-white p-5 rounded-xl shadow-sm border">
                                <h4 className="font-semibold text-gray-900 mb-2">
                                    Digital Marketplace
                                </h4>
                                <p className="text-gray-600 text-sm">
                                    Sell source code, templates, graphics,
                                    eBooks, PDFs, courses, and more.
                                </p>
                            </div>

                            <div className="bg-white p-5 rounded-xl shadow-sm border">
                                <h4 className="font-semibold text-gray-900 mb-2">
                                    Verified Freelancers
                                </h4>
                                <p className="text-gray-600 text-sm">
                                    Hire trusted professionals for your next
                                    project with confidence.
                                </p>
                            </div>

                            <div className="bg-white p-5 rounded-xl shadow-sm border">
                                <h4 className="font-semibold text-gray-900 mb-2">
                                    Secure Payments
                                </h4>
                                <p className="text-gray-600 text-sm">
                                    Escrow protection, secure transactions, and
                                    transparent payment processing.
                                </p>
                            </div>

                            <div className="bg-white p-5 rounded-xl shadow-sm border">
                                <h4 className="font-semibold text-gray-900 mb-2">
                                    Global Community
                                </h4>
                                <p className="text-gray-600 text-sm">
                                    Connect with creators and businesses from
                                    around the world.
                                </p>
                            </div>

                        </div>

                        <div className="flex flex-wrap gap-4">
                            <Link
                                href="/register"
                                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                            >
                                Join SharpTechLearners
                            </Link>

                            <Link
                                href="/marketplace"
                                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                            >
                                Explore Marketplace
                            </Link>
                        </div>
                    </div>

                    {/* Right Content */}
                    <div>
                        <div className="bg-white rounded-2xl shadow-lg p-8 border">

                            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                                Why Choose SharpTechLearners?
                            </h3>

                            <div className="space-y-6">

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-xl">
                                        🚀
                                    </div>

                                    <div>
                                        <h4 className="font-semibold text-gray-900">
                                            Launch Faster
                                        </h4>
                                        <p className="text-gray-600">
                                            Access ready-made digital assets
                                            and source code to accelerate your
                                            projects.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-xl">
                                        🔒
                                    </div>

                                    <div>
                                        <h4 className="font-semibold text-gray-900">
                                            Trusted Platform
                                        </h4>
                                        <p className="text-gray-600">
                                            Verified freelancers, secure
                                            payments, and buyer protection.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center text-xl">
                                        💼
                                    </div>

                                    <div>
                                        <h4 className="font-semibold text-gray-900">
                                            Freelance Opportunities
                                        </h4>
                                        <p className="text-gray-600">
                                            Find work, submit proposals, and
                                            build your professional reputation.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-xl">
                                        🌍
                                    </div>

                                    <div>
                                        <h4 className="font-semibold text-gray-900">
                                            Worldwide Reach
                                        </h4>
                                        <p className="text-gray-600">
                                            Sell products and offer services to
                                            customers around the globe.
                                        </p>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>

                </div>

                {/* Statistics */}
                <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">

                    <div className="bg-white p-6 rounded-xl text-center shadow-sm border">
                        <h3 className="text-3xl font-bold text-indigo-600">
                            10K+
                        </h3>
                        <p className="text-gray-600 mt-2">
                            Digital Products
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-xl text-center shadow-sm border">
                        <h3 className="text-3xl font-bold text-green-600">
                            5K+
                        </h3>
                        <p className="text-gray-600 mt-2">
                            Freelancers
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-xl text-center shadow-sm border">
                        <h3 className="text-3xl font-bold text-yellow-600">
                            50K+
                        </h3>
                        <p className="text-gray-600 mt-2">
                            Completed Orders
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-xl text-center shadow-sm border">
                        <h3 className="text-3xl font-bold text-purple-600">
                            120+
                        </h3>
                        <p className="text-gray-600 mt-2">
                            Countries Served
                        </p>
                    </div>

                </div>

            </div>
        </section>
    );
}