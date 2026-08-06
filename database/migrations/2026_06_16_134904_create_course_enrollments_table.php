<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('course_enrollments', function (Blueprint $table) {
            $table->id();

            // NUTRITIONIST
            $table->foreignId('user_id')
                ->constrained('users')
                ->cascadeOnDelete();

            // COURSE
            $table->foreignId('course_id')
                ->constrained('courses')
                ->cascadeOnDelete();

            // ORDER / PAYMENT REFERENCE
            $table->foreignId('order_id')
                ->nullable()
                ->constrained('orders')
                ->nullOnDelete();

            // ENROLLMENT STATUS
            $table->enum('status', [
                'pending',
                'active',
                'completed',
                'cancelled',
                'expired',
            ])->default('pending');

            // COURSE PROGRESS
            $table->decimal('progress_percent', 5, 2)
                ->default(0);

            // DATES
            $table->timestamp('enrolled_at')
                ->nullable();

            $table->timestamp('completed_at')
                ->nullable();

            $table->timestamps();

            // Prevent duplicate enrollment
            $table->unique([
                'user_id',
                'course_id',
            ]);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('course_enrollments');
    }
};