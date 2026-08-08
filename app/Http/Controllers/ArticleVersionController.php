<?php

namespace App\Http\Controllers;

use App\Models\ArticleVersion;
use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ArticleVersionController extends Controller
{
    /**
     * Show all versions of an article
     */
    public function index(Article $article)
    {
        $versions = $article->versions()->latest()->get();

        return view('articles.versions.index', compact('article', 'versions'));
    }

    /**
     * Store a new version (auto-save or manual save)
     */
    public function store(Request $request, Article $article)
    {
        $request->validate([
            'content' => 'required',
            'title' => 'required|max:255',
        ]);

        ArticleVersion::create([
            'article_id' => $article->id,
            'title' => $request->title,
            'content' => $request->content,
            'edited_by' => Auth::id(),
        ]);

        return back()->with('success', 'Article version saved successfully');
    }

    /**
     * Show a specific version
     */
    public function show(ArticleVersion $articleVersion)
    {
        return view('articles.versions.show', compact('articleVersion'));
    }

    /**
     * Restore a version
     */
    public function restore(ArticleVersion $articleVersion)
    {
        $article = $articleVersion->article;

        $article->update([
            'title' => $articleVersion->title,
            'content' => $articleVersion->content,
        ]);

        return redirect()
            ->route('articles.show', $article->slug)
            ->with('success', 'Article restored from version');
    }

    /**
     * Delete a version
     */
    public function destroy(ArticleVersion $articleVersion)
    {
        $articleVersion->delete();

        return back()->with('success', 'Version deleted');
    }
}