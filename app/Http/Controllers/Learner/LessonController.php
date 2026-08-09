<?php

namespace App\Http\Controllers\Learner;

use App\Http\Controllers\Controller;
use App\Models\CourseEnrollment;
use App\Models\Lesson;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class LessonController extends Controller
{
    /**
     * Display a lesson.
     */
    public function show(
        Request $request,
        Lesson $lesson
    ): Response {
        $user = $request->user();

        /*
        |--------------------------------------------------------------------------
        | Find the learner's enrollment
        |--------------------------------------------------------------------------
        */

        $enrollment = CourseEnrollment::query()
            ->where('user_id', $user->id)
            ->where('course_id', $lesson->course_id)
            ->whereIn('status', [
                'active',
                'completed',
            ])
            ->first();

        abort_unless($enrollment, 403);

        /*
        |--------------------------------------------------------------------------
        | Load lesson relationships
        |--------------------------------------------------------------------------
        */

        $lesson->load([
            'course:id,title,slug',
        ]);

        /*
        |--------------------------------------------------------------------------
        | Get course lessons
        |--------------------------------------------------------------------------
        */

        $lessons = Lesson::query()
            ->where('course_id', $lesson->course_id)
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get([
                'id',
                'course_id',
                'title',
                'slug',
                'sort_order',
            ]);

        /*
        |--------------------------------------------------------------------------
        | Determine previous and next lessons
        |--------------------------------------------------------------------------
        */

        $currentIndex = $lessons->search(
            fn ($item) => $item->id === $lesson->id
        );

        $previousLesson = $currentIndex !== false && $currentIndex > 0
            ? $lessons[$currentIndex - 1]
            : null;

        $nextLesson = $currentIndex !== false &&
            $currentIndex < $lessons->count() - 1
            ? $lessons[$currentIndex + 1]
            : null;

        /*
        |--------------------------------------------------------------------------
        | Completed lessons
        |--------------------------------------------------------------------------
        |
        | This supports applications where completion is stored in a
        | lesson_user pivot table.
        |
        */

        $completedLessonIds = [];

        if (method_exists($user, 'completedLessons')) {
            $completedLessonIds = $user
                ->completedLessons()
                ->where('course_id', $lesson->course_id)
                ->pluck('lessons.id')
                ->toArray();
        }

        $isCompleted = in_array(
            $lesson->id,
            $completedLessonIds
        );

        return Inertia::render('Learner/Lessons/Show', [
            'lesson' => $lesson,

            'course' => $lesson->course,

            'enrollment' => $enrollment,

            'lessons' => $lessons,

            'previousLesson' => $previousLesson,

            'nextLesson' => $nextLesson,

            'completedLessonIds' => $completedLessonIds,

            'isCompleted' => $isCompleted,
        ]);
    }

    /**
     * Mark a lesson as completed.
     */
    public function complete(
        Request $request,
        Lesson $lesson
    ): RedirectResponse {
        $user = $request->user();

        /*
        |--------------------------------------------------------------------------
        | Verify enrollment
        |--------------------------------------------------------------------------
        */

        $enrollment = CourseEnrollment::query()
            ->where('user_id', $user->id)
            ->where('course_id', $lesson->course_id)
            ->whereIn('status', [
                'active',
                'completed',
            ])
            ->first();

        abort_unless($enrollment, 403);

        /*
        |--------------------------------------------------------------------------
        | Record lesson completion
        |--------------------------------------------------------------------------
        */

        if (method_exists($user, 'completedLessons')) {
            $user->completedLessons()->syncWithoutDetaching([
                $lesson->id => [
                    'completed_at' => now(),
                ],
            ]);
        }

        /*
        |--------------------------------------------------------------------------
        | Recalculate course progress
        |--------------------------------------------------------------------------
        */

        $totalLessons = Lesson::query()
            ->where('course_id', $lesson->course_id)
            ->count();

        $completedLessons = 0;

        if (method_exists($user, 'completedLessons')) {
            $completedLessons = $user
                ->completedLessons()
                ->where('course_id', $lesson->course_id)
                ->count();
        }

        $progress = $totalLessons > 0
            ? round(($completedLessons / $totalLessons) * 100, 2)
            : 0;

        /*
        |--------------------------------------------------------------------------
        | Update enrollment progress
        |--------------------------------------------------------------------------
        */

        $enrollment->update([
            'progress_percent' => min($progress, 100),
        ]);

        /*
        |--------------------------------------------------------------------------
        | Automatically complete enrollment
        |--------------------------------------------------------------------------
        */

        if ($progress >= 100) {
            $enrollment->update([
                'status' => 'completed',
                'progress_percent' => 100,
                'completed_at' => $enrollment->completed_at ?? now(),
            ]);
        }

        return back()->with(
            'success',
            'Lesson marked as completed.'
        );
    }
}
