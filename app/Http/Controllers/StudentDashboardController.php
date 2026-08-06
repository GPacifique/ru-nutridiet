<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

use App\Models\CourseEnrollment;
use App\Models\Course;
use App\Models\CourseLesson;
use App\Models\Quiz;
use App\Models\Certificate;

class StudentDashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        // Total enrolled courses
        $enrolledCoursesCount = CourseEnrollment::where('user_id', $user->id)->count();

        // Active courses (latest 5)
        $recentCourses = Course::whereHas('enrollments', function ($q) use ($user) {
                $q->where('user_id', $user->id);
            })
            ->latest()
            ->take(5)
            ->get(['id', 'title', 'slug', 'thumbnail']);

        // Completed lessons count
        $completedLessons = CourseLesson::whereHas('completions', function ($q) use ($user) {
                $q->where('user_id', $user->id);
            })->count();

        // Available quizzes
        $availableQuizzes = Quiz::latest()->take(5)->get(['id', 'title']);

        // Certificates earned
        $certificates = Certificate::where('user_id', $user->id)->count();

        // Progress overview (simple percentage example)
        $totalLessons = CourseLesson::count();
        $completedLessonsCount = CourseLesson::whereHas('completions', function ($q) use ($user) {
                $q->where('user_id', $user->id);
            })->count();

        $progress = $totalLessons > 0
            ? round(($completedLessonsCount / $totalLessons) * 100, 2)
            : 0;

        return Inertia::render('Student/Dashboard', [
            'stats' => [
                'enrolledCourses' => $enrolledCoursesCount,
                'completedLessons' => $completedLessons,
                'certificates' => $certificates,
                'progress' => $progress,
            ],

            'recentCourses' => $recentCourses,
            'availableQuizzes' => $availableQuizzes,
        ]);
    }
}