import React from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import WireStrip from './WireStrip';

/**
 * article: { id, slug, title, excerpt, cover_image, published_at, read_time,
 *            category: { name, slug }, author: { name }, is_saved? }
 */
export default function ArticleCard({ article, featured = false }) {
    const { auth } = usePage().props;

    function toggleSave(e) {
        e.preventDefault();
        e.stopPropagation();

        if (article.is_saved) {
            router.delete(route('bookmarks.destroy', article.id), { preserveScroll: true });
        } else {
            router.post(route('bookmarks.store', article.id), {}, { preserveScroll: true });
        }
    }

    return (
        <Link
            href={route('articles.show', article.slug)}
            className={`group relative block bg-white border border-[#D7DBDE] hover:border-[#25406B] transition-colors
                ${featured ? 'md:col-span-2 md:row-span-2' : ''}`}
        >
            {auth?.user && (
                <button
                    onClick={toggleSave}
                    aria-label={article.is_saved ? 'Remove from saved' : 'Save for later'}
                    className={`absolute top-3 right-3 z-10 font-mono text-[10px] uppercase tracking-wider px-2.5 py-1.5 border transition-colors
                        ${article.is_saved
                            ? 'bg-[#14171F] text-white border-[#14171F]'
                            : 'bg-white/90 text-[#14171F] border-[#D7DBDE] hover:border-[#25406B]'}`}
                >
                    {article.is_saved ? 'Saved' : 'Save'}
                </button>
            )}

            {article.cover_image && (
                <div className={`overflow-hidden bg-[#EEF1F3] ${featured ? 'aspect-[16/9]' : 'aspect-[4/3]'}`}>
                    <img
                        src={article.cover_image}
                        alt={article.title}
                        className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 transition-all duration-300"
                    />
                </div>
            )}
            <div className="p-4 md:p-5">
                <WireStrip
                    code={article.category?.name?.slice(0, 3).toUpperCase()}
                    timestamp={article.published_at}
                    readTime={article.read_time ? `${article.read_time} MIN READ` : null}
                    className="mb-2"
                />
                <h3 className={`font-display font-semibold text-[#14171F] leading-tight group-hover:text-[#25406B] transition-colors
                    ${featured ? 'text-2xl md:text-3xl' : 'text-lg'}`}>
                    {article.title}
                </h3>
                {article.excerpt && (
                    <p className={`font-body text-[#3A4048] mt-2 ${featured ? 'text-base line-clamp-3' : 'text-sm line-clamp-2'}`}>
                        {article.excerpt}
                    </p>
                )}
                {article.author?.name && (
                    <p className="font-mono text-[10px] uppercase tracking-wider text-[#3A4048]/60 mt-3">
                        By {article.author.name}
                    </p>
                )}
            </div>
        </Link>
    );
}