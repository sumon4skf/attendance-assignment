import moment from 'moment';
import React from 'react'

function TableComponent(props) {

  const { attendances, isLoading, genStart, genOut } = props;

  const inTimeClass = (report) => {
    const in_time = moment(report.first_in_time, 'h:mma');
    if (genStart) {
      if (genStart.isBefore(in_time) > 0) {
        return true;
      }
    }
    return false;
  }

  const outTimeClass = (report) => {
    const out_time = moment(report.last_out_time, 'h:mma');
    if (genOut) {
      if (out_time.isBefore(genOut) > 0) {
        return true;
      }
    }
    return false;
  }

  const styles = (report) => {
    let style = {};
    if (outTimeClass(report)) {
      style.backgroundColor = '#ffc107';
    }
    if (inTimeClass(report)) {
      style.backgroundColor = '#dc3545';
    }
    return style;
  }


  return (
    <table className="table" id="my-table">
      <thead>
        <tr>
          <th scope="col">#SL</th>
          <th scope="col">Month</th>
          <th scope="col">Date</th>
          <th scope="col">Day</th>
          <th scope="col">ID</th>
          <th scope="col" className="text-nowrap">Employee Name</th>
          <th scope="col">Department</th>
          <th scope="col" className="text-nowrap">First-In Time</th>
          <th scope="col" className="text-nowrap">Last-Out Time</th>
          <th scope="col" className="text-nowrap">Hours of Work</th>
        </tr>
      </thead>
      {/* id, month, date, day, emp_id, emp_name, department, first_in_time, last_out_time, hours_of_work, user_id, created_at, updated_at */}
      <tbody>
        {
          attendances?.length > 0 && !isLoading ?
            attendances?.map((report, index) =>
              <tr key={index} style={styles(report)}>
                <td>{report.id}</td>
                <td>{report.month}</td>
                <td>{report.date}</td>
                <td>{report.day}</td>
                <td>{report.emp_id}</td>
                <td className="text-nowrap">{report.emp_name}</td>
                <td >{report.department}</td>
                <td className="text-nowrap">{report.first_in_time}</td>
                <td className="text-nowrap">{report.last_out_time}</td>
                <td className="text-nowrap">{report.hours_of_work}</td>
              </tr>
            )
            : (
              isLoading ?
                <tr>
                  <td colSpan={10} className="text-center">
                    <div className="d-flex justify-content-center p-5">
                      <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  </td>
                </tr>
                :
                <tr>
                  <td colSpan={10} className="text-center">Data not found</td>
                </tr>
            )
        }
      </tbody>
    </table>
  )
}

export default TableComponent