<?php

namespace App\Http\Controllers\Practitioner;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(Request $request): Response
    {
        $practitioner = $request->user()->practitioner;

        return Inertia::render('Practitioner/Dashboard', [
            'practitioner' => $practitioner,
            'upcomingAppointments' => [], // wire up once bookings exist
        ]);
    }
}