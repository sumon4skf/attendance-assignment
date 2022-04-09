
import { useMutation, useQuery } from "react-query";
import { instance } from "../utils/AxiosInstance";


export const useUploadExcelFile = () => useMutation("useUploadExcelFile", async (props) => {
  try {
    const { data } = await instance.post(`excel-upload`, props);
    return data;
  } catch (error) {
    console.log(error);
  }
});


export const useAttendanceReport = (id, page) => useQuery(["useAttendanceReport", id, page], async () => {
  try {
    const { data } = await instance.post(`attendance-report`, { id, page });
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const useDownloadExcel = () => useMutation("useDownloadExcel", async (props) => {
  try {
    const { data } = await instance.post(`download-excel`, props, { responseType: 'blob' });
    var fileURL = window.URL.createObjectURL(new Blob([data]));
     var fileLink = document.createElement('a');    
     fileLink.href = fileURL;
     fileLink.setAttribute('download', 'attendance.pdf');
     document.body.appendChild(fileLink);     
     fileLink.click();
  } catch (error) {
    console.log(error);
  }
});