<template>
  <div class="row my-5">
    <div class="col-md-12">
      <div class="card">
        <div class="card-body">
          <div class="row">
            <div class="col-md-4">
              <div class="form-group">
                <input type="text" v-model="search_id" @keyup="searchEmpId" placeholder="Employee ID" class="form-control" />
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group">
                <select name="limit" v-model="limit" value="limit" @change="reloadData" class="form-control">
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                  <option value="all">All</option>
                </select>
              </div>
            </div>
            <div class="col-md-2">
              <button type="button" @click="pdfDownload" class="btn btn-success">PDF Download</button>
            </div>
          </div>
          <AllAttendances :Attendances="Attendances?.attendances || []" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from "../utils/Axios";
import AllAttendances from "../components/table/AllAttendances";
import "../fonts/SolaimanLipi-normal.js";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default {
  name: "Reports",
  components: {
    AllAttendances,
  },
  data() {
    return {
      Attendances: {},
      limit: 5,
      search_id: '',
    };
  },
  methods: {
    async fetchTasks() {
      let full_url = "/attendance-report";
      full_url += this.limit ? `?limit=${this.limit}` : "";
      const { data } = await Axios.post(full_url);
      return data;
    },
    async reloadData() {
      let full_url = "/attendance-report";
      full_url += this.limit ? `?limit=${this.limit}` : "";
      const { data } = await Axios.post(full_url);
      this.Attendances = data;
    },
    async searchEmpId() {
      let full_url = "/attendance-report";
      full_url += this.search_id ? `?id=${this.search_id}&page=1` : "";
      const { data } = await Axios.post(full_url);
      this.Attendances = data;
    },
    pdfDownload() {
      const doc = new jsPDF();
      doc.setFont("SolaimanLipi"); // set custom font (SolaimanLipi)
      doc.setFontSize(12); // set font size 10
      doc.text("Attendance Report", 15, 10);
      doc.autoTable({
        theme: "grid",
        styles: {
          font: "SolaimanLipi",
        },
        columnStyles: () => {
          return { 0: { align: "center", fillColor: [0, 255, 0] } };
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
          { title: "Hours", dataKey: "hours_of_work" },
        ],
        body: this.Attendances.attendances,
        includeHiddenHtml: true,
      });
      doc.save("attendance.pdf");
    },
  },
  async created() {
    this.Attendances = await this.fetchTasks();
  },
};
</script>
