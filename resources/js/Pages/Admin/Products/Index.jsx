import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';

const money = (v) => Number(v).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function Index({ products, categories, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [category, setCategory] = useState(filters.category || '');

    const apply = (next = {}) =>
        router.get('/admin/products', { search, category, ...next }, { preserveState: true, replace: true });

    return (
        <>
            <Head title="Products" />
            <div className="p-4 sm:p-6">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <h1 className="text-2xl font-bold text-slate-900">Products</h1>
                    <Link href="/admin/products/create" className="rounded-md bg-teal-700 px-4 py-2 text-sm font-medium text-white hover:bg-teal-800">
                        New product
                    </Link>
                </div>

                <div className="mb-4 flex flex-wrap gap-2">
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && apply()}
                        placeholder="Search title..."
                        className="rounded-md border border-slate-300 px-3 py-2 text-sm"
                    />
                    <select
                        value={category}
                        onChange={(e) => { setCategory(e.target.value); apply({ category: e.target.value }); }}
                        className="rounded-md border border-slate-300 px-3 py-2 text-sm"
                    >
                        <option value="">All categories</option>
                        {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                    <button onClick={() => apply()} className="rounded-md border border-slate-300 px-3 py-2 text-sm">Search</button>
                </div>

                <div className="overflow-x-auto rounded-md border border-slate-200 bg-white">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-100 text-slate-600">
                            <tr>
                                <th className="p-3">Product</th>
                                <th className="p-3">Category</th>
                                <th className="p-3">Price</th>
                                <th className="p-3">Downloads</th>
                                <th className="p-3">Rating</th>
                                <th className="p-3"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.data.map((p) => (
                                <tr key={p.id} className="border-t border-slate-100">
                                    <td className="p-3">
                                        <div className="flex items-center gap-3">
                                            {p.image_url ? (
                                                <img src={p.image_url} alt="" className="h-10 w-10 rounded object-cover" />
                                            ) : (
                                                <div className="h-10 w-10 rounded bg-slate-100" />
                                            )}
                                            <Link href={`/admin/products/${p.id}`} className="font-medium text-slate-900 hover:underline">
                                                {p.title}
                                            </Link>
                                        </div>
                                    </td>
                                    <td className="p-3">{p.category?.name ?? '—'}</td>
                                    <td className="p-3">{money(p.price)}</td>
                                    <td className="p-3">{p.downloads_count}</td>
                                    <td className="p-3">{Number(p.rating).toFixed(1)}</td>
                                    <td className="space-x-3 whitespace-nowrap p-3 text-right">
                                        <Link href={`/admin/products/${p.id}/edit`} className="text-teal-700">Edit</Link>
                                        <button
                                            onClick={() => confirm('Delete this product?') && router.delete(`/admin/products/${p.id}`, { preserveScroll: true })}
                                            className="text-rose-600"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {products.data.length === 0 && (
                                <tr><td colSpan="6" className="p-6 text-center text-slate-500">No products found.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="mt-4 flex flex-wrap gap-1">
                    {products.links.map((l, i) => (
                        <Link
                            key={i}
                            href={l.url || '#'}
                            preserveScroll
                            className={`rounded border px-3 py-1 text-sm ${l.active ? 'bg-teal-700 text-white' : 'bg-white'} ${!l.url ? 'pointer-events-none opacity-40' : ''}`}
                            dangerouslySetInnerHTML={{ __html: l.label }}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}

Index.layout = (page) => <AdminLayout>{page}</AdminLayout>;