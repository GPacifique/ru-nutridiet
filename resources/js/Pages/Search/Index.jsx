import React, { useState } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import ArticleCard from '@/Components/ArticleCard';
import WireStrip from '@/Components/WireStrip';

/**
 * props: { results: Article[], query: string }
 */
export default function Index({ results = [], query = '' }) {
    const [term, setTerm] = useState(query);

    function submit(e) {
        e.preventDefault();
        router.get(route('search'), { q: term }, { preserveState: true });
    }

    return (
        <GuestLayout>
            <Head title="Search" />

            <section className="max-w-7xl mx-auto px-4 md:px-6 pt-10 pb-6 border-b border-[#D7DBDE]">
                <WireStrip code="QRY" timestamp="SEARCH THE WIRE" tone="press" className="mb-3" />
                <h1 className="font-display font-bold text-4xl text-[#14171F] mb-6">Search</h1>

                <form onSubmit={submit} className="flex max-w-xl border border-[#D7DBDE] focus-within:border-[#25406B]">
                    <input
                        type="text"
                        value={term}
                        onChange={(e) => setTerm(e.target.value)}
                        placeholder="Search articles, authors, topics…"
                        className="flex-1 font-body text-sm px-4 py-3 focus:outline-none"
                        autoFocus
                    />
                    <button type="submit" className="font-mono text-xs uppercase tracking-wider bg-[#14171F] text-white px-5 hover:bg-[#25406B]">
                        Search
                    </button>
                </form>
            </section>

            <section className="max-w-7xl mx-auto px-4 md:px-6 py-10">
                {query && (
                    <p className="font-mono text-xs uppercase tracking-wider text-[#3A4048]/60 mb-4">
                        {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
                    </p>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {results.map((article) => (
                        <ArticleCard key={article.id} article={article} />
                    ))}
                </div>
                {query && results.length === 0 && (
                    <p className="font-mono text-xs uppercase tracking-wider text-[#3A4048]/50 py-10">
                        Nothing on the wire matches "{query}".
                    </p>
                )}
            </section>
        </GuestLayout>
    );
}
