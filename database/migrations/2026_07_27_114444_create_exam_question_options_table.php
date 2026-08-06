<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('exam_question_options', function (Blueprint $table) {
            $table->id();

            // QUESTION
            $table->foreignId('question_id')
                ->constrained('exam_questions')
                ->cascadeOnDelete();

            // OPTION
            $table->text('option_text');

            // CORRECT ANSWER
            $table->boolean('is_correct')
                ->default(false);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('exam_question_options');
    }
};