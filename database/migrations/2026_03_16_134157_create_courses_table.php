<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('courses', function (Blueprint $table) {
            $table->id();

            // COURSE INFORMATION
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->string('thumbnail')->nullable();

            // PROFESSIONAL CREDITS
            $table->string('credit_type')->nullable();
            $table->decimal('credit_hours', 8, 2)->default(0);

            // PRICING
            $table->decimal('price', 12, 2)->default(0);

            // STATUS
            $table->enum('status', [
                'draft',
                'published',
                'archived',
            ])->default('draft');

            // INSTRUCTOR
            $table->foreignId('instructor_id')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete();

            // PUBLICATION
            $table->timestamp('published_at')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('courses');
    }
};