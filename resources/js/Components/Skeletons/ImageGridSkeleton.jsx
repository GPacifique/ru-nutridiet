import React from "react";

export default function ImageGridSkeleton() {
    return (
        <div className="grid md:grid-cols-3 gap-4 animate-pulse">
            {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="h-40 bg-gray-200 rounded"></div>
            ))}
        </div>
    );
}