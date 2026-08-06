import React from "react";

export default function Testimonials() {
    const testimonials = [
        {
            id: 1,
            name: "Sarah Johnson",
            role: "Business Owner",
            image: "https://i.pravatar.cc/150?img=32",
            rating: 5,
            review:
                "SharpTechLearners helped me find an experienced developer within days. The project was delivered on time and exceeded my expectations.",
        },
        {
            id: 2,
            name: "Michael Brown",
            role: "Laravel Developer",
            image: "https://i.pravatar.cc/150?img=12",
            rating: 5,
            review:
                "I've sold multiple Laravel projects on SharpTechLearners. The platform makes it easy to reach customers worldwide and manage sales.",
        },
        {
            id: 3,
            name: "Emily Davis",
            role: "UI/UX Designer",
            image: "https://i.pravatar.cc/150?img=47",
            rating: 5,
            review:
                "The freelancing marketplace is fantastic. I consistently receive project invitations and secure payments without hassle.",
        },
    ];

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="text-center mb-16">
                    <span className="inline-flex px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium">
                        Testimonials
                    </span>

                    <h2 className="mt-4 text-4xl font-bold text-gray-900">
                        Trusted by Thousands Worldwide
                    </h2>

                    <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                        See what buyers, freelancers, and digital creators
                        are saying about their experience with SharpTechLearners.
                    </p>
                </div>

                {/* Testimonials Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {testimonials.map((testimonial) => (
                        <div
                            key={testimonial.id}
                            className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition"
                        >
                            {/* Rating */}
                            <div className="flex mb-4">
                                {[...Array(testimonial.rating)].map((_, index) => (
                                    <span key={index} className="text-yellow-400 text-xl">
                                        ★
                                    </span>
                                ))}
                            </div>

                            {/* Review */}
                            <p className="text-gray-600 leading-relaxed mb-6">
                                "{testimonial.review}"
                            </p>

                            {/* User */}
                            <div className="flex items-center gap-4">
                                <img
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    className="w-14 h-14 rounded-full object-cover"
                                />

                                <div>
                                    <h4 className="font-semibold text-gray-900">
                                        {testimonial.name}
                                    </h4>

                                    <p className="text-sm text-gray-500">
                                        {testimonial.role}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>

                {/* Statistics */}
                <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">

                    <div className="text-center bg-gray-50 rounded-xl p-6">
                        <h3 className="text-3xl font-bold text-indigo-600">
                            50K+
                        </h3>
                        <p className="text-gray-600 mt-2">
                            Completed Orders
                        </p>
                    </div>

                    <div className="text-center bg-gray-50 rounded-xl p-6">
                        <h3 className="text-3xl font-bold text-green-600">
                            10K+
                        </h3>
                        <p className="text-gray-600 mt-2">
                            Digital Products
                        </p>
                    </div>

                    <div className="text-center bg-gray-50 rounded-xl p-6">
                        <h3 className="text-3xl font-bold text-yellow-500">
                            5K+
                        </h3>
                        <p className="text-gray-600 mt-2">
                            Freelancers
                        </p>
                    </div>

                    <div className="text-center bg-gray-50 rounded-xl p-6">
                        <h3 className="text-3xl font-bold text-purple-600">
                            4.9/5
                        </h3>
                        <p className="text-gray-600 mt-2">
                            Average Rating
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
}