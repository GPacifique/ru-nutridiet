import React from "react";

export default function ApplicationLogo({ className = "" }) {
    return (
        <div className={`flex items-center gap-3 ${className}`}>

            {/* Logo Icon */}
            <div className="w-12 h-12 rounded-full bg-green-700 flex items-center justify-center text-white font-bold text-2xl">

                R

            </div>


            {/* Brand Name */}
            <div>

                <h1 className="text-2xl font-bold text-green-700 leading-tight">
                    RUNUTRIDIET
                </h1>

                <p className="text-sm text-gray-500">
                    Nutrition Clinic
                </p>

            </div>

        </div>
    );
}