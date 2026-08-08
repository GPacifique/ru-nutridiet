<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Category;
use App\Models\Comment;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SuperAdminDashboardController extends Controller
{
    private const USERS_LIMIT = 20;

    /**
     * GET /super-admin/dashboard
     * Feeds Pages/Dashboard/SuperAdmin/Index.jsx via { stats, users, roleBreakdown }.
     */
    public function index(Request $request): Response
    {
        return Inertia::render('Dashboard/SuperAdmin/Index', [
            'stats' => fn () => $this->getStats(),
            'users' => fn () => $this->getUsers(),
            'roleBreakdown' => fn () => $this->getRoleBreakdown(),
        ]);
    }

    private function getStats(): array
    {
        return [
            'users' => User::count(),
            'articles' => Article::count(),
            'categories' => Category::count(),
            'comments' => Comment::count(),
        ];
    }

    private function getUsers()
    {
        return User::query()
            ->latest()
            ->take(self::USERS_LIMIT)
            ->get(['id', 'name', 'role', 'created_at'])
            ->map(fn (User $user) => [
                'id' => $user->id,
                'name' => $user->name,
                'role' => $user->role,
                'created_at' => $user->created_at?->format('M j, Y'),
            ]);
    }

    private function getRoleBreakdown()
    {
        return User::query()
            ->selectRaw('role, COUNT(*) as count')
            ->groupBy('role')
            ->orderByDesc('count')
            ->get()
            ->map(fn ($row) => [
                'role' => $row->role,
                'count' => (int) $row->count,
            ]);
    }
}