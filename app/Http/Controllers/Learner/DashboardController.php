<?php

namespace App\Http\Controllers\Learner;

use App\Http\Controllers\Controller;
use App\Models\Certificate;
use App\Models\Course;
use App\Models\CourseEnrollment;
use App\Models\QuizAttempt;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $user = Auth::user();

        $myCourses = Course::whereHas('enrollments', function ($query) use ($user) {
                $query->where('user_id', $user->id);
            })
            ->latest()
            ->take(6)
            ->get([
                'id',
                'title',
                'slug',
                'thumbnail',
                'price',
            ]);

        $stats = [
            'enrolled_courses' => CourseEnrollment::where('user_id', $user->id)->count(),

            'completed_quizzes' => QuizAttempt::where('user_id', $user->id)
                ->where('status', 'completed')
                ->count(),

            'certificates' => Certificate::where('user_id', $user->id)->count(),

            // Replace with actual progress calculation later
            'progress' => 0,
        ];

        return Inertia::render('Learner/Dashboard', [
            'stats' => $stats,
            'myCourses' => $myCourses,
        ]);
    }
}