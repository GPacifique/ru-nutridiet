import { Head, Link, useForm, usePage } from '@inertiajs/react';
import PublicNavigation from '@/Layouts/PublicNavigation';
import ProductCard, { Stars, money } from '@/Components/ProductCard';
import { useState } from 'react';
import { resolveImage, PLACEHOLDER } from '@/lib/imageUrl';

export default function Show({ product, relatedProducts = [], myReview = null }) {
    const { auth, flash } = usePage().props;
    const reviews = product.reviews ?? [];

    const form = useForm({
        rating: myReview?.rating ?? 5,
        comment: myReview?.comment ?? '',
    });
const imageSrc = resolveImage(product.image_url || product.image);
const [imgFailed, setImgFailed] = useState(false);
    const submit = (e) => {
        e.preventDefault();
        form.post(`/products/${product.id}/reviews`, { preserveScroll: true });
    };

    return (
        <>
            <Head title={product.title} />

            <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
                <Link href="/shop" className="text-sm text-teal-700">&larr; Back to shop</Link>

                {flash?.success && (
                    <div role="status" className="mt-4 rounded-md bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                        {flash.success}
                    </div>
                )}

                <div className="mt-6 grid gap-8 md:grid-cols-2">
                    <div className="aspect-square overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
    {imageSrc && !imgFailed ? (
        <img
            src={imageSrc}
            alt={product.title}
            className="h-full w-full object-cover"
            onError={() => setImgFailed(true)}
        />
    ) : (
        <div className="flex h-full items-center justify-center text-sm text-slate-400">
            No image
        </div>
    )}
</div>

                    <div>
                        {product.category && <p className="text-sm text-slate-500">{product.category.name}</p>}
                        <h1 className="mt-1 text-3xl font-bold text-slate-900">{product.title}</h1>

                        <div className="mt-3 flex items-center gap-2 text-sm">
                            <Stars value={product.rating} />
                            <span className="text-slate-500">
                                {Number(product.rating || 0).toFixed(1)} ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
                            </span>
                        </div>

                        <p className="mt-4 text-3xl font-bold text-teal-700">{money(product.price)}</p>

                        <p className="mt-6 whitespace-pre-line leading-relaxed text-slate-700">
                            {product.description || 'No description available.'}
                        </p>

                        {product.user?.name && (
                            <p className="mt-4 text-sm text-slate-500">Sold by {product.user.name}</p>
                        )}

                        <div className="mt-8 flex flex-wrap gap-3">
                            <Link
                                href="/contact"
                                className="rounded-md bg-teal-700 px-6 py-3 font-medium text-white hover:bg-teal-800"
                            >
                                Order / enquire
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Reviews */}
                <section className="mt-14">
                    <h2 className="text-xl font-bold text-slate-900">Reviews</h2>

                    {auth?.user ? (
                        <form onSubmit={submit} className="mt-4 max-w-xl space-y-3 rounded-lg border border-slate-200 bg-white p-4">
                            <p className="text-sm font-medium">{myReview ? 'Update your review' : 'Write a review'}</p>

                            <select
                                value={form.data.rating}
                                onChange={(e) => form.setData('rating', Number(e.target.value))}
                                className="rounded-md border border-slate-300 px-3 py-2 text-sm"
                            >
                                {[5, 4, 3, 2, 1].map((n) => (
                                    <option key={n} value={n}>{n} star{n > 1 ? 's' : ''}</option>
                                ))}
                            </select>

                            <textarea
                                rows={3}
                                value={form.data.comment}
                                onChange={(e) => form.setData('comment', e.target.value)}
                                placeholder="Share your experience (optional)"
                                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                            />

                            {form.errors.rating && <p className="text-sm text-rose-600">{form.errors.rating}</p>}
                            {form.errors.comment && <p className="text-sm text-rose-600">{form.errors.comment}</p>}

                            <button
                                type="submit"
                                disabled={form.processing}
                                className="rounded-md bg-teal-700 px-4 py-2 text-sm text-white disabled:opacity-50"
                            >
                                {form.processing ? 'Saving...' : 'Submit review'}
                            </button>
                        </form>
                    ) : (
                        <p className="mt-3 text-sm text-slate-600">
                            <Link href="/login" className="text-teal-700 underline">Log in</Link> to write a review.
                        </p>
                    )}

                    <div className="mt-6 space-y-4">
                        {reviews.length === 0 && <p className="text-sm text-slate-500">No reviews yet.</p>}
                        {reviews.map((r) => (
                            <div key={r.id} className="border-b border-slate-100 pb-4">
                                <div className="flex flex-wrap items-center gap-2 text-sm">
                                    <span className="font-medium text-slate-900">{r.user?.name ?? 'Customer'}</span>
                                    <Stars value={r.rating} />
                                    <span className="text-slate-400">{new Date(r.created_at).toLocaleDateString()}</span>
                                </div>
                                {r.comment && <p className="mt-1 text-sm text-slate-700">{r.comment}</p>}
                            </div>
                        ))}
                    </div>
                </section>

                {/* Related products */}
                {relatedProducts.length > 0 && (
                    <section className="mt-14">
                        <h2 className="text-xl font-bold text-slate-900">Related products</h2>
                        <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
                            {relatedProducts.map((p) => (
                                <ProductCard key={p.id} product={p} />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </>
    );
}

Show.layout = (page) => <PublicNavigation>{page}</PublicNavigation>;