import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ArticleCard from '@/Components/ArticleCard';
import WireStrip from '@/Components/WireStrip';

/**
 * props: { saved?: Article[], recommended?: Article[] }
 */
export default function SubscriberDashboard({ saved = [], recommended = [] }) {
    return (
        <AuthenticatedLayout
            header={
                <>
                    <WireStrip code="SUB-00" timestamp="YOUR READING LIST" tone="press" className="mb-2" />
                    <h1 className="font-display font-bold text-3xl text-[#14171F]">Welcome back</h1>
                </>
            }
        >
            <Head title="Subscriber Dashboard" />

            <section className="mb-10">
                <div className="flex items-center justify-between mb-4">
                    <p className="font-mono text-xs uppercase tracking-wider text-[#3A4048]/60">Saved for later</p>
                    <Link href={route('articles.index')} className="font-mono text-[10px] uppercase tracking-wider text-[#25406B] hover:underline">
                        Browse all
                    </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {saved.map((a) => <ArticleCard key={a.id} article={a} />)}
                </div>
                {saved.length === 0 && (
                    <p className="font-mono text-xs uppercase tracking-wider text-[#3A4048]/50 py-6">
                        Nothing saved yet — bookmark articles to read later.
                    </p>
                )}
            </section>

            <section>
                <p className="font-mono text-xs uppercase tracking-wider text-[#3A4048]/60 mb-4">Recommended for you</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {recommended.map((a) => <ArticleCard key={a.id} article={a} />)}
                </div>
                {recommended.length === 0 && (
                    <p className="font-mono text-xs uppercase tracking-wider text-[#3A4048]/50 py-6">
                        Read a few articles and we'll start recommending stories.
                    </p>
                )}
            </section>
        </AuthenticatedLayout>
    );
}
