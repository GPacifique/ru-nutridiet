<?php

namespace App\Http\Controllers;

use App\Models\Certificate;
use Inertia\Inertia;
use Inertia\Response;

class CertificateVerificationController extends Controller
{
    /**
     * Verify a certificate using its unique verification code.
     */
    public function verify(string $code): Response
    {
        $certificate = Certificate::with([
                'user:id,name,email',
                'course:id,title',
            ])
            ->where('verification_code', $code)
            ->first();

        return Inertia::render('Certificates/Verify', [
            'certificate' => $certificate,
            'valid' => $certificate !== null,
        ]);
    }
}