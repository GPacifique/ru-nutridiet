import { Head, Link, usePage } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
export default function Dashboard() {
    const { auth, enrollments = [], stats = {}, certificates = [] } = usePage().props;

    return (
        <><DashboardLayout>
            <Head title="Student Dashboard - SharpTech Learners" />

            <div className="min-h-screen bg-gray-50">

                {/* Header */}
                <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white">
                    <div className="max-w-7xl mx-auto px-6 py-10">
                        <h1 className="text-4xl font-bold">
                            Welcome back, {auth?.user?.name}
                        </h1>
                        <p className="text-blue-100 mt-2">
                            Continue your learning journey and build real-world projects.
                        </p>
                    </div>
                </div>

                {/* Stats */}
                <div className="max-w-7xl mx-auto px-6 mt-8 grid md:grid-cols-4 gap-6">
                    <div className="bg-white p-6 rounded-xl shadow">
                        <h2 className="text-2xl font-bold text-blue-700">
                            {stats.enrolled_courses ?? 0}
                        </h2>
                        <p className="text-gray-600">Enrolled Courses</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow">
                        <h2 className="text-2xl font-bold text-green-600">
                            {stats.completed_courses ?? 0}
                        </h2>
                        <p className="text-gray-600">Completed</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow">
                        <h2 className="text-2xl font-bold text-indigo-600">
                            {stats.in_progress ?? 0}
                        </h2>
                        <p className="text-gray-600">In Progress</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow">
                        <h2 className="text-2xl font-bold text-yellow-600">
                            {certificates.length}
                        </h2>
                        <p className="text-gray-600">Certificates</p>
                    </div>
                </div>

                {/* Enrolled Courses */}
                <div className="max-w-7xl mx-auto px-6 mt-12">
                    <h2 className="text-2xl font-bold mb-6">
                        My Courses
                    </h2>

                    {enrollments.length === 0 ? (
                        <div className="bg-white p-8 rounded-xl text-center shadow">
                            <p className="text-gray-600">
                                You are not enrolled in any course yet.
                            </p>
                            <Link
                                href="/courses"
                                className="inline-block mt-4 bg-blue-700 text-white px-6 py-3 rounded-lg"
                            >
                                Browse Courses
                            </Link>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-3 gap-6">
                            {enrollments.map((enroll, i) => (
                                <div key={i} className="bg-white p-6 rounded-xl shadow">

                                    <h3 className="font-bold text-lg">
                                        {enroll.course.title}
                                    </h3>

                                    <p className="text-gray-600 text-sm mt-2">
                                        {enroll.course.description?.slice(0, 80)}...
                                    </p>

                                    {/* Progress Bar */}
                                    <div className="mt-4">
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-blue-600 h-2 rounded-full"
                                                style={{ width: `${enroll.progress ?? 0}%` }}
                                            ></div>
                                        </div>

                                        <p className="text-sm mt-2 text-gray-600">
                                            {enroll.progress ?? 0}% completed
                                        </p>
                                    </div>

                                    <Link
                                        href={`/student/courses/${enroll.course.id}`}
                                        className="inline-block mt-4 text-blue-700 font-semibold"
                                    >
                                        Continue Learning →
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Certificates */}
                <div className="max-w-7xl mx-auto px-6 mt-16 pb-16">
                    <h2 className="text-2xl font-bold mb-6">
                        My Certificates
                    </h2>

                    {certificates.length === 0 ? (
                        <p className="text-gray-600">
                            No certificates earned yet. Complete courses to earn certificates.
                        </p>
                    ) : (
                        <div className="grid md:grid-cols-3 gap-6">
                            {certificates.map((cert, i) => (
                                <div key={i} className="bg-white p-6 rounded-xl shadow">
                                    <h3 className="font-bold">
                                        {cert.course.title}
                                    </h3>

                                    <p className="text-sm text-gray-600 mt-2">
                                        Certificate ID: {cert.code}
                                    </p>

                                    <Link
                                        href={`/my-certificates/${cert.id}`}
                                        className="text-blue-700 font-semibold mt-3 inline-block"
                                    >
                                        View Certificate
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>
            </DashboardLayout>
        </>
    );
}