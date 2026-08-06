<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('course_lessons', function (Blueprint $table) {
            $table->id();

            // COURSE
            $table->foreignId('course_id')
                ->constrained('courses')
                ->cascadeOnDelete();

            // LESSON INFORMATION
            $table->string('title');
            $table->string('slug');

            $table->enum('type', [
                'text',
                'video',
                'document',
                'quiz',
            ])->default('text');

            // CONTENT
            $table->longText('content')->nullable();
            $table->string('video_url')->nullable();

            // ORDER & DURATION
            $table->unsignedInteger('position')->default(0);
            $table->unsignedInteger('duration_minutes')->nullable();

            // ACCESS
            $table->boolean('is_preview')->default(false);

            $table->timestamps();

            // A lesson slug only needs to be unique within a course
            $table->unique([
                'course_id',
                'slug',
            ]);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('course_lessons');
    }
};