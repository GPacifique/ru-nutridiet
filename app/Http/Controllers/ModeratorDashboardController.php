<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ModeratorDashboardController extends Controller
{
    private const QUEUE_LIMIT = 20;

    /**
     * GET /moderator/dashboard
     * Feeds Pages/Dashboard/Moderator/Index.jsx via { stats, flaggedArticles }.
     *
     * Stub: assumes a 'flagged' status or similar moderation-queue signal on
     * Article. Adjust the where() clause to match your actual moderation schema
     * (e.g. a separate Report model, a reports_count column, etc.).
     */
    public function index(Request $request): Response
    {
        return Inertia::render('Dashboard/Moderator/Index', [
            'stats' => fn () => $this->getStats(),
            'flaggedArticles' => fn () => Article::query()
                ->with(['category:id,name,slug', 'author:id,name'])
                ->where('status', 'flagged')
                ->latest()
                ->take(self::QUEUE_LIMIT)
                ->get(),
        ]);
    }

    private function getStats(): array
    {
        return (array) Article::query()
            ->selectRaw("
                SUM(status = 'flagged') as flagged_count,
                SUM(status = 'published') as published_articles
            ")
            ->first();
    }
}