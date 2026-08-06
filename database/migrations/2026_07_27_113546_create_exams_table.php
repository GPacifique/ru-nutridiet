<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('exams', function (Blueprint $table) {
            $table->id();

            // COURSE
            $table->foreignId('course_id')
                ->constrained('courses')
                ->cascadeOnDelete();

            // EXAM INFORMATION
            $table->string('title');

            // PASSING REQUIREMENTS
            $table->decimal('passing_score', 5, 2)
                ->default(70);

            // TIME LIMIT IN MINUTES
            $table->unsignedInteger('time_limit')
                ->nullable();

            // NUMBER OF TIMES A NUTRITIONIST CAN ATTEMPT
            $table->unsignedInteger('max_attempts')
                ->default(3);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('exams');
    }
};