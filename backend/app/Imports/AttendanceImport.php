<?php

namespace App\Imports;

use App\Models\Attendance;
use Carbon\Carbon;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;

class AttendanceImport implements ToCollection
{

  public function collection(Collection $rows)
  {
    Attendance::truncate();
    foreach ($rows as $key => $row) {
      if ($row[0] !== 'Month' && $row[0]) {
        $date = ($row[1] - 25569) * 86400;
        $in_time = ($row[6] - 25569) * 86400;
        $out_time = ($row[7] - 25569) * 86400;
        $hours = $out_time - $in_time;

        Attendance::create([
          'month'     => $row[0],
          'date'    => Carbon::parse($date)->toDateString(),
          'day'    => $row[2],
          'emp_id'    => $row[3],
          'emp_name'    => $row[4],
          'department'    => $row[5],
          'first_in_time'    => Carbon::parse($in_time)->toTimeString(),
          'last_out_time'    => Carbon::parse($out_time)->toTimeString(),
          'hours_of_work'    => Carbon::parse($hours)->toTimeString(),
        ]);
      }
    }
  }
}
