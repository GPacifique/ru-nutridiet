import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import {
    ArrowLeft,
    Award,
    BookOpen,
    CheckCircle2,
    Clock,
    FileCheck,
    Lock,
    PlayCircle,
    User,
    Users,
} from 'lucide-react';

import DashboardLayout from '@/Layouts/DashboardLayout';

export default function Show({
    course,
    enrollment = null,
    exam = null,
    lessons = [],
}) {
    const isEnrolled = Boolean(enrollment);

    const formatPrice = (price) => {
        if (price === null || price === undefined || Number(price) === 0) {
            return 'Free';
        }

        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(Number(price));
    };

    const enroll = () => {
        router.post(
            route('learner.courses.enroll', course.id),
            {},
            {
                preserveScroll: true,
            }
        );
    };

    return (
        <DashboardLayout>
            <Head title={course.title} />

            <div className="space-y-8">
                {/* Back */}
                <Link 
                    href={route('courses.index')}
                    className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Course Catalog
                </Link>

                {/* Hero Section */}
                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                    <div className="grid grid-cols-1 lg:grid-cols-3">
                        {/* Thumbnail */}
                        <div className="relative min-h-[280px] bg-gray-100 lg:col-span-1">
                            {course.thumbnail ? (
                                <img
                                    src={`/storage/${course.thumbnail}`}
                                    alt={course.title}
                                    className="h-full min-h-[280px] w-full object-cover"
                                />
                            ) : (
                                <div className="flex h-full min-h-[280px] items-center justify-center bg-blue-50">
                                    <BookOpen className="h-24 w-24 text-blue-300" />
                                </div>
                            )}

                            {course.credit_type && (
                                <span className="absolute left-5 top-5 rounded-full bg-white px-4 py-2 text-sm font-bold text-blue-700 shadow">
                                    {course.credit_type}
                                </span>
                            )}
                        </div>

                        {/* Details */}
                        <div className="p-8 lg:col-span-2">
                            <div className="flex flex-wrap gap-2">
                                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold capitalize text-green-700">
                                    {course.status}
                                </span>

                                {course.credit_type && (
                                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                                        {course.credit_type}
                                    </span>
                                )}
                            </div>

                            <h1 className="mt-5 text-3xl font-bold text-gray-900 sm:text-4xl">
                                {course.title}
                            </h1>

                            <p className="mt-5 text-lg leading-8 text-gray-600">
                                {course.description}
                            </p>

                            {/* Course Stats */}
                            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                                <div className="rounded-xl bg-blue-50 p-4">
                                    <BookOpen className="h-6 w-6 text-blue-600" />

                                    <p className="mt-3 text-xs text-gray-500">
                                        Lessons
                                    </p>

                                    <p className="mt-1 text-lg font-bold text-gray-900">
                                        {lessons.length}
                                    </p>
                                </div>

                                <div className="rounded-xl bg-purple-50 p-4">
                                    <Clock className="h-6 w-6 text-purple-600" />

                                    <p className="mt-3 text-xs text-gray-500">
                                        Credit Hours
                                    </p>

                                    <p className="mt-1 text-lg font-bold text-gray-900">
                                        {course.credit_hours || 0}
                                    </p>
                                </div>

                                <div className="rounded-xl bg-yellow-50 p-4">
                                    <Award className="h-6 w-6 text-yellow-600" />

                                    <p className="mt-3 text-xs text-gray-500">
                                        Certificate
                                    </p>

                                    <p className="mt-1 text-lg font-bold text-gray-900">
                                        Included
                                    </p>
                                </div>

                                <div className="rounded-xl bg-green-50 p-4">
                                    <Users className="h-6 w-6 text-green-600" />

                                    <p className="mt-3 text-xs text-gray-500">
                                        Students
                                    </p>

                                    <p className="mt-1 text-lg font-bold text-gray-900">
                                        {course.enrollments_count || 0}
                                    </p>
                                </div>
                            </div>

                            {/* Instructor */}
                            {course.instructor && (
                                <div className="mt-8 flex items-center gap-4 border-t border-gray-100 pt-6">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                                        <User className="h-6 w-6 text-gray-500" />
                                    </div>

                                    <div>
                                        <p className="text-xs text-gray-500">
                                            Course Instructor
                                        </p>

                                        <p className="font-semibold text-gray-900">
                                            {course.instructor.name}
                                        </p>

                                        {course.instructor.organization && (
                                            <p className="text-sm text-gray-500">
                                                {course.instructor.organization}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
                    {/* Lessons */}
                    <div className="xl:col-span-2">
                        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
                            <div className="border-b border-gray-200 p-6">
                                <h2 className="text-xl font-bold text-gray-900">
                                    Course Content
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    {lessons.length} lessons included in this course.
                                </p>
                            </div>

                            <div className="divide-y divide-gray-100">
                                {lessons.length > 0 ? (
                                    lessons.map((lesson, index) => (
                                        <div
                                            key={lesson.id}
                                            className="flex items-center gap-4 p-5"
                                        >
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
                                                {index + 1}
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <h3 className="font-medium text-gray-900">
                                                    {lesson.title}
                                                </h3>

                                                <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-gray-500">
                                                    {lesson.duration_minutes && (
                                                        <span className="inline-flex items-center gap-1">
                                                            <Clock className="h-3.5 w-3.5" />
                                                            {
                                                                lesson.duration_minutes
                                                            }{' '}
                                                            minutes
                                                        </span>
                                                    )}

                                                    {lesson.type && (
                                                        <span className="capitalize">
                                                            {lesson.type}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            {lesson.is_preview ? (
                                                <Link
                                                    href={route(
                                                        'courses.lessons.preview',
                                                        lesson.id
                                                    )}
                                                    className="inline-flex items-center gap-2 rounded-lg border border-blue-200 px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50"
                                                >
                                                    <PlayCircle className="h-4 w-4" />
                                                    Preview
                                                </Link>
                                            ) : (
                                                <Lock className="h-5 w-5 text-gray-400" />
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-10 text-center text-sm text-gray-500">
                                        Course lessons will be available soon.
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Exam Information */}
                        {exam && (
                            <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                                <div className="flex items-start gap-4">
                                    <div className="rounded-xl bg-purple-100 p-3">
                                        <FileCheck className="h-7 w-7 text-purple-600" />
                                    </div>

                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900">
                                            Final Examination
                                        </h2>

                                        <p className="mt-1 text-gray-600">
                                            {exam.title}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                                    <div className="rounded-lg bg-gray-50 p-4">
                                        <p className="text-sm text-gray-500">
                                            Passing Score
                                        </p>

                                        <p className="mt-1 text-lg font-bold text-gray-900">
                                            {exam.passing_score}%
                                        </p>
                                    </div>

                                    <div className="rounded-lg bg-gray-50 p-4">
                                        <p className="text-sm text-gray-500">
                                            Time Limit
                                        </p>

                                        <p className="mt-1 text-lg font-bold text-gray-900">
                                            {exam.time_limit
                                                ? `${exam.time_limit} minutes`
                                                : 'No limit'}
                                        </p>
                                    </div>

                                    <div className="rounded-lg bg-gray-50 p-4">
                                        <p className="text-sm text-gray-500">
                                            Maximum Attempts
                                        </p>

                                        <p className="mt-1 text-lg font-bold text-gray-900">
                                            {exam.max_attempts}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Enrollment Card */}
                    <div>
                        <div className="sticky top-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                            <p className="text-sm text-gray-500">
                                Course Price
                            </p>

                            <p className="mt-2 text-4xl font-bold text-gray-900">
                                {formatPrice(course.price)}
                            </p>

                            <div className="mt-6 space-y-4">
                                <div className="flex items-center gap-3">
                                    <CheckCircle2 className="h-5 w-5 text-green-600" />

                                    <span className="text-sm text-gray-600">
                                        Professional credit hours
                                    </span>
                                </div>

                                <div className="flex items-center gap-3">
                                    <CheckCircle2 className="h-5 w-5 text-green-600" />

                                    <span className="text-sm text-gray-600">
                                        Course completion certificate
                                    </span>
                                </div>

                                <div className="flex items-center gap-3">
                                    <CheckCircle2 className="h-5 w-5 text-green-600" />

                                    <span className="text-sm text-gray-600">
                                        Access to course lessons
                                    </span>
                                </div>

                                <div className="flex items-center gap-3">
                                    <CheckCircle2 className="h-5 w-5 text-green-600" />

                                    <span className="text-sm text-gray-600">
                                        Final examination
                                    </span>
                                </div>
                            </div>

                            {isEnrolled ? (
                                <div className="mt-8">
                                    <div className="rounded-xl bg-green-50 p-4">
                                        <div className="flex items-center gap-3">
                                            <CheckCircle2 className="h-6 w-6 text-green-600" />

                                            <div>
                                                <p className="font-semibold text-green-800">
                                                    You are enrolled
                                                </p>

                                                <p className="text-sm text-green-700">
                                                    Continue your learning journey.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
<Link
    href={route('courses.checkout', course.slug)}
    className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-4 font-semibold text-white hover:bg-blue-700"
>
    <BookOpen className="h-5 w-5" />
    Enroll in Course
</Link>
                                    <Link
                                        href={route(
                                            'learner.courses.show',
                                            course.id
                                        )}
                                        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
                                    >
                                        <PlayCircle className="h-5 w-5" />
                                        Continue Learning
                                    </Link>
                                </div>
                            ) : (
                                <button
                                    type="button"
                                    onClick={enroll}
                                    className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-4 font-semibold text-white transition hover:bg-blue-700"
                                >
                                    <BookOpen className="h-5 w-5" />
                                    Enroll in Course
                                </button>
                            )}

                            <p className="mt-4 text-center text-xs text-gray-500">
                                By enrolling, you agree to the course terms and
                                learning requirements.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}