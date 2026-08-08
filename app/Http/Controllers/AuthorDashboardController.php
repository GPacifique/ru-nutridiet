<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AuthorDashboardController extends Controller
{
    private const ARTICLES_LIMIT = 20;

    /**
     * GET /author/dashboard
     * Feeds Pages/Dashboard/Author/Index.jsx via { stats, articles }.
     * All data scoped to the logged-in author only.
     */
    public function index(Request $request): Response
    {
        $userId = $request->user()->id;

        return Inertia::render('Dashboard/Author/Index', [
            'stats' => fn () => $this->getStats($userId),
            'articles' => fn () => $this->getArticles($userId),
        ]);
    }

    private function getStats(int $userId): array
    {
        return [
            'published' => Article::where('user_id', $userId)->where('status', 'published')->count(),
            'drafts' => Article::where('user_id', $userId)->where('status', 'draft')->count(),
            'views' => (int) Article::where('user_id', $userId)->sum('views'),
        ];
    }

    private function getArticles(int $userId)
    {
        return Article::query()
            ->where('user_id', $userId)
            ->latest()
            ->take(self::ARTICLES_LIMIT)
            ->get()
            ->map(fn (Article $article) => [
                'id' => $article->id,
                'title' => $article->title,
                'status' => $article->status,
                'published_at' => $article->published_at?->format('M j, Y'),
            ]);
    }
}