import React from "react";
import { Head, Link } from "@inertiajs/react";
import PublicNavigation from "@/Components/PublicNavigation";
export default function Index() {
    const services = [
        {
            id: 1,
            title: "Nutritional Assessment",
            short: "Understand your nutritional status and identify areas that need attention.",
            description:
                "A comprehensive assessment of your nutritional status, dietary habits, lifestyle, body measurements, and individual nutrition needs.",
            features: [
                "Anthropometric assessment",
                "Dietary assessment",
                "Lifestyle assessment",
                "Nutrition risk identification",
                "Personalized recommendations",
            ],
            icon: "📊",
        },
        {
            id: 2,
            title: "Personalized Meal Planning",
            short: "Receive a nutrition plan adapted to your individual needs and goals.",
            description:
                "Personalized meal planning based on your nutritional requirements, lifestyle, health goals, food preferences, and daily routine.",
            features: [
                "Personalized meal plan",
                "Portion guidance",
                "Food selection guidance",
                "Meal timing recommendations",
                "Progress-based adjustments",
            ],
            icon: "🥗",
        },
        {
            id: 3,
            title: "Dietary Counseling & Education",
            short: "Learn how to make healthier food choices with professional guidance.",
            description:
                "Practical nutrition education and counseling designed to help individuals understand food choices and develop healthier eating habits.",
            features: [
                "Nutrition education",
                "Healthy food choices",
                "Meal preparation guidance",
                "Food-label education",
                "Healthy eating strategies",
            ],
            icon: "🎓",
        },
        {
            id: 4,
            title: "Behavior Change Support",
            short: "Build sustainable habits that support long-term health.",
            description:
                "Personalized support to help you overcome unhealthy eating patterns and develop sustainable lifestyle and nutrition habits.",
            features: [
                "Goal setting",
                "Habit development",
                "Motivation support",
                "Progress monitoring",
                "Lifestyle adjustment",
            ],
            icon: "🌱",
        },
        {
            id: 5,
            title: "Medical Nutrition Therapy",
            short: "Nutrition support for individuals with nutrition-related health conditions.",
            description:
                "Professional nutrition intervention designed to support individuals whose health conditions require specialized dietary management.",
            features: [
                "Individual nutrition assessment",
                "Therapeutic nutrition planning",
                "Diet modification",
                "Nutrition monitoring",
                "Follow-up support",
            ],
            icon: "🩺",
        },
        {
            id: 6,
            title: "Pediatric Nutrition",
            short: "Support healthy growth and nutrition for children.",
            description:
                "Nutrition guidance for children and families focused on healthy growth, development, appropriate food choices, and healthy eating habits.",
            features: [
                "Growth and nutrition assessment",
                "Child-friendly meal planning",
                "Healthy eating education",
                "Nutrient intake guidance",
                "Family nutrition support",
            ],
            icon: "👶",
        },
        {
            id: 7,
            title: "Sports Nutrition",
            short: "Optimize nutrition for training, performance, recovery, and healthy body composition.",
            description:
                "Nutrition strategies designed for active individuals and athletes to support energy needs, training, recovery, and performance.",
            features: [
                "Energy assessment",
                "Performance nutrition",
                "Pre-workout nutrition",
                "Post-workout recovery",
                "Hydration guidance",
            ],
            icon: "🏋️",
        },
        {
            id: 8,
            title: "Follow-up & Support",
            short: "Stay accountable and receive ongoing nutrition guidance.",
            description:
                "Regular follow-up sessions to evaluate progress, identify challenges, adjust recommendations, and maintain healthy lifestyle changes.",
            features: [
                "Progress monitoring",
                "Plan adjustments",
                "Nutrition review",
                "Goal tracking",
                "Continuous support",
            ],
            icon: "📈",
        },
        {
            id: 9,
            title: "Group Workshops & Seminars",
            short: "Professional nutrition education for organizations, communities, and groups.",
            description:
                "Interactive nutrition and wellness workshops designed for organizations, schools, companies, communities, and other groups.",
            features: [
                "Nutrition presentations",
                "Interactive education",
                "Healthy lifestyle training",
                "Community education",
                "Corporate wellness sessions",
            ],
            icon: "👥",
        },
        {
            id: 10,
            title: "Lifestyle Coaching",
            short: "Develop a healthier lifestyle through practical and sustainable guidance.",
            description:
                "Holistic lifestyle coaching that supports nutrition, physical activity, rest, stress management, relationships, mindset, and healthy daily routines.",
            features: [
                "Nutrition guidance",
                "Physical activity support",
                "Rest and relaxation",
                "Stress management",
                "Healthy lifestyle habits",
            ],
            icon: "🌿",
        },
    ];

    return (
        <>
        <PublicNavigation />
            <Head title="Our Services | RU-NUTRIDIET" />

            <div className="min-h-screen bg-slate-50 text-slate-900">

                {/* HERO */}
                <section className="relative overflow-hidden bg-gradient-to-br from-green-800 via-green-700 to-emerald-600">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white" />
                        <div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-white" />
                    </div>

                    <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
                        <div className="max-w-3xl">
                            <span className="inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white backdrop-blur">
                                RU-NUTRIDIET
                            </span>

                            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                                Nutrition & Wellness Services
                            </h1>

                            <p className="mt-6 max-w-2xl text-lg leading-8 text-green-50">
                                Professional nutrition and lifestyle services
                                designed to help you make informed choices,
                                improve your nutritional wellbeing, and build
                                sustainable healthy habits.
                            </p>

                            <div className="mt-8 flex flex-wrap gap-4">
                                <a
                                    href="#services"
                                    className="rounded-xl bg-white px-6 py-3.5 font-bold text-green-800 shadow-lg transition hover:-translate-y-0.5 hover:bg-green-50"
                                >
                                    Explore Services
                                </a>

                                <Link
                                    href="/contact"
                                    className="rounded-xl border border-white/40 bg-white/10 px-6 py-3.5 font-bold text-white backdrop-blur transition hover:bg-white/20"
                                >
                                    Contact Us
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* INTRO */}
                <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
                    <div className="mx-auto max-w-3xl text-center">
                        <span className="font-semibold uppercase tracking-widest text-green-700">
                            Our Approach
                        </span>

                        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                            Personalized nutrition for your journey
                        </h2>

                        <p className="mt-5 text-lg leading-8 text-slate-600">
                            Every person has different nutritional needs.
                            Our services are designed to provide practical,
                            individualized guidance based on your goals,
                            lifestyle, nutritional status, and circumstances.
                        </p>
                    </div>
                </section>

                {/* SERVICES */}
                <section
                    id="services"
                    className="mx-auto max-w-7xl scroll-mt-24 px-6 pb-20 lg:px-8"
                >
                    <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
                        {services.map((service) => (
                            <article
                                key={service.id}
                                className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                            >
                                <div className="flex items-center justify-between border-b border-slate-100 p-6">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-3xl">
                                        {service.icon}
                                    </div>

                                    <span className="text-sm font-bold text-slate-300">
                                        {String(service.id).padStart(2, "0")}
                                    </span>
                                </div>

                                <div className="flex flex-1 flex-col p-6">
                                    <h3 className="text-xl font-bold text-slate-900">
                                        {service.title}
                                    </h3>

                                    <p className="mt-3 leading-7 text-slate-600">
                                        {service.short}
                                    </p>

                                    <ul className="mt-5 space-y-2">
                                        {service.features
                                            .slice(0, 3)
                                            .map((feature, index) => (
                                                <li
                                                    key={index}
                                                    className="flex items-start gap-2 text-sm text-slate-600"
                                                >
                                                    <span className="mt-0.5 font-bold text-green-600">
                                                        ✓
                                                    </span>

                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                    </ul>

                                    <div className="mt-auto flex flex-wrap gap-3 pt-7">
                                        <Link
                                            href={`/services/${service.id}`}
                                            className="inline-flex flex-1 items-center justify-center rounded-xl bg-green-700 px-4 py-3 text-sm font-bold text-white transition hover:bg-green-800"
                                        >
                                            Learn More
                                            <span className="ml-2 transition group-hover:translate-x-1">
                                                →
                                            </span>
                                        </Link>

                                        <Link
                                            href="/contact"
                                            className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 transition hover:border-green-600 hover:text-green-700"
                                        >
                                            Book
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                {/* WHY US */}
                <section className="bg-white py-20">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                            <div>
                                <span className="font-semibold uppercase tracking-widest text-green-700">
                                    Why RU-NUTRIDIET?
                                </span>

                                <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                                    More than a meal plan
                                </h2>

                                <p className="mt-5 leading-8 text-slate-600">
                                    Our approach combines professional
                                    nutrition assessment, education,
                                    personalized planning, follow-up, and
                                    lifestyle support to help you make
                                    sustainable changes.
                                </p>

                                <div className="mt-8">
                                    <Link
                                        href="/contact"
                                        className="inline-flex rounded-xl bg-green-700 px-6 py-3.5 font-bold text-white transition hover:bg-green-800"
                                    >
                                        Start Your Nutrition Journey
                                    </Link>
                                </div>
                            </div>

                            <div className="grid gap-5 sm:grid-cols-2">
                                {[
                                    [
                                        "01",
                                        "Personalized",
                                        "Recommendations adapted to individual needs.",
                                    ],
                                    [
                                        "02",
                                        "Professional",
                                        "Nutrition guidance based on assessment.",
                                    ],
                                    [
                                        "03",
                                        "Practical",
                                        "Simple strategies that fit everyday life.",
                                    ],
                                    [
                                        "04",
                                        "Continuous",
                                        "Follow-up and support throughout your journey.",
                                    ],
                                ].map(([number, title, text]) => (
                                    <div
                                        key={number}
                                        className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-100"
                                    >
                                        <span className="text-sm font-bold text-green-700">
                                            {number}
                                        </span>

                                        <h3 className="mt-3 font-bold">
                                            {title}
                                        </h3>

                                        <p className="mt-2 text-sm leading-6 text-slate-600">
                                            {text}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="bg-green-800 px-6 py-20 text-center text-white">
                    <div className="mx-auto max-w-3xl">
                        <h2 className="text-3xl font-bold sm:text-4xl">
                            Ready to take the next step?
                        </h2>

                        <p className="mt-5 text-lg leading-8 text-green-50">
                            Talk to our team about your nutrition and wellness
                            goals and find the service that is right for you.
                        </p>

                        <div className="mt-8 flex flex-wrap justify-center gap-4">
                            <Link
                                href="/contact"
                                className="rounded-xl bg-white px-7 py-3.5 font-bold text-green-800 transition hover:bg-green-50"
                            >
                                Contact RU-NUTRIDIET
                            </Link>

                            <Link
                                href="/marketplace"
                                className="rounded-xl border border-white/40 px-7 py-3.5 font-bold text-white transition hover:bg-white/10"
                            >
                                Visit Marketplace
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
