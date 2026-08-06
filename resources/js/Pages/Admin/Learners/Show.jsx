import { Link } from '@inertiajs/react';
import { ArrowLeft, Award, Download, CheckCircle2, XCircle, Clock } from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';

const defaultLearner = {
    id: 1,
    name: 'Maria Owens',
    email: 'maria.owens@example.com',
    joinedAt: 'Mar 3, 2026',
    creditsEarned: 8,
};

const defaultEnrollments = [
    {
        id: 1,
        course: 'Clinical Nutrition Assessment',
        creditType: 'CPEU',
        hours: 3,
        status: 'certified',
        enrolledAt: 'Jul 12',
        attempts: [
            { id: 1, score: 94, passed: true, submittedAt: 'Jul 14' },
        ],
    },
    {
        id: 2,
        course: 'Renal Diet Management',
        creditType: 'State CE',
        hours: 4,
        status: 'certified',
        enrolledAt: 'Jun 2',
        attempts: [
            { id: 2, score: 68, passed: false, submittedAt: 'Jun 5' },
            { id: 3, score: 88, passed: true, submittedAt: 'Jun 9' },
        ],
    },
    {
        id: 3,
        course: 'Pediatric Feeding Disorders',
        creditType: 'CPEU',
        hours: 2,
        status: 'in_progress',
        enrolledAt: 'Jul 24',
        attempts: [],
    },
];

const defaultCertificates = [
    { id: 1, course: 'Clinical Nutrition Assessment', hours: 3, issuedAt: 'Jul 14', code: 'NC-2026-08841' },
    { id: 2, course: 'Renal Diet Management', hours: 4, issuedAt: 'Jun 9', code: 'NC-2026-07213' },
];

const ENROLLMENT_LABELS = {
    purchased: { label: 'Purchased', style: 'bg-[#EEF1EC] text-[#5B6B62]' },
    in_progress: { label: 'In progress', style: 'bg-[#EAF0EC] text-[#3C4A42]' },
    exam_passed: { label: 'Exam passed', style: 'bg-[#E4EFEB] text-[#2F6F5E]' },
    certified: { label: 'Certified', style: 'bg-[#2F6F5E] text-white' },
};

function Stat({ label, value }) {
    return (
        <div className="px-6 py-4 first:pl-0 last:pr-0">
            <p className="text-[11px] uppercase tracking-[0.14em] text-[#5B6B62]">{label}</p>
            <p className="mt-1 font-['IBM_Plex_Mono'] text-xl tabular-nums text-[#1F2A24]">{value}</p>
        </div>
    );
}

export default function Show({
    learner = defaultLearner,
    enrollments = defaultEnrollments,
    certificates = defaultCertificates,
}) {
    const completedCount = enrollments.filter((e) => e.status === 'certified').length;

    return (
        <AdminLayout>
            <Link
                href="/admin/learners"
                className="mb-6 inline-flex items-center gap-1.5 text-sm text-[#5B6B62] hover:text-[#1F2A24]"
            >
                <ArrowLeft size={15} />
                Back to learners
            </Link>

            {/* Header */}
            <div className="mb-6">
                <h1 className="font-['Fraunces'] text-2xl font-medium text-[#1F2A24]">{learner.name}</h1>
                <p className="mt-0.5 text-sm text-[#5B6B62]">
                    {learner.email} · Joined {learner.joinedAt}
                </p>
            </div>

            {/* Stats strip */}
            <div className="mb-10 flex flex-wrap divide-x divide-[#E7EBE3] rounded border border-[#D8DDD5] bg-white px-6">
                <Stat label="Courses enrolled" value={enrollments.length} />
                <Stat label="Courses completed" value={completedCount} />
                <Stat label="Total credits earned" value={`${learner.creditsEarned}h`} />
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                {/* Enrollment history */}
                <div className="lg:col-span-2">
                    <h2 className="mb-3 font-['Fraunces'] text-lg font-medium">Enrollment history</h2>

                    {enrollments.length === 0 ? (
                        <div className="rounded border border-dashed border-[#D8DDD5] bg-white px-6 py-10 text-center">
                            <p className="text-sm text-[#5B6B62]">No enrollments yet.</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {enrollments.map((enrollment) => (
                                <div key={enrollment.id} className="rounded border border-[#D8DDD5] bg-white px-4 py-3">
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <p className="text-sm font-medium text-[#1F2A24]">{enrollment.course}</p>
                                            <p className="text-xs text-[#5B6B62]">
                                                {enrollment.creditType} · {enrollment.hours}h · Enrolled {enrollment.enrolledAt}
                                            </p>
                                        </div>
                                        <span
                                            className={`shrink-0 rounded-full px-2 py-0.5 text-xs ${ENROLLMENT_LABELS[enrollment.status].style}`}
                                        >
                                            {ENROLLMENT_LABELS[enrollment.status].label}
                                        </span>
                                    </div>

                                    {enrollment.attempts.length > 0 && (
                                        <ul className="mt-3 space-y-1.5 border-t border-[#E7EBE3] pt-3">
                                            {enrollment.attempts.map((attempt) => (
                                                <li key={attempt.id} className="flex items-center gap-2 text-xs">
                                                    {attempt.passed ? (
                                                        <CheckCircle2 size={13} className="shrink-0 text-[#2F6F5E]" />
                                                    ) : (
                                                        <XCircle size={13} className="shrink-0 text-[#B65C4A]" />
                                                    )}
                                                    <span className="font-['IBM_Plex_Mono'] tabular-nums text-[#1F2A24]">
                                                        {attempt.score}%
                                                    </span>
                                                    <span className="text-[#5B6B62]">
                                                        {attempt.passed ? 'Passed' : 'Did not pass'} · Submitted {attempt.submittedAt}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}

                                    {enrollment.status === 'in_progress' && enrollment.attempts.length === 0 && (
                                        <p className="mt-3 flex items-center gap-1.5 border-t border-[#E7EBE3] pt-3 text-xs text-[#5B6B62]">
                                            <Clock size={13} />
                                            Hasn't taken the exam yet.
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Certificates */}
                <div>
                    <h2 className="mb-3 font-['Fraunces'] text-lg font-medium">Certificates</h2>

                    {certificates.length === 0 ? (
                        <div className="rounded border border-dashed border-[#D8DDD5] bg-white px-6 py-10 text-center">
                            <p className="text-sm text-[#5B6B62]">No certificates issued yet.</p>
                        </div>
                    ) : (
                        <ul className="divide-y divide-[#E7EBE3] rounded border border-[#D8DDD5] bg-white">
                            {certificates.map((cert) => (
                                <li key={cert.id} className="flex items-start gap-3 px-4 py-3">
                                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#E4EFEB] text-[#2F6F5E]">
                                        <Award size={14} strokeWidth={2.5} />
                                    </span>
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-sm font-medium text-[#1F2A24]">{cert.course}</p>
                                        <p className="font-['IBM_Plex_Mono'] text-[11px] tabular-nums text-[#5B6B62]">
                                            {cert.hours}h · Issued {cert.issuedAt}
                                        </p>
                                        <p className="mt-0.5 font-['IBM_Plex_Mono'] text-[10px] tabular-nums text-[#98A398]">
                                            {cert.code}
                                        </p>
                                    </div>
                                    <a
                                        href={`/admin/certificates/${cert.id}/download`}
                                        className="shrink-0 rounded p-1.5 text-[#5B6B62] hover:bg-[#EEF1EC] hover:text-[#1F2A24]"
                                        title="Download"
                                    >
                                        <Download size={14} />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}