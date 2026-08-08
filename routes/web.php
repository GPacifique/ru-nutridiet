<?php

use Illuminate\Support\Facades\Route;

// Public Controllers
use App\Http\Controllers\HomeController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\CertificateVerificationController;

// Authentication Controllers
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;

// Admin Controllers
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

// Account Controllers
use App\Http\Controllers\AccountSettingsController;
use App\Http\Controllers\AccountSecurityController;
use App\Http\Controllers\AccountNotificationsController;
use App\Http\Controllers\AccountBillingController;

// Learner Controllers
use App\Http\Controllers\Learner\DashboardController as LearnerDashboardController;
use App\Http\Controllers\Learner\CourseController as LearnerCourseController;
use App\Http\Controllers\Learner\LessonController;
use App\Http\Controllers\Learner\QuizController as LearnerQuizController;
use App\Http\Controllers\Learner\CertificateController as LearnerCertificateController;
use App\Http\Controllers\CertificateController;
use App\Http\Controllers\PaymentController as LearnerPaymentController;
use App\Http\Controllers\EnrollmentController as LearnerEnrollmentController;
use App\Http\Controllers\CourseEnrollmentController;

Route::get('/blog/{slug}', [BlogController::class, 'show'])
    ->name('blog.show');

Route::middleware('auth')
->prefix('learner')
->name('learner.')
->group(function(){

    Route::get('/profile',
        [ProfileController::class,'edit']
    )->name('profile.edit');


});


Route::middleware(['auth'])->prefix('learner')->name('learner.')->group(function () {

    Route::get('/course-enrollments', [
        CourseEnrollmentController::class,
        'index'
    ])->name('courseenrollments.index');


});

Route::middleware(['auth'])->group(function () {

    Route::resource(
        'certificates',
        CertificateController::class
    )->only([
        'index',
        'show'
    ]);

});
Route::prefix('learner')
    ->name('learner.')
    ->middleware(['auth'])
    ->group(function () {

        Route::resource(
            'courseenrollments',
            CourseEnrollmentController::class
        );

    });
/*
|--------------------------------------------------------------------------
| Authentication Routes
|--------------------------------------------------------------------------
| Single source of truth for login/register/logout. Nothing else in this
| file (and nothing required at the bottom) should redefine these names.
*/

Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthenticatedSessionController::class, 'create'])->name('login');
    Route::post('/login', [AuthenticatedSessionController::class, 'store']);

    Route::get('/register', [RegisteredUserController::class, 'create'])->name('register');
    Route::post('/register', [RegisteredUserController::class, 'store']);
});

Route::middleware('auth')->group(function () {
    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');
});

/*
|--------------------------------------------------------------------------
| Post-login landing
|--------------------------------------------------------------------------
| Central redirect target so controllers/middleware can send users to
| "dashboard" without knowing their role in advance.
*/

Route::middleware('auth')->get('/dashboard', function () {
    return match (auth()->user()->role) {
        'admin' => redirect()->route('admin.dashboard'),
        'learner' => redirect()->route('learner.dashboard'),
        default => redirect('/'),
    };
})->name('dashboard');

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/courses', [CourseController::class, 'index'])->name('courses.index');
Route::get('/courses/{course:slug}', [CourseController::class, 'show'])->name('courses.show');

Route::get('/blog', [BlogController::class, 'index'])->name('blog.index');
Route::get('/blog/{post:slug}', [BlogController::class, 'show'])->name('blog.show');

Route::get(
    '/certificate/verify/{code}',
    [CertificateVerificationController::class, 'verify']
)->name('certificate.verify');

/*
|--------------------------------------------------------------------------
| Authenticated Profile Routes
|--------------------------------------------------------------------------
*/

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/profile', [ProfileController::class, 'edit'])
        ->name('profile.edit');

    Route::patch('/profile', [ProfileController::class, 'update'])
        ->name('profile.update');

    Route::delete('/profile', [ProfileController::class, 'destroy'])
        ->name('profile.destroy');
});

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/

Route::middleware(['auth', 'verified', 'role:admin'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {

        Route::get('/dashboard', [AdminDashboardController::class, 'index'])
            ->name('dashboard');

        Route::resource('courses', AdminCourseController::class);

        Route::resource('course-categories', CourseCategoryController::class);

        Route::resource('lessons', AdminLessonController::class);

        Route::resource('quizzes', AdminQuizController::class);

        Route::resource('questions', QuestionController::class);

        Route::resource('users', UserController::class);

        Route::resource('enrollments', AdminEnrollmentController::class)
            ->only(['index', 'show', 'destroy']);

        Route::resource('certificates', AdminCertificateController::class);

        Route::resource('payments', PaymentController::class)
            ->only(['index', 'show']);

        Route::get('/reports', [ReportController::class, 'index'])
            ->name('reports.index');

        Route::get('/reports/revenue', [ReportController::class, 'revenue'])
            ->name('reports.revenue');

        Route::get('/reports/enrollments', [ReportController::class, 'enrollments'])
            ->name('reports.enrollments');

        Route::get('/reports/certificates', [ReportController::class, 'certificates'])
            ->name('reports.certificates');
    });

/*
|--------------------------------------------------------------------------
| Learner Routes
|--------------------------------------------------------------------------
*/

Route::middleware(['auth', 'verified', 'role:learner'])
    ->prefix('learner')
    ->name('learner.')
    ->group(function () {

        Route::get('/dashboard', [LearnerDashboardController::class, 'index'])
            ->name('dashboard');

        Route::get('/courses', [LearnerCourseController::class, 'index'])
            ->name('courses.index');

        Route::get('/courses/{course:slug}', [LearnerCourseController::class, 'show'])
            ->name('courses.show');

        Route::post('/courses/{course}/enroll', [LearnerCourseController::class, 'enroll'])
            ->name('courses.enroll');

        Route::get('/lessons/{lesson}', [LessonController::class, 'show'])
            ->name('lessons.show');

        Route::post('/lessons/{lesson}/complete', [LessonController::class, 'complete'])
            ->name('lessons.complete');

        Route::get('/quizzes/{quiz}', [LearnerQuizController::class, 'show'])
            ->name('quizzes.show');

        Route::post('/quizzes/{quiz}/submit', [LearnerQuizController::class, 'submit'])
            ->name('quizzes.submit');

        Route::get('/certificates', [LearnerCertificateController::class, 'index'])
            ->name('certificates.index');

        Route::get(
            '/certificates/{certificate}/download',
            [LearnerCertificateController::class, 'download']
        )->name('certificates.download');
    });