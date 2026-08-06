import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    Line,
} from "recharts";

export default function AgentDashboardStats({ stats, chart }) {
    // 🛡 SAFE DEFAULTS (FIXES CRASH)
    const safeStats = stats || {};
    const safeChart = chart || {};

    return (
        <div className="space-y-6">

            {/* 📊 STATS CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

                <div className="p-4 bg-white shadow rounded-lg">
                    <h3 className="text-gray-500">Total Properties</h3>
                    <p className="text-2xl font-bold">
                        {safeStats.total_properties ?? 0}
                    </p>
                </div>

                <div className="p-4 bg-white shadow rounded-lg">
                    <h3 className="text-gray-500">Inquiries</h3>
                    <p className="text-2xl font-bold">
                        {safeStats.total_inquiries ?? 0}
                    </p>
                </div>

                <div className="p-4 bg-white shadow rounded-lg">
                    <h3 className="text-gray-500">Bookings</h3>
                    <p className="text-2xl font-bold">
                        {safeStats.total_bookings ?? 0}
                    </p>
                </div>

                <div className="p-4 bg-white shadow rounded-lg">
                    <h3 className="text-gray-500">Favorites</h3>
                    <p className="text-2xl font-bold">
                        {safeStats.total_favorites ?? 0}
                    </p>
                </div>

            </div>

            {/* 📈 CHARTS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div className="bg-white p-4 shadow rounded-lg">
                    <h2 className="font-semibold mb-4">Properties Growth</h2>

                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={safeChart.properties_per_month || []}>
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="total" fill="#3b82f6" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white p-4 shadow rounded-lg">
                    <h2 className="font-semibold mb-4">Bookings Growth</h2>

                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={safeChart.bookings_per_month || []}>
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="total" stroke="#10b981" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

            </div>
        </div>
    );
}