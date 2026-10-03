import { Head, Link, usePage } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';

/* ------------------------------------------------------------------ */
/* Formatting helpers                                                  */
/* ------------------------------------------------------------------ */

const number = (n) => new Intl.NumberFormat().format(Math.round(Number(n) || 0));

const dateShort = (value) =>
    value
        ? new Date(value).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })
        : '—';

const STATUS_STYLES = {
    paid: 'bg-emerald-100 text-emerald-800',
    completed: 'bg-emerald-100 text-emerald-800',
    succeeded: 'bg-emerald-100 text-emerald-800',
    success: 'bg-emerald-100 text-emerald-800',
    delivered: 'bg-emerald-100 text-emerald-800',
    pending: 'bg-amber-100 text-amber-800',
    processing: 'bg-sky-100 text-sky-800',
    failed: 'bg-rose-100 text-rose-800',
    cancelled: 'bg-rose-100 text-rose-800',
    refunded: 'bg-slate-200 text-slate-700',
};

function StatusBadge({ status }) {
    if (!status) return <span className="text-slate-400">—</span>;
    const style = STATUS_STYLES[String(status).toLowerCase()] ?? 'bg-slate-100 text-slate-700';
    return (
        <span className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${style}`}>
            {status}
        </span>
    );
}

/* ------------------------------------------------------------------ */
/* Pieces                                                              */
/* ------------------------------------------------------------------ */

function RevenueChart({ data }) {
    const max = Math.max(...data.map((d) => d.total), 0);

    if (max === 0) {
        return (
            <p className="flex h-40 items-center text-sm text-slate-400">
                No paid payments in the last 6 months.
            </p>
        );
    }

    return (
        <div className="flex h-40 items-end gap-3" role="img" aria-label="Revenue for the last 6 months">
            {data.map((d, i) => {
                const isLatest = i === data.length - 1;
                const height = Math.max((d.total / max) * 100, d.total > 0 ? 4 : 0);
                return (
                    <div key={d.label + i} className="flex h-full flex-1 flex-col justify-end gap-2">
                        <div
                            className={`w-full rounded-t ${isLatest ? 'bg-teal-700' : 'bg-teal-700/30'}`}
                            style={{ height: `${height}%` }}
                            title={`${d.label}: ${number(d.total)}`}
                        />
                        <span className="text-center text-xs text-slate-500">{d.label}</span>
                    </div>
                );
            })}
        </div>
    );
}

function Metric({ label, value, note, href }) {
    const body = (
        <>
            <dt className="text-sm text-slate-500">{label}</dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-slate-900">{number(value)}</dd>
            {note && <dd className="mt-1 text-xs text-slate-500">{note}</dd>}
        </>
    );

    return (
        <div className="px-5 py-4">
            {href ? (
                <Link href={href} className="block rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-700">
                    {body}
                </Link>
            ) : (
                body
            )}
        </div>
    );
}

function Panel({ title, href, linkLabel, children }) {
    return (
        <section className="rounded-lg border border-slate-200 bg-white">
            <header className="flex items-center justify-between border-b border-slate-100 px-5 py-3">
                <h2 className="text-base font-semibold text-slate-900">{title}</h2>
                {href && (
                    <Link href={href} className="text-sm font-medium text-teal-700 hover:underline">
                        {linkLabel ?? 'View all'}
                    </Link>
                )}
            </header>
            {children}
        </section>
    );
}

function Empty({ children }) {
    return <p className="px-5 py-8 text-sm text-slate-400">{children}</p>;
}

function Row({ primary, secondary, right, rightSecondary }) {
    return (
        <li className="flex items-center justify-between gap-4 px-5 py-3">
            <div className="min-w-0">
                <p className="truncate text-sm font-medium text-slate-900">{primary}</p>
                {secondary && <p className="truncate text-xs text-slate-500">{secondary}</p>}
            </div>
            <div className="shrink-0 text-right">
                <div className="text-sm text-slate-900">{right}</div>
                {rightSecondary && <div className="text-xs text-slate-500">{rightSecondary}</div>}
            </div>
        </li>
    );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function Index({
    stats = {},
    currency = 'RWF',
    revenueByMonth = [],
    usersByRole = [],
    recentUsers = [],
    recentPayments = [],
    recentOrders = [],
    recentEnrollments = [],
}) {
    const { auth } = usePage().props;
    const adminName = auth?.user?.name;
    const totalUsers = usersByRole.reduce((sum, r) => sum + r.total, 0) || 1;

    return (
        <DashboardLayout>
            <Head title="Admin dashboard" />

            <div className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
                        {adminName ? `Welcome back, ${adminName.split(' ')[0]}` : 'Dashboard'}
                    </h1>
                    <p className="mt-1 text-sm text-slate-500">
                        Revenue, learners and orders across the platform.
                    </p>
                </div>

                {/* Revenue + chart */}
                <section className="grid gap-6 rounded-lg border border-slate-200 bg-white p-6 lg:grid-cols-5">
                    <div className="lg:col-span-2">
                        <p className="text-sm text-slate-500">Total revenue</p>
                        <p className="mt-2 text-5xl font-semibold tracking-tight text-slate-900">
                            {number(stats.revenue)}
                            <span className="ml-2 text-lg font-medium text-slate-400">{currency}</span>
                        </p>
                        <p className="mt-3 text-sm text-slate-600">
                            {number(stats.revenue_30d)} {currency} in the last 30 days
                        </p>
                        <Link
                            href="/admin/reports/revenue"
                            className="mt-5 inline-block rounded bg-teal-700 px-4 py-2 text-sm font-medium text-white hover:bg-teal-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 focus-visible:ring-offset-2"
                        >
                            Open revenue report
                        </Link>
                    </div>
                    <div className="lg:col-span-3">
                        <p className="mb-3 text-sm text-slate-500">Revenue by month</p>
                        <RevenueChart data={revenueByMonth} />
                    </div>
                </section>

                {/* Metrics */}
                <dl className="grid grid-cols-2 divide-x divide-y divide-slate-200 overflow-hidden rounded-lg border border-slate-200 bg-white md:grid-cols-4">
                    <Metric label="Users" value={stats.users} note={`${number(stats.new_users)} joined in 30 days`} href="/admin/users" />
                    <Metric label="Courses" value={stats.courses} href="/admin/courses" />
                    <Metric label="Enrollments" value={stats.enrollments} note={`${number(stats.new_enrollments)} in 30 days`} href="/admin/enrollments" />
                    <Metric label="Certificates issued" value={stats.certificates} href="/admin/certificates" />
                    <Metric label="Orders" value={stats.orders} note={`${number(stats.pending_orders)} pending`} />
                    <Metric label="Products" value={stats.products} />
                    <Metric label="Appointments" value={stats.appointments} note={`${number(stats.pending_appointments)} pending`} />
                    <Metric label="Pending orders" value={stats.pending_orders} />
                </dl>

                {/* Activity */}
                <div className="grid gap-6 lg:grid-cols-2">
                    <Panel title="Recent payments" href="/admin/payments">
                        {recentPayments.length === 0 ? (
                            <Empty>No payments yet.</Empty>
                        ) : (
                            <ul className="divide-y divide-slate-100">
                                {recentPayments.map((p) => (
                                    <Row
                                        key={p.id}
                                        primary={p.user?.name ?? `Payment #${p.id}`}
                                        secondary={dateShort(p.created_at)}
                                        right={`${number(p.amount)} ${currency}`}
                                        rightSecondary={<StatusBadge status={p.status} />}
                                    />
                                ))}
                            </ul>
                        )}
                    </Panel>

                    <Panel title="Recent orders">
                        {recentOrders.length === 0 ? (
                            <Empty>No orders yet.</Empty>
                        ) : (
                            <ul className="divide-y divide-slate-100">
                                {recentOrders.map((o) => (
                                    <Row
                                        key={o.id}
                                        primary={`Order #${o.id}`}
                                        secondary={`${o.user?.name ?? 'Guest'} · ${dateShort(o.created_at)}`}
                                        right={o.total != null ? `${number(o.total)} ${currency}` : '—'}
                                        rightSecondary={<StatusBadge status={o.status} />}
                                    />
                                ))}
                            </ul>
                        )}
                    </Panel>

                    <Panel title="Recent enrollments" href="/admin/enrollments">
                        {recentEnrollments.length === 0 ? (
                            <Empty>No enrollments yet.</Empty>
                        ) : (
                            <ul className="divide-y divide-slate-100">
                                {recentEnrollments.map((e) => (
                                    <Row
                                        key={e.id}
                                        primary={e.user?.name ?? `Learner #${e.user_id ?? e.id}`}
                                        secondary={e.course?.title ?? 'Course'}
                                        right={dateShort(e.created_at)}
                                    />
                                ))}
                            </ul>
                        )}
                    </Panel>

                    <Panel title="New users" href="/admin/users">
                        {recentUsers.length === 0 ? (
                            <Empty>No users yet.</Empty>
                        ) : (
                            <ul className="divide-y divide-slate-100">
                                {recentUsers.map((u) => (
                                    <Row
                                        key={u.id}
                                        primary={u.name}
                                        secondary={u.email}
                                        right={<span className="capitalize">{u.role ?? '—'}</span>}
                                        rightSecondary={dateShort(u.created_at)}
                                    />
                                ))}
                            </ul>
                        )}
                    </Panel>
                </div>

                {/* Users by role */}
                <Panel title="Users by role">
                    {usersByRole.length === 0 ? (
                        <Empty>No role data available.</Empty>
                    ) : (
                        <ul className="space-y-3 px-5 py-4">
                            {usersByRole.map((r) => (
                                <li key={r.role} className="grid grid-cols-[7rem_1fr_3rem] items-center gap-3 text-sm">
                                    <span className="capitalize text-slate-700">{r.role}</span>
                                    <div className="h-2 rounded-full bg-slate-100">
                                        <div
                                            className="h-2 rounded-full bg-teal-700"
                                            style={{ width: `${(r.total / totalUsers) * 100}%` }}
                                        />
                                    </div>
                                    <span className="text-right text-slate-900">{number(r.total)}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </Panel>
            </div>
        </DashboardLayout>
    );
}