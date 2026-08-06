import React from "react";

export default function Statistics() {
    const stats = [
        {
            id: 1,
            label: "Digital Products",
            value: "10K+",
            icon: "📦",
            color: "text-indigo-600",
        },
        {
            id: 2,
            label: "Verified Freelancers",
            value: "5K+",
            icon: "🧑‍💻",
            color: "text-green-600",
        },
        {
            id: 3,
            label: "Completed Projects",
            value: "50K+",
            icon: "🚀",
            color: "text-yellow-600",
        },
        {
            id: 4,
            label: "Active Users",
            value: "120K+",
            icon: "🌍",
            color: "text-purple-600",
        },
    ];

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="text-center mb-14">
                    <span className="inline-flex px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium">
                        Platform Statistics
                    </span>

                    <h2 className="mt-4 text-4xl font-bold text-gray-900">
                        Trusted by Creators Worldwide
                    </h2>

                    <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                        SharpTechLearners is growing fast with thousands of digital
                        products, freelancers, and successful projects every day.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

                    {stats.map((stat) => (
                        <div
                            key={stat.id}
                            className="bg-gray-50 border rounded-2xl p-8 text-center hover:shadow-lg transition"
                        >
                            <div className="text-4xl mb-3">{stat.icon}</div>

                            <h3 className={`text-3xl font-bold ${stat.color}`}>
                                {stat.value}
                            </h3>

                            <p className="text-gray-600 mt-2">
                                {stat.label}
                            </p>
                        </div>
                    ))}

                </div>

                {/* Extra Insight Section */}
                <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">

                    <div className="bg-indigo-50 rounded-2xl p-6">
                        <h4 className="text-xl font-bold text-indigo-700">
                            Fast Growth
                        </h4>
                        <p className="text-gray-600 mt-2">
                            Thousands of new users join every month to buy and
                            sell digital assets.
                        </p>
                    </div>

                    <div className="bg-green-50 rounded-2xl p-6">
                        <h4 className="text-xl font-bold text-green-700">
                            Secure Platform
                        </h4>
                        <p className="text-gray-600 mt-2">
                            Escrow payments and verification ensure safe transactions.
                        </p>
                    </div>

                    <div className="bg-yellow-50 rounded-2xl p-6">
                        <h4 className="text-xl font-bold text-yellow-700">
                            Global Reach
                        </h4>
                        <p className="text-gray-600 mt-2">
                            Users from over 120+ countries use SharpTechLearners daily.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
}