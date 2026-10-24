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
import PwaInstallPrompt from '@/Components/PwaInstallPrompt';
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
            aria-label="RUNUTRIDIET home"
            className="group flex min-w-0 items-center gap-3 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
        >
            <span className="grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-xl bg-emerald-50 ring-1 ring-emerald-900/5 transition group-hover:bg-emerald-100 motion-reduce:transition-none">
                <img src="/logoru.jpg" alt="" className="h-full w-full object-contain" />
            </span>
            <span className="min-w-0 leading-tight">
                <span className="block truncate text-sm font-extrabold tracking-[0.08em] text-emerald-950">RUNUTRIDIET</span>
                <span className="mt-1 block truncate text-[10px] font-medium uppercase tracking-[0.16em] text-slate-500">Eat to prevent|Eat to treat</span>
            </span>
        </Link>
    );
}

function CartButton({ count, onClick }) {
    return (
        <Link
            href="/cart"
            onClick={onClick}
            aria-label={`Open cart${count > 0 ? `, ${count} ${count === 1 ? 'item' : 'items'}` : ''}`}
            className="relative flex h-11 w-11 items-center justify-center rounded-full text-slate-600 transition-colors hover:bg-emerald-50 hover:text-emerald-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 motion-reduce:transition-none lg:h-10 lg:w-10"
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
                className="flex h-10 items-center gap-2 rounded-full border border-slate-200 bg-white py-1 pl-1 pr-3 text-sm font-medium text-slate-700 shadow-sm transition hover:border-emerald-200 hover:bg-emerald-50/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 motion-reduce:transition-none"
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
                <div className="absolute right-0 z-50 mt-3 w-64 origin-top-right rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-900/10">
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
                className={`sticky top-0 z-40 border-b bg-white/95 backdrop-blur-xl transition-[box-shadow,border-color] duration-300 motion-reduce:transition-none ${
                    scrolled ? 'border-slate-200 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.35)]' : 'border-slate-200/70'
                }`}
            >
                <div className="mx-auto flex h-[4.75rem] max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:gap-5 lg:px-8">
                    <Brand />

                    {/* Desktop links */}
                    <nav aria-label="Main" className="hidden items-center gap-0.5 lg:flex">
                        {LINKS.map((link) => {
                            const active = isActive(url, link);
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    aria-current={active ? 'page' : undefined}
                                    className={`rounded-full px-3 py-2 text-[13px] font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 motion-reduce:transition-none ${
                                        active
                                            ? 'bg-emerald-50 text-emerald-900'
                                            : 'text-slate-600 hover:bg-slate-50 hover:text-emerald-900'
                                    }`}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Desktop actions */}
                    <div className="hidden items-center gap-1.5 lg:flex">
                        <CartButton count={cartCount} />

                        {user ? (
                            <AccountMenu user={user} />
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="rounded-lg px-2.5 py-2 text-sm font-semibold text-slate-600 transition-colors hover:text-emerald-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 motion-reduce:transition-none"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href="/register"
                                    className="rounded-lg px-2.5 py-2 text-sm font-semibold text-slate-600 transition-colors hover:text-emerald-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 motion-reduce:transition-none"
                                >
                                    Sign up
                                </Link>
                            </>
                        )}

                        <Link
                            href="/book"
                            className="ml-1 inline-flex h-10 items-center gap-2 rounded-full bg-emerald-800 px-4 text-sm font-semibold text-white shadow-md shadow-emerald-950/15 transition hover:-translate-y-0.5 hover:bg-emerald-900 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 motion-reduce:transition-none"
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
                            className="flex h-11 w-11 items-center justify-center rounded-full text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 motion-reduce:transition-none"
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
                        className="absolute inset-y-0 right-0 flex w-[min(88vw,24rem)] flex-col bg-white shadow-2xl shadow-slate-950/20"
                    >
                        <div className="flex h-[4.75rem] shrink-0 items-center justify-between border-b border-slate-100 bg-gradient-to-r from-emerald-50/80 to-white px-5">
                            <Brand onClick={close} />
                            <button
                                ref={closeRef}
                                type="button"
                                onClick={close}
                                className="flex h-11 w-11 items-center justify-center rounded-full text-slate-600 transition-colors hover:bg-white hover:text-emerald-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
                            >
                                <X className="h-6 w-6" aria-hidden="true" />
                                <span className="sr-only">Close menu</span>
                            </button>
                        </div>

                        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-4 py-5">
                            <p className="px-4 pb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">Explore</p>
                            <ul className="space-y-1.5">
                                {LINKS.map((link) => {
                                    const active = isActive(url, link);
                                    return (
                                        <li key={link.href}>
                                            <Link
                                                href={link.href}
                                                onClick={close}
                                                aria-current={active ? 'page' : undefined}
                                                className={`flex min-h-[50px] items-center rounded-xl px-4 text-[15px] font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 ${
                                                    active
                                                        ? 'bg-emerald-50 text-emerald-900 shadow-sm shadow-emerald-950/5'
                                                        : 'text-slate-700 hover:bg-slate-50 hover:text-emerald-900'
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
                        <div className="shrink-0 space-y-3 border-t border-slate-100 bg-slate-50/70 p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
                            <Link
                                href="/book"
                                onClick={close}
                                className="flex min-h-[50px] w-full items-center justify-center gap-2 rounded-full bg-emerald-800 px-6 text-sm font-semibold text-white shadow-md shadow-emerald-950/15 transition hover:bg-emerald-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
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
            <PwaInstallPrompt />
        </>
    );
}