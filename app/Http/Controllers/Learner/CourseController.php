<?php

namespace App\Http\Controllers\Learner;

use App\Http\Controllers\Controller;
use App\Models\Course;
use Illuminate\Http\RedirectResponse;
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

    /**
     * Enroll the current learner in a course.
     */
    public function enroll(Request $request, Course $course): RedirectResponse
    {
        $alreadyEnrolled = $course->enrollments()
            ->where('user_id', $request->user()->id)
            ->exists();

        if ($alreadyEnrolled) {
            return back()->with('error', 'You are already enrolled in this course.');
        }

        $course->enrollments()->create([
            'user_id' => $request->user()->id,
            'status' => 'active',
        ]);

        return redirect()
            ->route('learner.courses.show', $course->slug)
            ->with('success', "You're now enrolled in {$course->title}.");
    }
}