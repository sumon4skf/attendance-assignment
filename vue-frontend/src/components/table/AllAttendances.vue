<template>
  <div class="row">
    <div class="col-md-4">
      <div class="form-group">
        <label for="inTime">In Time</label>
        <input type="time" v-model="inTime" placeholder="In Time" class="form-control" />
      </div>
    </div>
    <div class="col-md-4">
      <div class="form-group">
        <label for="inTime">Out Time</label>
        <input type="time" v-model="outTime" placeholder="Out Time" class="form-control" />
      </div>
    </div>
  </div>

  <table class="table table-bordered">
    <thead>
      <th>Month</th>
      <th>Date</th>
      <th>day</th>
      <th>ID</th>
      <th>Name</th>
      <th>Department</th>
      <th>First In Time</th>
      <th>Last Out Time</th>
      <th>Hours of work</th>
    </thead>
    <tbody>
      <tr
        :key="Attendance.id"
        v-for="Attendance in Attendances"
        :class="
          (checkTime(Attendance.first_in_time, 'in') && 'bg-danger') +
            ' ' +
            (checkTime(Attendance.last_out_time, 'out') && 'bg-warning')
        "
      >
        <td>{{ Attendance.month }}</td>
        <td>{{ Attendance.date }}</td>
        <td>{{ Attendance.day }}</td>
        <td>{{ Attendance.emp_id }}</td>
        <td>{{ Attendance.emp_name }}</td>
        <td>{{ Attendance.department }}</td>
        <td>{{ getHumanDate(Attendance.first_in_time) }}</td>
        <td>{{ getHumanDate(Attendance.last_out_time) }}</td>
        <td>{{ Attendance.hours_of_work }}</td>
      </tr>
    </tbody>
  </table>
</template>
<script>
import moment from "moment";

export default {
  name: "AllAttendances",
  data() {
    return {
      inTime: "",
      outTime: "",
    };
  },
  props: {
    Attendances: Array,
  },
  methods: {
    getHumanDate: function(date) {
      return moment(date, "h:mma").format("h:mm a");
    },
    checkTime: function(timeData, option = "in") {
      if (option === "in") {
        const genInTime = this.inTime ? moment(this.inTime, "h:mma") : null;
        let getData = moment(timeData, "h:mma");
        if (genInTime) {
          if (genInTime.isBefore(getData) > 0) {
            return true;
          }
        }
        return false;
      }

      if (option === "out") {
        const genOutTime = this.outTime ? moment(this.outTime, "h:mma") : null;
        let getData = moment(timeData, "h:mma");
        if (genOutTime) {
          if (genOutTime.isBefore(getData) > 0) {
            return true;
          }
        }
        return false;
      }

      return moment(date, "h:mma").format("h:mm a");
    },
    inTimeEffect: function() {
      console.log(this.inTime);
      return "";
    },
  },
};
</script>
