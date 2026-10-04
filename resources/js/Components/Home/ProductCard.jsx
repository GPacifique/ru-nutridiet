import { Link, router } from '@inertiajs/react';
import { money } from './Section';

export default function ProductCard({ product, currency }) {
    const addToCart = (e) => {
        e.preventDefault();
        router.post(route('cart.store'), { product_id: product.id, quantity: 1 }, { preserveScroll: true });
    };
    return (
        <article className="group flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200">
            <Link href={product.url} className="block aspect-[4/3] overflow-hidden bg-[#F3F7F4]">
                {product.image && <img src={product.image} alt={product.name} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />}
            </Link>
            <div className="flex flex-1 flex-col p-5">
                <h3 className="font-semibold text-[#0F3D2E]"><Link href={product.url}>{product.name}</Link></h3>
                {product.summary && <p className="mt-1 text-sm text-slate-600">{product.summary}</p>}
                <div className="mt-auto flex items-center justify-between pt-4">
                    <span className="font-bold text-[#B8325A]">{money(product.price, currency)}</span>
                    <button onClick={addToCart} className="rounded-full bg-[#0F3D2E] px-4 py-1.5 text-sm font-semibold text-white hover:bg-[#2F9E5B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2F9E5B]">
                        Add to cart
                    </button>
                </div>
            </div>
        </article>
    );
}