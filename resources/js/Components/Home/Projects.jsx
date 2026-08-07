import React from "react";
import GuestLayout from "@/Layouts/GuestLayout";

export default function Projects() {

    const projects = [
        {
            title: "Healthy Weight Management Program",
            description:
                "A personalized nutrition program designed to help individuals achieve sustainable weight loss or healthy weight gain through balanced diets and lifestyle changes.",
            icon: "⚖️",
        },

        {
            title: "Community Nutrition Awareness",
            description:
                "Educational sessions that promote healthy eating habits, disease prevention, and better nutrition choices within communities.",
            icon: "🌱",
        },

        {
            title: "Sports Nutrition Program",
            description:
                "Nutrition support for athletes and active people to improve performance, recovery, and overall physical wellbeing.",
            icon: "🏃",
        },

        {
            title: "Maternal & Child Nutrition Support",
            description:
                "Nutrition guidance supporting mothers and children with healthy meal planning and improved nutritional outcomes.",
            icon: "👩‍👧",
        },

        {
            title: "Corporate Wellness Program",
            description:
                "Workplace nutrition programs helping organizations improve employee health, productivity, and wellness culture.",
            icon: "🏢",
        },

        {
            title: "Nutrition Education Platform",
            description:
                "Digital resources, articles, and learning materials to make professional nutrition knowledge accessible to more people.",
            icon: "📚",
        },
    ];


    return (
        <GuestLayout>

            <div className="max-w-7xl mx-auto px-6 py-16">


                {/* Header */}
                <section className="text-center mb-12">

                    <h1 className="text-4xl font-bold text-green-700">
                        Our Projects & Programs
                    </h1>

                    <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
                        At RUNUTRIDIET-CPT, we develop nutrition programs and
                        wellness initiatives that improve health outcomes for
                        individuals, families, athletes, and organizations.
                    </p>

                </section>



                {/* Projects Grid */}
                <div className="grid md:grid-cols-3 gap-8">


                    {projects.map((project, index) => (

                        <div
                            key={index}
                            className="bg-white shadow rounded-xl p-8 hover:shadow-lg transition"
                        >

                            <div className="text-4xl mb-5">
                                {project.icon}
                            </div>


                            <h2 className="text-xl font-bold mb-3">
                                {project.title}
                            </h2>


                            <p className="text-gray-600 leading-relaxed">
                                {project.description}
                            </p>


                            <button
                                className="mt-5 text-green-700 font-semibold"
                            >
                                Learn More →
                            </button>


                        </div>

                    ))}


                </div>



                {/* Partnership CTA */}
                <section className="mt-16 bg-green-700 text-white rounded-xl p-10 text-center">

                    <h2 className="text-3xl font-bold">
                        Partner With RUNUTRIDIET-CPT
                    </h2>


                    <p className="mt-4 text-green-100 max-w-3xl mx-auto">
                        We collaborate with schools, companies, fitness
                        centers, healthcare providers, and communities to
                        promote healthier lifestyles.
                    </p>


                    <a
                        href="/contact"
                        className="inline-block mt-6 bg-white text-green-700 px-8 py-3 rounded-lg font-semibold"
                    >
                        Contact Us
                    </a>


                </section>


            </div>

        </GuestLayout>
    );
}