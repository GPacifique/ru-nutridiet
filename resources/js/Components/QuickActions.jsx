import React from "react";
import { router } from "@inertiajs/react";

export default function QuickActions({ user }) {
    const role = user?.role;

    const go = (route) => {
        router.visit(route);
    };

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

            {/* 🏠 ADD PROPERTY (Agent/Owner only) */}
            {(role === "agent" || role === "owner") && (
                <button
                    onClick={() => go("/properties/create")}
                    className="bg-blue-600 text-white p-4 rounded-lg shadow hover:bg-blue-700"
                >
                    ➕ Add Property
                </button>
            )}

            {/* 📊 DASHBOARD */}
            {(role === "agent" || role === "owner" || role === "admin") && (
                <button
                    onClick={() => go("/dashboard")}
                    className="bg-green-600 text-white p-4 rounded-lg shadow hover:bg-green-700"
                >
                    📊 Dashboard
                </button>
            )}

            {/* ❤️ FAVORITES (BUYERS + ALL USERS) */}
            <button
                onClick={() => go("/favorites")}
                className="bg-pink-600 text-white p-4 rounded-lg shadow hover:bg-pink-700"
            >
                ❤️ Favorites
            </button>

            {/* 📅 BOOKINGS */}
            <button
                onClick={() => go("/bookings")}
                className="bg-purple-600 text-white p-4 rounded-lg shadow hover:bg-purple-700"
            >
                📅 Bookings
            </button>

            {/* 🏘 VIEW PROPERTIES */}
            <button
                onClick={() => go("/properties")}
                className="bg-gray-800 text-white p-4 rounded-lg shadow hover:bg-gray-900"
            >
                🏘 Properties
            </button>

            {/* ⚙️ ADMIN PANEL */}
            {role === "admin" && (
                <button
                    onClick={() => go("/admin")}
                    className="bg-red-600 text-white p-4 rounded-lg shadow hover:bg-red-700"
                >
                    ⚙️ Admin Panel
                </button>
            )}

        </div>
    );
}