import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import StatCard from '@/Components/StatCard';
import WireStrip from '@/Components/WireStrip';

/**
 * props: { stats?: {}, pendingArticles?: Article[], categories?: [] }
 */
export default function AdminDashboard({ stats = {}, pendingArticles = [], categories = [] }) {
    return (
        <AuthenticatedLayout
            header={
                <>
                    <WireStrip code="ADM-00" timestamp="ADMIN" tone="press" className="mb-2" />
                    <h1 className="font-display font-bold text-3xl text-[#14171F]">Site administration</h1>
                </>
            }
        >
            <Head title="Admin Dashboard" />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <StatCard label="Pending review" value={stats.pending ?? '—'} tone="wire" />
                <StatCard label="Published" value={stats.published ?? '—'} tone="press" />
                <StatCard label="Categories" value={stats.categories ?? categories.length} tone="gold" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white border border-[#D7DBDE] p-5">
                    <div className="flex items-center justify-between mb-4">
                        <p className="font-mono text-xs uppercase tracking-wider text-[#3A4048]/60">Awaiting review</p>
                        <Link href={route('articles.index')} className="font-mono text-[10px] uppercase tracking-wider text-[#25406B] hover:underline">
                            View all
                        </Link>
                    </div>
                    <ul className="divide-y divide-[#D7DBDE]">
                        {pendingArticles.map((a) => (
                            <li key={a.id} className="py-3 flex items-center justify-between">
                                <div>
                                    <Link href={route('articles.edit', a.id)} className="font-body text-sm text-[#14171F] hover:text-[#25406B]">
                                        {a.title}
                                    </Link>
                                    <p className="font-mono text-[10px] uppercase tracking-wider text-[#3A4048]/50 mt-0.5">
                                        By {a.author?.name}
                                    </p>
                                </div>
                                <Link
                                    href={route('articles.edit', a.id)}
                                    className="font-mono text-[10px] uppercase tracking-wider bg-[#14171F] text-white px-3 py-1.5 hover:bg-[#25406B]"
                                >
                                    Review
                                </Link>
                            </li>
                        ))}
                    </ul>
                    {pendingArticles.length === 0 && (
                        <p className="font-mono text-xs uppercase tracking-wider text-[#3A4048]/50 py-6">Queue is clear.</p>
                    )}
                </div>

                <div className="bg-white border border-[#D7DBDE] p-5">
                    <p className="font-mono text-xs uppercase tracking-wider text-[#3A4048]/60 mb-4">Categories</p>
                    <ul className="space-y-2">
                        {categories.map((c) => (
                            <li key={c.id} className="font-body text-sm text-[#14171F] flex items-center justify-between">
                                <span>{c.name}</span>
                                <span className="font-mono text-[10px] text-[#3A4048]/50">{c.articles_count ?? ''}</span>
                            </li>
                        ))}
                        {categories.length === 0 && (
                            <p className="font-mono text-xs uppercase tracking-wider text-[#3A4048]/50">No categories yet.</p>
                        )}
                    </ul>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
