import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import PublicNavigation from '@/Layouts/PublicNavigation';
import { money } from '@/Components/ProductCard';

const METHODS = [
    { value: 'momo', label: 'MTN Mobile Money' },
    { value: 'airtel', label: 'Airtel Money' },
    { value: 'cash', label: 'Cash on delivery / pickup' },
];

export default function Checkout({ items = [], total = 0, user = null }) {
    const { flash } = usePage().props;

    const form = useForm({
        name: user?.name ?? '',
        email: user?.email ?? '',
        phone: '',
        address: '',
        notes: '',
        payment_method: 'momo',
    });

    const submit = (e) => {
        e.preventDefault();
        form.post('/checkout');
    };

    const setQty = (id, quantity) =>
        router.patch(`/cart/${id}`, { quantity }, { preserveScroll: true });

    const remove = (id) => router.delete(`/cart/${id}`, { preserveScroll: true });

    const input = 'w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700';
    const Err = ({ name }) =>
        form.errors[name] ? <p className="mt-1 text-sm text-rose-600">{form.errors[name]}</p> : null;

    if (items.length === 0) {
        return (
            <>
                <Head title="Checkout" />
                <div className="mx-auto max-w-2xl px-4 py-20 text-center">
                    <h1 className="text-2xl font-bold text-slate-900">Your cart is empty</h1>
                    <p className="mt-2 text-slate-600">Add a product to continue.</p>
                    <Link href="/shop" className="mt-6 inline-block rounded-md bg-teal-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-teal-800">
                        Browse the shop
                    </Link>
                </div>
            </>
        );
    }

    return (
        <>
            <Head title="Checkout" />

            <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
                <Link href="/shop" className="text-sm text-teal-700">&larr; Continue shopping</Link>
                <h1 className="mt-3 text-3xl font-bold text-slate-900">Checkout</h1>

                {flash?.error && (
                    <div role="alert" className="mt-4 rounded-md bg-rose-50 px-4 py-3 text-sm text-rose-800">
                        {flash.error}
                    </div>
                )}

                <div className="mt-8 grid gap-8 lg:grid-cols-5">
                    {/* Details form */}
                    <form onSubmit={submit} className="space-y-5 lg:col-span-3">
                        <div className="grid gap-5 sm:grid-cols-2">
                            <div>
                                <label className="mb-1 block text-sm font-medium text-slate-700">Full name</label>
                                <input value={form.data.name} onChange={(e) => form.setData('name', e.target.value)} className={input} />
                                <Err name="name" />
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-slate-700">Phone (MoMo number)</label>
                                <input type="tel" value={form.data.phone} onChange={(e) => form.setData('phone', e.target.value)} placeholder="07XXXXXXXX" className={input} />
                                <Err name="phone" />
                            </div>
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium text-slate-700">Email (optional)</label>
                            <input type="email" value={form.data.email} onChange={(e) => form.setData('email', e.target.value)} className={input} />
                            <Err name="email" />
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium text-slate-700">Delivery address (optional)</label>
                            <input value={form.data.address} onChange={(e) => form.setData('address', e.target.value)} className={input} />
                            <Err name="address" />
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium text-slate-700">Notes (optional)</label>
                            <textarea rows={3} value={form.data.notes} onChange={(e) => form.setData('notes', e.target.value)} className={input} />
                            <Err name="notes" />
                        </div>

                        <fieldset>
                            <legend className="mb-2 text-sm font-medium text-slate-700">Payment method</legend>
                            <div className="space-y-2">
                                {METHODS.map((m) => (
                                    <label key={m.value} className="flex cursor-pointer items-center gap-3 rounded-md border border-slate-200 bg-white px-4 py-3 text-sm has-[:checked]:border-teal-700 has-[:checked]:bg-teal-50">
                                        <input
                                            type="radio"
                                            name="payment_method"
                                            value={m.value}
                                            checked={form.data.payment_method === m.value}
                                            onChange={(e) => form.setData('payment_method', e.target.value)}
                                        />
                                        {m.label}
                                    </label>
                                ))}
                            </div>
                            <Err name="payment_method" />
                        </fieldset>

                        <button
                            type="submit"
                            disabled={form.processing}
                            className="w-full rounded-md bg-teal-700 px-6 py-3 font-medium text-white hover:bg-teal-800 disabled:opacity-50"
                        >
                            {form.processing ? 'Placing order...' : `Place order · ${money(total)}`}
                        </button>
                    </form>

                    {/* Order summary */}
                    <aside className="lg:col-span-2">
                        <div className="rounded-lg border border-slate-200 bg-white p-5">
                            <h2 className="font-semibold text-slate-900">Order summary</h2>

                            <ul className="mt-4 divide-y divide-slate-100">
                                {items.map((i) => (
                                    <li key={i.id} className="flex gap-3 py-3">
                                        {i.image_url ? (
                                            <img src={i.image_url} alt="" className="h-14 w-14 rounded object-cover" />
                                        ) : (
                                            <div className="h-14 w-14 rounded bg-slate-100" />
                                        )}
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-sm font-medium text-slate-900">{i.title}</p>
                                            <p className="text-xs text-slate-500">{money(i.price)} each</p>
                                            <div className="mt-1 flex items-center gap-2">
                                                <button type="button" onClick={() => setQty(i.id, i.quantity - 1)} disabled={i.quantity <= 1} className="h-6 w-6 rounded border text-sm disabled:opacity-40" aria-label="Decrease quantity">−</button>
                                                <span className="w-6 text-center text-sm">{i.quantity}</span>
                                                <button type="button" onClick={() => setQty(i.id, i.quantity + 1)} className="h-6 w-6 rounded border text-sm" aria-label="Increase quantity">+</button>
                                                <button type="button" onClick={() => remove(i.id)} className="ml-2 text-xs text-rose-600">Remove</button>
                                            </div>
                                        </div>
                                        <p className="text-sm font-medium text-slate-900">{money(i.line_total)}</p>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-4 flex justify-between border-t border-slate-200 pt-4 font-bold text-slate-900">
                                <span>Total</span>
                                <span>{money(total)}</span>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </>
    );
}

Checkout.layout = (page) => <PublicNavigation>{page}</PublicNavigation>;