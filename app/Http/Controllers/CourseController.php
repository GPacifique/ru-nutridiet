<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class CourseController extends Controller
{
    /**
     * Display all courses.
     */
    public function index(Request $request): Response
    {
        $courses = Course::query()
            ->with('instructor:id,name')
            ->when($request->search, function ($query, $search) {
                $query->where(function ($query) use ($search) {
                    $query->where('title', 'like', "%{$search}%")
                        ->orWhere('description', 'like', "%{$search}%")
                        ->orWhere('credit_type', 'like', "%{$search}%");
                });
            })
            ->when($request->status, function ($query, $status) {
                $query->where('status', $status);
            })
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Courses/Index', [
            'courses' => $courses,
            'filters' => [
                'search' => $request->search,
                'status' => $request->status,
            ],
        ]);
    }

    /**
     * Show the create course page.
     */
    public function create(): Response
    {
        $instructors = User::query()
            ->whereIn('role', ['admin', 'nutritionist'])
            ->where('status', 'approved')
            ->select('id', 'name')
            ->orderBy('name')
            ->get();

        return Inertia::render('Courses/Create', [
            'instructors' => $instructors,
        ]);
    }

    /**
     * Store a new course.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => [
                'required',
                'string',
                'max:255',
            ],

            'description' => [
                'nullable',
                'string',
            ],

            'thumbnail' => [
                'nullable',
                'image',
                'mimes:jpg,jpeg,png,webp',
                'max:5120',
            ],

            'credit_type' => [
                'nullable',
                'string',
                'max:100',
            ],

            'credit_hours' => [
                'required',
                'numeric',
                'min:0',
            ],

            'price' => [
                'required',
                'numeric',
                'min:0',
            ],

            'status' => [
                'required',
                'in:draft,published,archived',
            ],

            'instructor_id' => [
                'nullable',
                'exists:users,id',
            ],

            'published_at' => [
                'nullable',
                'date',
            ],
        ]);

        $validated['slug'] = $this->generateUniqueSlug(
            $validated['title']
        );

        if ($request->hasFile('thumbnail')) {
            $validated['thumbnail'] = $request
                ->file('thumbnail')
                ->store('course-thumbnails', 'public');
        }

        if (
            $validated['status'] === 'published'
            && empty($validated['published_at'])
        ) {
            $validated['published_at'] = now();
        }

        Course::create($validated);

        return redirect()
            ->route('courses.index')
            ->with('success', 'Course created successfully.');
    }

    /**
     * Display a specific course.
     */
    public function show(Course $course): Response
    {
        $course->load('instructor:id,name,email');

        return Inertia::render('Courses/Show', [
            'course' => $course,
        ]);
    }

    /**
     * Show the edit course page.
     */
    public function edit(Course $course): Response
    {
        $instructors = User::query()
            ->whereIn('role', ['admin', 'nutritionist'])
            ->where('status', 'approved')
            ->select('id', 'name')
            ->orderBy('name')
            ->get();

        return Inertia::render('Courses/Edit', [
            'course' => $course,
            'instructors' => $instructors,
        ]);
    }

    /**
     * Update a course.
     */
    public function update(
        Request $request,
        Course $course
    ): RedirectResponse {
        $validated = $request->validate([
            'title' => [
                'required',
                'string',
                'max:255',
            ],

            'description' => [
                'nullable',
                'string',
            ],

            'thumbnail' => [
                'nullable',
                'image',
                'mimes:jpg,jpeg,png,webp',
                'max:5120',
            ],

            'credit_type' => [
                'nullable',
                'string',
                'max:100',
            ],

            'credit_hours' => [
                'required',
                'numeric',
                'min:0',
            ],

            'price' => [
                'required',
                'numeric',
                'min:0',
            ],

            'status' => [
                'required',
                'in:draft,published,archived',
            ],

            'instructor_id' => [
                'nullable',
                'exists:users,id',
            ],

            'published_at' => [
                'nullable',
                'date',
            ],
        ]);

        if ($course->title !== $validated['title']) {
            $validated['slug'] = $this->generateUniqueSlug(
                $validated['title'],
                $course->id
            );
        }

        if ($request->hasFile('thumbnail')) {
            if ($course->thumbnail) {
                Storage::disk('public')->delete(
                    $course->thumbnail
                );
            }

            $validated['thumbnail'] = $request
                ->file('thumbnail')
                ->store('course-thumbnails', 'public');
        }

        if (
            $validated['status'] === 'published'
            && empty($course->published_at)
        ) {
            $validated['published_at'] = now();
        }

        $course->update($validated);

        return redirect()
            ->route('courses.index')
            ->with('success', 'Course updated successfully.');
    }

    /**
     * Delete a course.
     */
    public function destroy(Course $course): RedirectResponse
    {
        if ($course->thumbnail) {
            Storage::disk('public')->delete(
                $course->thumbnail
            );
        }

        $course->delete();

        return redirect()
            ->route('courses.index')
            ->with('success', 'Course deleted successfully.');
    }

    /**
     * Publish a course.
     */
    public function publish(Course $course): RedirectResponse
    {
        $course->update([
            'status' => 'published',
            'published_at' => $course->published_at ?? now(),
        ]);

        return back()->with(
            'success',
            'Course published successfully.'
        );
    }

    /**
     * Archive a course.
     */
    public function archive(Course $course): RedirectResponse
    {
        $course->update([
            'status' => 'archived',
        ]);

        return back()->with(
            'success',
            'Course archived successfully.'
        );
    }

    /**
     * Generate a unique course slug.
     */
    private function generateUniqueSlug(
        string $title,
        ?int $ignoreId = null
    ): string {
        $slug = Str::slug($title);
        $originalSlug = $slug;
        $counter = 1;

        while (
            Course::where('slug', $slug)
                ->when(
                    $ignoreId,
                    fn ($query) => $query->where(
                        'id',
                        '!=',
                        $ignoreId
                    )
                )
                ->exists()
        ) {
            $slug = $originalSlug . '-' . $counter;
            $counter++;
        }

        return $slug;
    }
}