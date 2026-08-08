<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('exam_attempts', function (Blueprint $table) {
            $table->id();

            // USER TAKING THE EXAM
            $table->foreignId('user_id')
                ->constrained('users')
                ->cascadeOnDelete();

            // EXAM
            $table->foreignId('exam_id')
                ->constrained('exams')
                ->cascadeOnDelete();

            // ATTEMPT INFORMATION
            $table->unsignedInteger('attempt_number');

            $table->decimal('score', 5, 2)
                ->nullable();

            $table->boolean('passed')
                ->default(false);

            // TIMING
            $table->timestamp('started_at')
                ->nullable();

            $table->timestamp('completed_at')
                ->nullable();

            $table->timestamps();

            // Optional: prevent duplicate attempt numbers
            $table->unique([
                'user_id',
                'exam_id',
                'attempt_number',
            ]);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('exam_attempts');
    }
};