<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Certificate;
use App\Models\Course;
use App\Models\CourseCategory;
use App\Models\CourseEnrollment;
use App\Models\Payment;
use App\Models\Quiz;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $stats = [
            'users' => User::count(),

            'learners' => User::where('role', 'learner')->count(),

            'admins' => User::where('role', 'admin')->count(),

            'courses' => Course::count(),

            'published_courses' => Course::where('status', 'published')->count(),

            'categories' => CourseCategory::count(),

            'enrollments' => CourseEnrollment::count(),

            'quizzes' => Quiz::count(),

            'certificates' => Certificate::count(),

            'revenue' => Payment::where('status', 'paid')
                ->sum('amount') ?? 0,
        ];


        $recentCourses = Course::latest()
            ->take(5)
            ->get([
                'id',
                'title',
                'slug',
                'thumbnail',
                'price',
                'status',
                'created_at',
            ])
            ->map(function ($course) {

                return [
                    'id' => $course->id,
                    'title' => $course->title,
                    'slug' => $course->slug,
                    'thumbnail' => $course->thumbnail,
                    'price' => $course->price ?? 0,
                    'status' => $course->status,
                    'created_at' => $course->created_at,
                ];

            });


        $recentEnrollments = CourseEnrollment::with([
                'user:id,name',
                'course:id,title',
            ])
            ->latest()
            ->take(5)
            ->get()
            ->map(function ($enrollment) {

                return [
                    'id' => $enrollment->id,

                    'user' => [
                        'name' => $enrollment->user->name ?? 'Unknown',
                    ],

                    'course' => [
                        'title' => $enrollment->course->title ?? 'Unknown',
                    ],

                    'created_at' => $enrollment->created_at,

                ];

            });


        return Inertia::render('Admin/Dashboard', [

            'stats' => $stats,

            'recentCourses' => $recentCourses,

            'recentEnrollments' => $recentEnrollments,

        ]);
    }
}