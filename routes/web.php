<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Public Controllers
|--------------------------------------------------------------------------
*/

use App\Http\Controllers\HomeController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\CertificateVerificationController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\ShopController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\OrderController;

/*
|--------------------------------------------------------------------------
| Profile / Account Controllers
|--------------------------------------------------------------------------
*/

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AccountSettingsController;
use App\Http\Controllers\AccountSecurityController;
use App\Http\Controllers\AccountNotificationsController;
use App\Http\Controllers\AccountBillingController;

/*
|--------------------------------------------------------------------------
| Admin Controllers
|--------------------------------------------------------------------------
*/

use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\CourseController as AdminCourseController;
use App\Http\Controllers\Admin\CourseCategoryController;
use App\Http\Controllers\Admin\LessonController as AdminLessonController;
use App\Http\Controllers\Admin\QuizController as AdminQuizController;
use App\Http\Controllers\Admin\QuestionController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\EnrollmentController as AdminEnrollmentController;
use App\Http\Controllers\Admin\CertificateController as AdminCertificateController;
use App\Http\Controllers\Admin\PaymentController;
use App\Http\Controllers\Admin\ReportController;

/*
| New admin controllers (one per sidebar item in AdminLayout.jsx).
| These classes do not exist yet; create them with, for example:
|   php artisan make:controller Admin/ArticleController --resource
*/

use App\Http\Controllers\Admin\ExamController as AdminExamController;
use App\Http\Controllers\Admin\ArticleController as AdminArticleController;
use App\Http\Controllers\Admin\AnnouncementController as AdminAnnouncementController;
use App\Http\Controllers\Admin\TestimonialController as AdminTestimonialController;
use App\Http\Controllers\Admin\TenderController as AdminTenderController;
use App\Http\Controllers\Admin\AdvertisementController as AdminAdvertisementController;
use App\Http\Controllers\Admin\PractitionerController as AdminPractitionerController;
use App\Http\Controllers\Admin\VerificationRequestController as AdminVerificationRequestController;
use App\Http\Controllers\Admin\CpdActivityController as AdminCpdActivityController;
use App\Http\Controllers\Admin\AppointmentController as AdminAppointmentController;
use App\Http\Controllers\Admin\ProductController as AdminProductController;
use App\Http\Controllers\Admin\OrderController as AdminOrderController;
use App\Http\Controllers\Admin\ReviewController as AdminReviewController;
use App\Http\Controllers\Admin\MessageController as AdminMessageController;
use App\Http\Controllers\Admin\NewsletterController as AdminNewsletterController;

/*
|--------------------------------------------------------------------------
| Learner / Instructor / Client / Practitioner Controllers
|--------------------------------------------------------------------------
*/

use App\Http\Controllers\Learner\DashboardController as LearnerDashboardController;
use App\Http\Controllers\Learner\CourseController as LearnerCourseController;
use App\Http\Controllers\Learner\LessonController;
use App\Http\Controllers\Learner\QuizController as LearnerQuizController;
use App\Http\Controllers\Learner\CertificateController as LearnerCertificateController;
use App\Http\Controllers\CourseEnrollmentController;
use App\Http\Controllers\Instructor\DashboardController as InstructorDashboardController;
use App\Http\Controllers\Client\DashboardController as ClientDashboardController;
use App\Http\Controllers\Practitioner\DashboardController as PractitionerDashboardController;

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/services', fn () => Inertia::render('Services/Index'))->name('services');

// Blog.
// /blog/{slug} is served by ArticleController (the Article model binds by slug).
// The old BlogController@show used the same URI and the same route name
// "blog.show". The first registration always won, so it never ran, and the
// duplicate name makes `php artisan route:cache` fail. It is removed here.
Route::get('/blog', [BlogController::class, 'index'])->name('blog.index');
Route::get('/blog/{article:slug}', [ArticleController::class, 'show'])->name('blog.show');

// ArticleCard.jsx links with route('articles.show', ...). Same page as blog.show,
// kept as a named alias so both route names work.
Route::get('/articles/{article:slug}', [ArticleController::class, 'show'])->name('articles.show');

// Courses
Route::get('/courses', [CourseController::class, 'index'])->name('courses.index');
Route::get('/courses/{course:slug}', [CourseController::class, 'show'])->name('courses.show');

// Certificate verification
Route::get('/certificate/verify/{code}', [CertificateVerificationController::class, 'verify'])
    ->name('certificate.verify');

// Appointments
Route::get('/book', [AppointmentController::class, 'create'])->name('book');
Route::post('/book', [AppointmentController::class, 'store'])->name('book.store');

/*
|--------------------------------------------------------------------------
| Shop / Marketplace (public browsing)
|--------------------------------------------------------------------------
|
| /shop/{product} is an alias of /products/{product} so the links used on
| the home page keep working. {product} binds by id unless the Product
| model overrides getRouteKeyName() to return 'slug'.
|
*/

Route::get('/shop', [ShopController::class, 'index'])->name('shop');
Route::get('/marketplace', [ProductController::class, 'index'])->name('marketplace');
Route::get('/products/{product}', [ProductController::class, 'show'])->name('products.show');
Route::get('/shop/{product}', [ProductController::class, 'show'])->name('shop.show');

/*
|--------------------------------------------------------------------------
| Cart
|--------------------------------------------------------------------------
|
| Left public so guests can fill a cart. Make sure CartController scopes
| every cart item to the current user/session (update + destroy take an
| id, so they must verify ownership).
|
*/

Route::get('/cart', [CartController::class, 'index'])->name('cart');
Route::post('/cart', [CartController::class, 'store'])->name('cart.store');
Route::patch('/cart/{cart}', [CartController::class, 'update'])->name('cart.update');
Route::delete('/cart/{cart}', [CartController::class, 'destroy'])->name('cart.destroy');

/*
|--------------------------------------------------------------------------
| Checkout & Orders (login required)
|--------------------------------------------------------------------------
|
| OrderController@show must also confirm the order belongs to the
| logged-in user (or the user is an admin).
|
*/

Route::middleware('auth')->group(function () {

    Route::get('/checkout', [CheckoutController::class, 'index'])->name('checkout');
    Route::post('/checkout', [CheckoutController::class, 'store'])->name('checkout.store');

    Route::get('/orders', [OrderController::class, 'index'])->name('orders.index');
    Route::get('/orders/{order}', [OrderController::class, 'show'])->name('orders.show');

});

/*
|--------------------------------------------------------------------------
| Authenticated Dashboard Redirect
|--------------------------------------------------------------------------
|
| After login, users are redirected according to their role. Roles whose
| dashboard route is not defined fall back to the home page instead of
| throwing a RouteNotFoundException.
|
*/

Route::middleware('auth')->get('/dashboard', function () {

    $target = match (auth()->user()->role) {
        'admin'        => 'admin.dashboard',
        'instructor'   => 'instructor.dashboard',
        'practitioner' => 'practitioner.dashboard',
        'client'       => 'client.dashboard',
        'learner'      => 'learner.dashboard',
        'staff'        => 'staff.dashboard',
        'super-admin'  => 'superadmin.dashboard',
        default        => 'home',
    };

    return redirect()->route(Route::has($target) ? $target : 'home');

})->name('dashboard');

/*
|--------------------------------------------------------------------------
| Instructor Routes
|--------------------------------------------------------------------------
*/

Route::middleware(['auth', 'verified', 'role:instructor'])
    ->prefix('instructor')
    ->name('instructor.')
    ->group(function () {
        Route::get('/dashboard', [InstructorDashboardController::class, 'index'])->name('dashboard');
    });

/*
|--------------------------------------------------------------------------
| Client Routes
|--------------------------------------------------------------------------
*/

Route::middleware(['auth', 'verified', 'role:client'])
    ->prefix('client')
    ->name('client.')
    ->group(function () {
        Route::get('/dashboard', [ClientDashboardController::class, 'index'])->name('dashboard');
    });

/*
|--------------------------------------------------------------------------
| Practitioner Routes
|--------------------------------------------------------------------------
*/

Route::middleware(['auth', 'verified', 'role:practitioner'])
    ->prefix('practitioner')
    ->name('practitioner.')
    ->group(function () {
        Route::get('/dashboard', [PractitionerDashboardController::class, 'index'])->name('dashboard');
    });

/*
|--------------------------------------------------------------------------
| Authenticated Profile Routes
|--------------------------------------------------------------------------
*/

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

/*
|--------------------------------------------------------------------------
| Account Settings
|--------------------------------------------------------------------------
*/

Route::middleware(['auth', 'verified'])
    ->prefix('account')
    ->name('account.')
    ->group(function () {
        Route::get('/settings', [AccountSettingsController::class, 'index'])->name('settings');
        Route::get('/security', [AccountSecurityController::class, 'index'])->name('security');
        Route::get('/notifications', [AccountNotificationsController::class, 'index'])->name('notifications');
        Route::get('/billing', [AccountBillingController::class, 'index'])->name('billing');
    });

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
|
| One block per sidebar group in AdminLayout.jsx. Every URL below matches a
| sidebar href, so flipping `live: true` on that item is all the front end
| needs once its controller exists.
|
*/

Route::middleware(['auth', 'verified', 'role:admin'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {

        Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');

        /* ---------------------------- Learning ---------------------------- */

        Route::resource('courses', AdminCourseController::class);
        Route::resource('course-categories', CourseCategoryController::class);
        Route::resource('lessons', AdminLessonController::class);
        Route::resource('quizzes', AdminQuizController::class);
        Route::resource('exams', AdminExamController::class);

        // Questions: admin-only.
        // Nested store keeps the quiz context: POST /admin/quizzes/{quiz}/questions
        Route::post('/quizzes/{quiz}/questions', [QuestionController::class, 'store'])
            ->name('quizzes.questions.store');
        Route::resource('questions', QuestionController::class)->except(['store']);

        /* ----------------------------- Content ---------------------------- */

        // Article binds by slug (Article::getRouteKeyName), so URLs look like
        // /admin/articles/my-post/edit
        // Inline images for the rich text editor. Declared before the resource.
        Route::post('/articles/upload-image', [AdminArticleController::class, 'uploadImage'])
            ->name('articles.upload-image');

        Route::resource('articles', AdminArticleController::class);

        Route::resource('announcements', AdminAnnouncementController::class);

        Route::resource('testimonials', AdminTestimonialController::class);
        Route::patch('/testimonials/{testimonial}/approve', [AdminTestimonialController::class, 'approve'])
            ->name('testimonials.approve');
        Route::patch('/testimonials/{testimonial}/reject', [AdminTestimonialController::class, 'reject'])
            ->name('testimonials.reject');

        Route::resource('tenders', AdminTenderController::class);
        Route::resource('advertisements', AdminAdvertisementController::class);

        /* ------------------------------ People ---------------------------- */

        Route::resource('users', UserController::class);
        Route::resource('practitioners', AdminPractitionerController::class);

        Route::resource('enrollments', AdminEnrollmentController::class)
            ->only(['index', 'show', 'destroy']);

        Route::resource('certificates', AdminCertificateController::class);

        // Review queue: list, open, approve / reject.
        Route::resource('verification-requests', AdminVerificationRequestController::class)
            ->only(['index', 'show', 'update']);
        Route::patch('/verification-requests/{verification_request}/approve', [AdminVerificationRequestController::class, 'approve'])
            ->name('verification-requests.approve');
        Route::patch('/verification-requests/{verification_request}/reject', [AdminVerificationRequestController::class, 'reject'])
            ->name('verification-requests.reject');

        Route::resource('cpd-activities', AdminCpdActivityController::class)
            ->only(['index', 'show', 'update', 'destroy']);

        Route::resource('appointments', AdminAppointmentController::class)
            ->only(['index', 'show', 'update', 'destroy']);

        /* ------------------------------- Shop ----------------------------- */

        Route::resource('products', AdminProductController::class);

        Route::resource('orders', AdminOrderController::class)
            ->only(['index', 'show', 'update']);

        Route::resource('reviews', AdminReviewController::class)
            ->only(['index', 'destroy']);

        Route::resource('payments', PaymentController::class)
            ->only(['index', 'show']);

        /* ------------------------------- Inbox ---------------------------- */

        Route::resource('messages', AdminMessageController::class)
            ->only(['index', 'show', 'destroy']);
        Route::patch('/messages/{message}/read', [AdminMessageController::class, 'markRead'])
            ->name('messages.read');

        Route::resource('newsletter', AdminNewsletterController::class)
            ->only(['index', 'destroy']);

        /* ----------------------------- Insights --------------------------- */

        Route::get('/reports', [ReportController::class, 'index'])->name('reports.index');
        Route::get('/reports/revenue', [ReportController::class, 'revenue'])->name('reports.revenue');
        Route::get('/reports/enrollments', [ReportController::class, 'enrollments'])->name('reports.enrollments');
        Route::get('/reports/certificates', [ReportController::class, 'certificates'])->name('reports.certificates');

    });

/*
|--------------------------------------------------------------------------
| Learner Routes
|--------------------------------------------------------------------------
|
| All learner routes live in ONE group to avoid duplicate route names.
|
*/

Route::middleware(['auth', 'verified', 'role:learner'])
    ->prefix('learner')
    ->name('learner.')
    ->group(function () {

        Route::get('/dashboard', [LearnerDashboardController::class, 'index'])->name('dashboard');

        // Courses
        Route::get('/courses', [LearnerCourseController::class, 'index'])->name('courses.index');
        Route::get('/courses/{course:slug}', [LearnerCourseController::class, 'show'])->name('courses.show');
        Route::post('/courses/{course}/enroll', [LearnerCourseController::class, 'enroll'])->name('courses.enroll');

        // Enrollments
        Route::get('/course-enrollments', [CourseEnrollmentController::class, 'index'])
            ->name('courseenrollments.index');

        // Lessons
        Route::get('/lessons/{lesson}', [LessonController::class, 'show'])->name('lessons.show');
        Route::post('/lessons/{lesson}/complete', [LessonController::class, 'complete'])->name('lessons.complete');

        // Quizzes
        Route::get('/quizzes/{quiz}', [LearnerQuizController::class, 'show'])->name('quizzes.show');
        Route::post('/quizzes/{quiz}/submit', [LearnerQuizController::class, 'submit'])->name('quizzes.submit');

        // Certificates
        Route::get('/certificates', [LearnerCertificateController::class, 'index'])->name('certificates.index');
        Route::get('/certificates/{certificate}/download', [LearnerCertificateController::class, 'download'])
            ->name('certificates.download');

    });

/*
|--------------------------------------------------------------------------
| Breeze Authentication Routes
|--------------------------------------------------------------------------
|
| Do not manually define login/register/logout routes here. Breeze owns
| login, register, logout, password reset and email verification.
|
*/

require __DIR__ . '/auth.php';