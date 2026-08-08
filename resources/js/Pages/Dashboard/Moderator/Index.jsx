import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import StatCard from '@/Components/StatCard';
import WireStrip from '@/Components/WireStrip';

/**
 * props: { stats?: {}, comments?: Comment[] }
 */
export default function ModeratorDashboard({ stats = {}, comments = [] }) {
    function remove(comment) {
        if (!confirm('Remove this comment?')) return;
        router.delete(route('comments.destroy', comment.id), { preserveScroll: true });
    }

    return (
        <AuthenticatedLayout
            header={
                <>
                    <WireStrip code="MOD-00" timestamp="MODERATION QUEUE" tone="wire" className="mb-2" />
                    <h1 className="font-display font-bold text-3xl text-[#14171F]">Comment moderation</h1>
                </>
            }
        >
            <Head title="Moderator Dashboard" />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <StatCard label="Flagged" value={stats.flagged ?? '—'} tone="wire" />
                <StatCard label="Reviewed today" value={stats.reviewed ?? '—'} tone="press" />
                <StatCard label="Total comments" value={stats.total ?? '—'} tone="ink" />
            </div>

            <div className="bg-white border border-[#D7DBDE] p-5">
                <p className="font-mono text-xs uppercase tracking-wider text-[#3A4048]/60 mb-4">Recent comments</p>
                <ul className="divide-y divide-[#D7DBDE]">
                    {comments.map((c) => (
                        <li key={c.id} className="py-3">
                            <div className="flex items-start justify-between gap-4">
                                <div className="min-w-0">
                                    <p className="font-mono text-[10px] uppercase tracking-wider text-[#3A4048]/50">
                                        {c.user?.name} on{' '}
                                        <Link href={route('articles.show', c.article?.slug)} className="text-[#25406B] hover:underline">
                                            {c.article?.title}
                                        </Link>
                                    </p>
                                    <p className="font-body text-sm text-[#14171F] mt-1">{c.body}</p>
                                </div>
                                <button
                                    onClick={() => remove(c)}
                                    className="shrink-0 font-mono text-[10px] uppercase tracking-wider border border-[#D7DBDE] px-3 py-1.5 text-[#C1401F] hover:border-[#C1401F]"
                                >
                                    Remove
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
                {comments.length === 0 && (
                    <p className="font-mono text-xs uppercase tracking-wider text-[#3A4048]/50 py-6">Queue is clear.</p>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
