<?php

namespace App\Http\Controllers;

use App\Models\Exam;
use App\Models\ExamQuestion;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ExamQuestionController extends Controller
{
    /**
     * Display all questions for an exam.
     */
    public function index(Exam $exam): Response
    {
        $questions = $exam->questions()
            ->with('options')
            ->orderBy('position')
            ->get();

        return Inertia::render('ExamQuestions/Index', [
            'exam' => $exam->load('course'),
            'questions' => $questions,
        ]);
    }

    /**
     * Show the create question page.
     */
    public function create(Exam $exam): Response
    {
        $nextPosition = ($exam->questions()->max('position') ?? 0) + 1;

        return Inertia::render('ExamQuestions/Create', [
            'exam' => $exam->load('course'),
            'nextPosition' => $nextPosition,
        ]);
    }

    /**
     * Store a new question.
     */
    public function store(
        Request $request,
        Exam $exam
    ): RedirectResponse {
        $validated = $request->validate([
            'question' => [
                'required',
                'string',
            ],

            'type' => [
                'required',
                'in:multiple_choice,true_false,short_answer',
            ],

            'points' => [
                'required',
                'numeric',
                'min:0.01',
            ],

            'position' => [
                'required',
                'integer',
                'min:0',
            ],
        ]);

        $exam->questions()->create($validated);

        return redirect()
            ->route('exams.questions.index', $exam)
            ->with(
                'success',
                'Question created successfully.'
            );
    }

    /**
     * Display a question.
     */
    public function show(
        Exam $exam,
        ExamQuestion $question
    ): Response {
        $this->ensureQuestionBelongsToExam(
            $exam,
            $question
        );

        return Inertia::render('ExamQuestions/Show', [
            'exam' => $exam->load('course'),
            'question' => $question->load('options'),
        ]);
    }

    /**
     * Show the edit question page.
     */
    public function edit(
        Exam $exam,
        ExamQuestion $question
    ): Response {
        $this->ensureQuestionBelongsToExam(
            $exam,
            $question
        );

        return Inertia::render('ExamQuestions/Edit', [
            'exam' => $exam->load('course'),
            'question' => $question->load('options'),
        ]);
    }

    /**
     * Update a question.
     */
    public function update(
        Request $request,
        Exam $exam,
        ExamQuestion $question
    ): RedirectResponse {
        $this->ensureQuestionBelongsToExam(
            $exam,
            $question
        );

        $validated = $request->validate([
            'question' => [
                'required',
                'string',
            ],

            'type' => [
                'required',
                'in:multiple_choice,true_false,short_answer',
            ],

            'points' => [
                'required',
                'numeric',
                'min:0.01',
            ],

            'position' => [
                'required',
                'integer',
                'min:0',
            ],
        ]);

        $question->update($validated);

        return redirect()
            ->route('exams.questions.index', $exam)
            ->with(
                'success',
                'Question updated successfully.'
            );
    }

    /**
     * Delete a question.
     */
    public function destroy(
        Exam $exam,
        ExamQuestion $question
    ): RedirectResponse {
        $this->ensureQuestionBelongsToExam(
            $exam,
            $question
        );

        $question->delete();

        return redirect()
            ->route('exams.questions.index', $exam)
            ->with(
                'success',
                'Question deleted successfully.'
            );
    }

    /**
     * Ensure the question belongs to the exam.
     */
    private function ensureQuestionBelongsToExam(
        Exam $exam,
        ExamQuestion $question
    ): void {
        abort_unless(
            $question->exam_id === $exam->id,
            404
        );
    }
}