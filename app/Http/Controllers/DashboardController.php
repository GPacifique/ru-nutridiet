<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\CourseEnrollment;
use App\Models\Payment;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Central dashboard entry point.
     *
     * This route can be used as:
     *
     * Route::get('/dashboard', [DashboardController::class, 'index'])
     *     ->middleware('auth')
     *     ->name('dashboard');
     *
     * RBAC is handled through Spatie Laravel Permission.
     */
    public function index(Request $request): Response|RedirectResponse
    {
        $user = $request->user();

        /*
        |--------------------------------------------------------------------------
        | Authentication safety
        |--------------------------------------------------------------------------
        */

        if (! $user) {
            return redirect()->route('login');
        }

        /*
        |--------------------------------------------------------------------------
        | Super Admin
        |--------------------------------------------------------------------------
        */

        if ($user->hasRole('super_admin')) {
            return $this->superAdminDashboard($user);
        }

        /*
        |--------------------------------------------------------------------------
        | Admin
        |--------------------------------------------------------------------------
        */

        if ($user->hasRole('admin')) {
            return $this->adminDashboard($user);
        }

        /*
        |--------------------------------------------------------------------------
        | Nutritionist
        |--------------------------------------------------------------------------
        */

        if ($user->hasRole('nutritionist')) {
            return $this->nutritionistDashboard($user);
        }

        /*
        |--------------------------------------------------------------------------
        | Instructor
        |--------------------------------------------------------------------------
        */

        if ($user->hasRole('instructor')) {
            return $this->instructorDashboard($user);
        }

        /*
        |--------------------------------------------------------------------------
        | Content Editor
        |--------------------------------------------------------------------------
        */

        if ($user->hasRole('content_editor')) {
            return $this->contentEditorDashboard($user);
        }

        /*
        |--------------------------------------------------------------------------
        | Finance
        |--------------------------------------------------------------------------
        */

        if ($user->hasRole('finance')) {
            return $this->financeDashboard($user);
        }

        /*
        |--------------------------------------------------------------------------
        | Support
        |--------------------------------------------------------------------------
        */

        if ($user->hasRole('support')) {
            return $this->supportDashboard($user);
        }

        /*
        |--------------------------------------------------------------------------
        | Learner
        |--------------------------------------------------------------------------
        */

        if ($user->hasRole('learner')) {
            return $this->learnerDashboard($user);
        }

        /*
        |--------------------------------------------------------------------------
        | No recognized role
        |--------------------------------------------------------------------------
        */

        abort(
            403,
            'Your account does not have a valid platform role.'
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Super Admin Dashboard
    |--------------------------------------------------------------------------
    */

    protected function superAdminDashboard(
        User $user
    ): Response {
        return Inertia::render('Dashboard/SuperAdmin', [
            'user' => $user->only([
                'id',
                'name',
                'email',
            ]),

            'stats' => $this->platformStats(),

            'permissions' => $user->getAllPermissions()
                ->pluck('name')
                ->values(),

            'roles' => $user->getRoleNames()
                ->values(),
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | Admin Dashboard
    |--------------------------------------------------------------------------
    */

    protected function adminDashboard(
        User $user
    ): Response {
        return Inertia::render('Admin/Dashboard', [
            'user' => $user->only([
                'id',
                'name',
                'email',
            ]),

            'stats' => $this->platformStats(),

            'permissions' => $user->getAllPermissions()
                ->pluck('name')
                ->values(),

            'roles' => $user->getRoleNames()
                ->values(),
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | Nutritionist Dashboard
    |--------------------------------------------------------------------------
    */

    protected function nutritionistDashboard(
        User $user
    ): Response {
        return Inertia::render(
            'Nutritionist/Dashboard',
            [
                'user' => $user->only([
                    'id',
                    'name',
                    'email',
                ]),

                'stats' => [
                    'learners' => CourseEnrollment::query()
                        ->whereHas('course', function ($query) use ($user) {
                            $query->where(
                                'instructor_id',
                                $user->id
                            );
                        })
                        ->distinct('user_id')
                        ->count('user_id'),

                    'courses' => Course::query()
                        ->where(
                            'instructor_id',
                            $user->id
                        )
                        ->count(),

                    'enrollments' => CourseEnrollment::query()
                        ->whereHas('course', function ($query) use ($user) {
                            $query->where(
                                'instructor_id',
                                $user->id
                            );
                        })
                        ->count(),
                ],

                'roles' => $user->getRoleNames()
                    ->values(),
            ]
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Instructor Dashboard
    |--------------------------------------------------------------------------
    */

    protected function instructorDashboard(
        User $user
    ): Response {
        $courses = Course::query()
            ->where(
                'instructor_id',
                $user->id
            )
            ->withCount('enrollments')
            ->latest()
            ->limit(10)
            ->get();

        return Inertia::render(
            'Instructor/Dashboard',
            [
                'user' => $user->only([
                    'id',
                    'name',
                    'email',
                ]),

                'courses' => $courses,

                'stats' => [
                    'courses' => $courses->count(),

                    'enrollments' => $courses
                        ->sum('enrollments_count'),
                ],

                'roles' => $user->getRoleNames()
                    ->values(),
            ]
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Content Editor Dashboard
    |--------------------------------------------------------------------------
    */

    protected function contentEditorDashboard(
        User $user
    ): Response {
        return Inertia::render(
            'ContentEditor/Dashboard',
            [
                'user' => $user->only([
                    'id',
                    'name',
                    'email',
                ]),

                'roles' => $user->getRoleNames()
                    ->values(),

                'permissions' => $user
                    ->getAllPermissions()
                    ->pluck('name')
                    ->values(),
            ]
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Finance Dashboard
    |--------------------------------------------------------------------------
    */

    protected function financeDashboard(
        User $user
    ): Response {
        $paidStatuses = [
            'paid',
            'completed',
        ];

        return Inertia::render(
            'Finance/Dashboard',
            [
                'user' => $user->only([
                    'id',
                    'name',
                    'email',
                ]),

                'stats' => [
                    'revenue' => Payment::query()
                        ->whereIn(
                            'status',
                            $paidStatuses
                        )
                        ->sum('amount'),

                    'payments' => Payment::count(),

                    'pending' => Payment::query()
                        ->where(
                            'status',
                            'pending'
                        )
                        ->count(),

                    'refunded' => Payment::query()
                        ->where(
                            'status',
                            'refunded'
                        )
                        ->count(),
                ],

                'roles' => $user->getRoleNames()
                    ->values(),
            ]
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Support Dashboard
    |--------------------------------------------------------------------------
    */

    protected function supportDashboard(
        User $user
    ): Response {
        return Inertia::render(
            'Support/Dashboard',
            [
                'user' => $user->only([
                    'id',
                    'name',
                    'email',
                ]),

                'stats' => [
                    'learners' => User::query()
                        ->whereHas(
                            'roles',
                            fn ($query) => $query->where(
                                'name',
                                'learner'
                            )
                        )
                        ->count(),

                    'enrollments' => CourseEnrollment::count(),
                ],

                'roles' => $user->getRoleNames()
                    ->values(),
            ]
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Learner Dashboard
    |--------------------------------------------------------------------------
    */

    protected function learnerDashboard(
        User $user
    ): Response {
        $enrollments = CourseEnrollment::query()
            ->with([
                'course:id,title,slug',
            ])
            ->where(
                'user_id',
                $user->id
            )
            ->latest()
            ->limit(10)
            ->get();

        return Inertia::render(
            'Learner/Dashboard',
            [
                'user' => $user->only([
                    'id',
                    'name',
                    'email',
                ]),

                'enrollments' => $enrollments,

                'stats' => [
                    'enrolled_courses' => CourseEnrollment::query()
                        ->where(
                            'user_id',
                            $user->id
                        )
                        ->count(),

                    'completed_courses' => CourseEnrollment::query()
                        ->where(
                            'user_id',
                            $user->id
                        )
                        ->where(
                            'status',
                            'completed'
                        )
                        ->count(),

                    'in_progress' => CourseEnrollment::query()
                        ->where(
                            'user_id',
                            $user->id
                        )
                        ->where(
                            'status',
                            'active'
                        )
                        ->count(),
                ],

                'roles' => $user->getRoleNames()
                    ->values(),
            ]
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Platform Statistics
    |--------------------------------------------------------------------------
    */

    protected function platformStats(): array
    {
        $paidStatuses = [
            'paid',
            'completed',
        ];

        return [
            'users' => User::count(),

            'learners' => User::query()
                ->whereHas(
                    'roles',
                    fn ($query) => $query->where(
                        'name',
                        'learner'
                    )
                )
                ->count(),

            'courses' => Course::count(),

            'published_courses' => Course::query()
                ->where(
                    'status',
                    'published'
                )
                ->count(),

            'enrollments' => CourseEnrollment::count(),

            'completed_enrollments' => CourseEnrollment::query()
                ->where(
                    'status',
                    'completed'
                )
                ->count(),

            'revenue' => Payment::query()
                ->whereIn(
                    'status',
                    $paidStatuses
                )
                ->sum('amount'),

            'pending_payments' => Payment::query()
                ->where(
                    'status',
                    'pending'
                )
                ->count(),
        ];
    }
}
