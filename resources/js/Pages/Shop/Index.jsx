import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import PublicNavigation from '@/Layouts/PublicNavigation';
import ProductCard from '@/Components/ProductCard';

export default function Index({ products, categories, filters }) {
    const [search, setSearch] = useState(filters.search || '');

    const apply = (next = {}) => {
        const params = { search, category: filters.category, sort: filters.sort, ...next };

        // Drop empty values so the URL stays clean
        Object.keys(params).forEach((k) => {
            if (params[k] === '' || params[k] == null) delete params[k];
        });

        router.get('/shop', params, { preserveState: true, replace: true });
    };

    const reset = () => {
        setSearch('');
        router.get('/shop', {}, { replace: true });
    };

    const hasFilters = filters.search || filters.category || filters.sort;
    const field = 'rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700';

    return (
        <>
            <Head title="Shop" />

            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
                <h1 className="text-3xl font-bold text-slate-900">Shop</h1>

                <div className="mt-6 flex flex-wrap gap-2">
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && apply()}
                        placeholder="Search products..."
                        className={`${field} w-full sm:w-64`}
                    />

                    <select
                        value={filters.category || ''}
                        onChange={(e) => apply({ category: e.target.value })}
                        className={field}
                    >
                        <option value="">All categories</option>
                        {categories.map((c) => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>

                    <select
                        value={filters.sort || ''}
                        onChange={(e) => apply({ sort: e.target.value })}
                        className={field}
                    >
                        <option value="">Newest</option>
                        <option value="price_asc">Price: low to high</option>
                        <option value="price_desc">Price: high to low</option>
                        <option value="rating">Top rated</option>
                    </select>

                    <button
                        onClick={() => apply()}
                        className="rounded-md bg-teal-700 px-4 py-2 text-sm font-medium text-white hover:bg-teal-800"
                    >
                        Search
                    </button>

                    {hasFilters && (
                        <button onClick={reset} className="rounded-md border border-slate-300 px-4 py-2 text-sm">
                            Clear
                        </button>
                    )}
                </div>

                {products.data.length === 0 ? (
                    <p className="mt-16 text-center text-slate-500">No products found.</p>
                ) : (
                    <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
                        {products.data.map((p) => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </div>
                )}

                {products.links.length > 3 && (
                    <div className="mt-10 flex flex-wrap justify-center gap-1">
                        {products.links.map((l, i) => (
                            <Link
                                key={i}
                                href={l.url || '#'}
                                preserveScroll
                                className={`rounded border px-3 py-1 text-sm ${
                                    l.active ? 'bg-teal-700 text-white' : 'bg-white'
                                } ${!l.url ? 'pointer-events-none opacity-40' : ''}`}
                                dangerouslySetInnerHTML={{ __html: l.label }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

Index.layout = (page) => <PublicNavigation>{page}</PublicNavigation>;