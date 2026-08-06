import React from "react";
import { Link } from "@inertiajs/react";

export default function Projects({ projects = [] }) {
    const fallbackProjects = [
        {
            id: 1,
            title: "Build a SaaS Dashboard with Laravel & React",
            budget: "$500 - $800",
            deadline: "7 days left",
            category: "Web Development",
            proposals: 12,
            level: "Intermediate",
        },
        {
            id: 2,
            title: "Design a Modern Mobile App UI/UX",
            budget: "$200 - $400",
            deadline: "3 days left",
            category: "UI/UX Design",
            proposals: 8,
            level: "Beginner",
        },
        {
            id: 3,
            title: "Fix Bugs in React E-commerce App",
            budget: "$100 - $250",
            deadline: "2 days left",
            category: "Frontend Development",
            proposals: 5,
            level: "Expert",
        },
    ];

    const data = projects.length ? projects : fallbackProjects;

    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="text-center mb-14">
                    <span className="inline-flex px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium">
                        Latest Projects
                    </span>

                    <h2 className="mt-4 text-4xl font-bold text-gray-900">
                        Freelance Opportunities Waiting for You
                    </h2>

                    <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                        Browse client projects, submit proposals, and start earning
                        as a verified freelancer on SharpTechLearners.
                    </p>
                </div>

                {/* Projects Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {data.map((project) => (
                        <div
                            key={project.id}
                            className="bg-white rounded-2xl border shadow-sm hover:shadow-lg transition p-6"
                        >
                            {/* Category Badge */}
                            <span className="inline-block px-3 py-1 text-xs bg-indigo-100 text-indigo-700 rounded-full mb-4">
                                {project.category}
                            </span>

                            {/* Title */}
                            <h3 className="text-xl font-bold text-gray-900 mb-3">
                                {project.title}
                            </h3>

                            {/* Info */}
                            <div className="space-y-2 text-sm text-gray-600">
                                <div className="flex justify-between">
                                    <span>Budget:</span>
                                    <span className="font-semibold text-gray-900">
                                        {project.budget}
                                    </span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Deadline:</span>
                                    <span>{project.deadline}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Level:</span>
                                    <span>{project.level}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Proposals:</span>
                                    <span>{project.proposals}</span>
                                </div>
                            </div>

                            {/* Action */}
                            <div className="mt-6 flex items-center justify-between">
                                <Link
                                    href={`/projects/${project.id}`}
                                    className="text-indigo-600 font-semibold hover:text-indigo-800"
                                >
                                    View Details →
                                </Link>

                                <Link
                                    href={`/projects/${project.id}/apply`}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm"
                                >
                                    Apply
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center mt-12">
                    <Link
                        href="/projects"
                        className="inline-flex px-8 py-4 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700"
                    >
                        Browse All Projects
                    </Link>
                </div>

            </div>
        </section>
    );
}