import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function Index({ articles = [], category = null }) {
    // Find the breaking news article or fallback to the absolute newest article for the hero banner
    const breakingArticle = articles.find(a => a.is_breaking) || articles[0];
    
    // Filter out the hero article from the regular grid list so it doesn't repeat
    const gridArticles = breakingArticle 
        ? articles.filter(a => a.id !== breakingArticle.id) 
        : articles;

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 antialiased selection:bg-red-500 selection:text-white">
            <Head title={category ? `${category.name} Articles` : 'Newsroom - All Articles'} />

            {/* Simple Top Navigation Header */}
            <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md">
                <div className="mx-auto flex max-w-7xl h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                    <Link href="/" className="text-xl font-black tracking-tight text-red-600 hover:text-red-700 transition">
                        THE NEWSROOM
                    </Link>
                    <nav className="flex items-center gap-6">
                        <Link href="/articles" className={`text-sm font-medium ${!category ? 'text-red-600 font-bold' : 'text-gray-600 hover:text-gray-900'}`}>
                            All News
                        </Link>
                        <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-gray-900">
                            Editor Login
                        </Link>
                    </nav>
                </div>
            </header>

            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Dynamic Section Heading */}
                <div className="mb-8 border-b border-gray-200 pb-4">
                    <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                        {category ? `Category: ${category.name}` : 'Latest Journalism'}
                    </h1>
                    <p className="mt-2 text-sm text-gray-500">
                        {category ? `Browsing all published news pieces covering ${category.name.toLowerCase()}.` : 'Independent, comprehensive deep-dives and breaking updates.'}
                    </p>
                </div>

                {articles.length === 0 ? (
                    /* Empty State Fallback */
                    <div className="rounded-xl border border-dashed border-gray-300 bg-white py-16 text-center shadow-sm">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                        <h3 className="mt-4 text-lg font-medium text-gray-900">No articles found</h3>
                        <p className="mt-2 text-sm text-gray-500">We couldn't find any articles published in this view right now.</p>
                        <Link href="/" className="mt-6 inline-flex items-center rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 transition focus:outline-none">
                            Return Home
                        </Link>
                    </div>
                ) : (
                    <>
                        {/* 1. HERO BREAKING FEATURE BANNER */}
                        {!category && breakingArticle && (
                            <div className="mb-12 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md lg:grid lg:grid-cols-12">
                                <div className="relative aspect-[16/10] bg-gray-100 lg:col-span-7 lg:aspect-auto lg:h-full">
                                    <img 
                                        src={breakingArticle.featured_image ? `/articles/${breakingArticle.featured_image}` : 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=1200'} 
                                        alt={breakingArticle.title} 
                                        className="h-full w-full object-cover"
                                    />
                                    {breakingArticle.is_breaking && (
                                        <span className="absolute top-4 left-4 inline-flex items-center rounded-full bg-red-600 px-3 py-1 text-xs font-black uppercase tracking-wider text-white ring-4 ring-white shadow">
                                            Breaking News
                                        </span>
                                    )}
                                </div>
                                <div className="flex flex-col justify-between p-6 sm:p-8 lg:col-span-5 lg:p-10">
                                    <div>
                                        <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-bold text-red-700 ring-1 ring-inset ring-red-600/10 uppercase tracking-wide">
                                            {breakingArticle.category?.name || 'General'}
                                        </span>
                                        <h2 className="mt-4 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl hover:text-red-600 transition">
                                            <Link href={`/articles/${breakingArticle.slug}`}>
                                                {breakingArticle.title}
                                            </Link>
                                        </h2>
                                        <p className="mt-4 text-base leading-relaxed text-gray-600 line-clamp-4">
                                            {breakingArticle.excerpt || breakingArticle.content.substring(0, 180) + '...'}
                                        </p>
                                    </div>
                                    <div className="mt-8 flex items-center justify-between border-t border-gray-100 pt-6 text-xs text-gray-500">
                                        <div>
                                            By <span className="font-semibold text-gray-700">{breakingArticle.author?.name || 'Staff Reporter'}</span>
                                        </div>
                                        <div>
                                            {new Date(breakingArticle.created_at || Date.now()).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* 2. REGULAR STORIES GRID */}
                        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {gridArticles.map((article) => (
                                <article key={article.id} className="group flex flex-col items-start justify-between rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md duration-200">
                                    <div className="w-full">
                                        <div className="relative mb-5 w-full overflow-hidden rounded-xl bg-gray-100 aspect-[16/10]">
                                            <img
                                                src={article.featured_image ? `/articles/${article.featured_image}` : 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=600'}
                                                alt={article.title}
                                                className="h-full w-full object-cover transition duration-300 group-hover:scale-102"
                                            />
                                        </div>
                                        <div className="flex items-center gap-x-3 text-xs">
                                            <span className="inline-flex items-center rounded-md bg-gray-100 px-2.5 py-0.5 font-medium text-gray-800 uppercase tracking-wide">
                                                {article.category?.name || 'General'}
                                            </span>
                                            <span className="text-gray-400">•</span>
                                            <span className="text-gray-500">{article.views || 0} views</span>
                                        </div>
                                        <h3 className="mt-3 text-lg font-bold leading-snug text-gray-900 group-hover:text-red-600 transition duration-150">
                                            <Link href={`/articles/${article.slug}`}>
                                                {article.title}
                                            </Link>
                                        </h3>
                                        <p className="mt-3 text-sm leading-relaxed text-gray-600 line-clamp-3">
                                            {article.excerpt || article.content.substring(0, 120) + '...'}
                                        </p>
                                    </div>
                                    <div className="mt-6 flex w-full items-center justify-between border-t border-gray-100 pt-4 text-xs text-gray-500">
                                        <span className="font-medium text-gray-700">{article.author?.name || 'Staff Writer'}</span>
                                        <span>{new Date(article.created_at || Date.now()).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </>
                )}
            </main>
        </div>
    );
}