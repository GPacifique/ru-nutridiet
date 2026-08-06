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
        Schema::create('blog_posts', function (Blueprint $table) {
            $table->id();

            // Relationships
            $table->foreignId('category_id')
                ->nullable()
                ->constrained('blog_categories')
                ->nullOnDelete();

            $table->foreignId('author_id')
                ->constrained('users')
                ->cascadeOnDelete();

            // Content
            $table->string('title');
            $table->string('slug')->unique();

            $table->longText('excerpt')->nullable();
            $table->longText('content');

            // Media
            $table->string('featured_image')->nullable();

            // SEO
            $table->string('meta_title')->nullable();
            $table->text('meta_description')->nullable();

            // Publishing
            $table->enum('status', [
                'draft',
                'published',
                'archived'
            ])->default('draft');

            $table->timestamp('published_at')->nullable();

            // Statistics
            $table->unsignedBigInteger('views_count')->default(0);
            $table->unsignedBigInteger('likes_count')->default(0);

            // Featured Post
            $table->boolean('is_featured')->default(false);

            $table->timestamps();

            $table->index('slug');
            $table->index('status');
            $table->index('published_at');
            $table->index('is_featured');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('blog_posts');
    }
};