<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Inertia\Inertia;
use Inertia\Response;

/**
 * routes/web.php imports this as AdminDashboardController.
 *
 * Built from the project's models. Every query is guarded: if a model has no
 * table or a column is missing, that figure becomes 0 / [] instead of
 * breaking the page. Payment, Quiz and several others are empty model
 * classes, so revenue is calculated from Order (total + payment_status).
 */
class DashboardController extends Controller
{
    /** Order payment_status values that count as paid revenue. */
    private const PAID = ['paid', 'completed', 'succeeded', 'success'];

    private const NS = 'App\\Models\\';

    public function index(): Response
    {
        $since = Carbon::now()->subDays(30);

        // Resolve models once (null when class/table is missing).
        $user        = $this->model('User');
        $course      = $this->model('Course');
        $lesson      = $this->model('Lesson', 'CourseLesson');
        $quiz        = $this->model('Quiz');
        $exam        = $this->model('Exam');
        $attempt     = $this->model('ExamAttempt');
        $enrollment  = $this->model('CourseEnrollment');
        $certificate = $this->model('Certificate');
        $credit      = $this->model('CreditRecord');
        $practitioner= $this->model('Practitioner');
        $verification= $this->model('VerificationRequest');
        $cpd         = $this->model('CpdActivity');
        $appointment = $this->model('Appointment');
        $article     = $this->model('Article');
        $announcement= $this->model('Announcement');
        $testimonial = $this->model('Testimonial');
        $tender      = $this->model('Tender');
        $advert      = $this->model('Advertisement');
        $newsletter  = $this->model('Newsletter');
        $order       = $this->model('Order');
        $product     = $this->model('Product');
        $review      = $this->model('Review');
        $message     = $this->model('Contact', 'ContactMessage');

        $i = fn ($label, $value, $note = null, $href = null) => compact('label', 'value', 'note', 'href');

        /* ---------------------------- Sections ---------------------------- */

        $sections = [
            [
                'title' => 'Learning',
                'items' => [
                    $i('Courses', $this->count($course), $this->note($this->count($course, fn ($q) => $q->where('status', 'published'), ['status']), 'published'), '/admin/courses'),
                    $i('Lessons', $this->count($lesson), null, '/admin/lessons'),
                    $i('Quizzes', $this->count($quiz), null, '/admin/quizzes'),
                    $i('Exams', $this->count($exam), $this->note($this->count($attempt), 'attempts'), '/admin/exams'),
                    $i('Enrollments', $this->count($enrollment), $this->note($this->count($enrollment, fn ($q) => $q->where('created_at', '>=', $since)), 'in 30 days'), '/admin/enrollments'),
                    $i('Certificates', $this->count($certificate), null, '/admin/certificates'),
                    $i('Credit hours awarded', round($this->sum($credit, 'credit_hours'), 1), null, null),
                ],
            ],
            [
                'title' => 'People',
                'items' => [
                    $i('Users', $this->count($user), $this->note($this->count($user, fn ($q) => $q->where('created_at', '>=', $since)), 'joined in 30 days'), '/admin/users'),
                    $i('Practitioners', $this->count($practitioner), $this->note($this->count($practitioner, fn ($q) => $q->where('status', true), ['status']), 'active'), '/admin/practitioners'),
                    $i('Verification requests', $this->count($verification), $this->note($this->count($verification, fn ($q) => $q->where('status', 'pending'), ['status']), 'pending'), '/admin/verification-requests'),
                    $i('CPD activities', $this->count($cpd), $this->note($this->count($cpd, fn ($q) => $q->where('status', 'pending'), ['status']), 'pending'), '/admin/cpd-activities'),
                    $i('Appointments', $this->count($appointment), $this->note($this->count($appointment, fn ($q) => $q->where('scheduled_at', '>=', Carbon::now()), ['scheduled_at']), 'upcoming'), '/admin/appointments'),
                ],
            ],
            [
                'title' => 'Content',
                'items' => [
                    $i('Articles', $this->count($article), $this->note($this->count($article, fn ($q) => $q->where('status', 'published'), ['status']), 'published'), '/admin/articles'),
                    $i('Announcements', $this->count($announcement), null, '/admin/announcements'),
                    $i('Testimonials', $this->count($testimonial), $this->note($this->count($testimonial, fn ($q) => $q->where('is_approved', false), ['is_approved']), 'awaiting approval'), '/admin/testimonials'),
                    $i('Tenders', $this->count($tender), $this->note($this->count($tender, fn ($q) => $q->where('status', 'open'), ['status']), 'open'), '/admin/tenders'),
                    $i('Advertisements', $this->count($advert), $this->note($this->count($advert, fn ($q) => $q->where('is_active', true), ['is_active']), 'active'), '/admin/advertisements'),
                    $i('Newsletter subscribers', $this->count($newsletter, fn ($q) => $q->where('status', 'subscribed'), ['status']), null, '/admin/newsletter'),
                ],
            ],
            [
                'title' => 'Shop',
                'items' => [
                    $i('Orders', $this->count($order), $this->note($this->count($order, fn ($q) => $q->where('status', 'pending'), ['status']), 'pending'), '/admin/orders'),
                    $i('Products', $this->count($product), null, '/admin/products'),
                    $i('Product reviews', $this->count($review), null, '/admin/reviews'),
                    $i('Messages', $this->count($message), $this->note($this->count($message, fn ($q) => $q->where('is_read', false), ['is_read']), 'unread'), '/admin/messages'),
                ],
            ],
        ];

        /* --------------------------- Needs attention ---------------------- */

        $attention = array_values(array_filter([
            ['label' => 'Orders pending', 'count' => $this->count($order, fn ($q) => $q->where('status', 'pending'), ['status']), 'href' => '/admin/orders'],
            ['label' => 'Appointments pending', 'count' => $this->count($appointment, fn ($q) => $q->where('status', 'pending'), ['status']), 'href' => '/admin/appointments'],
            ['label' => 'Verification requests pending', 'count' => $this->count($verification, fn ($q) => $q->where('status', 'pending'), ['status']), 'href' => '/admin/verification-requests'],
            ['label' => 'Testimonials awaiting approval', 'count' => $this->count($testimonial, fn ($q) => $q->where('is_approved', false), ['is_approved']), 'href' => '/admin/testimonials'],
            ['label' => 'CPD activities pending', 'count' => $this->count($cpd, fn ($q) => $q->where('status', 'pending'), ['status']), 'href' => '/admin/cpd-activities'],
            ['label' => 'Unread messages', 'count' => $this->count($message, fn ($q) => $q->where('is_read', false), ['is_read']), 'href' => '/admin/messages'],
            ['label' => 'Draft courses', 'count' => $this->count($course, fn ($q) => $q->where('status', 'draft'), ['status']), 'href' => '/admin/courses'],
            ['label' => 'Draft articles', 'count' => $this->count($article, fn ($q) => $q->where('status', 'draft'), ['status']), 'href' => '/admin/articles'],
        ], fn ($row) => $row['count'] > 0));

        /* ------------------------------ Exams ----------------------------- */

        $attempts = $this->count($attempt);
        $passed   = $this->count($attempt, fn ($q) => $q->where('passed', true), ['passed']);

        return Inertia::render('Dashboard/Admin/Index', [
            'currency'  => config('app.currency', 'RWF'),
            'revenue'   => [
                'total'     => $this->revenue($order),
                'last_30'   => $this->revenue($order, $since),
                'by_month'  => $this->monthly($order, 'total', true),
            ],
            'sections'  => $sections,
            'attention' => $attention,
            'exams'     => [
                'attempts'  => $attempts,
                'passed'    => $passed,
                'pass_rate' => $attempts > 0 ? round($passed / $attempts * 100) : null,
            ],
            'enrollmentsByMonth'  => $this->monthly($enrollment),
            'enrollmentsByStatus' => $this->grouped($enrollment, 'status'),
            'usersByRole'         => $this->grouped($user, 'role'),
            'recent' => [
                'enrollments' => $this->recent($enrollment, ['user:id,name', 'course:id,title']),
                'orders'      => $this->recent($order, ['user:id,name']),
                'users'       => $this->recent($user, [], ['id', 'name', 'email', 'role', 'created_at']),
                'articles'    => $this->recent($article, ['author:id,name']),
                'appointments'=> $this->recent($appointment, ['practitioner:id,name']),
                'messages'    => $this->recent($message),
            ],
        ]);
    }

    /* ====================================================================== */
    /* Helpers                                                                */
    /* ====================================================================== */

    /** First App\Models class from the list that exists AND has a table. */
    private function model(string ...$names): ?string
    {
        foreach ($names as $name) {
            $class = self::NS . $name;

            try {
                if (class_exists($class) && Schema::hasTable((new $class)->getTable())) {
                    return $class;
                }
            } catch (\Throwable $e) {
                report($e);
            }
        }

        return null;
    }

    private function hasColumns(string $model, array $columns): bool
    {
        $table = (new $model)->getTable();

        foreach ($columns as $column) {
            if (! Schema::hasColumn($table, $column)) {
                return false;
            }
        }

        return true;
    }

    private function count(?string $model, ?callable $scope = null, array $needs = []): int
    {
        if (! $model) {
            return 0;
        }

        try {
            if ($needs && ! $this->hasColumns($model, $needs)) {
                return 0;
            }

            $query = $model::query();
            $scope && $scope($query);

            return $query->count();
        } catch (\Throwable $e) {
            report($e);

            return 0;
        }
    }

    private function sum(?string $model, string $column): float
    {
        if (! $model) {
            return 0.0;
        }

        try {
            return $this->hasColumns($model, [$column]) ? (float) $model::query()->sum($column) : 0.0;
        } catch (\Throwable $e) {
            report($e);

            return 0.0;
        }
    }

    /** "3 published", or null when the figure is zero (keeps cards quiet). */
    private function note(int $value, string $label): ?string
    {
        return $value > 0 ? number_format($value) . ' ' . $label : null;
    }

    /** Paid order revenue (Order.total where payment_status is paid). */
    private function revenue(?string $order, ?Carbon $since = null): float
    {
        if (! $order || ! $this->hasColumns($order, ['total'])) {
            return 0.0;
        }

        try {
            $query = $order::query();
            $this->applyPaid($query, $order);
            $since && $query->where('created_at', '>=', $since);

            return (float) $query->sum('total');
        } catch (\Throwable $e) {
            report($e);

            return 0.0;
        }
    }

    private function applyPaid($query, string $order): void
    {
        $column = $this->hasColumns($order, ['payment_status']) ? 'payment_status'
            : ($this->hasColumns($order, ['status']) ? 'status' : null);

        $column && $query->whereIn($column, self::PAID);
    }

    /**
     * Last 6 calendar months, oldest first, zero-filled.
     * Counts rows, or sums Order.total (paid only) when $sumTotal is true.
     * Grouped in PHP so it works on any database driver.
     */
    private function monthly(?string $model, string $column = 'total', bool $sumTotal = false): array
    {
        $months = [];
        for ($n = 5; $n >= 0; $n--) {
            $date = Carbon::now()->startOfMonth()->subMonths($n);
            $months[$date->format('Y-m')] = ['label' => $date->format('M'), 'total' => 0];
        }

        if ($model) {
            try {
                $query = $model::query()->where('created_at', '>=', Carbon::now()->startOfMonth()->subMonths(5));

                if ($sumTotal) {
                    if (! $this->hasColumns($model, [$column])) {
                        return array_values($months);
                    }
                    $this->applyPaid($query, $model);
                }

                $query->get($sumTotal ? [$column, 'created_at'] : ['created_at'])
                    ->each(function ($row) use (&$months, $sumTotal, $column) {
                        $key = $row->created_at?->format('Y-m');
                        if ($key && isset($months[$key])) {
                            $months[$key]['total'] += $sumTotal ? (float) $row->{$column} : 1;
                        }
                    });
            } catch (\Throwable $e) {
                report($e);
            }
        }

        return array_values($months);
    }

    private function grouped(?string $model, string $column): array
    {
        if (! $model || ! $this->hasColumns($model, [$column])) {
            return [];
        }

        try {
            return $model::query()
                ->select($column, DB::raw('COUNT(*) as total'))
                ->groupBy($column)
                ->orderByDesc('total')
                ->get()
                ->map(fn ($row) => ['label' => $row->{$column} ?: 'unassigned', 'total' => (int) $row->total])
                ->all();
        } catch (\Throwable $e) {
            report($e);

            return [];
        }
    }

    /** Latest 5 rows; falls back to a plain query if a relation or column is missing. */
    private function recent(?string $model, array $with = [], array $columns = ['*']): array
    {
        if (! $model) {
            return [];
        }

        try {
            return $model::query()->with($with)->latest()->limit(5)->get($columns)->toArray();
        } catch (\Throwable $e) {
            try {
                return $model::query()->latest()->limit(5)->get()->toArray();
            } catch (\Throwable $e2) {
                report($e2);

                return [];
            }
        }
    }
}