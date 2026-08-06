import React, { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import {
    Search,
    Briefcase,
    Calendar,
    DollarSign,
    Eye,
    Plus,
} from "lucide-react";

export default function Index({ projects }) {
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("all");

    const projectList = Array.isArray(projects)
        ? projects
        : projects?.data || [];

    const filteredProjects = projectList.filter((project) => {
        const matchesSearch =
            project.title
                ?.toLowerCase()
                .includes(search.toLowerCase()) ||
            project.description
                ?.toLowerCase()
                .includes(search.toLowerCase());

        const matchesStatus =
            status === "all" ||
            project.status === status;

        return matchesSearch && matchesStatus;
    });

    const statusBadge = (status) => {
        switch (status) {
            case "open":
                return "bg-green-100 text-green-700";
            case "in_progress":
                return "bg-blue-100 text-blue-700";
            case "completed":
                return "bg-indigo-100 text-indigo-700";
            case "cancelled":
                return "bg-red-100 text-red-700";
            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    return (
        <DashboardLayout>
            <Head title="Projects" />

            <div className="space-y-6">

                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Projects
                        </h1>

                        <p className="text-gray-500">
                            Manage freelance projects and contracts.
                        </p>
                    </div>

                    <Link
                        href="/projects/create"
                        className="inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-3 rounded-xl hover:bg-indigo-700"
                    >
                        <Plus size={18} />
                        Post Project
                    </Link>
                </div>

                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4">

                    <div className="relative flex-1">
                        <Search
                            size={18}
                            className="absolute left-3 top-3 text-gray-400"
                        />

                        <input
                            type="text"
                            placeholder="Search projects..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                            className="w-full pl-10 pr-4 py-3 border rounded-xl"
                        />
                    </div>

                    <select
                        value={status}
                        onChange={(e) =>
                            setStatus(e.target.value)
                        }
                        className="px-4 py-3 border rounded-xl"
                    >
                        <option value="all">
                            All Status
                        </option>
                        <option value="open">
                            Open
                        </option>
                        <option value="in_progress">
                            In Progress
                        </option>
                        <option value="completed">
                            Completed
                        </option>
                        <option value="cancelled">
                            Cancelled
                        </option>
                    </select>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

                    <div className="bg-white p-6 rounded-2xl shadow">
                        <p className="text-gray-500">
                            Total Projects
                        </p>

                        <h2 className="text-3xl font-bold mt-2">
                            {projectList.length}
                        </h2>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow">
                        <p className="text-gray-500">
                            Open
                        </p>

                        <h2 className="text-3xl font-bold mt-2 text-green-600">
                            {
                                projectList.filter(
                                    (p) =>
                                        p.status === "open"
                                ).length
                            }
                        </h2>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow">
                        <p className="text-gray-500">
                            In Progress
                        </p>

                        <h2 className="text-3xl font-bold mt-2 text-blue-600">
                            {
                                projectList.filter(
                                    (p) =>
                                        p.status ===
                                        "in_progress"
                                ).length
                            }
                        </h2>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow">
                        <p className="text-gray-500">
                            Completed
                        </p>

                        <h2 className="text-3xl font-bold mt-2 text-indigo-600">
                            {
                                projectList.filter(
                                    (p) =>
                                        p.status ===
                                        "completed"
                                ).length
                            }
                        </h2>
                    </div>

                </div>

                {/* Projects Grid */}
                {filteredProjects.length === 0 ? (
                    <div className="bg-white rounded-2xl p-12 text-center shadow">
                        <Briefcase
                            size={50}
                            className="mx-auto text-gray-400"
                        />

                        <h3 className="mt-4 text-xl font-semibold">
                            No Projects Found
                        </h3>

                        <p className="text-gray-500">
                            Try adjusting your filters.
                        </p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

                        {filteredProjects.map((project) => (
                            <div
                                key={project.id}
                                className="bg-white rounded-2xl shadow hover:shadow-lg transition"
                            >
                                <div className="p-6">

                                    <div className="flex justify-between items-start">
                                        <h3 className="font-bold text-lg">
                                            {project.title}
                                        </h3>

                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-medium ${statusBadge(
                                                project.status
                                            )}`}
                                        >
                                            {project.status}
                                        </span>
                                    </div>

                                    <p className="text-gray-500 mt-3 line-clamp-3">
                                        {project.description}
                                    </p>

                                    <div className="mt-5 space-y-3">

                                        <div className="flex items-center gap-2 text-sm">
                                            <DollarSign size={16} />
                                            Budget:
                                            <strong>
                                                $
                                                {project.budget}
                                            </strong>
                                        </div>

                                        <div className="flex items-center gap-2 text-sm">
                                            <Calendar size={16} />
                                            Deadline:
                                            <strong>
                                                {
                                                    project.deadline
                                                }
                                            </strong>
                                        </div>

                                        <div className="flex items-center gap-2 text-sm">
                                            <Briefcase size={16} />
                                            Client:
                                            <strong>
                                                {project.client
                                                    ?.name ||
                                                    "N/A"}
                                            </strong>
                                        </div>

                                    </div>

                                    <div className="mt-6 flex justify-between items-center">

                                        <Link
                                            href={`/projects/${project.id}`}
                                            className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800"
                                        >
                                            <Eye size={18} />
                                            View Details
                                        </Link>

                                        <span className="text-xs text-gray-500">
                                            #{project.id}
                                        </span>

                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                )}

                {/* Pagination */}
                {projects?.links && (
                    <div className="flex flex-wrap gap-2">

                        {projects.links.map(
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