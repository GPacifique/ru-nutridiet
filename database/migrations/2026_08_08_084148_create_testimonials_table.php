<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
       Schema::create('testimonials', function (Blueprint $table) {
    $table->id();

    $table->foreignId('user_id')
        ->nullable()
        ->constrained()
        ->nullOnDelete();

    $table->string('name');
    $table->string('role')->nullable(); // Patient, Nutritionist, CPD Learner, etc.
    $table->string('title')->nullable(); // e.g. "Weight Management Journey"
    $table->text('content');

    $table->unsignedTinyInteger('rating')
        ->default(5);

    $table->string('image')->nullable();

    $table->enum('type', [
        'patient',
        'professional',
        'cpd',
        'corporate',
    ])->default('patient');

    $table->boolean('is_featured')->default(false);
    $table->boolean('is_approved')->default(false);
    $table->timestamp('approved_at')->nullable();

    $table->timestamps();
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('testimonials');
    }
};
