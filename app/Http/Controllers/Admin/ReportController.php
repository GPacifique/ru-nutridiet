<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Certificate;
use App\Models\Course;
use App\Models\CourseEnrollment;
use App\Models\Payment;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ReportController extends Controller
{
    /**
     * Main reports dashboard.
     */
    public function index(Request $request): Response
    {
        $startDate = $request->filled('start_date')
            ? Carbon::parse($request->start_date)->startOfDay()
            : now()->startOfMonth();

        $endDate = $request->filled('end_date')
            ? Carbon::parse($request->end_date)->endOfDay()
            : now()->endOfDay();

        $revenue = Payment::query()
            ->whereIn('status', ['paid', 'completed'])
            ->whereBetween('created_at', [$startDate, $endDate])
            ->sum('amount');

        $payments = Payment::query()
            ->whereBetween('created_at', [$startDate, $endDate])
            ->count();

        $enrollments = CourseEnrollment::query()
            ->whereBetween('created_at', [$startDate, $endDate])
            ->count();

        $completedEnrollments = CourseEnrollment::query()
            ->where('status', 'completed')
            ->whereBetween('created_at', [$startDate, $endDate])
            ->count();

        $certificates = Certificate::query()
            ->where('status', 'issued')
            ->whereBetween('issued_at', [$startDate, $endDate])
            ->count();

        $newLearners = User::query()
            ->where('role', 'learner')
            ->whereBetween('created_at', [$startDate, $endDate])
            ->count();

        $topCourses = CourseEnrollment::query()
            ->selectRaw('course_id, COUNT(*) as enrollment_count')
            ->with('course:id,title')
            ->whereBetween('created_at', [$startDate, $endDate])
            ->groupBy('course_id')
            ->orderByDesc('enrollment_count')
            ->limit(10)
            ->get();

        $recentPayments = Payment::query()
            ->with([
                'user:id,name,email',
                'course:id,title',
            ])
            ->latest()
            ->limit(10)
            ->get();

        return Inertia::render('Admin/Reports/Index', [
            'summary' => [
                'revenue' => $revenue,
                'payments' => $payments,
                'enrollments' => $enrollments,
                'completed_enrollments' => $completedEnrollments,
                'certificates' => $certificates,
                'new_learners' => $newLearners,
            ],

            'topCourses' => $topCourses,

            'recentPayments' => $recentPayments,

            'filters' => [
                'start_date' => $startDate->toDateString(),
                'end_date' => $endDate->toDateString(),
            ],
        ]);
    }

    /**
     * Revenue report.
     */
    public function revenue(Request $request): Response
    {
        $startDate = $request->filled('start_date')
            ? Carbon::parse($request->start_date)->startOfDay()
            : now()->startOfMonth();

        $endDate = $request->filled('end_date')
            ? Carbon::parse($request->end_date)->endOfDay()
            : now()->endOfDay();

        $payments = Payment::query()
            ->with([
                'user:id,name,email',
                'course:id,title',
            ])
            ->whereIn('status', ['paid', 'completed'])
            ->whereBetween('created_at', [$startDate, $endDate])
            ->latest()
            ->paginate(20)
            ->withQueryString();

        $totalRevenue = Payment::query()
            ->whereIn('status', ['paid', 'completed'])
            ->whereBetween('created_at', [$startDate, $endDate])
            ->sum('amount');

        $dailyRevenue = Payment::query()
            ->selectRaw('DATE(created_at) as date')
            ->selectRaw('SUM(amount) as total')
            ->whereIn('status', ['paid', 'completed'])
            ->whereBetween('created_at', [$startDate, $endDate])
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        $revenueByMethod = Payment::query()
            ->selectRaw('payment_method, SUM(amount) as total')
            ->whereIn('status', ['paid', 'completed'])
            ->whereBetween('created_at', [$startDate, $endDate])
            ->groupBy('payment_method')
            ->orderByDesc('total')
            ->get();

        return Inertia::render('Admin/Reports/Revenue', [
            'payments' => $payments,

            'summary' => [
                'total_revenue' => $totalRevenue,
                'payment_count' => $payments->total(),
            ],

            'dailyRevenue' => $dailyRevenue,

            'revenueByMethod' => $revenueByMethod,

            'filters' => [
                'start_date' => $startDate->toDateString(),
                'end_date' => $endDate->toDateString(),
            ],
        ]);
    }

    /**
     * Enrollment report.
     */
    public function enrollments(Request $request): Response
    {
        $startDate = $request->filled('start_date')
            ? Carbon::parse($request->start_date)->startOfDay()
            : now()->startOfMonth();

        $endDate = $request->filled('end_date')
            ? Carbon::parse($request->end_date)->endOfDay()
            : now()->endOfDay();

        $enrollments = CourseEnrollment::query()
            ->with([
                'user:id,name,email',
                'course:id,title',
            ])
            ->whereBetween('created_at', [$startDate, $endDate])
            ->latest()
            ->paginate(20)
            ->withQueryString();

        $byStatus = CourseEnrollment::query()
            ->selectRaw('status, COUNT(*) as total')
            ->whereBetween('created_at', [$startDate, $endDate])
            ->groupBy('status')
            ->orderByDesc('total')
            ->get();

        $byCourse = CourseEnrollment::query()
            ->selectRaw('course_id, COUNT(*) as total')
            ->with('course:id,title')
            ->whereBetween('created_at', [$startDate, $endDate])
            ->groupBy('course_id')
            ->orderByDesc('total')
            ->limit(15)
            ->get();

        return Inertia::render('Admin/Reports/Enrollments', [
            'enrollments' => $enrollments,

            'byStatus' => $byStatus,

            'byCourse' => $byCourse,

            'filters' => [
                'start_date' => $startDate->toDateString(),
                'end_date' => $endDate->toDateString(),
            ],
        ]);
    }

    /**
     * Certificate report.
     */
    public function certificates(Request $request): Response
    {
        $startDate = $request->filled('start_date')
            ? Carbon::parse($request->start_date)->startOfDay()
            : now()->startOfMonth();

        $endDate = $request->filled('end_date')
            ? Carbon::parse($request->end_date)->endOfDay()
            : now()->endOfDay();

        $certificates = Certificate::query()
            ->with([
                'user:id,name,email',
                'course:id,title',
            ])
            ->whereBetween('issued_at', [$startDate, $endDate])
            ->latest('issued_at')
            ->paginate(20)
            ->withQueryString();

        $byStatus = Certificate::query()
            ->selectRaw('status, COUNT(*) as total')
            ->whereBetween('issued_at', [$startDate, $endDate])
            ->groupBy('status')
            ->orderByDesc('total')
            ->get();

        $byCourse = Certificate::query()
            ->selectRaw('course_id, COUNT(*) as total')
            ->with('course:id,title')
            ->whereBetween('issued_at', [$startDate, $endDate])
            ->groupBy('course_id')
            ->orderByDesc('total')
            ->limit(15)
            ->get();

        return Inertia::render('Admin/Reports/Certificates', [
            'certificates' => $certificates,

            'byStatus' => $byStatus,

            'byCourse' => $byCourse,

            'filters' => [
                'start_date' => $startDate->toDateString(),
                'end_date' => $endDate->toDateString(),
            ],
        ]);
    }
}
