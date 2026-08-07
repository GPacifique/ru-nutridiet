import React from "react";
import { Link, usePage } from "@inertiajs/react";

export default function LearnerDashboardLayout({ children }) {

    const { auth } = usePage().props;


    const menuItems = [
        {
            name: "Dashboard",
            href: route("learner.dashboard"),
            icon: "🏠",
        },
        {
            name: "My Courses",
            href: route("learner.courses.index"),
            icon: "📚",
        },
        {
            name: "My Enrollments",
            href: route("learner.courseenrollments.index"),
            icon: "📝",
        },
        {
            name: "Certificates",
            href: route("learner.certificates.index"),
            icon: "🏆",
        },
        {
            name: "Profile",
            href: route("profile.edit"),

            icon: "👤",
        },
    ];


    return (
        <div className="min-h-screen bg-gray-100 flex">


            {/* Sidebar */}
            <aside className="w-64 bg-green-900 text-white hidden md:flex flex-col">


                {/* Logo */}
                <div className="p-6 border-b border-green-700">

                    <h1 className="text-xl font-bold">
                        RUNUTRIDIET-CPT
                    </h1>

                    <p className="text-sm text-green-200">
                        Learning Portal
                    </p>

                </div>



                {/* Navigation */}
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



                {/* Logout */}
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




            {/* Main Content */}
            <div className="flex-1 flex flex-col">


                {/* Header */}
                <header className="bg-white shadow px-6 py-4 flex justify-between items-center">


                    <div>

                        <h2 className="text-xl font-semibold text-gray-800">
                            Learner Portal
                        </h2>

                        <p className="text-sm text-gray-500">
                            Nutrition & Wellness Education
                        </p>

                    </div>



                    <div className="flex items-center gap-3">


                        <div className="text-right">

                            <p className="font-semibold">
                                {auth?.user?.name}
                            </p>

                            <p className="text-sm text-gray-500">
                                Learner
                            </p>

                        </div>


                        <div className="w-10 h-10 rounded-full bg-green-700 text-white flex items-center justify-center font-bold">

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