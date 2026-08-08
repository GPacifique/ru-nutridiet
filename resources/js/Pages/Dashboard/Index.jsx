import React from 'react';
import { Head, usePage, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import StatCard from '@/Components/StatCard';
import WireStrip from '@/Components/WireStrip';

/**
 * props: { stats?: { articles, comments, views }, recent?: Article[] }
 */
export default function Index({ stats = {}, recent = [] }) {
    const { auth } = usePage().props;

    return (
        <AuthenticatedLayout
            header={
                <>
                    <WireStrip code="DASH" timestamp="OVERVIEW" tone="press" className="mb-2" />
                    <h1 className="font-display font-bold text-3xl text-[#14171F]">
                        Welcome back, {auth.user.name}
                    </h1>
                </>
            }
        >
            <Head title="Dashboard" />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <StatCard label="Articles" value={stats.articles ?? '—'} tone="press" />
                <StatCard label="Comments" value={stats.comments ?? '—'} tone="gold" />
                <StatCard label="Views" value={stats.views ?? '—'} tone="wire" />
            </div>

            <div className="bg-white border border-[#D7DBDE] p-5">
                <p className="font-mono text-xs uppercase tracking-wider text-[#3A4048]/60 mb-4">Recent activity</p>
                {recent.length > 0 ? (
                    <ul className="divide-y divide-[#D7DBDE]">
                        {recent.map((item) => (
                            <li key={item.id} className="py-3 flex items-center justify-between">
                                <Link href={route('articles.show', item.slug)} className="font-body text-sm text-[#14171F] hover:text-[#25406B]">
                                    {item.title}
                                </Link>
                                <span className="font-mono text-[10px] uppercase tracking-wider text-[#3A4048]/50">
                                    {item.published_at}
                                </span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="font-mono text-xs uppercase tracking-wider text-[#3A4048]/50">Nothing to show yet.</p>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
