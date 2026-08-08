<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        switch ($user->role) {

            case 'super_admin':
                return $this->superAdminDashboard($user);

            case 'admin':
                return $this->adminDashboard($user);

            case 'editor':
                return $this->editorDashboard($user);

            case 'author':
                return $this->authorDashboard($user);

            case 'moderator':
                return $this->moderatorDashboard($user);

            case 'subscriber':
                return $this->subscriberDashboard($user);

            case 'premium':
                return $this->premiumDashboard($user);

            default:
                abort(403, 'Unauthorized.');
        }
    }

    private function getStats()
    {
        return [
            'total_articles' => Article::count(),
            'published_articles' => Article::where('status', 'published')->count(),
            'drafts' => Article::where('status', 'draft')->count(),
            'total_views' => Article::sum('views'),
        ];
    }

    private function getLatestArticles()
    {
        return Article::with(['category', 'author'])
            ->latest()
            ->take(10)
            ->get();
    }

    private function superAdminDashboard($user)
    {
        return Inertia::render('Dashboard/SuperAdmin/Index', [
            'user' => $user,
            'stats' => $this->getStats(),
            'latestArticles' => $this->getLatestArticles(),
        ]);
    }

    private function adminDashboard($user)
    {
        return Inertia::render('Dashboard/Admin/Index', [
            'user' => $user,
            'stats' => $this->getStats(),
            'latestArticles' => $this->getLatestArticles(),
        ]);
    }

    private function editorDashboard($user)
    {
        return Inertia::render('Dashboard/Editor/Index', [
            'user' => $user,
            'stats' => $this->getStats(),
            'latestArticles' => $this->getLatestArticles(),
        ]);
    }

    private function authorDashboard($user)
    {
        return Inertia::render('Dashboard/Author/Index', [
            'user' => $user,
            'stats' => [
                'my_articles' => Article::where('user_id', $user->id)->count(),
                'published' => Article::where('user_id', $user->id)
                    ->where('status', 'published')
                    ->count(),
                'drafts' => Article::where('user_id', $user->id)
                    ->where('status', 'draft')
                    ->count(),
            ],
            'latestArticles' => Article::where('user_id', $user->id)
                ->latest()
                ->take(10)
                ->get(),
        ]);
    }

    private function moderatorDashboard($user)
    {
        return Inertia::render('Dashboard/Moderator/Index', [
            'user' => $user,
        ]);
    }

    private function subscriberDashboard($user)
    {
        return Inertia::render('Dashboard/Subscriber/Index', [
            'user' => $user,
        ]);
    }

    private function premiumDashboard($user)
    {
        return Inertia::render('Dashboard/Premium/Index', [
            'user' => $user,
        ]);
    }
}