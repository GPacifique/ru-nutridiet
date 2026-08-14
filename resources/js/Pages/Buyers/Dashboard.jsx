import React from "react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import DashboardModules from "@/Components/DashboardModules";

export default function BuyersDashboard({
    stats = [],
    orders = [],
    activities = [],
}) {
    return (
        <DashboardLayout>
            <div className="p-6 space-y-6">

                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">
                        Buyer Dashboard
                    </h1>
                    <p className="text-gray-500">
                        Manage your orders, payments, and activity
                    </p>
                </div>

                {/* Stats */}
                {stats.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className="bg-white border shadow rounded-lg p-4"
                            >
                                <p className="text-sm text-gray-500">
                                    {stat.label}
                                </p>
                                <p className="text-xl font-semibold text-gray-800">
                                    {stat.value}
                                </p>

                                {stat.change && (
                                    <p
                                        className={`text-xs mt-1 ${
                                            stat.changeType === "positive"
                                                ? "text-green-600"
                                                : "text-red-600"
                                        }`}
                                    >
                                        {stat.change}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* Orders Section */}
                <div className="bg-white border shadow rounded-lg p-4">
                    <h2 className="text-lg font-semibold mb-4">
                        Recent Orders
                    </h2>

                    {orders.length === 0 ? (
                        <p className="text-sm text-gray-500">
                            No orders yet.
                        </p>
                    ) : (
                        <div className="space-y-3">
                            {orders.map((order, index) => (
                                <div
                                    key={index}
                                    className="flex justify-between items-center border-b pb-2"
                                >
                                    <div>
                                        <p className="font-medium text-gray-800">
                                            {order.title}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Order ID: #{order.id}
                                        </p>
                                    </div>

                                    <div className="text-right">
                                        <p className="text-sm font-semibold">
                                            ${order.amount}
                                        </p>
                                        <span
                                            className={`text-xs px-2 py-1 rounded ${
                                                order.status === "Completed"
                                                    ? "bg-green-100 text-green-600"
                                                    : order.status === "Pending"
                                                    ? "bg-yellow-100 text-yellow-600"
                                                    : "bg-blue-100 text-blue-600"
                                            }`}
                                        >
                                            {order.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Bottom Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* Activity */}
                    <div className="bg-white border shadow rounded-lg p-4">
                        <h2 className="text-lg font-semibold mb-4">
                            Recent Activity
                        </h2>

                        {activities.length === 0 ? (
                            <p className="text-sm text-gray-500">
                                No recent activity.
                            </p>
                        ) : (
                            <ul className="space-y-3">
                                {activities.map((item, index) => (
                                    <li
                                        key={index}
                                        className="text-sm text-gray-600 border-b pb-2"
                                    >
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white border shadow rounded-lg p-4">
                        <h2 className="text-lg font-semibold mb-4">
                            Quick Actions
                        </h2>

                        <div className="space-y-2 text-sm text-gray-600">
                            <p>🛒 Browse Services</p>
                            <p>💬 Contact Seller</p>
                            <p>📦 Track Orders</p>
                            <p>⚙️ Account Settings</p>
                        </div>
                    </div>

                </div>

                <DashboardModules modules={[
                    { key: 'orders', title: 'Orders', desc: 'Manage orders and invoices', action: { href: '/orders', label: 'Open' } },
                    { key: 'invoices', title: 'Invoices', desc: 'View and download invoices', action: { href: '/invoices', label: 'Open' } },
                    { key: 'support', title: 'Support', desc: 'Contact seller or support team', action: { href: '/support', label: 'Open' } },
                ]} />
            </div>
        </DashboardLayout>
    );
}