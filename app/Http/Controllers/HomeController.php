<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Course;
use App\Models\Practitioner;
use App\Models\Testimonial;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    /**
     * Show the public landing page.
     *
     * `courses` is now mapped against the real migration you shared:
     *   status enum('draft','published','archived') — not is_published
     *   thumbnail                                   — not image
     *   credit_hours                                — not credits
     *   instructor_id -> users.id (belongsTo)        — not an instructor string
     *   no duration / students / rating columns at all
     *
     * `articles` now matches the migration I just generated for it:
     *   status enum('draft','published','archived') — not is_published
     *   thumbnail                                   — not image
     *   author_id -> users.id (belongsTo)
     *   published_at
     *
     * `practitioners` now matches the migration I just generated for it:
     *   is_active (boolean, confirmed real this time)
     *   thumbnail, qualification, focus, years_experience, display_order
     *   Practitioner::experience accessor formats years_experience as "X yrs"
     *
     * `testimonials` is still on the generic no-whitelist query —
     * share that migration (or say "no table, generate it") the same
     * way and I'll finish this off.
     */
    public function index(Request $request): Response
    {
        return Inertia::render('Home', [
            'courses' => Course::query()
                ->where('status', 'published')
                ->with('instructor') // assumes Course::instructor() belongsTo(User::class, 'instructor_id')
                ->latest('published_at')
                ->get()
                ->map(fn (Course $course) => [
                    'id' => $course->id,
                    'slug' => $course->slug,
                    'title' => $course->title,
                    'description' => $course->description,
                    'instructor' => $course->instructor?->name,
                    'credits' => $course->credit_hours,
                    'price' => '$' . number_format((float) $course->price, 0),
                    'image' => $course->thumbnail,
                    // No duration/students/rating columns exist yet — Home.jsx
                    // renders these as blank text next to their icons rather
                    // than crashing, but add real columns/logic when ready.
                    'duration' => null,
                    'students' => null,
                    'rating' => null,
                ]),

            'articles' => Article::query()
                ->where('status', 'published')
                ->with('author') // assumes Article::author() belongsTo(User::class, 'author_id')
                ->latest('published_at')
                ->take(6)
                ->get()
                ->map(fn (Article $article) => [
                    'id' => $article->id,
                    'slug' => $article->slug,
                    'title' => $article->title,
                    'category' => $article->category,
                    'excerpt' => $article->excerpt,
                    'author' => $article->author?->name,
                    'date' => $article->published_at?->format('M j, Y'),
                    'image' => $article->thumbnail,
                ]),

            'practitioners' => Practitioner::query()
                ->active()
                ->ordered()
                ->get()
                ->map(fn (Practitioner $practitioner) => [
                    'id' => $practitioner->id,
                    'slug' => $practitioner->slug,
                    'name' => $practitioner->name,
                    'qualification' => $practitioner->qualification,
                    'focus' => $practitioner->focus,
                    'experience' => $practitioner->experience, // accessor: "14 yrs"
                    'image' => $practitioner->thumbnail,
                ]),

            'testimonials' => Testimonial::query()
                // NOT yet confirmed — adjust if `is_approved` doesn't exist.
                ->where('is_approved', true)
                ->latest()
                ->get(),
        ]);
    }
}