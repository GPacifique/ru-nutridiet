<?php

namespace App\Http\Controllers\Learner;

use App\Http\Controllers\Controller;
use App\Models\Certificate;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CertificateController extends Controller
{

    public function index()
    {

        $certificates = Certificate::where('user_id', Auth::id())
            ->latest()
            ->paginate(10);


        return Inertia::render('Learner/Certificates/Index', [
            'certificates' => $certificates
        ]);

    }

}