import { Link } from '@inertiajs/react';
import {
    ArrowUpRight,
    ArrowDownRight,
    Plus,
    AlertTriangle,
    Award,
} from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';

// ---- Sample data shape -----------------------------------------------
// In production these arrive as Inertia props from Admin\DashboardController.
// The defaults below exist only so this page renders sensibly in isolation.

const defaultStats = {
    revenue: { value: 12480, delta: 8.2, direction: 'up' },
    activeLearners: { value: 214, delta: 3.1, direction: 'up' },
    creditsIssued: { value: 96.5, unit: 'CPEU', delta: 12, direction: 'up' },
    passRate: { value: 88, delta: 2.4, direction: 'down' },
};

const defaultCourses = [
    { id: 1, title: 'Clinical Nutrition Assessment', creditType: 'CPEU', hours: 3, price: 89, enrolled: 64, passRate: 94, status: 'published' },
    { id: 2, title: 'Pediatric Feeding Disorders', creditType: 'CPEU', hours: 2, price: 59, enrolled: 41, passRate: 71, status: 'published' },
    { id: 3, title: 'Renal Diet Management', creditType: 'State CE', hours: 4, price: 119, enrolled: 22, passRate: 90, status: 'published' },
    { id: 4, title: 'Sports Nutrition Fundamentals', creditType: 'CPEU', hours: 2, price: 49, enrolled: 0, passRate: null, status: 'draft' },
];

const defaultCertificates = [
    { id: 1, learner: 'Maria Owens', course: 'Clinical Nutrition Assessment', hours: 3, issuedAt: 'Jul 26' },
    { id: 2, learner: 'David Kimani', course: 'Renal Diet Management', hours: 4, issuedAt: 'Jul 25' },
    { id: 3, learner: 'Priya Nair', course: 'Clinical Nutrition Assessment', hours: 3, issuedAt: 'Jul 25' },
    { id: 4, learner: 'Tomás Rivera', course: 'Pediatric Feeding Disorders', hours: 2, issuedAt: 'Jul 24' },
];

const PASS_RATE_WARNING_THRESHOLD = 75;

function currency(n) {
    return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
}

function Delta({ delta, direction }) {
    const positive = direction === 'up';
    const Icon = positive ? ArrowUpRight : ArrowDownRight;
    return (
        <span className={`inline-flex items-center gap-0.5 text-xs font-['IBM_Plex_Mono'] ${positive ? 'text-[#2F6F5E]' : 'text-[#B65C4A]'}`}>
            <Icon size={13} strokeWidth={2.5} />
            {delta}%
        </span>
    );
}

function LedgerStat({ label, value, delta, direction, sublabel }) {
    return (
        <div className="flex-1 px-6 py-5 first:pl-0 last:pr-0">
            <p className="text-[11px] uppercase tracking-[0.14em] text-[#5B6B62]">{label}</p>
            <div className="mt-2 flex items-baseline gap-2">
                <span className="font-['IBM_Plex_Mono'] text-2xl tabular-nums text-[#1F2A24]">
                    {value}
                </span>
                {sublabel && <span className="text-sm text-[#5B6B62]">{sublabel}</span>}
            </div>
            <div className="mt-1">
                <Delta delta={delta} direction={direction} />
                <span className="ml-1 text-xs text-[#5B6B62]">vs last 30d</span>
            </div>
        </div>
    );
}

export default function Dashboard({
    stats = defaultStats,
    courses = defaultCourses,
    certificates = defaultCertificates,
}) {
    const today = new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });

    return (
        <AdminLayout title="Dashboard">
            {/* Header row */}
            <div className="mb-6 flex items-center justify-between">
                <p className="font-['IBM_Plex_Mono'] text-[11px] uppercase tracking-[0.14em] text-[#5B6B62]">
                    As of {today}
                </p>
                <Link
                    href="/admin/courses/create"
                    className="inline-flex items-center gap-1.5 rounded bg-[#2F6F5E] px-4 py-2 text-sm font-medium text-white hover:bg-[#24564A]"
                >
                    <Plus size={15} strokeWidth={2.5} />
                    New course
                </Link>
            </div>

            {/* Ledger strip — signature element: a requisition-form style summary row */}
            <div className="relative mb-10 rounded border border-[#D8DDD5] bg-white px-6">
                <span className="pointer-events-none absolute -left-px -top-px h-3 w-3 border-l-2 border-t-2 border-[#2F6F5E]" />
                <span className="pointer-events-none absolute -bottom-px -right-px h-3 w-3 border-b-2 border-r-2 border-[#2F6F5E]" />
                <div className="flex flex-col divide-y divide-[#E7EBE3] sm:flex-row sm:divide-x sm:divide-y-0">
                    <LedgerStat
                        label="Revenue — 30d"
                        value={currency(stats.revenue.value)}
                        delta={stats.revenue.delta}
                        direction={stats.revenue.direction}
                    />
                    <LedgerStat
                        label="Active learners"
                        value={stats.activeLearners.value}
                        delta={stats.activeLearners.delta}
                        direction={stats.activeLearners.direction}
                    />
                    <LedgerStat
                        label="Credits issued"
                        value={stats.creditsIssued.value}
                        sublabel={stats.creditsIssued.unit}
                        delta={stats.creditsIssued.delta}
                        direction={stats.creditsIssued.direction}
                    />
                    <LedgerStat
                        label="Avg. exam pass rate"
                        value={`${stats.passRate.value}%`}
                        delta={stats.passRate.delta}
                        direction={stats.passRate.direction}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                {/* Courses table */}
                <div className="lg:col-span-2">
                    <div className="mb-3 flex items-center justify-between">
                        <h2 className="font-['Fraunces'] text-lg font-medium">Courses</h2>
                        <Link href="/admin/courses" className="text-sm text-[#2F6F5E] hover:underline">
                            View all
                        </Link>
                    </div>

                    {courses.length === 0 ? (
                        <div className="rounded border border-dashed border-[#D8DDD5] bg-white px-6 py-10 text-center">
                            <p className="text-sm text-[#5B6B62]">
                                No courses yet — publish your first lesson to start issuing credits.
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-hidden rounded border border-[#D8DDD5] bg-white">
                            <table className="w-full text-left text-sm">
                                <thead>
                                    <tr className="border-b border-[#D8DDD5] text-[11px] uppercase tracking-[0.1em] text-[#5B6B62]">
                                        <th className="px-4 py-3 font-medium">Course</th>
                                        <th className="px-4 py-3 font-medium">Credit</th>
                                        <th className="px-4 py-3 font-medium">Price</th>
                                        <th className="px-4 py-3 font-medium">Enrolled</th>
                                        <th className="px-4 py-3 font-medium">Pass rate</th>
                                        <th className="px-4 py-3 font-medium">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {courses.map((course) => {
                                        const flagged =
                                            course.passRate !== null && course.passRate < PASS_RATE_WARNING_THRESHOLD;
                                        return (
                                            <tr
                                                key={course.id}
                                                className={`border-b border-[#E7EBE3] last:border-0 ${
                                                    flagged ? 'border-l-2 border-l-[#C98A3B] bg-[#FBF6EE]' : ''
                                                }`}
                                            >
                                                <td className="px-4 py-3">
                                                    <Link
                                                        href={`/admin/courses/${course.id}/edit`}
                                                        className="font-medium text-[#1F2A24] hover:text-[#2F6F5E]"
                                                    >
                                                        {course.title}
                                                    </Link>
                                                </td>
                                                <td className="px-4 py-3 text-[#5B6B62]">
                                                    {course.creditType} · {course.hours}h
                                                </td>
                                                <td className="px-4 py-3 font-['IBM_Plex_Mono'] tabular-nums">
                                                    {currency(course.price)}
                                                </td>
                                                <td className="px-4 py-3 font-['IBM_Plex_Mono'] tabular-nums">
                                                    {course.enrolled}
                                                </td>
                                                <td className="px-4 py-3">
                                                    {course.passRate === null ? (
                                                        <span className="text-[#5B6B62]">—</span>
                                                    ) : (
                                                        <span
                                                            className={`inline-flex items-center gap-1 font-['IBM_Plex_Mono'] tabular-nums ${
                                                                flagged ? 'text-[#C98A3B]' : 'text-[#1F2A24]'
                                                            }`}
                                                        >
                                                            {flagged && <AlertTriangle size={13} strokeWidth={2.5} />}
                                                            {course.passRate}%
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-4 py-3">
                                                    <span
                                                        className={`rounded-full px-2 py-0.5 text-xs ${
                                                            course.status === 'published'
                                                                ? 'bg-[#E4EFEB] text-[#2F6F5E]'
                                                                : 'bg-[#EEF1EC] text-[#5B6B62]'
                                                        }`}
                                                    >
                                                        {course.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Recent certificates feed */}
                <div>
                    <div className="mb-3 flex items-center justify-between">
                        <h2 className="font-['Fraunces'] text-lg font-medium">Certificates issued</h2>
                        <Link href="/admin/reports/credits-issued" className="text-sm text-[#2F6F5E] hover:underline">
                            Report
                        </Link>
                    </div>

                    {certificates.length === 0 ? (
                        <div className="rounded border border-dashed border-[#D8DDD5] bg-white px-6 py-10 text-center">
                            <p className="text-sm text-[#5B6B62]">
                                Certificates will appear here as learners pass their exams.
                            </p>
                        </div>
                    ) : (
                        <ul className="divide-y divide-[#E7EBE3] rounded border border-[#D8DDD5] bg-white">
                            {certificates.map((cert) => (
                                <li key={cert.id} className="flex items-start gap-3 px-4 py-3">
                                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#E4EFEB] text-[#2F6F5E]">
                                        <Award size={14} strokeWidth={2.5} />
                                    </span>
                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-medium text-[#1F2A24]">{cert.learner}</p>
                                        <p className="truncate text-xs text-[#5B6B62]">{cert.course}</p>
                                        <p className="mt-0.5 font-['IBM_Plex_Mono'] text-[11px] tabular-nums text-[#5B6B62]">
                                            {cert.hours}h · {cert.issuedAt}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}