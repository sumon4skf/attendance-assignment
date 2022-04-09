import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from "react-router-dom";
import { useAttendanceReport, useDownloadExcel } from '../../../api/apiForm';
import PagePaginator from '../../../pagination/PagePaginator';
import moment from 'moment';
import TableComponent from './TableComponent';
import '../../../fonts/SolaimanLipi-normal.js';
import jsPDF from "jspdf";
import 'jspdf-autotable';


function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function ExcelReport(props) {
  const { start, end } = props;
  const history = useHistory();
  const [search, setSearch] = useState();
  const [limit, setLimit] = useState(10);

  let query = useQuery();
  let page = query.get("page");
  let id = query.get("id");
  page = page ? parseInt(page) : 1;

  const { data, isLoading } = useAttendanceReport(id, limit, page);

  useEffect(() => {
    let pushUrl = '/';
    if (limit) {
      if (search) {
        pushUrl = `?id=${search}&limit=${limit}`;
      } else {
        pushUrl = `?limit=${limit}`;
      }
    }
    history.push(pushUrl);

    console.log('limit', limit);

  }, [search, limit]);

  const handlePaginationClick = (data) => {
    if (id) {
      history.push(`?id=${id}&page=${data.selected + 1}&limit=${limit}`);
    } else {
      history.push(`?page=${data.selected + 1}&limit=${limit}`);
    }
  };

  const attendances = data?.attendances || [];
  const totalPage = data?.totalPage || 0;

  const genStart = start ? moment(start, 'h:mma') : null;
  const genOut = end ? moment(end, 'h:mma') : null;

  const jsPdfDownLoadAction = () => {
    const doc = new jsPDF();
    doc.setFont('SolaimanLipi'); // set custom font (SolaimanLipi)
    doc.setFontSize(12); // set font size 10
    doc.text('Attendance Report', 15, 10)
    doc.autoTable({
      theme: 'grid',
      styles: {
        font: 'SolaimanLipi'
      },
      columnStyles: () => {
        return { 0: { align: 'center', fillColor: [0, 255, 0] } }
      },
      columns: [
        { title: "Month", dataKey: "month" },
        { title: "Date", dataKey: "date" },
        { title: "Day", dataKey: "day" },
        { title: "ID", dataKey: "emp_id" },
        { title: "Name", dataKey: "emp_name" },
        { title: "Department", dataKey: "department" },
        { title: "In Time", dataKey: "first_in_time" },
        { title: "Out Time", dataKey: "last_out_time" },
        { title: "Hours", dataKey: "hours_of_work" }
      ],
      body: attendances,
      includeHiddenHtml: true
    })
    doc.save("attendance.pdf");
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-12">
        <div className="card mb-5">
          <div className="card-body">
            <div className="row">
              <div className="col-md-2">
                <button type="button" onClick={() => jsPdfDownLoadAction()} className="btn btn-block btn-primary">
                  PDF Download
                </button>
              </div>
              <div className="col-md-2">
                <div className="form-group">
                  <select name="limit" value={limit} onChange={(e) => setLimit(e.target.value)} className="form-control">
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                    <option value="all">All</option>
                  </select>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <input type="text"
                    className="form-control"
                    id="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search By Id" autoComplete="off" />
                </div>
              </div>
            </div>

            <TableComponent
              attendances={attendances}
              isLoading={isLoading}
              genStart={genStart}
              genOut={genOut}
            />

            <div className="navigation">
              {
                totalPage > 1 &&
                <PagePaginator currentPage={page} handlePaginationClick={handlePaginationClick} totalPage={totalPage} />
              }
            </div>
          </div>
        </div>
      </div >
    </div >
  )
}

export default ExcelReport