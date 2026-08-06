<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\CourseLesson;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class LessonController extends Controller
{
    /**
     * Display all lessons.
     */
    public function index(Request $request): Response
    {
        $search = $request->string('search')->toString();

        $lessons = CourseLesson::with('course')
            ->when($search, function ($query) use ($search) {
                $query->where('title', 'like', "%{$search}%");
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/Lessons/Index', [
            'lessons' => $lessons,
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
        return Inertia::render('Admin/Lessons/Create', [
            'courses' => Course::orderBy('title')
                ->get(['id', 'title']),
        ]);
    }

    /**
     * Store lesson.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'course_id'     => ['required', 'exists:courses,id'],
            'title'         => ['required', 'string', 'max:255'],
            'description'   => ['nullable', 'string'],
            'content'       => ['nullable', 'string'],
            'video_url'     => ['nullable', 'url'],
            'attachment'    => ['nullable', 'file', 'max:10240'],
            'duration'      => ['nullable', 'integer', 'min:1'],
            'sort_order'    => ['nullable', 'integer', 'min:1'],
            'is_published'  => ['boolean'],
        ]);

        $validated['slug'] = Str::slug($validated['title']);

        if ($request->hasFile('attachment')) {
            $validated['attachment'] = $request
                ->file('attachment')
                ->store('lessons', 'public');
        }

        CourseLesson::create($validated);

        return redirect()
            ->route('admin.lessons.index')
            ->with('success', 'Lesson created successfully.');
    }

    /**
     * Show lesson.
     */
    public function show(CourseLesson $lesson): Response
    {
        $lesson->load('course');

        return Inertia::render('Admin/Lessons/Show', [
            'lesson' => $lesson,
        ]);
    }

    /**
     * Edit lesson.
     */
    public function edit(CourseLesson $lesson): Response
    {
        return Inertia::render('Admin/Lessons/Edit', [
            'lesson' => $lesson,
            'courses' => Course::orderBy('title')
                ->get(['id', 'title']),
        ]);
    }

    /**
     * Update lesson.
     */
    public function update(Request $request, CourseLesson $lesson): RedirectResponse
    {
        $validated = $request->validate([
            'course_id'     => ['required', 'exists:courses,id'],
            'title'         => ['required', 'string', 'max:255'],
            'description'   => ['nullable', 'string'],
            'content'       => ['nullable', 'string'],
            'video_url'     => ['nullable', 'url'],
            'attachment'    => ['nullable', 'file', 'max:10240'],
            'duration'      => ['nullable', 'integer', 'min:1'],
            'sort_order'    => ['nullable', 'integer', 'min:1'],
            'is_published'  => ['boolean'],
        ]);

        $validated['slug'] = Str::slug($validated['title']);

        if ($request->hasFile('attachment')) {

            if ($lesson->attachment) {
                Storage::disk('public')->delete($lesson->attachment);
            }

            $validated['attachment'] = $request
                ->file('attachment')
                ->store('lessons', 'public');
        }

        $lesson->update($validated);

        return redirect()
            ->route('admin.lessons.index')
            ->with('success', 'Lesson updated successfully.');
    }

    /**
     * Delete lesson.
     */
    public function destroy(CourseLesson $lesson): RedirectResponse
    {
        if ($lesson->attachment) {
            Storage::disk('public')->delete($lesson->attachment);
        }

        $lesson->delete();

        return redirect()
            ->route('admin.lessons.index')
            ->with('success', 'Lesson deleted successfully.');
    }
}