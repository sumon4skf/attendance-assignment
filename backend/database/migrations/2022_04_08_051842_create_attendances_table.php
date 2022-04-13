<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAttendancesTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('attendances', function (Blueprint $table) {
      $table->id();
      $table->string('month')->nullable();
      $table->string('date')->nullable();
      $table->string('day')->nullable();
      $table->string('emp_id')->nullable();
      $table->string('emp_name', 255)->nullable();
      $table->string('department', 255)->nullable();
      $table->string('first_in_time')->nullable();
      $table->string('last_out_time')->nullable();
      $table->string('hours_of_work')->nullable();
      $table->unsignedInteger('user_id')->nullable();
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::dropIfExists('attendances');
  }
<<<<<<< HEAD
}
=======
}
>>>>>>> 1ae97c911cf933a4398c98841e76ad9a31499ab0
