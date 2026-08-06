import React from "react";
import PropertyCard from "./PropertyCard";

export default function RecommendedPropertiesList({ recommendations = [] }) {
    if (!Array.isArray(recommendations) || recommendations.length === 0) {
        return (
            <div className="text-center py-10 text-gray-500">
                <p className="text-lg font-medium">
                    No recommendations available yet
                </p>
                <p className="text-sm mt-1">
                    We will suggest properties based on your activity.
                </p>
            </div>
        );
    }

    return (
        <div className="mt-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-800">
                    Recommended Properties
                </h2>
                <span className="text-sm text-gray-500">
                    Based on your preferences
                </span>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendations.map((rec, index) => {
                    if (!rec) return null;

                    return (
                        <div
                            key={rec.id || index}
                            className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-2"
                        >
                            <PropertyCard
                                property={rec.property || rec}
                                agentNote={rec.note || ""}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}