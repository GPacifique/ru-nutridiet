import React from "react";
export default function ApplicationLogo({ className = "" }) {
    return (
        <div className={`flex items-center gap-3 ${className}`}>

            {/* Logo Icon */}
            <div className="w-20 h-20 rounded-full bg-white-200 flex items-center justify-center text-white font-bold text-2xl">

                 <img
            src="/logoru.jpg"
            alt="RUNUTRI DIET"
            className={className}
        />

            </div>
           

        </div>
    );
}