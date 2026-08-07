import React from "react";
import { Link } from "@inertiajs/react";
import LearnerDashboardLayout from "@/Layouts/LearnerDashboardLayout";

export default function Index({ enrollments }) {

    // Support Laravel paginate() and get()
    const enrollmentList = Array.isArray(enrollments)
        ? enrollments
        : enrollments?.data ?? [];


    return (
        <LearnerDashboardLayout>

            <div className="max-w-7xl mx-auto">


                {/* Header */}
                <div className="mb-8">

                    <h1 className="text-3xl font-bold text-gray-800">
                        My Enrollments
                    </h1>

                    <p className="mt-2 text-gray-600">
                        Track your enrolled nutrition courses and learning progress.
                    </p>

                </div>



                {/* Empty State */}
                {enrollmentList.length === 0 && (

                    <div className="bg-white shadow rounded-xl p-8 text-center">

                        <div className="text-5xl mb-4">
                            📚
                        </div>

                        <h2 className="text-xl font-bold text-gray-800">
                            No Courses Found
                        </h2>


                        <p className="text-gray-600 mt-2">
                            You have not enrolled in any course yet.
                        </p>


                        <Link
                            href={route("courses.index")}
                            className="inline-block mt-6 bg-green-700 text-white px-6 py-3 rounded-lg"
                        >
                            Browse Courses
                        </Link>

                    </div>

                )}



                {/* Course Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">


                    {enrollmentList.map((enrollment) => (

                        <div
                            key={enrollment.id}
                            className="bg-white rounded-xl shadow overflow-hidden"
                        >


                            {/* Image Placeholder */}
                            <div className="h-40 bg-green-100 flex items-center justify-center">

                                <span className="text-6xl">
                                    🥗
                                </span>

                            </div>



                            <div className="p-6">


                                <h2 className="text-xl font-bold text-gray-800">

                                    {enrollment.course?.title ?? "Nutrition Course"}

                                </h2>



                                <p className="text-sm text-gray-500 mt-2">

                                    Enrolled on:

                                    {" "}

                                    {enrollment.enrolled_at
                                        ? new Date(
                                            enrollment.enrolled_at
                                        ).toLocaleDateString()
                                        : "Not available"
                                    }

                                </p>



                                {/* Status */}
                                <div className="flex justify-between items-center mt-5">


                                    <span
                                        className={`
                                            px-3 py-1 rounded-full text-sm font-semibold
                                            ${
                                                enrollment.status === "active"
                                                    ? "bg-green-100 text-green-700"
                                                :
                                                enrollment.status === "completed"
                                                    ? "bg-blue-100 text-blue-700"
                                                :
                                                enrollment.status === "pending"
                                                    ? "bg-yellow-100 text-yellow-700"
                                                :
                                                    "bg-gray-100 text-gray-700"
                                            }
                                        `}
                                    >

                                        {enrollment.status}

                                    </span>



                                    <span className="text-gray-600 font-semibold">

                                        {enrollment.progress_percent ?? 0}%

                                    </span>


                                </div>




                                {/* Progress */}
                                <div className="w-full bg-gray-200 rounded-full h-2 mt-3">


                                    <div
                                        className="bg-green-700 h-2 rounded-full"
                                        style={{
                                            width: `${enrollment.progress_percent ?? 0}%`
                                        }}
                                    />


                                </div>



                                {/* Continue Button */}
                                {enrollment.course && (

                                    <Link
                                        href={route(
                                            "courses.show",
                                            enrollment.course.id
                                        )}
                                        className="block text-center mt-6 bg-green-700 hover:bg-green-800 text-white py-3 rounded-lg"
                                    >
                                        Continue Learning
                                    </Link>

                                )}


                            </div>


                        </div>


                    ))}


                </div>



                {/* Pagination */}
                {enrollments?.links && (

                    <div className="mt-8 flex justify-center gap-2">

                        {enrollments.links.map((link, index) => (

                            <Link
                                key={index}
                                href={link.url ?? "#"}
                                className={`
                                    px-4 py-2 rounded
                                    ${
                                        link.active
                                            ? "bg-green-700 text-white"
                                            : "bg-gray-200"
                                    }
                                `}
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