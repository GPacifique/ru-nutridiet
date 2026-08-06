<?php

namespace App\Http\Controllers;

use App\Models\ExamQuestion;
use App\Models\ExamQuestionOption;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ExamQuestionOptionController extends Controller
{
    /**
     * Display all options for a question.
     */
    public function index(
        ExamQuestion $question
    ): Response {
        $options = $question->options()
            ->orderBy('id')
            ->get();

        return Inertia::render(
            'ExamQuestionOptions/Index',
            [
                'question' => $question->load('exam.course'),
                'options' => $options,
            ]
        );
    }

    /**
     * Show the create option page.
     */
    public function create(
        ExamQuestion $question
    ): Response {
        return Inertia::render(
            'ExamQuestionOptions/Create',
            [
                'question' => $question->load('exam.course'),
            ]
        );
    }

    /**
     * Store a new option.
     */
    public function store(
        Request $request,
        ExamQuestion $question
    ): RedirectResponse {
        $validated = $request->validate([
            'option_text' => [
                'required',
                'string',
                'max:1000',
            ],

            'is_correct' => [
                'boolean',
            ],
        ]);

        $validated['is_correct'] = $request->boolean(
            'is_correct'
        );

        $question->options()->create($validated);

        return redirect()
            ->route(
                'questions.options.index',
                $question
            )
            ->with(
                'success',
                'Option created successfully.'
            );
    }

    /**
     * Display an option.
     */
    public function show(
        ExamQuestion $question,
        ExamQuestionOption $option
    ): Response {
        $this->ensureOptionBelongsToQuestion(
            $question,
            $option
        );

        return Inertia::render(
            'ExamQuestionOptions/Show',
            [
                'question' => $question->load(
                    'exam.course'
                ),
                'option' => $option,
            ]
        );
    }

    /**
     * Show the edit option page.
     */
    public function edit(
        ExamQuestion $question,
        ExamQuestionOption $option
    ): Response {
        $this->ensureOptionBelongsToQuestion(
            $question,
            $option
        );

        return Inertia::render(
            'ExamQuestionOptions/Edit',
            [
                'question' => $question->load(
                    'exam.course'
                ),
                'option' => $option,
            ]
        );
    }

    /**
     * Update an option.
     */
    public function update(
        Request $request,
        ExamQuestion $question,
        ExamQuestionOption $option
    ): RedirectResponse {
        $this->ensureOptionBelongsToQuestion(
            $question,
            $option
        );

        $validated = $request->validate([
            'option_text' => [
                'required',
                'string',
                'max:1000',
            ],

            'is_correct' => [
                'boolean',
            ],
        ]);

        $validated['is_correct'] = $request->boolean(
            'is_correct'
        );

        $option->update($validated);

        return redirect()
            ->route(
                'questions.options.index',
                $question
            )
            ->with(
                'success',
                'Option updated successfully.'
            );
    }

    /**
     * Delete an option.
     */
    public function destroy(
        ExamQuestion $question,
        ExamQuestionOption $option
    ): RedirectResponse {
        $this->ensureOptionBelongsToQuestion(
            $question,
            $option
        );

        $option->delete();

        return redirect()
            ->route(
                'questions.options.index',
                $question
            )
            ->with(
                'success',
                'Option deleted successfully.'
            );
    }

    /**
     * Ensure the option belongs to the given question.
     */
    private function ensureOptionBelongsToQuestion(
        ExamQuestion $question,
        ExamQuestionOption $option
    ): void {
        abort_unless(
            $option->question_id === $question->id,
            404
        );
    }
}