import React from 'react';
import { Head, Link } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import ArticleCard from '@/Components/ArticleCard';
import WireStrip from '@/Components/WireStrip';

/**
 * props: { articles: { data: Article[], links: [], meta: {} } }
 */
export default function Index({ articles }) {
    const list = articles?.data ?? articles ?? [];
    const links = articles?.links ?? [];

    return (
        <GuestLayout>
            <Head title="Articles" />

            <section className="max-w-7xl mx-auto px-4 md:px-6 pt-10 pb-6 border-b border-[#D7DBDE]">
                <WireStrip code="ARC-00" timestamp="FULL WIRE" tone="press" className="mb-3" />
                <h1 className="font-display font-bold text-4xl text-[#14171F]">All articles</h1>
            </section>

            <section className="max-w-7xl mx-auto px-4 md:px-6 py-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {list.map((article) => (
                        <ArticleCard key={article.id} article={article} />
                    ))}
                </div>
                {list.length === 0 && (
                    <p className="font-mono text-xs uppercase tracking-wider text-[#3A4048]/50 py-10">
                        No articles have been filed yet.
                    </p>
                )}

                {links.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-10 font-mono text-xs">
                        {links.map((link, i) => (
                            <Link
                                key={i}
                                href={link.url || '#'}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                                className={`px-3 py-1.5 border ${link.active ? 'bg-[#14171F] text-white border-[#14171F]' : 'border-[#D7DBDE] text-[#3A4048]'} ${!link.url ? 'opacity-30 pointer-events-none' : 'hover:border-[#25406B]'}`}
                            />
                        ))}
                    </div>
                )}
            </section>
        </GuestLayout>
    );
}
