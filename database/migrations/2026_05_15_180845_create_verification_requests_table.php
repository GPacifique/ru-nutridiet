<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('verification_requests', function (Blueprint $table) {
            $table->id();

            // User who is requesting verification
            $table->foreignId('user_id')
                ->constrained()
                ->onDelete('cascade');

            // Type of verification
            $table->enum('type', [
                'agent',
                'landlord',
                'agency',
                'property_manager'
            ]);

            // Request status lifecycle
            $table->enum('status', [
                'pending',
                'under_review',
                'approved',
                'rejected'
            ])->default('pending');

            // Uploaded documents (ID, license, proof, etc.)
            $table->json('documents')->nullable();

            // Admin feedback
            $table->text('admin_notes')->nullable();

            // When it was reviewed
            $table->timestamp('reviewed_at')->nullable();

            // Who reviewed it (admin user)
            $table->foreignId('reviewed_by')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('verification_requests');
    }
};