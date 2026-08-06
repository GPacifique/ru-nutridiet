import { useMemo } from "react";
import { usePage, Link } from "@inertiajs/react";

export default function PropertiesByCategory() {
    const { properties } = usePage().props;

    const items = Array.isArray(properties) ? properties : [];

    // GROUP BY CATEGORY
    const grouped = useMemo(() => {
        const map = {};

        items.forEach((property) => {
            const categoryName =
                property?.category?.name || "Uncategorized";

            if (!map[categoryName]) {
                map[categoryName] = [];
            }

            map[categoryName].push(property);
        });

        return map;
    }, [items]);

    // IMAGE HANDLER
    const getImage = (property) => {
        if (property.images && property.images.length > 0) {
            return `/storage/${property.images[0].image}`;
        }

        return "https://images.unsplash.com/photo-1560518883-ce09059eeffa";
    };

    return (
        <div className="space-y-10">
            {Object.keys(grouped).map((category) => (
                <section key={category} className="px-6">
                    {/* CATEGORY TITLE */}
                    <h2 className="text-2xl font-bold mb-4">
                        {category}
                    </h2>

                    {/* GRID */}
                    <div className="grid md:grid-cols-4 gap-6">
                        {grouped[category].map((property) => (
                            <Link
                                key={property.id}
                                href={`/properties/${property.id}`}
                                className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition"
                            >
                                {/* IMAGE */}
                                <img
                                    src={getImage(property)}
                                    alt={property.title}
                                    className="w-full h-48 object-cover"
                                />

                                {/* CONTENT */}
                                <div className="p-4">
                                    <h3 className="font-bold text-lg">
                                        {property.title}
                                    </h3>

                                    <p className="text-gray-600 text-sm">
                                        {property.location}
                                    </p>

                                    <p className="text-blue-600 font-bold mt-1">
                                        ${property.price}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            ))}
        </div>
    );
}