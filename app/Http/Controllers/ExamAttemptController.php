<?php

namespace App\Http\Controllers;

use App\Models\Exam;
use App\Models\ExamAttempt;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ExamAttemptController extends Controller
{
    /**
     * Display all exam attempts.
     */
    public function index(Request $request): Response
    {
        $attempts = ExamAttempt::query()
            ->with([
                'user:id,name,email',
                'exam:id,title,course_id',
                'exam.course:id,title',
            ])
            ->when($request->search, function ($query, $search) {
                $query->where(function ($query) use ($search) {
                    $query->whereHas('user', function ($query) use ($search) {
                        $query->where('name', 'like', "%{$search}%")
                            ->orWhere('email', 'like', "%{$search}%");
                    })
                    ->orWhereHas('exam', function ($query) use ($search) {
                        $query->where('title', 'like', "%{$search}%");
                    });
                });
            })
            ->when($request->passed !== null, function ($query) use ($request) {
                $query->where(
                    'passed',
                    filter_var(
                        $request->passed,
                        FILTER_VALIDATE_BOOLEAN
                    )
                );
            })
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('ExamAttempts/Index', [
            'attempts' => $attempts,
            'filters' => [
                'search' => $request->search,
                'passed' => $request->passed,
            ],
        ]);
    }

    /**
     * Show the create attempt page.
     */
    public function create(): Response
    {
        $exams = Exam::query()
            ->with('course:id,title')
            ->select('id', 'course_id', 'title')
            ->latest()
            ->get();

        return Inertia::render('ExamAttempts/Create', [
            'exams' => $exams,
        ]);
    }

    /**
     * Start a new exam attempt.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'user_id' => [
                'required',
                'exists:users,id',
            ],

            'exam_id' => [
                'required',
                'exists:exams,id',
            ],
        ]);

        $exam = Exam::with('course')
            ->findOrFail($validated['exam_id']);

        $attemptsCount = ExamAttempt::query()
            ->where('user_id', $validated['user_id'])
            ->where('exam_id', $exam->id)
            ->count();

        if ($attemptsCount >= $exam->max_attempts) {
            return back()
                ->withErrors([
                    'exam_id' => 'Maximum exam attempts reached.',
                ])
                ->withInput();
        }

        $attemptNumber = $attemptsCount + 1;

        $attempt = ExamAttempt::create([
            'user_id' => $validated['user_id'],
            'exam_id' => $exam->id,
            'attempt_number' => $attemptNumber,
            'started_at' => now(),
            'passed' => false,
        ]);

        return redirect()
            ->route('exam-attempts.show', $attempt)
            ->with(
                'success',
                'Exam attempt started successfully.'
            );
    }

    /**
     * Display an exam attempt.
     */
    public function show(
        ExamAttempt $examAttempt
    ): Response {
        $examAttempt->load([
            'user',
            'exam.course',
            'exam.questions.options',
        ]);

        return Inertia::render('ExamAttempts/Show', [
            'attempt' => $examAttempt,
        ]);
    }

    /**
     * Edit an exam attempt.
     */
    public function edit(
        ExamAttempt $examAttempt
    ): Response {
        $examAttempt->load([
            'user',
            'exam.course',
        ]);

        return Inertia::render('ExamAttempts/Edit', [
            'attempt' => $examAttempt,
        ]);
    }

    /**
     * Update an exam attempt.
     */
    public function update(
        Request $request,
        ExamAttempt $examAttempt
    ): RedirectResponse {
        $validated = $request->validate([
            'score' => [
                'nullable',
                'numeric',
                'min:0',
                'max:100',
            ],

            'passed' => [
                'boolean',
            ],

            'started_at' => [
                'nullable',
                'date',
            ],

            'completed_at' => [
                'nullable',
                'date',
                'after_or_equal:started_at',
            ],
        ]);

        $validated['passed'] = $request->boolean(
            'passed'
        );

        $examAttempt->update($validated);

        return redirect()
            ->route(
                'exam-attempts.show',
                $examAttempt
            )
            ->with(
                'success',
                'Exam attempt updated successfully.'
            );
    }

    /**
     * Submit and complete an exam attempt.
     */
    public function submit(
        Request $request,
        ExamAttempt $examAttempt
    ): RedirectResponse {
        if ($examAttempt->completed_at) {
            return back()->withErrors([
                'exam' => 'This exam attempt has already been completed.',
            ]);
        }

        $examAttempt->load([
            'exam.questions.options',
        ]);

        $score = $this->calculateScore(
            $examAttempt,
            $request->input('answers', [])
        );

        $passed = $score >= $examAttempt
            ->exam
            ->passing_score;

        $examAttempt->update([
            'score' => $score,
            'passed' => $passed,
            'completed_at' => now(),
        ]);

        return redirect()
            ->route(
                'exam-attempts.show',
                $examAttempt
            )
            ->with(
                'success',
                $passed
                    ? 'Congratulations! You passed the exam.'
                    : 'Exam submitted. Unfortunately, you did not pass.'
            );
    }

    /**
     * Delete an exam attempt.
     */
    public function destroy(
        ExamAttempt $examAttempt
    ): RedirectResponse {
        $examAttempt->delete();

        return redirect()
            ->route('exam-attempts.index')
            ->with(
                'success',
                'Exam attempt deleted successfully.'
            );
    }

    /**
     * Calculate exam score.
     */
    private function calculateScore(
        ExamAttempt $attempt,
        array $answers
    ): float {
        $totalPoints = 0;
        $earnedPoints = 0;

        foreach ($attempt->exam->questions as $question) {
            $totalPoints += (float) $question->points;

            $selectedAnswer = $answers[$question->id] ?? null;

            if (!$selectedAnswer) {
                continue;
            }

            $correctOption = $question->options
                ->where('is_correct', true)
                ->first();

            if (
                $correctOption
                && (int) $correctOption->id === (int) $selectedAnswer
            ) {
                $earnedPoints += (float) $question->points;
            }
        }

        if ($totalPoints <= 0) {
            return 0;
        }

        return round(
            ($earnedPoints / $totalPoints) * 100,
            2
        );
    }
}