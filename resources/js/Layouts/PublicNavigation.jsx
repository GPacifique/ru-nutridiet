import React, { useEffect, useRef, useState } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import {
    CalendarCheck,
    ChevronDown,
    LayoutDashboard,
    Leaf,
    LogOut,
    Menu,
    Package,
    Settings,
    ShieldCheck,
    ShoppingBag,
    X,
} from 'lucide-react';
import ApplicationLogo from '@/Components/ApplicationLogo';
/*
 * Public site navigation.
 *
 *  - Desktop (lg+): inline links, cart, account menu and a "Book now" button.
 *  - Mobile / tablet: hamburger that opens a slide-in drawer.
 *
 * Reads from Inertia shared props (all optional):
 *   auth.user      -> { name, email, role }
 *   cartCount      -> number shown on the cart badge
 *
 * Usage as a layout (this is how Blog/Index.jsx uses it):
 *   <PublicNavigation> ...page content... </PublicNavigation>
 * It also works on its own: <PublicNavigation />
 */

const LINKS = [
    { label: 'Home', href: '/', exact: true },
    { label: 'Services', href: '/services' },
    { label: 'Courses', href: '/courses' },
    { label: 'Shop', href: '/shop', also: ['/products', '/marketplace', '/cart', '/checkout'] },
    { label: 'Blog', href: '/blog', also: ['/articles'] },
];

const initials = (name = '') =>
    name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0].toUpperCase())
        .join('') || '?';

function isActive(currentUrl, link) {
    const path = currentUrl.split('?')[0];
    if (link.exact) return path === link.href;

    return [link.href, ...(link.also ?? [])].some((base) => path === base || path.startsWith(base + '/'));
}

/* ------------------------------------------------------------------ */
/* Pieces                                                              */
/* ------------------------------------------------------------------ */

function Brand({ onClick }) {
    return (
        <Link
            href="/"
            onClick={onClick}
            className="group flex items-center gap-2.5 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
        >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-700 text-white shadow-sm transition group-hover:bg-emerald-800 motion-reduce:transition-none">
                <ApplicationLogo />
            </span>
        </Link>
    );
}

function CartButton({ count, onClick }) {
    return (
        <Link
            href="/cart"
            onClick={onClick}
            className="relative flex h-11 w-11 items-center justify-center rounded-full text-slate-700 transition hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 motion-reduce:transition-none lg:h-10 lg:w-10"
        >
            <ShoppingBag className="h-5 w-5" aria-hidden="true" />
            <span className="sr-only">Cart{count > 0 ? `, ${count} ${count === 1 ? 'item' : 'items'}` : ''}</span>
            {count > 0 && (
                <span
                    aria-hidden="true"
                    className="absolute right-0.5 top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-emerald-700 px-1 text-[10px] font-bold text-white ring-2 ring-white"
                >
                    {count > 99 ? '99+' : count}
                </span>
            )}
        </Link>
    );
}

function AccountMenu({ user }) {
    const [open, setOpen] = useState(false);
    const wrapper = useRef(null);

    // Close on outside click and on Escape.
    useEffect(() => {
        if (!open) return;

        const onClick = (e) => !wrapper.current?.contains(e.target) && setOpen(false);
        const onKey = (e) => e.key === 'Escape' && setOpen(false);

        document.addEventListener('mousedown', onClick);
        document.addEventListener('keydown', onKey);
        return () => {
            document.removeEventListener('mousedown', onClick);
            document.removeEventListener('keydown', onKey);
        };
    }, [open]);

    const itemClass =
        'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-50 focus:outline-none focus-visible:bg-slate-50 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-600';

    return (
        <div ref={wrapper} className="relative">
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-haspopup="true"
                className="flex h-10 items-center gap-2 rounded-full border border-slate-200 bg-white py-1 pl-1 pr-3 text-sm font-medium text-slate-700 transition hover:border-slate-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 motion-reduce:transition-none"
            >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-800">
                    {initials(user.name)}
                </span>
                <span className="hidden max-w-[7rem] truncate xl:inline">{user.name?.split(' ')[0]}</span>
                <ChevronDown
                    className={`h-4 w-4 text-slate-400 transition-transform motion-reduce:transition-none ${open ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                />
                <span className="sr-only">Account menu</span>
            </button>

            {open && (
                <div className="absolute right-0 z-50 mt-2 w-64 origin-top-right rounded-xl border border-slate-200 bg-white p-2 shadow-xl">
                    <div className="border-b border-slate-100 px-3 pb-3 pt-2">
                        <p className="truncate text-sm font-semibold text-slate-900">{user.name}</p>
                        <p className="truncate text-xs text-slate-500">{user.email}</p>
                    </div>

                    <div className="py-2">
                        <Link href="/dashboard" className={itemClass} onClick={() => setOpen(false)}>
                            <LayoutDashboard className="h-4 w-4 text-slate-400" aria-hidden="true" />
                            Dashboard
                        </Link>
                        {user.role === 'admin' && (
                            <Link href="/admin/dashboard" className={itemClass} onClick={() => setOpen(false)}>
                                <ShieldCheck className="h-4 w-4 text-slate-400" aria-hidden="true" />
                                Admin panel
                            </Link>
                        )}
                        <Link href="/orders" className={itemClass} onClick={() => setOpen(false)}>
                            <Package className="h-4 w-4 text-slate-400" aria-hidden="true" />
                            My orders
                        </Link>
                        <Link href="/profile" className={itemClass} onClick={() => setOpen(false)}>
                            <Settings className="h-4 w-4 text-slate-400" aria-hidden="true" />
                            Profile settings
                        </Link>
                    </div>

                    <div className="border-t border-slate-100 pt-2">
                        <Link href="/logout" method="post" as="button" className={`${itemClass} text-rose-700`}>
                            <LogOut className="h-4 w-4" aria-hidden="true" />
                            Log out
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

export default function PublicNavigation({ children }) {
    const { props, url } = usePage();
    const user = props.auth?.user;
    const cartCount = Number(props.cartCount ?? 0);

    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const toggleRef = useRef(null);
    const closeRef = useRef(null);

    // Add a shadow once the page scrolls.
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Close the drawer after navigating.
    useEffect(() => {
        const remove = router.on('navigate', () => setMobileOpen(false));
        return remove;
    }, []);

    // Drawer: lock page scroll, close on Escape, manage focus.
    useEffect(() => {
        if (!mobileOpen) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        closeRef.current?.focus();

        const onKey = (e) => e.key === 'Escape' && setMobileOpen(false);
        window.addEventListener('keydown', onKey);

        // Closing the drawer on a desktop-sized resize avoids a stuck overlay.
        const media = window.matchMedia('(min-width: 1024px)');
        const onChange = (e) => e.matches && setMobileOpen(false);
        media.addEventListener('change', onChange);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener('keydown', onKey);
            media.removeEventListener('change', onChange);
            toggleRef.current?.focus();
        };
    }, [mobileOpen]);

    const close = () => setMobileOpen(false);

    return (
        <>
            {/* Lets keyboard users jump past the menu */}
            <a
                href="#site-content"
                className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-emerald-700 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
            >
                Skip to content
            </a>

            <header
                className={`sticky top-0 z-40 border-b bg-white/90 backdrop-blur-md transition-shadow motion-reduce:transition-none ${
                    scrolled ? 'border-slate-200 shadow-sm' : 'border-transparent'
                }`}
            >
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
                    <Brand />

                    {/* Desktop links */}
                    <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
                        {LINKS.map((link) => {
                            const active = isActive(url, link);
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    aria-current={active ? 'page' : undefined}
                                    className={`relative rounded-lg px-3.5 py-2 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 motion-reduce:transition-none ${
                                        active ? 'text-emerald-800' : 'text-slate-600 hover:text-slate-950'
                                    }`}
                                >
                                    {link.label}
                                    {active && (
                                        <span
                                            aria-hidden="true"
                                            className="absolute inset-x-3.5 -bottom-[17px] h-0.5 rounded-full bg-emerald-700"
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Desktop actions */}
                    <div className="hidden items-center gap-2 lg:flex">
                        <CartButton count={cartCount} />

                        {user ? (
                            <AccountMenu user={user} />
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="rounded-lg px-3.5 py-2 text-sm font-medium text-slate-600 transition hover:text-slate-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 motion-reduce:transition-none"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href="/register"
                                    className="rounded-lg px-3.5 py-2 text-sm font-medium text-slate-600 transition hover:text-slate-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 motion-reduce:transition-none"
                                >
                                    Sign up
                                </Link>
                            </>
                        )}

                        <Link
                            href="/book"
                            className="ml-1 inline-flex h-10 items-center gap-2 rounded-full bg-emerald-700 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 motion-reduce:transition-none"
                        >
                            <CalendarCheck className="h-4 w-4" aria-hidden="true" />
                            Book now
                        </Link>
                    </div>

                    {/* Mobile actions */}
                    <div className="flex items-center gap-1 lg:hidden">
                        <CartButton count={cartCount} />
                        <button
                            ref={toggleRef}
                            type="button"
                            onClick={() => setMobileOpen(true)}
                            aria-expanded={mobileOpen}
                            aria-controls="mobile-menu"
                            className="flex h-11 w-11 items-center justify-center rounded-full text-slate-700 transition hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 motion-reduce:transition-none"
                        >
                            <Menu className="h-6 w-6" aria-hidden="true" />
                            <span className="sr-only">Open menu</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile drawer */}
            {mobileOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-[2px]" onClick={close} aria-hidden="true" />

                    <div
                        id="mobile-menu"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Menu"
                        className="absolute inset-y-0 right-0 flex w-[min(88vw,22rem)] flex-col bg-white shadow-2xl"
                    >
                        <div className="flex h-16 shrink-0 items-center justify-between border-b border-slate-100 px-4">
                            <Brand onClick={close} />
                            <button
                                ref={closeRef}
                                type="button"
                                onClick={close}
                                className="flex h-11 w-11 items-center justify-center rounded-full text-slate-700 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
                            >
                                <X className="h-6 w-6" aria-hidden="true" />
                                <span className="sr-only">Close menu</span>
                            </button>
                        </div>

                        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-3 py-4">
                            <ul className="space-y-1">
                                {LINKS.map((link) => {
                                    const active = isActive(url, link);
                                    return (
                                        <li key={link.href}>
                                            <Link
                                                href={link.href}
                                                onClick={close}
                                                aria-current={active ? 'page' : undefined}
                                                className={`flex min-h-[48px] items-center rounded-xl px-4 text-base font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 ${
                                                    active
                                                        ? 'bg-emerald-50 text-emerald-800'
                                                        : 'text-slate-700 hover:bg-slate-50'
                                                }`}
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>

                            {user && (
                                <div className="mt-6 border-t border-slate-100 pt-4">
                                    <div className="mb-2 flex items-center gap-3 px-4">
                                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-800">
                                            {initials(user.name)}
                                        </span>
                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-semibold text-slate-900">{user.name}</p>
                                            <p className="truncate text-xs text-slate-500">{user.email}</p>
                                        </div>
                                    </div>

                                    <ul className="space-y-1">
                                        {[
                                            { label: 'Dashboard', href: '/dashboard', Icon: LayoutDashboard },
                                            ...(user.role === 'admin'
                                                ? [{ label: 'Admin panel', href: '/admin/dashboard', Icon: ShieldCheck }]
                                                : []),
                                            { label: 'My orders', href: '/orders', Icon: Package },
                                            { label: 'Profile settings', href: '/profile', Icon: Settings },
                                        ].map(({ label, href, Icon }) => (
                                            <li key={href}>
                                                <Link
                                                    href={href}
                                                    onClick={close}
                                                    className="flex min-h-[44px] items-center gap-3 rounded-xl px-4 text-sm text-slate-700 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
                                                >
                                                    <Icon className="h-4 w-4 text-slate-400" aria-hidden="true" />
                                                    {label}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </nav>

                        {/* Pinned actions */}
                        <div className="shrink-0 space-y-3 border-t border-slate-100 p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
                            <Link
                                href="/book"
                                onClick={close}
                                className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-emerald-700 px-6 text-sm font-semibold text-white shadow-sm hover:bg-emerald-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
                            >
                                <CalendarCheck className="h-4 w-4" aria-hidden="true" />
                                Book a consultation
                            </Link>

                            {user ? (
                                <Link
                                    href="/logout"
                                    method="post"
                                    as="button"
                                    className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full border border-slate-200 px-6 text-sm font-semibold text-slate-700 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
                                >
                                    <LogOut className="h-4 w-4" aria-hidden="true" />
                                    Log out
                                </Link>
                            ) : (
                                <div className="grid grid-cols-2 gap-3">
                                    <Link
                                        href="/login"
                                        onClick={close}
                                        className="flex min-h-[48px] items-center justify-center rounded-full border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href="/register"
                                        onClick={close}
                                        className="flex min-h-[48px] items-center justify-center rounded-full border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
                                    >
                                        Sign up
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Page content passed in as children */}
            <div id="site-content" tabIndex={-1} className="focus:outline-none">
                {children}
            </div>
        </>
    );
}