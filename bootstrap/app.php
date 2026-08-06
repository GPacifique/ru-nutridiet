<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        api: __DIR__ . '/../routes/api.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )

    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
        ]);


        /*
        |--------------------------------------------------------------------------
        | Web Middleware (Inertia support)
        |--------------------------------------------------------------------------
        */
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
        ]);

        /*
        |--------------------------------------------------------------------------
        | Role Middleware Aliases (YOUR SYSTEM)
        |--------------------------------------------------------------------------
        | admin  -> full system control
        | agent  -> manages properties + inquiries
        | owner  -> posts properties
        | buyer  -> views + favorites + inquiries
        |--------------------------------------------------------------------------
        */
        $middleware->alias([
            'role' => \App\Http\Middleware\RoleMiddleware::class,
        ]);
    })

    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();