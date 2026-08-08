<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EditorDashboardController extends Controller
{
    private const SUBMISSIONS_LIMIT = 10;

    /**
     * GET /editor/dashboard
     * Feeds Pages/Dashboard/Editor/Index.jsx via { stats, submissions }.
     */
    public function index(Request $request): Response
    {
        return Inertia::render('Dashboard/Editor/Index', [
            'stats' => fn () => $this->getStats(),
            'submissions' => fn () => $this->getSubmissions(),
        ]);
    }

    private function getStats(): array
    {
        return [
            'awaiting' => Article::where('status', 'pending_review')->count(),
            'approved' => Article::where('status', 'published')
                ->where('updated_at', '>=', now()->subWeek())
                ->count(),
            'returned' => Article::where('status', 'returned')->count(),
        ];
    }

    private function getSubmissions()
    {
        return Article::query()
            ->with(['author:id,name', 'category:id,name'])
            ->where('status', 'pending_review')
            ->latest()
            ->take(self::SUBMISSIONS_LIMIT)
            ->get()
            ->map(fn (Article $article) => [
                'id' => $article->id,
                'title' => $article->title,
                'author' => $article->author ? ['id' => $article->author->id, 'name' => $article->author->name] : null,
                'category' => $article->category ? ['id' => $article->category->id, 'name' => $article->category->name] : null,
            ]);
    }
}