<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Certificate extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'course_id',
        'exam_attempt_id',
        'certificate_number',
        'credit_hours',
        'issued_at',
        'verification_code',
    ];

    protected $casts = [
        'credit_hours' => 'decimal:2',
        'issued_at' => 'datetime',
    ];

    /**
     * User who earned the certificate.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(
            User::class,
            'user_id'
        );
    }

    /**
     * Course completed by the user.
     */
    public function course(): BelongsTo
    {
        return $this->belongsTo(
            Course::class,
            'course_id'
        );
    }

    /**
     * Exam attempt associated with the certificate.
     */
    public function examAttempt(): BelongsTo
    {
        return $this->belongsTo(
            ExamAttempt::class,
            'exam_attempt_id'
        );
    }
}