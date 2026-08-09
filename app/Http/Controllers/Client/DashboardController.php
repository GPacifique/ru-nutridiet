<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(Request $request): Response
    {
        $client = $request->user()->client;

        return Inertia::render('Client/Dashboard', [
            'client' => $client,
            'appointments' => [], // wire up once you have a bookings/appointments table
        ]);
    }
}