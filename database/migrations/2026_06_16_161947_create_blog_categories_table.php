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
        Schema::create('blog_categories', function (Blueprint $table) {
            $table->id();

            // Basic info
            $table->string('name');
            $table->string('slug')->unique();

            // Description for SEO & UI
            $table->text('description')->nullable();

            // Optional UI customization
            $table->string('icon')->nullable();
            $table->string('image')->nullable();

            // Status control
            $table->boolean('is_active')->default(true);

            // Sorting
            $table->integer('sort_order')->default(0);

            $table->timestamps();

            // Indexes for performance
            $table->index(['is_active']);
            $table->index(['sort_order']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('blog_categories');
    }
};