import React from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    AlertCircle,
    Award,
    ArrowLeft,
    BookOpen,
    CheckCircle2,
    Clock,
    FileCheck,
    Home,
    RotateCcw,
    ShieldCheck,
    XCircle,
} from 'lucide-react';

import DashboardLayout from '@/Layouts/DashboardLayout';

export default function Results({
    attempt,
    exam,
    certificate = null,
    creditRecord = null,
}) {
    const passed = Boolean(attempt.passed);

    const score = Number(attempt.score || 0);

    const passingScore = Number(exam.passing_score || 0);

    const formatDate = (date) => {
        if (!date) {
            return 'N/A';
        }

        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <DashboardLayout>
            <Head title={`Exam Results - ${exam.title}`} />

            <div className="mx-auto max-w-5xl space-y-8">
                {/* Back */}
                <Link
                    href={route('learner.dashboard')}
                    className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Dashboard
                </Link>

                {/* Result Header */}
                <div
                    className={`overflow-hidden rounded-2xl border shadow-sm ${
                        passed
                            ? 'border-green-200 bg-green-50'
                            : 'border-red-200 bg-red-50'
                    }`}
                >
                    <div className="p-8 text-center sm:p-12">
                        <div
                            className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full ${
                                passed
                                    ? 'bg-green-100'
                                    : 'bg-red-100'
                            }`}
                        >
                            {passed ? (
                                <CheckCircle2 className="h-12 w-12 text-green-600" />
                            ) : (
                                <XCircle className="h-12 w-12 text-red-600" />
                            )}
                        </div>

                        <h1
                            className={`mt-6 text-3xl font-bold ${
                                passed
                                    ? 'text-green-800'
                                    : 'text-red-800'
                            }`}
                        >
                            {passed
                                ? 'Congratulations! You Passed'
                                : 'Exam Not Passed'}
                        </h1>

                        <p
                            className={`mx-auto mt-3 max-w-2xl ${
                                passed
                                    ? 'text-green-700'
                                    : 'text-red-700'
                            }`}
                        >
                            {passed
                                ? 'You have successfully completed the examination requirements.'
                                : 'You did not achieve the required passing score for this attempt.'}
                        </p>
                    </div>
                </div>

                {/* Exam Information */}
                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm text-gray-500">
                                Examination
                            </p>

                            <h2 className="mt-1 text-2xl font-bold text-gray-900">
                                {exam.title}
                            </h2>
                        </div>

                        <div
                            className={`inline-flex items-center gap-2 self-start rounded-full px-4 py-2 text-sm font-semibold ${
                                passed
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-red-100 text-red-700'
                            }`}
                        >
                            {passed ? (
                                <CheckCircle2 className="h-4 w-4" />
                            ) : (
                                <AlertCircle className="h-4 w-4" />
                            )}

                            {passed ? 'PASSED' : 'NOT PASSED'}
                        </div>
                    </div>
                </div>

                {/* Score Cards */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                    <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-100">
                            <Award className="h-7 w-7 text-blue-600" />
                        </div>

                        <p className="mt-4 text-sm text-gray-500">
                            Your Score
                        </p>

                        <p className="mt-2 text-4xl font-bold text-gray-900">
                            {score}%
                        </p>
                    </div>

                    <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-purple-100">
                            <FileCheck className="h-7 w-7 text-purple-600" />
                        </div>

                        <p className="mt-4 text-sm text-gray-500">
                            Passing Score
                        </p>

                        <p className="mt-2 text-4xl font-bold text-gray-900">
                            {passingScore}%
                        </p>
                    </div>

                    <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-yellow-100">
                            <Clock className="h-7 w-7 text-yellow-600" />
                        </div>

                        <p className="mt-4 text-sm text-gray-500">
                            Attempt Number
                        </p>

                        <p className="mt-2 text-4xl font-bold text-gray-900">
                            #{attempt.attempt_number}
                        </p>
                    </div>
                </div>

                {/* Result Details */}
                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                    <h2 className="text-xl font-bold text-gray-900">
                        Examination Details
                    </h2>

                    <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div className="rounded-xl bg-gray-50 p-5">
                            <p className="text-sm text-gray-500">
                                Started At
                            </p>

                            <p className="mt-2 font-semibold text-gray-900">
                                {formatDate(attempt.started_at)}
                            </p>
                        </div>

                        <div className="rounded-xl bg-gray-50 p-5">
                            <p className="text-sm text-gray-500">
                                Completed At
                            </p>

                            <p className="mt-2 font-semibold text-gray-900">
                                {formatDate(attempt.completed_at)}
                            </p>
                        </div>

                        <div className="rounded-xl bg-gray-50 p-5">
                            <p className="text-sm text-gray-500">
                                Credit Type
                            </p>

                            <p className="mt-2 font-semibold capitalize text-gray-900">
                                {creditRecord?.credit_type ||
                                    exam.course?.credit_type ||
                                    'Professional Credit'}
                            </p>
                        </div>

                        <div className="rounded-xl bg-gray-50 p-5">
                            <p className="text-sm text-gray-500">
                                Credit Hours
                            </p>

                            <p className="mt-2 font-semibold text-gray-900">
                                {creditRecord?.credit_hours ||
                                    exam.course?.credit_hours ||
                                    0}{' '}
                                hours
                            </p>
                        </div>
                    </div>
                </div>

                {/* Passed Result */}
                {passed && (
                    <div className="rounded-2xl border border-green-200 bg-green-50 p-6">
                        <div className="flex items-start gap-4">
                            <div className="rounded-xl bg-green-100 p-3">
                                <ShieldCheck className="h-7 w-7 text-green-600" />
                            </div>

                            <div className="flex-1">
                                <h2 className="text-xl font-bold text-green-800">
                                    Professional Credit Earned
                                </h2>

                                <p className="mt-2 leading-7 text-green-700">
                                    Your successful examination has been
                                    recorded. Your professional credit hours
                                    have been earned.
                                </p>

                                {certificate && (
                                    <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                                        <Link
                                            href={route(
                                                'learner.certificates.show',
                                                certificate.id
                                            )}
                                            className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 px-5 py-3 text-sm font-medium text-white hover:bg-green-700"
                                        >
                                            <Award className="h-4 w-4" />
                                            View Certificate
                                        </Link>

                                        <Link
                                            href={route(
                                                'learner.certificates.index'
                                            )}
                                            className="inline-flex items-center justify-center gap-2 rounded-lg border border-green-300 px-5 py-3 text-sm font-medium text-green-700 hover:bg-green-100"
                                        >
                                            <FileCheck className="h-4 w-4" />
                                            My Certificates
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Failed Result */}
                {!passed && (
                    <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-6">
                        <div className="flex items-start gap-4">
                            <div className="rounded-xl bg-yellow-100 p-3">
                                <AlertCircle className="h-7 w-7 text-yellow-600" />
                            </div>

                            <div className="flex-1">
                                <h2 className="text-xl font-bold text-yellow-800">
                                    Keep Learning
                                </h2>

                                <p className="mt-2 leading-7 text-yellow-700">
                                    Review the course lessons and try again if
                                    you have remaining examination attempts.
                                </p>

                                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                                    <Link
                                        href={route(
                                            'learner.courses.show',
                                            exam.course_id
                                        )}
                                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-yellow-600 px-5 py-3 text-sm font-medium text-white hover:bg-yellow-700"
                                    >
                                        <BookOpen className="h-4 w-4" />
                                        Review Course
                                    </Link>

                                    <Link
                                        href={route(
                                            'learner.dashboard'
                                        )}
                                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-yellow-300 px-5 py-3 text-sm font-medium text-yellow-700 hover:bg-yellow-100"
                                    >
                                        <Home className="h-4 w-4" />
                                        Dashboard
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Navigation */}
                <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                    <Link
                        href={route('learner.dashboard')}
                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        <Home className="h-4 w-4" />
                        Go to Dashboard
                    </Link>

                    <Link
                        href={route('courses.catalog')}
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white hover:bg-blue-700"
                    >
                        <BookOpen className="h-4 w-4" />
                        Browse More Courses
                    </Link>
                </div>
            </div>
        </DashboardLayout>
    );
}