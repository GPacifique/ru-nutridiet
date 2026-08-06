<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\CourseEnrollment;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CourseEnrollmentController extends Controller
{
    /**
     * Display all enrollments.
     */
    public function index(Request $request): Response
    {
        $enrollments = CourseEnrollment::query()
            ->with([
                'user:id,name,email',
                'course:id,title',
            ])
            ->when($request->search, function ($query, $search) {
                $query->whereHas('user', function ($query) use ($search) {
                    $query->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%");
                })->orWhereHas('course', function ($query) use ($search) {
                    $query->where('title', 'like', "%{$search}%");
                });
            })
            ->when($request->status, function ($query, $status) {
                $query->where('status', $status);
            })
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('CourseEnrollments/Index', [
            'enrollments' => $enrollments,
            'filters' => [
                'search' => $request->search,
                'status' => $request->status,
            ],
        ]);
    }

    /**
     * Show the create enrollment page.
     */
    public function create(): Response
    {
        $users = User::query()
            ->where('role', 'nutritionist')
            ->where('status', 'approved')
            ->select('id', 'name', 'email')
            ->orderBy('name')
            ->get();

        $courses = Course::query()
            ->where('status', 'published')
            ->select('id', 'title', 'price')
            ->orderBy('title')
            ->get();

        return Inertia::render('CourseEnrollments/Create', [
            'users' => $users,
            'courses' => $courses,
        ]);
    }

    /**
     * Store a new enrollment.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'user_id' => [
                'required',
                'exists:users,id',
            ],

            'course_id' => [
                'required',
                'exists:courses,id',
            ],

            'order_id' => [
                'nullable',
                'exists:orders,id',
            ],

            'status' => [
                'required',
                'in:pending,active,completed,cancelled,expired',
            ],

            'progress_percent' => [
                'required',
                'numeric',
                'min:0',
                'max:100',
            ],

            'enrolled_at' => [
                'nullable',
                'date',
            ],

            'completed_at' => [
                'nullable',
                'date',
                'after_or_equal:enrolled_at',
            ],
        ]);

        $alreadyEnrolled = CourseEnrollment::query()
            ->where('user_id', $validated['user_id'])
            ->where('course_id', $validated['course_id'])
            ->exists();

        if ($alreadyEnrolled) {
            return back()
                ->withErrors([
                    'course_id' => 'This user is already enrolled in this course.',
                ])
                ->withInput();
        }

        CourseEnrollment::create($validated);

        return redirect()
            ->route('enrollments.index')
            ->with(
                'success',
                'Course enrollment created successfully.'
            );
    }

    /**
     * Display an enrollment.
     */
    public function show(
        CourseEnrollment $enrollment
    ): Response {
        $enrollment->load([
            'user',
            'course.instructor',
            'order',
        ]);

        return Inertia::render(
            'CourseEnrollments/Show',
            [
                'enrollment' => $enrollment,
            ]
        );
    }

    /**
     * Show the edit enrollment page.
     */
    public function edit(
        CourseEnrollment $enrollment
    ): Response {
        $users = User::query()
            ->where('role', 'nutritionist')
            ->select('id', 'name', 'email')
            ->orderBy('name')
            ->get();

        $courses = Course::query()
            ->select('id', 'title', 'price')
            ->orderBy('title')
            ->get();

        return Inertia::render(
            'CourseEnrollments/Edit',
            [
                'enrollment' => $enrollment,
                'users' => $users,
                'courses' => $courses,
            ]
        );
    }

    /**
     * Update an enrollment.
     */
    public function update(
        Request $request,
        CourseEnrollment $enrollment
    ): RedirectResponse {
        $validated = $request->validate([
            'user_id' => [
                'required',
                'exists:users,id',
            ],

            'course_id' => [
                'required',
                'exists:courses,id',
            ],

            'order_id' => [
                'nullable',
                'exists:orders,id',
            ],

            'status' => [
                'required',
                'in:pending,active,completed,cancelled,expired',
            ],

            'progress_percent' => [
                'required',
                'numeric',
                'min:0',
                'max:100',
            ],

            'enrolled_at' => [
                'nullable',
                'date',
            ],

            'completed_at' => [
                'nullable',
                'date',
                'after_or_equal:enrolled_at',
            ],
        ]);

        $duplicate = CourseEnrollment::query()
            ->where('user_id', $validated['user_id'])
            ->where('course_id', $validated['course_id'])
            ->where('id', '!=', $enrollment->id)
            ->exists();

        if ($duplicate) {
            return back()
                ->withErrors([
                    'course_id' => 'This user is already enrolled in this course.',
                ])
                ->withInput();
        }

        $enrollment->update($validated);

        return redirect()
            ->route('enrollments.index')
            ->with(
                'success',
                'Course enrollment updated successfully.'
            );
    }

    /**
     * Delete an enrollment.
     */
    public function destroy(
        CourseEnrollment $enrollment
    ): RedirectResponse {
        $enrollment->delete();

        return redirect()
            ->route('enrollments.index')
            ->with(
                'success',
                'Course enrollment deleted successfully.'
            );
    }

    /**
     * Activate an enrollment.
     */
    public function activate(
        CourseEnrollment $enrollment
    ): RedirectResponse {
        $enrollment->update([
            'status' => 'active',
            'enrolled_at' => $enrollment->enrolled_at ?? now(),
        ]);

        return back()->with(
            'success',
            'Enrollment activated successfully.'
        );
    }

    /**
     * Mark enrollment as completed.
     */
    public function complete(
        CourseEnrollment $enrollment
    ): RedirectResponse {
        $enrollment->update([
            'status' => 'completed',
            'progress_percent' => 100,
            'completed_at' => now(),
        ]);

        return back()->with(
            'success',
            'Course enrollment marked as completed.'
        );
    }

    /**
     * Cancel an enrollment.
     */
    public function cancel(
        CourseEnrollment $enrollment
    ): RedirectResponse {
        $enrollment->update([
            'status' => 'cancelled',
        ]);

        return back()->with(
            'success',
            'Enrollment cancelled successfully.'
        );
    }
}