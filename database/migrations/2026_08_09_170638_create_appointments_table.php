<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('appointments', function (Blueprint $table) {
            $table->id();

            $table->foreignId('practitioner_id')
                ->constrained()
                ->cascadeOnDelete();

            // Nullable so guests can book without an account.
            $table->foreignId('user_id')
                ->nullable()
                ->constrained()
                ->nullOnDelete();

            $table->string('name');
            $table->string('email');
            $table->string('phone')->nullable();

            $table->dateTime('scheduled_at');
            $table->text('notes')->nullable();

            $table->enum('status', ['pending', 'confirmed', 'cancelled', 'completed'])
                ->default('pending');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('appointments');
    }
};