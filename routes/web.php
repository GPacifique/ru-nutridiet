<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public Controllers
|--------------------------------------------------------------------------
*/

use App\Http\Controllers\HomeController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\CertificateVerificationController;

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
|--------------------------------------------------------------------------
| Learner Controllers
|--------------------------------------------------------------------------
*/

use App\Http\Controllers\Learner\DashboardController as LearnerDashboardController;
use App\Http\Controllers\Learner\CourseController as LearnerCourseController;
use App\Http\Controllers\Learner\LessonController;
use App\Http\Controllers\Learner\QuizController as LearnerQuizController;
use App\Http\Controllers\Learner\CertificateController as LearnerCertificateController;

/*
|--------------------------------------------------------------------------
| Course Enrollment
|--------------------------------------------------------------------------
*/

use App\Http\Controllers\CourseEnrollmentController;

use App\Http\Controllers\Instructor\DashboardController as InstructorDashboardController;
use App\Http\Controllers\Client\DashboardController as ClientDashboardController;
use App\Http\Controllers\Practitioner\DashboardController as PractitionerDashboardController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\ShopController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\OrderController;

Route::get('/marketplace', [ProductController::class, 'index'])
    ->name('marketplace');

Route::get('/products/{product}', [ProductController::class, 'show'])
    ->name('products.show');


/*
|--------------------------------------------------------------------------
| Cart
|--------------------------------------------------------------------------
*/

Route::get('/cart', [CartController::class, 'index'])
    ->name('cart');

Route::post('/cart', [CartController::class, 'store'])
    ->name('cart.store');

Route::patch('/cart/{cart}', [CartController::class, 'update'])
    ->name('cart.update');

Route::delete('/cart/{cart}', [CartController::class, 'destroy'])
    ->name('cart.destroy');


/*
|--------------------------------------------------------------------------
| Checkout
|--------------------------------------------------------------------------
*/

Route::get('/checkout', [CheckoutController::class, 'index'])
    ->name('checkout');

Route::post('/checkout', [CheckoutController::class, 'store'])
    ->name('checkout.store');


/*
|--------------------------------------------------------------------------
| Orders
|--------------------------------------------------------------------------
*/

Route::get('/orders', [OrderController::class, 'index'])
    ->name('orders.index');

Route::get('/orders/{order}', [OrderController::class, 'show'])
    ->name('orders.show');
Route::get('/shop', [ShopController::class, 'index'])
    ->name('shop');
Route::get('/book', [AppointmentController::class, 'create'])->name('book');
Route::post('/book', [AppointmentController::class, 'store'])->name('book.store');
/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

Route::get('/', [HomeController::class, 'index'])
    ->name('home');

Route::get('/courses', [CourseController::class, 'index'])
    ->name('courses.index');

Route::get('/courses/{course:slug}', [CourseController::class, 'show'])
    ->name('courses.show');

Route::get('/blog', [BlogController::class, 'index'])
    ->name('blog.index');

Route::get('/blog/{post:slug}', [BlogController::class, 'show'])
    ->name('blog.show');

Route::get(
    '/certificate/verify/{code}',
    [CertificateVerificationController::class, 'verify']
)->name('certificate.verify');

Route::post('/quizzes/{quiz}/questions', [QuestionController::class, 'store'])
    ->name('questions.store');

Route::put('/questions/{question}', [QuestionController::class, 'update'])
    ->name('questions.update');

Route::delete('/questions/{question}', [QuestionController::class, 'destroy'])
    ->name('questions.destroy');
/*
|--------------------------------------------------------------------------
| Authenticated Dashboard Redirect
|--------------------------------------------------------------------------
|
| After login, users are redirected according to their role.
|
*/

Route::middleware('auth')->get('/dashboard', function () {

    $user = auth()->user();

    return match ($user->role) {
        'instructor' => redirect()->route('instructor.dashboard'),
        'practitioner' => redirect()->route('practitioner.dashboard'),
        'client' => redirect()->route('client.dashboard'),
        'staff' => redirect()->route('staff.dashboard'),
        'super-admin' => redirect()->route('superadmin.dashboard'),

        'admin' => redirect()->route('admin.dashboard'),

        'learner' => redirect()->route('learner.dashboard'),

        default => redirect()->route('home'),

    };

})->name('dashboard');
/*
|--------------------------------------------------------------------------
| Instructor Routes
|--------------------------------------------------------------------------
*/

Route::middleware([
    'auth',
    'verified',
    'role:instructor'
])
    ->prefix('instructor')
    ->name('instructor.')
    ->group(function () {

        Route::get('/dashboard', [
            InstructorDashboardController::class,
            'index'
        ])->name('dashboard');

    });


/*
|--------------------------------------------------------------------------
| Client Routes
|--------------------------------------------------------------------------
*/

Route::middleware([
    'auth',
    'verified',
    'role:client'
])
    ->prefix('client')
    ->name('client.')
    ->group(function () {

        Route::get('/dashboard', [
            ClientDashboardController::class,
            'index'
        ])->name('dashboard');

    });


/*
|--------------------------------------------------------------------------
| Practitioner Routes
|--------------------------------------------------------------------------
*/

Route::middleware([
    'auth',
    'verified',
    'role:practitioner'
])
    ->prefix('practitioner')
    ->name('practitioner.')
    ->group(function () {

        Route::get('/dashboard', [
            PractitionerDashboardController::class,
            'index'
        ])->name('dashboard');

    });

/*
|--------------------------------------------------------------------------
| Authenticated Profile Routes
|--------------------------------------------------------------------------
*/

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/profile', [
        ProfileController::class,
        'edit'
    ])->name('profile.edit');

    Route::patch('/profile', [
        ProfileController::class,
        'update'
    ])->name('profile.update');

    Route::delete('/profile', [
        ProfileController::class,
        'destroy'
    ])->name('profile.destroy');

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

        Route::get('/settings', [
            AccountSettingsController::class,
            'index'
        ])->name('settings');

        Route::get('/security', [
            AccountSecurityController::class,
            'index'
        ])->name('security');

        Route::get('/notifications', [
            AccountNotificationsController::class,
            'index'
        ])->name('notifications');

        Route::get('/billing', [
            AccountBillingController::class,
            'index'
        ])->name('billing');

    });


/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/

Route::middleware([
    'auth',
    'verified',
    'role:admin'
])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {

        /*
        |--------------------------------------------------------------------------
        | Dashboard
        |--------------------------------------------------------------------------
        */

        Route::get('/dashboard', [
            AdminDashboardController::class,
            'index'
        ])->name('dashboard');


        /*
        |--------------------------------------------------------------------------
        | Courses
        |--------------------------------------------------------------------------
        */

        Route::resource(
            'courses',
            AdminCourseController::class
        );


        /*
        |--------------------------------------------------------------------------
        | Course Categories
        |--------------------------------------------------------------------------
        */

        Route::resource(
            'course-categories',
            CourseCategoryController::class
        );


        /*
        |--------------------------------------------------------------------------
        | Lessons
        |--------------------------------------------------------------------------
        */

        Route::resource(
            'lessons',
            AdminLessonController::class
        );


        /*
        |--------------------------------------------------------------------------
        | Quizzes
        |--------------------------------------------------------------------------
        */

        Route::resource(
            'quizzes',
            AdminQuizController::class
        );


        /*
        |--------------------------------------------------------------------------
        | Questions
        |--------------------------------------------------------------------------
        */

        Route::resource(
            'questions',
            QuestionController::class
        );


        /*
        |--------------------------------------------------------------------------
        | Users
        |--------------------------------------------------------------------------
        */

        Route::resource(
            'users',
            UserController::class
        );


        /*
        |--------------------------------------------------------------------------
        | Enrollments
        |--------------------------------------------------------------------------
        */

        Route::resource(
            'enrollments',
            AdminEnrollmentController::class
        )->only([
            'index',
            'show',
            'destroy'
        ]);


        /*
        |--------------------------------------------------------------------------
        | Certificates
        |--------------------------------------------------------------------------
        */

        Route::resource(
            'certificates',
            AdminCertificateController::class
        );


        /*
        |--------------------------------------------------------------------------
        | Payments
        |--------------------------------------------------------------------------
        */

        Route::resource(
            'payments',
            PaymentController::class
        )->only([
            'index',
            'show'
        ]);


        /*
        |--------------------------------------------------------------------------
        | Reports
        |--------------------------------------------------------------------------
        */

        Route::get('/reports', [
            ReportController::class,
            'index'
        ])->name('reports.index');

        Route::get('/reports/revenue', [
            ReportController::class,
            'revenue'
        ])->name('reports.revenue');

        Route::get('/reports/enrollments', [
            ReportController::class,
            'enrollments'
        ])->name('reports.enrollments');

        Route::get('/reports/certificates', [
            ReportController::class,
            'certificates'
        ])->name('reports.certificates');

    });


/*
|--------------------------------------------------------------------------
| Learner Routes
|--------------------------------------------------------------------------
|
| IMPORTANT:
| All learner routes are inside ONE group.
| This prevents duplicate learner route names.
|
*/

Route::middleware([
    'auth',
    'verified',
    'role:learner'
])
    ->prefix('learner')
    ->name('learner.')
    ->group(function () {

        /*
        |--------------------------------------------------------------------------
        | Dashboard
        |--------------------------------------------------------------------------
        */

        Route::get('/dashboard', [
            LearnerDashboardController::class,
            'index'
        ])->name('dashboard');


        /*
        |--------------------------------------------------------------------------
        | Courses
        |--------------------------------------------------------------------------
        */

        Route::get('/courses', [
            LearnerCourseController::class,
            'index'
        ])->name('courses.index');

        Route::get('/courses/{course:slug}', [
            LearnerCourseController::class,
            'show'
        ])->name('courses.show');


        /*
        |--------------------------------------------------------------------------
        | Course Enrollment
        |--------------------------------------------------------------------------
        |
        | Learners enroll themselves through the course page.
        |
        */

        Route::post('/courses/{course}/enroll', [
            LearnerCourseController::class,
            'enroll'
        ])->name('courses.enroll');


        /*
        |--------------------------------------------------------------------------
        | Course Enrollments
        |--------------------------------------------------------------------------
        |
        | Single canonical index route.
        |
        */

        Route::get('/course-enrollments', [
            CourseEnrollmentController::class,
            'index'
        ])->name('courseenrollments.index');


        /*
        |--------------------------------------------------------------------------
        | Lessons
        |--------------------------------------------------------------------------
        */

        Route::get('/lessons/{lesson}', [
            LessonController::class,
            'show'
        ])->name('lessons.show');

        Route::post('/lessons/{lesson}/complete', [
            LessonController::class,
            'complete'
        ])->name('lessons.complete');


        /*
        |--------------------------------------------------------------------------
        | Quizzes
        |--------------------------------------------------------------------------
        */

        Route::get('/quizzes/{quiz}', [
            LearnerQuizController::class,
            'show'
        ])->name('quizzes.show');

        Route::post('/quizzes/{quiz}/submit', [
            LearnerQuizController::class,
            'submit'
        ])->name('quizzes.submit');


        /*
        |--------------------------------------------------------------------------
        | Certificates
        |--------------------------------------------------------------------------
        */

        Route::get('/certificates', [
            LearnerCertificateController::class,
            'index'
        ])->name('certificates.index');

        Route::get(
            '/certificates/{certificate}/download',
            [
                LearnerCertificateController::class,
                'download'
            ]
        )->name('certificates.download');

    });


/*
|--------------------------------------------------------------------------
| Breeze Authentication Routes
|--------------------------------------------------------------------------
|
| IMPORTANT:
| Do not manually define login/register/logout routes here.
|
| Breeze owns:
|
| login
| register
| logout
| password reset
| email verification
|
*/

require __DIR__ . '/auth.php';