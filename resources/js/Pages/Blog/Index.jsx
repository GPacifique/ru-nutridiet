import React, { useMemo, useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicNavigation from '@/Layouts/PublicNavigation';
import {
    ArrowRight,
    ArrowUpRight,
    BookOpen,
    CalendarDays,
    ChevronLeft,
    ChevronRight,
    Search,
    X,
} from 'lucide-react';

/*
 * Breakpoints used (Tailwind defaults):
 *   base  phones            < 640px   single column, full-width controls
 *   sm    large phones      >= 640px  2-column grid, inline buttons
 *   md    tablets           >= 768px  filter bar goes side by side
 *   lg    laptops           >= 1024px 3-column grid, split featured card
 *   xl    large screens     >= 1280px more breathing room
 */

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

const imageUrl = (thumbnail) => {
    if (!thumbnail) return null;

    if (/^(https?:)?\/\//.test(thumbnail) || thumbnail.startsWith('/')) {
        return thumbnail;
    }

    return `/storage/${thumbnail}`;
};

const formatDate = (date) =>
    date
        ? new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
        : '';

const initials = (name = '') =>
    name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0].toUpperCase())
        .join('');

// Long words or URLs in titles must never push the layout sideways on phones.
const wrapText = '[overflow-wrap:anywhere]';

/* ------------------------------------------------------------------ */
/* Small components                                                    */
/* ------------------------------------------------------------------ */

// Shows the thumbnail, or a branded placeholder if it is missing or fails to load.
function ArticleImage({ thumbnail, alt, className = '', ...props }) {
    const [failed, setFailed] = useState(false);
    const src = imageUrl(thumbnail);

    if (!src || failed) {
        return (
            <div
                role="img"
                aria-label={alt}
                className={`flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-emerald-100 ${className}`}
            >
                <BookOpen className="h-8 w-8 text-emerald-300 sm:h-10 sm:w-10" aria-hidden="true" />
            </div>
        );
    }

    return (
        <img
            src={src}
            alt={alt}
            decoding="async"
            onError={() => setFailed(true)}
            className={className}
            {...props}
        />
    );
}

function CategoryBadge({ children }) {
    return (
        <span className="max-w-[12rem] truncate rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-emerald-800 shadow-sm ring-1 ring-black/5 backdrop-blur sm:px-3">
            {children}
        </span>
    );
}

function Author({ name }) {
    if (!name) return null;

    return (
        <span className="inline-flex min-w-0 items-center gap-2">
            <span
                aria-hidden="true"
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[10px] font-bold text-emerald-800"
            >
                {initials(name)}
            </span>
            <span className="truncate font-medium text-slate-700">{name}</span>
        </span>
    );
}

function DateLabel({ date }) {
    if (!date) return null;

    return (
        <span className="inline-flex shrink-0 items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
            <time dateTime={date}>{formatDate(date)}</time>
        </span>
    );
}

function FeaturedArticle({ article }) {
    return (
        <article className="group relative mb-10 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 focus-within:ring-2 focus-within:ring-emerald-600 focus-within:ring-offset-2 hover:border-slate-300 hover:shadow-xl motion-reduce:transition-none sm:mb-12 sm:rounded-3xl lg:mb-14">
            <div className="grid lg:grid-cols-5">
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 sm:aspect-[16/9] lg:col-span-3 lg:aspect-auto lg:min-h-[440px]">
                    <ArticleImage
                        thumbnail={article.thumbnail}
                        alt={article.title}
                        className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transform-none motion-reduce:transition-none"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/25 via-transparent to-transparent" />

                    <div className="absolute left-3 top-3 flex max-w-[calc(100%-1.5rem)] flex-wrap items-center gap-2 sm:left-5 sm:top-5">
                        <span className="rounded-full bg-emerald-700 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-white shadow-sm sm:px-3">
                            Featured
                        </span>
                        {article.category && <CategoryBadge>{article.category}</CategoryBadge>}
                    </div>
                </div>

                <div className="flex flex-col justify-center p-5 sm:p-8 lg:col-span-2 lg:p-10 xl:p-12">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500">
                        <DateLabel date={article.published_at} />
                        <Author name={article.author?.name} />
                    </div>

                    <h2
                        className={`mt-4 text-balance text-2xl font-bold leading-tight tracking-tight text-slate-950 sm:mt-5 sm:text-3xl lg:text-[2rem] ${wrapText}`}
                    >
                        <Link
                            href={`/blog/${article.slug}`}
                            className="after:absolute after:inset-0 focus:outline-none"
                        >
                            {article.title}
                        </Link>
                    </h2>

                    {article.excerpt && (
                        <p className="mt-4 line-clamp-3 text-[15px] leading-7 text-slate-600 sm:mt-5 sm:line-clamp-4 sm:text-base">
                            {article.excerpt}
                        </p>
                    )}

                    <div className="mt-6 inline-flex items-center gap-3 text-sm font-semibold text-emerald-700 sm:mt-8">
                        Read article
                        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-emerald-200 transition group-hover:border-emerald-700 group-hover:bg-emerald-700 group-hover:text-white motion-reduce:transition-none sm:h-9 sm:w-9">
                            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                        </span>
                    </div>
                </div>
            </div>
        </article>
    );
}

function PostCard({ article }) {
    return (
        <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 focus-within:ring-2 focus-within:ring-emerald-600 focus-within:ring-offset-2 hover:border-slate-300 hover:shadow-lg motion-reduce:transform-none motion-reduce:transition-none lg:hover:-translate-y-1">
            <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <ArticleImage
                    thumbnail={article.thumbnail}
                    alt={article.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transform-none motion-reduce:transition-none"
                />
                {article.category && (
                    <div className="absolute left-3 top-3 sm:left-4 sm:top-4">
                        <CategoryBadge>{article.category}</CategoryBadge>
                    </div>
                )}
            </div>

            <div className="flex flex-1 flex-col p-5 sm:p-6">
                <h3
                    className={`text-balance text-lg font-bold leading-snug tracking-tight text-slate-950 sm:text-xl ${wrapText}`}
                >
                    <Link
                        href={`/blog/${article.slug}`}
                        className="transition after:absolute after:inset-0 focus:outline-none group-hover:text-emerald-700 motion-reduce:transition-none"
                    >
                        {article.title}
                    </Link>
                </h3>

                {article.excerpt && (
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{article.excerpt}</p>
                )}

                <div className="mt-auto flex flex-wrap items-center justify-between gap-x-3 gap-y-2 border-t border-slate-100 pt-4 text-xs text-slate-500 sm:pt-5">
                    {article.author?.name ? <Author name={article.author.name} /> : <span />}
                    <DateLabel date={article.published_at} />
                </div>
            </div>
        </article>
    );
}

const pageBtn =
    'inline-flex h-11 min-w-11 items-center justify-center rounded-lg border px-3 text-sm font-medium transition motion-reduce:transition-none sm:h-10 sm:min-w-10';

function Pagination({ links, currentPage, lastPage }) {
    if (!links || links.length <= 3) return null;

    const prev = links[0];
    const next = links[links.length - 1];
    const numbers = links.slice(1, -1);

    const arrow = (link, Icon, label) =>
        link.url ? (
            <Link
                href={link.url}
                preserveScroll={false}
                className={`${pageBtn} border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:text-emerald-700`}
            >
                <Icon className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only">{label}</span>
            </Link>
        ) : (
            <span className={`${pageBtn} border-slate-100 bg-slate-50 text-slate-300`} aria-hidden="true">
                <Icon className="h-4 w-4" />
            </span>
        );

    return (
        <nav aria-label="Pagination" className="mt-12 sm:mt-16">
            {/* Phones: previous / "Page X of Y" / next. Avoids a row of tiny numbers. */}
            <div className="flex items-center justify-between gap-3 sm:hidden">
                {arrow(prev, ChevronLeft, 'Previous page')}
                <p className="text-sm font-medium text-slate-600">
                    Page {currentPage ?? numbers.find((n) => n.active)?.label} of {lastPage ?? numbers.length}
                </p>
                {arrow(next, ChevronRight, 'Next page')}
            </div>

            {/* Tablets and up: full page list. */}
            <div className="hidden flex-wrap justify-center gap-2 sm:flex">
                {arrow(prev, ChevronLeft, 'Previous page')}

                {numbers.map((link, index) =>
                    link.url ? (
                        <Link
                            key={index}
                            href={link.url}
                            preserveScroll={false}
                            aria-current={link.active ? 'page' : undefined}
                            className={`${pageBtn} ${
                                link.active
                                    ? 'border-emerald-700 bg-emerald-700 text-white shadow-sm'
                                    : 'border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:text-emerald-700'
                            }`}
                        >
                            {link.label.replace(/<[^>]+>/g, '')}
                        </Link>
                    ) : (
                        <span key={index} className={`${pageBtn} border-transparent text-slate-400`} aria-hidden="true">
                            {link.label.replace(/<[^>]+>/g, '')}
                        </span>
                    ),
                )}

                {arrow(next, ChevronRight, 'Next page')}
            </div>
        </nav>
    );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function Index({ articles }) {
    const articleList = Array.isArray(articles) ? articles : articles?.data ?? [];

    const [query, setQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');

    const categories = useMemo(
        () => ['All', ...Array.from(new Set(articleList.map((a) => a.category).filter(Boolean)))],
        [articleList],
    );

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();

        return articleList.filter(
            (a) =>
                (activeCategory === 'All' || a.category === activeCategory) &&
                (!q || a.title?.toLowerCase().includes(q) || a.excerpt?.toLowerCase().includes(q)),
        );
    }, [articleList, query, activeCategory]);

    const isFiltering = query.trim() !== '' || activeCategory !== 'All';
    const onFirstPage = !articles?.current_page || articles.current_page === 1;

    // The featured layout only makes sense on page 1 with no filters applied.
    const featured = !isFiltering && onFirstPage ? filtered[0] : null;
    const rest = featured ? filtered.slice(1) : filtered;

    const clearFilters = () => {
        setQuery('');
        setActiveCategory('All');
    };

    return (
        <>
            <Head title="Blog | RunuNutridiet">
                <meta
                    name="description"
                    content="Practical nutrition guidance, healthy eating ideas and evidence-informed insights from RunuNutridiet."
                />
            </Head>

            <PublicNavigation>
                <div className="min-h-screen overflow-x-hidden bg-[#f8faf9] text-slate-900">
                    {/* ============================ HERO ============================ */}
                    <section className="relative overflow-hidden border-b border-slate-200 bg-white">
                        <div
                            aria-hidden="true"
                            className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-emerald-100/70 blur-3xl sm:-right-24 sm:-top-24 sm:h-80 sm:w-80"
                        />
                        <div
                            aria-hidden="true"
                            className="pointer-events-none absolute -bottom-24 left-1/4 h-48 w-48 rounded-full bg-emerald-50 blur-3xl sm:-bottom-32 sm:h-72 sm:w-72"
                        />

                        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
                            <div className="max-w-3xl">
                                <div className="mb-5 flex items-center gap-3 sm:mb-6">
                                    <span className="h-px w-8 bg-emerald-600 sm:w-10" aria-hidden="true" />
                                    <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-700 sm:text-xs">
                                        RunuNutridiet Journal
                                    </span>
                                </div>

                                <h1 className="text-balance text-[2rem] font-bold leading-[1.1] tracking-[-0.03em] text-slate-950 min-[400px]:text-4xl sm:text-5xl lg:text-6xl">
                                    Nutrition insights for
                                    <span className="block text-emerald-700">healthier living.</span>
                                </h1>

                                <p className="mt-5 max-w-2xl text-[15px] leading-7 text-slate-600 sm:mt-6 sm:text-lg sm:leading-8">
                                    Practical nutrition guidance, healthy eating ideas, and evidence-informed insights
                                    designed to help you make better everyday decisions.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ======================= FILTER BAR ========================== */}
                    {articleList.length > 0 && (
                        <div className="border-b border-slate-200 bg-white/80 backdrop-blur">
                            <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6 sm:py-4 md:flex-row md:items-center md:justify-between md:gap-6 lg:px-8">
                                {/* Search sits first on phones so it is easy to reach, last on tablets and up. */}
                                <div className="relative order-first w-full md:order-last md:w-72 lg:w-80">
                                    <label htmlFor="blog-search" className="sr-only">
                                        Search articles
                                    </label>
                                    <Search
                                        className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                                        aria-hidden="true"
                                    />
                                    {/* text-base on phones stops iOS from zooming into the field on focus */}
                                    <input
                                        id="blog-search"
                                        type="search"
                                        inputMode="search"
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        placeholder="Search articles"
                                        className="h-11 w-full rounded-full border border-slate-200 bg-white pl-10 pr-10 text-base text-slate-900 placeholder:text-slate-400 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 sm:h-10 sm:text-sm"
                                    />
                                    {query && (
                                        <button
                                            type="button"
                                            onClick={() => setQuery('')}
                                            aria-label="Clear search"
                                            className="absolute right-1.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-slate-400 hover:text-slate-700"
                                        >
                                            <X className="h-4 w-4" aria-hidden="true" />
                                        </button>
                                    )}
                                </div>

                                {/* Chips scroll sideways on narrow screens instead of wrapping into a tall block. */}
                                <div
                                    className="-mx-4 flex snap-x gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:-mx-6 sm:px-6 md:mx-0 md:min-w-0 md:flex-1 md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden"
                                    role="group"
                                    aria-label="Filter by category"
                                >
                                    {categories.map((category) => {
                                        const active = activeCategory === category;
                                        return (
                                            <button
                                                key={category}
                                                type="button"
                                                onClick={() => setActiveCategory(category)}
                                                aria-pressed={active}
                                                className={`min-h-[40px] shrink-0 snap-start whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 motion-reduce:transition-none ${
                                                    active
                                                        ? 'bg-emerald-700 text-white shadow-sm'
                                                        : 'bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-emerald-800'
                                                }`}
                                            >
                                                {category}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ========================= ARTICLES ========================== */}
                    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
                        {articleList.length === 0 ? (
                            <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center sm:py-20">
                                <BookOpen className="mx-auto h-10 w-10 text-slate-300" aria-hidden="true" />
                                <h2 className="mt-5 text-xl font-semibold text-slate-900">No articles yet</h2>
                                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                                    New nutrition and wellness articles will appear here soon.
                                </p>
                            </div>
                        ) : filtered.length === 0 ? (
                            <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center sm:py-20">
                                <Search className="mx-auto h-10 w-10 text-slate-300" aria-hidden="true" />
                                <h2 className="mt-5 text-xl font-semibold text-slate-900">No matching articles</h2>
                                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                                    Try a different search term or category.
                                </p>
                                <button
                                    type="button"
                                    onClick={clearFilters}
                                    className="mt-6 inline-flex min-h-[44px] items-center rounded-full bg-emerald-700 px-6 text-sm font-semibold text-white hover:bg-emerald-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
                                >
                                    Clear filters
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="mb-6 flex flex-wrap items-end justify-between gap-x-6 gap-y-2 sm:mb-8">
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">
                                            {isFiltering ? 'Results' : 'Latest articles'}
                                        </p>
                                        <h2 className="mt-2 text-xl font-bold tracking-tight text-slate-950 sm:text-2xl lg:text-3xl">
                                            {isFiltering
                                                ? `${filtered.length} ${filtered.length === 1 ? 'article' : 'articles'}`
                                                : 'From the journal'}
                                        </h2>
                                    </div>

                                    {isFiltering && (
                                        <button
                                            type="button"
                                            onClick={clearFilters}
                                            className="min-h-[44px] text-sm font-semibold text-emerald-700 hover:underline sm:min-h-0"
                                        >
                                            Clear filters
                                        </button>
                                    )}
                                </div>

                                {featured && <FeaturedArticle article={featured} />}

                                {rest.length > 0 && (
                                    <div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-7">
                                        {rest.map((article) => (
                                            <PostCard key={article.id} article={article} />
                                        ))}
                                    </div>
                                )}

                                <Pagination
                                    links={articles?.links}
                                    currentPage={articles?.current_page}
                                    lastPage={articles?.last_page}
                                />
                            </>
                        )}
                    </main>

                    {/* ============================ CTA ============================ */}
                    <section className="px-4 pb-[max(2.5rem,env(safe-area-inset-bottom))] sm:px-6 sm:pb-16 lg:px-8 lg:pb-24">
                        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-2xl bg-emerald-800 px-5 py-10 sm:rounded-3xl sm:px-10 sm:py-12 lg:px-16 lg:py-16">
                            <div
                                aria-hidden="true"
                                className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-emerald-600/40 blur-3xl sm:-right-20 sm:-top-20 sm:h-64 sm:w-64"
                            />

                            <div className="relative flex flex-col gap-7 sm:gap-8 lg:flex-row lg:items-center lg:justify-between">
                                <div className="max-w-2xl">
                                    <h2 className="text-balance text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
                                        Want advice built around you?
                                    </h2>
                                    <p className="mt-3 text-[15px] leading-7 text-emerald-100 sm:mt-4 sm:text-base">
                                        Reading helps, but a personalised plan helps more. Book a consultation and get
                                        guidance that fits your goals, schedule and lifestyle.
                                    </p>
                                </div>

                                <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row lg:shrink-0">
                                    <Link
                                        href="/book"
                                        className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-800 motion-reduce:transition-none"
                                    >
                                        Book a consultation
                                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                                    </Link>
                                    <Link
                                        href="/services"
                                        className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-emerald-400/50 px-6 text-sm font-semibold text-white transition hover:bg-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-800 motion-reduce:transition-none"
                                    >
                                        Our services
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </PublicNavigation>
        </>
    );
}