import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import StatCard from '@/Components/StatCard';
import WireStrip from '@/Components/WireStrip';

/**
 * props: { stats?: {}, articles?: Article[] }
 */
export default function AuthorDashboard({ stats = {}, articles = [] }) {
    function destroy(article) {
        if (!confirm(`Delete "${article.title}"? This can't be undone.`)) return;
        router.delete(route('articles.destroy', article.id));
    }

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <div>
                        <WireStrip code="AUT-00" timestamp="BYLINE" tone="press" className="mb-2" />
                        <h1 className="font-display font-bold text-3xl text-[#14171F]">My articles</h1>
                    </div>
                    <Link
                        href={route('articles.create')}
                        className="font-mono text-xs uppercase tracking-wider bg-[#14171F] text-white px-4 py-2.5 hover:bg-[#25406B]"
                    >
                        Write new
                    </Link>
                </div>
            }
        >
            <Head title="Author Dashboard" />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <StatCard label="Published" value={stats.published ?? '—'} tone="press" />
                <StatCard label="Drafts" value={stats.drafts ?? '—'} tone="gold" />
                <StatCard label="Total views" value={stats.views ?? '—'} tone="wire" />
            </div>

            <div className="bg-white border border-[#D7DBDE] p-5">
                <ul className="divide-y divide-[#D7DBDE]">
                    {articles.map((a) => (
                        <li key={a.id} className="py-3 flex items-center justify-between gap-4">
                            <div className="min-w-0">
                                <p className="font-body text-sm text-[#14171F] truncate">{a.title}</p>
                                <p className="font-mono text-[10px] uppercase tracking-wider text-[#3A4048]/50 mt-0.5">
                                    {a.status ?? 'draft'} — {a.published_at ?? 'not published'}
                                </p>
                            </div>
                            <div className="flex gap-2 shrink-0">
                                <Link
                                    href={route('articles.edit', a.id)}
                                    className="font-mono text-[10px] uppercase tracking-wider border border-[#D7DBDE] px-3 py-1.5 hover:border-[#25406B] hover:text-[#25406B]"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => destroy(a)}
                                    className="font-mono text-[10px] uppercase tracking-wider border border-[#D7DBDE] px-3 py-1.5 text-[#C1401F] hover:border-[#C1401F]"
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
                {articles.length === 0 && (
                    <p className="font-mono text-xs uppercase tracking-wider text-[#3A4048]/50 py-6">
                        You haven't written anything yet.
                    </p>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
