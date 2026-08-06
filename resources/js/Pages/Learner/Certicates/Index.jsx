import React from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    Award,
    BookOpen,
    Calendar,
    CheckCircle2,
    ExternalLink,
    FileCheck,
    Search,
    ShieldCheck,
} from 'lucide-react';

import DashboardLayout from '@/Layouts/DashboardLayout';

export default function Index({
    certificates = [],
}) {
    return (
        <DashboardLayout>
            <Head title="My Certificates" />

            <div className="space-y-8">
                {/* Header */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            My Certificates
                        </h1>

                        <p className="mt-1 text-gray-600">
                            View and verify your professional education certificates.
                        </p>
                    </div>

                    <div className="flex items-center gap-2 rounded-lg bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                        <ShieldCheck className="h-5 w-5" />
                        Official Certificates
                    </div>
                </div>

                {/* Summary */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">
                                    Total Certificates
                                </p>

                                <p className="mt-2 text-3xl font-bold text-gray-900">
                                    {certificates.length}
                                </p>
                            </div>

                            <div className="rounded-xl bg-yellow-50 p-3">
                                <Award className="h-6 w-6 text-yellow-600" />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">
                                    Total Credit Hours
                                </p>

                                <p className="mt-2 text-3xl font-bold text-gray-900">
                                    {certificates
                                        .reduce(
                                            (total, certificate) =>
                                                total +
                                                Number(
                                                    certificate.credit_hours || 0
                                                ),
                                            0
                                        )
                                        .toFixed(2)}
                                </p>
                            </div>

                            <div className="rounded-xl bg-blue-50 p-3">
                                <BookOpen className="h-6 w-6 text-blue-600" />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">
                                    Verified Records
                                </p>

                                <p className="mt-2 text-3xl font-bold text-gray-900">
                                    {certificates.length}
                                </p>
                            </div>

                            <div className="rounded-xl bg-green-50 p-3">
                                <CheckCircle2 className="h-6 w-6 text-green-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Certificates */}
                {certificates.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        {certificates.map((certificate) => (
                            <div
                                key={certificate.id}
                                className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
                            >
                                {/* Certificate Header */}
                                <div className="bg-gradient-to-r from-blue-700 to-indigo-700 p-6 text-white">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className="rounded-xl bg-white/20 p-3">
                                                <Award className="h-8 w-8" />
                                            </div>

                                            <div>
                                                <p className="text-sm text-blue-100">
                                                    Certificate of Completion
                                                </p>

                                                <h2 className="mt-1 text-lg font-bold">
                                                    Professional Education
                                                </h2>
                                            </div>
                                        </div>

                                        <CheckCircle2 className="h-7 w-7 text-green-300" />
                                    </div>
                                </div>

                                {/* Certificate Body */}
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900">
                                        {certificate.course?.title ||
                                            'Course Certificate'}
                                    </h3>

                                    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <div className="rounded-lg bg-gray-50 p-4">
                                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                                <FileCheck className="h-4 w-4" />
                                                Certificate Number
                                            </div>

                                            <p className="mt-2 break-all font-semibold text-gray-900">
                                                {certificate.certificate_number}
                                            </p>
                                        </div>

                                        <div className="rounded-lg bg-gray-50 p-4">
                                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                                <BookOpen className="h-4 w-4" />
                                                Credit Hours
                                            </div>

                                            <p className="mt-2 font-semibold text-gray-900">
                                                {certificate.credit_hours} hours
                                            </p>
                                        </div>

                                        <div className="rounded-lg bg-gray-50 p-4">
                                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                                <Calendar className="h-4 w-4" />
                                                Issued On
                                            </div>

                                            <p className="mt-2 font-semibold text-gray-900">
                                                {certificate.issued_at
                                                    ? new Date(
                                                          certificate.issued_at
                                                      ).toLocaleDateString(
                                                          'en-US',
                                                          {
                                                              year: 'numeric',
                                                              month: 'long',
                                                              day: 'numeric',
                                                          }
                                                      )
                                                    : 'N/A'}
                                            </p>
                                        </div>

                                        <div className="rounded-lg bg-gray-50 p-4">
                                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                                <ShieldCheck className="h-4 w-4" />
                                                Verification
                                            </div>

                                            <p className="mt-2 font-semibold text-green-600">
                                                Verified
                                            </p>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                                        
<Link
    href={route(
        'learner.certificates.show',
        certificate.id
    )}
>
    View Certificate
</Link>
                                        <Link
                                            href={route(
                                                'certificates.verify',
                                                certificate.verification_code
                                            )}
                                            target="_blank"
                                            className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                                        >
                                            <Search className="h-4 w-4" />
                                            Verify Certificate
                                            <ExternalLink className="h-4 w-4" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    /* Empty State */
                    <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center shadow-sm">
                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-yellow-50">
                            <Award className="h-10 w-10 text-yellow-500" />
                        </div>

                        <h2 className="mt-6 text-xl font-bold text-gray-900">
                            No Certificates Yet
                        </h2>

                        <p className="mx-auto mt-2 max-w-md text-gray-500">
                            Complete your courses and pass the required exams to
                            earn professional certificates and credit hours.
                        </p>

                        <Link
                            href={route('courses.index')}
                            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white hover:bg-blue-700"
                        >
                            <BookOpen className="h-4 w-4" />
                            Browse Courses
                        </Link>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}