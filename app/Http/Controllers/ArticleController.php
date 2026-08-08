<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ArticleController extends Controller
{
    /**
     * Admin listing — every article regardless of status, most
     * recently created first. Adjust the Inertia view name
     * ('Admin/Articles/Index') to wherever your admin pages actually
     * live.
     */
    public function index(Request $request): Response
    {
        $articles = Article::query()
            ->with('author')
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Admin/Articles/Index', [
            'articles' => $articles,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Articles/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $this->validated($request);

        $data['slug'] = $data['slug'] ?? $this->uniqueSlug($data['title']);
        $data['author_id'] = $data['author_id'] ?? $request->user()?->id;

        Article::create($data);

        return redirect()
            ->route('admin.articles.index')
            ->with('success', 'Article created.');
    }

    public function edit(Article $article): Response
    {
        return Inertia::render('Admin/Articles/Edit', [
            'article' => $article,
        ]);
    }

    public function update(Request $request, Article $article): RedirectResponse
    {
        $data = $this->validated($request, $article);

        if (! empty($data['title']) && empty($data['slug'])) {
            $data['slug'] = $this->uniqueSlug($data['title'], $article->id);
        }

        $article->update($data);

        return redirect()
            ->route('admin.articles.index')
            ->with('success', 'Article updated.');
    }

    public function destroy(Article $article): RedirectResponse
    {
        $article->delete();

        return redirect()
            ->route('admin.articles.index')
            ->with('success', 'Article deleted.');
    }

    /**
     * Public-facing single article page — this is what Home.jsx's
     * "Read more" link (/blog/{slug}) resolves to. Route-model binding
     * uses the slug because Article::getRouteKeyName() returns 'slug'.
     *
     * 404s on anything not published, so unpublished/draft articles
     * can't be viewed by guessing the URL.
     */
    public function show(Article $article): Response
    {
        abort_unless(
            $article->status === 'published'
                && $article->published_at
                && $article->published_at->lte(now()),
            404
        );

        $article->load('author');

        return Inertia::render('Blog/Show', [
            'article' => $article,
        ]);
    }

    /**
     * Shared validation for store/update. $article is null on create.
     */
    protected function validated(Request $request, ?Article $article = null): array
    {
        return $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'slug' => [
                'nullable',
                'string',
                'max:255',
                'alpha_dash',
                'unique:articles,slug' . ($article ? ",{$article->id}" : ''),
            ],
            'category' => ['nullable', 'string', 'max:120'],
            'excerpt' => ['nullable', 'string', 'max:500'],
            'content' => ['nullable', 'string'],
            'thumbnail' => ['nullable', 'string', 'max:2048'],
            'status' => ['required', 'in:draft,published,archived'],
            'author_id' => ['nullable', 'exists:users,id'],
            'published_at' => ['nullable', 'date'],
        ]);
    }

    protected function uniqueSlug(string $title, ?int $ignoreId = null): string
    {
        $base = Str::slug($title);
        $slug = $base;
        $i = 1;

        while (
            Article::where('slug', $slug)
                ->when($ignoreId, fn ($q) => $q->where('id', '!=', $ignoreId))
                ->exists()
        ) {
            $slug = "{$base}-" . ++$i;
        }

        return $slug;
    }
}