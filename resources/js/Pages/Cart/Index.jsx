import React from "react";
import { Head, Link, router } from "@inertiajs/react";

export default function Index({ cart = [], subtotal = 0 }) {

    const formatPrice = (price) =>
        new Intl.NumberFormat("en-RW").format(price) + " RWF";

    const updateQuantity = (item, quantity) => {

        if (quantity < 1) return;

        router.patch(
            `/cart/${item.id}`,
            {
                quantity,
            },
            {
                preserveScroll: true,
            }
        );
    };

    const removeItem = (item) => {

        router.delete(`/cart/${item.id}`, {
            preserveScroll: true,
        });

    };

    return (
        <>
            <Head title="Shopping Cart" />

            <div className="min-h-screen bg-gray-50">

                <header className="bg-white border-b">
                    <div className="max-w-7xl mx-auto px-4 py-4">

                        <Link
                            href="/marketplace"
                            className="text-2xl font-bold text-green-700"
                        >
                            RUNUTRIDIET
                        </Link>

                    </div>
                </header>

                <main className="max-w-7xl mx-auto px-4 py-10">

                    <h1 className="text-3xl font-bold mb-8">
                        Shopping Cart
                    </h1>

                    {cart.length === 0 ? (

                        <div className="bg-white rounded-xl p-12 text-center">

                            <div className="text-6xl">
                                🛒
                            </div>

                            <h2 className="text-2xl font-bold mt-5">
                                Your cart is empty
                            </h2>

                            <p className="text-gray-500 mt-2">
                                Find something useful for your health.
                            </p>

                            <Link
                                href="/marketplace"
                                className="inline-block mt-6 bg-green-600 text-white px-7 py-3 rounded-lg"
                            >
                                Continue Shopping
                            </Link>

                        </div>

                    ) : (

                        <div className="grid lg:grid-cols-3 gap-8">

                            {/* Items */}
                            <div className="lg:col-span-2 space-y-4">

                                {cart.map((item) => {

                                    const product =
                                        item.product || item;

                                    return (

                                        <div
                                            key={item.id}
                                            className="bg-white rounded-xl p-5 flex gap-5"
                                        >

                                            <div className="w-28 h-28 bg-gray-100 rounded-lg overflow-hidden">

                                                {(product.thumbnail ||
                                                    product.image) && (
                                                    <img
                                                        src={
                                                            product.thumbnail ||
                                                            product.image
                                                        }
                                                        className="w-full h-full object-cover"
                                                    />
                                                )}

                                            </div>

                                            <div className="flex-1">

                                                <Link
                                                    href={`/products/${product.id}`}
                                                    className="font-bold text-lg"
                                                >
                                                    {product.name}
                                                </Link>

                                                <p className="text-green-700 font-semibold mt-1">
                                                    {formatPrice(product.price)}
                                                </p>

                                                <div className="flex items-center justify-between mt-4">

                                                    <div className="flex border rounded-lg">

                                                        <button
                                                            onClick={() =>
                                                                updateQuantity(
                                                                    item,
                                                                    item.quantity - 1
                                                                )
                                                            }
                                                            className="px-4 py-2"
                                                        >
                                                            −
                                                        </button>

                                                        <span className="px-4 py-2">
                                                            {item.quantity}
                                                        </span>

                                                        <button
                                                            onClick={() =>
                                                                updateQuantity(
                                                                    item,
                                                                    item.quantity + 1
                                                                )
                                                            }
                                                            className="px-4 py-2"
                                                        >
                                                            +
                                                        </button>

                                                    </div>

                                                    <button
                                                        onClick={() =>
                                                            removeItem(item)
                                                        }
                                                        className="text-red-500"
                                                    >
                                                        Remove
                                                    </button>

                                                </div>

                                            </div>

                                        </div>

                                    );
                                })}

                            </div>

                            {/* Summary */}
                            <div>

                                <div className="bg-white rounded-xl p-6 sticky top-6">

                                    <h2 className="text-xl font-bold">
                                        Order Summary
                                    </h2>

                                    <div className="flex justify-between mt-6">
                                        <span>Subtotal</span>

                                        <span className="font-semibold">
                                            {formatPrice(subtotal)}
                                        </span>
                                    </div>

                                    <div className="border-t mt-5 pt-5 flex justify-between text-xl font-bold">

                                        <span>Total</span>

                                        <span className="text-green-700">
                                            {formatPrice(subtotal)}
                                        </span>

                                    </div>

                                    <Link
                                        href="/checkout"
                                        className="block text-center bg-green-600 text-white py-4 rounded-xl mt-6 font-semibold hover:bg-green-700"
                                    >
                                        Proceed to Checkout
                                    </Link>

                                    <Link
                                        href="/marketplace"
                                        className="block text-center mt-4 text-green-700"
                                    >
                                        Continue Shopping
                                    </Link>

                                </div>

                            </div>

                        </div>

                    )}

                </main>

            </div>
        </>
    );
}