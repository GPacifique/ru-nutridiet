import { Head, Link, usePage } from '@inertiajs/react';
import AdminLayout, { isLive } from '@/Layouts/AdminLayout';

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

const number = (n) => new Intl.NumberFormat(undefined, { maximumFractionDigits: 1 }).format(Number(n) || 0);

const dateShort = (value) =>
    value ? new Date(value).toLocaleDateString(undefined, { day: 'numeric', month: 'short' }) : '—';

const fullName = (o) => [o?.first_name, o?.last_name].filter(Boolean).join(' ');

const STATUS_STYLES = {
    paid: 'bg-emerald-100 text-emerald-800',
    completed: 'bg-emerald-100 text-emerald-800',
    published: 'bg-emerald-100 text-emerald-800',
    confirmed: 'bg-emerald-100 text-emerald-800',
    active: 'bg-emerald-100 text-emerald-800',
    delivered: 'bg-emerald-100 text-emerald-800',
    pending: 'bg-amber-100 text-amber-800',
    draft: 'bg-amber-100 text-amber-800',
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
            {String(status).replace(/_/g, ' ')}
        </span>
    );
}

/* ------------------------------------------------------------------ */
/* Building blocks                                                     */
/* ------------------------------------------------------------------ */

function Panel({ title, action, children }) {
    return (
        <section className="rounded-lg border border-slate-200 bg-white">
            <header className="flex items-center justify-between border-b border-slate-100 px-5 py-3">
                <h2 className="text-base font-semibold text-slate-900">{title}</h2>
                {action}
            </header>
            {children}
        </section>
    );
}

function ViewAll({ href }) {
    if (!isLive(href)) return null;
    return (
        <Link href={href} className="text-sm font-medium text-teal-700 hover:underline">
            View all
        </Link>
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

function BarChart({ data, label, highlightLast = true }) {
    const max = Math.max(...data.map((d) => d.total), 0);

    if (max === 0) return <p className="flex h-40 items-center text-sm text-slate-400">No data in the last 6 months.</p>;

    return (
        <div className="flex h-40 items-end gap-3" role="img" aria-label={label}>
            {data.map((d, i) => {
                const latest = highlightLast && i === data.length - 1;
                const height = Math.max((d.total / max) * 100, d.total > 0 ? 4 : 0);
                return (
                    <div key={d.label + i} className="flex h-full flex-1 flex-col justify-end gap-2">
                        <span className="text-center text-xs text-slate-500">{d.total > 0 ? number(d.total) : ''}</span>
                        <div
                            className={`w-full rounded-t ${latest ? 'bg-teal-700' : 'bg-teal-700/30'}`}
                            style={{ height: `${height}%` }}
                        />
                        <span className="text-center text-xs text-slate-500">{d.label}</span>
                    </div>
                );
            })}
        </div>
    );
}

function Distribution({ data, empty }) {
    const total = data.reduce((sum, r) => sum + r.total, 0);
    if (total === 0) return <Empty>{empty}</Empty>;

    return (
        <ul className="space-y-3 px-5 py-4">
            {data.map((r) => (
                <li key={r.label} className="grid grid-cols-[7rem_1fr_3rem] items-center gap-3 text-sm">
                    <span className="truncate capitalize text-slate-700">{String(r.label).replace(/_/g, ' ')}</span>
                    <div className="h-2 rounded-full bg-slate-100">
                        <div className="h-2 rounded-full bg-teal-700" style={{ width: `${(r.total / total) * 100}%` }} />
                    </div>
                    <span className="text-right text-slate-900">{number(r.total)}</span>
                </li>
            ))}
        </ul>
    );
}

function SectionCard({ section }) {
    return (
        <Panel title={section.title}>
            <ul className="divide-y divide-slate-100">
                {section.items.map((item) => {
                    const inner = (
                        <>
                            <div className="min-w-0">
                                <p className="truncate text-sm text-slate-700">{item.label}</p>
                                {item.note && <p className="truncate text-xs text-slate-500">{item.note}</p>}
                            </div>
                            <p className="text-lg font-semibold tabular-nums text-slate-900">{number(item.value)}</p>
                        </>
                    );

                    return (
                        <li key={item.label}>
                            {isLive(item.href) ? (
                                <Link
                                    href={item.href}
                                    className="flex items-center justify-between gap-4 px-5 py-3 hover:bg-slate-50 focus:outline-none focus-visible:bg-slate-50 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-teal-700"
                                >
                                    {inner}
                                </Link>
                            ) : (
                                <div className="flex items-center justify-between gap-4 px-5 py-3">{inner}</div>
                            )}
                        </li>
                    );
                })}
            </ul>
        </Panel>
    );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function Index({
    currency = 'RWF',
    revenue = { total: 0, last_30: 0, by_month: [] },
    sections = [],
    attention = [],
    exams = { attempts: 0, passed: 0, pass_rate: null },
    enrollmentsByMonth = [],
    enrollmentsByStatus = [],
    usersByRole = [],
    recent = {},
}) {
    const { auth } = usePage().props;
    const firstName = auth?.user?.name?.split(' ')[0];

    const {
        enrollments = [],
        orders = [],
        users = [],
        articles = [],
        appointments = [],
        messages = [],
    } = recent;

    return (
        <AdminLayout>
            <Head title="Admin dashboard" />

            <div className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
                        {firstName ? `Welcome back, ${firstName}` : 'Dashboard'}
                    </h1>
                    <p className="mt-1 text-sm text-slate-500">
                        Courses, people, content and shop activity in one place.
                    </p>
                </div>

                {/* Revenue + chart */}
                <section className="grid gap-6 rounded-lg border border-slate-200 bg-white p-6 lg:grid-cols-5">
                    <div className="lg:col-span-2">
                        <p className="text-sm text-slate-500">Paid order revenue</p>
                        <p className="mt-2 text-5xl font-semibold tracking-tight text-slate-900">
                            {number(revenue.total)}
                            <span className="ml-2 text-lg font-medium text-slate-400">{currency}</span>
                        </p>
                        <p className="mt-3 text-sm text-slate-600">
                            {number(revenue.last_30)} {currency} in the last 30 days
                        </p>
                        {isLive('/admin/reports/revenue') && (
                            <Link
                                href="/admin/reports/revenue"
                                className="mt-5 inline-block rounded bg-teal-700 px-4 py-2 text-sm font-medium text-white hover:bg-teal-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 focus-visible:ring-offset-2"
                            >
                                Open revenue report
                            </Link>
                        )}
                    </div>
                    <div className="lg:col-span-3">
                        <p className="mb-3 text-sm text-slate-500">Revenue by month</p>
                        <BarChart data={revenue.by_month} label="Paid order revenue for the last 6 months" />
                    </div>
                </section>

                {/* Needs attention */}
                <Panel title="Needs attention">
                    {attention.length === 0 ? (
                        <Empty>Nothing is waiting on you.</Empty>
                    ) : (
                        <ul className="divide-y divide-slate-100 sm:grid sm:grid-cols-2 sm:divide-y-0">
                            {attention.map((a) => {
                                const inner = (
                                    <>
                                        <span className="text-sm text-slate-700">{a.label}</span>
                                        <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-sm font-semibold text-amber-800">
                                            {number(a.count)}
                                        </span>
                                    </>
                                );
                                return (
                                    <li key={a.label} className="border-slate-100 sm:border-b">
                                        {isLive(a.href) ? (
                                            <Link href={a.href} className="flex items-center justify-between gap-4 px-5 py-3 hover:bg-slate-50">
                                                {inner}
                                            </Link>
                                        ) : (
                                            <div className="flex items-center justify-between gap-4 px-5 py-3">{inner}</div>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </Panel>

                {/* Module totals */}
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                    {sections.map((section) => (
                        <SectionCard key={section.title} section={section} />
                    ))}
                </div>

                {/* Learning insights */}
                <div className="grid gap-6 lg:grid-cols-3">
                    <Panel title="Enrollments by month">
                        <div className="px-5 py-4">
                            <BarChart data={enrollmentsByMonth} label="Enrollments for the last 6 months" />
                        </div>
                    </Panel>

                    <Panel title="Enrollments by status">
                        <Distribution data={enrollmentsByStatus} empty="No enrollments yet." />
                    </Panel>

                    <Panel title="Exam results">
                        {exams.attempts === 0 ? (
                            <Empty>No exam attempts yet.</Empty>
                        ) : (
                            <div className="px-5 py-4">
                                <p className="text-4xl font-semibold tracking-tight text-slate-900">
                                    {exams.pass_rate}%
                                </p>
                                <p className="mt-1 text-sm text-slate-500">pass rate</p>
                                <div className="mt-4 h-2 rounded-full bg-slate-100">
                                    <div
                                        className="h-2 rounded-full bg-teal-700"
                                        style={{ width: `${exams.pass_rate}%` }}
                                    />
                                </div>
                                <p className="mt-3 text-sm text-slate-600">
                                    {number(exams.passed)} of {number(exams.attempts)} attempts passed
                                </p>
                            </div>
                        )}
                    </Panel>
                </div>

                {/* Recent activity */}
                <div className="grid gap-6 lg:grid-cols-2">
                    <Panel title="Recent enrollments" action={<ViewAll href="/admin/enrollments" />}>
                        {enrollments.length === 0 ? (
                            <Empty>No enrollments yet.</Empty>
                        ) : (
                            <ul className="divide-y divide-slate-100">
                                {enrollments.map((e) => (
                                    <Row
                                        key={e.id}
                                        primary={e.user?.name ?? `Learner #${e.user_id ?? e.id}`}
                                        secondary={e.course?.title ?? 'Course'}
                                        right={e.progress_percent != null ? `${number(e.progress_percent)}%` : dateShort(e.created_at)}
                                        rightSecondary={<StatusBadge status={e.status} />}
                                    />
                                ))}
                            </ul>
                        )}
                    </Panel>

                    <Panel title="Recent orders" action={<ViewAll href="/admin/orders" />}>
                        {orders.length === 0 ? (
                            <Empty>No orders yet.</Empty>
                        ) : (
                            <ul className="divide-y divide-slate-100">
                                {orders.map((o) => (
                                    <Row
                                        key={o.id}
                                        primary={`Order #${o.id}`}
                                        secondary={`${o.user?.name ?? (fullName(o) || 'Guest')} · ${dateShort(o.created_at)}`}
                                        right={o.total != null ? `${number(o.total)} ${currency}` : '—'}
                                        rightSecondary={<StatusBadge status={o.payment_status ?? o.status} />}
                                    />
                                ))}
                            </ul>
                        )}
                    </Panel>

                    <Panel title="Recent articles" action={<ViewAll href="/admin/articles" />}>
                        {articles.length === 0 ? (
                            <Empty>No articles yet.</Empty>
                        ) : (
                            <ul className="divide-y divide-slate-100">
                                {articles.map((a) => (
                                    <Row
                                        key={a.id}
                                        primary={a.title}
                                        secondary={`${a.author?.name ?? 'Unknown author'} · ${dateShort(a.published_at ?? a.created_at)}`}
                                        right={<StatusBadge status={a.status} />}
                                    />
                                ))}
                            </ul>
                        )}
                    </Panel>

                    <Panel title="Appointments" action={<ViewAll href="/admin/appointments" />}>
                        {appointments.length === 0 ? (
                            <Empty>No appointments yet.</Empty>
                        ) : (
                            <ul className="divide-y divide-slate-100">
                                {appointments.map((a) => (
                                    <Row
                                        key={a.id}
                                        primary={a.name ?? `Appointment #${a.id}`}
                                        secondary={a.practitioner?.name ?? 'Practitioner not set'}
                                        right={dateShort(a.scheduled_at)}
                                        rightSecondary={<StatusBadge status={a.status} />}
                                    />
                                ))}
                            </ul>
                        )}
                    </Panel>

                    <Panel title="New users" action={<ViewAll href="/admin/users" />}>
                        {users.length === 0 ? (
                            <Empty>No users yet.</Empty>
                        ) : (
                            <ul className="divide-y divide-slate-100">
                                {users.map((u) => (
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

                    <Panel title="Latest messages" action={<ViewAll href="/admin/messages" />}>
                        {messages.length === 0 ? (
                            <Empty>No messages yet.</Empty>
                        ) : (
                            <ul className="divide-y divide-slate-100">
                                {messages.map((m) => (
                                    <Row
                                        key={m.id}
                                        primary={m.name ?? m.email}
                                        secondary={m.message}
                                        right={dateShort(m.created_at)}
                                        rightSecondary={m.is_read === false || m.is_read === 0 ? <StatusBadge status="pending" /> : null}
                                    />
                                ))}
                            </ul>
                        )}
                    </Panel>
                </div>

                {/* Users by role */}
                <Panel title="Users by role">
                    <Distribution data={usersByRole} empty="No role data available." />
                </Panel>
            </div>
        </AdminLayout>
    );
}