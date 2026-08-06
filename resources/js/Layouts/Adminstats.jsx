import React from "react";
import { Head, usePage } from "@inertiajs/react";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,

    BarChart,
    Bar,

    PieChart,
    Pie,
    Cell,
} from "recharts";

export default function AdminDashboard() {
    const { stats = {}, charts = {} } = usePage().props;

    const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"];

    return (
        <>
            <Head title="Admin Dashboard" />

            <div className="min-h-screen bg-gray-100 p-6">

                {/* HEADER */}
                <h1 className="text-3xl font-bold mb-6">
                    Admin Dashboard
                </h1>

                {/* STATS CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-10">

                    <div className="bg-white p-4 rounded-xl shadow">
                        <h2 className="text-gray-500">Users</h2>
                        <p className="text-2xl font-bold">{stats.users || 0}</p>
                    </div>

                    <div className="bg-white p-4 rounded-xl shadow">
                        <h2 className="text-gray-500">Agents</h2>
                        <p className="text-2xl font-bold">{stats.agents || 0}</p>
                    </div>

                    <div className="bg-white p-4 rounded-xl shadow">
                        <h2 className="text-gray-500">Properties</h2>
                        <p className="text-2xl font-bold">{stats.properties || 0}</p>
                    </div>

                    <div className="bg-white p-4 rounded-xl shadow">
                        <h2 className="text-gray-500">Verifications</h2>
                        <p className="text-2xl font-bold">{stats.verifications || 0}</p>
                    </div>

                    <div className="bg-white p-4 rounded-xl shadow">
                        <h2 className="text-gray-500">Bookings</h2>
                        <p className="text-2xl font-bold">{stats.bookings || 0}</p>
                    </div>

                </div>

                {/* CHARTS GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* USERS GROWTH */}
                    <div className="bg-white p-4 rounded-xl shadow">
                        <h2 className="font-bold mb-4">Users Growth</h2>

                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={charts.usersGrowth || []}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="users" stroke="#3B82F6" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    {/* PROPERTIES BY CATEGORY */}
                    <div className="bg-white p-4 rounded-xl shadow">
                        <h2 className="font-bold mb-4">Properties by Category</h2>

                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={charts.propertiesByCategory || []}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="count" fill="#10B981" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* VERIFICATION STATUS */}
                    <div className="bg-white p-4 rounded-xl shadow lg:col-span-2">
                        <h2 className="font-bold mb-4">Verification Status</h2>

                        <div className="flex justify-center">
                            <PieChart width={300} height={300}>
                                <Pie
                                    data={charts.verificationStatus || []}
                                    dataKey="value"
                                    nameKey="name"
                                    outerRadius={120}
                                    label
                                >
                                    {(charts.verificationStatus || []).map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}