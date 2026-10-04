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
        $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
        $table->string('number')->unique();
        $table->string('name');
        $table->string('email')->nullable();
        $table->string('phone');
        $table->string('address')->nullable();
        $table->text('notes')->nullable();
        $table->string('payment_method'); // momo, airtel, cash
        $table->string('status')->default('pending');
        $table->decimal('total', 12, 2);
        $table->timestamps();
    });

    Schema::create('order_items', function (Blueprint $table) {
        $table->id();
        $table->foreignId('order_id')->constrained()->cascadeOnDelete();
        $table->foreignId('product_id')->nullable()->constrained()->nullOnDelete();
        $table->string('title');                 // snapshot, survives product edits
        $table->decimal('price', 10, 2);         // snapshot
        $table->unsignedInteger('quantity');
        $table->timestamps();
    });
}

public function down(): void
{
    Schema::dropIfExists('order_items');
    Schema::dropIfExists('orders');
}
};