<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ArticleController extends Controller
{
    /**
     * PUBLIC: All articles
     */
    public function index()
    {
        $articles = Article::with(['category', 'author'])
            ->where('status', 'published')
            ->latest()
            ->paginate(12);

        return Inertia::render('Articles/Index', [
            'articles' => $articles,
            'category' => null,
        ]);
    }

    /**
     * PUBLIC: Articles by category slug
     */
    public function byCategory(Category $category)
    {
        $articles = Article::with(['category', 'author'])
            ->where('category_id', $category->id)
            ->where('status', 'published')
            ->latest()
            ->paginate(12);

        return Inertia::render('Articles/Index', [
            'articles' => $articles,
            'category' => $category,
        ]);
    }

    /**
     * PUBLIC: Single article (slug)
     */
    public function show(Article $article)
    {
        $article->increment('views');
        $article->load(['category', 'author']);

        return Inertia::render('Articles/Article', [
            'article' => $article,
        ]);
    }

    /**
     * AUTH: Create page
     */
    public function create()
    {
        return Inertia::render('Articles/Create', [
            'categories' => Category::all(),
        ]);
    }

    /**
     * AUTH: Store article
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'excerpt' => 'nullable|string',
            'content' => 'required|string',
            'category_id' => 'required|exists:categories,id',
            'status' => 'required|in:draft,published',
            'featured_image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        $imageName = null;

        if ($request->hasFile('featured_image')) {
            $image = $request->file('featured_image');

            $imageName = time() . '_' . Str::slug($request->title) . '.' . $image->getClientOriginalExtension();

            $image->move(public_path('articles'), $imageName);
        }

        Article::create([
            'title' => $request->title,
            'slug' => Str::slug($request->title),
            'excerpt' => $request->excerpt,
            'content' => $request->content,
            'category_id' => $request->category_id,
            'featured_image' => $imageName,
            'status' => $request->status,
            'is_breaking' => $request->is_breaking ?? false,
            'views' => 0,
            'user_id' => Auth::id(),
        ]);

        return redirect()->route('dashboard');
    }

    /**
     * AUTH: Edit
     */
    public function edit(Article $article)
    {
        return Inertia::render('Articles/Edit', [
            'article' => $article,
            'categories' => Category::all(),
        ]);
    }

    /**
     * AUTH: Update
     */
    public function update(Request $request, Article $article)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'excerpt' => 'nullable|string',
            'content' => 'required|string',
            'category_id' => 'required|exists:categories,id',
            'status' => 'required|in:draft,published',
            'featured_image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        $imageName = $article->featured_image;

        if ($request->hasFile('featured_image')) {
            if ($article->featured_image && file_exists(public_path('articles/' . $article->featured_image))) {
                unlink(public_path('articles/' . $article->featured_image));
            }

            $image = $request->file('featured_image');

            $imageName = time() . '_' . Str::slug($request->title) . '.' . $image->getClientOriginalExtension();

            $image->move(public_path('articles'), $imageName);
        }

        $article->update([
            'title' => $request->title,
            'slug' => Str::slug($request->title),
            'excerpt' => $request->excerpt,
            'content' => $request->content,
            'category_id' => $request->category_id,
            'featured_image' => $imageName,
            'status' => $request->status,
            'is_breaking' => $request->is_breaking ?? false,
        ]);

        return redirect()->route('dashboard');
    }

    /**
     * AUTH: Delete
     */
    public function destroy(Article $article)
    {
        if ($article->featured_image && file_exists(public_path('articles/' . $article->featured_image))) {
            unlink(public_path('articles/' . $article->featured_image));
        }

        $article->delete();

        return back();
    }
}