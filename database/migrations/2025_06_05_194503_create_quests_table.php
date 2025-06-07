<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('quests', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->enum('status', ['pending', 'complete', 'expired'])->default('pending');
            $table->text('description')->nullable();
            $table->enum('difficulty', ['easy', 'medium', 'hard'])->default('easy');
            $table->timestamp('completed_at')->nullable();
            $table->timestamp('expire_at')->nullable();
            $table->timestamps();

            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Changed to Breeze convention
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('quests');
    }
};
