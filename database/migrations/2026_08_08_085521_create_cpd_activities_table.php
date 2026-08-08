<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('cpd_activities', function (Blueprint $table) {
            $table->id();

            // Practitioner
            $table->foreignId('practitioner_id')
                ->constrained('practitioners')
                ->cascadeOnDelete();

            // Activity information
            $table->string('title');
            $table->text('description')->nullable();

            $table->enum('activity_type', [
                'course',
                'workshop',
                'conference',
                'webinar',
                'seminar',
                'self_learning',
                'research',
                'presentation',
                'other',
            ])->default('course');

            $table->string('provider')->nullable();

            // Dates
            $table->date('start_date')->nullable();
            $table->date('end_date')->nullable();

            // CPD value
            $table->decimal('hours', 8, 2)->default(0);
            $table->decimal('points', 8, 2)->default(0);

            // Evidence / certificate
            $table->string('certificate')->nullable();

            // Approval workflow
            $table->enum('status', [
                'pending',
                'approved',
                'rejected',
            ])->default('pending');

            $table->text('admin_notes')->nullable();

            $table->timestamps();

            $table->index(['practitioner_id', 'status']);
            $table->index('activity_type');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('cpd_activities');
    }
};