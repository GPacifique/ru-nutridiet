<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('exam_questions', function (Blueprint $table) {
            $table->id();

            // EXAM
            $table->foreignId('exam_id')
                ->constrained('exams')
                ->cascadeOnDelete();

            // QUESTION
            $table->text('question');

            // QUESTION TYPE
            $table->enum('type', [
                'multiple_choice',
                'true_false',
                'short_answer',
            ])->default('multiple_choice');

            // MARKS
            $table->decimal('points', 8, 2)
                ->default(1);

            // QUESTION ORDER
            $table->unsignedInteger('position')
                ->default(0);

            $table->timestamps();

            $table->index([
                'exam_id',
                'position',
            ]);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('exam_questions');
    }
};