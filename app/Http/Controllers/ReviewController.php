<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Review;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class ReviewController extends Controller
{
    /**
     * Display reviews (Admin)
     */
    public function index(): Response
    {
        $reviews = Review::with([
                'user:id,name',
                'course:id,title'
            ])
            ->latest()
            ->paginate(10);

        return Inertia::render('Admin/Reviews/Index', [
            'reviews' => $reviews,
        ]);
    }

    /**
     * Store a new review (Learner)
     */
    public function store(Request $request, Course $course): RedirectResponse
    {
        $validated = $request->validate([
            'rating' => ['required', 'integer', 'min:1', 'max:5'],
            'comment' => ['nullable', 'string', 'max:1000'],
        ]);

        Review::updateOrCreate(
            [
                'user_id' => Auth::id(),
                'course_id' => $course->id,
            ],
            [
                'rating' => $validated['rating'],
                'comment' => $validated['comment'],
            ]
        );

        return back()->with('success', 'Thank you for your review.');
    }

    /**
     * Show a review
     */
    public function show(Review $review): Response
    {
        $review->load([
            'user:id,name,email',
            'course:id,title,slug',
        ]);

        return Inertia::render('Admin/Reviews/Show', [
            'review' => $review,
        ]);
    }

    /**
     * Update review
     */
    public function update(Request $request, Review $review): RedirectResponse
    {
        $validated = $request->validate([
            'rating' => ['required', 'integer', 'min:1', 'max:5'],
            'comment' => ['nullable', 'string', 'max:1000'],
        ]);

        $review->update($validated);

        return back()->with('success', 'Review updated successfully.');
    }

    /**
     * Delete review
     */
    public function destroy(Review $review): RedirectResponse
    {
        $review->delete();

        return back()->with('success', 'Review deleted successfully.');
    }
}