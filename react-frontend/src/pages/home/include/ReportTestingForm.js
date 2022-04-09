import React from 'react';

function ReportTestingForm(props) {
  const {start, setStart, end, setEnd} = props;


  const startTime = (data) => {
    setStart(data.format('H:m'))
  }

  const endTime = (data) => {
    setEnd(data.format('H:m'))
  }


  return (
    <div className="card mt-5 mb-3">
      <div className="card-body">
        <div className="row">
          <div className="col-md-4">
            <input type="time"
            className="form-control"
            placeholder="In Time"
            value={start}
            onChange={e=>setStart(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <input type="time"
            className="form-control"
            placeholder="Out Time"
            value={end}
            onChange={e=>setEnd(e.target.value)}
            />
          </div>
        </div>

      </div>
    </div>
  )
}

export default ReportTestingForm