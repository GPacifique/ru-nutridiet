<?php

namespace App\Http\Controllers;

use App\Models\BlogCategory;
use App\Models\BlogPost;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BlogController extends Controller
{
    /**
     * Display all published blog posts.
     */
    public function index(Request $request): Response
    {
        $search = $request->string('search')->toString();
        $category = $request->string('category')->toString();

        $posts = BlogPost::with('category')
            ->when($search, function ($query) use ($search) {
                $query->where(function ($q) use ($search) {
                    $q->where('title', 'like', "%{$search}%")
                      ->orWhere('excerpt', 'like', "%{$search}%")
                      ->orWhere('content', 'like', "%{$search}%");
                });
            })
            ->when($category, function ($query) use ($category) {
                $query->whereHas('category', function ($q) use ($category) {
                    $q->where('slug', $category);
                });
            })
            ->where('is_published', true)
            ->latest('published_at')
            ->paginate(9)
            ->withQueryString();

        $categories = BlogCategory::orderBy('name')
            ->get(['id', 'name', 'slug']);

        $featuredPosts = BlogPost::where('is_published', true)
            ->latest('published_at')
            ->take(3)
            ->get([
                'id',
                'title',
                'slug',
                'thumbnail',
                'excerpt',
                'published_at',
            ]);

        return Inertia::render('Blog/Index', [
            'posts' => $posts,
            'categories' => $categories,
            'featuredPosts' => $featuredPosts,
            'filters' => [
                'search' => $search,
                'category' => $category,
            ],
        ]);
    }

    /**
     * Display a single blog post.
     */
    public function show(BlogPost $post): Response
    {
        abort_unless($post->is_published, 404);

        $post->load('category');

        $relatedPosts = BlogPost::where('id', '!=', $post->id)
            ->where('blog_category_id', $post->blog_category_id)
            ->where('is_published', true)
            ->latest('published_at')
            ->take(3)
            ->get([
                'id',
                'title',
                'slug',
                'thumbnail',
                'excerpt',
                'published_at',
            ]);

        return Inertia::render('Blog/Show', [
            'post' => $post,
            'relatedPosts' => $relatedPosts,
        ]);
    }
}