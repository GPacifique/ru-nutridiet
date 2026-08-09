<?php

namespace App\Http\Controllers\Learner;

use App\Http\Controllers\Controller;
use App\Models\CourseEnrollment;
use App\Models\Quiz;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class QuizController extends Controller
{
    /**
     * Display a quiz to the learner.
     */
    public function show(
        Request $request,
        Quiz $quiz
    ): Response {
        $user = $request->user();

        /*
        |--------------------------------------------------------------------------
        | Load quiz relationships
        |--------------------------------------------------------------------------
        */

        $quiz->load([
            'course:id,title,slug',
            'questions' => function ($query) {
                $query
                    ->orderBy('sort_order')
                    ->orderBy('id');
            },
            'questions.options',
        ]);

        /*
        |--------------------------------------------------------------------------
        | Verify course enrollment
        |--------------------------------------------------------------------------
        */

        $enrollment = CourseEnrollment::query()
            ->where('user_id', $user->id)
            ->where('course_id', $quiz->course_id)
            ->whereIn('status', [
                'active',
                'completed',
            ])
            ->first();

        abort_unless($enrollment, 403);

        /*
        |--------------------------------------------------------------------------
        | Prepare questions
        |--------------------------------------------------------------------------
        |
        | Do not expose the correct answer to the browser.
        |
        */

        $questions = $quiz->questions->map(function ($question) {
            return [
                'id' => $question->id,
                'question' => $question->question,
                'type' => $question->type,
                'points' => $question->points,
                'options' => $question->options->map(function ($option) {
                    return [
                        'id' => $option->id,
                        'option_text' => $option->option_text,
                    ];
                })->values(),
            ];
        })->values();

        return Inertia::render('Learner/Quizzes/Show', [
            'quiz' => [
                'id' => $quiz->id,
                'title' => $quiz->title,
                'description' => $quiz->description,
                'passing_score' => $quiz->passing_score,
                'time_limit' => $quiz->time_limit,
                'course' => $quiz->course,
                'questions' => $questions,
            ],

            'enrollment' => $enrollment,
        ]);
    }

    /**
     * Submit quiz answers.
     */
    public function submit(
        Request $request,
        Quiz $quiz
    ): Response|RedirectResponse {
        $user = $request->user();

        /*
        |--------------------------------------------------------------------------
        | Verify enrollment
        |--------------------------------------------------------------------------
        */

        $enrollment = CourseEnrollment::query()
            ->where('user_id', $user->id)
            ->where('course_id', $quiz->course_id)
            ->whereIn('status', [
                'active',
                'completed',
            ])
            ->first();

        abort_unless($enrollment, 403);

        /*
        |--------------------------------------------------------------------------
        | Load questions and correct answers
        |--------------------------------------------------------------------------
        */

        $quiz->load([
            'questions.options',
        ]);

        /*
        |--------------------------------------------------------------------------
        | Validate submitted answers
        |--------------------------------------------------------------------------
        */

        $validated = $request->validate([
            'answers' => [
                'required',
                'array',
            ],

            'answers.*' => [
                'nullable',
            ],
        ]);

        $answers = $validated['answers'];

        $totalPoints = 0;
        $earnedPoints = 0;
        $correctAnswers = 0;
        $totalQuestions = $quiz->questions->count();

        /*
        |--------------------------------------------------------------------------
        | Grade the quiz
        |--------------------------------------------------------------------------
        */

        foreach ($quiz->questions as $question) {
            $totalPoints += (float) ($question->points ?? 1);

            $submittedAnswer = $answers[$question->id] ?? null;

            if ($submittedAnswer === null) {
                continue;
            }

            /*
            |--------------------------------------------------------------------------
            | Multiple-choice / option based questions
            |--------------------------------------------------------------------------
            */

            if ($question->options->isNotEmpty()) {
                $correctOption = $question->options
                    ->firstWhere('is_correct', true);

                if (
                    $correctOption &&
                    (string) $submittedAnswer ===
                    (string) $correctOption->id
                ) {
                    $earnedPoints += (float) ($question->points ?? 1);
                    $correctAnswers++;
                }

                continue;
            }

            /*
            |--------------------------------------------------------------------------
            | Text / direct answer questions
            |--------------------------------------------------------------------------
            */

            if (
                isset($question->correct_answer) &&
                mb_strtolower(trim((string) $submittedAnswer)) ===
                mb_strtolower(trim((string) $question->correct_answer))
            ) {
                $earnedPoints += (float) ($question->points ?? 1);
                $correctAnswers++;
            }
        }

        /*
        |--------------------------------------------------------------------------
        | Calculate percentage
        |--------------------------------------------------------------------------
        */

        $score = $totalPoints > 0
            ? round(($earnedPoints / $totalPoints) * 100, 2)
            : 0;

        $passingScore = (float) (
            $quiz->passing_score ?? 70
        );

        $passed = $score >= $passingScore;

        /*
        |--------------------------------------------------------------------------
        | Return result
        |--------------------------------------------------------------------------
        */

        return Inertia::render('Learner/Quizzes/Result', [
            'quiz' => [
                'id' => $quiz->id,
                'title' => $quiz->title,
                'passing_score' => $passingScore,
            ],

            'result' => [
                'score' => $score,
                'earned_points' => $earnedPoints,
                'total_points' => $totalPoints,
                'correct_answers' => $correctAnswers,
                'total_questions' => $totalQuestions,
                'passed' => $passed,
            ],

            'enrollment' => $enrollment,
        ]);
    }
}
