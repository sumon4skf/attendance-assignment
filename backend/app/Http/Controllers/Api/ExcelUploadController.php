<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Imports\AttendanceImport;
use App\Models\Attendance;
use Illuminate\Support\Facades\Validator;
use Maatwebsite\Excel\Facades\Excel;

class ExcelUploadController extends Controller
{

  public function ExcelUpload()
  {
    $validator = Validator::make(
      request()->all(),
      [
        'excel' => 'required|mimes:csv,xlsx,xls',
      ]
    );

    if ($validator->fails()) {
      return response(['status' => false, 'errors' => $validator->errors()]);
    }
    $name = time();
    if (request()->hasFile('excel')) {
      $file = request()->file('excel');
      $extension = $file->getClientOriginalExtension();
      $name = $name . '.' . $extension;
      $file->storeAs('excel', $name, 'uploads');
    } else {
      return response(['status' => false, 'errors' => ['excel' => 'Please select an Excel file first']]);
    }


    $file = public_path("uploads/excel/{$name}");

    Excel::import(new AttendanceImport, $file);

    return response(['status' => true, 'msg' => 'Excel uploaded successfully', 'response' => $file]);
  }

  public function attendanceReport()
  {
    $search_id = request('id', null);
    $page = request('page', 1);
    $limit = request('limit', 5);
    $offset = $limit == 'all' ? 0 : ($page - 1) * $limit;
    $limit = $limit == 'all' ? 50000 : $limit;

    $query = $search_id ?  Attendance::where('emp_id', 'like', "%{$search_id}%")->offset($offset) : Attendance::offset($offset);
    $attendances = $query->limit($limit)->get();
    $total = $search_id ? Attendance::where('emp_id', 'like', "%{$search_id}%")->count() : Attendance::count();
    $totalPage = round($total / $limit);

    return response(['attendances' => $attendances, 'totalPage' => $totalPage]);
  }
}
