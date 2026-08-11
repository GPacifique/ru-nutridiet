import React, { useState } from "react";
import { Head, Link, router } from "@inertiajs/react";

export default function Show({ product, relatedProducts = [], cartCount = 0 }) {

    const [quantity, setQuantity] = useState(1);

    const formatPrice = (price) => {
        return new Intl.NumberFormat("en-RW").format(price) + " RWF";
    };

    const addToCart = () => {
        router.post(
            "/cart",
            {
                product_id: product.id,
                quantity,
            },
            {
                preserveScroll: true,
            }
        );
    };

    const buyNow = () => {
        router.post("/cart", {
            product_id: product.id,
            quantity,
            buy_now: true,
        });
    };

    return (
        <>
            <Head title={product.name} />

            <div className="min-h-screen bg-gray-50">

                {/* Header */}
                <header className="bg-white border-b">
                    <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between">

                        <Link
                            href="/marketplace"
                            className="text-2xl font-bold text-green-700"
                        >
                            RUNUTRIDIET
                        </Link>

                        <Link
                            href="/cart"
                            className="bg-green-600 text-white px-5 py-2 rounded-lg"
                        >
                            🛒 Cart {cartCount > 0 && `(${cartCount})`}
                        </Link>

                    </div>
                </header>

                {/* Breadcrumb */}
                <div className="max-w-7xl mx-auto px-4 py-6 text-sm">

                    <Link
                        href="/marketplace"
                        className="text-green-600"
                    >
                        Marketplace
                    </Link>

                    <span className="mx-2">/</span>

                    <span>{product.name}</span>

                </div>

                {/* Product */}
                <main className="max-w-7xl mx-auto px-4 pb-16">

                    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

                        <div className="grid lg:grid-cols-2">

                            {/* Image */}
                            <div className="bg-gray-100 min-h-[500px]">

                                {product.thumbnail || product.image ? (
                                    <img
                                        src={
                                            product.thumbnail ||
                                            product.image
                                        }
                                        alt={product.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="h-full flex items-center justify-center text-gray-400">
                                        No Image Available
                                    </div>
                                )}

                            </div>

                            {/* Details */}
                            <div className="p-8 lg:p-12">

                                {product.category && (
                                    <p className="text-green-600 font-semibold uppercase text-sm">
                                        {product.category.name}
                                    </p>
                                )}

                                <h1 className="text-4xl font-bold mt-2">
                                    {product.name}
                                </h1>

                                <div className="text-3xl font-bold text-green-700 mt-6">
                                    {formatPrice(product.price)}
                                </div>

                                <div className="border-t border-b py-6 my-6">

                                    <p className="text-gray-600 leading-relaxed">
                                        {product.description}
                                    </p>

                                </div>

                                {/* Quantity */}
                                <div className="mb-6">

                                    <label className="block font-semibold mb-2">
                                        Quantity
                                    </label>

                                    <div className="flex items-center w-fit border rounded-lg">

                                        <button
                                            onClick={() =>
                                                setQuantity(
                                                    Math.max(1, quantity - 1)
                                                )
                                            }
                                            className="px-5 py-3 text-xl"
                                        >
                                            −
                                        </button>

                                        <span className="px-6">
                                            {quantity}
                                        </span>

                                        <button
                                            onClick={() =>
                                                setQuantity(quantity + 1)
                                            }
                                            className="px-5 py-3 text-xl"
                                        >
                                            +
                                        </button>

                                    </div>

                                </div>

                                {/* Buttons */}
                                <div className="grid sm:grid-cols-2 gap-3">

                                    <button
                                        onClick={addToCart}
                                        className="border-2 border-green-600 text-green-700 py-4 rounded-xl font-semibold hover:bg-green-50"
                                    >
                                        🛒 Add to Cart
                                    </button>

                                    <button
                                        onClick={buyNow}
                                        className="bg-green-600 text-white py-4 rounded-xl font-semibold hover:bg-green-700"
                                    >
                                        Buy Now
                                    </button>

                                </div>

                                {/* Benefits */}
                                <div className="grid grid-cols-3 gap-3 mt-8 text-center text-sm">

                                    <div className="bg-gray-50 rounded-lg p-4">
                                        🔒
                                        <p className="mt-2">
                                            Secure Checkout
                                        </p>
                                    </div>

                                    <div className="bg-gray-50 rounded-lg p-4">
                                        ⚡
                                        <p className="mt-2">
                                            Fast Delivery
                                        </p>
                                    </div>

                                    <div className="bg-gray-50 rounded-lg p-4">
                                        ❤️
                                        <p className="mt-2">
                                            Nutrition Support
                                        </p>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </main>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <section className="max-w-7xl mx-auto px-4 pb-16">

                        <h2 className="text-2xl font-bold mb-6">
                            You may also like
                        </h2>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

                            {relatedProducts.map((item) => (

                                <Link
                                    key={item.id}
                                    href={`/products/${item.id}`}
                                    className="bg-white rounded-xl overflow-hidden shadow-sm"
                                >

                                    <div className="aspect-square bg-gray-100">

                                        {(item.thumbnail || item.image) && (
                                            <img
                                                src={
                                                    item.thumbnail ||
                                                    item.image
                                                }
                                                className="w-full h-full object-cover"
                                            />
                                        )}

                                    </div>

                                    <div className="p-4">

                                        <h3 className="font-semibold">
                                            {item.name}
                                        </h3>

                                        <p className="text-green-700 font-bold mt-2">
                                            {formatPrice(item.price)}
                                        </p>

                                    </div>

                                </Link>

                            ))}

                        </div>

                    </section>
                )}

            </div>
        </>
    );
}