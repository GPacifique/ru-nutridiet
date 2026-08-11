<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
       Schema::create('orders', function (Blueprint $table) {
    $table->id();

    $table->foreignId('user_id')
        ->nullable()
        ->constrained('users')
        ->nullOnDelete();

    $table->string('first_name');
    $table->string('last_name');

    $table->string('email');
    $table->string('phone');

    $table->text('address');
    $table->string('city');

    $table->string('payment_method');
    $table->text('notes')->nullable();

    $table->decimal('subtotal', 12, 2);
    $table->decimal('total', 12, 2);

    $table->string('status')->default('pending');

    $table->string('payment_status')
        ->default('pending');

    $table->timestamps();
});
    }

    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};