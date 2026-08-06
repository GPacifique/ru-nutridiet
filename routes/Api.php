<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ProposalController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ContractController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\CategoryController;

/*
|--------------------------------------------------------------------------
| AUTH ROUTES (Public)
|--------------------------------------------------------------------------
*/

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

/*
|--------------------------------------------------------------------------
| PROTECTED ROUTES
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->group(function () {

    /*
    |--------------------------------------------------------------------------
    | AUTH
    |--------------------------------------------------------------------------
    */
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);

    /*
    |--------------------------------------------------------------------------
    | PROFILE
    |--------------------------------------------------------------------------
    */
    Route::get('/profile', [ProfileController::class, 'show']);
    Route::post('/profile/update', [ProfileController::class, 'update']);

    /*
    |--------------------------------------------------------------------------
    | PRODUCTS (DIGITAL MARKETPLACE)
    |--------------------------------------------------------------------------
    */
    Route::get('/products', [ProductController::class, 'index']);
    Route::post('/products', [ProductController::class, 'store']);
    Route::get('/products/{product}', [ProductController::class, 'show']);
    Route::put('/products/{product}', [ProductController::class, 'update']);
    Route::delete('/products/{product}', [ProductController::class, 'destroy']);

    /*
    |--------------------------------------------------------------------------
    | CATEGORIES
    |--------------------------------------------------------------------------
    */
    Route::get('/categories', [CategoryController::class, 'index']);
    Route::post('/categories', [CategoryController::class, 'store']);

    /*
    |--------------------------------------------------------------------------
    | PROJECTS (FREELANCING)
    |--------------------------------------------------------------------------
    */
    Route::get('/projects', [ProjectController::class, 'index']);
    Route::post('/projects', [ProjectController::class, 'store']);
    Route::get('/projects/{project}', [ProjectController::class, 'show']);
    Route::put('/projects/{project}', [ProjectController::class, 'update']);
    Route::delete('/projects/{project}', [ProjectController::class, 'destroy']);

    /*
    |--------------------------------------------------------------------------
    | PROPOSALS
    |--------------------------------------------------------------------------
    */
    Route::post('/proposals', [ProposalController::class, 'store']);
    Route::get('/projects/{project}/proposals', [ProposalController::class, 'index']);

    /*
    |--------------------------------------------------------------------------
    | CONTRACTS
    |--------------------------------------------------------------------------
    */
    Route::post('/contracts', [ContractController::class, 'store']);
    Route::get('/contracts/{contract}', [ContractController::class, 'show']);

    /*
    |--------------------------------------------------------------------------
    | ORDERS (DIGITAL PRODUCTS)
    |--------------------------------------------------------------------------
    */
    Route::get('/orders', [OrderController::class, 'index']);
    Route::post('/orders', [OrderController::class, 'store']);
    Route::get('/orders/{order}', [OrderController::class, 'show']);

    /*
    |--------------------------------------------------------------------------
    | PAYMENTS
    |--------------------------------------------------------------------------
    */
    Route::post('/payments/initialize', [PaymentController::class, 'initialize']);
    Route::post('/payments/confirm', [PaymentController::class, 'confirm']);

    /*
    |--------------------------------------------------------------------------
    | REVIEWS
    |--------------------------------------------------------------------------
    */
    Route::post('/reviews', [ReviewController::class, 'store']);
    Route::get('/products/{product}/reviews', [ReviewController::class, 'productReviews']);
    Route::get('/projects/{project}/reviews', [ReviewController::class, 'projectReviews']);

});