<?php
namespace App\Http\Controllers;

use App\Models\Article;
Use Illuminate\Http\Request;
Use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Support\Facades\Auth;


class JournalistDashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();
         $articlesCount = Article::where('author_id', $user->id)->count();
$publishedCount = Article::where('author_id', $user->id)->where('status', 'published')->count();
$draftCount = Article::where('author_id', $user->id)->where('status', 'draft')->count();
 $viewsCount = Article::where('author_id', $user->id)->sum('views');
        $articles = Article::where('author_id', $user->id)->with('category')->latest()->get();

        return view('journalist.dashboard', [
            'publishedCount' => $publishedCount,
            'draftCount' => $draftCount,
            'viewsCount' => $viewsCount,
            'submitted' => (clone $articles)->where('status', 'submitted')->count(),
            'underReview' => (clone $articles)->where('status', 'under_review')->count(),
            'published' => (clone $articles)->where('status', 'published')->count(),
            'drafts' => (clone $articles)->where('status', 'draft')->count(),
            'rejected' => (clone $articles)->where('status', 'rejected')->count(),
'pending' => (clone $articles)->where('status', 'pending')->count(),
'articles' => $articles,
            'totalViews' => (clone $articles)->sum('views'),

            'articlesCount' => (clone $articles)->count(),

            'recentArticles' => (clone $articles)->sortByDesc('updated_at')->take(5),
        ]);
    }
    public function dashboard()
{
    $articles = Article::where('author_id', Auth::id())->get();

    return view('journalist.dashboard', compact('articles'));
}
}
