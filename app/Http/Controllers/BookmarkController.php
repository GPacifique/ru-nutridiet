<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Bookmark;
use Illuminate\Http\Request;

class BookmarkController extends Controller
{
    /**
     * POST /articles/{article}/bookmark
     * Save an article for the current user. Idempotent — re-saving does nothing.
     */
    public function store(Request $request, Article $article)
    {
        Bookmark::firstOrCreate([
            'user_id' => $request->user()->id,
            'article_id' => $article->id,
        ]);

        return back()->with('success', 'Saved for later.');
    }

    /**
     * DELETE /articles/{article}/bookmark
     * Remove a saved article for the current user.
     */
    public function destroy(Request $request, Article $article)
    {
        Bookmark::where('user_id', $request->user()->id)
            ->where('article_id', $article->id)
            ->delete();

        return back()->with('success', 'Removed from saved.');
    }
}