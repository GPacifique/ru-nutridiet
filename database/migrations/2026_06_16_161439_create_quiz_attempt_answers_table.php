<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('quiz_attempt_answers', function (Blueprint $table) {
            $table->id();

            $table->foreignId('quiz_attempt_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->foreignId('question_id')
                ->constrained('quiz_questions')
                ->cascadeOnDelete();

            $table->foreignId('selected_answer_id')
                ->nullable()
                ->constrained('quiz_answers')
                ->nullOnDelete();

            $table->text('text_answer')
                ->nullable();

            $table->boolean('is_correct')
                ->default(false);

            $table->decimal('earned_points', 8, 2)
                ->default(0);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('quiz_attempt_answers');
    }
};