import React from 'react';
import { Head } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import ArticleCard from '@/Components/ArticleCard';
import WireStrip from '@/Components/WireStrip';

/**
 * props: { category: { name, slug }, articles: { data: Article[] } | Article[] }
 */
export default function Show({ category, articles }) {
    const list = articles?.data ?? articles ?? [];

    return (
        <GuestLayout>
            <Head title={category.name} />

            <section className="max-w-7xl mx-auto px-4 md:px-6 pt-10 pb-6 border-b border-[#D7DBDE]">
                <WireStrip code="CAT" timestamp={category.name.toUpperCase()} tone="gold" className="mb-3" />
                <h1 className="font-display font-bold text-4xl text-[#14171F]">{category.name}</h1>
            </section>

            <section className="max-w-7xl mx-auto px-4 md:px-6 py-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {list.map((article) => (
                        <ArticleCard key={article.id} article={article} />
                    ))}
                </div>
                {list.length === 0 && (
                    <p className="font-mono text-xs uppercase tracking-wider text-[#3A4048]/50 py-10">
                        No stories filed under {category.name} yet.
                    </p>
                )}
            </section>
        </GuestLayout>
    );
}
