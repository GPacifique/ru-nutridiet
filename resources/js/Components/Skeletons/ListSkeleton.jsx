import React from "react";

export default function ListSkeleton() {
    return (
        <div className="bg-white p-6 rounded shadow animate-pulse space-y-4">
            {[1, 2, 3].map((item) => (
                <div key={item} className="flex justify-between">
                    <div className="h-4 bg-gray-200 w-1/3 rounded"></div>
                    <div className="h-4 bg-gray-200 w-1/4 rounded"></div>
                </div>
            ))}
        </div>
    );
}