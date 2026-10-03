import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicNavigation from '@/Layouts/PublicNavigation';
import { ARTICLE_CONTENT_CLASSES } from '@/Components/articleContent';
import { ArrowLeft, ArrowRight, BookOpen, CalendarDays, Clock } from 'lucide-react';

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

const imageUrl = (thumbnail) => {
    if (!thumbnail) return null;
    if (/^(https?:)?\/\//.test(thumbnail) || thumbnail.startsWith('/')) return thumbnail;
    return `/storage/${thumbnail}`;
};

const formatDate = (date) =>
    date
        ? new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
        : '';

const readingMinutes = (html = '') => {
    const words = html.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.ceil(words / 200));
};

const initials = (name = '') =>
    name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0].toUpperCase())
        .join('');

// Thumbnail with a branded fallback if it is missing or returns 404.
function Cover({ thumbnail, alt, className = '', ...props }) {
    const [failed, setFailed] = useState(false);
    const src = imageUrl(thumbnail);

    if (!src || failed) {
        return (
            <div
                role="img"
                aria-label={alt}
                className={`flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-emerald-100 ${className}`}
            >
                <BookOpen className="h-10 w-10 text-emerald-300" aria-hidden="true" />
            </div>
        );
    }

    return <img src={src} alt={alt} decoding="async" onError={() => setFailed(true)} className={className} {...props} />;
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function Show({ article, post, related = [], relatedArticles = [] }) {
    const item = article ?? post ?? {};
    const more = (related.length ? related : relatedArticles).filter((a) => a.id !== item.id).slice(0, 3);
    const hasCover = Boolean(imageUrl(item.thumbnail));

    return (
        <>
            <Head title={`${item.title ?? 'Article'} | RunuNutridiet`}>
                {item.excerpt && <meta name="description" content={item.excerpt} />}
                <meta property="og:title" content={item.title} />
                {item.excerpt && <meta property="og:description" content={item.excerpt} />}
                {hasCover && <meta property="og:image" content={imageUrl(item.thumbnail)} />}
            </Head>

            <PublicNavigation>
                <div className="min-h-screen overflow-x-hidden bg-[#f8faf9] text-slate-900">
                    {/* ============================ HEADER ============================ */}
                    <header className="border-b border-slate-200 bg-white">
                        <div className="mx-auto max-w-3xl px-4 pb-10 pt-8 sm:px-6 sm:pb-14 sm:pt-12">
                            <Link
                                href="/blog"
                                className="inline-flex min-h-[44px] items-center gap-2 rounded-lg text-sm font-semibold text-emerald-700 hover:text-emerald-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 sm:min-h-0"
                            >
                                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                                All articles
                            </Link>

                            {item.category && (
                                <p className="mt-6 text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">
                                    {item.category}
                                </p>
                            )}

                            <h1 className="mt-3 text-balance text-3xl font-bold leading-[1.15] tracking-tight text-slate-950 [overflow-wrap:anywhere] sm:text-4xl lg:text-5xl">
                                {item.title}
                            </h1>

                            {item.excerpt && (
                                <p className="mt-5 text-lg leading-8 text-slate-600 sm:text-xl">{item.excerpt}</p>
                            )}

                            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-slate-500">
                                {item.author?.name && (
                                    <span className="inline-flex items-center gap-2.5">
                                        <span
                                            aria-hidden="true"
                                            className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-800"
                                        >
                                            {initials(item.author.name)}
                                        </span>
                                        <span className="font-medium text-slate-800">{item.author.name}</span>
                                    </span>
                                )}

                                {item.published_at && (
                                    <span className="inline-flex items-center gap-1.5">
                                        <CalendarDays className="h-4 w-4" aria-hidden="true" />
                                        <time dateTime={item.published_at}>{formatDate(item.published_at)}</time>
                                    </span>
                                )}

                                <span className="inline-flex items-center gap-1.5">
                                    <Clock className="h-4 w-4" aria-hidden="true" />
                                    {readingMinutes(item.content)} min read
                                </span>
                            </div>
                        </div>
                    </header>

                    {/* ============================ ARTICLE =========================== */}
                    <main id="main-content" className="px-4 pb-16 sm:px-6 sm:pb-20">
                        {hasCover && (
                            <div className="mx-auto -mt-0 max-w-5xl pt-8 sm:pt-12">
                                <Cover
                                    thumbnail={item.thumbnail}
                                    alt={item.title ?? ''}
                                    fetchpriority="high"
                                    className="aspect-[16/9] w-full rounded-2xl object-cover shadow-sm ring-1 ring-black/5 sm:rounded-3xl"
                                />
                            </div>
                        )}

                        <article className="mx-auto max-w-3xl pt-10 sm:pt-14">
                            <div
                                className={`${ARTICLE_CONTENT_CLASSES} sm:text-[1.0625rem] sm:leading-8`}
                                dangerouslySetInnerHTML={{ __html: item.content ?? '' }}
                            />

                            <div className="mt-12 flex flex-col gap-4 border-t border-slate-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
                                <Link
                                    href="/blog"
                                    className="inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
                                >
                                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                                    Back to all articles
                                </Link>
                            </div>
                        </article>
                    </main>

                    {/* ========================== RELATED ============================ */}
                    {more.length > 0 && (
                        <section className="border-t border-slate-200 bg-white px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
                            <div className="mx-auto max-w-7xl">
                                <h2 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                                    Keep reading
                                </h2>

                                <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    {more.map((a) => (
                                        <article
                                            key={a.id}
                                            className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition focus-within:ring-2 focus-within:ring-emerald-600 focus-within:ring-offset-2 hover:border-slate-300 hover:shadow-lg motion-reduce:transition-none"
                                        >
                                            <Cover
                                                thumbnail={a.thumbnail}
                                                alt={a.title}
                                                loading="lazy"
                                                className="aspect-[16/10] w-full object-cover"
                                            />
                                            <div className="flex flex-1 flex-col p-5">
                                                {a.category && (
                                                    <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                                                        {a.category}
                                                    </p>
                                                )}
                                                <h3 className="mt-2 text-lg font-bold leading-snug text-slate-950 [overflow-wrap:anywhere]">
                                                    <Link
                                                        href={`/blog/${a.slug}`}
                                                        className="after:absolute after:inset-0 focus:outline-none group-hover:text-emerald-700"
                                                    >
                                                        {a.title}
                                                    </Link>
                                                </h3>
                                                {a.excerpt && (
                                                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">
                                                        {a.excerpt}
                                                    </p>
                                                )}
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}

                    {/* ============================ CTA ============================ */}
                    <section className="px-4 pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-14 sm:px-6 sm:pb-16 lg:px-8 lg:pb-24">
                        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-2xl bg-emerald-800 px-5 py-10 text-center sm:rounded-3xl sm:px-10 sm:py-14">
                            <div
                                aria-hidden="true"
                                className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-emerald-600/40 blur-3xl"
                            />
                            <div className="relative">
                                <h2 className="text-balance text-2xl font-bold tracking-tight text-white sm:text-3xl">
                                    Turn this advice into a plan that fits you
                                </h2>
                                <p className="mx-auto mt-3 max-w-xl text-[15px] leading-7 text-emerald-100 sm:text-base">
                                    Book a consultation and get nutrition guidance built around your goals and routine.
                                </p>
                                <Link
                                    href="/book"
                                    className="mt-7 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-white px-7 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-800 motion-reduce:transition-none sm:w-auto"
                                >
                                    Book a consultation
                                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                                </Link>
                            </div>
                        </div>
                    </section>
                </div>
            </PublicNavigation>
        </>
    );
}