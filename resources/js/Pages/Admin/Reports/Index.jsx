import { Link, router } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';

const cardClass = 'rounded border border-[#D8DDD5] bg-white p-5';
const inputClass =
    'rounded border border-[#D8DDD5] bg-white px-3 py-2 text-sm text-[#1F2A24] focus:border-[#2F6F5E] focus:outline-none focus:ring-2 focus:ring-[#2F6F5E]/20';

function formatCurrency(value) {
    const n = Number(value ?? 0);
    return n.toLocaleString(undefined, { style: 'currency', currency: 'USD' });
}

function SummaryCard({ label, value, hint }) {
    return (
        <div className={cardClass}>
            <p className="text-xs font-medium uppercase tracking-wide text-[#5B6B62]">{label}</p>
            <p className="mt-2 font-['IBM_Plex_Mono'] text-2xl font-semibold text-[#1F2A24]">{value}</p>
            {hint && <p className="mt-1 text-xs text-[#5B6B62]">{hint}</p>}
        </div>
    );
}

// Props come from Admin\ReportController@index:
//   summary: { revenue, payments, enrollments, completed_enrollments, certificates, new_learners }
//   topCourses: [{ course_id, enrollment_count, course: { id, title } }]
//   recentPayments: [{ id, amount, status, user: {...}, course: {...}, created_at }]
//   filters: { start_date, end_date }
export default function Index({
    summary = {},
    topCourses = [],
    recentPayments = [],
    filters = {},
}) {
    const [startDate, setStartDate] = useState(filters.start_date ?? '');
    const [endDate, setEndDate] = useState(filters.end_date ?? '');

    function applyFilters(e) {
        e.preventDefault();
        router.get(
            '/admin/reports',
            { start_date: startDate, end_date: endDate },
            { preserveState: true, preserveScroll: true }
        );
    }

    return (
        <AdminLayout title="Reports">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
                <div>
                    <h1 className="font-['Space_Grotesk'] text-2xl font-semibold text-[#1F2A24]">Reports</h1>
                    <p className="mt-1 text-sm text-[#5B6B62]">
                        Overview for {filters.start_date} &ndash; {filters.end_date}
                    </p>
                </div>

                <form onSubmit={applyFilters} className="flex flex-wrap items-end gap-3">
                    <div>
                        <label htmlFor="start_date" className="mb-1 block text-xs font-medium text-[#5B6B62]">
                            Start date
                        </label>
                        <input
                            id="start_date"
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className={inputClass}
                        />
                    </div>
                    <div>
                        <label htmlFor="end_date" className="mb-1 block text-xs font-medium text-[#5B6B62]">
                            End date
                        </label>
                        <input
                            id="end_date"
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className={inputClass}
                        />
                    </div>
                    <button
                        type="submit"
                        className="rounded bg-[#2F6F5E] px-4 py-2 text-sm font-medium text-white hover:bg-[#24564A]"
                    >
                        Apply
                    </button>
                </form>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                <SummaryCard label="Revenue" value={formatCurrency(summary.revenue)} />
                <SummaryCard label="Payments" value={summary.payments ?? 0} />
                <SummaryCard label="Enrollments" value={summary.enrollments ?? 0} />
                <SummaryCard label="Completed" value={summary.completed_enrollments ?? 0} />
                <SummaryCard label="Certificates issued" value={summary.certificates ?? 0} />
                <SummaryCard label="New learners" value={summary.new_learners ?? 0} />
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
                <div className={cardClass}>
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="font-['Space_Grotesk'] text-base font-semibold text-[#1F2A24]">Top courses</h2>
                        <Link href="/admin/reports/enrollments" className="text-xs font-medium text-[#2F6F5E] hover:underline">
                            View enrollments &rarr;
                        </Link>
                    </div>

                    {topCourses.length === 0 ? (
                        <p className="text-sm text-[#5B6B62]">No enrollments in this period.</p>
                    ) : (
                        <ul className="space-y-3">
                            {topCourses.map((row) => (
                                <li key={row.course_id} className="flex items-center justify-between text-sm">
                                    <span className="text-[#1F2A24]">{row.course?.title ?? `Course #${row.course_id}`}</span>
                                    <span className="font-['IBM_Plex_Mono'] text-[#5B6B62]">{row.enrollment_count}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className={cardClass}>
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="font-['Space_Grotesk'] text-base font-semibold text-[#1F2A24]">Recent payments</h2>
                        <Link href="/admin/reports/revenue" className="text-xs font-medium text-[#2F6F5E] hover:underline">
                            View revenue &rarr;
                        </Link>
                    </div>

                    {recentPayments.length === 0 ? (
                        <p className="text-sm text-[#5B6B62]">No payments yet.</p>
                    ) : (
                        <ul className="divide-y divide-[#EEF1EC]">
                            {recentPayments.map((payment) => (
                                <li key={payment.id} className="flex items-center justify-between py-3 text-sm">
                                    <div>
                                        <p className="text-[#1F2A24]">{payment.user?.name ?? 'Unknown user'}</p>
                                        <p className="text-xs text-[#5B6B62]">{payment.course?.title ?? '—'}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-['IBM_Plex_Mono'] text-[#1F2A24]">{formatCurrency(payment.amount)}</p>
                                        <p className="text-xs capitalize text-[#5B6B62]">{payment.status}</p>
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