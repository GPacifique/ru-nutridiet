<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class PremiumDashboardController extends Controller
{
    private const SAVED_LIMIT = 24;
    private const RECOMMENDED_LIMIT = 6;

    /**
     * GET /premium/dashboard
     * Feeds Pages/Dashboard/Premium/Index.jsx via { saved, recommended }.
     * Mirrors SubscriberDashboardController — adjust here if premium users
     * get additional perks (e.g. premium-only articles, no ad-gated content, etc.).
     */
    public function index(Request $request): Response
    {
        $userId = $request->user()->id;

        $saved = $this->getSavedArticles($userId);

        return Inertia::render('Dashboard/Premium/Index', [
            'saved' => fn () => $saved->map(fn (Article $a) => $this->toCard($a, isSaved: true))->values(),
            'recommended' => fn () => $this->getRecommendedArticles($userId, $saved->pluck('id'))
                ->map(fn (Article $a) => $this->toCard($a, isSaved: false))
                ->values(),
        ]);
    }

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