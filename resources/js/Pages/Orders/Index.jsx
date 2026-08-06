import React, { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import {
    Search,
    Eye,
    Download,
    Package,
    CreditCard,
} from "lucide-react";

export default function Index({ orders }) {
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("all");

    const orderList = Array.isArray(orders)
        ? orders
        : orders?.data || [];

    const filteredOrders = orderList.filter((order) => {
        const productName =
            order.product?.title ||
            order.product?.name ||
            "";

        const matchesSearch =
            order.id
                ?.toString()
                .includes(search) ||
            productName
                .toLowerCase()
                .includes(search.toLowerCase());

        const matchesStatus =
            status === "all" ||
            order.status === status ||
            order.payment_status === status;

        return matchesSearch && matchesStatus;
    });

    const badgeColor = (value) => {
        switch (value) {
            case "paid":
            case "completed":
                return "bg-green-100 text-green-700";

            case "pending":
                return "bg-yellow-100 text-yellow-700";

            case "processing":
                return "bg-blue-100 text-blue-700";

            case "failed":
            case "cancelled":
                return "bg-red-100 text-red-700";

            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    return (
        <DashboardLayout>
            <Head title="Orders" />

            <div className="space-y-6">

                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Orders
                        </h1>

                        <p className="text-gray-500">
                            Manage all your marketplace orders and downloads.
                        </p>
                    </div>

                    <div className="relative w-full lg:w-80">
                        <Search
                            size={18}
                            className="absolute left-3 top-3 text-gray-400"
                        />

                        <input
                            type="text"
                            placeholder="Search orders..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                            className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    <div className="bg-white rounded-2xl shadow p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">
                                    Total Orders
                                </p>

                                <h2 className="text-3xl font-bold mt-2">
                                    {orderList.length}
                                </h2>
                            </div>

                            <Package className="text-indigo-600" />
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">
                                    Completed
                                </p>

                                <h2 className="text-3xl font-bold mt-2">
                                    {
                                        orderList.filter(
                                            (o) =>
                                                o.status ===
                                                "completed"
                                        ).length
                                    }
                                </h2>
                            </div>

                            <CreditCard className="text-green-600" />
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">
                                    Pending
                                </p>

                                <h2 className="text-3xl font-bold mt-2">
                                    {
                                        orderList.filter(
                                            (o) =>
                                                o.status ===
                                                "pending"
                                        ).length
                                    }
                                </h2>
                            </div>

                            <Package className="text-yellow-600" />
                        </div>
                    </div>

                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-2">

                    {[
                        "all",
                        "pending",
                        "processing",
                        "completed",
                        "paid",
                        "failed",
                    ].map((item) => (
                        <button
                            key={item}
                            onClick={() =>
                                setStatus(item)
                            }
                            className={`px-4 py-2 rounded-xl transition ${
                                status === item
                                    ? "bg-indigo-600 text-white"
                                    : "bg-white border hover:bg-gray-50"
                            }`}
                        >
                            {item}
                        </button>
                    ))}

                </div>

                {/* Orders Table */}
                <div className="bg-white rounded-2xl shadow overflow-hidden">

                    <div className="overflow-x-auto">

                        <table className="w-full">

                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4 text-left">
                                        Order #
                                    </th>

                                    <th className="px-6 py-4 text-left">
                                        Product
                                    </th>

                                    <th className="px-6 py-4 text-left">
                                        Amount
                                    </th>

                                    <th className="px-6 py-4 text-left">
                                        Payment
                                    </th>

                                    <th className="px-6 py-4 text-left">
                                        Status
                                    </th>

                                    <th className="px-6 py-4 text-left">
                                        Date
                                    </th>

                                    <th className="px-6 py-4 text-right">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody>

                                {filteredOrders.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan="7"
                                            className="text-center py-12 text-gray-500"
                                        >
                                            No orders found.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredOrders.map(
                                        (order) => (
                                            <tr
                                                key={
                                                    order.id
                                                }
                                                className="border-t hover:bg-gray-50"
                                            >
                                                <td className="px-6 py-4 font-semibold">
                                                    #
                                                    {
                                                        order.id
                                                    }
                                                </td>

                                                <td className="px-6 py-4">
                                                    <div>
                                                        <p className="font-medium">
                                                            {order
                                                                .product
                                                                ?.title ||
                                                                "Product Removed"}
                                                        </p>

                                                        <p className="text-sm text-gray-500">
                                                            Order
                                                            ID:
                                                            {
                                                                order.order_number
                                                            }
                                                        </p>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 font-semibold text-indigo-600">
                                                    $
                                                    {
                                                        order.total_amount
                                                    }
                                                </td>

                                                <td className="px-6 py-4">
                                                    <span
                                                        className={`px-3 py-1 rounded-full text-xs font-medium ${badgeColor(
                                                            order.payment_status
                                                        )}`}
                                                    >
                                                        {
                                                            order.payment_status
                                                        }
                                                    </span>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <span
                                                        className={`px-3 py-1 rounded-full text-xs font-medium ${badgeColor(
                                                            order.status
                                                        )}`}
                                                    >
                                                        {
                                                            order.status
                                                        }
                                                    </span>
                                                </td>

                                                <td className="px-6 py-4 text-gray-500">
                                                    {new Date(
                                                        order.created_at
                                                    ).toLocaleDateString()}
                                                </td>

                                                <td className="px-6 py-4">
                                                    <div className="flex items-center justify-end gap-2">

                                                        <Link
                                                            href={`/orders/${order.id}`}
                                                            className="p-2 rounded-lg bg-indigo-100 text-indigo-600 hover:bg-indigo-200"
                                                        >
                                                            <Eye size={18} />
                                                        </Link>

                                                        {order.payment_status ===
                                                            "paid" && (
                                                            <Link
                                                                href={`/downloads/${order.id}`}
                                                                className="p-2 rounded-lg bg-green-100 text-green-600 hover:bg-green-200"
                                                            >
                                                                <Download size={18} />
                                                            </Link>
                                                        )}

                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    )
                                )}

                            </tbody>

                        </table>

                    </div>
                </div>

                {/* Pagination */}
                {orders?.links && (
                    <div className="flex flex-wrap gap-2">
                        {orders.links.map(
                            (link, index) => (
                                <Link
                                    key={index}
                                    href={link.url || "#"}
                                    dangerouslySetInnerHTML={{
                                        __html:
                                            link.label,
                                    }}
                                    className={`px-4 py-2 rounded-lg border ${
                                        link.active
                                            ? "bg-indigo-600 text-white"
                                            : "bg-white"
                                    }`}
                                />
                            )
                        )}
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}