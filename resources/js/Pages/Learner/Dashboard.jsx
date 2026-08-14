import React from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    BookOpen,
    Award,
    Clock,
    FileCheck,
    ArrowRight,
    PlayCircle,
    CheckCircle2,
    XCircle,
    Trophy,
    GraduationCap,
} from 'lucide-react';

import LearnerDashboardLayout from '@/Layouts/LearnerDashboardLayout';
import DashboardModules from '@/Components/DashboardModules';

export default function Dashboard({
    stats = {},
    enrollments = [],
    recentAttempts = [],
    certificates = [],
}) {
    const statCards = [
        {
            title: 'Enrolled Courses',
            value: stats.enrolled_courses ?? 0,
            icon: BookOpen,
            description: 'Courses you are taking',
        },
        {
            title: 'Completed Courses',
            value: stats.completed_courses ?? 0,
            icon: CheckCircle2,
            description: 'Successfully completed',
        },
        {
            title: 'Credit Hours',
            value: stats.credit_hours ?? 0,
            icon: Clock,
            description: 'Professional credits earned',
        },
        {
            title: 'Certificates',
            value: stats.certificates ?? 0,
            icon: Award,
            description: 'Certificates earned',
        },
    ];

    const getStatusClasses = (status) => {
        switch (status) {
            case 'active':
                return 'bg-blue-100 text-blue-700';

            case 'completed':
                return 'bg-green-100 text-green-700';

            case 'pending':
                return 'bg-yellow-100 text-yellow-700';

            case 'cancelled':
            case 'expired':
                return 'bg-red-100 text-red-700';

            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <LearnerDashboardLayout>
            <Head title="Learner Dashboard" />

            <div className="space-y-8">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Learner Dashboard
                    </h1>

                    <p className="mt-1 text-gray-600">
                        Track your learning progress, exams, credits, and certificates.
                    </p>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
                    {statCards.map((stat) => {
                        const Icon = stat.icon;

                        return (
                            <div
                                key={stat.title}
                                className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">
                                            {stat.title}
                                        </p>

                                        <h2 className="mt-2 text-3xl font-bold text-gray-900">
                                            {stat.value}
                                        </h2>
                                    </div>

                                    <div className="rounded-xl bg-blue-50 p-3">
                                        <Icon className="h-6 w-6 text-blue-600" />
                                    </div>
                                </div>

                                <p className="mt-3 text-sm text-gray-500">
                                    {stat.description}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <Link
                        href={route('courses.index')}
                        className="group flex items-center justify-between rounded-xl bg-blue-600 p-5 text-white transition hover:bg-blue-700"
                    >
                        <div className="flex items-center gap-4">
                            <BookOpen className="h-8 w-8" />

                            <div>
                                <h3 className="font-semibold">
                                    Browse Courses
                                </h3>

                                <p className="text-sm text-blue-100">
                                    Discover new learning opportunities
                                </p>
                            </div>
                        </div>

                        <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
                    </Link>

                    <Link
                        href={route('learner.courseenrollments.index')}
                        className="group flex items-center justify-between rounded-xl bg-purple-600 p-5 text-white transition hover:bg-purple-700"
                    >
                        <div className="flex items-center gap-4">
                            <GraduationCap className="h-8 w-8" />

                            <div>
                                <h3 className="font-semibold">
                                    My Learning
                                </h3>

                                <p className="text-sm text-purple-100">
                                    Continue your enrolled courses
                                </p>
                            </div>
                        </div>

                        <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
                    </Link>

                    <Link
                        href={route('learner.certificates.index')}
                        className="group flex items-center justify-between rounded-xl bg-green-600 p-5 text-white transition hover:bg-green-700"
                    >
                        <div className="flex items-center gap-4">
                            <Award className="h-8 w-8" />

                            <div>
                                <h3 className="font-semibold">
                                    My Certificates
                                </h3>

                                <p className="text-sm text-green-100">
                                    View your professional certificates
                                </p>
                            </div>
                        </div>

                        <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
                    </Link>
                </div>

                {/* Current Courses */}
                <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
                    <div className="flex items-center justify-between border-b border-gray-200 p-6">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900">
                                Continue Learning
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                Continue where you left off.
                            </p>
                        </div>

                        <Link
                            href={route('learner.courseenrollments.index')}
                            className="text-sm font-medium text-blue-600 hover:text-blue-700"
                        >
                            View All
                        </Link>
                    </div>

                    <div className="divide-y divide-gray-100">
                        {enrollments.length > 0 ? (
                            enrollments.map((enrollment) => (
                                <div
                                    key={enrollment.id}
                                    className="p-6"
                                >
                                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                                        <div>
                                            <h3 className="font-semibold text-gray-900">
                                                {enrollment.course?.title}
                                            </h3>

                                            <span
                                                className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-medium ${getStatusClasses(
                                                    enrollment.status
                                                )}`}
                                            >
                                                {enrollment.status}
                                            </span>
                                        </div>

                                        <Link
                                            href={route(
                                                'learner.courseenrollments.show',
                                                enrollment.id
                                            )}
                                            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                                        >
                                            <PlayCircle className="h-4 w-4" />
                                            Continue
                                        </Link>
                                    </div>

                                    <div className="mt-5">
                                        <div className="mb-2 flex justify-between text-sm">
                                            <span className="text-gray-500">
                                                Progress
                                            </span>

                                            <span className="font-semibold text-gray-700">
                                                {enrollment.progress_percent ?? 0}%
                                            </span>
                                        </div>

                                        <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                                            <div
                                                className="h-full rounded-full bg-blue-600 transition-all"
                                                style={{
                                                    width: `${Math.min(
                                                        Math.max(
                                                            Number(
                                                                enrollment.progress_percent ??
                                                                    0
                                                            ),
                                                            0
                                                        ),
                                                        100
                                                    )}%`,
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="p-10 text-center">
                                <BookOpen className="mx-auto h-12 w-12 text-gray-300" />

                                <h3 className="mt-4 font-semibold text-gray-900">
                                    No enrolled courses
                                </h3>

                                <p className="mt-1 text-sm text-gray-500">
                                    Start your professional learning journey today.
                                </p>

                                <Link
                                    href={route('courses.index')}
                                    className="mt-5 inline-flex rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                                >
                                    Browse Courses
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* Bottom Grid */}
                <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
                    {/* Recent Exam Attempts */}
                    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
                        <div className="flex items-center justify-between border-b border-gray-200 p-6">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900">
                                    Recent Exam Attempts
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    Your latest exam results.
                                </p>
                            </div>

                            <FileCheck className="h-6 w-6 text-gray-400" />
                        </div>

                        <div className="divide-y divide-gray-100">
                            {recentAttempts.length > 0 ? (
                                recentAttempts.map((attempt) => (
                                    <div
                                        key={attempt.id}
                                        className="flex items-center justify-between p-5"
                                    >
                                        <div>
                                            <h3 className="font-medium text-gray-900">
                                                {attempt.exam?.title}
                                            </h3>

                                            <p className="mt-1 text-sm text-gray-500">
                                                Attempt #{attempt.attempt_number}
                                            </p>
                                        </div>

                                        <div className="text-right">
                                            <p className="font-bold text-gray-900">
                                                {attempt.score ?? 0}%
                                            </p>

                                            {attempt.passed ? (
                                                <span className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-green-600">
                                                    <CheckCircle2 className="h-4 w-4" />
                                                    Passed
                                                </span>
                                            ) : (
                                                <span className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-red-600">
                                                    <XCircle className="h-4 w-4" />
                                                    Not Passed
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="p-8 text-center text-sm text-gray-500">
                                    No exam attempts yet.
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Recent Certificates */}
                    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
                        <div className="flex items-center justify-between border-b border-gray-200 p-6">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900">
                                    Recent Certificates
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    Your latest professional achievements.
                                </p>
                            </div>

                            <Trophy className="h-6 w-6 text-gray-400" />
                        </div>

                        <div className="divide-y divide-gray-100">
                            {certificates.length > 0 ? (
                                certificates.map((certificate) => (
                                    <div
                                        key={certificate.id}
                                        className="flex items-center justify-between p-5"
                                    >
                                        <div>
                                            <h3 className="font-medium text-gray-900">
                                                {certificate.course?.title}
                                            </h3>

                                            <p className="mt-1 text-sm text-gray-500">
                                                {certificate.credit_hours} credit hours
                                            </p>
                                        </div>

                                        <Link
                                            href={route(
                                                'certificates.show',
                                                certificate.id
                                            )}
                                            className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
                                        >
                                            View
                                            <ArrowRight className="h-4 w-4" />
                                        </Link>
                                    </div>
                                ))
                            ) : (
                                <div className="p-8 text-center text-sm text-gray-500">
                                    No certificates earned yet.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <DashboardModules
                    modules={[
                        { key: 'track', title: 'Progress tracking', desc: 'Detailed course progress and hours', action: { href: '/learner/progress', label: 'Open' } },
                        { key: 'exams', title: 'Exams', desc: 'Upcoming and past exam attempts', action: { href: '/exams', label: 'Open' } },
                        { key: 'downloads', title: 'Downloads', desc: 'Lecture slides and resources', action: { href: '/downloads', label: 'Open' } },
                    ]}
                />
            </div>
        </LearnerDashboardLayout>
    );
}