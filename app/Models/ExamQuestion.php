<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ExamQuestion extends Model
{
    use HasFactory;

    protected $fillable = [
        'exam_id',
        'question',
        'type',
        'points',
        'position',
    ];

    protected $casts = [
        'points' => 'decimal:2',
        'position' => 'integer',
    ];

    /**
     * The exam this question belongs to.
     */
    public function exam(): BelongsTo
    {
        return $this->belongsTo(
            Exam::class,
            'exam_id'
        );
    }

    /**
     * Answer options for this question.
     */
    public function options(): HasMany
    {
        return $this->hasMany(
            ExamQuestionOption::class,
            'exam_question_id'
        )->orderBy('position');
    }
}