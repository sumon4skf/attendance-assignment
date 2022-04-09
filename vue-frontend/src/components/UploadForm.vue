<template>
  <div class="card mb-3">
    <div class="card-body">
      <div class="clearfix mb-3">
        <h5 class="d-inline-block">Upload an excel file</h5>
      </div>
      <form @submit="onSubmit">
        <div class="form-group">
          <label for="text">Select file</label>
          <input type="file" class="form-control-file" @change="uploadFile" ref="file" id="text" name="excel" />
        </div>

        <div class="form-group">
          <div class="form-check">
            <input class="form-check-input" v-model="is_erase" type="checkbox" name="erase_data" id="erase_data" />
            <label class="form-check-label" for="erase_data">
              Erase Previous Data
            </label>
          </div>
        </div>

        <input type="submit" value="Upload Now" class="btn btn-block btn-success" />
      </form>
    </div>
  </div>
</template>

<script>
import Axios from "../utils/Axios";
export default {
  name: "AddTask",
  data() {
    return {
      Images: null,
      is_erase: false,
    };
  },
  methods: {
    uploadFile() {
      this.Images = this.$refs.file.files[0];
    },
    onSubmit(e) {
      e.preventDefault();
      const formData = new FormData();
      formData.append("excel", this.Images);
      formData.append("is_erase", this.is_erase);
      const headers = { "Content-Type": "multipart/form-data" };
      Axios.post("excel-upload", formData, { headers }).then((res) => {
        if (res.data.status) {
          this.$router.push("/");
        } // HTTP status
      });

      this.Images = null;
      this.is_erase = false;
    },
  },
};
</script>
