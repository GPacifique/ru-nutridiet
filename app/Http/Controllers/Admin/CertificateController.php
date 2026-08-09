<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Certificate;
use App\Models\CourseEnrollment;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class CertificateController extends Controller
{
    /**
     * Display all certificates.
     */
    public function index(Request $request): Response
    {
        $certificates = Certificate::query()
            ->with([
                'user:id,name,email',
                'course:id,title',
            ])
            ->when($request->search, function ($query, $search) {
                $query->where(function ($query) use ($search) {
                    $query->where('certificate_number', 'like', "%{$search}%")
                        ->orWhereHas('user', function ($query) use ($search) {
                            $query->where('name', 'like', "%{$search}%")
                                ->orWhere('email', 'like', "%{$search}%");
                        })
                        ->orWhereHas('course', function ($query) use ($search) {
                            $query->where('title', 'like', "%{$search}%");
                        });
                });
            })
            ->when($request->status, function ($query, $status) {
                $query->where('status', $status);
            })
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Admin/Certificates/Index', [
            'certificates' => $certificates,

            'filters' => [
                'search' => $request->search,
                'status' => $request->status,
            ],

            'statuses' => [
                'issued',
                'revoked',
            ],
        ]);
    }

    /**
     * Show the certificate creation form.
     */
    public function create(): Response
    {
        $enrollments = CourseEnrollment::query()
            ->with([
                'user:id,name,email',
                'course:id,title',
            ])
            ->where('status', 'completed')
            ->whereDoesntHave('certificate')
            ->latest()
            ->get();

        return Inertia::render('Admin/Certificates/Create', [
            'enrollments' => $enrollments,
        ]);
    }

    /**
     * Issue a new certificate.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'enrollment_id' => [
                'required',
                'exists:course_enrollments,id',
            ],

            'issued_at' => [
                'nullable',
                'date',
            ],

            'expires_at' => [
                'nullable',
                'date',
                'after_or_equal:issued_at',
            ],
        ]);

        $enrollment = CourseEnrollment::query()
            ->with([
                'user',
                'course',
            ])
            ->findOrFail($validated['enrollment_id']);

        if ($enrollment->status !== 'completed') {
            return back()
                ->withErrors([
                    'enrollment_id' =>
                        'A certificate can only be issued for a completed enrollment.',
                ])
                ->withInput();
        }

        if ($enrollment->certificate()->exists()) {
            return back()
                ->withErrors([
                    'enrollment_id' =>
                        'A certificate already exists for this enrollment.',
                ])
                ->withInput();
        }

        $certificate = Certificate::create([
            'user_id' => $enrollment->user_id,
            'course_id' => $enrollment->course_id,
            'enrollment_id' => $enrollment->id,
            'certificate_number' => $this->generateCertificateNumber(),
            'verification_code' => $this->generateVerificationCode(),
            'status' => 'issued',
            'issued_at' => $validated['issued_at'] ?? now(),
            'expires_at' => $validated['expires_at'] ?? null,
        ]);

        return redirect()
            ->route('admin.certificates.show', $certificate)
            ->with(
                'success',
                'Certificate issued successfully.'
            );
    }

    /**
     * Display a certificate.
     */
    public function show(
        Certificate $certificate
    ): Response {
        $certificate->load([
            'user:id,name,email',
            'course:id,title',
            'enrollment',
        ]);

        return Inertia::render('Admin/Certificates/Show', [
            'certificate' => $certificate,
        ]);
    }

    /**
     * Show the certificate edit form.
     */
    public function edit(
        Certificate $certificate
    ): Response {
        $certificate->load([
            'user:id,name,email',
            'course:id,title',
        ]);

        return Inertia::render('Admin/Certificates/Edit', [
            'certificate' => $certificate,
        ]);
    }

    /**
     * Update certificate information.
     */
    public function update(
        Request $request,
        Certificate $certificate
    ): RedirectResponse {
        $validated = $request->validate([
            'status' => [
                'required',
                'in:issued,revoked',
            ],

            'issued_at' => [
                'nullable',
                'date',
            ],

            'expires_at' => [
                'nullable',
                'date',
            ],
        ]);

        $certificate->update($validated);

        return redirect()
            ->route('admin.certificates.show', $certificate)
            ->with(
                'success',
                'Certificate updated successfully.'
            );
    }

    /**
     * Delete a certificate.
     */
    public function destroy(
        Certificate $certificate
    ): RedirectResponse {
        $certificate->delete();

        return redirect()
            ->route('admin.certificates.index')
            ->with(
                'success',
                'Certificate deleted successfully.'
            );
    }

    /**
     * Revoke a certificate.
     */
    public function revoke(
        Certificate $certificate
    ): RedirectResponse {
        $certificate->update([
            'status' => 'revoked',
        ]);

        return back()->with(
            'success',
            'Certificate revoked successfully.'
        );
    }

    /**
     * Generate a unique certificate number.
     */
    private function generateCertificateNumber(): string
    {
        do {
            $number = 'RUN-' .
                now()->format('Y') .
                '-' .
                strtoupper(Str::random(8));
        } while (
            Certificate::where(
                'certificate_number',
                $number
            )->exists()
        );

        return $number;
    }

    /**
     * Generate a unique public verification code.
     */
    private function generateVerificationCode(): string
    {
        do {
            $code = strtoupper(
                Str::random(32)
            );
        } while (
            Certificate::where(
                'verification_code',
                $code
            )->exists()
        );

        return $code;
    }
}
