<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CreditRecord extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'course_id',
        'exam_attempt_id',
        'credit_type',
        'credit_hours',
        'status',
        'issued_at',
    ];

    protected $casts = [
        'credit_hours' => 'decimal:2',
        'issued_at' => 'datetime',
    ];

    /**
     * The user who earned the credits.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(
            User::class,
            'user_id'
        );
    }

    /**
     * The course that generated the credits.
     */
    public function course(): BelongsTo
    {
        return $this->belongsTo(
            Course::class,
            'course_id'
        );
    }

    /**
     * The exam attempt associated with the credits.
     */
    public function examAttempt(): BelongsTo
    {
        return $this->belongsTo(
            ExamAttempt::class,
            'exam_attempt_id'
        );
    }
}