<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('blog_comments', function (Blueprint $table) {
            $table->id();

            // Post relationship
            $table->foreignId('post_id')
                ->constrained('blog_posts')
                ->cascadeOnDelete();

            // User (optional for guests)
            $table->foreignId('user_id')
                ->nullable()
                ->constrained()
                ->nullOnDelete();

            // Guest info (if not logged in)
            $table->string('guest_name')->nullable();
            $table->string('guest_email')->nullable();

            // Comment content
            $table->text('comment');

            // Replies (nested comments support)
            $table->foreignId('parent_id')
                ->nullable()
                ->constrained('blog_comments')
                ->nullOnDelete();

            // Moderation
            $table->boolean('is_approved')->default(false);

            // Engagement (optional)
            $table->unsignedBigInteger('likes_count')->default(0);

            $table->timestamps();

            // Indexes for performance
            $table->index(['post_id', 'is_approved']);
            $table->index('parent_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('blog_comments');
    }
};