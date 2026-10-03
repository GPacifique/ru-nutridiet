import React from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    ArrowLeft,
    ArrowUpRight,
    CalendarDays,
    ChevronRight,
    User,
} from 'lucide-react';

export default function Show({ article, relatedArticles = [] }) {

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
            month: 'long',
            day: 'numeric',
        });
    };


    return (
        <>
            <Head title={`${article.title} | RunuNutridiet`} />

            <div className="min-h-screen bg-white text-slate-900">

                {/* =====================================================
                    TOP NAVIGATION
                ====================================================== */}
                <div className="border-b border-slate-100">
                    <div className="mx-auto max-w-7xl px-5 py-5 sm:px-6 lg:px-8">

                        <Link
                            href="/blog"
                            className="group inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-emerald-700"
                        >
                            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 transition group-hover:border-emerald-200 group-hover:bg-emerald-50">
                                <ArrowLeft className="h-4 w-4" />
                            </span>

                            Back to Journal
                        </Link>

                    </div>
                </div>


                {/* =====================================================
                    ARTICLE HEADER
                ====================================================== */}
                <header>

                    <div className="mx-auto max-w-5xl px-5 pb-10 pt-12 text-center sm:px-6 sm:pt-16 lg:px-8 lg:pt-20">

                        {/* Category */}
                        {article.category && (
                            <div className="mb-6">
                                <span className="inline-flex rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-emerald-700">
                                    {article.category}
                                </span>
                            </div>
                        )}


                        {/* Title */}
                        <h1 className="mx-auto max-w-4xl text-4xl font-bold leading-[1.08] tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-6xl">
                            {article.title}
                        </h1>


                        {/* Excerpt */}
                        {article.excerpt && (
                            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl">
                                {article.excerpt}
                            </p>
                        )}


                        {/* Metadata */}
                        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-slate-500">

                            {article.author?.name && (
                                <div className="inline-flex items-center gap-2">
                                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                                        <User className="h-4 w-4" />
                                    </span>

                                    <span className="font-medium text-slate-700">
                                        {article.author.name}
                                    </span>
                                </div>
                            )}

                            {article.published_at && (
                                <>
                                    <span className="h-1 w-1 rounded-full bg-slate-300" />

                                    <span className="inline-flex items-center gap-2">
                                        <CalendarDays className="h-4 w-4" />
                                        {formatDate(article.published_at)}
                                    </span>
                                </>
                            )}

                        </div>

                    </div>


                    {/* =================================================
                        HERO IMAGE
                    ================================================== */}
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                        <figure className="overflow-hidden rounded-2xl bg-slate-100 sm:rounded-3xl">

                            <div className="relative aspect-[16/8] min-h-[260px] max-h-[620px] w-full">

                                <img
                                    src={imageUrl(article.thumbnail)}
                                    alt={article.title}
                                    className="absolute inset-0 h-full w-full object-cover"
                                    onError={(e) => {
                                        e.currentTarget.src =
                                            '/images/blog-placeholder.jpg';
                                    }}
                                />

                            </div>

                        </figure>

                    </div>

                </header>


                {/* =====================================================
                    ARTICLE BODY
                ====================================================== */}
                <main className="mx-auto max-w-3xl px-5 py-12 sm:px-6 lg:py-16">

                    <article
                        className="
                            prose
                            prose-lg
                            max-w-none

                            prose-headings:font-bold
                            prose-headings:tracking-tight
                            prose-headings:text-slate-950

                            prose-h2:mt-12
                            prose-h2:text-3xl

                            prose-h3:mt-10
                            prose-h3:text-2xl

                            prose-p:text-[17px]
                            prose-p:leading-[1.9]
                            prose-p:text-slate-700

                            prose-a:font-semibold
                            prose-a:text-emerald-700
                            prose-a:no-underline
                            hover:prose-a:underline

                            prose-strong:font-bold
                            prose-strong:text-slate-900

                            prose-ul:my-6
                            prose-ol:my-6
                            prose-li:text-slate-700
                            prose-li:leading-8

                            prose-blockquote:border-l-4
                            prose-blockquote:border-emerald-500
                            prose-blockquote:bg-emerald-50
                            prose-blockquote:px-6
                            prose-blockquote:py-4
                            prose-blockquote:rounded-r-xl
                            prose-blockquote:not-italic
                            prose-blockquote:text-slate-700

                            prose-img:my-10
                            prose-img:w-full
                            prose-img:rounded-2xl
                            prose-img:object-cover

                            prose-figure:my-10
                            prose-figcaption:text-center
                            prose-figcaption:text-sm
                            prose-figcaption:text-slate-500
                        "
                        dangerouslySetInnerHTML={{
                            __html: article.content,
                        }}
                    />


                    {/* =================================================
                        ARTICLE FOOTER
                    ================================================== */}
                    <div className="mt-14 border-t border-slate-200 pt-8">

                        <Link
                            href="/blog"
                            className="group inline-flex items-center gap-3 text-sm font-bold text-emerald-700"
                        >
                            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-emerald-200 transition group-hover:bg-emerald-700 group-hover:text-white">
                                <ArrowLeft className="h-4 w-4" />
                            </span>

                            Explore more articles
                        </Link>

                    </div>

                </main>


                {/* =====================================================
                    RELATED ARTICLES
                ====================================================== */}
                {relatedArticles.length > 0 && (
                    <section className="border-t border-slate-200 bg-slate-50">

                        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8 lg:py-20">

                            <div className="mb-8">
                                <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">
                                    Continue reading
                                </p>

                                <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
                                    More from the journal
                                </h2>
                            </div>


                            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">

                                {relatedArticles.map((related) => (

                                    <Link
                                        key={related.id}
                                        href={`/blog/${related.slug}`}
                                        className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-lg"
                                    >

                                        <div className="aspect-[16/10] overflow-hidden bg-slate-100">

                                            <img
                                                src={imageUrl(related.thumbnail)}
                                                alt={related.title}
                                                loading="lazy"
                                                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                                            />

                                        </div>


                                        <div className="p-6">

                                            {related.category && (
                                                <span className="text-xs font-bold uppercase tracking-wide text-emerald-700">
                                                    {related.category}
                                                </span>
                                            )}

                                            <h3 className="mt-2 text-xl font-bold leading-snug text-slate-950">
                                                {related.title}
                                            </h3>

                                            <div className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-emerald-700">
                                                Read article
                                                <ArrowUpRight className="h-4 w-4" />
                                            </div>

                                        </div>

                                    </Link>

                                ))}

                            </div>

                        </div>

                    </section>
                )}

            </div>
        </>
    );
}
