import React from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    ArrowLeft,
    Award,
    CheckCircle2,
    Download,
    ExternalLink,
    FileCheck,
    ShieldCheck,
} from 'lucide-react';

import DashboardLayout from '@/Layouts/DashboardLayout';

export default function Show({ certificate }) {
    const issuedDate = certificate.issued_at
        ? new Date(certificate.issued_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
          })
        : 'N/A';

    const verificationUrl = route(
        'certificates.verify',
        certificate.verification_code
    );

    const printCertificate = () => {
        window.print();
    };

    return (
        <DashboardLayout>
            <Head
                title={`Certificate - ${certificate.certificate_number}`}
            />

            <div className="space-y-6">
                {/* Top Navigation */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between print:hidden">
                    <Link
                        href={route('learner.certificates.index')}
                        className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to My Certificates
                    </Link>

                    <button
                        type="button"
                        onClick={printCertificate}
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
                    >
                        <Download className="h-4 w-4" />
                        Print / Save Certificate
                    </button>
                </div>

                {/* Certificate */}
                <div
                    id="certificate"
                    className="mx-auto max-w-5xl overflow-hidden rounded-2xl border-8 border-blue-100 bg-white shadow-xl print:max-w-none print:rounded-none print:border-8 print:shadow-none"
                >
                    {/* Certificate Header */}
                    <div className="border-b-4 border-blue-600 bg-gradient-to-r from-blue-800 to-indigo-800 px-8 py-10 text-center text-white sm:px-16">
                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-4 border-white/40 bg-white/20">
                            <Award className="h-10 w-10" />
                        </div>

                        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.3em] text-blue-100">
                            Professional Education Certificate
                        </p>

                        <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
                            Certificate of Completion
                        </h1>
                    </div>

                    {/* Certificate Content */}
                    <div className="px-8 py-12 text-center sm:px-16">
                        <p className="text-sm text-gray-500">
                            This certificate is proudly presented to
                        </p>

                        <h2 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                            {certificate.user?.name}
                        </h2>

                        <div className="mx-auto mt-6 h-1 w-32 rounded-full bg-blue-600" />

                        <p className="mx-auto mt-8 max-w-3xl text-base leading-8 text-gray-600">
                            For successfully completing the professional
                            education course
                        </p>

                        <h3 className="mx-auto mt-4 max-w-3xl text-2xl font-bold text-blue-800 sm:text-3xl">
                            {certificate.course?.title}
                        </h3>

                        <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-gray-600">
                            and fulfilling the requirements for the award of
                            professional education credits.
                        </p>

                        {/* Certificate Details */}
                        <div className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
                            <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
                                <FileCheck className="mx-auto h-6 w-6 text-blue-600" />

                                <p className="mt-3 text-xs font-medium uppercase tracking-wide text-gray-500">
                                    Certificate Number
                                </p>

                                <p className="mt-2 break-all text-sm font-bold text-gray-900">
                                    {certificate.certificate_number}
                                </p>
                            </div>

                            <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
                                <Award className="mx-auto h-6 w-6 text-yellow-600" />

                                <p className="mt-3 text-xs font-medium uppercase tracking-wide text-gray-500">
                                    Credit Hours
                                </p>

                                <p className="mt-2 text-xl font-bold text-gray-900">
                                    {certificate.credit_hours}
                                </p>
                            </div>

                            <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
                                <CheckCircle2 className="mx-auto h-6 w-6 text-green-600" />

                                <p className="mt-3 text-xs font-medium uppercase tracking-wide text-gray-500">
                                    Issued On
                                </p>

                                <p className="mt-2 text-sm font-bold text-gray-900">
                                    {issuedDate}
                                </p>
                            </div>
                        </div>

                        {/* Verification */}
                        <div className="mx-auto mt-10 max-w-3xl rounded-xl border border-green-200 bg-green-50 p-5">
                            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                                <ShieldCheck className="h-7 w-7 text-green-600" />

                                <div className="text-center sm:text-left">
                                    <p className="font-semibold text-green-800">
                                        Certificate Verification Code
                                    </p>

                                    <p className="mt-1 break-all font-mono text-sm text-green-700">
                                        {certificate.verification_code}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="mt-12 border-t border-gray-200 pt-8">
                            <div className="flex flex-col items-center justify-between gap-6 text-sm text-gray-500 sm:flex-row">
                                <div className="text-center sm:text-left">
                                    <p className="font-semibold text-gray-900">
                                        Issued by the Professional Education Platform
                                    </p>

                                    <p className="mt-1">
                                        This certificate can be independently verified online.
                                    </p>
                                </div>

                                <div className="text-center sm:text-right">
                                    <p className="text-xs uppercase tracking-wide">
                                        Verification Code
                                    </p>

                                    <p className="mt-1 font-mono font-semibold text-gray-900">
                                        {certificate.verification_code}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Verification Action */}
                <div className="mx-auto flex max-w-5xl justify-center print:hidden">
                    <a
                        href={verificationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-5 py-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                    >
                        <ExternalLink className="h-4 w-4" />
                        Open Public Verification Page
                    </a>
                </div>
            </div>
        </DashboardLayout>
    );
}