import React from 'react';
import { Head } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import WireStrip from '@/Components/WireStrip';
import CategoryPill from '@/Components/CategoryPill';
import CommentForm from '@/Components/CommentForm';
import CommentList from '@/Components/CommentList';

/**
 * props: { article: Article & { comments: Comment[] } }
 */
export default function Show({ article }) {
    return (
        <GuestLayout>
            <Head title={article.title} />

            <article className="max-w-3xl mx-auto px-4 md:px-6 pt-10 pb-16">
                {article.category && (
                    <div className="mb-4"><CategoryPill category={article.category} active /></div>
                )}

                <h1 className="font-display font-bold text-3xl md:text-5xl leading-tight text-[#14171F]">
                    {article.title}
                </h1>

                <WireStrip
                    code={article.category?.name?.slice(0, 3).toUpperCase()}
                    timestamp={article.published_at}
                    readTime={article.read_time ? `${article.read_time} MIN READ` : null}
                    className="mt-4"
                />
                {article.author?.name && (
                    <p className="font-mono text-xs uppercase tracking-wider text-[#3A4048]/60 mt-2">
                        By {article.author.name}
                    </p>
                )}

                {article.cover_image && (
                    <img
                        src={article.cover_image}
                        alt={article.title}
                        className="w-full aspect-[16/9] object-cover mt-8 border border-[#D7DBDE]"
                    />
                )}

                <div
                    className="font-body text-[#14171F] text-lg leading-relaxed mt-8 space-y-5 [&_p]:mb-5"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                />

                <div className="mt-16 pt-8 border-t border-[#D7DBDE]">
                    <p className="font-mono text-xs uppercase tracking-wider text-[#3A4048]/60 mb-4">
                        Comments ({article.comments?.length ?? 0})
                    </p>

                    <div className="mb-6"><CommentForm article={article} /></div>

                    <CommentList comments={article.comments ?? []} />
                </div>
            </article>
        </GuestLayout>
    );
}