import React from "react";
import { Link } from "@inertiajs/react";

export default function BuyerRecentProperties({ properties = [] }) {
    return (
        <div className="bg-white p-6 rounded shadow mt-6">
            <h2 className="text-xl font-bold mb-4">
                Recommended Properties
            </h2>

            <div className="grid md:grid-cols-3 gap-4">
                {properties.map((property) => (
                    <div key={property.id} className="border rounded overflow-hidden">
                        <img
                            src={`/storage/${property.images?.[0]?.image}`}
                            className="h-32 w-full object-cover"
                        />

                        <div className="p-3">
                            <h3 className="font-semibold">
                                {property.title}
                            </h3>

                            <p className="text-sm text-gray-500">
                                {property.location}
                            </p>

                            <Link
                                href={route("properties.show", property.id)}
                                className="text-blue-600 text-sm"
                            >
                                View
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}