<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('practitioners', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->nullable();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('SET NULL');

            // Basic information
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('speciality')->nullable();
            // Professional information
            $table->string('qualification')->nullable();
            $table->string('focus')->nullable();
            $table->unsignedInteger('experience')->default(0);

            // Profile
            $table->text('bio')->nullable();

            // Contact
            $table->string('email')->nullable();
            $table->string('phone')->nullable();

            // Images
            $table->string('photo')->nullable();
            $table->string('thumbnail')->nullable();

            // Visibility / ordering
            $table->boolean('status')->default(true);
            $table->unsignedInteger('sort_order')->default(0);

            $table->timestamps();

            // Useful indexes
            $table->index('status');
            $table->index('sort_order');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('practitioners');
    }
};