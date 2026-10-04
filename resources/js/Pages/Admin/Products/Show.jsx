import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Show({ product }) {
    const Row = ({ label, children }) => (
        <div className="flex justify-between gap-4 border-b border-slate-100 py-2 text-sm">
            <dt className="text-slate-500">{label}</dt>
            <dd className="text-right text-slate-900">{children}</dd>
        </div>
    );

    return (
        <>
            <Head title={product.title} />
            <div className="mx-auto max-w-3xl p-4 sm:p-6">
                <Link href="/admin/products" className="text-sm text-teal-700">&larr; Back to products</Link>

                <div className="mt-4 rounded-md border border-slate-200 bg-white p-6">
                    <div className="flex flex-col gap-6 sm:flex-row">
                        {product.image_url && (
                            <img src={product.image_url} alt="" className="h-40 w-40 rounded-md border object-cover" />
                        )}
                        <div className="flex-1">
                            <h1 className="text-xl font-bold text-slate-900">{product.title}</h1>
                            <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-slate-700">
                                {product.description || 'No description.'}
                            </p>
                        </div>
                    </div>

                    <dl className="mt-6">
                        <Row label="Category">{product.category?.name ?? '—'}</Row>
                        <Row label="Price">{Number(product.price).toLocaleString(undefined, { minimumFractionDigits: 2 })}</Row>
                        <Row label="Downloads">{product.downloads_count}</Row>
                        <Row label="Rating">{Number(product.rating).toFixed(1)}</Row>
                        <Row label="Created by">{product.user?.name ?? '—'}</Row>
                        <Row label="Created">{new Date(product.created_at).toLocaleString()}</Row>
                        <Row label="File">
                            {product.file_url ? (
                                <a href={product.file_url} target="_blank" rel="noreferrer" className="text-teal-700 underline">Download</a>
                            ) : '—'}
                        </Row>
                    </dl>

                    <div className="mt-6 flex gap-2">
                        <Link href={`/admin/products/${product.id}/edit`} className="rounded-md bg-teal-700 px-4 py-2 text-sm font-medium text-white hover:bg-teal-800">
                            Edit
                        </Link>
                        <button
                            onClick={() => confirm('Delete this product?') && router.delete(`/admin/products/${product.id}`)}
                            className="rounded-md border border-rose-300 px-4 py-2 text-sm text-rose-600"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

Show.layout = (page) => <AdminLayout>{page}</AdminLayout>;