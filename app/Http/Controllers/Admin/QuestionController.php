<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Question;
use App\Models\Quiz;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class QuestionController extends Controller
{
    /**
     * Display a listing of questions.
     */
    public function index(Request $request): Response
    {
        $search = $request->string('search')->toString();

        $questions = Question::with('quiz')
            ->when($search, function ($query) use ($search) {
                $query->where('question', 'like', "%{$search}%");
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/Questions/Index', [
            'questions' => $questions,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    /**
     * Show the form for creating a question.
     */
    public function create(): Response
    {
        return Inertia::render('Admin/Questions/Create', [
            'quizzes' => Quiz::orderBy('title')
                ->get(['id', 'title']),
        ]);
    }

    /**
     * Store a newly created question.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'quiz_id' => ['required', 'exists:quizzes,id'],
            'question' => ['required', 'string'],
            'type' => ['required', 'in:multiple_choice,true_false'],
            'option_a' => ['nullable', 'string'],
            'option_b' => ['nullable', 'string'],
            'option_c' => ['nullable', 'string'],
            'option_d' => ['nullable', 'string'],
            'correct_answer' => ['required', 'string'],
            'marks' => ['required', 'integer', 'min:1'],
            'explanation' => ['nullable', 'string'],
        ]);

        Question::create($validated);

        return redirect()
            ->route('admin.questions.index')
            ->with('success', 'Question created successfully.');
    }

    /**
     * Display the specified question.
     */
    public function show(Question $question): Response
    {
        $question->load('quiz');

        return Inertia::render('Admin/Questions/Show', [
            'question' => $question,
        ]);
    }

    /**
     * Show the form for editing the question.
     */
    public function edit(Question $question): Response
    {
        return Inertia::render('Admin/Questions/Edit', [
            'question' => $question,
            'quizzes' => Quiz::orderBy('title')
                ->get(['id', 'title']),
        ]);
    }

    /**
     * Update the specified question.
     */
    public function update(Request $request, Question $question): RedirectResponse
    {
        $validated = $request->validate([
            'quiz_id' => ['required', 'exists:quizzes,id'],
            'question' => ['required', 'string'],
            'type' => ['required', 'in:multiple_choice,true_false'],
            'option_a' => ['nullable', 'string'],
            'option_b' => ['nullable', 'string'],
            'option_c' => ['nullable', 'string'],
            'option_d' => ['nullable', 'string'],
            'correct_answer' => ['required', 'string'],
            'marks' => ['required', 'integer', 'min:1'],
            'explanation' => ['nullable', 'string'],
        ]);

        $question->update($validated);

        return redirect()
            ->route('admin.questions.index')
            ->with('success', 'Question updated successfully.');
    }

    /**
     * Remove the specified question.
     */
    public function destroy(Question $question): RedirectResponse
    {
        $question->delete();

        return redirect()
            ->route('admin.questions.index')
            ->with('success', 'Question deleted successfully.');
    }
}