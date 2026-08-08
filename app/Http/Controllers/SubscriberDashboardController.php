<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class SubscriberDashboardController extends Controller
{
    private const SAVED_LIMIT = 24;
    private const RECOMMENDED_LIMIT = 6;

    /**
     * GET /dashboard
     * Feeds Pages/Dashboard/Subscriber/Index.jsx via { saved, recommended }.
     */
    public function index(Request $request): Response
    {
        $user = $request->user();

        $saved = $this->getSavedArticles($user->id);

        $recommended = $this->getRecommendedArticles($user->id, $saved->pluck('id'));

        return Inertia::render('Dashboard/Subscriber/Index', [
            'saved' => $saved->map(fn (Article $article) => $this->toCard($article, isSaved: true))->values(),
            'recommended' => $recommended->map(fn (Article $article) => $this->toCard($article, isSaved: false))->values(),
        ]);
    }

    /**
     * Articles this user bookmarked, newest bookmark first (not newest article first).
     */
    private function getSavedArticles(int $userId)
    {
        return Article::query()
            ->select('articles.*')
            ->join('bookmarks', 'bookmarks.article_id', '=', 'articles.id')
            ->with(['category:id,name,slug', 'author:id,name'])
            ->where('bookmarks.user_id', $userId)
            ->where('articles.status', 'published')
            ->orderByDesc('bookmarks.created_at')
            ->take(self::SAVED_LIMIT)
            ->get();
    }

    /**
     * Published articles from the same categories as this user's saved articles,
     * excluding anything already saved. Falls back to an empty collection
     * when the user has no saved articles yet (nothing to base a recommendation on).
     */
    private function getRecommendedArticles(int $userId, $excludeIds)
    {
        $categoryIds = Article::query()
            ->join('bookmarks', 'bookmarks.article_id', '=', 'articles.id')
            ->where('bookmarks.user_id', $userId)
            ->whereNotNull('articles.category_id')
            ->distinct()
            ->pluck('articles.category_id');

        if ($categoryIds->isEmpty()) {
            return collect();
        }

        return Article::query()
            ->with(['category:id,name,slug', 'author:id,name'])
            ->where('status', 'published')
            ->whereIn('category_id', $categoryIds)
            ->whereNotIn('id', $excludeIds)
            ->latest()
            ->take(self::RECOMMENDED_LIMIT)
            ->get();
    }

    /**
     * Same card shape ArticleController uses, so ArticleCard.jsx gets
     * consistent props regardless of which page rendered it.
     */
    private function toCard(Article $article, bool $isSaved): array
    {
        return [
            'id' => $article->id,
            'slug' => $article->slug,
            'title' => $article->title,
            'excerpt' => $article->excerpt,
            'cover_image' => $article->featured_image ? Storage::url($article->featured_image) : null,
            'published_at' => $article->published_at?->format('M j, Y'),
            'read_time' => $article->read_time,
            'is_saved' => $isSaved,
            'category' => $article->category ? [
                'id' => $article->category->id,
                'name' => $article->category->name,
                'slug' => $article->category->slug,
            ] : null,
            'author' => $article->author ? [
                'id' => $article->author->id,
                'name' => $article->author->name,
            ] : null,
        ];
    }
}