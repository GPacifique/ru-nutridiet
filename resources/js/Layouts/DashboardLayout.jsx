import React from "react";
import { Link, usePage } from "@inertiajs/react";

export default function DashboardLayout({ children }) {

    const { auth } = usePage().props;

    const menuItems = [
        {
            name: "Dashboard",
            href: route("dashboard"),
            icon: "🏠",
        },
        {
            name: "My Profile",
            href: "#",
            icon: "👤",
        },
        {
            name: "Meal Plans",
            href: "#",
            icon: "🥗",
        },
        {
            name: "Appointments",
            href: "#",
            icon: "📅",
        },
        {
            name: "Progress Tracking",
            href: "#",
            icon: "📈",
        },
        {
            name: "Messages",
            href: "#",
            icon: "💬",
        },
        {
            name: "Health Articles",
            href: "#",
            icon: "📰",
        },
    ];


    return (

        <div className="min-h-screen bg-gray-100 flex">


            {/* Sidebar */}
            <aside className="w-64 bg-green-900 text-white hidden md:flex flex-col">


                <div className="p-6 border-b border-green-700">

                    <h1 className="text-2xl font-bold">
                        RUNUTRIDIET
                    </h1>

                    <p className="text-green-200 text-sm">
                        Nutrition Clinic
                    </p>

                </div>


                <nav className="flex-1 p-4 space-y-2">


                    {menuItems.map((item, index) => (

                        <Link
                            key={index}
                            href={item.href}
                            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-green-800 transition"
                        >

                            <span>
                                {item.icon}
                            </span>

                            <span>
                                {item.name}
                            </span>

                        </Link>

                    ))}


                </nav>


                <div className="p-4 border-t border-green-700">


                    <Link
                        href={route("logout")}
                        method="post"
                        as="button"
                        className="w-full text-left px-4 py-3 rounded-lg hover:bg-green-800"
                    >

                        🚪 Logout

                    </Link>


                </div>


            </aside>



            {/* Main Area */}
            <div className="flex-1 flex flex-col">


                {/* Header */}
                <header className="bg-white shadow px-6 py-4 flex justify-between items-center">


                    <div>

                        <h2 className="text-xl font-semibold text-gray-800">
                            Nutrition Portal
                        </h2>

                    </div>



                    <div className="flex items-center gap-4">


                        <div className="text-right">

                            <p className="font-medium text-gray-800">
                                {auth?.user?.name}
                            </p>

                            <p className="text-sm text-gray-500">
                                Client
                            </p>

                        </div>


                        <div className="w-10 h-10 bg-green-700 text-white rounded-full flex items-center justify-center font-bold">

                            {auth?.user?.name?.charAt(0)}

                        </div>


                    </div>


                </header>



                {/* Page Content */}
                <main className="flex-1 p-6">

                    {children}

                </main>



            </div>


        </div>

    );
}