<?php

namespace App\Http\Controllers;

use App\Models\Certificate;
use App\Models\Course;
use App\Models\CourseEnrollment;
use App\Models\ExamAttempt;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
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
                'examAttempt:id,exam_id,score,passed',
                'examAttempt.exam:id,title',
            ])
            ->when($request->search, function ($query, $search) {
                $query->where(function ($query) use ($search) {
                    $query->whereHas('user', function ($query) use ($search) {
                        $query->where('name', 'like', "%{$search}%")
                            ->orWhere('email', 'like', "%{$search}%");
                    })
                    ->orWhereHas('course', function ($query) use ($search) {
                        $query->where('title', 'like', "%{$search}%");
                    })
                    ->orWhere(
                        'certificate_number',
                        'like',
                        "%{$search}%"
                    );
                });
            })
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Certificates/Index', [
            'certificates' => $certificates,
            'filters' => [
                'search' => $request->search,
            ],
        ]);
    }

    /**
     * Show the certificate creation page.
     */
    public function create(): Response
    {
        $users = \App\Models\User::query()
            ->where('role', 'nutritionist')
            ->select('id', 'name', 'email')
            ->orderBy('name')
            ->get();

        $courses = Course::query()
            ->select(
                'id',
                'title',
                'credit_type',
                'credit_hours'
            )
            ->orderBy('title')
            ->get();

        $examAttempts = ExamAttempt::query()
            ->with([
                'user:id,name',
                'exam:id,title',
            ])
            ->where('passed', true)
            ->select([
                'id',
                'user_id',
                'exam_id',
                'score',
                'passed',
            ])
            ->latest()
            ->get();

        return Inertia::render('Certificates/Create', [
            'users' => $users,
            'courses' => $courses,
            'examAttempts' => $examAttempts,
        ]);
    }

    /**
     * Issue a new certificate.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'user_id' => [
                'required',
                'exists:users,id',
            ],

            'course_id' => [
                'required',
                'exists:courses,id',
            ],

            'exam_attempt_id' => [
                'nullable',
                'exists:exam_attempts,id',
            ],

            'credit_hours' => [
                'required',
                'numeric',
                'min:0',
            ],

            'issued_at' => [
                'nullable',
                'date',
            ],
        ]);

        /*
        |--------------------------------------------------------------------------
        | Prevent duplicate certificates
        |--------------------------------------------------------------------------
        */

        $alreadyIssued = Certificate::query()
            ->where('user_id', $validated['user_id'])
            ->where('course_id', $validated['course_id'])
            ->exists();

        if ($alreadyIssued) {
            throw ValidationException::withMessages([
                'course_id' =>
                    'This user already has a certificate for this course.',
            ]);
        }

        /*
        |--------------------------------------------------------------------------
        | Validate exam attempt
        |--------------------------------------------------------------------------
        */

        if (!empty($validated['exam_attempt_id'])) {
            $examAttempt = ExamAttempt::findOrFail(
                $validated['exam_attempt_id']
            );

            if (
                $examAttempt->user_id !==
                (int) $validated['user_id']
            ) {
                throw ValidationException::withMessages([
                    'exam_attempt_id' =>
                        'The selected exam attempt does not belong to this user.',
                ]);
            }

            if (!$examAttempt->passed) {
                throw ValidationException::withMessages([
                    'exam_attempt_id' =>
                        'A certificate can only be issued after passing the exam.',
                ]);
            }
        }

        /*
        |--------------------------------------------------------------------------
        | Generate unique certificate identifiers
        |--------------------------------------------------------------------------
        */

        $certificateNumber = $this->generateCertificateNumber();

        $verificationCode = $this->generateVerificationCode();

        $certificate = Certificate::create([
            'user_id' => $validated['user_id'],
            'course_id' => $validated['course_id'],
            'exam_attempt_id' => $validated['exam_attempt_id'] ?? null,
            'certificate_number' => $certificateNumber,
            'credit_hours' => $validated['credit_hours'],
            'issued_at' => $validated['issued_at'] ?? now(),
            'verification_code' => $verificationCode,
        ]);

        return redirect()
            ->route(
                'certificates.show',
                $certificate
            )
            ->with(
                'success',
                'Certificate issued successfully.'
            );
    }

    /**
     * Display a certificate.
     */
    public function show(Certificate $certificate): Response
{
    abort_unless(
        $certificate->user_id === auth()->id(),
        403
    );

    $certificate->load([
        'user:id,name,email',
        'course:id,title,credit_type,credit_hours',
        'examAttempt:id,exam_id,score,passed',
    ]);

    return Inertia::render('Learner/Certificates/Show', [
        'certificate' => $certificate,
    ]);
}
   

    /**
     * Show the edit certificate page.
     */
    public function edit(
        Certificate $certificate
    ): Response {
        $certificate->load([
            'user',
            'course',
            'examAttempt.exam',
        ]);

        return Inertia::render('Certificates/Edit', [
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
            'credit_hours' => [
                'required',
                'numeric',
                'min:0',
            ],

            'issued_at' => [
                'required',
                'date',
            ],
        ]);

        $certificate->update($validated);

        return redirect()
            ->route(
                'certificates.show',
                $certificate
            )
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
            ->route('certificates.index')
            ->with(
                'success',
                'Certificate deleted successfully.'
            );
    }

    /**
     * Public certificate verification.
     */
    public function verify(
        string $verificationCode
    ): Response {
        $certificate = Certificate::query()
            ->with([
                'user:id,name',
                'course:id,title',
            ])
            ->where(
                'verification_code',
                $verificationCode
            )
            ->first();

        return Inertia::render(
            'Certificates/Verify',
            [
                'certificate' => $certificate,
                'verified' => $certificate !== null,
            ]
        );
    }

    /**
     * Generate a unique certificate number.
     */
    private function generateCertificateNumber(): string
    {
        do {
            $number = 'CERT-' .
                now()->format('Y') .
                '-' .
                strtoupper(
                    Str::random(8)
                );
        } while (
            Certificate::where(
                'certificate_number',
                $number
            )->exists()
        );

        return $number;
    }

    /**
     * Generate a unique verification code.
     */
    private function generateVerificationCode(): string
    {
        do {
            $code = strtoupper(
                Str::random(16)
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