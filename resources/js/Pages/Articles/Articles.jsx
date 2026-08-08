import React from "react";
import { Link, usePage } from "@inertiajs/react";
import ArticlesList from "@/Components/ArticlesList";

export default function Article() {
    const { article } = usePage().props;

    return (
        <div className="max-w-4xl mx-auto px-6 py-10">
<ArticlesList/>
            {/* BACK */}
            <Link
                href="/articles"
                className="text-red-600 font-medium hover:underline"
            >
                ← Back to Articles
            </Link>

            {/* TITLE */}
            <h1 className="text-4xl font-bold mt-4">
                {article.title}
            </h1>

            {/* META */}
            <p className="text-gray-500 mt-2">
                By {article.author?.name} • {article.views} views
            </p>

            {/* CATEGORY */}
            <div className="mt-3">
                <span className="bg-gray-200 text-sm px-2 py-1 rounded">
                    {article.category?.name}
                </span>
            </div>

            {/* IMAGE */}
            {article.featured_image && (
                <img
                    src={`/articles/${article.featured_image}`}
                    alt={article.title}
                    className="w-full h-80 object-cover rounded-lg mt-6"
                />
            )}

            {/* CONTENT */}
            <div className="mt-6 text-gray-700 leading-relaxed">
                {article.content}
            </div>

        </div>
    );
}