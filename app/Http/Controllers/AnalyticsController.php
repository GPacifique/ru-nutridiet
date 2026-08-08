<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Article;
use App\Models\Ad;
use Illuminate\Http\Request;

class AnalyticsController extends Controller
{
    /**
     * Display analytics dashboard
     */
    public function index()
    {
        // Basic counts
        $users = User::count();
        $articles = Article::count();
        $published = Article::where('status', 'published')->count();
        $ads = Ad::count();

        // Role distribution (useful for charts later)
        $roles = User::selectRaw('role, COUNT(*) as total')
            ->groupBy('role')
            ->pluck('total', 'role');

        // Status distribution
        $statuses = User::selectRaw('status, COUNT(*) as total')
            ->groupBy('status')
            ->pluck('total', 'status');

        // Recent users (for activity section)
        $recentUsers = User::latest()->take(5)->get();

        // Recent articles
        $recentArticles = Article::latest()->take(5)->get();

        return view('analytics.index', compact(
            'users',
            'articles',
            'published',
            'ads',
            'roles',
            'statuses',
            'recentUsers',
            'recentArticles'
        ));
    }
}