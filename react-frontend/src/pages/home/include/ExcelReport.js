import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from "react-router-dom";
import { useAttendanceReport, useDownloadExcel } from '../../../api/apiForm';
import PagePaginator from '../../../pagination/PagePaginator';
import moment from 'moment';
import TableComponent from './TableComponent';


function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function ExcelReport(props) {
  const { start, end } = props;
  const history = useHistory();
  const [search, setSearch] = useState();

  let query = useQuery();
  let page = query.get("page");
  let id = query.get("id");
  page = page ? parseInt(page) : 1;

  const { data, isLoading } = useAttendanceReport(id, page);
  const download = useDownloadExcel(id, page);

  useEffect(() => {
    if (search) {
      history.push(`?id=${search}&page=${page}`);
    } else {
      history.push(`?page=${page}`);
    }
  }, [search]);

  const handlePaginationClick = (data) => {
    if (id) {
      history.push(`?id=${id}&page=${data.selected + 1}`);
    } else {
      history.push(`?page=${data.selected + 1}`);
    }
  };

  const attendances = data?.attendances || [];
  const totalPage = data?.totalPage || 0;

  const genStart = start ? moment(start, 'h:mma') : null;
  const genOut = end ? moment(end, 'h:mma') : null;

  const jsPdfDownLoadAction = () => {

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
              <PagePaginator currentPage={page} handlePaginationClick={handlePaginationClick} totalPage={totalPage} />
            </div>
          </div>
        </div>
      </div >
    </div >
  )
}

export default ExcelReport