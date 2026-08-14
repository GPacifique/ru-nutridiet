import React from "react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import DashboardModules from '@/Components/DashboardModules';

export default function FreelancerDashboard() {
    const stats = [
        { label: "Total Earnings", value: "$2,450" },
        { label: "Active Projects", value: "5" },
        { label: "Completed Jobs", value: "18" },
        { label: "Pending Proposals", value: "3" },
    ];

    const projects = [
        { name: "E-commerce Website", status: "In Progress", deadline: "2026-07-05" },
        { name: "Mobile App UI Design", status: "Review", deadline: "2026-06-30" },
        { name: "API Integration", status: "Completed", deadline: "2026-06-20" },
    ];

    const activities = [
        "Client approved your proposal for UI redesign",
        "You received a new message from John Doe",
        "Payment of $300 received",
        "New project invitation sent to you",
    ];

    return (
        <DashboardLayout>
            <div className="p-6 space-y-6">

                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">
                        Freelancer Dashboard
                    </h1>
                    <p className="text-gray-500">
                        Overview of your freelance performance and activity
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="bg-white shadow rounded-lg p-4 border"
                        >
                            <p className="text-gray-500 text-sm">{stat.label}</p>
                            <p className="text-xl font-semibold text-gray-800">
                                {stat.value}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Projects + Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* Projects */}
                    <div className="bg-white shadow rounded-lg p-4 border">
                        <h2 className="text-lg font-semibold mb-4">
                            Recent Projects
                        </h2>

                        <div className="space-y-3">
                            {projects.map((project, index) => (
                                <div
                                    key={index}
                                    className="flex justify-between items-center border-b pb-2"
                                >
                                    <div>
                                        <p className="font-medium text-gray-800">
                                            {project.name}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Deadline: {project.deadline}
                                        </p>
                                    </div>

                                    <span
                                        className={`text-xs px-2 py-1 rounded ${
                                            project.status === "Completed"
                                                ? "bg-green-100 text-green-600"
                                                : project.status === "In Progress"
                                                ? "bg-blue-100 text-blue-600"
                                                : "bg-yellow-100 text-yellow-600"
                                        }`}
                                    >
                                        {project.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Activity */}
                    <div className="bg-white shadow rounded-lg p-4 border">
                        <h2 className="text-lg font-semibold mb-4">
                            Recent Activity
                        </h2>

                        <ul className="space-y-3">
                            {activities.map((activity, index) => (
                                <li
                                    key={index}
                                    className="text-sm text-gray-600 border-b pb-2"
                                >
                                    {activity}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <DashboardModules modules={[
                    { key: 'projects', title: 'Projects', desc: 'Manage your active projects', action: { href: '/freelancer/projects', label: 'Open' } },
                    { key: 'proposals', title: 'Proposals', desc: 'Track and submit proposals', action: { href: '/freelancer/proposals', label: 'Open' } },
                    { key: 'payments', title: 'Payments', desc: 'View earnings and invoices', action: { href: '/freelancer/payments', label: 'Open' } },
                ]} />
            </div>
        </DashboardLayout>
    );
}