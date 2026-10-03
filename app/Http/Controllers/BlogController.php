<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BlogController extends Controller
{
    /**
     * Display the published blog articles.
     */
    public function index(Request $request): Response
    {
        $articles = Article::query()
            ->published()
            ->with('author:id,name')
            ->latest('published_at')
            ->paginate(9)
            ->withQueryString();

        return Inertia::render('Blog/Index', [
            'articles' => $articles,
        ]);
    }

    /**
     * Display a single published article.
     */
    public function show(Article $article): Response
    {
        // Only allow published articles to be viewed publicly.
        abort_unless(
            $article->status === 'published' &&
            $article->published_at !== null &&
            $article->published_at->lte(now()),
            404
        );

        $article->load([
            'author:id,name',
        ]);

        /*
         * Find other published articles from the same category.
         * If the current article has no category, don't restrict
         * related articles by category.
         */
        $relatedArticlesQuery = Article::query()
            ->published()
            ->whereKeyNot($article->id)
            ->with('author:id,name')
            ->latest('published_at');

        if (!empty($article->category)) {
            $relatedArticlesQuery->where('category', $article->category);
        }

        $relatedArticles = $relatedArticlesQuery
            ->take(3)
            ->get();

        /*
         * If there are fewer than 3 articles in the same category,
         * fill the remaining slots with other recent articles.
         */
        if ($relatedArticles->count() < 3) {
            $remaining = 3 - $relatedArticles->count();

            $additionalArticles = Article::query()
                ->published()
                ->whereKeyNot($article->id)
                ->whereNotIn('id', $relatedArticles->pluck('id'))
                ->with('author:id,name')
                ->latest('published_at')
                ->take($remaining)
                ->get();

            $relatedArticles = $relatedArticles
                ->concat($additionalArticles)
                ->values();
        }

        return Inertia::render('Blog/Show', [
            'article' => $article,
            'relatedArticles' => $relatedArticles,
        ]);
    }
}