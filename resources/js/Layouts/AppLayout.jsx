import React, { useState, useEffect } from "react";
import { Link, usePage, router } from "@inertiajs/react";
import "../../css/app.css";
export default function AppLayout({ children, title }) {
    const { auth } = usePage().props;
    const user = auth?.user;

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const logout = () => {
        router.post("/logout");
    };

    // GLOBAL LOADING (ALL INERTIA NAVIGATION)
    useEffect(() => {
        const start = router.on("start", () => setLoading(true));
        const finish = router.on("finish", () => setLoading(false));

        return () => {
            start();
            finish();
        };
    }, []);

    // Role-based menu
    const menuItems = {
        admin: [
            { name: "Dashboard", link: "/admin/dashboard" },
            { name: "Users", link: "/admin/users" },
            { name: "Properties", link: "/admin/properties" },
            { name: "Reports", link: "/admin/reports" },
        ],

        agent: [
            { name: "Dashboard", link: "/agent/dashboard" },
            { name: "My Listings", link: "/agent/properties" },
            { name: "Clients", link: "/agent/clients" },
            { name: "Appointments", link: "/agent/appointments" },
        ],

        owner: [
            { name: "Dashboard", link: "/owner/dashboard" },
            { name: "My Properties", link: "/owner/properties" },
            { name: "Appointments", link: "/owner/appointments" },
        ],

        buyer: [
            { name: "Dashboard", link: "/buyer/dashboard" },
            { name: "Browse Properties", link: "/buyer/properties" },
            { name: "Saved Properties", link: "/buyer/saved-listings" },
            { name: "Appointments", link: "/buyer/appointments" },
        ],
    };

    const links = menuItems[user?.role] || [];

    return (
        <div className="min-h-screen bg-gray-100 flex">

            {/* GLOBAL LOADER */}
            {loading && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-[9999]">
                    <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}

            {/* SIDEBAR */}
            <aside
                className={`bg-gray-900 text-white w-64 min-h-screen p-5 fixed md:relative z-50 transition-all
                ${sidebarOpen ? "block" : "hidden"} md:block`}
            >
                <h2 className="text-2xl font-bold mb-8">
                    InzuHost
                </h2>

                <nav className="space-y-3">
                    {links.map((item, index) => (
                        <Link
                            key={index}
                            href={item.link}
                            className="block p-3 rounded-lg hover:bg-gray-700"
                            onClick={() => setSidebarOpen(false)}
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>
            </aside>

            {/* MAIN CONTENT */}
            <div className="flex-1 flex flex-col">

                {/* TOP NAVBAR */}
                <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <button
                            className="md:hidden bg-gray-200 px-3 py-1 rounded"
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                        >
                            ☰
                        </button>

                        <h1 className="text-2xl font-bold">
                            {title || "Dashboard"}
                        </h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="text-gray-600">
                            {user?.name}
                        </span>

                        <button
                            onClick={logout}
                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                        >
                            Logout
                        </button>
                    </div>
                </header>

                {/* WELCOME HEADER */}
                <div className="bg-blue-600 text-white px-6 py-6">
                    <h2 className="text-xl font-semibold">
                        Welcome back, {user?.name}
                    </h2>
                    <p className="text-sm mt-1 capitalize">
                        Role: {user?.role}
                    </p>
                </div>

                {/* PAGE CONTENT */}
                <main className="p-6 flex-1">
                    {children}
                </main>
            </div>
        </div>
    );
}