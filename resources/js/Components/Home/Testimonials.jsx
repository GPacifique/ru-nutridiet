import React from "react";
import GuestLayout from "@/Layouts/GuestLayout";

export default function Testimonials() {

    const testimonials = [
        {
            name: "Sarah Mukamana",
            role: "Weight Management Client",
            message:
                "RUNUTRIDIET-CPT helped me understand my eating habits and create a healthier lifestyle. I achieved my goals with professional guidance and support.",
        },

        {
            name: "Jean Claude",
            role: "Sports Nutrition Client",
            message:
                "The nutrition advice improved my energy levels and my training performance. The meal plan was practical and easy to follow.",
        },

        {
            name: "Grace Uwase",
            role: "Nutrition Consultation Client",
            message:
                "I received personalized advice based on my health needs. The follow-up and support made my journey much easier.",
        },
    ];


    return (
        <GuestLayout>

            <div className="max-w-7xl mx-auto px-6 py-16">


                {/* Header */}
                <section className="text-center mb-12">

                    <h1 className="text-4xl font-bold text-green-700">
                        Our Client Testimonials
                    </h1>

                    <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
                        Discover how RUNUTRIDIET-CPT has helped clients improve
                        their nutrition, health, and lifestyle through
                        personalized care.
                    </p>

                </section>



                {/* Testimonials */}
                <div className="grid md:grid-cols-3 gap-8">


                    {testimonials.map((testimonial, index) => (

                        <div
                            key={index}
                            className="bg-white shadow rounded-xl p-8"
                        >

                            <div className="text-green-700 text-4xl mb-4">
                                "
                            </div>


                            <p className="text-gray-600 leading-relaxed">
                                {testimonial.message}
                            </p>


                            <div className="mt-6 border-t pt-4">

                                <h3 className="font-bold text-lg">
                                    {testimonial.name}
                                </h3>

                                <p className="text-green-700 text-sm">
                                    {testimonial.role}
                                </p>

                            </div>


                        </div>

                    ))}


                </div>



                {/* CTA */}
                <section className="mt-16 bg-green-700 text-white rounded-xl p-10 text-center">

                    <h2 className="text-3xl font-bold">
                        Start Your Health Transformation Today
                    </h2>


                    <p className="mt-3 text-green-100">
                        Get professional nutrition support designed around your
                        personal goals.
                    </p>


                    <a
                        href="/contact"
                        className="inline-block mt-6 bg-white text-green-700 px-8 py-3 rounded-lg font-semibold"
                    >
                        Book Consultation
                    </a>


                </section>


            </div>

        </GuestLayout>
    );
}