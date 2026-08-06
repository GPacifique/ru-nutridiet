import React from "react";
import { Link } from "@inertiajs/react";

export default function LearningPath() {
    const paths = [
        {
            id: 1,
            title: "Full Stack Web Development",
            description:
                "Master HTML, CSS, JavaScript, React, Laravel, APIs, and deployment.",
            courses: 12,
            students: 2450,
            icon: "💻",
            color: "bg-blue-100 text-blue-700",
        },
        {
            id: 2,
            title: "UI/UX Design",
            description:
                "Learn design principles, wireframing, prototyping, and Figma.",
            courses: 8,
            students: 1800,
            icon: "🎨",
            color: "bg-pink-100 text-pink-700",
        },
        {
            id: 3,
            title: "Mobile App Development",
            description:
                "Build Android and iOS applications using Flutter and React Native.",
            courses: 10,
            students: 1650,
            icon: "📱",
            color: "bg-green-100 text-green-700",
        },
        {
            id: 4,
            title: "Digital Marketing",
            description:
                "Master SEO, content marketing, social media, and paid advertising.",
            courses: 7,
            students: 1320,
            icon: "📈",
            color: "bg-yellow-100 text-yellow-700",
        },
    ];

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="text-center mb-14">
                    <span className="inline-flex px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium">
                        Learning Paths
                    </span>

                    <h2 className="mt-4 text-4xl font-bold text-gray-900">
                        Follow a Structured Learning Journey
                    </h2>

                    <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                        Build practical skills step-by-step with curated learning
                        paths designed by industry professionals.
                    </p>
                </div>

                {/* Paths Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {paths.map((path) => (
                        <div
                            key={path.id}
                            className="bg-gray-50 rounded-2xl p-6 border hover:shadow-lg transition"
                        >
                            <div
                                className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl ${path.color}`}
                            >
                                {path.icon}
                            </div>

                            <h3 className="mt-5 text-xl font-bold text-gray-900">
                                {path.title}
                            </h3>

                            <p className="mt-3 text-gray-600">
                                {path.description}
                            </p>

                            <div className="mt-5 flex justify-between text-sm text-gray-500">
                                <span>{path.courses} Courses</span>
                                <span>{path.students}+ Students</span>
                            </div>

                            <Link
                                href={`/learning-paths/${path.id}`}
                                className="mt-6 inline-flex items-center text-indigo-600 font-semibold hover:text-indigo-800"
                            >
                                Explore Path →
                            </Link>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="mt-16 text-center">
                    <Link
                        href="/courses"
                        className="inline-flex px-8 py-4 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition"
                    >
                        Browse All Courses
                    </Link>
                </div>
            </div>
        </section>
    );
}