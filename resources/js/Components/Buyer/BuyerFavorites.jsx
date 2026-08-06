import React from "react";
import { Link } from "@inertiajs/react";
import { route } from "ziggy-js";
import PropTypes from "prop-types";

BuyerFavorites.propTypes = {
    favorites: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            property: PropTypes.shape({
                id: PropTypes.number.isRequired,
                title: PropTypes.string.isRequired,
                location: PropTypes.string.isRequired
            }).isRequired
        })
    ).isRequired
};  

export default function BuyerFavorites({ favorites = [] }) {
    return (
        <div className="bg-white p-6 rounded shadow mt-6">
            <h2 className="text-xl font-bold mb-4">My Saved Properties</h2>

            {favorites.length === 0 ? (
                <p className="text-gray-500">No saved properties yet.</p>
            ) : (
                <div className="space-y-4">
                    {favorites.map((fav) => (
                        <div
                            key={fav.id}
                            className="flex justify-between items-center border-b pb-2"
                        >
                            <div>
                                <h3 className="font-semibold">
                                    {fav.property.title}
                                </h3>
                                <p className="text-sm text-gray-500">
                                    {fav.property.location}
                                </p>
                            </div>

                            <Link
                                href={route("properties.show", fav.property.id)}
                                className="text-blue-600"
                            >
                                View
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}