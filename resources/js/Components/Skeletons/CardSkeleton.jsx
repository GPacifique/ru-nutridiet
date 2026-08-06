import React from "react";

export default function CardSkeleton() {
    return (
        <div className="bg-white p-6 rounded shadow animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-8 bg-gray-300 rounded w-1/2"></div>
        </div>
    );
}