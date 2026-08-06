<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\CourseCategory;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class AdminDashboardController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'total_users' => User::count(),

                'total_courses' => Course::count(),

                'published_courses' => Course::where(
                    'is_published',
                    true
                )->count(),

                'total_categories' => CourseCategory::count(),
            ],

            'recent_courses' => Course::latest()
                ->take(5)
                ->get([
                    'id',
                    'title',
                    'slug',
                    'price',
                    'is_published',
                    'created_at',
                ]),
        ]);
    }
}