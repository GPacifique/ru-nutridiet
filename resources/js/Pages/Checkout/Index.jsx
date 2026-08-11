import React from "react";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Index({ cart = [], subtotal = 0 }) {

    const { data, setData, post, processing, errors } = useForm({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        address: "",
        city: "Kigali",
        payment_method: "momo",
        notes: "",
    });

    const formatPrice = (price) =>
        new Intl.NumberFormat("en-RW").format(price) + " RWF";

    const submit = (e) => {
        e.preventDefault();

        post("/checkout");
    };

    return (
        <>
            <Head title="Checkout" />

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
                        Checkout
                    </h1>

                    <form
                        onSubmit={submit}
                        className="grid lg:grid-cols-3 gap-8"
                    >

                        {/* Customer */}
                        <div className="lg:col-span-2 space-y-6">

                            <section className="bg-white rounded-xl p-6">

                                <h2 className="text-xl font-bold mb-6">
                                    Customer Information
                                </h2>

                                <div className="grid md:grid-cols-2 gap-5">

                                    <div>
                                        <label className="block mb-2 font-medium">
                                            First Name
                                        </label>

                                        <input
                                            value={data.first_name}
                                            onChange={(e) =>
                                                setData(
                                                    "first_name",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full border rounded-lg p-3"
                                        />

                                        {errors.first_name && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.first_name}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block mb-2 font-medium">
                                            Last Name
                                        </label>

                                        <input
                                            value={data.last_name}
                                            onChange={(e) =>
                                                setData(
                                                    "last_name",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full border rounded-lg p-3"
                                        />
                                    </div>

                                </div>

                                <div className="grid md:grid-cols-2 gap-5 mt-5">

                                    <div>
                                        <label className="block mb-2 font-medium">
                                            Email
                                        </label>

                                        <input
                                            type="email"
                                            value={data.email}
                                            onChange={(e) =>
                                                setData(
                                                    "email",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full border rounded-lg p-3"
                                        />
                                    </div>

                                    <div>
                                        <label className="block mb-2 font-medium">
                                            Phone
                                        </label>

                                        <input
                                            value={data.phone}
                                            onChange={(e) =>
                                                setData(
                                                    "phone",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="+250..."
                                            className="w-full border rounded-lg p-3"
                                        />
                                    </div>

                                </div>

                            </section>

                            {/* Delivery */}
                            <section className="bg-white rounded-xl p-6">

                                <h2 className="text-xl font-bold mb-6">
                                    Delivery Information
                                </h2>

                                <div className="space-y-5">

                                    <div>
                                        <label className="block mb-2 font-medium">
                                            Address
                                        </label>

                                        <textarea
                                            value={data.address}
                                            onChange={(e) =>
                                                setData(
                                                    "address",
                                                    e.target.value
                                                )
                                            }
                                            rows="3"
                                            className="w-full border rounded-lg p-3"
                                        />
                                    </div>

                                    <div>
                                        <label className="block mb-2 font-medium">
                                            City
                                        </label>

                                        <input
                                            value={data.city}
                                            onChange={(e) =>
                                                setData(
                                                    "city",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full border rounded-lg p-3"
                                        />
                                    </div>

                                </div>

                            </section>

                            {/* Payment */}
                            <section className="bg-white rounded-xl p-6">

                                <h2 className="text-xl font-bold mb-6">
                                    Payment Method
                                </h2>

                                <div className="space-y-3">

                                    <label className="flex items-center gap-3 border rounded-lg p-4 cursor-pointer">

                                        <input
                                            type="radio"
                                            value="momo"
                                            checked={
                                                data.payment_method === "momo"
                                            }
                                            onChange={(e) =>
                                                setData(
                                                    "payment_method",
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <span>
                                            MTN Mobile Money
                                        </span>

                                    </label>

                                    <label className="flex items-center gap-3 border rounded-lg p-4 cursor-pointer">

                                        <input
                                            type="radio"
                                            value="airtel_money"
                                            checked={
                                                data.payment_method ===
                                                "airtel_money"
                                            }
                                            onChange={(e) =>
                                                setData(
                                                    "payment_method",
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <span>
                                            Airtel Money
                                        </span>

                                    </label>

                                    <label className="flex items-center gap-3 border rounded-lg p-4 cursor-pointer">

                                        <input
                                            type="radio"
                                            value="cash"
                                            checked={
                                                data.payment_method === "cash"
                                            }
                                            onChange={(e) =>
                                                setData(
                                                    "payment_method",
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <span>
                                            Cash on Delivery
                                        </span>

                                    </label>

                                </div>

                            </section>

                        </div>

                        {/* Summary */}
                        <div>

                            <div className="bg-white rounded-xl p-6 sticky top-6">

                                <h2 className="text-xl font-bold">
                                    Your Order
                                </h2>

                                <div className="mt-6 space-y-4">

                                    {cart.map((item) => {

                                        const product =
                                            item.product || item;

                                        return (
                                            <div
                                                key={item.id}
                                                className="flex justify-between gap-4"
                                            >

                                                <div>
                                                    <p className="font-medium">
                                                        {product.name}
                                                    </p>

                                                    <p className="text-sm text-gray-500">
                                                        Qty: {item.quantity}
                                                    </p>
                                                </div>

                                                <span>
                                                    {formatPrice(
                                                        product.price *
                                                            item.quantity
                                                    )}
                                                </span>

                                            </div>
                                        );
                                    })}

                                </div>

                                <div className="border-t mt-6 pt-5 flex justify-between text-xl font-bold">

                                    <span>Total</span>

                                    <span className="text-green-700">
                                        {formatPrice(subtotal)}
                                    </span>

                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full bg-green-600 text-white py-4 rounded-xl mt-6 font-semibold hover:bg-green-700 disabled:opacity-50"
                                >
                                    {processing
                                        ? "Processing..."
                                        : "Place Order"}
                                </button>

                                <p className="text-xs text-gray-500 text-center mt-4">
                                    Your order information is securely
                                    processed.
                                </p>

                            </div>

                        </div>

                    </form>

                </main>

            </div>
        </>
    );
}