<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('credit_records', function (Blueprint $table) {
            $table->id();

            // NUTRITIONIST
            $table->foreignId('user_id')
                ->constrained('users')
                ->cascadeOnDelete();

            // COURSE
            $table->foreignId('course_id')
                ->constrained('courses')
                ->cascadeOnDelete();

            // PASSED EXAM ATTEMPT
            $table->foreignId('exam_attempt_id')
                ->nullable()
                ->constrained('exam_attempts')
                ->nullOnDelete();

            // CREDIT INFORMATION
            $table->string('credit_type');

            $table->decimal('credit_hours', 8, 2);

            // CREDIT STATUS
            $table->enum('status', [
                'pending',
                'approved',
                'rejected',
                'revoked',
            ])->default('pending');

            // DATE CREDIT WAS ISSUED
            $table->timestamp('issued_at')
                ->nullable();

            $table->timestamps();

            $table->index([
                'user_id',
                'course_id',
            ]);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('credit_records');
    }
};