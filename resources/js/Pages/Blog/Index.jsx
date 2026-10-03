import React from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    ArrowUpRight,
    BookOpen,
    CalendarDays,
    ChevronRight,
    User,
} from 'lucide-react';

export default function Index({ articles }) {
    const articleList = articles?.data ?? articles ?? [];

    const imageUrl = (thumbnail) => {
        if (!thumbnail) {
            return '/images/blog-placeholder.jpg';
        }

        if (
            thumbnail.startsWith('http://') ||
            thumbnail.startsWith('https://') ||
            thumbnail.startsWith('/')
        ) {
            return thumbnail;
        }

        return `/storage/${thumbnail}`;
    };

    const formatDate = (date) => {
        if (!date) return '';

        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    return (
        <>
            <Head title="Blog | RunuNutridiet" />

            <div className="min-h-screen bg-[#f8faf9] text-slate-900">

                {/* =====================================================
                    HERO
                ====================================================== */}
                <section className="border-b border-slate-200 bg-white">
                    <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">

                        <div className="max-w-3xl">

                            <div className="mb-6 flex items-center gap-3">
                                <span className="h-px w-10 bg-emerald-600" />

                                <span className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">
                                    RunuNutridiet Journal
                                </span>
                            </div>

                            <h1 className="text-4xl font-bold tracking-[-0.03em] text-slate-950 sm:text-5xl lg:text-6xl">
                                Nutrition insights for
                                <span className="block text-emerald-700">
                                    healthier living.
                                </span>
                            </h1>

                            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                                Practical nutrition guidance, healthy eating
                                ideas, and evidence-informed insights designed
                                to help you make better everyday decisions.
                            </p>

                        </div>

                    </div>
                </section>


                {/* =====================================================
                    ARTICLES
                ====================================================== */}
                <main className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8 lg:py-16">

                    {articleList.length === 0 ? (

                        <div className="rounded-2xl border border-slate-200 bg-white px-6 py-20 text-center">
                            <BookOpen className="mx-auto h-10 w-10 text-slate-300" />

                            <h2 className="mt-5 text-xl font-semibold text-slate-900">
                                No articles yet
                            </h2>

                            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                                New nutrition and wellness articles will appear
                                here soon.
                            </p>
                        </div>

                    ) : (

                        <>
                            {/* Section heading */}
                            <div className="mb-8 flex items-end justify-between gap-6">

                                <div>
                                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">
                                        Latest articles
                                    </p>

                                    <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                                        From the journal
                                    </h2>
                                </div>

                            </div>


                            {/* =================================================
                                FEATURED ARTICLE
                            ================================================== */}
                            {articleList[0] && (
                                <Link
                                    href={`/blog/${articleList[0].slug}`}
                                    className="group mb-12 block overflow-hidden rounded-3xl border border-slate-200 bg-white transition duration-300 hover:border-slate-300 hover:shadow-xl"
                                >
                                    <div className="grid lg:grid-cols-2">

                                        {/* Image */}
                                        <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 lg:aspect-auto lg:min-h-[420px]">

                                            <img
                                                src={imageUrl(articleList[0].thumbnail)}
                                                alt={articleList[0].title}
                                                className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.035]"
                                                onError={(e) => {
                                                    e.currentTarget.src =
                                                        '/images/blog-placeholder.jpg';
                                                }}
                                            />

                                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

                                            {articleList[0].category && (
                                                <div className="absolute left-5 top-5">
                                                    <span className="rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-emerald-800 shadow-sm backdrop-blur">
                                                        {articleList[0].category}
                                                    </span>
                                                </div>
                                            )}
                                        </div>


                                        {/* Content */}
                                        <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">

                                            <div className="flex items-center gap-3 text-xs font-medium text-slate-500">

                                                {articleList[0].published_at && (
                                                    <span className="inline-flex items-center gap-1.5">
                                                        <CalendarDays className="h-3.5 w-3.5" />
                                                        {formatDate(articleList[0].published_at)}
                                                    </span>
                                                )}

                                                {articleList[0].author?.name && (
                                                    <>
                                                        <span className="h-1 w-1 rounded-full bg-slate-300" />

                                                        <span className="inline-flex items-center gap-1.5">
                                                            <User className="h-3.5 w-3.5" />
                                                            {articleList[0].author.name}
                                                        </span>
                                                    </>
                                                )}

                                            </div>


                                            <h2 className="mt-5 text-3xl font-bold leading-tight tracking-[-0.025em] text-slate-950 sm:text-4xl">
                                                {articleList[0].title}
                                            </h2>


                                            {articleList[0].excerpt && (
                                                <p className="mt-5 line-clamp-4 text-base leading-7 text-slate-600">
                                                    {articleList[0].excerpt}
                                                </p>
                                            )}


                                            <div className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-emerald-700">
                                                Read article

                                                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-emerald-200 transition group-hover:bg-emerald-700 group-hover:text-white">
                                                    <ArrowUpRight className="h-4 w-4" />
                                                </span>
                                            </div>

                                        </div>

                                    </div>
                                </Link>
                            )}


                            {/* =================================================
                                ARTICLE GRID
                            ================================================== */}
                            <div className="grid gap-x-7 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">

                                {articleList.slice(1).map((article) => (

                                    <article
                                        key={article.id}
                                        className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg"
                                    >

                                        {/* Image */}
                                        <Link
                                            href={`/blog/${article.slug}`}
                                            className="block"
                                        >
                                            <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">

                                                <img
                                                    src={imageUrl(article.thumbnail)}
                                                    alt={article.title}
                                                    loading="lazy"
                                                    className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
                                                    onError={(e) => {
                                                        e.currentTarget.src =
                                                            '/images/blog-placeholder.jpg';
                                                    }}
                                                />

                                                {article.category && (
                                                    <div className="absolute left-4 top-4">
                                                        <span className="rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold text-emerald-800 shadow-sm backdrop-blur">
                                                            {article.category}
                                                        </span>
                                                    </div>
                                                )}

                                            </div>
                                        </Link>


                                        {/* Content */}
                                        <div className="p-6">

                                            <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-wide text-slate-400">

                                                {article.published_at && (
                                                    <>
                                                        <CalendarDays className="h-3.5 w-3.5" />
                                                        {formatDate(article.published_at)}
                                                    </>
                                                )}

                                            </div>


                                            <h3 className="mt-3 text-xl font-bold leading-snug tracking-tight text-slate-950">
                                                <Link
                                                    href={`/blog/${article.slug}`}
                                                    className="transition hover:text-emerald-700"
                                                >
                                                    {article.title}
                                                </Link>
                                            </h3>


                                            {article.excerpt && (
                                                <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
                                                    {article.excerpt}
                                                </p>
                                            )}


                                            <div className="mt-6 border-t border-slate-100 pt-5">

                                                <Link
                                                    href={`/blog/${article.slug}`}
                                                    className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700"
                                                >
                                                    Read more

                                                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                                </Link>

                                            </div>

                                        </div>

                                    </article>

                                ))}

                            </div>


                            {/* Pagination */}
                            {articles?.links && articles.links.length > 3 && (
                                <div className="mt-14 flex justify-center gap-2">
                                    {articles.links.map((link, index) => (
                                        <span key={index}>
                                            {link.url ? (
                                                <Link
                                                    href={link.url}
                                                    className={`inline-flex h-10 min-w-10 items-center justify-center rounded-lg border px-3 text-sm font-medium ${
                                                        link.active
                                                            ? 'border-emerald-700 bg-emerald-700 text-white'
                                                            : 'border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:text-emerald-700'
                                                    }`}
                                                    dangerouslySetInnerHTML={{
                                                        __html: link.label,
                                                    }}
                                                />
                                            ) : (
                                                <span
                                                    className="inline-flex h-10 min-w-10 items-center justify-center rounded-lg border border-slate-100 px-3 text-sm text-slate-300"
                                                    dangerouslySetInnerHTML={{
                                                        __html: link.label,
                                                    }}
                                                />
                                            )}
                                        </span>
                                    ))}
                                </div>
                            )}

                        </>

                    )}

                </main>
            </div>
        </>
    );
}

