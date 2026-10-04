import { useEffect, useState } from 'react';
import { Link, usePage } from '@inertiajs/react';

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */
/*
 * Every item is a normal link. The matching routes are in routes/web.php.
 * `live` is kept so a link can be switched off by setting it to false
 * (it then renders as plain, non-clickable text with no badge).
 */

export const NAV_GROUPS = [
    {
        title: 'Overview',
        items: [{ label: 'Dashboard', href: '/admin/dashboard', exact: true, live: true }],
    },
    {
        title: 'Learning',
        items: [
            { label: 'Courses', href: '/admin/courses', live: true },
            { label: 'Course categories', href: '/admin/course-categories', live: true },
            { label: 'Lessons', href: '/admin/lessons', live: true },
            { label: 'Quizzes', href: '/admin/quizzes', live: true },
            { label: 'Exams', href: '/admin/exams', live: true },
        ],
    },
    {
        title: 'Content',
        items: [
            { label: 'Articles', href: '/admin/articles', live: true },
            { label: 'Announcements', href: '/admin/announcements', live: true },
            { label: 'Testimonials', href: '/admin/testimonials', live: true },
            { label: 'Tenders', href: '/admin/tenders', live: true },
            { label: 'Advertisements', href: '/admin/advertisements', live: true },
        ],
    },
    {
        title: 'People',
        items: [
            { label: 'Users', href: '/admin/users', live: true },
            { label: 'Practitioners', href: '/admin/practitioners', live: true },
            { label: 'Enrollments', href: '/admin/enrollments', live: true },
            { label: 'Certificates', href: '/admin/certificates', live: true },
            { label: 'Verification requests', href: '/admin/verification-requests', live: true },
            { label: 'CPD activities', href: '/admin/cpd-activities', live: true },
            { label: 'Appointments', href: '/admin/appointments', live: true },
        ],
    },
    {
        title: 'Shop',
        items: [
            { label: 'Products', href: '/admin/products', live: true },
            { label: 'Orders', href: '/admin/orders', live: true },
            { label: 'Reviews', href: '/admin/reviews', live: true },
            { label: 'Payments', href: '/admin/payments', live: true },
        ],
    },
    {
        title: 'Inbox',
        items: [
            { label: 'Messages', href: '/admin/messages', live: true },
            { label: 'Contact messages', href: '/admin/contacts', live: true },
            { label: 'Newsletter', href: '/admin/newsletter', live: true },
        ],
    },
    {
        title: 'Insights',
        items: [{ label: 'Reports', href: '/admin/reports', live: true }],
    },
];

const ALL_ITEMS = NAV_GROUPS.flatMap((g) => g.items);

/** True when href points at a route that exists (or lives under one that does). */
export function isLive(href) {
    if (!href) return false;
    const path = href.split('?')[0];
    return ALL_ITEMS.some((item) => item.live && (path === item.href || path.startsWith(item.href + '/')));
}

function isActive(currentUrl, item) {
    const path = currentUrl.split('?')[0];
    return item.exact ? path === item.href : path === item.href || path.startsWith(item.href + '/');
}

/* ------------------------------------------------------------------ */
/* Sidebar                                                             */
/* ------------------------------------------------------------------ */

function SidebarContent({ url, onNavigate }) {
    return (
        <div className="flex h-full flex-col">
            <div className="flex h-16 shrink-0 items-center border-b border-slate-200 px-5">
                <Link href="/admin/dashboard" className="text-lg font-bold tracking-tight text-slate-900">
                    RUNUTRIDIET
                    <span className="ml-2 text-sm font-medium text-slate-400">Admin</span>
                </Link>
            </div>

            <nav aria-label="Admin" className="flex-1 space-y-6 overflow-y-auto px-3 py-5">
                {NAV_GROUPS.map((group) => (
                    <div key={group.title}>
                        <p className="px-2 text-xs font-medium text-slate-400">{group.title}</p>
                        <ul className="mt-2 space-y-0.5">
                            {group.items.map((item) => {
                                const active = isActive(url, item);

                                if (!item.live) {
                                    return (
                                        <li key={item.href}>
                                            <span aria-disabled="true" className="block rounded-md px-3 py-2 text-sm text-slate-400">
                                                {item.label}
                                            </span>
                                        </li>
                                    );
                                }

                                return (
                                    <li key={item.href}>
                                        <Link
                                            href={item.href}
                                            onClick={onNavigate}
                                            aria-current={active ? 'page' : undefined}
                                            className={`block rounded-md px-3 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 ${
                                                active
                                                    ? 'bg-teal-50 font-medium text-teal-800'
                                                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                                            }`}
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                ))}
            </nav>

            <div className="shrink-0 border-t border-slate-200 px-3 py-3">
                <Link
                    href="/"
                    className="block rounded-md px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                >
                    View site
                </Link>
            </div>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/* Layout                                                              */
/* ------------------------------------------------------------------ */

export default function AdminLayout({ children }) {
    const { props, url } = usePage();
    const { auth, flash } = props;
    const [open, setOpen] = useState(false);
    const user = auth?.user;

    // Close the mobile drawer with Escape.
    useEffect(() => {
        if (!open) return;
        const onKey = (e) => e.key === 'Escape' && setOpen(false);
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [open]);

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800">
            {/* Desktop sidebar */}
            <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-slate-200 bg-white lg:block">
                <SidebarContent url={url} />
            </aside>

            {/* Mobile drawer */}
            {open && (
                <div className="fixed inset-0 z-40 lg:hidden" role="dialog" aria-modal="true" aria-label="Admin menu">
                    <div className="absolute inset-0 bg-slate-900/40" onClick={() => setOpen(false)} />
                    <aside className="absolute inset-y-0 left-0 w-72 max-w-[85%] bg-white shadow-xl">
                        <SidebarContent url={url} onNavigate={() => setOpen(false)} />
                    </aside>
                </div>
            )}

            <div className="lg:pl-64">
                <header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-4 border-b border-slate-200 bg-white px-4 sm:px-6">
                    <button
                        type="button"
                        onClick={() => setOpen(true)}
                        className="rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 lg:hidden"
                    >
                        Menu
                    </button>
                    <div className="hidden lg:block" />

                    <div className="flex items-center gap-4">
                        {user && (
                            <div className="text-right leading-tight">
                                <p className="text-sm font-medium text-slate-900">{user.name}</p>
                                <p className="hidden text-xs text-slate-500 sm:block">{user.email}</p>
                            </div>
                        )}
                        <Link
                            href="/logout"
                            method="post"
                            as="button"
                            className="rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-700"
                        >
                            Log out
                        </Link>
                    </div>
                </header>

                {(flash?.success || flash?.error) && (
                    <div className="px-4 pt-4 sm:px-6">
                        <div
                            role="status"
                            className={`rounded-md px-4 py-3 text-sm ${
                                flash.error ? 'bg-rose-50 text-rose-800' : 'bg-emerald-50 text-emerald-800'
                            }`}
                        >
                            {flash.error ?? flash.success}
                        </div>
                    </div>
                )}

                <main>{children}</main>
            </div>
        </div>
    );
}