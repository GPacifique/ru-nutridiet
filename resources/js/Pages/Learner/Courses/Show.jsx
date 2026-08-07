import React from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    ArrowLeft,
    Award,
    BookOpen,
    CheckCircle2,
    Clock,
    FileCheck,
    PlayCircle,
    User,
    Lock,
    GraduationCap,
} from 'lucide-react';

import DashboardLayout from '@/Layouts/DashboardLayout';

export default function Show({
    course,
    enrollment,
    lessons = [],
    exam = null,
    certificate = null,
}) {
    const progress = Math.min(
        Math.max(Number(enrollment?.progress_percent ?? 0), 0),
        100
    );

    const completedLessons = lessons.filter(
        (lesson) => lesson.completed
    ).length;

    const totalLessons = lessons.length;

    return (
        <DashboardLayout>
            <Head title={course.title} />

            <div className="space-y-8">
                {/* Back Button */}
                <Link
                    href={route('courseenrollments.index')}
                    className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to My Learning
                </Link>

                {/* Course Header */}
                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                    <div className="grid grid-cols-1 lg:grid-cols-3">
                        {/* Thumbnail */}
                        <div className="h-64 bg-gray-100 lg:col-span-1 lg:h-full">
                            {course.thumbnail ? (
                                <img
                                    src={`/storage/${course.thumbnail}`}
                                    alt={course.title}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div className="flex h-full min-h-[260px] items-center justify-center bg-blue-50">
                                    <BookOpen className="h-20 w-20 text-blue-300" />
                                </div>
                            )}
                        </div>

                        {/* Course Details */}
                        <div className="p-8 lg:col-span-2">
                            <div className="flex flex-wrap gap-2">
                                {course.credit_type && (
                                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                                        {course.credit_type}
                                    </span>
                                )}

                                {enrollment?.status && (
                                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold capitalize text-green-700">
                                        {enrollment.status}
                                    </span>
                                )}
                            </div>

                            <h1 className="mt-4 text-3xl font-bold text-gray-900">
                                {course.title}
                            </h1>

                            <p className="mt-4 line-clamp-4 text-gray-600">
                                {course.description}
                            </p>

                            {/* Course Meta */}
                            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                                <div className="flex items-center gap-3">
                                    <div className="rounded-lg bg-blue-50 p-2">
                                        <Clock className="h-5 w-5 text-blue-600" />
                                    </div>

                                    <div>
                                        <p className="text-xs text-gray-500">
                                            Credit Hours
                                        </p>

                                        <p className="font-semibold text-gray-900">
                                            {course.credit_hours}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="rounded-lg bg-purple-50 p-2">
                                        <BookOpen className="h-5 w-5 text-purple-600" />
                                    </div>

                                    <div>
                                        <p className="text-xs text-gray-500">
                                            Lessons
                                        </p>

                                        <p className="font-semibold text-gray-900">
                                            {totalLessons}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="rounded-lg bg-green-50 p-2">
                                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                                    </div>

                                    <div>
                                        <p className="text-xs text-gray-500">
                                            Completed
                                        </p>

                                        <p className="font-semibold text-gray-900">
                                            {completedLessons}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="rounded-lg bg-orange-50 p-2">
                                        <GraduationCap className="h-5 w-5 text-orange-600" />
                                    </div>

                                    <div>
                                        <p className="text-xs text-gray-500">
                                            Progress
                                        </p>

                                        <p className="font-semibold text-gray-900">
                                            {progress}%
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Instructor */}
                            {course.instructor && (
                                <div className="mt-6 flex items-center gap-3 border-t border-gray-100 pt-6">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                                        <User className="h-5 w-5 text-gray-500" />
                                    </div>

                                    <div>
                                        <p className="text-xs text-gray-500">
                                            Instructor
                                        </p>

                                        <p className="font-semibold text-gray-900">
                                            {course.instructor.name}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Progress */}
                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900">
                                Your Progress
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                Keep learning to complete this course.
                            </p>
                        </div>

                        <span className="text-2xl font-bold text-blue-600">
                            {progress}%
                        </span>
                    </div>

                    <div className="mt-5 h-3 overflow-hidden rounded-full bg-gray-200">
                        <div
                            className="h-full rounded-full bg-blue-600 transition-all"
                            style={{
                                width: `${progress}%`,
                            }}
                        />
                    </div>

                    <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                        <span>
                            {completedLessons} of {totalLessons} lessons completed
                        </span>

                        {enrollment?.status === 'completed' && (
                            <span className="inline-flex items-center gap-1 font-medium text-green-600">
                                <CheckCircle2 className="h-4 w-4" />
                                Course Completed
                            </span>
                        )}
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
                    {/* Lessons */}
                    <div className="xl:col-span-2">
                        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
                            <div className="border-b border-gray-200 p-6">
                                <h2 className="text-xl font-semibold text-gray-900">
                                    Course Lessons
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    Complete each lesson to progress through the course.
                                </p>
                            </div>

                            <div className="divide-y divide-gray-100">
                                {lessons.length > 0 ? (
                                    lessons.map((lesson, index) => {
                                        const isCompleted =
                                            lesson.completed === true;

                                        const isLocked =
                                            lesson.locked === true;

                                        return (
                                            <div
                                                key={lesson.id}
                                                className="flex items-center gap-4 p-5 transition hover:bg-gray-50"
                                            >
                                                <div
                                                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                                                        isCompleted
                                                            ? 'bg-green-100 text-green-600'
                                                            : isLocked
                                                              ? 'bg-gray-100 text-gray-400'
                                                              : 'bg-blue-100 text-blue-600'
                                                    }`}
                                                >
                                                    {isCompleted ? (
                                                        <CheckCircle2 className="h-5 w-5" />
                                                    ) : isLocked ? (
                                                        <Lock className="h-5 w-5" />
                                                    ) : (
                                                        <span className="font-semibold">
                                                            {index + 1}
                                                        </span>
                                                    )}
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

                                                {isLocked ? (
                                                    <span className="text-sm text-gray-400">
                                                        Locked
                                                    </span>
                                                ) : (
                                                    <Link
                                                        href={route(
                                                            'learner.lessons.show',
                                                            lesson.id
                                                        )}
                                                        className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                                                    >
                                                        <PlayCircle className="h-4 w-4" />

                                                        {isCompleted
                                                            ? 'Review'
                                                            : 'Start'}
                                                    </Link>
                                                )}
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="p-10 text-center">
                                        <BookOpen className="mx-auto h-12 w-12 text-gray-300" />

                                        <p className="mt-4 text-sm text-gray-500">
                                            No lessons available yet.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Exam Card */}
                        {exam && (
                            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                                <div className="flex items-start gap-4">
                                    <div className="rounded-xl bg-purple-100 p-3">
                                        <FileCheck className="h-6 w-6 text-purple-600" />
                                    </div>

                                    <div>
                                        <h2 className="font-semibold text-gray-900">
                                            Final Exam
                                        </h2>

                                        <p className="mt-1 text-sm text-gray-500">
                                            {exam.title}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-5 grid grid-cols-2 gap-3">
                                    <div className="rounded-lg bg-gray-50 p-3">
                                        <p className="text-xs text-gray-500">
                                            Passing Score
                                        </p>

                                        <p className="mt-1 font-semibold text-gray-900">
                                            {exam.passing_score}%
                                        </p>
                                    </div>

                                    <div className="rounded-lg bg-gray-50 p-3">
                                        <p className="text-xs text-gray-500">
                                            Max Attempts
                                        </p>

                                        <p className="mt-1 font-semibold text-gray-900">
                                            {exam.max_attempts}
                                        </p>
                                    </div>
                                </div>

                                <Link
                                    href={route(
                                        'learner.exams.show',
                                        exam.id
                                    )}
                                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-purple-600 px-4 py-3 text-sm font-medium text-white hover:bg-purple-700"
                                >
                                    <FileCheck className="h-4 w-4" />
                                    View Exam
                                </Link>
                            </div>
                        )}

                        {/* Certificate Card */}
                        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                            <div className="flex items-start gap-4">
                                <div className="rounded-xl bg-yellow-100 p-3">
                                    <Award className="h-6 w-6 text-yellow-600" />
                                </div>

                                <div>
                                    <h2 className="font-semibold text-gray-900">
                                        Certificate
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-500">
                                        {certificate
                                            ? 'Your certificate is available.'
                                            : 'Complete the course and pass the exam to earn your certificate.'}
                                    </p>
                                </div>
                            </div>

                            {certificate ? (
                                <Link
                                    href={route(
                                        'certificates.show',
                                        certificate.id
                                    )}
                                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-3 text-sm font-medium text-white hover:bg-green-700"
                                >
                                    <Award className="h-4 w-4" />
                                    View Certificate
                                </Link>
                            ) : (
                                <div className="mt-5 rounded-lg bg-gray-50 p-4 text-center text-sm text-gray-500">
                                    Certificate not yet available
                                </div>
                            )}
                        </div>

                        {/* Course Information */}
                        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                            <h2 className="font-semibold text-gray-900">
                                Course Information
                            </h2>

                            <div className="mt-5 space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-500">
                                        Credit Type
                                    </span>

                                    <span className="text-sm font-medium text-gray-900">
                                        {course.credit_type || 'N/A'}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-500">
                                        Credit Hours
                                    </span>

                                    <span className="text-sm font-medium text-gray-900">
                                        {course.credit_hours || 0}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-500">
                                        Enrolled On
                                    </span>

                                    <span className="text-sm font-medium text-gray-900">
                                        {enrollment?.enrolled_at
                                            ? new Date(
                                                  enrollment.enrolled_at
                                              ).toLocaleDateString()
                                            : 'N/A'}
                                    </span>
                                </div>

                                {enrollment?.completed_at && (
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-500">
                                            Completed On
                                        </span>

                                        <span className="text-sm font-medium text-gray-900">
                                            {new Date(
                                                enrollment.completed_at
                                            ).toLocaleDateString()}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}