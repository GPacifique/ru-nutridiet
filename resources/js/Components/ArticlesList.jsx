import React from "react";
import { Link } from "@inertiajs/react";

export default function ArticlesList({ articles }) {
    return (
        <div className="grid md:grid-cols-3 gap-6">

            {articles?.data?.length > 0 ? (
                articles.data.map((article) => (
                    <div
                        key={article.id}
                        className="bg-white shadow rounded-xl overflow-hidden"
                    >

                        {/* IMAGE */}
                        {article.featured_image && (
                            <img
                                src={`/articles/${article.featured_image}`}
                                alt={article.title}
                                className="w-full h-48 object-cover"
                            />
                        )}

                        <div className="p-4">

                            {/* CATEGORY */}
                            <Link
                                href={`/category/${article.category?.slug}`}
                                className="text-xs bg-gray-200 px-2 py-1 rounded"
                            >
                                {article.category?.name}
                            </Link>

                            {/* TITLE */}
                            <h2 className="text-xl font-bold mt-2">
                                {article.title}
                            </h2>

                            {/* META */}
                            <p className="text-sm text-gray-500 mt-1">
                                By {article.author?.name} • {article.views} views
                            </p>

                            {/* EXCERPT */}
                            <p className="text-gray-600 text-sm mt-2">
                                {article.excerpt}
                            </p>

                            {/* ACTIONS */}
                            <div className="flex justify-between mt-4">

                                <Link
                                    href={`/articles/${article.slug}`}
                                    className="text-green-600 font-medium"
                                >
                                    Read
                                </Link>

                                <Link
                                    href={`/manage/articles/${article.id}/edit`}
                                    className="text-blue-600 font-medium"
                                >
                                    Edit
                                </Link>

                            </div>

                        </div>
                    </div>
                ))
            ) : (
                <p className="text-gray-500 col-span-3">
                    No articles found.
                </p>
            )}

        </div>
    );
}