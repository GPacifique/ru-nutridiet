import { useMemo } from "react";
import { usePage, Link } from "@inertiajs/react";
import { FaHeart, FaStar, FaComment } from "react-icons/fa";

export default function MarketplaceProperties() {
    const { properties } = usePage().props;

    const items = Array.isArray(properties) ? properties : [];

    // GROUP BY CATEGORY
    const grouped = useMemo(() => {
        const map = {};

        items.forEach((property) => {
            const category = property?.category?.name || "Other";

            if (!map[category]) map[category] = [];
            map[category].push(property);
        });

        return map;
    }, [items]);

    const getImage = (property) => {
        if (property.images && property.images.length > 0) {
            return `/storage/${property.images[0].image}`;
        }
        return "https://images.unsplash.com/photo-1560518883-ce09059eeffa";
    };

    return (
        <div className="space-y-12 px-6 py-8">
            {Object.entries(grouped).map(([category, props]) => (
                <section key={category}>
                    {/* HEADER */}
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold">
                            {category}
                        </h2>

                        <Link
                            href={`/properties?category=${category}`}
                            className="text-blue-600 hover:underline"
                        >
                            View all →
                        </Link>
                    </div>

                    {/* HORIZONTAL SCROLL ROW */}
                    <div className="flex gap-5 overflow-x-auto pb-3 scrollbar-hide">
                        {props.map((property) => (
                            <div
                                key={property.id}
                                className="min-w-[280px] bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
                            >
                                {/* IMAGE */}
                                <div className="relative group">
                                    <img
                                        src={getImage(property)}
                                        alt={property.title}
                                        className="h-44 w-full object-cover"
                                    />

                                    {/* PRICE BADGE */}
                                    <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                                        ${property.price}
                                    </div>

                                    {/* ACTIONS (hover) */}
                                    <div className="absolute bottom-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                                        <button className="bg-white p-2 rounded-full shadow">
                                            <FaHeart className="text-red-500" />
                                        </button>

                                        <button className="bg-white p-2 rounded-full shadow">
                                            <FaStar className="text-yellow-500" />
                                        </button>

                                        <button className="bg-white p-2 rounded-full shadow">
                                            <FaComment className="text-green-500" />
                                        </button>
                                    </div>
                                </div>

                                {/* INFO */}
                                <div className="p-3">
                                    <h3 className="font-bold text-md">
                                        {property.title}
                                    </h3>

                                    <p className="text-gray-500 text-sm">
                                        {property.location}
                                    </p>

                                    {/* TAG */}
                                    <span className="inline-block mt-2 text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                                        {category}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            ))}
        </div>
    );
}