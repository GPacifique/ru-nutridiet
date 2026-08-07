<?php

namespace App\Http\Controllers\Learner;

use App\Http\Controllers\Controller;
use App\Models\Course;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CourseController extends Controller
{
    /**
     * Display learner courses
     */
    public function index()
    {
        $courses = Course::where('status', 'published')
            ->with('instructor')
            ->latest()
            ->paginate(12);

        return Inertia::render('Learner/Courses/Index', [
            'courses' => $courses
        ]);
    }


    /**
     * Show single course
     */
    public function show($slug)
    {
        $course = Course::where('slug', $slug)
            ->with('instructor')
            ->firstOrFail();


        return Inertia::render('Learner/Courses/Show', [
            'course' => $course
        ]);
    }
}