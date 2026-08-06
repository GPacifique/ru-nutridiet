<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\CreditRecord;
use App\Models\ExamAttempt;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CreditRecordController extends Controller
{
    /**
     * Display all credit records.
     */
    public function index(Request $request): Response
    {
        $creditRecords = CreditRecord::query()
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
                    ->orWhere('credit_type', 'like', "%{$search}%");
                });
            })
            ->when($request->status, function ($query, $status) {
                $query->where('status', $status);
            })
            ->when($request->credit_type, function ($query, $creditType) {
                $query->where('credit_type', $creditType);
            })
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('CreditRecords/Index', [
            'creditRecords' => $creditRecords,
            'filters' => [
                'search' => $request->search,
                'status' => $request->status,
                'credit_type' => $request->credit_type,
            ],
        ]);
    }

    /**
     * Show the create credit record page.
     */
    public function create(): Response
    {
        $users = User::query()
            ->where('role', 'nutritionist')
            ->where('status', 'approved')
            ->select('id', 'name', 'email')
            ->orderBy('name')
            ->get();

        $courses = Course::query()
            ->select('id', 'title', 'credit_type', 'credit_hours')
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

        return Inertia::render('CreditRecords/Create', [
            'users' => $users,
            'courses' => $courses,
            'examAttempts' => $examAttempts,
        ]);
    }

    /**
     * Store a new credit record.
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

            'credit_type' => [
                'required',
                'string',
                'max:100',
            ],

            'credit_hours' => [
                'required',
                'numeric',
                'min:0',
            ],

            'status' => [
                'required',
                'in:pending,approved,rejected,revoked',
            ],

            'issued_at' => [
                'nullable',
                'date',
            ],
        ]);

        if (!empty($validated['exam_attempt_id'])) {
            $attempt = ExamAttempt::findOrFail(
                $validated['exam_attempt_id']
            );

            if (
                $attempt->user_id !== (int) $validated['user_id']
            ) {
                return back()
                    ->withErrors([
                        'exam_attempt_id' =>
                            'The exam attempt does not belong to this user.',
                    ])
                    ->withInput();
            }

            if (!$attempt->passed) {
                return back()
                    ->withErrors([
                        'exam_attempt_id' =>
                            'Credits can only be issued for a passed exam attempt.',
                    ])
                    ->withInput();
            }
        }

        CreditRecord::create($validated);

        return redirect()
            ->route('credit-records.index')
            ->with(
                'success',
                'Credit record created successfully.'
            );
    }

    /**
     * Display a credit record.
     */
    public function show(
        CreditRecord $creditRecord
    ): Response {
        $creditRecord->load([
            'user',
            'course',
            'examAttempt.exam',
        ]);

        return Inertia::render('CreditRecords/Show', [
            'creditRecord' => $creditRecord,
        ]);
    }

    /**
     * Show the edit credit record page.
     */
    public function edit(
        CreditRecord $creditRecord
    ): Response {
        $creditRecord->load([
            'user',
            'course',
            'examAttempt.exam',
        ]);

        return Inertia::render('CreditRecords/Edit', [
            'creditRecord' => $creditRecord,
        ]);
    }

    /**
     * Update a credit record.
     */
    public function update(
        Request $request,
        CreditRecord $creditRecord
    ): RedirectResponse {
        $validated = $request->validate([
            'credit_type' => [
                'required',
                'string',
                'max:100',
            ],

            'credit_hours' => [
                'required',
                'numeric',
                'min:0',
            ],

            'status' => [
                'required',
                'in:pending,approved,rejected,revoked',
            ],

            'issued_at' => [
                'nullable',
                'date',
            ],
        ]);

        $creditRecord->update($validated);

        return redirect()
            ->route(
                'credit-records.show',
                $creditRecord
            )
            ->with(
                'success',
                'Credit record updated successfully.'
            );
    }

    /**
     * Delete a credit record.
     */
    public function destroy(
        CreditRecord $creditRecord
    ): RedirectResponse {
        $creditRecord->delete();

        return redirect()
            ->route('credit-records.index')
            ->with(
                'success',
                'Credit record deleted successfully.'
            );
    }

    /**
     * Approve a credit record.
     */
    public function approve(
        CreditRecord $creditRecord
    ): RedirectResponse {
        $creditRecord->update([
            'status' => 'approved',
            'issued_at' => $creditRecord->issued_at ?? now(),
        ]);

        return back()->with(
            'success',
            'Credit record approved successfully.'
        );
    }

    /**
     * Reject a credit record.
     */
    public function reject(
        CreditRecord $creditRecord
    ): RedirectResponse {
        $creditRecord->update([
            'status' => 'rejected',
        ]);

        return back()->with(
            'success',
            'Credit record rejected successfully.'
        );
    }

    /**
     * Revoke an approved credit record.
     */
    public function revoke(
        CreditRecord $creditRecord
    ): RedirectResponse {
        $creditRecord->update([
            'status' => 'revoked',
        ]);

        return back()->with(
            'success',
            'Credit record revoked successfully.'
        );
    }
}