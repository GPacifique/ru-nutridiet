import React, { useState } from "react";
import { router, usePage } from "@inertiajs/react";

export default function SearchComponent() {
    const { categories = [] } = usePage().props || {};

    const [search, setSearch] = useState({
        location: "",
        category: "",
        min_price: "",
        max_price: "",
    });

    const handleChange = (e) => {
        setSearch({
            ...search,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        router.get("/properties", search, {
            preserveState: true,
            replace: true,
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white shadow-lg rounded-xl p-4 w-full max-w-5xl mx-auto"
        >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                
                {/* LOCATION */}
                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={search.location}
                    onChange={handleChange}
                    className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {/* CATEGORY */}
                <select
                    name="category"
                    value={search.category}
                    onChange={handleChange}
                    className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">All Categories</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </select>

                {/* MIN PRICE */}
                <input
                    type="number"
                    name="min_price"
                    placeholder="Min Price"
                    value={search.min_price}
                    onChange={handleChange}
                    className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {/* MAX PRICE */}
                <input
                    type="number"
                    name="max_price"
                    placeholder="Max Price"
                    value={search.max_price}
                    onChange={handleChange}
                    className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* BUTTON */}
            <button
                type="submit"
                className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
            >
                Search Properties
            </button>
        </form>
    );
}