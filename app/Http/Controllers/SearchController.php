<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SearchController extends Controller
{
    public function index(Request $request)
    {
        $query = trim($request->get('q'));

        /**
         * ---------------------------------------------------------
         * EMPTY SEARCH STATE (NO QUERY)
         * ---------------------------------------------------------
         * This prevents "recent search" or old results from showing
         */
        if (!$query) {
            return Inertia::render('Search/Index', [
                'query' => null,
                'articles' => [
                    'data' => [],
                    'links' => [],
                ],
                'categories' => Category::latest()->get(),
            ]);
        }

        /**
         * ---------------------------------------------------------
         * SEARCH RESULTS
         * ---------------------------------------------------------
         */
        $articles = Article::with(['category', 'author'])
            ->where('status', 'published')
            ->where(function ($builder) use ($query) {
                $builder->where('title', 'like', "%{$query}%")
                    ->orWhere('excerpt', 'like', "%{$query}%")
                    ->orWhere('content', 'like', "%{$query}%");
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Search/Index', [
            'query' => $query,
            'articles' => $articles,
            'categories' => Category::latest()->get(),
        ]);
    }
}