<?php

namespace App\Http\Controllers\Learner;

use App\Http\Controllers\Controller;
use App\Models\Course;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CourseController extends Controller
{
    public function index()
    {
        $courses = Course::where('status', 'published')
            ->latest()
            ->get();


        return Inertia::render(
            'Learner/Courses/Index',
            [
                'courses'=>$courses
            ]
        );
    }


    public function show($slug)
    {
        $course = Course::where('slug',$slug)
            ->with('lessons')
            ->firstOrFail();


        return Inertia::render(
            'Learner/Courses/Show',
            [
                'course'=>$course
            ]
        );
    }
}