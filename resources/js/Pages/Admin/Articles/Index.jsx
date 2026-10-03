import { useEffect, useRef, useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

const dateShort = (value) =>
    value
        ? new Date(value).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })
        : '—';

const STATUS_STYLES = {
    published: 'bg-emerald-100 text-emerald-800',
    draft: 'bg-amber-100 text-amber-800',
};

function StatusBadge({ status }) {
    const style = STATUS_STYLES[String(status).toLowerCase()] ?? 'bg-slate-100 text-slate-700';
    return (
        <span className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${style}`}>
            {status ?? '—'}
        </span>
    );
}

// Laravel's paginator labels contain HTML entities ("&laquo; Previous").
const pageLabel = (label) =>
    label.replace('&laquo;', '«').replace('&raquo;', '»').replace(/<[^>]+>/g, '').trim();

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function Index({
    articles = { data: [], links: [], total: 0, from: 0, to: 0 },
    filters = {},
    categories = [],
    counts = { all: 0, published: 0, draft: 0 },
}) {
    const [search, setSearch] = useState(filters.search ?? '');
    const firstRender = useRef(true);

    const status = filters.status ?? '';
    const category = filters.category ?? '';

    // Re-query while typing (debounced). Skipped on first render.
    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }

        const timer = setTimeout(() => {
            router.get(
                '/admin/articles',
                { search: search || undefined, status: status || undefined, category: category || undefined },
                { preserveState: true, preserveScroll: true, replace: true },
            );
        }, 300);

        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    const applyFilter = (next) => {
        router.get(
            '/admin/articles',
            {
                search: search || undefined,
                status: next.status ?? (status || undefined),
                category: next.category ?? (category || undefined),
            },
            { preserveState: true, preserveScroll: true, replace: true },
        );
    };

    const destroy = (article) => {
        if (window.confirm(`Delete "${article.title}"? This cannot be undone.`)) {
            router.delete(`/admin/articles/${article.slug}`, { preserveScroll: true });
        }
    };

    const tabs = [
        { label: 'All', value: '', count: counts.all },
        { label: 'Published', value: 'published', count: counts.published },
        { label: 'Drafts', value: 'draft', count: counts.draft },
    ];

    const hasFilters = search || status || category;

    return (
        <AdminLayout>
            <Head title="Articles" />

            <div className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6">
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Articles</h1>
                        <p className="mt-1 text-sm text-slate-500">Write, publish and manage blog articles.</p>
                    </div>
                    <Link
                        href="/admin/articles/create"
                        className="rounded bg-teal-700 px-4 py-2 text-sm font-medium text-white hover:bg-teal-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 focus-visible:ring-offset-2"
                    >
                        New article
                    </Link>
                </div>

                <section className="rounded-lg border border-slate-200 bg-white">
                    {/* Status tabs */}
                    <div className="flex gap-1 overflow-x-auto border-b border-slate-100 px-3 pt-3" role="tablist" aria-label="Filter by status">
                        {tabs.map((tab) => {
                            const active = status === tab.value;
                            return (
                                <button
                                    key={tab.label}
                                    type="button"
                                    role="tab"
                                    aria-selected={active}
                                    onClick={() => applyFilter({ status: tab.value || undefined })}
                                    className={`-mb-px whitespace-nowrap border-b-2 px-3 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 ${
                                        active
                                            ? 'border-teal-700 font-medium text-teal-800'
                                            : 'border-transparent text-slate-500 hover:text-slate-800'
                                    }`}
                                >
                                    {tab.label}
                                    <span className="ml-2 rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
                                        {tab.count}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Search + category */}
                    <div className="flex flex-wrap items-center gap-3 border-b border-slate-100 px-5 py-4">
                        <label className="sr-only" htmlFor="article-search">Search articles</label>
                        <input
                            id="article-search"
                            type="search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by title or excerpt"
                            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm placeholder:text-slate-400 focus:border-teal-700 focus:outline-none focus:ring-1 focus:ring-teal-700 sm:w-72"
                        />

                        {categories.length > 0 && (
                            <>
                                <label className="sr-only" htmlFor="article-category">Category</label>
                                <select
                                    id="article-category"
                                    value={category}
                                    onChange={(e) => applyFilter({ category: e.target.value || undefined })}
                                    className="rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-teal-700 focus:outline-none focus:ring-1 focus:ring-teal-700"
                                >
                                    <option value="">All categories</option>
                                    {categories.map((c) => (
                                        <option key={c} value={c}>
                                            {c}
                                        </option>
                                    ))}
                                </select>
                            </>
                        )}

                        {hasFilters && (
                            <button
                                type="button"
                                onClick={() => {
                                    setSearch('');
                                    router.get('/admin/articles', {}, { preserveState: false, replace: true });
                                }}
                                className="text-sm font-medium text-teal-700 hover:underline"
                            >
                                Clear filters
                            </button>
                        )}
                    </div>

                    {/* Table */}
                    {articles.data.length === 0 ? (
                        <div className="px-5 py-12 text-center">
                            <p className="text-sm text-slate-500">
                                {hasFilters ? 'No articles match these filters.' : 'No articles yet.'}
                            </p>
                            {!hasFilters && (
                                <Link
                                    href="/admin/articles/create"
                                    className="mt-3 inline-block text-sm font-medium text-teal-700 hover:underline"
                                >
                                    Write your first article
                                </Link>
                            )}
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-left text-sm">
                                <thead className="border-b border-slate-100 text-xs text-slate-500">
                                    <tr>
                                        <th scope="col" className="px-5 py-3 font-medium">Article</th>
                                        <th scope="col" className="px-5 py-3 font-medium">Category</th>
                                        <th scope="col" className="px-5 py-3 font-medium">Status</th>
                                        <th scope="col" className="px-5 py-3 font-medium">Author</th>
                                        <th scope="col" className="px-5 py-3 font-medium">Published</th>
                                        <th scope="col" className="px-5 py-3 text-right font-medium">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {articles.data.map((article) => (
                                        <tr key={article.id} className="hover:bg-slate-50">
                                            <td className="px-5 py-3">
                                                <div className="flex items-center gap-3">
                                                    {article.thumbnail_url ? (
                                                        <img
                                                            src={article.thumbnail_url}
                                                            alt=""
                                                            className="h-10 w-14 shrink-0 rounded object-cover"
                                                        />
                                                    ) : (
                                                        <div className="h-10 w-14 shrink-0 rounded bg-slate-100" aria-hidden="true" />
                                                    )}
                                                    <Link
                                                        href={`/admin/articles/${article.slug}`}
                                                        className="max-w-xs truncate font-medium text-slate-900 hover:text-teal-700"
                                                    >
                                                        {article.title}
                                                    </Link>
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap px-5 py-3 text-slate-600">
                                                {article.category ?? '—'}
                                            </td>
                                            <td className="px-5 py-3">
                                                <StatusBadge status={article.status} />
                                            </td>
                                            <td className="whitespace-nowrap px-5 py-3 text-slate-600">
                                                {article.author ?? '—'}
                                            </td>
                                            <td className="whitespace-nowrap px-5 py-3 text-slate-600">
                                                {dateShort(article.published_at)}
                                            </td>
                                            <td className="whitespace-nowrap px-5 py-3 text-right">
                                                <Link
                                                    href={`/admin/articles/${article.slug}`}
                                                    className="mr-3 text-slate-600 hover:text-slate-900"
                                                >
                                                    View
                                                </Link>
                                                <Link
                                                    href={`/admin/articles/${article.slug}/edit`}
                                                    className="mr-3 font-medium text-teal-700 hover:underline"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    type="button"
                                                    onClick={() => destroy(article)}
                                                    className="text-rose-700 hover:underline"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Pagination */}
                    {articles.total > 0 && (
                        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 px-5 py-3">
                            <p className="text-sm text-slate-500">
                                Showing {articles.from}–{articles.to} of {articles.total}
                            </p>

                            {articles.links?.length > 3 && (
                                <nav aria-label="Pagination" className="flex flex-wrap gap-1">
                                    {articles.links.map((link, i) =>
                                        link.url ? (
                                            <Link
                                                key={i}
                                                href={link.url}
                                                preserveScroll
                                                aria-current={link.active ? 'page' : undefined}
                                                className={`rounded px-3 py-1.5 text-sm ${
                                                    link.active
                                                        ? 'bg-teal-700 font-medium text-white'
                                                        : 'text-slate-600 hover:bg-slate-100'
                                                }`}
                                            >
                                                {pageLabel(link.label)}
                                            </Link>
                                        ) : (
                                            <span key={i} className="rounded px-3 py-1.5 text-sm text-slate-300">
                                                {pageLabel(link.label)}
                                            </span>
                                        ),
                                    )}
                                </nav>
                            )}
                        </div>
                    )}
                </section>
            </div>
        </AdminLayout>
    );
}