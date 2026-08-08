import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import StatCard from '@/Components/StatCard';
import WireStrip from '@/Components/WireStrip';

/**
 * props: { stats?: {}, submissions?: Article[] }
 */
export default function EditorDashboard({ stats = {}, submissions = [] }) {
    return (
        <AuthenticatedLayout
            header={
                <>
                    <WireStrip code="EDT-00" timestamp="EDITORIAL DESK" tone="gold" className="mb-2" />
                    <h1 className="font-display font-bold text-3xl text-[#14171F]">Editorial queue</h1>
                </>
            }
        >
            <Head title="Editor Dashboard" />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <StatCard label="Awaiting edit" value={stats.awaiting ?? '—'} tone="gold" />
                <StatCard label="Approved this week" value={stats.approved ?? '—'} tone="press" />
                <StatCard label="Sent back" value={stats.returned ?? '—'} tone="wire" />
            </div>

            <div className="bg-white border border-[#D7DBDE] p-5">
                <p className="font-mono text-xs uppercase tracking-wider text-[#3A4048]/60 mb-4">Submissions</p>
                <ul className="divide-y divide-[#D7DBDE]">
                    {submissions.map((a) => (
                        <li key={a.id} className="py-3 flex items-center justify-between">
                            <div>
                                <p className="font-body text-sm text-[#14171F]">{a.title}</p>
                                <p className="font-mono text-[10px] uppercase tracking-wider text-[#3A4048]/50 mt-0.5">
                                    Submitted by {a.author?.name} — {a.category?.name}
                                </p>
                            </div>
                            <Link
                                href={route('articles.edit', a.id)}
                                className="font-mono text-[10px] uppercase tracking-wider bg-[#14171F] text-white px-3 py-1.5 hover:bg-[#B8862E]"
                            >
                                Edit &amp; review
                            </Link>
                        </li>
                    ))}
                </ul>
                {submissions.length === 0 && (
                    <p className="font-mono text-xs uppercase tracking-wider text-[#3A4048]/50 py-6">No submissions pending.</p>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
