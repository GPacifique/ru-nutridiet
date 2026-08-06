import { Link } from "@inertiajs/react";

export default function Hero() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-blue-800 to-purple-900 text-white">
            <div className="absolute inset-0 bg-black/20"></div>

            <div className="relative max-w-7xl mx-auto px-6 py-24 lg:py-32">
                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* Left Content */}
                    <div>
                        <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 text-sm font-medium mb-6">
                            🚀 Digital Marketplace & Freelancing Platform
                        </span>

                        <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight">
                            Buy, Sell &
                            <span className="block text-yellow-400">
                                Hire Experts
                            </span>
                        </h1>

                        <p className="mt-6 text-lg text-gray-200 max-w-xl">
                            Discover premium source code, templates, designs,
                            eBooks, courses, and digital assets. Hire verified
                            freelancers to bring your projects to life.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-4">
                            <Link
                                href="/marketplace"
                                className="px-8 py-4 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-black font-semibold transition"
                            >
                                Explore Marketplace
                            </Link>

                            <Link
                                href="/projects"
                                className="px-8 py-4 rounded-xl border border-white/30 hover:bg-white/10 transition"
                            >
                                Find Freelancers
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="mt-12 grid grid-cols-3 gap-6">
                            <div>
                                <h3 className="text-3xl font-bold">10K+</h3>
                                <p className="text-gray-300">
                                    Digital Products
                                </p>
                            </div>

                            <div>
                                <h3 className="text-3xl font-bold">5K+</h3>
                                <p className="text-gray-300">
                                    Verified Freelancers
                                </p>
                            </div>

                            <div>
                                <h3 className="text-3xl font-bold">50K+</h3>
                                <p className="text-gray-300">
                                    Successful Orders
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Content */}
                    <div className="relative">
                        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">

                            <div className="space-y-5">

                                <div className="bg-white rounded-xl p-4 text-gray-900">
                                    <h3 className="font-semibold">
                                        React Ecommerce App
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        Complete Source Code
                                    </p>

                                    <div className="mt-3 flex justify-between">
                                        <span className="font-bold">
                                            $49
                                        </span>
                                        <span className="text-green-600">
                                            ⭐ 4.9
                                        </span>
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl p-4 text-gray-900">
                                    <h3 className="font-semibold">
                                        Laravel SaaS System
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        Multi-Tenant Platform
                                    </p>

                                    <div className="mt-3 flex justify-between">
                                        <span className="font-bold">
                                            $89
                                        </span>
                                        <span className="text-green-600">
                                            ⭐ 5.0
                                        </span>
                                    </div>
                                </div>

                                <div className="bg-indigo-600 rounded-xl p-5">
                                    <h3 className="font-bold text-xl">
                                        Need Custom Work?
                                    </h3>

                                    <p className="text-indigo-100 mt-2">
                                        Hire verified freelancers and get your
                                        project completed professionally.
                                    </p>

                                    <button className="mt-4 bg-white text-indigo-700 px-5 py-2 rounded-lg font-semibold">
                                        Post a Project
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}