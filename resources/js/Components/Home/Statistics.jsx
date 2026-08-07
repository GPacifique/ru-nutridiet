import React from "react";
import GuestLayout from "@/Layouts/GuestLayout";

export default function Statistics() {

    const statistics = [
        {
            number: "500+",
            title: "Clients Supported",
            description: "Individuals guided toward healthier lifestyles",
            icon: "👥",
        },

        {
            number: "1,200+",
            title: "Nutrition Consultations",
            description: "Professional health and diet consultations completed",
            icon: "🥗",
        },

        {
            number: "300+",
            title: "Personalized Meal Plans",
            description: "Nutrition plans designed for individual needs",
            icon: "🍎",
        },

        {
            number: "95%",
            title: "Client Satisfaction",
            description: "Clients happy with our nutrition support",
            icon: "⭐",
        },
    ];


    return (
        <GuestLayout>

            <div className="max-w-7xl mx-auto px-6 py-16">


                {/* Header */}
                <section className="text-center mb-12">

                    <h1 className="text-4xl font-bold text-green-700">
                        Our Impact
                    </h1>

                    <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                        Our commitment is measured by the number of people we
                        have helped achieve better health through professional
                        nutrition care.
                    </p>

                </section>



                {/* Statistics Cards */}
                <div className="grid md:grid-cols-4 gap-8">


                    {statistics.map((item, index) => (

                        <div
                            key={index}
                            className="bg-white shadow rounded-xl p-8 text-center hover:shadow-lg transition"
                        >

                            <div className="text-4xl mb-4">
                                {item.icon}
                            </div>


                            <h2 className="text-4xl font-bold text-green-700">
                                {item.number}
                            </h2>


                            <h3 className="text-xl font-semibold mt-3">
                                {item.title}
                            </h3>


                            <p className="text-gray-600 mt-2">
                                {item.description}
                            </p>

                        </div>

                    ))}


                </div>



                {/* Health Message */}
                <section className="mt-16 bg-green-700 text-white rounded-xl p-10 text-center">

                    <h2 className="text-3xl font-bold">
                        Your Health Journey Starts Here
                    </h2>

                    <p className="mt-4 text-green-100 max-w-3xl mx-auto">
                        Whether you want to manage your weight, improve your
                        nutrition, or achieve better wellness, RUNUTRIDIET-CPT
                        provides personalized solutions that fit your lifestyle.
                    </p>


                    <a
                        href="/contact"
                        className="inline-block mt-6 bg-white text-green-700 px-8 py-3 rounded-lg font-semibold"
                    >
                        Book A Consultation
                    </a>


                </section>


            </div>

        </GuestLayout>
    );
}