<?php

namespace App\Http\Controllers\Instructor;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(Request $request): Response
    {
        $user = $request->user();

        return Inertia::render('Instructor/Dashboard', [
            'courses' => $user->courses ?? [], // adjust once the Instructor-Course relation exists
        ]);
    }
}