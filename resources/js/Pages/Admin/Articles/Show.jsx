import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { ARTICLE_CONTENT_CLASSES } from '@/Components/articleContent';

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

const dateTime = (value) =>
    value
        ? new Date(value).toLocaleString(undefined, {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
          })
        : '—';

const STATUS_STYLES = {
    published: 'bg-emerald-100 text-emerald-800',
    draft: 'bg-amber-100 text-amber-800',
};

function StatusBadge({ status }) {
    const style = STATUS_STYLES[String(status).toLowerCase()] ?? 'bg-slate-100 text-slate-700';
    return (
        <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${style}`}>
            {status ?? '—'}
        </span>
    );
}

function Detail({ label, children }) {
    return (
        <div className="flex items-start justify-between gap-4 py-2.5">
            <dt className="text-sm text-slate-500">{label}</dt>
            <dd className="text-right text-sm text-slate-900">{children}</dd>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function Show({ article, versions = [] }) {
    const isPublished = article.status === 'published';

    const destroy = () => {
        if (window.confirm(`Delete "${article.title}"? This cannot be undone.`)) {
            router.delete(`/admin/articles/${article.slug}`);
        }
    };

    return (
        <AdminLayout>
            <Head title={article.title} />

            <div className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6">
                {/* Header */}
                <div>
                    <Link href="/admin/articles" className="text-sm text-slate-500 hover:text-slate-800">
                        Back to articles
                    </Link>

                    <div className="mt-2 flex flex-wrap items-start justify-between gap-4">
                        <div className="min-w-0">
                            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">{article.title}</h1>
                            <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                                <StatusBadge status={article.status} />
                                {article.category && <span>{article.category}</span>}
                                {article.author && <span>By {article.author}</span>}
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            {isPublished && (
                                <a
                                    href={`/blog/${article.slug}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"
                                >
                                    View on site
                                </a>
                            )}
                            <Link
                                href={`/admin/articles/${article.slug}/edit`}
                                className="rounded-md bg-teal-700 px-4 py-2 text-sm font-medium text-white hover:bg-teal-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 focus-visible:ring-offset-2"
                            >
                                Edit
                            </Link>
                            <button
                                type="button"
                                onClick={destroy}
                                className="rounded-md border border-rose-200 px-3 py-2 text-sm text-rose-700 hover:bg-rose-50"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Article body */}
                    <article className="rounded-lg border border-slate-200 bg-white p-6 sm:p-8 lg:col-span-2">
                        {article.thumbnail_url && (
                            <img
                                src={article.thumbnail_url}
                                alt=""
                                className="mb-6 aspect-video w-full rounded-lg object-cover"
                            />
                        )}

                        {article.excerpt && (
                            <p className="mb-6 border-b border-slate-100 pb-6 text-lg leading-8 text-slate-600">
                                {article.excerpt}
                            </p>
                        )}

                        <div
                            className={ARTICLE_CONTENT_CLASSES}
                            dangerouslySetInnerHTML={{ __html: article.content }}
                        />
                    </article>

                    {/* Sidebar */}
                    <aside className="space-y-6">
                        <section className="rounded-lg border border-slate-200 bg-white">
                            <h2 className="border-b border-slate-100 px-5 py-3 text-base font-semibold text-slate-900">
                                Details
                            </h2>
                            <dl className="divide-y divide-slate-100 px-5">
                                <Detail label="Status">
                                    <StatusBadge status={article.status} />
                                </Detail>
                                <Detail label="Category">{article.category ?? '—'}</Detail>
                                <Detail label="Author">{article.author ?? '—'}</Detail>
                                <Detail label="Published">{dateTime(article.published_at)}</Detail>
                                <Detail label="Created">{dateTime(article.created_at)}</Detail>
                                <Detail label="Last updated">{dateTime(article.updated_at)}</Detail>
                                <Detail label="URL">
                                    <span className="break-all font-mono text-xs">/blog/{article.slug}</span>
                                </Detail>
                            </dl>
                        </section>

                        <section className="rounded-lg border border-slate-200 bg-white">
                            <h2 className="border-b border-slate-100 px-5 py-3 text-base font-semibold text-slate-900">
                                Edit history
                            </h2>
                            {versions.length === 0 ? (
                                <p className="px-5 py-6 text-sm text-slate-400">No earlier versions yet.</p>
                            ) : (
                                <ul className="divide-y divide-slate-100">
                                    {versions.map((v) => (
                                        <li key={v.id} className="px-5 py-3">
                                            <p className="truncate text-sm font-medium text-slate-900">{v.title}</p>
                                            <p className="text-xs text-slate-500">
                                                {v.editor ?? 'Unknown'} · {dateTime(v.created_at)}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </section>
                    </aside>
                </div>
            </div>
        </AdminLayout>
    );
}