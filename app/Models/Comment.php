<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Property;
use App\Models\User;
Use App\Models\CommentLike;

class Comment extends Model
{
    use HasFactory;

    protected $fillable = [
        'property_id',
        'user_id',
        'comment',
        'parent_id',
    ];

    /**
     * The property this comment belongs to
     */
    public function property()
    {
        return $this->belongsTo(Property::class);
    }

    /**
     * The user who wrote the comment
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Replies (nested comments)
     */
    public function replies()
    {
        return $this->hasMany(Comment::class, 'parent_id');
    }

    /**
     * Parent comment (if this is a reply)
     */
    public function parent()
    {
        return $this->belongsTo(Comment::class, 'parent_id');
    }

    /**
     * Likes on this comment
     */
    public function likes()
    {
        return $this->hasMany(CommentLike::class);
    }
}