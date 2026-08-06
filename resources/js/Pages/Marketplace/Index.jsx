import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import DashboardLayout from "@/Layouts/DashboardLayout";

export default function Marketplace({ products = [], categories = [] }) {
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");

    const filteredProducts = products.filter((p) => {
        const matchSearch = p.title
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchCategory =
            selectedCategory === "all" ||
            p.category?.slug === selectedCategory;

        return matchSearch && matchCategory;
    });

    return (
        <DashboardLayout>
        <div className="flex min-h-screen bg-gray-50">

            {/* ================= SIDEBAR FILTER ================= */}
            <aside className="w-64 bg-white border-r p-4 hidden md:block">

                <h2 className="text-lg font-bold mb-4">Categories</h2>

                <button
                    onClick={() => setSelectedCategory("all")}
                    className={`block w-full text-left px-3 py-2 rounded mb-2 ${
                        selectedCategory === "all"
                            ? "bg-indigo-600 text-white"
                            : "hover:bg-gray-100"
                    }`}
                >
                    All Products
                </button>

                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.slug)}
                        className={`block w-full text-left px-3 py-2 rounded mb-2 ${
                            selectedCategory === cat.slug
                                ? "bg-indigo-600 text-white"
                                : "hover:bg-gray-100"
                        }`}
                    >
                        {cat.name}
                    </button>
                ))}
            </aside>

            {/* ================= MAIN ================= */}
            <div className="flex-1 p-6">

                {/* HEADER */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">

                    <h1 className="text-2xl font-bold">
                        Marketplace
                    </h1>

                    <input
                        type="text"
                        placeholder="Search products..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="px-4 py-2 border rounded-lg w-full md:w-80"
                    />
                </div>

                {/* PRODUCTS GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                    {filteredProducts.map((product) => (
                        <div
                            key={product.id}
                            className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
                        >

                            {/* IMAGE */}
                            <img
                                src={product.image || "https://via.placeholder.com/400"}
                                className="h-40 w-full object-cover"
                            />

                            {/* CONTENT */}
                            <div className="p-4">

                                {/* CATEGORY */}
                                <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded">
                                    {product.category?.name}
                                </span>

                                {/* TITLE */}
                                <h2 className="font-semibold mt-2">
                                    {product.title}
                                </h2>

                                {/* STATS */}
                                <div className="flex justify-between text-sm text-gray-500 mt-2">
                                    <span>⭐ {product.rating || 4.5}</span>
                                    <span>⬇ {product.downloads_count || 0}</span>
                                </div>

                                {/* PRICE */}
                                <div className="flex items-center justify-between mt-4">
                                    <span className="text-lg font-bold text-indigo-600">
                                        ${product.price}
                                    </span>

                                    <Link
                                        href={`/products/${product.id}`}
                                        className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                                    >
                                        View
                                    </Link>
                                </div>

                            </div>
                        </div>
                    ))}

                </div>

            </div>
        </div>
        </DashboardLayout>
    );
}