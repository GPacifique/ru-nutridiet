<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Quiz;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class QuizController extends Controller
{
    /**
     * Display all quizzes.
     */
    public function index(Request $request): Response
    {
        $search = $request->string('search')->toString();

        $quizzes = Quiz::with('course')
            ->when($search, function ($query) use ($search) {
                $query->where('title', 'like', "%{$search}%");
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/Quizzes/Index', [
            'quizzes' => $quizzes,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    /**
     * Show create page.
     */
    public function create(): Response
    {
        return Inertia::render('Admin/Quizzes/Create', [
            'courses' => Course::orderBy('title')
                ->get(['id', 'title']),
        ]);
    }

    /**
     * Store quiz.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'course_id' => ['required', 'exists:courses,id'],
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'instructions' => ['nullable', 'string'],
            'passing_score' => ['required', 'integer', 'min:0', 'max:100'],
            'duration' => ['required', 'integer', 'min:1'],
            'attempts_allowed' => ['required', 'integer', 'min:1'],
            'is_published' => ['boolean'],
        ]);

        Quiz::create($validated);

        return redirect()
            ->route('admin.quizzes.index')
            ->with('success', 'Quiz created successfully.');
    }

    /**
     * Display quiz.
     */
    public function show(Quiz $quiz): Response
    {
        $quiz->load([
            'course',
            'questions',
        ]);

        return Inertia::render('Admin/Quizzes/Show', [
            'quiz' => $quiz,
        ]);
    }

    /**
     * Show edit page.
     */
    public function edit(Quiz $quiz): Response
    {
        return Inertia::render('Admin/Quizzes/Edit', [
            'quiz' => $quiz,
            'courses' => Course::orderBy('title')
                ->get(['id', 'title']),
        ]);
    }

    /**
     * Update quiz.
     */
    public function update(Request $request, Quiz $quiz): RedirectResponse
    {
        $validated = $request->validate([
            'course_id' => ['required', 'exists:courses,id'],
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'instructions' => ['nullable', 'string'],
            'passing_score' => ['required', 'integer', 'min:0', 'max:100'],
            'duration' => ['required', 'integer', 'min:1'],
            'attempts_allowed' => ['required', 'integer', 'min:1'],
            'is_published' => ['boolean'],
        ]);

        $quiz->update($validated);

        return redirect()
            ->route('admin.quizzes.index')
            ->with('success', 'Quiz updated successfully.');
    }

    /**
     * Delete quiz.
     */
    public function destroy(Quiz $quiz): RedirectResponse
    {
        $quiz->delete();

        return redirect()
            ->route('admin.quizzes.index')
            ->with('success', 'Quiz deleted successfully.');
    }
}