import React from "react";
import { Head, Link } from "@inertiajs/react";

export default function Index({ orders = [] }) {

    const formatPrice = (price) =>
        new Intl.NumberFormat("en-RW").format(price) + " RWF";

    const statusClass = (status) => {

        const classes = {
            pending: "bg-yellow-100 text-yellow-700",
            paid: "bg-blue-100 text-blue-700",
            processing: "bg-purple-100 text-purple-700",
            completed: "bg-green-100 text-green-700",
            cancelled: "bg-red-100 text-red-700",
        };

        return classes[status] || "bg-gray-100 text-gray-700";
    };

    return (
        <>
            <Head title="My Orders" />

            <div className="min-h-screen bg-gray-50">

                <header className="bg-white border-b">

                    <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between">

                        <Link
                            href="/marketplace"
                            className="text-2xl font-bold text-green-700"
                        >
                            RUNUTRIDIET
                        </Link>

                        <Link
                            href="/marketplace"
                            className="text-green-700"
                        >
                            Continue Shopping
                        </Link>

                    </div>

                </header>

                <main className="max-w-5xl mx-auto px-4 py-10">

                    <h1 className="text-3xl font-bold mb-8">
                        My Orders
                    </h1>

                    {orders.length === 0 ? (

                        <div className="bg-white rounded-xl p-12 text-center">

                            <div className="text-5xl">
                                📦
                            </div>

                            <h2 className="text-xl font-bold mt-4">
                                No orders yet
                            </h2>

                            <Link
                                href="/marketplace"
                                className="inline-block mt-5 bg-green-600 text-white px-6 py-3 rounded-lg"
                            >
                                Start Shopping
                            </Link>

                        </div>

                    ) : (

                        <div className="space-y-4">

                            {orders.map((order) => (

                                <Link
                                    key={order.id}
                                    href={`/orders/${order.id}`}
                                    className="block bg-white rounded-xl p-6 hover:shadow-md"
                                >

                                    <div className="flex flex-wrap items-center justify-between gap-4">

                                        <div>

                                            <p className="font-bold">
                                                Order #{order.id}
                                            </p>

                                            <p className="text-sm text-gray-500">
                                                {order.created_at}
                                            </p>

                                        </div>

                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-medium ${statusClass(
                                                order.status
                                            )}`}
                                        >
                                            {order.status}
                                        </span>

                                        <p className="font-bold text-green-700">
                                            {formatPrice(order.total)}
                                        </p>

                                    </div>

                                </Link>

                            ))}

                        </div>

                    )}

                </main>

            </div>
        </>
    );
}