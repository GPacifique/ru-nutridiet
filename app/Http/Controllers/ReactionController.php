<?php
namespace App\Http\Controllers;

use App\Models\Reaction;
use App\Models\Article;
use Illuminate\Http\Request;

class ReactionController extends Controller
{
    /**
     * Add / Update / Toggle reaction
     */
    public function react(Request $request)
    {
        $data = $request->validate([
            'article_id' => 'required|exists:articles,id',
            'type' => 'required|in:like,dislike'
        ]);

        $userId = auth()->id();

        $reaction = Reaction::where('user_id', $userId)
            ->where('article_id', $data['article_id'])
            ->first();

        // 🔁 Toggle logic
        if ($reaction) {
            if ($reaction->type === $data['type']) {
                // Same reaction → remove it
                $reaction->delete();

                return response()->json([
                    'message' => 'Reaction removed'
                ]);
            }

            // Different reaction → update
            $reaction->update(['type' => $data['type']]);

            return response()->json([
                'message' => 'Reaction updated',
                'reaction' => $reaction
            ]);
        }

        // New reaction
        $reaction = Reaction::create([
            'user_id' => $userId,
            'article_id' => $data['article_id'],
            'type' => $data['type']
        ]);

        return response()->json([
            'message' => 'Reaction added',
            'reaction' => $reaction
        ]);
    }

    /**
     * Get reactions summary for an article
     */
    public function summary($article_id)
    {
        return [
            'likes' => Reaction::where('article_id', $article_id)
                ->where('type', 'like')->count(),

            'dislikes' => Reaction::where('article_id', $article_id)
                ->where('type', 'dislike')->count()
        ];
    }
}