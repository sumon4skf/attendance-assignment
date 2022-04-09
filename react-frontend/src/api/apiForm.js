
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


export const useAttendanceReport = (id,limit, page) => useQuery(["useAttendanceReport", id, limit, page], async () => {
  try {
    const { data } = await instance.post(`attendance-report`, { id,limit, page });
    return data;
  } catch (error) {
    console.log(error);
  }
});

