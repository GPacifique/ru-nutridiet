<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Lesson extends Model
{
    use HasFactory;

    /**
     * Mass assignable attributes.
     */
    protected $fillable = [
        'course_id',
        'title',
        'slug',
        'description',
        'content',
        'video_url',
        'video_duration',
        'sort_order',
        'status',
        'is_free',
        'published_at',
    ];

    /**
     * Attribute casting.
     */
    protected $casts = [
        'is_free' => 'boolean',
        'published_at' => 'datetime',
    ];

    /**
     * Course this lesson belongs to.
     */
    public function course(): BelongsTo
    {
        return $this->belongsTo(
            Course::class
        );
    }

    /**
     * Quizzes belonging to this lesson.
     */
    public function quizzes(): HasMany
    {
        return $this->hasMany(
            Quiz::class
        );
    }

    /**
     * Users who completed this lesson.
     */
    public function completedBy(): BelongsToMany
    {
        return $this->belongsToMany(
            User::class,
            'lesson_completions'
        )->withPivot(
            'completed_at'
        )->withTimestamps();
    }

    /**
     * Scope to published lessons.
     */
    public function scopePublished($query)
    {
        return $query->where(
            'status',
            'published'
        );
    }

    /**
     * Scope to free lessons.
     */
    public function scopeFree($query)
    {
        return $query->where(
            'is_free',
            true
        );
    }

    /**
     * Scope to lessons ordered for learning.
     */
    public function scopeOrdered($query)
    {
        return $query
            ->orderBy('sort_order')
            ->orderBy('id');
    }

    /**
     * Determine whether this lesson is free.
     */
    public function isFree(): bool
    {
        return $this->is_free;
    }

    /**
     * Determine whether a specific learner completed this lesson.
     */
    public function isCompletedBy(
        User $user
    ): bool {
        return $this->completedBy()
            ->where('users.id', $user->id)
            ->exists();
    }
}
