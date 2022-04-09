import React, { useState } from 'react'
import ExcelReport from './include/ExcelReport'
import ReportTestingForm from './include/ReportTestingForm';

const Home = () => {

  const [start, setStart] = useState();
  const [end, setEnd] = useState();

  return (
    <div>
      <ReportTestingForm start={start} end={end}  setStart={setStart} setEnd={setEnd} />
      <ExcelReport start={start} end={end} />
    </div >
  )

}

export default Home