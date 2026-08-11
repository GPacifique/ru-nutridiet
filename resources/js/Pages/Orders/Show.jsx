import React from "react";
import { Head, Link } from "@inertiajs/react";

export default function Show({ order }) {

    const formatPrice = (price) =>
        new Intl.NumberFormat("en-RW").format(price) + " RWF";

    return (
        <>
            <Head title={`Order #${order.id}`} />

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

                <main className="max-w-4xl mx-auto px-4 py-12">

                    {/* Success */}
                    <div className="bg-white rounded-2xl p-8 text-center">

                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto text-3xl">
                            ✓
                        </div>

                        <h1 className="text-3xl font-bold mt-5">
                            Order Received!
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Thank you for shopping with RUNUTRIDIET.
                        </p>

                        <p className="font-semibold mt-4">
                            Order #{order.id}
                        </p>

                    </div>

                    {/* Items */}
                    <div className="bg-white rounded-xl p-6 mt-6">

                        <h2 className="text-xl font-bold mb-5">
                            Order Items
                        </h2>

                        <div className="space-y-5">

                            {order.items?.map((item) => {

                                const product =
                                    item.product || item;

                                return (
                                    <div
                                        key={item.id}
                                        className="flex justify-between border-b pb-5"
                                    >

                                        <div>
                                            <p className="font-semibold">
                                                {product.name}
                                            </p>

                                            <p className="text-sm text-gray-500">
                                                Quantity: {item.quantity}
                                            </p>
                                        </div>

                                        <p className="font-semibold">
                                            {formatPrice(
                                                item.price *
                                                    item.quantity
                                            )}
                                        </p>

                                    </div>
                                );
                            })}

                        </div>

                        <div className="border-t mt-6 pt-5 flex justify-between text-xl font-bold">

                            <span>Total</span>

                            <span className="text-green-700">
                                {formatPrice(order.total)}
                            </span>

                        </div>

                    </div>

                    {/* Customer */}
                    <div className="bg-white rounded-xl p-6 mt-6">

                        <h2 className="text-xl font-bold mb-5">
                            Delivery Information
                        </h2>

                        <p>
                            {order.first_name} {order.last_name}
                        </p>

                        <p className="text-gray-600">
                            {order.phone}
                        </p>

                        <p className="text-gray-600">
                            {order.address}
                        </p>

                        <p className="text-gray-600">
                            {order.city}
                        </p>

                    </div>

                    <div className="flex gap-4 mt-8">

                        <Link
                            href="/marketplace"
                            className="flex-1 text-center bg-green-600 text-white py-4 rounded-xl"
                        >
                            Continue Shopping
                        </Link>

                        <Link
                            href="/orders"
                            className="flex-1 text-center border border-green-600 text-green-700 py-4 rounded-xl"
                        >
                            My Orders
                        </Link>

                    </div>

                </main>

            </div>
        </>
    );
}