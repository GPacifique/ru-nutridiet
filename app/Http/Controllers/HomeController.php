<?php

namespace App\Http\Controllers;

use App\Models\Announcement;
use App\Models\Article;
use App\Models\Course;
use App\Models\Practitioner;
use App\Models\Product;
use App\Models\Testimonial;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $products = $this->safe(fn () => $this->visible(Product::query(), 'products')
            ->latest()->take(12)->get()
            ->map(fn ($p) => [
                'id'       => $p->id,
                'name'     => data_get($p, 'name', data_get($p, 'title')),
                'price'    => data_get($p, 'price'),
                'summary'  => str(strip_tags((string) data_get($p, 'short_description', data_get($p, 'description'))))->limit(90)->toString(),
                'image'    => $this->image($p, ['image', 'image_path', 'thumbnail', 'photo', 'cover_image']),
                'url'      => route('products.show', $p),
            ])->values());

        $courses = $this->safe(fn () => $this->visible(Course::query(), 'courses')
            ->latest()->take(6)->get()
            ->map(fn ($c) => [
                'id'      => $c->id,
                'title'   => data_get($c, 'title', data_get($c, 'name')),
                'summary' => str(strip_tags((string) data_get($c, 'description')))->limit(110)->toString(),
                'price'   => data_get($c, 'price'),
                'image'   => $this->image($c, ['thumbnail', 'image', 'image_path', 'cover_image']),
                'url'     => route('courses.show', $c),
            ])->values());

        $articles = $this->safe(fn () => $this->visible(Article::query(), 'articles')
            ->latest()->take(3)->get()
            ->map(fn ($a) => [
                'id'      => $a->id,
                'title'   => data_get($a, 'title'),
                'excerpt' => data_get($a, 'excerpt') ?: str(strip_tags((string) data_get($a, 'body', data_get($a, 'content'))))->limit(130)->toString(),
                'image'   => $this->image($a, ['cover_image', 'image', 'thumbnail', 'featured_image']),
                'date'    => optional($a->published_at ?? $a->created_at)->toFormattedDateString(),
                'url'     => route('blog.show', $a),
            ])->values());

        $practitioners = $this->safe(fn () => $this->visible(Practitioner::query()->with('user'), 'practitioners')
            ->latest()->take(4)->get()
            ->map(fn ($p) => [
                'id'        => $p->id,
                'name'      => data_get($p, 'name', data_get($p, 'user.name')),
                'specialty' => data_get($p, 'specialty', data_get($p, 'title')),
                'image'     => $this->image($p, ['photo', 'avatar', 'image', 'profile_photo_path']),
            ])->values());

        $testimonials = $this->safe(fn () => $this->visible(Testimonial::query(), 'testimonials')
            ->latest()->take(6)->get()
            ->map(fn ($t) => [
                'id'     => $t->id,
                'name'   => data_get($t, 'name', data_get($t, 'author')),
                'role'   => data_get($t, 'role', data_get($t, 'title')),
                'body'   => data_get($t, 'body', data_get($t, 'message', data_get($t, 'content'))),
                'rating' => data_get($t, 'rating'),
                'image'  => $this->image($t, ['photo', 'avatar', 'image']),
            ])->values());

        $announcements = $this->safe(fn () => $this->visible(Announcement::query(), 'announcements')
            ->latest()->take(3)->get()
            ->map(fn ($a) => ['id' => $a->id, 'title' => data_get($a, 'title'), 'body' => data_get($a, 'body', data_get($a, 'message'))])
            ->values());

        return Inertia::render('Home', [
            'brand' => [
                'name'   => config('app.name'),
                'slogan' => 'Eat to prevent, Eat to treat',
            ],
            'currency'      => config('app.currency', ''),
            'products'      => $products,
            'courses'       => $courses,
            'articles'      => $articles,
            'practitioners' => $practitioners,
            'testimonials'  => $testimonials,
            'announcements' => $announcements,
            'stats' => [
                'products'      => $this->safe(fn () => Product::count(), 0),
                'courses'       => $this->safe(fn () => Course::count(), 0),
                'articles'      => $this->safe(fn () => Article::count(), 0),
                'practitioners' => $this->safe(fn () => Practitioner::count(), 0),
            ],
        ]);
    }

    /** Only show live records, using whichever visibility column the table has. */
    private function visible(Builder $q, string $table): Builder
    {
        return match (true) {
            Schema::hasColumn($table, 'status') && $table === 'testimonials' => $q->where('status', 'approved'),
            Schema::hasColumn($table, 'status')       => $q->whereIn('status', ['published', 'active', 'approved']),
            Schema::hasColumn($table, 'is_published') => $q->where('is_published', true),
            Schema::hasColumn($table, 'is_active')    => $q->where('is_active', true),
            Schema::hasColumn($table, 'published_at') => $q->whereNotNull('published_at')->where('published_at', '<=', now()),
            default => $q,
        };
    }

    private function image($model, array $columns): ?string
    {
        foreach ($columns as $col) {
            $v = data_get($model, $col);
            if (is_array($v)) { $v = $v[0] ?? null; }
            if ($v) {
                return str_starts_with($v, 'http') || str_starts_with($v, '/') ? $v : Storage::url($v);
            }
        }
        return null;
    }

    /** A missing table or model must not take the whole home page down. */
    private function safe(callable $fn, $fallback = [])
    {
        try { return $fn(); } catch (\Throwable $e) { report($e); return $fallback; }
    }
}
