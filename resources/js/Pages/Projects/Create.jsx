import React from "react";
import { Head, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Create({ categories }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        category_id: "",
        title: "",
        description: "",
        budget: "",
        deadline: "",
        status: "open",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("projects.store"), {
            onSuccess: () => reset(),
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Create Project" />

            <div className="max-w-4xl mx-auto">
                <div className="bg-white shadow rounded-lg">
                    <div className="border-b px-6 py-4">
                        <h1 className="text-2xl font-bold text-gray-800">
                            Create New Project
                        </h1>
                        <p className="text-gray-500 mt-1">
                            Post a project and receive proposals from freelancers.
                        </p>
                    </div>

                    <form onSubmit={submit} className="p-6 space-y-6">
                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Project Title
                            </label>

                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) =>
                                    setData("title", e.target.value)
                                }
                                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter project title"
                            />

                            {errors.title && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.title}
                                </p>
                            )}
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Category
                            </label>

                            <select
                                value={data.category_id}
                                onChange={(e) =>
                                    setData("category_id", e.target.value)
                                }
                                className="w-full border rounded-lg px-4 py-2"
                            >
                                <option value="">Select Category</option>

                                {categories?.map((category) => (
                                    <option
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.name}
                                    </option>
                                ))}
                            </select>

                            {errors.category_id && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.category_id}
                                </p>
                            )}
                        </div>

                        {/* Budget & Deadline */}
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Budget ($)
                                </label>

                                <input
                                    type="number"
                                    step="0.01"
                                    value={data.budget}
                                    onChange={(e) =>
                                        setData("budget", e.target.value)
                                    }
                                    className="w-full border rounded-lg px-4 py-2"
                                    placeholder="1000"
                                />

                                {errors.budget && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.budget}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Deadline
                                </label>

                                <input
                                    type="date"
                                    value={data.deadline}
                                    onChange={(e) =>
                                        setData("deadline", e.target.value)
                                    }
                                    className="w-full border rounded-lg px-4 py-2"
                                />

                                {errors.deadline && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.deadline}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Description
                            </label>

                            <textarea
                                rows="8"
                                value={data.description}
                                onChange={(e) =>
                                    setData("description", e.target.value)
                                }
                                className="w-full border rounded-lg px-4 py-2"
                                placeholder="Describe your project requirements..."
                            />

                            {errors.description && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.description}
                                </p>
                            )}
                        </div>

                        {/* Status */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Status
                            </label>

                            <select
                                value={data.status}
                                onChange={(e) =>
                                    setData("status", e.target.value)
                                }
                                className="w-full border rounded-lg px-4 py-2"
                            >
                                <option value="open">Open</option>
                                <option value="closed">Closed</option>
                                <option value="in_progress">
                                    In Progress
                                </option>
                                <option value="completed">
                                    Completed
                                </option>
                            </select>

                            {errors.status && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.status}
                                </p>
                            )}
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => window.history.back()}
                                className="px-5 py-2 border rounded-lg"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                disabled={processing}
                                className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                            >
                                {processing
                                    ? "Creating..."
                                    : "Create Project"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}