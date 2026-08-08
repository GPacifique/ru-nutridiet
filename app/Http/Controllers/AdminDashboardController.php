<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminDashboardController extends Controller
{
    private const PENDING_LIMIT = 10;

    /**
     * GET /admin/dashboard
     * Feeds Pages/Dashboard/Admin/Index.jsx via { stats, pendingArticles, categories }.
     */
    public function index(Request $request): Response
    {
        return Inertia::render('Dashboard/Admin/Index', [
            'stats' => fn () => $this->getStats(),
            'pendingArticles' => fn () => $this->getPendingArticles(),
            'categories' => fn () => $this->getCategories(),
        ]);
    }

    private function getStats(): array
    {
        return [
            'pending' => Article::where('status', 'pending_review')->count(),
            'published' => Article::where('status', 'published')->count(),
            'categories' => Category::count(),
        ];
    }

    private function getPendingArticles()
    {
        return Article::query()
            ->with('author:id,name')
            ->where('status', 'pending_review')
            ->latest()
            ->take(self::PENDING_LIMIT)
            ->get()
            ->map(fn (Article $article) => [
                'id' => $article->id,
                'title' => $article->title,
                'author' => $article->author ? ['id' => $article->author->id, 'name' => $article->author->name] : null,
            ]);
    }

    private function getCategories()
    {
        return Category::query()
            ->withCount('articles')
            ->orderBy('name')
            ->get()
            ->map(fn (Category $category) => [
                'id' => $category->id,
                'name' => $category->name,
                'articles_count' => $category->articles_count,
            ]);
    }
}