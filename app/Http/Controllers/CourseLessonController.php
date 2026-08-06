<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\CourseLesson;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class CourseLessonController extends Controller
{
    /**
     * Display all lessons for a course.
     */
    public function index(Course $course): Response
    {
        $lessons = $course->lessons()
            ->orderBy('position')
            ->get();

        return Inertia::render('CourseLessons/Index', [
            'course' => $course,
            'lessons' => $lessons,
        ]);
    }

    /**
     * Show the create lesson page.
     */
    public function create(Course $course): Response
    {
        $nextPosition = $course->lessons()->max('position') + 1;

        return Inertia::render('CourseLessons/Create', [
            'course' => $course,
            'nextPosition' => $nextPosition,
        ]);
    }

    /**
     * Store a new lesson.
     */
    public function store(
        Request $request,
        Course $course
    ): RedirectResponse {
        $validated = $request->validate([
            'title' => [
                'required',
                'string',
                'max:255',
            ],

            'type' => [
                'required',
                'in:text,video,document,quiz',
            ],

            'content' => [
                'nullable',
                'string',
            ],

            'video_url' => [
                'nullable',
                'url',
                'max:2048',
            ],

            'position' => [
                'required',
                'integer',
                'min:0',
            ],

            'duration_minutes' => [
                'nullable',
                'integer',
                'min:0',
            ],

            'is_preview' => [
                'boolean',
            ],
        ]);

        $validated['slug'] = $this->generateUniqueSlug(
            $validated['title'],
            $course->id
        );

        $validated['is_preview'] = $request->boolean(
            'is_preview'
        );

        $course->lessons()->create($validated);

        return redirect()
            ->route('courses.lessons.index', $course)
            ->with(
                'success',
                'Lesson created successfully.'
            );
    }

    /**
     * Display a lesson.
     */
    public function show(
        Course $course,
        CourseLesson $lesson
    ): Response {
        $this->ensureLessonBelongsToCourse(
            $course,
            $lesson
        );

        return Inertia::render('CourseLessons/Show', [
            'course' => $course,
            'lesson' => $lesson,
        ]);
    }

    /**
     * Show the edit lesson page.
     */
    public function edit(
        Course $course,
        CourseLesson $lesson
    ): Response {
        $this->ensureLessonBelongsToCourse(
            $course,
            $lesson
        );

        return Inertia::render('CourseLessons/Edit', [
            'course' => $course,
            'lesson' => $lesson,
        ]);
    }

    /**
     * Update a lesson.
     */
    public function update(
        Request $request,
        Course $course,
        CourseLesson $lesson
    ): RedirectResponse {
        $this->ensureLessonBelongsToCourse(
            $course,
            $lesson
        );

        $validated = $request->validate([
            'title' => [
                'required',
                'string',
                'max:255',
            ],

            'type' => [
                'required',
                'in:text,video,document,quiz',
            ],

            'content' => [
                'nullable',
                'string',
            ],

            'video_url' => [
                'nullable',
                'url',
                'max:2048',
            ],

            'position' => [
                'required',
                'integer',
                'min:0',
            ],

            'duration_minutes' => [
                'nullable',
                'integer',
                'min:0',
            ],

            'is_preview' => [
                'boolean',
            ],
        ]);

        if ($lesson->title !== $validated['title']) {
            $validated['slug'] = $this->generateUniqueSlug(
                $validated['title'],
                $course->id,
                $lesson->id
            );
        }

        $validated['is_preview'] = $request->boolean(
            'is_preview'
        );

        $lesson->update($validated);

        return redirect()
            ->route('courses.lessons.index', $course)
            ->with(
                'success',
                'Lesson updated successfully.'
            );
    }

    /**
     * Delete a lesson.
     */
    public function destroy(
        Course $course,
        CourseLesson $lesson
    ): RedirectResponse {
        $this->ensureLessonBelongsToCourse(
            $course,
            $lesson
        );

        $lesson->delete();

        return redirect()
            ->route('courses.lessons.index', $course)
            ->with(
                'success',
                'Lesson deleted successfully.'
            );
    }

    /**
     * Generate a unique lesson slug within a course.
     */
    private function generateUniqueSlug(
        string $title,
        int $courseId,
        ?int $ignoreId = null
    ): string {
        $slug = Str::slug($title);
        $originalSlug = $slug;
        $counter = 1;

        while (
            CourseLesson::where('course_id', $courseId)
                ->where('slug', $slug)
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

    /**
     * Ensure the lesson belongs to the given course.
     */
    private function ensureLessonBelongsToCourse(
        Course $course,
        CourseLesson $lesson
    ): void {
        abort_unless(
            $lesson->course_id === $course->id,
            404
        );
    }
}