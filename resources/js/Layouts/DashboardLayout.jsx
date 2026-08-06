import React, { useEffect, useRef, useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Briefcase,
    DollarSign,
    Users,
    Bell,
    Moon,
    Sun,
    ChevronDown,
    LogOut,
    Menu,
    X,
    Settings,
    FolderKanban,
} from "lucide-react";

export default function DashboardLayout({ children }) {
    const { auth, notifications = [] } = usePage().props;

    const role = auth?.user?.role || "buyer";

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [notifOpen, setNotifOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);

    const notifRef = useRef(null);
    const profileRef = useRef(null);

    /* -------------------------------
       LOAD SETTINGS
    --------------------------------*/
    useEffect(() => {
        const savedSidebar =
            localStorage.getItem("sidebar");

        const savedTheme =
            localStorage.getItem("theme");

        setCollapsed(savedSidebar === "collapsed");
        setDarkMode(savedTheme === "dark");
    }, []);

    useEffect(() => {
        localStorage.setItem(
            "sidebar",
            collapsed ? "collapsed" : "expanded"
        );
    }, [collapsed]);

    useEffect(() => {
        localStorage.setItem(
            "theme",
            darkMode ? "dark" : "light"
        );

        if (darkMode) {
            document.documentElement.classList.add(
                "dark"
            );
        } else {
            document.documentElement.classList.remove(
                "dark"
            );
        }
    }, [darkMode]);

    /* -------------------------------
       CLOSE DROPDOWNS
    --------------------------------*/
    useEffect(() => {
        const closeDropdowns = (e) => {
            if (
                notifRef.current &&
                !notifRef.current.contains(e.target)
            ) {
                setNotifOpen(false);
            }

            if (
                profileRef.current &&
                !profileRef.current.contains(e.target)
            ) {
                setProfileOpen(false);
            }
        };

        document.addEventListener(
            "mousedown",
            closeDropdowns
        );

        return () =>
            document.removeEventListener(
                "mousedown",
                closeDropdowns
            );
    }, []);

    const menus = {
        admin: [
            {
                name: "Dashboard",
                href: "/admin",
                icon: LayoutDashboard,
            },
            {
                name: "Users",
                href: "/users",
                icon: Users,
            },
            {
                name: "Products",
                href: "/products",
                icon: Package,
            },
            {
                name: "Projects",
                href: "/projects",
                icon: FolderKanban,
            },
            {
                name: "Settings",
                href: "/settings",
                icon: Settings,
            },
        ],

        seller: [
            {
                name: "Dashboard",
                href: "/dashboard",
                icon: LayoutDashboard,
            },
            {
                name: "Products",
                href: "/products",
                icon: Package,
            },
            {
                name: "Orders",
                href: "/orders",
                icon: ShoppingCart,
            },
            {
                name: "Earnings",
                href: "/earnings",
                icon: DollarSign,
            },
        ],

        freelancer: [
            {
                name: "Dashboard",
                href: "/dashboard",
                icon: LayoutDashboard,
            },
            {
                name: "Projects",
                href: "/projects",
                icon: Briefcase,
            },
            {
                name: "Proposals",
                href: "/proposals",
                icon: FolderKanban,
            },
            {
                name: "Earnings",
                href: "/earnings",
                icon: DollarSign,
            },
        ],

        buyer: [
            {
                name: "Dashboard",
                href: "/dashboard",
                icon: LayoutDashboard,
            },
            {
                name: "Marketplace",
                href: "/marketplace",
                icon: Package,
            },
            {
                name: "Orders",
                href: "/orders",
                icon: ShoppingCart,
            },
        ],
    };

    const menu =
        menus[role] || menus.buyer;

    const isActive = (href) =>
        window.location.pathname.startsWith(href);

    return (
        <div className="min-h-screen bg-gray-100">

            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() =>
                        setSidebarOpen(false)
                    }
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
                fixed top-0 left-0 z-50 h-full bg-slate-900 text-white
                transition-all duration-300
                ${collapsed ? "w-20" : "w-72"}
                ${
                    sidebarOpen
                        ? "translate-x-0"
                        : "-translate-x-full lg:translate-x-0"
                }
            `}
            >
                {/* Logo */}
                <div className="h-20 flex items-center px-5 border-b border-slate-800">

                    <div className="w-11 h-11 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
                        STL
                    </div>

                    {!collapsed && (
                        <div className="ml-3">
                            <h2 className="font-bold text-lg">
                                SharpTechL
                            </h2>

                            <p className="text-xs text-slate-400">
                                Digital Marketplace
                            </p>
                        </div>
                    )}
                </div>

                {/* Navigation */}
                <nav className="p-4 space-y-2">

                    {menu.map((item) => {
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`
                                    flex items-center gap-3 px-4 py-3 rounded-xl transition
                                    ${
                                        isActive(
                                            item.href
                                        )
                                            ? "bg-indigo-600"
                                            : "hover:bg-slate-800"
                                    }
                                `}
                            >
                                <Icon size={20} />

                                {!collapsed && (
                                    <span>
                                        {item.name}
                                    </span>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Collapse Button */}
                <div className="absolute bottom-5 left-0 right-0 px-4">

                    <button
                        onClick={() =>
                            setCollapsed(
                                !collapsed
                            )
                        }
                        className="w-full bg-slate-800 py-3 rounded-xl"
                    >
                        {collapsed
                            ? "→"
                            : "Collapse"}
                    </button>
                </div>
            </aside>

            {/* Main */}
            <div
                className={`transition-all duration-300 ${
                    collapsed
                        ? "lg:ml-20"
                        : "lg:ml-72"
                }`}
            >
                {/* Header */}
                <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">

                    <div className="flex items-center gap-4">

                        <button
                            onClick={() =>
                                setSidebarOpen(true)
                            }
                            className="lg:hidden"
                        >
                            <Menu />
                        </button>

                        <div>
                            <h1 className="text-xl font-bold">
                                Welcome Back,
                                {" "}
                                {auth?.user?.name}
                            </h1>

                            <p className="text-sm text-gray-500">
                                Manage your marketplace
                                activity.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">

                        {/* Theme */}
                        <button
                            onClick={() =>
                                setDarkMode(
                                    !darkMode
                                )
                            }
                            className="p-2 rounded-xl bg-gray-100"
                        >
                            {darkMode ? (
                                <Sun size={18} />
                            ) : (
                                <Moon size={18} />
                            )}
                        </button>

                        {/* Notifications */}
                        <div
                            ref={notifRef}
                            className="relative"
                        >
                            <button
                                onClick={() =>
                                    setNotifOpen(
                                        !notifOpen
                                    )
                                }
                                className="relative p-2 rounded-xl bg-gray-100"
                            >
                                <Bell size={18} />

                                {notifications.length >
                                    0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
                                        {
                                            notifications.length
                                        }
                                    </span>
                                )}
                            </button>

                            {notifOpen && (
                                <div className="absolute right-0 mt-3 w-80 bg-white rounded-xl shadow-xl z-50">
                                    <div className="p-4 border-b">
                                        Notifications
                                    </div>

                                    {notifications.length ===
                                    0 ? (
                                        <div className="p-4 text-gray-500">
                                            No notifications
                                        </div>
                                    ) : (
                                        notifications.map(
                                            (
                                                n,
                                                i
                                            ) => (
                                                <div
                                                    key={
                                                        i
                                                    }
                                                    className="p-4 border-b"
                                                >
                                                    {
                                                        n.message
                                                    }
                                                </div>
                                            )
                                        )
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Profile */}
                        <div
                            ref={profileRef}
                            className="relative"
                        >
                            <button
                                onClick={() =>
                                    setProfileOpen(
                                        !profileOpen
                                    )
                                }
                                className="flex items-center gap-3"
                            >
                                <img
                                    src={`https://ui-avatars.com/api/?name=${auth?.user?.name}`}
                                    alt="avatar"
                                    className="w-10 h-10 rounded-full border-2 border-indigo-500"
                                />

                                <ChevronDown
                                    size={18}
                                />
                            </button>

                            {profileOpen && (
                                <div className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-xl z-50">

                                    <div className="p-4 border-b">
                                        <h4 className="font-semibold">
                                            {
                                                auth
                                                    ?.user
                                                    ?.name
                                            }
                                        </h4>

                                        <p className="text-sm text-gray-500">
                                            {
                                                auth
                                                    ?.user
                                                    ?.email
                                            }
                                        </p>
                                    </div>

                                    <Link
                                        href="/profile"
                                        className="block px-4 py-3 hover:bg-gray-100"
                                    >
                                        Profile
                                    </Link>

                                    <Link
                                        href="/settings"
                                        className="block px-4 py-3 hover:bg-gray-100"
                                    >
                                        Settings
                                    </Link>

                                    <Link
                                        href={route(
                                            "logout"
                                        )}
                                        method="post"
                                        as="button"
                                        className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50"
                                    >
                                        <div className="flex items-center gap-2">
                                            <LogOut
                                                size={
                                                    16
                                                }
                                            />
                                            Logout
                                        </div>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}