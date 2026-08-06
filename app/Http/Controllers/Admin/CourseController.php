<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\CourseCategory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class CourseController extends Controller
{
    /**
     * Display courses.
     */
    public function index(Request $request): Response
    {
        $search = $request->string('search')->toString();

        $courses = Course::with('category')
            ->when($search, function ($query) use ($search) {
                $query->where('title', 'like', "%{$search}%");
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/Courses/Index', [
            'courses' => $courses,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    /**
     * Show create form.
     */
    public function create(): Response
    {
        return Inertia::render('Admin/Courses/Create', [
            'categories' => CourseCategory::orderBy('name')->get([
                'id',
                'name',
            ]),
        ]);
    }

    /**
     * Store course.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'course_category_id' => ['required', 'exists:course_categories,id'],
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'price' => ['required', 'numeric', 'min:0'],
            'thumbnail' => ['nullable', 'image', 'max:2048'],
            'is_published' => ['boolean'],
        ]);

        $validated['slug'] = Str::slug($validated['title']);

        if ($request->hasFile('thumbnail')) {
            $validated['thumbnail'] = $request
                ->file('thumbnail')
                ->store('courses', 'public');
        }

        Course::create($validated);

        return redirect()
            ->route('admin.courses.index')
            ->with('success', 'Course created successfully.');
    }

    /**
     * Display course.
     */
    public function show(Course $course): Response
    {
        $course->load([
            'category',
            'lessons',
            'quizzes',
            'enrollments.user',
        ]);

        return Inertia::render('Admin/Courses/Show', [
            'course' => $course,
        ]);
    }

    /**
     * Show edit form.
     */
    public function edit(Course $course): Response
    {
        return Inertia::render('Admin/Courses/Edit', [
            'course' => $course,
            'categories' => CourseCategory::orderBy('name')->get([
                'id',
                'name',
            ]),
        ]);
    }

    /**
     * Update course.
     */
    public function update(Request $request, Course $course): RedirectResponse
    {
        $validated = $request->validate([
            'course_category_id' => ['required', 'exists:course_categories,id'],
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'price' => ['required', 'numeric', 'min:0'],
            'thumbnail' => ['nullable', 'image', 'max:2048'],
            'is_published' => ['boolean'],
        ]);

        $validated['slug'] = Str::slug($validated['title']);

        if ($request->hasFile('thumbnail')) {

            if ($course->thumbnail) {
                Storage::disk('public')->delete($course->thumbnail);
            }

            $validated['thumbnail'] = $request
                ->file('thumbnail')
                ->store('courses', 'public');
        }

        $course->update($validated);

        return redirect()
            ->route('admin.courses.index')
            ->with('success', 'Course updated successfully.');
    }

    /**
     * Delete course.
     */
    public function destroy(Course $course): RedirectResponse
    {
        if ($course->thumbnail) {
            Storage::disk('public')->delete($course->thumbnail);
        }

        $course->delete();

        return redirect()
            ->route('admin.courses.index')
            ->with('success', 'Course deleted successfully.');
    }
}