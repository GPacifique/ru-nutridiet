import React from "react";
import { Link } from "@inertiajs/react";

export default function Courses() {
    const courses = [
        {
            id: 1,
            title: "Laravel 12 Complete Masterclass",
            instructor: "John Developer",
            image: "/images/courses/laravel.jpg",
            lessons: 45,
            students: 1250,
            price: 49,
            rating: 4.9,
        },
        {
            id: 2,
            title: "React.js From Beginner to Advanced",
            instructor: "Sarah Wilson",
            image: "/images/courses/react.jpg",
            lessons: 38,
            students: 980,
            price: 39,
            rating: 4.8,
        },
        {
            id: 3,
            title: "UI/UX Design Professional Course",
            instructor: "David Smith",
            image: "/images/courses/uiux.jpg",
            lessons: 52,
            students: 1450,
            price: 59,
            rating: 5.0,
        },
    ];

    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="text-center mb-14">
                    <span className="inline-flex px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium">
                        Learning Center
                    </span>

                    <h2 className="mt-4 text-4xl font-bold text-gray-900">
                        Featured Courses
                    </h2>

                    <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                        Learn new skills, improve your career, and gain
                        practical knowledge from expert instructors.
                    </p>
                </div>

                {/* Courses Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {courses.map((course) => (
                        <div
                            key={course.id}
                            className="bg-white rounded-2xl overflow-hidden border shadow-sm hover:shadow-lg transition"
                        >
                            <img
                                src={course.image}
                                alt={course.title}
                                className="w-full h-56 object-cover"
                            />

                            <div className="p-6">

                                <div className="flex justify-between items-center mb-3">
                                    <span className="text-sm bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">
                                        Course
                                    </span>

                                    <span className="text-yellow-500 font-medium">
                                        ⭐ {course.rating}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    {course.title}
                                </h3>

                                <p className="text-gray-500 mb-4">
                                    By {course.instructor}
                                </p>

                                <div className="flex justify-between text-sm text-gray-600 mb-5">
                                    <span>{course.lessons} Lessons</span>
                                    <span>{course.students} Students</span>
                                </div>

                                <div className="flex justify-between items-center">
                                    <span className="text-2xl font-bold text-indigo-600">
                                        ${course.price}
                                    </span>

                                    <Link
                                        href={`/courses/${course.id}`}
                                        className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                                    >
                                        View Course
                                    </Link>
                                </div>

                            </div>
                        </div>
                    ))}

                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-12">
                    <Link
                        href="/courses"
                        className="inline-flex items-center px-8 py-4 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700"
                    >
                        Browse All Courses
                    </Link>
                </div>

            </div>
        </section>
    );
}