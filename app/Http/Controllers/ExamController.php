<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Exam;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ExamController extends Controller
{
    /**
     * Display all exams for a course.
     */
    public function index(Course $course): Response
    {
        $exams = $course->exams()
            ->latest()
            ->get();

        return Inertia::render('Exams/Index', [
            'course' => $course,
            'exams' => $exams,
        ]);
    }

    /**
     * Show the create exam page.
     */
    public function create(Course $course): Response
    {
        return Inertia::render('Exams/Create', [
            'course' => $course,
        ]);
    }

    /**
     * Store a new exam.
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

            'passing_score' => [
                'required',
                'numeric',
                'min:0',
                'max:100',
            ],

            'time_limit' => [
                'nullable',
                'integer',
                'min:1',
            ],

            'max_attempts' => [
                'required',
                'integer',
                'min:1',
            ],
        ]);

        $course->exams()->create($validated);

        return redirect()
            ->route('courses.exams.index', $course)
            ->with(
                'success',
                'Exam created successfully.'
            );
    }

    /**
     * Display an exam.
     */
    public function show(
        Course $course,
        Exam $exam
    ): Response {
        $this->ensureExamBelongsToCourse(
            $course,
            $exam
        );

        return Inertia::render('Exams/Show', [
            'course' => $course,
            'exam' => $exam,
        ]);
    }

    /**
     * Show the edit exam page.
     */
    public function edit(
        Course $course,
        Exam $exam
    ): Response {
        $this->ensureExamBelongsToCourse(
            $course,
            $exam
        );

        return Inertia::render('Exams/Edit', [
            'course' => $course,
            'exam' => $exam,
        ]);
    }

    /**
     * Update an exam.
     */
    public function update(
        Request $request,
        Course $course,
        Exam $exam
    ): RedirectResponse {
        $this->ensureExamBelongsToCourse(
            $course,
            $exam
        );

        $validated = $request->validate([
            'title' => [
                'required',
                'string',
                'max:255',
            ],

            'passing_score' => [
                'required',
                'numeric',
                'min:0',
                'max:100',
            ],

            'time_limit' => [
                'nullable',
                'integer',
                'min:1',
            ],

            'max_attempts' => [
                'required',
                'integer',
                'min:1',
            ],
        ]);

        $exam->update($validated);

        return redirect()
            ->route('courses.exams.index', $course)
            ->with(
                'success',
                'Exam updated successfully.'
            );
    }

    /**
     * Delete an exam.
     */
    public function destroy(
        Course $course,
        Exam $exam
    ): RedirectResponse {
        $this->ensureExamBelongsToCourse(
            $course,
            $exam
        );

        $exam->delete();

        return redirect()
            ->route('courses.exams.index', $course)
            ->with(
                'success',
                'Exam deleted successfully.'
            );
    }

    /**
     * Ensure the exam belongs to the given course.
     */
    private function ensureExamBelongsToCourse(
        Course $course,
        Exam $exam
    ): void {
        abort_unless(
            $exam->course_id === $course->id,
            404
        );
    }
}