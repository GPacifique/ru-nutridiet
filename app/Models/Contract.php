<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Contract extends Model
{
    protected $fillable = [
        'project_id',
        'client_id',
        'freelancer_id',
        'amount',
        'status'
    ];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }
}
