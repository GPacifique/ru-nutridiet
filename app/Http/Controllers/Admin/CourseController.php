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


    public function show(Course $course): Response
{
    $course->load([
        'category',
        'instructor',
        'lessons',
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
    public function store(Request $request): RedirectResponse
{
    $validated = $request->validate([
        'category_id'  => ['nullable', 'exists:course_categories,id'],
        'title'        => ['required', 'string', 'max:255'],
        'description'  => ['nullable', 'string'],
        'price'        => ['required', 'numeric', 'min:0'],
        'credit_type'  => ['nullable', 'string', 'max:100'],
        'credit_hours' => ['nullable', 'numeric', 'min:0'],
        'thumbnail'    => ['nullable', 'image', 'max:2048'],
        'is_published' => ['nullable', 'boolean'],
    ]);

    $publish = $request->boolean('is_published');

    $data = collect($validated)->except(['thumbnail', 'is_published'])->all();
    $data['slug']         = $this->uniqueSlug($validated['title']);
    $data['status']       = $publish ? 'published' : 'draft';
    $data['published_at'] = $publish ? now() : null;

    if ($request->hasFile('thumbnail')) {
        $data['thumbnail'] = $request->file('thumbnail')->store('courses', 'public');
    }

    Course::create($data);

    return redirect()
        ->route('admin.courses.index')
        ->with('success', 'Course created successfully.');
}



public function update(Request $request, Course $course): RedirectResponse
{
    $validated = $request->validate([
        'category_id'  => ['nullable', 'exists:course_categories,id'],
        'title'        => ['required', 'string', 'max:255'],
        'description'  => ['nullable', 'string'],
        'price'        => ['required', 'numeric', 'min:0'],
        'credit_type'  => ['nullable', 'string', 'max:100'],
        'credit_hours' => ['nullable', 'numeric', 'min:0'],
        'thumbnail'    => ['nullable', 'image', 'max:2048'],
        'is_published' => ['nullable', 'boolean'],
    ]);

    $publish = $request->boolean('is_published');

    $data = collect($validated)->except(['thumbnail', 'is_published'])->all();

    // Only regenerate the slug when the title changed, so URLs stay stable.
    if ($validated['title'] !== $course->title) {
        $data['slug'] = $this->uniqueSlug($validated['title'], $course->id);
    }

    $data['status']       = $publish ? 'published' : 'draft';
    $data['published_at'] = $publish ? ($course->published_at ?? now()) : null;

    if ($request->hasFile('thumbnail')) {
        if ($course->thumbnail) {
            Storage::disk('public')->delete($course->thumbnail);
        }

        $data['thumbnail'] = $request->file('thumbnail')->store('courses', 'public');
    }

    $course->update($data);

    return redirect()
        ->route('admin.courses.index')
        ->with('success', 'Course updated successfully.');
}

private function uniqueSlug(string $title, ?int $ignoreId = null): string
{
    $base = Str::slug($title);
    $slug = $base;
    $i = 2;

    while (
        Course::where('slug', $slug)
            ->when($ignoreId, fn ($q) => $q->where('id', '!=', $ignoreId))
            ->exists()
    ) {
        $slug = $base . '-' . $i++;
    }

    return $slug;
}
}