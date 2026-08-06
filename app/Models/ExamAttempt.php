<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ExamAttempt extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'exam_id',
        'attempt_number',
        'score',
        'passed',
        'started_at',
        'completed_at',
    ];

    protected $casts = [
        'score' => 'decimal:2',
        'passed' => 'boolean',
        'started_at' => 'datetime',
        'completed_at' => 'datetime',
    ];

    /**
     * The user who made this attempt.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(
            User::class,
            'user_id'
        );
    }

    /**
     * The exam being attempted.
     */
    public function exam(): BelongsTo
    {
        return $this->belongsTo(
            Exam::class,
            'exam_id'
        );
    }
    public function creditRecord()
{
    return $this->hasOne(
        CreditRecord::class,
        'exam_attempt_id'
    );
}
public function certificate()
{
    return $this->hasOne(
        Certificate::class,
        'exam_attempt_id'
    );
}
}