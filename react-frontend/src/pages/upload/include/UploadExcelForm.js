import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import { useUploadExcelFile } from '../../../api/apiForm';
import swal from "sweetalert";


function UploadExcelForm() {
  const history = useHistory();
  const [file, setFile] = useState();
  const [errors, setErrors] = useState([]);

  const { mutateAsync, isLoading } = useUploadExcelFile();


  const uploadExcelFileOnServer = (event) => {
    event.preventDefault();
    if (file?.name !== undefined) {
      let formData = new FormData();
      formData.append("excel", file);
      mutateAsync(formData)
        .then(res => {
          if (res?.status === true) {
            history.push(`/`);
            swal({
              text: res?.msg,
              icon: "success",
              buttons: "Ok",
            });
          } else {
            setErrors(res.errors);
            const error = res.errors?.excel ? res.errors.excel[0] : null;
            if (error) {
              swal({
                text: error,
                icon: "error",
                buttons: "Dismiss",
              });
            }
          }
        });
    }
  }

  const excelError = errors?.excel ? errors.excel[0] : null;

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card my-5">
          <div className="card-body">
            <h4>Upload an Excel file from here</h4>
            <form onSubmit={(event) => uploadExcelFileOnServer(event)}>
              <div className="form-group">
                <label htmlFor="excel_file">Select an Excel File</label>
                <input
                  type="file"
                  className="form-control-file"
                  onChange={e => setFile(e.target.files[0])}
                  id="excel_file"
                />
                {
                  excelError && <p className="m-0 text-danger">{excelError}</p>
                }
                <small id="excel_file" className="form-text text-muted">
                  Upload an Excel file like the example are given
                </small>
                <a href={`/assets/attendance.xlsx`} download="example-excel.xlsx" className="mt-3">Download Example</a>
              </div>
              <div className="form-group">
                {
                  isLoading ?
                    <button type="button" className="btn btn-block btn-success disabled">
                      <div className="spinner-border text-white spinner-border-sm" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>
                    </button>
                    :
                    <button type="submit" className="btn btn-block btn-success">
                      Upload
                    </button>
                }
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  )
}

export default UploadExcelForm