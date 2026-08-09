<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CourseEnrollment;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EnrollmentController extends Controller
{
    /**
     * Display all course enrollments.
     */
    public function index(Request $request): Response
    {
        $enrollments = CourseEnrollment::query()
            ->with([
                'user:id,name,email',
                'course:id,title',
            ])
            ->when($request->search, function ($query, $search) {
                $query->where(function ($query) use ($search) {
                    $query->whereHas('user', function ($query) use ($search) {
                        $query->where('name', 'like', "%{$search}%")
                            ->orWhere('email', 'like', "%{$search}%");
                    })
                    ->orWhereHas('course', function ($query) use ($search) {
                        $query->where('title', 'like', "%{$search}%");
                    });
                });
            })
            ->when($request->status, function ($query, $status) {
                $query->where('status', $status);
            })
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Admin/Enrollments/Index', [
            'enrollments' => $enrollments,

            'filters' => [
                'search' => $request->search,
                'status' => $request->status,
            ],

            'statuses' => [
                'pending',
                'active',
                'completed',
                'cancelled',
                'expired',
            ],
        ]);
    }

    /**
     * Display a single enrollment.
     */
    public function show(
        CourseEnrollment $enrollment
    ): Response {
        $enrollment->load([
            'user',
            'course',
            'order',
        ]);

        return Inertia::render('Admin/Enrollments/Show', [
            'enrollment' => $enrollment,
        ]);
    }

    /**
     * Delete an enrollment.
     */
    public function destroy(
        CourseEnrollment $enrollment
    ): RedirectResponse {
        $enrollment->delete();

        return redirect()
            ->route('admin.enrollments.index')
            ->with(
                'success',
                'Enrollment deleted successfully.'
            );
    }
}

