<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ArticleVersion extends Model
{
    use HasFactory;

    protected $fillable = [
        'article_id',
        'title',
        'content',
        'edited_by',
    ];

    /**
     * The article this version belongs to
     */
    public function article()
    {
        return $this->belongsTo(Article::class);
    }

    /**
     * The user who made this edit
     */
    public function editor()
    {
        return $this->belongsTo(User::class, 'edited_by');
    }
}