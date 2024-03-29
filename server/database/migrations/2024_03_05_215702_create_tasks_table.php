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
//        Schema::create('tasks', function (Blueprint $table) {
//            $table->id();
//            $table->string('title');
//            $table->text('description');
//            $table->enum('priority', ['low', 'mid', 'high'])->default('low');
//            $table->enum('status', ['pending', 'in_progress', 'completed'])->default('pending');
//            $table->date('due_date')->nullable();
//            $table->foreignId('user_id')->nullable()->constrained('users')->onDelete('set null');
//            $table->foreignId('assigned_by')->nullable()->constrained('users')->onDelete('set null');
//            $table->foreignId('assigned_to')->nullable()->constrained('users')->onDelete('set null');
//            $table->timestamps();
//        });

        Schema::create('tasks', function (Blueprint $table) {
            $table->uuid('id');
            $table->string('title');
            $table->text('description');
            $table->enum('priority', ['low', 'mid', 'high'])->default('low');
            $table->enum('status', ['pending', 'in_progress', 'completed'])->default('pending');
            $table->date('due_date')->nullable();
            $table->foreignUuid('user_id')->nullable()->constrained('users')->onDelete('set null');
            $table->foreignUuid('assigned_by')->nullable()->constrained('users')->onDelete('set null');
            $table->foreignUuid('assigned_to')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
