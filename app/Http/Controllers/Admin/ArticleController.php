<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\ArticleVersion;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Admin CRUD for articles.
 *
 * Routes (routes/web.php, inside the admin group):
 *   Route::resource('articles', AdminArticleController::class);
 *
 * Article binds by slug (Article::getRouteKeyName), so {article} is a slug.
 * Access is limited to admins by the group's `role:admin` middleware.
 *
 * Inertia pages this controller renders:
 *   Admin/Articles/Index, Create, Edit, Show
 */
class ArticleController extends Controller
{
    private const STATUSES = ['draft', 'published'];

    /* ------------------------------------------------------------------ */
    /* Index                                                              */
    /* ------------------------------------------------------------------ */

    public function index(Request $request): Response
    {
        $filters = $request->only(['search', 'status', 'category']);

        $articles = Article::query()
            ->with('author:id,name')
            ->when($filters['search'] ?? null, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('title', 'like', "%{$search}%")
                        ->orWhere('excerpt', 'like', "%{$search}%");
                });
            })
            ->when($filters['status'] ?? null, fn ($query, $status) => $query->where('status', $status))
            ->when($filters['category'] ?? null, fn ($query, $category) => $query->where('category', $category))
            ->latest()
            ->paginate(15)
            ->withQueryString()
            ->through(fn (Article $a) => [
                'id'           => $a->id,
                'title'        => $a->title,
                'slug'         => $a->slug,
                'category'     => $a->category,
                'status'       => $a->status,
                'thumbnail_url'=> $this->thumbnailUrl($a->thumbnail),
                'author'       => $a->author?->name,
                'published_at' => $a->published_at,
                'created_at'   => $a->created_at,
            ]);

        return Inertia::render('Admin/Articles/Index', [
            'articles'   => $articles,
            'filters'    => $filters,
            'statuses'   => self::STATUSES,
            'categories' => Article::query()
                ->whereNotNull('category')
                ->distinct()
                ->orderBy('category')
                ->pluck('category'),
            'counts'     => [
                'all'       => Article::count(),
                'published' => Article::where('status', 'published')->count(),
                'draft'     => Article::where('status', 'draft')->count(),
            ],
        ]);
    }

    /* ------------------------------------------------------------------ */
    /* Create / store                                                     */
    /* ------------------------------------------------------------------ */

    public function create(): Response
    {
        return Inertia::render('Admin/Articles/Create', [
            'statuses'   => self::STATUSES,
            'categories' => $this->categories(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $this->validated($request);

        $data['slug']      = $this->uniqueSlug($data['slug'] ?? null, $data['title']);
        $data['author_id'] = $request->user()->id;
        $data = $this->applyPublishDate($data);

        if ($request->hasFile('thumbnail')) {
            $data['thumbnail'] = $request->file('thumbnail')->store('articles', 'public');
        }

        $article = Article::create($data);

        return redirect()
            ->route('admin.articles.show', $article)
            ->with('success', 'Article created.');
    }

    /* ------------------------------------------------------------------ */
    /* Inline image upload (used by the rich text editor)                 */
    /* ------------------------------------------------------------------ */

    public function uploadImage(Request $request): JsonResponse
    {
        $request->validate([
            'image' => ['required', 'image', 'mimes:jpg,jpeg,png,webp,gif', 'max:4096'],
        ]);

        $path = $request->file('image')->store('articles/content', 'public');

        return response()->json(['url' => '/storage/' . $path]);
    }

    /* ------------------------------------------------------------------ */
    /* Show                                                               */
    /* ------------------------------------------------------------------ */

    public function show(Article $article): Response
    {
        $article->load('author:id,name');

        return Inertia::render('Admin/Articles/Show', [
            'article'  => $this->payload($article),
            'versions' => $this->versions($article),
        ]);
    }

    /* ------------------------------------------------------------------ */
    /* Edit / update                                                      */
    /* ------------------------------------------------------------------ */

    public function edit(Article $article): Response
    {
        return Inertia::render('Admin/Articles/Edit', [
            'article'    => $this->payload($article),
            'statuses'   => self::STATUSES,
            'categories' => $this->categories(),
        ]);
    }

    public function update(Request $request, Article $article): RedirectResponse
    {
        $data = $this->validated($request, $article);

        // Keep the existing slug (and therefore the public URL) unless a new
        // one was typed in. Changing the title alone never changes the URL.
        $data['slug'] = filled($data['slug'] ?? null)
            ? $this->uniqueSlug($data['slug'], $data['title'], $article->id)
            : $article->slug;

        $data = $this->applyPublishDate($data, $article);

        $oldThumbnail = $article->thumbnail;

        if ($request->hasFile('thumbnail')) {
            $data['thumbnail'] = $request->file('thumbnail')->store('articles', 'public');
        } elseif ($request->boolean('remove_thumbnail')) {
            $data['thumbnail'] = null;
        } else {
            unset($data['thumbnail']);
        }

        DB::transaction(function () use ($article, $data, $request) {
            // Snapshot the content as it was before this edit.
            $this->saveVersion($article, $request->user()->id);

            $article->update($data);
        });

        if (array_key_exists('thumbnail', $data) && $oldThumbnail && $oldThumbnail !== $article->thumbnail) {
            $this->deleteThumbnail($oldThumbnail);
        }

        return redirect()
            ->route('admin.articles.show', $article)
            ->with('success', 'Article updated.');
    }

    /* ------------------------------------------------------------------ */
    /* Destroy                                                            */
    /* ------------------------------------------------------------------ */

    public function destroy(Article $article): RedirectResponse
    {
        $thumbnail = $article->thumbnail;

        $article->delete();

        $this->deleteThumbnail($thumbnail);

        return redirect()
            ->route('admin.articles.index')
            ->with('success', 'Article deleted.');
    }

    /* ================================================================== */
    /* Helpers                                                            */
    /* ================================================================== */

    private function validated(Request $request, ?Article $article = null): array
    {
        $data = $request->validate([
            'title'        => ['required', 'string', 'max:255'],
            'slug'         => [
                'nullable', 'string', 'max:255', 'alpha_dash',
                Rule::unique('articles', 'slug')->ignore($article?->id),
            ],
            'category'     => ['nullable', 'string', 'max:100'],
            'excerpt'      => ['nullable', 'string', 'max:500'],
            'content'      => ['required', 'string'],
            'status'       => ['required', Rule::in(self::STATUSES)],
            'published_at' => ['nullable', 'date'],
            'thumbnail'    => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:3072'],
        ]);

        // Content is HTML from the rich text editor: sanitise before saving.
        $data['content'] = $this->cleanHtml($data['content']);

        return $data;
    }

    /**
     * Strip anything dangerous from editor HTML.
     *
     * Preferred: composer require mews/purifier (gives the global clean()
     * helper, used automatically below). The regex fallback is only a
     * stopgap and is not a substitute for a real HTML purifier.
     */
    private function cleanHtml(string $html): string
    {
        if (function_exists('clean')) {
            return clean($html);
        }

        $html = preg_replace('#<(script|style|iframe|object|embed)\b[^>]*>.*?</\1>#is', '', $html);
        $html = preg_replace('/\son\w+\s*=\s*("[^"]*"|\'[^\']*\'|[^\s>]+)/i', '', $html);
        $html = preg_replace('/(href|src)\s*=\s*(["\'])\s*javascript:[^"\']*\2/i', '$1=$2#$2', $html);

        return $html;
    }

    /** Published articles always carry a publish date; drafts keep whatever was set. */
    private function applyPublishDate(array $data, ?Article $article = null): array
    {
        if (($data['status'] ?? null) === 'published' && empty($data['published_at'])) {
            $data['published_at'] = $article?->published_at ?? now();
        }

        return $data;
    }

    private function uniqueSlug(?string $slug, string $title, ?int $ignoreId = null): string
    {
        $base = Str::slug(filled($slug) ? $slug : $title) ?: 'article';
        $candidate = $base;
        $suffix = 2;

        while (
            Article::query()
                ->where('slug', $candidate)
                ->when($ignoreId, fn ($q) => $q->where('id', '!=', $ignoreId))
                ->exists()
        ) {
            $candidate = $base . '-' . $suffix++;
        }

        return $candidate;
    }

    private function categories()
    {
        return Article::query()
            ->whereNotNull('category')
            ->distinct()
            ->orderBy('category')
            ->pluck('category');
    }

    private function thumbnailUrl(?string $path): ?string
    {
        if (! $path) {
            return null;
        }

        return str_starts_with($path, 'http') ? $path : asset('storage/' . ltrim($path, '/'));
    }

    private function deleteThumbnail(?string $path): void
    {
        if ($path && ! str_starts_with($path, 'http')) {
            Storage::disk('public')->delete($path);
        }
    }

    private function payload(Article $article): array
    {
        return [
            'id'            => $article->id,
            'title'         => $article->title,
            'slug'          => $article->slug,
            'category'      => $article->category,
            'excerpt'       => $article->excerpt,
            'content'       => $article->content,
            'status'        => $article->status,
            'thumbnail_url' => $this->thumbnailUrl($article->thumbnail),
            'author'        => $article->author?->name,
            'published_at'  => $article->published_at,
            'created_at'    => $article->created_at,
            'updated_at'    => $article->updated_at,
        ];
    }

    /** Save the pre-edit title/content to article_versions (skipped if the table is missing). */
    private function saveVersion(Article $article, int $editorId): void
    {
        if (! Schema::hasTable((new ArticleVersion)->getTable())) {
            return;
        }

        ArticleVersion::create([
            'article_id' => $article->id,
            'title'      => $article->title,
            'content'    => $article->content,
            'edited_by'  => $editorId,
        ]);
    }

    private function versions(Article $article): array
    {
        if (! Schema::hasTable((new ArticleVersion)->getTable())) {
            return [];
        }

        return ArticleVersion::query()
            ->where('article_id', $article->id)
            ->with('editor:id,name')
            ->latest()
            ->limit(10)
            ->get()
            ->map(fn ($v) => [
                'id'         => $v->id,
                'title'      => $v->title,
                'editor'     => $v->editor?->name,
                'created_at' => $v->created_at,
            ])
            ->all();
    }
}