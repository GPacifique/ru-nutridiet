import { Link } from '@inertiajs/react';

/** Format a price in RWF with no decimals. Change the suffix for another currency. */
export const money = (v) => {
    const n = Number(v);
    return n === 0 ? 'Free' : n.toLocaleString(undefined, { maximumFractionDigits: 0 }) + ' RWF';
};

/** Five-star display for a rating from 0 to 5. */
export function Stars({ value = 0 }) {
    const full = Math.min(5, Math.max(0, Math.round(Number(value) || 0)));

    return (
        <span className="whitespace-nowrap text-amber-500" aria-label={`${Number(value || 0).toFixed(1)} out of 5`}>
            {'★'.repeat(full)}
            <span className="text-slate-300">{'★'.repeat(5 - full)}</span>
        </span>
    );
}

export default function ProductCard({ product }) {
    return (
        <Link
            href={`/products/${product.id}`}
            className="group block overflow-hidden rounded-lg border border-slate-200 bg-white transition-shadow hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-700"
        >
            <div className="aspect-square overflow-hidden bg-slate-100">
                {product.image_url ? (
                    <img
                        src={product.image_url}
                        alt={product.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-sm text-slate-400">
                        No image
                    </div>
                )}
            </div>

            <div className="p-4">
                {product.category && (
                    <p className="text-xs text-slate-500">{product.category.name}</p>
                )}
                <h3 className="mt-1 line-clamp-2 font-semibold text-slate-900">{product.title}</h3>

                <div className="mt-2 flex items-center justify-between gap-2">
                    <span className="font-bold text-teal-700">{money(product.price)}</span>
                    <Stars value={product.rating} />
                </div>
            </div>
        </Link>
    );
}