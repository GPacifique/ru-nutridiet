import React from "react";
import { Link } from "@inertiajs/react";
import LearnerDashboardLayout from "@/Layouts/LearnerDashboardLayout";

export default function Index({ courses }) {

    return (
        <LearnerDashboardLayout>

            <div className="p-6">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">
                        My Learning Courses
                    </h1>

                    <p className="text-gray-600 mt-2">
                        Explore available professional development courses.
                    </p>
                </div>


                {/* Courses List */}
                {courses.data && courses.data.length > 0 ? (

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                        {courses.data.map((course) => (

                            <div
                                key={course.id}
                                className="bg-white rounded-xl shadow-md overflow-hidden border"
                            >

                                {/* Thumbnail */}
                                {course.thumbnail ? (

                                    <img
                                        src={`/storage/${course.thumbnail}`}
                                        alt={course.title}
                                        className="w-full h-48 object-cover"
                                    />

                                ) : (

                                    <div className="h-48 bg-gray-100 flex items-center justify-center">
                                        <span className="text-gray-400">
                                            No Image
                                        </span>
                                    </div>

                                )}



                                <div className="p-5">

                                    <h2 className="text-xl font-semibold text-gray-800">
                                        {course.title}
                                    </h2>


                                    <p className="text-gray-600 text-sm mt-3">
                                        {course.description
                                            ? course.description.substring(0, 120) + "..."
                                            : "No description available."
                                        }
                                    </p>



                                    <div className="mt-4 text-sm space-y-2">

                                        <div>
                                            <span className="font-semibold">
                                                Credit Hours:
                                            </span>{" "}
                                            {course.credit_hours}
                                        </div>


                                        <div>
                                            <span className="font-semibold">
                                                Credit Type:
                                            </span>{" "}
                                            {course.credit_type ?? "N/A"}
                                        </div>


                                        <div>
                                            <span className="font-semibold">
                                                Price:
                                            </span>{" "}
                                            {Number(course.price).toLocaleString()} RWF
                                        </div>


                                        {course.instructor && (

                                            <div>
                                                <span className="font-semibold">
                                                    Instructor:
                                                </span>{" "}
                                                {course.instructor.name}
                                            </div>

                                        )}

                                    </div>



                                    <Link
                                        href={route(
                                            "learner.courses.show",
                                            course.slug
                                        )}
                                        className="inline-block mt-5 w-full text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                                    >
                                        View Course
                                    </Link>


                                </div>

                            </div>

                        ))}

                    </div>

                ) : (

                    <div className="bg-white rounded-xl shadow p-8 text-center">

                        <h3 className="text-lg font-semibold text-gray-700">
                            No courses available
                        </h3>

                        <p className="text-gray-500 mt-2">
                            Published courses will appear here.
                        </p>

                    </div>

                )}



                {/* Pagination */}
                {courses.links && courses.links.length > 3 && (

                    <div className="mt-8 flex justify-center gap-2">

                        {courses.links.map((link, index) => (

                            <Link
                                key={index}
                                href={link.url || ""}
                                preserveScroll
                                className={`px-3 py-2 rounded-md text-sm ${
                                    link.active
                                        ? "bg-blue-600 text-white"
                                        : "bg-gray-200 text-gray-700"
                                }`}
                                dangerouslySetInnerHTML={{
                                    __html: link.label
                                }}
                            />

                        ))}

                    </div>

                )}

            </div>

        </LearnerDashboardLayout>
    );
}