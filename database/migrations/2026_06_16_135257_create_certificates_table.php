<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('certificates', function (Blueprint $table) {
            $table->id();

            // USER WHO EARNED THE CERTIFICATE
            $table->foreignId('user_id')
                ->constrained('users')
                ->cascadeOnDelete();

            // COMPLETED COURSE
            $table->foreignId('course_id')
                ->constrained('courses')
                ->cascadeOnDelete();

            // PASSED EXAM ATTEMPT
            $table->foreignId('exam_attempt_id')
                ->nullable()
                ->constrained('exam_attempts')
                ->nullOnDelete();

            // CERTIFICATE IDENTIFICATION
            $table->string('certificate_number')
                ->unique();

            // PROFESSIONAL CREDIT HOURS
            $table->decimal('credit_hours', 8, 2);

            // ISSUE DATE
            $table->timestamp('issued_at')
                ->nullable();

            // PUBLIC VERIFICATION CODE
            $table->string('verification_code')
                ->unique();

            $table->timestamps();

            $table->unique([
    'user_id',
    'course_id',
]);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('certificates');
    }
};