import React from "react";

export default function BuyerStats({ favoritesCount = 0, inquiriesCount = 0 }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="bg-white p-6 rounded shadow">
                <h3 className="text-gray-500">Saved Properties</h3>
                <p className="text-3xl font-bold">{favoritesCount}</p>
            </div>

            <div className="bg-white p-6 rounded shadow">
                <h3 className="text-gray-500">My Inquiries</h3>
                <p className="text-3xl font-bold">{inquiriesCount}</p>
            </div>

        </div>
    );
}