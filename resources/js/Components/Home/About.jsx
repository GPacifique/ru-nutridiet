import React from "react";
import GuestLayout from "@/Layouts/GuestLayout";

export default function About() {
    return (
        <GuestLayout>
            <div className="max-w-7xl mx-auto px-6 py-16">

                {/* Hero Section */}
                <section className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-green-700">
                        About RUNUTRIDIET-CPT
                    </h1>

                    <p className="mt-5 text-lg text-gray-600 max-w-3xl mx-auto">
                        RUNUTRIDIET-CPT is a professional nutrition clinic
                        dedicated to helping individuals achieve better health
                        through personalized nutrition counseling, balanced
                        diets, and evidence-based lifestyle solutions.
                    </p>
                </section>


                {/* Who We Are */}
                <section className="grid md:grid-cols-2 gap-10 items-center">

                    <div>
                        <h2 className="text-3xl font-bold mb-4">
                            Who We Are
                        </h2>

                        <p className="text-gray-600 leading-relaxed">
                            At RUNUTRIDIET-CPT, we believe that good nutrition
                            is the foundation of a healthy life. Our team works
                            with individuals, families, and organizations to
                            develop practical nutrition plans that match their
                            health goals, lifestyle, and medical needs.
                        </p>

                        <p className="mt-4 text-gray-600 leading-relaxed">
                            Whether your goal is weight management, disease
                            prevention, sports performance, or improving your
                            overall wellbeing, we provide guidance based on
                            professional nutrition principles.
                        </p>
                    </div>


                    <div className="bg-green-50 rounded-xl p-8">
                        <h3 className="text-2xl font-semibold text-green-700 mb-4">
                            Our Approach
                        </h3>

                        <ul className="space-y-3 text-gray-700">
                            <li>
                                ✓ Personalized nutrition assessment
                            </li>

                            <li>
                                ✓ Individual diet planning
                            </li>

                            <li>
                                ✓ Healthy weight management programs
                            </li>

                            <li>
                                ✓ Lifestyle and wellness coaching
                            </li>

                            <li>
                                ✓ Continuous follow-up and support
                            </li>
                        </ul>
                    </div>

                </section>


                {/* Services */}
                <section className="mt-20">

                    <h2 className="text-3xl font-bold text-center mb-10">
                        Our Nutrition Services
                    </h2>


                    <div className="grid md:grid-cols-3 gap-8">

                        <div className="bg-white shadow rounded-xl p-6">
                            <h3 className="text-xl font-bold mb-3">
                                Nutrition Consultation
                            </h3>

                            <p className="text-gray-600">
                                Professional assessment and nutrition guidance
                                designed according to your personal health goals.
                            </p>
                        </div>


                        <div className="bg-white shadow rounded-xl p-6">
                            <h3 className="text-xl font-bold mb-3">
                                Weight Management
                            </h3>

                            <p className="text-gray-600">
                                Sustainable programs to support healthy weight
                                loss, weight gain, and body composition goals.
                            </p>
                        </div>


                        <div className="bg-white shadow rounded-xl p-6">
                            <h3 className="text-xl font-bold mb-3">
                                Sports Nutrition
                            </h3>

                            <p className="text-gray-600">
                                Nutrition strategies for athletes and active
                                individuals to improve performance and recovery.
                            </p>
                        </div>

                    </div>

                </section>


                {/* Mission Vision */}
                <section className="mt-20 grid md:grid-cols-2 gap-8">

                    <div className="bg-gray-50 rounded-xl p-8">
                        <h2 className="text-2xl font-bold mb-3">
                            Our Mission
                        </h2>

                        <p className="text-gray-600">
                            To provide quality nutrition care that empowers
                            people to make healthier choices and improve their
                            quality of life.
                        </p>
                    </div>


                    <div className="bg-gray-50 rounded-xl p-8">
                        <h2 className="text-2xl font-bold mb-3">
                            Our Vision
                        </h2>

                        <p className="text-gray-600">
                            To become a trusted nutrition clinic recognized
                            for improving health through personalized,
                            practical, and sustainable nutrition solutions.
                        </p>
                    </div>

                </section>


            </div>
        </GuestLayout>
    );
}