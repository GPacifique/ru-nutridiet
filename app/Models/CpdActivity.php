<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CpdActivity extends Model
{
    use HasFactory;

    protected $fillable = [
        'practitioner_id',
        'title',
        'description',
        'activity_type',
        'provider',
        'start_date',
        'end_date',
        'hours',
        'points',
        'certificate',
        'status',
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date'   => 'date',
        'hours'      => 'decimal:2',
        'points'     => 'decimal:2',
    ];

    /**
     * The practitioner who completed this CPD activity.
     */
    public function practitioner(): BelongsTo
    {
        return $this->belongsTo(Practitioner::class);
    }

    /**
     * Scope completed activities.
     */
    public function scopeCompleted($query)
    {
        return $query->where('status', 'completed');
    }

    /**
     * Scope pending activities.
     */
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    /**
     * Get a readable activity type.
     */
    public function getActivityTypeLabelAttribute(): string
    {
        return match ($this->activity_type) {
            'course'       => 'Course',
            'workshop'     => 'Workshop',
            'conference'   => 'Conference',
            'webinar'      => 'Webinar',
            'seminar'      => 'Seminar',
            'self_learning'=> 'Self Learning',
            'research'     => 'Research',
            'presentation' => 'Presentation',
            default        => ucfirst(str_replace('_', ' ', $this->activity_type ?? 'Other')),
        };
    }
}