<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CourseCategory;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class CourseCategoryController extends Controller
{
    /**
     * Display a listing of course categories.
     */
    public function index(Request $request): Response
    {
        $search = $request->string('search')->toString();

        $categories = CourseCategory::withCount('courses')
            ->when($search, function ($query) use ($search) {
                $query->where('name', 'like', "%{$search}%");
            })
            ->orderBy('name')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/CourseCategories/Index', [
            'categories' => $categories,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    /**
     * Show the form for creating a new category.
     */
    public function create(): Response
    {
        return Inertia::render('Admin/CourseCategories/Create');
    }

    /**
     * Store a newly created category.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:course_categories,name'],
            'description' => ['nullable', 'string'],
        ]);

        $validated['slug'] = Str::slug($validated['name']);

        CourseCategory::create($validated);

        return redirect()
            ->route('admin.course-categories.index')
            ->with('success', 'Course category created successfully.');
    }

    /**
     * Display the specified category.
     */
    public function show(CourseCategory $courseCategory): Response
    {
        $courseCategory->load([
            'courses' => function ($query) {
                $query->latest();
            }
        ]);

        return Inertia::render('Admin/CourseCategories/Show', [
            'category' => $courseCategory,
        ]);
    }

    /**
     * Show the form for editing the category.
     */
    public function edit(CourseCategory $courseCategory): Response
    {
        return Inertia::render('Admin/CourseCategories/Edit', [
            'category' => $courseCategory,
        ]);
    }

    /**
     * Update the specified category.
     */
    public function update(Request $request, CourseCategory $courseCategory): RedirectResponse
    {
        $validated = $request->validate([
            'name' => [
                'required',
                'string',
                'max:255',
                'unique:course_categories,name,' . $courseCategory->id,
            ],
            'description' => ['nullable', 'string'],
        ]);

        $validated['slug'] = Str::slug($validated['name']);

        $courseCategory->update($validated);

        return redirect()
            ->route('admin.course-categories.index')
            ->with('success', 'Course category updated successfully.');
    }

    /**
     * Remove the specified category.
     */
    public function destroy(CourseCategory $courseCategory): RedirectResponse
    {
        if ($courseCategory->courses()->exists()) {
            return back()->with(
                'error',
                'Cannot delete a category that contains courses.'
            );
        }

        $courseCategory->delete();

        return redirect()
            ->route('admin.course-categories.index')
            ->with('success', 'Course category deleted successfully.');
    }
}